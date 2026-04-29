"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitch from "./ThemeSwitch";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { Lang } from "@/i18n/config";
import { useTranslation } from "@/i18n/TranslationProvider";

export default function Navbar({ lang }: { lang: Lang }) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  /* ---------------- SCROLL EFFECT ---------------- */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { t } = useTranslation();

  const navLinks = [
    { name: t("navbar.home"), href: `/${lang}/` },
    { name: t("navbar.about"), href: `/${lang}/about` },
    { name: t("navbar.products"), href: `/${lang}/products` },
    { name: t("navbar.contact"), href: `/${lang}/contact` },
  ];

  return (
    <nav
      className={`
        fixed top-0 w-full z-50 transition-all duration-300 dark:text-[#fdd3ad]
        ${
          scrolled
            ? "bg-[#E6C8A6] dark:bg-[#085E5A] backdrop-blur shadow-sm"
            : "bg-transparent"
        }
      `}
    >
      <div
        className={` max-w-7xl mx-auto px-6 h-16 flex items-center justify-between
  ${
    scrolled
      ? "text-teal-800 dark:text-[#fdd3ad]"
      : pathname === "/about"
        ? "text-slate-200"
        : "text-teal-800 dark:text-[#fdd3ad]"
  }
`}
      >
        {/* LOGO */}
        <Link
          href="/"
          className={`text-xl font-semibold text-teal-800 dark:text-[#fdd3ad]
 ${
   scrolled
     ? "text-teal-800 dark:text-[#fdd3ad]"
     : pathname === "/about"
       ? "text-slate-200"
       : "text-teal-800 dark:text-[#fdd3ad]"
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

          <LanguageSwitcher lang={lang} />

          <ThemeSwitch />
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher lang={lang} />
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
        <div className="md:hidden bg-white dark:bg-[#085E5A] border-t border-slate-200 dark:border-slate-800">
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
