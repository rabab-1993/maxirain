"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

const links = [
  { href: "/admin", label: "Home" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
];

export default function AdminSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white md:block dark:bg-teal-900 dark:border-[#F5E1D0]">
        <div className="p-6">
          <div className="mb-8 text-2xl font-bold text-teal-700 dark:text-[#fec899]">Maxirain</div>

          <nav className="space-y-2">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-teal-50 text-teal-700 dark:bg-teal-700 dark:text-[#fec899]"
                      : "text-slate-600 hover:bg-slate-50 dark:text-[#F5E1D0] dark:hover:bg-[#fec899]/10"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            aria-label="Close menu overlay"
            onClick={onClose}
            className="absolute inset-0 bg-black/40"
          />

          <aside className="absolute right-0 top-0 flex h-full w-[88%] max-w-xs flex-col bg-white shadow-2xl dark:bg-teal-900">
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div className="text-xl font-bold text-teal-700 dark:text-[#fec899]">Maxirain</div>

              <button
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 dark:border-[#fec899] dark:text-[#F5E1D0]"
                type="button"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="space-y-2 p-4">
              {links.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                      active
                        ? "bg-teal-50 text-teal-700"
                        : "text-slate-600 hover:bg-slate-50 dark:text-[#F5E1D0]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
