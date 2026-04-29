"use client";

import { useState } from "react";
import type { Category } from "@/app/types/category";
import { useCategories } from "@/app/hooks/useCategories";
import CategoryModal from "@/app/components/CategoryModal";
import DeleteCategoryModal from "@/app/components/DeleteCategoryModal";
import Toast from "@/app/components/Toast";
import { useTranslation } from "@/i18n/TranslationProvider";

export default function CategoriesDashboard() {
  const { categories, loading, error, mutateCategories } = useCategories();
  const [formOpen, setFormOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [selected, setSelected] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const openDeleteModal = (cat: any) => {
    setSelected(cat);
    setOpen(true);
  };
  const { t } = useTranslation();

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleDelete = async () => {
    if (!selected) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/${selected.id}`,
      {
        method: "DELETE",
      },
    );

    const data = await res.json();

    if (!res.ok) {
      showToast(data.error || "Failed to delete category", "error");

      return;
    }

    showToast(data.message || "Category deleted successfully", "success");
    mutateCategories();
    setOpen(false);
  };

  const handleOpenEdit = (category: Category) => {
    setSelectedCategory(category);
    setOpenEdit(true);
  };

  if (loading)
    return <p className="p-6 dark:text-[#fdd3ad]">{t("common.loading")}</p>;
  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-[#F5E1D0]">
            {t("admin.categories.title")}
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-[#fdd3ad]">
            {t("admin.categories.heroDescription")}
          </p>
        </div>

        <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-red-600 shadow-sm">
          {t("common.error")}
        </div>
      </div>
    );
  }

  const totalCategories = categories?.length ?? 0;

  return (
    <div className="p-6 space-y-6">
      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} />}

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-[#F5E1D0]">
            {t("admin.categories.title")}
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-[#fdd3ad]">
            {t("admin.categories.heroDescription")}
          </p>
        </div>

        <button
          onClick={() => setFormOpen(true)}
          className="cursor-pointer mt-6 inline-flex items-center border justify-center rounded-xl bg-teal-700 px-4 py-3 text-sm font-medium text-white transition hover:bg-teal-800 dark:bg-teal-700 dark:hover:bg-teal-600 dark:text-[#fdd3ad] dark:border-[#F5E1D0]"
        >
          {t("admin.categories.create")} +
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-[#0e514c]">
          <p className="text-sm text-slate-500 dark:text-[#fdd3ad]">
            {t("admin.categories.total")}
          </p>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-[#F5E1D0]">
            {totalCategories.toLocaleString(t("common.numberType"))}
          </p>
        </div>
      </div>

      {/* Table / Empty State */}
      <div className=" overflow-hidden rounded-2xl bg-white shadow-sm lg:block dark:bg-[#0e514c]">
        {categories && categories.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-245 text-sm">
              <thead className="bg-slate-50 dark:bg-[#0e514c]">
                <tr className="text-start text-sm text-slate-500 dark:text-[#fdd3ad]">
                  <th className="px-4 py-4 font-medium text-start">
                    {t("admin.categories.fields.image")}
                  </th>
                  <th className="px-4 py-4 font-medium text-start">
                    {t("admin.categories.fields.name")}
                  </th>
                  <th className="px-4 py-4 font-medium text-start">
                    {t("admin.categories.fields.description")}
                  </th>
                  <th className="px-4 py-4 font-medium text-start">
                    {t("admin.categories.fields.createdAt")}
                  </th>
                  <th className="px-4 py-4 font-medium text-start">
                    {t("admin.categories.fields.actions")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {categories.map((category) => {
                  const imageSrc = category.imageUrl;

                  return (
                    <tr
                      key={category.id}
                      className="border-t border-slate-100 transition hover:bg-slate-50/70 dark:border-[#012926] dark:hover:bg-[#058078]/70"
                    >
                      <td className="px-4 py-4">
                        {imageSrc ? (
                          <img
                            src={imageSrc}
                            alt={category.name}
                            className="h-14 w-14 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-[#012926]"
                          />
                        ) : (
                          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 text-xs text-slate-400 dark:bg-[#0e514c] dark:text-[#fdd3ad]">
                            No Image
                          </div>
                        )}
                      </td>

                      <td className="px-4 py-4">
                        <div className="font-semibold text-slate-900 dark:text-[#F5E1D0]">
                          {category.name}
                        </div>
                      </td>

                      <td className="px-4 py-4 text-sm text-slate-600 dark:text-[#fdd3ad]">
                        <div className="max-w-md line-clamp-2">
                          {category.description || "-"}
                        </div>
                      </td>

                      <td className="px-4 py-4 text-sm text-slate-500 dark:text-[#fdd3ad]">
                        {category.createdAt
                          ? new Date(category.createdAt).toLocaleDateString(
                              t("common.numberType"),
                            )
                          : "-"}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            onClick={() => handleOpenEdit(category)}
                            className="cursor-pointer rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100 dark:bg-teal-500 dark:text-blue-100 dark:hover:bg-teal-600"
                          >
                            {t("common.edit")}
                          </button>

                          <button
                            onClick={() =>
                              openDeleteModal({
                                ...category,
                                productsCount: category._count?.products || 0,
                              })
                            }
                            className="cursor-pointer rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100 dark:bg-red-700 dark:text-red-100 dark:hover:bg-red-600"
                            type="button"
                          >
                            {t("common.delete")}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <DeleteCategoryModal
              isOpen={open}
              onClose={() => setOpen(false)}
              onConfirm={handleDelete}
              categoryName={selected?.name || ""}
              productsCount={selected?.productsCount || 0}
            />
            <CategoryModal
              open={openEdit}
              onClose={() => setOpenEdit(false)}
              category={selectedCategory}
              onSaved={(category, massagedCategory, status) =>
                showToast(
                  massagedCategory,
                  status === "success" ? "success" : "error",
                )
              }
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl">
              📂
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-[#F5E1D0]">
              {t("admin.categories.noCategories")}
            </h3>
          </div>
        )}
      </div>
      <CategoryModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSaved={(category, massagedCategory, status) =>
          showToast(
            massagedCategory,
            status === "success" ? "success" : "error",
          )
        }
      />
    </div>
  );
}
