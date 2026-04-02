"use client";

import Image from "next/image";

type Category = {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  slug: string;
};

export default function ProductDetailsClient({
  product,
}: {
  product: Category;
}) {
  console.log("product:", product);
  
  return (
    <main className="h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          
          <div className="relative h-105 w-full rounded-lg overflow-hidden border">
            <Image
              src={product.imageUrl ?? "/empty.jpg"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h1 className="text-4xl font-semibold mb-6">
              {product.name}
            </h1>

            <p className="mb-10">
              {product.description}
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}