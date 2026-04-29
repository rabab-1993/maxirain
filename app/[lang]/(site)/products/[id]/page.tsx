// import { notFound } from "next/navigation";
// import ProductDetailsClient from "@/app/components/ProductDetailsClient";
// import type { Category } from "@/app/types/category";

// export default async function ProductDetails({
//   params,
// }: {
//   params: Promise<{ slug: string; id: string }>;
// }) {
//   const { slug, id } = await params;

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`,
//     { cache: "no-store" },
//   );
//   const data: Category = await res.json();

//   if (!data) return notFound();

//   return <ProductDetailsClient category={data} />;
// }

"use client";

import Image from "next/image";
import MultipleProductsGallery from "../../../../components/MultipleProductsGallery";
import { useCategory } from "@/app/hooks/useCategories";
import { useParams } from "next/navigation";
import { useTranslation } from "@/i18n/TranslationProvider";

export default function ProductDetailsClient() {
  const params = useParams<{ lang: string; id: string }>();
  const { category, loading } = useCategory(params.id);
  const { t } = useTranslation();
  return (
    <main className="py-20 text-slate-800 dark:text-slate-100">
      {loading ? (
        <p className="p-6 text-[#093532] dark:text-[#fdd3ad]">
          {t("common.loading")}
        </p>
      ) : (
        <>
          {/* <section className="py-20"> */}
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div className="relative h-105 w-full rounded-lg overflow-hidden border">
              <Image
                src={category?.imageUrl || "/empty.jpg"}
                alt={category?.name || "image"}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-fill"
              />
            </div>

            <div>
              <h1 className="text-4xl font-semibold mb-6">{category?.name}</h1>

              <p className="mb-10">{category?.description}</p>
            </div>
          </div>
          {/* </section> */}
          <MultipleProductsGallery products={category?.products || []} />
        </>
      )}
    </main>
  );
}
