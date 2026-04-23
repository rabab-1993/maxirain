"use client";
import { useCategories } from "@/app/hooks/useCategories";
import { useTranslation } from "@/i18n/TranslationProvider";

export default function AdminDashboardPage() {
  const { categories } = useCategories();
  const { t } = useTranslation();

  const totalCategories = categories?.length ?? 0;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-[#F5E1D0]">
        {t("admin.welcome")}
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-[#0e514c]">
          <p className="text-sm text-slate-500 dark:text-[#fdd3ad]">
            {t("admin.products.total")}
          </p>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-[#F5E1D0]">
            --
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-[#0e514c]">
          <p className="text-sm text-slate-500 dark:text-[#fdd3ad]">
            {t("admin.categories.total")}
          </p>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-[#F5E1D0]">
            {totalCategories}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-[#0e514c]">
          <p className="text-sm text-slate-500 dark:text-[#fdd3ad]">
            {t("admin.state")}
          </p>
          <p className="mt-2 text-lg font-semibold text-teal-700 dark:text-[#F5E1D0]">
            {/* {labels.ready} */}
          </p>
        </div>
      </div>
    </div>
  );
}
