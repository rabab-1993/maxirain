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
        relative w-12 h-7 rounded-full
        bg-[#0F8F8C] dark:bg-gray-700
        transition-colors duration-300
        flex items-center
        hover:bg-gray-300 dark:hover:bg-gray-600

      "
    >
      <span
        className={`
          absolute left-1 top-1
          w-5 h-5 rounded-full bg-white
          flex items-center justify-center
          text-gray-400 text-xs
          transition-all duration-300 
          ${isDark ? "translate-x-5" : ""}
        `}
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </span>
    </button>
  );
}
