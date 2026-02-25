import Image from "next/image";
import { notFound } from "next/navigation";

const products = [
  {
    slug: "sprinkler-systems",
    title: "Sprinkler Systems",
    image: "/products/sprinkler.jpg",
    description:
      "Our sprinkler systems are designed for precision irrigation with maximum efficiency and durability.",
    benefits: [
      "Water-saving performance",
      "Durable industrial materials",
      "Optimized coverage",
    ],
  },
  {
    slug: "pipe-sealing",
    title: "Pipe Sealing Solutions",
    image: "/products/pipe-sealing.png",
    description:
      "Advanced sealing technologies ensuring leak prevention and long-term reliability.",
    benefits: [
      "High pressure resistance",
      "Weather durability",
      "Industrial-grade elastomers",
    ],
  },
  {
    slug: "smart-controllers",
    title: "Smart Controllers",
    image: "/products/controller.png",
    description:
      "Intelligent systems that automate irrigation based on environmental conditions.",
    benefits: ["Automated scheduling", "Remote control", "Energy efficient"],
  },
];

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) return notFound();

  return (
    <main className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          {/* IMAGE */}
          <div className="relative h-[420px] w-full rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>

          {/* CONTENT */}
          <div>
            <h1 className="text-4xl font-semibold mb-6 text-slate-900 dark:text-slate-100">
              {product.title}
            </h1>

            <div className="w-16 h-1 bg-blue-700 dark:bg-blue-400 mb-8" />

            <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
              {product.description}
            </p>

            <h3 className="text-lg font-semibold mb-6 text-slate-900 dark:text-slate-100">
              Key Benefits
            </h3>

            <ul className="space-y-4">
              {product.benefits.map((benefit, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-slate-600 dark:text-slate-400"
                >
                  <span className="text-blue-700 dark:text-blue-400 font-bold">
                    ✓
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
