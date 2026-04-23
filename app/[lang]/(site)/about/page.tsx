"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Leaf, Cpu, Target, Award } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

function Counter({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1000;
    const increment = end / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [value]);

  return <span>{count}</span>;
}

export default function AboutPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <main className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      {/* BANNER */}
      <section className="relative h-105 w-full">
        <Image
          src="/about-banner.png"
          alt="Industrial Water Systems"
          fill
          className="object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-semibold text-white">
            About Maxirain
          </h1>
        </div>
      </section>
      {/* COMPANY OVERVIEW */}
      <section className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          {[
            {
              icon: Target,
              title: "Mission",
              desc: "Deliver intelligent water systems that optimize efficiency and reliability across industries.",
            },
            {
              icon: Leaf,
              title: "Vision",
              desc: "To become a trusted global provider of sustainable and innovative water technologies.",
            },
            {
              icon: ShieldCheck,
              title: "Values",
              desc: "Engineering excellence, responsibility, durability, and continuous innovation.",
            },
          ].map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="
          bg-slate-50 dark:bg-slate-800
          border border-slate-200 dark:border-slate-700
          rounded-xl p-10
          hover:shadow-md transition
          text-center
        "
            >
              {/* ICON */}
              <div
                className="
          w-14 h-14 mx-auto mb-6
          flex items-center justify-center
          rounded-full
          bg-blue-100 dark:bg-slate-700
        "
              >
                <Icon className="w-7 h-7 text-blue-700 dark:text-blue-400" />
              </div>

              {/* TITLE */}
              <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">
                {title}
              </h3>

              {/* TEXT */}
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-semibold mb-6 text-slate-900 dark:text-slate-100">
              Our Story
            </h2>

            <div className="w-16 h-1 bg-blue-700 dark:bg-blue-400 mb-8" />

            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Maxirain was founded with a clear purpose: to redefine how water
              systems are engineered for modern infrastructure. From irrigation
              technologies to industrial-grade sealing systems, we combine
              precision engineering with long-term sustainability. Over the
              years, we have expanded globally while maintaining our commitment
              to performance, durability, and responsible innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CEO MESSAGE */}
      <section className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-semibold mb-6 text-blue-700 dark:text-blue-400">
              Message from the CEO
            </h2>

            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              At Maxirain, we believe water is one of the world’s most valuable
              resources. Our mission is to engineer intelligent systems that
              maximize efficiency while protecting the environment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STATS WITH COUNTER */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
          {[
            { value: 20, label: "Years of Experience", suffix: "+" },
            { value: 150, label: "Projects Delivered", suffix: "+" },
            { value: 30, label: "Average Water Savings", suffix: "%" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-10"
            >
              <div className="text-4xl font-semibold text-blue-700 dark:text-blue-400 mb-2">
                <Counter value={stat.value} />
                {stat.suffix}
              </div>
              <div className="text-slate-600 dark:text-slate-400 text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-12 text-center">
          {[ShieldCheck, Leaf, Cpu, Target].map((Icon, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Icon className="w-10 h-10 mx-auto mb-4 text-blue-700 dark:text-blue-400" />
              <h3 className="font-semibold">
                {
                  ["Reliability", "Sustainability", "Innovation", "Precision"][
                    i
                  ]
                }
              </h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TIMELINE (CENTER LINE STYLE) */}
      <section className="py-20 relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-300 dark:bg-slate-800 hidden md:block" />

        <div className="max-w-5xl mx-auto px-6 space-y-16">
          {[
            {
              year: "2005",
              text: "Company founded with focus on irrigation engineering.",
            },
            { year: "2012", text: "Expanded into industrial water systems." },
            { year: "2018", text: "Launched smart controller technologies." },
            { year: "2024", text: "Serving global infrastructure projects." },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="md:flex items-center gap-10"
            >
              <div className="md:w-1/2 text-right pr-6 text-blue-700 dark:text-blue-400 font-semibold">
                {item.year}
              </div>
              <div className="md:w-1/2 text-slate-600 dark:text-slate-400">
                {item.text}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="bg-slate-100 dark:bg-slate-800 rounded-lg p-8"
            >
              <div className="h-32 w-32 mx-auto rounded-full bg-slate-300 dark:bg-slate-700 mb-6" />
              <h3 className="font-semibold">Team Member</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Position / Role
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* AWARDS */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <Award className="w-10 h-10 mx-auto mb-6 text-blue-700 dark:text-blue-400" />
          <h2 className="text-2xl font-semibold mb-4">
            Certifications & Industry Recognition
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            ISO Certified • Sustainable Engineering Award • Industry Excellence
            Recognition
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-700 text-white text-center">
        <h2 className="text-3xl font-semibold mb-6">Partner With Maxirain</h2>
        <p className="mb-8">
          Let’s build sustainable and efficient water systems together.
        </p>
        <a
          href="/contact"
          className="bg-white text-blue-700 px-6 py-3 rounded-md font-medium hover:bg-slate-100 transition"
        >
          Contact Our Team
        </a>
      </section>
    </main>
  );
}
