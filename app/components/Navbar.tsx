"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 w-full z-50 transition-all duration-300
        ${
          scrolled
            ? "bg-white/90 dark:bg-blue-950/90 backdrop-blur shadow-sm"
            : "bg-transparent"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <Link
          href="/"
          className="text-xl font-semibold text-blue-900 dark:text-blue-100"
        >
          Maxirain
        </Link>

        {/* LINKS */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium dark:text-blue-100">
          <Link href="/about" className="hover:text-blue-600 transition">
            About
          </Link>
          <Link href="/products" className="hover:text-blue-600 transition">
            Products
          </Link>
          <Link href="/contact" className="hover:text-blue-600 transition">
            Contact
          </Link>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
}
