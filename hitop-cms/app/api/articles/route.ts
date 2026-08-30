import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { execFileSync } from "child_process";
import { supabase } from "@/lib/supabase";

export const runtime = "nodejs";

/* =========================
   PROJECT PATHS
========================= */

const projectRoot = path.resolve(process.cwd(), "..");

const sectionPaths: Record<string, string> = {
  documentation: "docs",
  sop: "sops",
  troubleshooting: "troubleshooting",
};

function getSectionFolder(section: string) {
  return sectionPaths[section] || "docs";
}

function getSectionPath(section: string) {
  return path.join(
    projectRoot,
    getSectionFolder(section)
  );
}

/* =========================
   CATEGORY PATH
========================= */

function sanitizeCategory(category: string) {
  const safeCategory = category
    .trim()
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
    .replace(/\s+/g, " ")
    .replace(/\.+$/g, "");

  if (!safeCategory) {
    throw new Error("Invalid category.");
  }

  return safeCategory;
}

function getCategoryPath(
  section: string,
  category: string
) {
  const sectionPath = getSectionPath(section);
  const safeCategory = sanitizeCategory(category);

  return path.join(
    sectionPath,
    safeCategory
  );
}

/* =========================
   SAFE FILE NAME
========================= */

function createSafeFileName(title: string) {
  const safeName = title
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
   SLUG
========================= */

function createBaseSlug(title: string) {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "article"
  );
}

/* =========================
   MARKDOWN
========================= */

function createMarkdown(
  title: string,
  description: string,
  category: string,
  type: string,
  status: string,
  section: string,
  slug: string,
  content: string,
  date: string,
  updated: string
) {
  return matter.stringify(content, {
    title,
    description,
    category,
    type,
    status,
    section,
    slug,
    date,
    updated,
  });
}

/* =========================
   SYNC ARTICLES.JSON
========================= */

function syncArticlesJson() {
  const scriptPath = path.join(
    projectRoot,
    "scripts",
    "generate-articles.mjs"
  );

  if (!fs.existsSync(scriptPath)) {
    throw new Error(
      `Article generator not found: ${scriptPath}`
    );
  }

  console.log(
    "SYNCING articles.json..."
  );

  execFileSync(
    process.execPath,
    [scriptPath],
    {
      cwd: projectRoot,
      stdio: "inherit",
    }
  );

  console.log(
    "articles.json sync completed."
  );
}

/* =========================
   GET
========================= */

export async function GET(
  request: Request
) {
  try {
    const { searchParams } =
      new URL(request.url);

    const id = searchParams.get("id");

    /* Get single article */

    if (id) {
      const { data, error } =
        await supabase
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

    /* Get all articles */

    const { data, error } =
      await supabase
        .from("articles")
        .select("*")
        .order(
          "updated_at",
          { ascending: false }
        );

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(
      "GET articles error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to load articles.",
      },
      { status: 500 }
    );
  }
}

/* =========================
   POST - CREATE ARTICLE
========================= */

export async function POST(
  request: Request
) {
  let filePath = "";

  try {
    const body = await request.json();

    const title = String(
      body.title || ""
    ).trim();

    const description = String(
      body.description || ""
    ).trim();

    const category = String(
      body.category || "Uncategorized"
    ).trim();

    const type = String(
      body.type || "How-to Guide"
    ).trim();

    const status = String(
      body.status || "Draft"
    ).trim();

    const section = String(
      body.section || "documentation"
    ).trim();

    const content = String(
      body.content || ""
    ).trim();

    if (!title || !content) {
      return NextResponse.json(
        {
          error:
            "Title and content are required.",
        },
        { status: 400 }
      );
    }

    if (!sectionPaths[section]) {
      return NextResponse.json(
        {
          error:
            "Invalid section.",
        },
        { status: 400 }
      );
    }

    /* =========================
       Generate unique slug
    ========================= */

    const baseSlug =
      createBaseSlug(title);

    let slug = baseSlug;
    let counter = 2;

    while (true) {
      const { data: existing } =
        await supabase
          .from("articles")
          .select("id")
          .eq("slug", slug)
          .maybeSingle();

      if (!existing) {
        break;
      }

      slug =
        `${baseSlug}-${counter}`;

      counter++;
    }

    /* =========================
       Markdown location
    ========================= */

    const categoryPath =
      getCategoryPath(
        section,
        category
      );

    if (!fs.existsSync(categoryPath)) {
      fs.mkdirSync(
        categoryPath,
        {
          recursive: true,
        }
      );
    }

    const fileName =
      createSafeFileName(title);

    filePath = path.join(
      categoryPath,
      fileName
    );

    if (fs.existsSync(filePath)) {
      return NextResponse.json(
        {
          error:
            "An article with this title already exists in this category.",
        },
        { status: 409 }
      );
    }

    /* =========================
       Create Markdown
    ========================= */

    const now =
      new Date().toISOString();

    const markdown =
      createMarkdown(
        title,
        description,
        category,
        type,
        status,
        section,
        slug,
        content,
        now,
        now
      );

    fs.writeFileSync(
      filePath,
      markdown,
      "utf-8"
    );

    console.log(
      "MARKDOWN CREATED:",
      filePath
    );

    /* =========================
       Save Supabase
    ========================= */

    const { data, error } =
      await supabase
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

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    /* =========================
       Sync articles.json
    ========================= */

    try {
      syncArticlesJson();
    } catch (syncError) {
      console.error(
        "CREATE SYNC ERROR:",
        syncError
      );

      return NextResponse.json(
        {
          error:
            "Article created, but articles.json sync failed.",
          article: data,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Article created successfully.",
        article: data,
        fileName,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "CREATE ARTICLE ERROR:",
      error
    );

    if (
      filePath &&
      fs.existsSync(filePath)
    ) {
      fs.unlinkSync(filePath);
    }

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
   PUT - UPDATE ARTICLE
========================= */

export async function PUT(
  request: Request
) {
  let newFilePath = "";

  try {
    const body = await request.json();

    const id = String(
      body.id || ""
    ).trim();

    if (!id) {
      return NextResponse.json(
        {
          error:
            "Article ID is required.",
        },
        { status: 400 }
      );
    }

    /* =========================
       Get existing article
    ========================= */

    const {
      data: existing,
      error: fetchError,
    } = await supabase
      .from("articles")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !existing) {
      return NextResponse.json(
        {
          error:
            fetchError?.message ||
            "Article not found.",
        },
        { status: 404 }
      );
    }

    /* =========================
       New values
    ========================= */

    const title = String(
      body.title ?? existing.title ?? ""
    ).trim();

    const description = String(
      body.description ??
        existing.description ??
        ""
    ).trim();

    const category = String(
      body.category ??
        existing.category ??
        "Uncategorized"
    ).trim();

    const type = String(
      body.type ??
        existing.type ??
        "How-to Guide"
    ).trim();

    const status = String(
      body.status ??
        existing.status ??
        "Draft"
    ).trim();

    const section = String(
      body.section ??
        existing.section ??
        "documentation"
    ).trim();

    const content = String(
      body.content ??
        existing.content ??
        ""
    ).trim();

    if (!title || !content) {
      return NextResponse.json(
        {
          error:
            "Title and content are required.",
        },
        { status: 400 }
      );
    }

    if (!sectionPaths[section]) {
      return NextResponse.json(
        {
          error:
            "Invalid section.",
        },
        { status: 400 }
      );
    }

    /* =========================
       Keep existing slug
    ========================= */

    const slug =
      existing.slug ||
      createBaseSlug(title);

    /* =========================
       Old Markdown path
    ========================= */

    const oldSection =
      existing.section ||
      "documentation";

    const oldCategory =
      existing.category ||
      "Uncategorized";

    const oldFileName =
      createSafeFileName(
        existing.title
      );

    const oldFilePath =
      path.join(
        getCategoryPath(
          oldSection,
          oldCategory
        ),
        oldFileName
      );

    /* =========================
       New Markdown path
    ========================= */

    const newCategoryPath =
      getCategoryPath(
        section,
        category
      );

    if (
      !fs.existsSync(
        newCategoryPath
      )
    ) {
      fs.mkdirSync(
        newCategoryPath,
        {
          recursive: true,
        }
      );
    }

    const newFileName =
      createSafeFileName(title);

    newFilePath = path.join(
      newCategoryPath,
      newFileName
    );

    /* =========================
       Prevent overwrite
    ========================= */

    if (
      oldFilePath !== newFilePath &&
      fs.existsSync(newFilePath)
    ) {
      return NextResponse.json(
        {
          error:
            "Another article with this title already exists in this category.",
        },
        { status: 409 }
      );
    }

    /* =========================
       Create updated Markdown
    ========================= */

    const updated =
      new Date().toISOString();

    const created =
      existing.created_at ||
      existing.date ||
      updated;

    const markdown =
      createMarkdown(
        title,
        description,
        category,
        type,
        status,
        section,
        slug,
        content,
        created,
        updated
      );

    /* =========================
       Write new Markdown
    ========================= */

    fs.writeFileSync(
      newFilePath,
      markdown,
      "utf-8"
    );

    console.log(
      "MARKDOWN UPDATED:",
      newFilePath
    );

    /* =========================
       Update Supabase
    ========================= */

    const {
      data,
      error,
    } = await supabase
      .from("articles")
      .update({
        title,
        description,
        category,
        type,
        status,
        section,
        content,
        updated_at: updated,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(
        "UPDATE ARTICLE ERROR:",
        error
      );

      /* Remove newly created Markdown
         if database update fails */

      if (
        newFilePath &&
        fs.existsSync(newFilePath)
      ) {
        fs.unlinkSync(
          newFilePath
        );
      }

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    /* =========================
       Remove old Markdown
    ========================= */

    if (
      oldFilePath !== newFilePath &&
      fs.existsSync(oldFilePath)
    ) {
      fs.unlinkSync(
        oldFilePath
      );

      console.log(
        "OLD MARKDOWN DELETED:",
        oldFilePath
      );
    }

    /* =========================
       Sync articles.json
    ========================= */

    try {
      syncArticlesJson();
    } catch (syncError) {
      console.error(
        "UPDATE SYNC ERROR:",
        syncError
      );

      return NextResponse.json(
        {
          error:
            "Article updated, but articles.json sync failed.",
          article: data,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Article updated successfully.",
      article: data,
      fileName: newFileName,
    });
  } catch (error) {
    console.error(
      "UPDATE ARTICLE ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to update article.",
      },
      { status: 500 }
    );
  }
}

/* =========================
   DELETE ARTICLE
========================= */

export async function DELETE(
  request: Request
) {
  try {
    const { searchParams } =
      new URL(request.url);

    const id =
      searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          error:
            "Article ID is required.",
        },
        { status: 400 }
      );
    }

    /* =========================
       Get article first
    ========================= */

    const {
      data: article,
      error: fetchError,
    } = await supabase
      .from("articles")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !article) {
      return NextResponse.json(
        {
          error:
            fetchError?.message ||
            "Article not found.",
        },
        { status: 404 }
      );
    }

    /* =========================
       Markdown path
    ========================= */

    const section =
      article.section ||
      "documentation";

    const category =
      article.category ||
      "Uncategorized";

    const fileName =
      createSafeFileName(
        article.title
      );

    const filePath =
      path.join(
        getCategoryPath(
          section,
          category
        ),
        fileName
      );

    /* =========================
       Delete Markdown
    ========================= */

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);

      console.log(
        "MARKDOWN DELETED:",
        filePath
      );
    }

    /* =========================
       Delete Supabase record
    ========================= */

    const { error } =
      await supabase
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

    /* =========================
       Sync articles.json
    ========================= */

    try {
      syncArticlesJson();
    } catch (syncError) {
      console.error(
        "DELETE SYNC ERROR:",
        syncError
      );

      return NextResponse.json(
        {
          error:
            "Article deleted, but articles.json sync failed.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Article deleted successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE ARTICLE ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete article.",
      },
      { status: 500 }
    );
  }
}
