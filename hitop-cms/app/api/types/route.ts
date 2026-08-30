import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const section = searchParams.get("section");

  let query = supabase
    .from("article_types")
    .select("id,name,section")
    .order("name");

  if (section) {
    query = query.eq("section", section);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data || []);
}
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = String(body.name || "").trim();
    const section = String(body.section || "").trim();

    if (!name) {
      return NextResponse.json(
        { error: "Article type name is required." },
        { status: 400 }
      );
    }

    if (!section) {
      return NextResponse.json(
        { error: "Section is required." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("article_types")
      .insert({
        name,
        section,
      })
      .select("id,name,section")
      .single();

    if (error) {
      console.error("CREATE ARTICLE TYPE ERROR:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("CREATE ARTICLE TYPE ERROR:", error);

    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}


export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Article type ID is required." },
        { status: 400 }
      );
    }

    const body = await request.json();

    const name = String(body.name || "").trim();
    const section = String(body.section || "").trim();

    if (!name) {
      return NextResponse.json(
        { error: "Article type name is required." },
        { status: 400 }
      );
    }

    if (!section) {
      return NextResponse.json(
        { error: "Section is required." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("article_types")
      .update({
        name,
        section,
      })
      .eq("id", id)
      .select("id,name,section")
      .single();

    if (error) {
      console.error("UPDATE ARTICLE TYPE ERROR:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("UPDATE ARTICLE TYPE ERROR:", error);

    return NextResponse.json(
      { error: "Invalid request." },
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
        { error: "Article type ID is required." },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("article_types")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("DELETE ARTICLE TYPE ERROR:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("DELETE ARTICLE TYPE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to delete article type." },
      { status: 500 }
    );
  }
}