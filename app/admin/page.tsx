"use client";

import { useCategories } from "@/app/hooks/useCategories";

export default function AdminDashboardPage() {
  const { categories } = useCategories();

  const totalCategories = categories?.length ?? 0;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Total Products</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">--</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Total Categories</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {totalCategories}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Status</p>
          <p className="mt-2 text-lg font-semibold text-teal-700">Ready</p>
        </div>
      </div>
    </div>
  );
}
