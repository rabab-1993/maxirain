"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCategories } from "@/app/hooks/useCategories";

export default function ProductsPage() {
  const { categories } = useCategories();

  return (
    <main className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      {/* HERO */}
      <section className="py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-center">
        <h1 className="text-4xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
          Our Products
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Reliable, efficient, and industrial-grade water solutions.
        </p>
      </section>

      {/* PRODUCTS GRID */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="
                bg-white dark:bg-slate-900
                border border-slate-200 dark:border-slate-800
                rounded-lg overflow-hidden
                hover:shadow-md
                transition-all duration-300
              "
            >
              <Link href={`/products/${cat.id}`}>
                {/* IMAGE */}
                <div className="relative h-52 w-full">
                  <Image
                    src={cat?.imageUrl ?? "/empty.jpg"}
                    alt={cat.name}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-fill"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-8">
                  <h3 className="text-lg font-semibold mb-3 text-slate-900 dark:text-slate-100">
                    {cat.name}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
                    View Details →
                  </span> */}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
