"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitch from "./ThemeSwitch";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState("EN");
  const pathname = usePathname();

  /* ---------------- SCROLL EFFECT ---------------- */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------------- LOAD LANGUAGE ---------------- */
  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) {
      setLang(savedLang);
      applyDirection(savedLang);
    }
  }, []);

  /* ---------------- APPLY DIRECTION ---------------- */
  const applyDirection = (language: string) => {
    if (language === "AR") {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = "en";
    }
  };

  /* ---------------- TOGGLE LANGUAGE ---------------- */
  const toggleLanguage = () => {
    const newLang = lang === "EN" ? "AR" : "EN";
    setLang(newLang);
    localStorage.setItem("lang", newLang);
    applyDirection(newLang);
  };

  const navLinks = [
    { name: lang === "EN" ? "Home" : "الرئيسية", href: "/" },
    { name: lang === "EN" ? "About" : "من نحن", href: "/about" },
    { name: lang === "EN" ? "Products" : "المنتجات", href: "/products" },
    { name: lang === "EN" ? "Contact" : "تواصل", href: "/contact" },
  ];

  return (
    <nav
      className={`
        fixed top-0 w-full z-50 transition-all duration-300 dark:text-slate-200
        ${
          scrolled
            ? "bg-[#E6C8A6] dark:bg-blue-950/90 backdrop-blur shadow-sm"
            : "bg-transparent"
        }
      `}
    >
      <div
        className={`
  max-w-7xl mx-auto px-6 h-16 flex items-center justify-between
  ${
    scrolled
      ? "text-teal-800 dark:text-blue-100"
      : pathname === "/about"
        ? "text-slate-200"
        : "text-teal-800 dark:text-blue-100"
  }
`}
      >
        {/* LOGO */}
        <Link
          href="/"
          className={`text-xl font-semibold text-teal-800 dark:text-blue-100
 ${
   scrolled
     ? "text-teal-800 dark:text-blue-100"
     : pathname === "/about"
       ? "text-slate-200"
       : "text-teal-800 dark:text-blue-100"
 }`}
        >
          Maxirain
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              {link.name}
            </Link>
          ))}

          {/* Language Button */}
          <button
            onClick={toggleLanguage}
            className="px-3 py-1 text-xs border rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            {lang}
          </button>

          <ThemeSwitch />
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleLanguage}
            className="px-2 py-1 text-xs border rounded-md"
          >
            {lang}
          </button>

          <ThemeSwitch />

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-6 h-6 ${
              scrolled
                ? "text-blue-900 dark:text-blue-100"
                : pathname === "/about"
                  ? "text-slate-200"
                  : "text-blue-900 dark:text-blue-100"
            }`}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col px-6 py-4 space-y-4 text-sm font-medium">
            {navLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
