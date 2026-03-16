"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-60 bg-[#E6C8A6] text-white h-screen p-5">
      <h2 className="text-xl font-bold mb-6">Admin</h2>

      <div className="flex flex-col gap-3">
        <Link href="/">Home</Link>
        <Link href="/admin">Dashboard</Link>

        <Link href="/admin/products">Products</Link>

        <Link href="/admin/categories">Categories</Link>
      </div>
    </div>
  );
}
