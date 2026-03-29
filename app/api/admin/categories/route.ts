import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      products: true,
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

  if (image && image.size > 0) {
    const cleanName = image.name.replace(/\s/g, "-");
    const fileName = `${Date.now()}-${cleanName}`;

    const { error } = await supabase.storage
      .from("categories")
      .upload(fileName, image);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
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

  const id = formData.get("id") as unknown as number;
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

  await prisma.category.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
