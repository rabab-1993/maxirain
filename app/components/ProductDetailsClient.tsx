"use client";

import Image from "next/image";
import MultipleProductsGallery from "./MultipleProductsGallery";
import { Category } from "../types/category";

export default function ProductDetailsClient({
  category,
}: {
  category: Category | null;
}) {
  return (
    <main className=" bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative h-105 w-full rounded-lg overflow-hidden border">
            <Image
              src={category?.imageUrl || "/empty.jpg"}
              alt={category?.name || "image"}
              fill={true}
              className="object-fill"
            />
          </div>

          <div>
            <h1 className="text-4xl font-semibold mb-6">{category?.name}</h1>

            <p className="mb-10">{category?.description}</p>
          </div>
        </div>
      </section>
      <MultipleProductsGallery products={category?.products || []} />
    </main>
  );
}
