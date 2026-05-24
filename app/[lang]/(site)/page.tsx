"use client";
import Image from "next/image";
import { Droplets, Waves, ShieldCheck, Leaf } from "lucide-react";
import { useTranslation } from "@/i18n/TranslationProvider";
import { useParams } from "next/navigation";

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
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();

  return (
    <main className="bg-slate-50 dark:bg-[#0e514c] text-slate-800 dark:text-[#F5E1D0]">
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
            dark:from-teal-950/80 dark:via-teal-900/80 dark:to-teal-800/50
          "
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1
              className="
              text-4xl md:text-5xl font-semibold leading-tight mb-6
              text-teal-900 dark:text-[#fdd3ad]
            "
            >
              {/* Intelligent Water Solutions <br />
              for a Sustainable Tomorrow */}
              {t("home.heroTitle")}
            </h1>

            <p
              className="
              text-lg mb-8
              text-teal-700 dark:text-[#F5E1D0]
            "
            >
              {t("home.heroDescription")}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={`/${lang}/products`}
                className="
                  bg-teal-900 text-[#F5E1D0]
                  dark:bg-[#F5E1D0] dark:text-teal-900
                  px-6 py-3 rounded-md font-medium
                  hover:opacity-90 transition
                "
              >
                {t("home.exploreBtt")}
              </a>
              <a
                href={`/${lang}/contact`}
                className="
                  border border-teal-900 text-teal-900
                  dark:border-[#F5E1D0] dark:text-[#F5E1D0]
                  px-6 py-3 rounded-md font-medium
                  hover:bg-teal-900 hover:text-[#F5E1D0]
                  dark:hover:bg-[#F5E1D0] dark:hover:text-teal-900
                  transition
                "
              >
                {t("navbar.contact")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="py-20 bg-white dark:bg-teal-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {items.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-6 border border-teal-500 dark:border-teal-400 rounded-lg"
              >
                <Icon className="w-8 h-8 text-teal-900 mb-4 dark:text-[#F5E1D0]" />
                <h3 className="font-medium text-teal-600 dark:text-[#fdd3ad]">
                  {title}
                </h3>
                <p className=" text-slate-600 dark:text-[#f6a45c] text-sm">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-gray-50 dark:bg-teal-800 py-20">
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
                  border-teal-500
                  dark:border-teal-400
                  rounded-lg py-6
                "
              >
                <div className="text-3xl font-semibold text-teal-900 dark:text-[#fdd3ad] mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-[#F5E1D0] text-sm">
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
