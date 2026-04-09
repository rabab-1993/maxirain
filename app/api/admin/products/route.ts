import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

// ✅ GET
export async function GET() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  return NextResponse.json(products);
}


export async function POST(req: Request) {
  const formData = await req.formData();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = Number(formData.get("price"));
  const categoryId = Number(formData.get("categoryId"));
  const isVisible = formData.get("isVisible") === "true";
  const image = formData.get("image") as File;

  let imageUrl = "";

  if (image && image.size > 0) {
    const cleanName = image.name.replace(/\s/g, "-");
    const fileName = `${Date.now()}-${cleanName}`;

    const { error } = await supabase.storage
      .from("product-images")
      .upload(fileName, image);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data } = supabase.storage
      .from("product-images")
      .getPublicUrl(fileName);

    imageUrl = data.publicUrl;
  }

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price,
      imageUrl,
      categoryId,
      isVisible,
    },
  });

  return NextResponse.json(product);
}


export async function PUT(req: Request) {
  const formData = await req.formData();

  const id = Number(formData.get("id"));
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = Number(formData.get("price"));
  const categoryId = Number(formData.get("categoryId"));
  const isVisible = formData.get("isVisible") === "true";
  const image = formData.get("image") as File;

  let imageUrl: string | undefined;

  if (image && image.size > 0) {
    const cleanName = image.name.replace(/\s/g, "-");
    const fileName = `${Date.now()}-${cleanName}`;

    const { error } = await supabase.storage
      .from("product-images")
      .upload(fileName, image);

    if (!error) {
      const { data } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName);

      imageUrl = data.publicUrl;
    }
  }

  const product = await prisma.product.update({
    where: { id },
    data: {
      name,
      description,
      price,
      categoryId,
      isVisible,
      ...(imageUrl && { imageUrl }),
    },
  });

  return NextResponse.json(product);
}


export async function DELETE(req: Request) {
  const { id } = await req.json();

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (product.imageUrl) {
    try {
      const url = new URL(product.imageUrl);
      const fileName = url.pathname.split("/").pop();

      if (fileName) {
        await supabase.storage.from("product-images").remove([fileName]);
      }
    } catch (err) {
      console.error("Image delete error:", err);
    }
  }

  await prisma.product.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}