import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { createRequire } from "module";
import { PassThrough } from "stream";

const require = createRequire(import.meta.url);
const archiver = require("archiver");

export async function GET() {
  try {
    const [
      articlesResult,
      categoriesResult,
      typesResult,
      mediaResult,
    ] = await Promise.all([
      supabaseAdmin.from("articles").select("*"),
      supabaseAdmin.from("categories").select("*"),
      supabaseAdmin.from("article_types").select("*"),
      supabaseAdmin.from("media").select("*"),
    ]);

    if (articlesResult.error) {
      throw new Error(`Articles: ${articlesResult.error.message}`);
    }

    if (categoriesResult.error) {
      throw new Error(`Categories: ${categoriesResult.error.message}`);
    }

    if (typesResult.error) {
      throw new Error(`Article Types: ${typesResult.error.message}`);
    }

    if (mediaResult.error) {
      throw new Error(`Media: ${mediaResult.error.message}`);
    }

    const backup = {
      backup_version: 2,
      created_at: new Date().toISOString(),
      data: {
        articles: articlesResult.data || [],
        categories: categoriesResult.data || [],
        article_types: typesResult.data || [],
        media: mediaResult.data || [],
      },
    };

    const passThrough = new PassThrough();
    const chunks: Buffer[] = [];

    passThrough.on("data", (chunk) => {
      chunks.push(Buffer.from(chunk));
    });

    const archive = archiver("zip", {
      zlib: { level: 9 },
    });

    archive.pipe(passThrough);

    archive.append(JSON.stringify(backup, null, 2), {
      name: "database.json",
    });

    await archive.finalize();

    await new Promise<void>((resolve, reject) => {
      passThrough.on("end", resolve);
      passThrough.on("error", reject);
    });

    const zipBuffer = Buffer.concat(chunks);

    return new NextResponse(zipBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="HITOP-Backup-${new Date()
          .toISOString()
          .slice(0, 10)}.zip"`,
      },
    });
  } catch (error) {
    console.error("BACKUP ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create backup.",
      },
      { status: 500 }
    );
  }
}