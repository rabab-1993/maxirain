"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
      cursor-pointer
        relative w-12 h-7 rounded-full
        bg-[#0F8F8C] dark:bg-[#F5E1D0]
        transition-colors duration-300
        flex items-center
        hover:bg-gray-300 dark:hover:bg-[#76c3bf]
      "
      aria-label="Toggle theme"
    >
      <span
        className={`
          absolute left-1 top-1
          w-5 h-5 rounded-full bg-white
          flex items-center justify-center
          text-gray-400 text-xs
          transition-all duration-300 
          dark:bg-[#085E5A]
          ${isDark ? "translate-x-5" : ""}
        `}
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </span>
    </button>
  );
}
