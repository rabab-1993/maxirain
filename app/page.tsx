import Image from "next/image";
import { Droplets, Waves, ShieldCheck, Leaf } from "lucide-react";

const items = [
  {
    icon: Droplets,
    title: "Smart Irrigation",
    desc: "Precision systems that reduce water waste and improve performance.",
  },
  {
    icon: Waves,
    title: "Water Control",
    desc: "Reliable solutions for rainwater and flow management.",
  },
  {
    icon: ShieldCheck,
    title: "Advanced Materials",
    desc: "Elastomer and polymer components built for harsh conditions.",
  },
  {
    icon: Leaf,
    title: "Sustainable Design",
    desc: "Long-life products designed with efficiency in mind.",
  },
];
export default function HomePage() {
  return (
    <main className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      {/* HERO */}
      <section className="relative h-screen flex items-center">
        {/* Background Image */}
        <Image
          src="/designer.png"
          alt="Water management and irrigation"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay (Light + Dark) */}
        <div
          className="
            absolute inset-0
            bg-white/60
            dark:bg-linear-to-r
            dark:from-gray-950/80 dark:via-gray-900/80 dark:to-gray-800/50
          "
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1
              className="
              text-4xl md:text-5xl font-semibold leading-tight mb-6
              text-gray-900 dark:text-white
            "
            >
              Intelligent Water Solutions <br />
              for a Sustainable Tomorrow
            </h1>

            <p
              className="
              text-lg mb-8
              text-gray-700 dark:text-blue-200
            "
            >
              Maxirain develops advanced irrigation and water management
              technologies designed to maximize efficiency, durability, and
              environmental responsibility.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="/solutions"
                className="
                  bg-blue-900 text-white
                  dark:bg-white dark:text-blue-900
                  px-6 py-3 rounded-md font-medium
                  hover:opacity-90 transition
                "
              >
                Explore Solutions
              </a>
              <a
                href="/contact"
                className="
                  border border-blue-900 text-blue-900
                  dark:border-white dark:text-white
                  px-6 py-3 rounded-md font-medium
                  hover:bg-blue-900 hover:text-white
                  dark:hover:bg-white dark:hover:text-blue-900
                  transition
                "
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {items.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 border rounded-lg">
                <Icon className="w-8 h-8 text-blue-900 mb-4 dark:text-blue-200" />
                <h3 className="font-medium text-blue-600 dark:text-blue-00">
                  {title}
                </h3>
                <p className=" text-slate-600 dark:text-blue-300 text-sm">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-gray-50 dark:bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "30%", label: "Water Savings" },
              { value: "20+ Years", label: "Engineering Experience" },
              { value: "50+", label: "Industrial Projects" },
              { value: "100%", label: "Sustainability Focus" },
            ].map((stat, i) => (
              <div
                key={i}
                className="
                  border
                  rounded-lg py-6
                "
              >
                <div className="text-3xl font-semibold text-blue-900 dark:text-blue-200 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-blue-300 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

{
  /* {[
              {
                title: "Smart Irrigation",
                desc: "Precision systems that reduce water waste and improve performance.",
              },
              {
                title: "Water Control",
                desc: "Reliable solutions for rainwater and flow management.",
              },
              {
                title: "Advanced Materials",
                desc: "Elastomer and polymer components built for harsh conditions.",
              },
              {
                title: "Sustainable Design",
                desc: "Long-life products designed with efficiency in mind.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="
                  bg-white border border-gray-200
                  dark:bg-blue-950 dark:border-blue-800
                  rounded-lg p-6
                  hover:shadow-md transition
                "
              >
                <h3 className="text-xl font-medium mb-3 text-gray-900 dark:text-blue-100">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-blue-300 text-sm">
                  {item.desc}
                </p>
              </div>
            ))} */
}
