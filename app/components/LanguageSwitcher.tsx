"use client";

import { usePathname, useRouter } from "next/navigation";
import { i18n, type Locale } from "@/i18n/config";

export default function LanguageSwitcher({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: Locale) => {
    const segments = pathname.split("/");

    if (i18n.locales.includes(segments[1] as Locale)) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }

    const newPath = segments.join("/") || `/${newLocale}`;
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-2">
      {lang === "en" ? (
        <button
          onClick={() => switchLocale("ar")}
          className={`rounded-md px-3 py-1 text-sm border cursor-pointer ${
            lang === "en"
              ? "bg-[#F5E1D0] text-teal-800  dark:text-teal-900"
              : "border-[#F5E1D0]"
          }`}
        >
          ع
        </button>
      ) : (
        <button
          onClick={() => switchLocale("en")}
          className={`rounded-md px-3 py-1 text-sm border cursor-pointer ${
            lang === "ar"
              ? "bg-[#F5E1D0] text-teal-800 dark:text-teal-900"
              : "border-[#F5E1D0]"
          }`}
        >
          EN
        </button>
      )}
    </div>
  );
}
