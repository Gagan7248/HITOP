import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);

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
    console.error(error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const title = String(body.title || "").trim();

    if (!title) {
      return NextResponse.json(
        { error: "Article title is required." },
        { status: 400 }
      );
    }

    const baseSlug =
      title
        .toLowerCase()
        .trim()
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

    const { data, error } = await supabase
      .from("articles")
      .insert({
        title,
        slug,
        description: body.description || "",
        category: body.category || "Uncategorized",
        type: body.type || "How-to Guide",
        status: body.status || "Draft",
        section: body.section || "documentation",
        content: body.content || "",
      })
      .select()
      .single();

    if (error) {
      console.error("CREATE ARTICLE ERROR:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("CREATE ARTICLE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to create article." },
      { status: 400 }
    );
  }
}

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
      console.error("UPDATE ARTICLE ERROR:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("UPDATE ARTICLE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to update article." },
      { status: 400 }
    );
  }
}

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
      console.error("DELETE ARTICLE ERROR:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("DELETE ARTICLE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to delete article." },
      { status: 500 }
    );
  }
}