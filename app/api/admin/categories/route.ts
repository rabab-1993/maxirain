import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },

  });
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  const formData = await req.formData();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as File;

  let imageUrl = "";

  if (image) {
    const cleanName = image.name.replace(/\s/g, "-");
    const fileName = `${Date.now()}-${cleanName}`;


    const { error: uploadError } = await supabase.storage
      .from("categories")
      .upload(fileName, image);

    if (uploadError) {
      console.log("Supabase upload error:", uploadError);
      throw uploadError
    }



    const { data } = supabase.storage
      .from("categories")
      .getPublicUrl(fileName);

    imageUrl = data.publicUrl;
  }


  const category = await prisma.category.create({
    data: {
      name,
      slug: name.toLowerCase().replace(/\s/g, "-"),
      description,
      imageUrl,
    },
  });

  return NextResponse.json(category);
}
export async function PUT(req: Request) {
  const formData = await req.formData();

  const id = Number(formData.get("id"));
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as File;

  let imageUrl;

  if (image) {
    const fileName = Date.now() + "-" + image.name;


    const { error } = await supabase.storage
      .from("categories")
      .upload(fileName, image);

    if (!error) {
      imageUrl =
        process.env.NEXT_PUBLIC_SUPABASE_URL +
        "/storage/v1/object/public/categories/" +
        fileName;
    }


  }



  const category = await prisma.category.update({
    where: { id },
    data: {
      name,
      description,
      ...(imageUrl && { imageUrl: imageUrl }),
    },
  });

  return NextResponse.json(category);
}



export async function DELETE(req: Request) {
  const { id } = await req.json();

  const category = await prisma.category.findUnique({
    where: { id },
  });

  if (!category) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  if (category.imageUrl) {
    try {
      const url = new URL(category.imageUrl);

      const fileName = url.pathname.split("/").pop();

      if (fileName) {
        const { error } = await supabase.storage
          .from("categories")
          .remove([fileName]);

        if (error) {
          console.error("Supabase delete error:", error.message);
        }
      }
    } catch (err) {
      console.error("Invalid image URL:", err);
    }
  }

  await prisma.category.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}