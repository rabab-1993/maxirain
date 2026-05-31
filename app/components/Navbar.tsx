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
        fixed top-0 w-full z-50 transition-all duration-300
        ${
          scrolled
            ? "bg-[#E6C8A6] dark:bg-[#085E5A] backdrop-blur shadow-sm"
            : "bg-transparent"
        }
      `}
    >
      <div
        className={` max-w-7xl mx-auto px-1 h-16 flex items-center justify-between
  ${
    scrolled
      ? "text-teal-800 dark:text-[#F5E1D0]"
      : pathname === `/${lang}/about`
        ? "text-slate-200 dark:text-[#F5E1D0]"
        : "text-teal-800 dark:text-[#F5E1D0]"
  }
`}
      >
        {/* LOGO */}
        <Link
          href="/"
          className={`text-xl font-semibold text-[#F5E1D0]
 ${
   scrolled
     ? "text-teal-800 dark:text-[#F5E1D0]"
     : pathname === `/${lang}/about`
       ? "text-slate-200 dark:text-[#F5E1D0]"
       : "text-teal-800 dark:text-[#F5E1D0]"
 }`}
        >
          Maxirain
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-lg font-bold">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className="hover:text-teal-600 dark:hover:text-teal-500 transition"
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
            className={`w-6 h-6 cursor-pointer ${
              scrolled
                ? "text-teal-900 dark:text-[#fdd3ad]"
                : pathname === `/${lang}/about`
                  ? "text-[#F5E1D0]"
                  : "text-[#F5E1D0] dark:text-[#fdd3ad]"
            }`}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#E6C8A6] dark:bg-[#085E5A] dark:text-[#fdd3ad] border-t border-teal-700 dark:border-slate-800">
          <div className="flex flex-col px-6 py-4 space-y-4 text-sm font-medium">
            {navLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="hover:text-[#F5E1D0] text-teal-800 dark:hover:text-teal-400 font-bold transition"
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
