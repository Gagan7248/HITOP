import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  const { data, error } = await supabase
    .from("media")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("MEDIA GET ERROR:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data || []);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No file uploaded." },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed." },
        { status: 400 }
      );
    }

    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

    const buffer = await file.arrayBuffer();

    const { error: uploadError } = await supabase.storage
      .from("hitop-media")
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("MEDIA UPLOAD ERROR:", uploadError);

      return NextResponse.json(
        { error: uploadError.message },
        { status: 500 }
      );
    }

    const { data: publicUrlData } = supabase.storage
      .from("hitop-media")
      .getPublicUrl(fileName);

    const publicUrl = publicUrlData.publicUrl;

    const { data, error: databaseError } = await supabase
      .from("media")
      .insert({
        filename: file.name,
        url: publicUrl,
        mime_type: file.type,
        size: file.size,
      })
      .select()
      .single();

    if (databaseError) {
      console.error("MEDIA DATABASE ERROR:", databaseError);

      return NextResponse.json(
        { error: databaseError.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("MEDIA API ERROR:", error);

    return NextResponse.json(
      { error: "Media upload failed." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
console.log("========== DELETE START ==========");

const { id } = await request.json();
console.log("DELETE ID RECEIVED:", id);
    if (!id) {
      return NextResponse.json(
        { error: "Media ID is required." },
        { status: 400 }
      );
    }

    // Get media record
   const { data: media, error: fetchError } = await supabaseAdmin
  .from("media")
      .select("id, url")
      .eq("id", id)
      .single();

console.log("DELETE REQUEST ID:", id);
console.log("DELETE FETCH DATA:", media);
console.log("DELETE FETCH ERROR:", fetchError);

    if (fetchError || !media) {
      return NextResponse.json(
        { error: "Media not found." },
        { status: 404 }
      );
    }

    // Extract storage path from public URL
    const marker = "/hitop-media/";

    const markerIndex = media.url.indexOf(marker);

    if (markerIndex === -1) {
      return NextResponse.json(
        { error: "Invalid media URL." },
        { status: 400 }
      );
    }

    const filePath = decodeURIComponent(
      media.url.substring(markerIndex + marker.length)
    );

    // Delete file from Supabase Storage
 const { data: storageData, error: storageError } =
  await supabaseAdmin.storage
    .from("hitop-media")
    .remove([filePath]);

console.log("MEDIA STORAGE DELETE PATH:", filePath);
console.log("MEDIA STORAGE DELETE DATA:", storageData);
console.log("MEDIA STORAGE DELETE ERROR:", storageError);

console.log("MEDIA STORAGE DELETE PATH:", filePath);
console.log("MEDIA STORAGE DELETE DATA:", storageData);
console.log("MEDIA STORAGE DELETE ERROR:", storageError);

    if (storageError) {
      console.error("MEDIA STORAGE DELETE ERROR:", storageError);

      return NextResponse.json(
        { error: storageError.message },
        { status: 500 }
      );
    }

    // Delete database record
   const { error: databaseError } = await supabaseAdmin
  .from("media")
  .delete()
  .eq("id", id);

    if (databaseError) {
      console.error("MEDIA DATABASE DELETE ERROR:", databaseError);

      return NextResponse.json(
        { error: databaseError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("MEDIA DELETE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to delete media." },
      { status: 500 }
    );
  }
}