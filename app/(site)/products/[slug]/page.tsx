import { notFound } from "next/navigation";
import ProductDetailsClient from "@/app/components/ProductDetailsClient";

type Category = {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  slug: string;
};

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`,
    { cache: "no-store" }
  );
  const data: Category[] = await res.json();

  const product = data.find((p) => p.slug === slug);

  if (!product) return notFound();

  return <ProductDetailsClient product={product} />;
}