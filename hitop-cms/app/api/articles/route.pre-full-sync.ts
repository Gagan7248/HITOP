import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { supabase } from "@/lib/supabase";

const projectRoot = path.resolve(process.cwd(), "..");

const sectionPaths: Record<string, string> = {
  documentation: "docs",
  sop: "sops",
  troubleshooting: "troubleshooting",
};

function getSectionPath(section: string) {
  const folder = sectionPaths[section] || "docs";
  return path.join(projectRoot, folder);
}

function createSafeFileName(title: string) {
  const safeName =
    title
      .trim()
      .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
      .replace(/\s+/g, " ")
      .replace(/\.+$/g, "");

  if (!safeName) {
    throw new Error("Invalid article title.");
  }

  return `${safeName}.md`;
}

/* =========================
   GET
========================= */

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        return NextResponse.json(
          { error: error.message },
          { status: 500 }
        );
      }

      return NextResponse.json(data);
    }

    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET articles error:", error);

    return NextResponse.json(
      { error: "Failed to load articles." },
      { status: 500 }
    );
  }
}

/* =========================
   POST - CREATE ARTICLE
========================= */

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const title = String(body.title || "").trim();
    const description = String(body.description || "").trim();
    const category = String(body.category || "Uncategorized").trim();
    const type = String(body.type || "How-to Guide").trim();
    const status = String(body.status || "Draft").trim();
    const section = String(body.section || "documentation").trim();
    const content = String(body.content || "").trim();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required." },
        { status: 400 }
      );
    }

    if (!sectionPaths[section]) {
      return NextResponse.json(
        { error: "Invalid section." },
        { status: 400 }
      );
    }

    /* =========================
       Generate slug
    ========================= */

    const baseSlug =
      title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "") || "article";

    let slug = baseSlug;
    let counter = 2;

    while (true) {
      const { data: existing } = await supabase
        .from("articles")
        .select("id")
        .eq("slug", slug)
        .maybeSingle();

      if (!existing) {
        break;
      }

      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    /* =========================
       Prepare Markdown path
    ========================= */

    const sectionPath = getSectionPath(section);

    if (!fs.existsSync(sectionPath)) {
      fs.mkdirSync(sectionPath, { recursive: true });
    }

    const fileName = createSafeFileName(title);
    const filePath = path.join(sectionPath, fileName);

    if (fs.existsSync(filePath)) {
      return NextResponse.json(
        {
          error:
            "An article with this title already exists in this section.",
        },
        { status: 409 }
      );
    }

    /* =========================
       Create Markdown
    ========================= */

    const now = new Date().toISOString();

    const frontmatter = {
      title,
      description,
      category,
      type,
      status,
      section,
      slug,
      date: now,
      updated: now,
    };

    const markdown = matter.stringify(
      content,
      frontmatter
    );

    fs.writeFileSync(
      filePath,
      markdown,
      "utf-8"
    );

    /* =========================
       Save to Supabase
    ========================= */

    const { data, error } = await supabase
      .from("articles")
      .insert({
        title,
        slug,
        description,
        category,
        type,
        status,
        section,
        content,
      })
      .select()
      .single();

    if (error) {
      console.error(
        "CREATE ARTICLE SUPABASE ERROR:",
        error
      );

      /* Remove Markdown if database insert failed */

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Article created successfully.",
        article: data,
        fileName,
        filePath,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "CREATE ARTICLE ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create article.",
      },
      { status: 500 }
    );
  }
}

/* =========================
   PUT
========================= */

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        { error: "Article ID is required." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("articles")
      .update({
        title: body.title,
        description: body.description || "",
        category: body.category || "Uncategorized",
        type: body.type || "How-to Guide",
        status: body.status || "Draft",
        section: body.section || "documentation",
        content: body.content || "",
        updated_at: new Date().toISOString(),
      })
      .eq("id", body.id)
      .select()
      .single();

    if (error) {
      console.error(
        "UPDATE ARTICLE ERROR:",
        error
      );

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(
      "UPDATE ARTICLE ERROR:",
      error
    );

    return NextResponse.json(
      { error: "Failed to update article." },
      { status: 400 }
    );
  }
}

/* =========================
   DELETE
========================= */

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Article ID is required." },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("articles")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(
        "DELETE ARTICLE ERROR:",
        error
      );

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "DELETE ARTICLE ERROR:",
      error
    );

    return NextResponse.json(
      { error: "Failed to delete article." },
      { status: 500 }
    );
  }
}
