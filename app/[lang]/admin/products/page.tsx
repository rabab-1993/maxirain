"use client";

import Toast from "@/app/components/Toast";
import { useCategories } from "@/app/hooks/useCategories";
import { useProducts } from "@/app/hooks/useProducts";
import {
  Product,
  ProductFormErrors,
  ProductFormState,
} from "@/app/types/product";
import { useTranslation } from "@/i18n/TranslationProvider";
import { useMemo, useState } from "react";

const initialForm: ProductFormState = {
  name: "",
  price: "",
  description: "",
  categoryId: "",
  isVisible: true,
  image: null,
};

export default function ProductsDashboard() {
  const [deleting, setDeleting] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [form, setForm] = useState<ProductFormState>(initialForm);
  const [errors, setErrors] = useState<ProductFormErrors>({});
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const acceptedTypes = useMemo(
    () => ["image/jpeg", "image/png", "image/webp"],
    [],
  );
  const { t } = useTranslation();
  const { categories } = useCategories();
  const { mutateProducts, products, loading, error } = useProducts();

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const getCategoryName = (categoryId?: number) => {
    return categories.find((c) => Number(c.id) === categoryId)?.name || "-";
  };

  const validateImage = (file: File) => {
    const maxSize = 2 * 1024 * 1024;

    if (!acceptedTypes.includes(file.type)) {
      return "Unsupported image type. Please use JPG, PNG, or WEBP";
    }

    if (file.size > maxSize) {
      return "Image size must not exceed 2MB";
    }

    return "";
  };

  const validateForm = () => {
    const nextErrors: ProductFormErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "name is required";
    }

    if (!form.price.trim()) {
      nextErrors.price = "price is required";
    } else if (Number(form.price) <= 0) {
      nextErrors.price = "price must be greater than zero";
    }

    if (!form.description.trim()) {
      nextErrors.description = "description is required";
    }

    if (!form.categoryId.trim()) {
      nextErrors.categoryId = "selecting a category is required";
    }

    if (!editing && !form.image) {
      nextErrors.image = "product image is required";
    }

    return nextErrors;
  };

  const handleSetImage = (file: File | null) => {
    if (!file) return;

    const imageError = validateImage(file);

    if (imageError) {
      setErrors((prev) => ({ ...prev, image: imageError }));
      return;
    }

    setErrors((prev) => ({ ...prev, image: undefined }));
    setForm((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  const openCreateModal = () => {
    setEditing(null);
    setForm(initialForm);
    setPreview(null);
    setErrors({});
    setFormOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditing(product);
    setForm({
      name: product.name,
      price: String(product.price),
      description: product.description || "",
      categoryId: String(product.categoryId || ""),
      isVisible: product.isVisible ?? true,
      image: null,
    });
    setPreview(product.imageUrl || null);
    setErrors({});
    setFormOpen(true);
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditing(null);
    setPreview(null);
    setErrors({});
    setDragActive(false);
  };

  const closeFormModal = () => {
    resetForm();
    setFormOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("description", form.description);
      formData.append("categoryId", form.categoryId);
      formData.append("isVisible", String(form.isVisible));
      if (form.image) formData.append("image", form.image);

      const method = editing ? "PUT" : "POST";

      if (editing) {
        formData.append("id", String(editing.id));
      }

      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/products", {
        method,
        body: formData,
      });

      if (!res.ok) {
        let message = editing
          ? t("admin.products.updateFailed")
          : t("admin.products.createFailed");
        try {
          const data = await res.json();
          message = data.error || message;
          showToast(message, "error");
          console.log(message);
        } catch {}
        throw new Error(message);
      }
      showToast(
        editing
          ? t("admin.products.productUpdated")
          : t("admin.products.productCreated"),
        "success",
      );
      mutateProducts();
      closeFormModal();
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit: error instanceof Error ? error.message : t("common.error"),
      }));
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  const handleDelete = async (id: number) => {
    setDeleting(true);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.error || t("admin.products.deleteFailed"), "error");

        throw new Error("Delete failed");
      }
      showToast(data.message || t("admin.products.productDeleted"), "success");
      mutateProducts();
      setDeleteId(null);
      setDeleting(false);
    } catch (error) {
      showToast(t("admin.products.deleteFailed"), "error");
      setDeleting(false);
    }
  };

  const totalProducts = products.length;

  if (loading) {
    return (
      <p className="p-6 text-slate-500 dark:text-[#fdd3ad]">
        {t("common.loading")}
      </p>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-[#F5E1D0]">
            {t("admin.products.title")}
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-[#fdd3ad]">
            {t("admin.products.heroDescription")}
          </p>
        </div>

        <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-red-600 shadow-sm">
          {t("admin.products.loadFailed")}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} />}
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-[#F5E1D0]">
            {t("admin.products.title")}
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-[#fdd3ad]">
            {t("admin.products.heroDescription")}
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="cursor-pointer inline-flex w-full items-center justify-center rounded-xl bg-teal-700 px-4 py-3 text-sm font-medium text-white transition border hover:bg-teal-800 sm:w-auto  dark:hover:bg-teal-600 dark:text-[#fdd3ad] dark:border-[#F5E1D0]"
        >
          {t("admin.products.create")}
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6 dark:bg-[#0e514c]">
          <p className="text-sm text-slate-500 dark:text-[#fdd3ad]">
            {t("admin.products.total")}
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-[#F5E1D0]">
            {totalProducts.toLocaleString(t("common.numberType"))}
          </p>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm lg:block dark:bg-[#0e514c]">
        {products.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-245">
              <thead className="bg-slate-50 dark:bg-[#0e514c]">
                <tr className="text-start text-sm text-slate-500 dark:text-[#fdd3ad]">
                  <th className="px-4 py-4 font-medium text-start">
                    {t("admin.products.fields.image")}
                  </th>
                  <th className="px-4 py-4 font-medium text-start">
                    {t("admin.products.fields.name")}
                  </th>
                  <th className="px-4 py-4 font-medium text-start">
                    {t("admin.products.fields.price")}
                  </th>
                  <th className="px-4 py-4 font-medium text-start">
                    {t("admin.products.fields.description")}
                  </th>
                  <th className="px-4 py-4 font-medium text-start">
                    {t("admin.products.fields.status")}
                  </th>
                  <th className="px-4 py-4 font-medium text-start">
                    {t("admin.products.fields.category")}
                  </th>
                  <th className="px-4 py-4 font-medium text-start">
                    {t("admin.products.fields.actions")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-t border-slate-100 transition hover:bg-slate-50/70 dark:border-[#012926] dark:hover:bg-[#058078]/70"
                  >
                    <td className="px-4 py-4">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-14 w-14 rounded-xl object-cover ring-1 ring-slate-200"
                        />
                      ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 text-xs text-slate-400">
                          No image
                        </div>
                      )}
                    </td>

                    <td className="px-4 py-4 font-semibold text-slate-900 dark:text-[#F5E1D0]">
                      {product.name}
                    </td>

                    <td className="px-4 py-4 text-sm font-medium text-slate-700 dark:text-[#F5E1D0]">
                      {Number(product.price).toLocaleString(
                        t("common.numberType"),
                      )}
                      {t("common.numberType") === "ar-SA" ? (
                        <span className="text-base"> &#x20C1; </span>
                      ) : (
                        <span className="font-bold text-base"> SAR</span>
                      )}
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-600 dark:text-[#F5E1D0]">
                      <div className="max-w-xs line-clamp-2">
                        {product.description || "-"}
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      {product.isVisible ? (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-700 dark:text-green-100">
                          {t("admin.products.fields.visible")}
                        </span>
                      ) : (
                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700 dark:bg-red-800 dark:text-red-100">
                          {t("admin.products.fields.hidden")}
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-600 dark:text-[#F5E1D0]">
                      {getCategoryName(product.categoryId)}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => openEditModal(product)}
                          className="cursor-pointer rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100 dark:bg-teal-500 dark:text-blue-100 dark:hover:bg-teal-600"
                        >
                          {t("common.edit")}
                        </button>

                        <button
                          onClick={() => setDeleteId(product.id)}
                          className="cursor-pointer rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100 dark:bg-red-700 dark:text-red-100 dark:hover:bg-red-600"
                        >
                          {t("common.delete")}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState onAdd={openCreateModal} t={t} />
        )}
      </div>

      {/* Mobile / Tablet Cards */}
      <div className="grid gap-4 lg:hidden">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl bg-white p-4 shadow-sm sm:p-5 dark:bg-[#0e514c]"
            >
              <div className="flex items-start gap-4">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-16 w-16 shrink-0 rounded-xl object-cover ring-1 ring-slate-200"
                  />
                ) : (
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs text-slate-400">
                    No image
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-base font-bold text-slate-900 dark:text-[#F5E1D0]">
                    {product.name}
                  </h3>

                  <p className="mt-1 text-sm font-medium text-slate-700 dark:text-[#F5E1D0]">
                    {Number(product.price).toLocaleString(
                      t("common.numberType"),
                    )}
                    {t("common.numberType") === "ar-SA" ? (
                      <span className="text-base"> &#x20C1; </span>
                    ) : (
                      <span className="font-bold text-base"> SAR</span>
                    )}
                  </p>

                  <p className="mt-2 line-clamp-3 text-sm text-slate-500 dark:text-[#F5E1D0]">
                    {product.description || "-"}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {product.isVisible ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:text-green-100 dark:bg-green-700">
                        {t("admin.products.fields.available")}
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700 dark:text-red-100 dark:bg-red-800">
                        {t("admin.products.fields.outOfStock")}
                      </span>
                    )}

                    <span className="text-xs text-slate-400 dark:text-[#F5E1D0]">
                      {getCategoryName(product.categoryId)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  onClick={() => openEditModal(product)}
                  className="cursor-pointer rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100 dark:bg-teal-500 dark:text-blue-100 dark:hover:bg-teal-600"
                >
                  {t("common.edit")}
                </button>

                <button
                  onClick={() => setDeleteId(product.id)}
                  className="cursor-pointer rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100 dark:bg-red-700 dark:text-red-100 dark:hover:bg-red-600"
                >
                  {t("common.delete")}
                </button>
              </div>
            </div>
          ))
        ) : (
          <EmptyState onAdd={openCreateModal} t={t} />
        )}
      </div>

      {/* Delete Modal */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-[#085E5A]">
            <h3 className="text-lg font-bold text-slate-900 dark:text-[#F5E1D0]">
              {t("common.heroDelete")}
            </h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-[#F5E1D0]">
              {t("common.confirmDelete")}
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={() => setDeleteId(null)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium
                 text-slate-700 transition hover:bg-slate-50 sm:w-auto dark:border-[#012926] 
                dark:text-[#fdd3ad] dark:hover:bg-[#058078]/70 cursor-pointer"
              >
                {t("common.cancel")}
              </button>

              <button
                onClick={() => handleDelete(deleteId)}
                className="cursor-pointer w-full rounded-xl bg-red-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-red-600 sm:w-auto dark:bg-red-700 dark:hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting ? t("common.deleting") : t("common.delete")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {formOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 p-0 sm:p-4">
          <div className="flex min-h-full items-end justify-center sm:items-center">
            <div className="flex h-dvh w-full flex-col overflow-hidden bg-white shadow-2xl sm:h-auto sm:max-h-[90vh] sm:max-w-5xl sm:rounded-3xl dark:bg-[#085E5A]">
              <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-4 py-4 sm:px-6">
                <h3 className="text-lg font-bold text-slate-900 sm:text-xl dark:text-[#fdd3ad]">
                  {editing
                    ? t("admin.products.edit")
                    : t("admin.products.create")}
                </h3>

                <button
                  onClick={closeFormModal}
                  className="cursor-pointer shrink-0 rounded-xl px-3 py-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700
                  dark:text-[#fdd3ad] dark:hover:text-[#F5E1D0] dark:hover:bg-[#058078]/70"
                  type="button"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="flex h-full flex-col px-4  py-6 sm:px-6">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-[#F5E1D0]">
                        {t("admin.products.fields.name")}
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => {
                          setForm((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }));
                          if (errors.name) {
                            setErrors((prev) => ({
                              ...prev,
                              name: undefined,
                            }));
                          }
                        }}
                        className={`w-full rounded-xl border px-4 py-3 outline-none transition dark:text-[#fef0e4] ${
                          errors.name
                            ? "border-red-300 focus:border-red-400"
                            : "border-slate-200 focus:border-teal-600 dark:border-[#012926] dark:focus:border-[#058078]"
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-2 text-sm text-red-500">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-[#F5E1D0]">
                          {t("admin.products.fields.price")}
                        </label>
                        <input
                          type="number"
                          value={form.price}
                          onChange={(e) => {
                            setForm((prev) => ({
                              ...prev,
                              price: e.target.value,
                            }));
                            if (errors.price) {
                              setErrors((prev) => ({
                                ...prev,
                                price: undefined,
                              }));
                            }
                          }}
                          placeholder="199"
                          className={`w-full rounded-xl border px-4 py-3 outline-none transition dark:text-[#fef0e4] ${
                            errors.price
                              ? "border-red-300 focus:border-red-400"
                              : "border-slate-200 focus:border-teal-600 dark:border-[#012926] dark:focus:border-[#058078]"
                          }`}
                        />
                        {errors.price && (
                          <p className="mt-2 text-sm text-red-500">
                            {errors.price}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-[#F5E1D0]">
                          {t("admin.products.fields.category")}
                        </label>
                        <select
                          value={form.categoryId}
                          onChange={(e) => {
                            setForm((prev) => ({
                              ...prev,
                              categoryId: e.target.value,
                            }));
                            if (errors.categoryId) {
                              setErrors((prev) => ({
                                ...prev,
                                categoryId: undefined,
                              }));
                            }
                          }}
                          className={`w-full rounded-xl border px-4 py-3 outline-none transition dark:text-[#fef0e4] ${
                            errors.categoryId
                              ? "border-red-300 focus:border-red-400"
                              : "border-slate-200 focus:border-teal-600 dark:bg-[#0e514c] dark:border-[#012926] dark:focus:border-[#058078]"
                          }`}
                        >
                          <option value="">
                            {t("admin.products.fields.selectedCategory")}
                          </option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                        {errors.categoryId && (
                          <p className="mt-2 text-sm text-red-500">
                            {errors.categoryId}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-[#F5E1D0]">
                        {t("admin.products.fields.description")}
                      </label>
                      <textarea
                        value={form.description}
                        onChange={(e) => {
                          setForm((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }));
                          if (errors.description) {
                            setErrors((prev) => ({
                              ...prev,
                              description: undefined,
                            }));
                          }
                        }}
                        rows={5}
                        className={`w-full rounded-xl border px-4 py-3 outline-none transition dark:text-[#fef0e4]  ${
                          errors.description
                            ? "border-red-300 focus:border-red-400"
                            : "border-slate-200 focus:border-teal-600 dark:border-[#012926] dark:focus:border-[#058078]"
                        }`}
                      />
                      {errors.description && (
                        <p className="mt-2 text-sm text-red-500">
                          {errors.description}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-[#F5E1D0]">
                        {t("admin.products.fields.image")}
                      </label>

                      <div
                        onDrop={(e) => {
                          e.preventDefault();
                          setDragActive(false);
                          const file = e.dataTransfer.files?.[0] ?? null;
                          handleSetImage(file);
                        }}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setDragActive(true);
                        }}
                        onDragLeave={() => setDragActive(false)}
                        className={`rounded-2xl border-2 border-dashed p-4 text-center transition sm:p-6 ${
                          dragActive
                            ? "border-teal-600 bg-teal-50"
                            : errors.image
                              ? "border-red-300 bg-red-50/40"
                              : "border-slate-300 bg-slate-50 dark:border-[#012926] dark:bg-[#0e514c]"
                        }`}
                      >
                        <input
                          id="product-image-modal"
                          type="file"
                          accept="image/png,image/jpeg,image/webp"
                          onChange={(e) =>
                            handleSetImage(e.target.files?.[0] ?? null)
                          }
                          className="hidden"
                        />

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl shadow-sm dark:bg-[#012926] dark:text-[#fdd3ad]">
                          🖼️
                        </div>

                        <p className="mt-4 text-sm font-medium text-slate-700 dark:text-[#F5E1D0]">
                          {t("common.imageUpload")}
                        </p>

                        <p className="mt-1 text-xs text-slate-500 dark:text-[#F5E1D0]">
                          {t("common.imageHint")}
                        </p>

                        <label
                          htmlFor="product-image-modal"
                          className="mt-4 inline-flex cursor-pointer items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-[#012926] dark:text-[#fdd3ad] dark:hover:bg-[#058078]/70"
                        >
                          {t("common.image")}
                        </label>

                        {preview && (
                          <div className="mt-5">
                            <img
                              src={preview}
                              alt="Preview"
                              className="mx-auto h-40 w-full max-w-xs rounded-xl object-cover ring-1 ring-slate-200 dark:ring-[#012926]"
                            />
                          </div>
                        )}
                      </div>

                      {errors.image && (
                        <p className="mt-2 text-sm text-red-500">
                          {errors.image}
                        </p>
                      )}
                    </div>

                    <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 dark:border-[#012926]">
                      <input
                        type="checkbox"
                        checked={form.isVisible}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            isVisible: e.target.checked,
                          }))
                        }
                      />
                      <span className="text-sm font-medium text-slate-700 dark:text-[#F5E1D0]">
                        {t("admin.products.fields.isVisible")}
                      </span>
                    </label>

                    {errors.submit && (
                      <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {errors.submit}
                      </div>
                    )}

                    <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                      <button
                        type="button"
                        onClick={closeFormModal}
                        className="cursor-pointer w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 sm:w-auto dark:border-[#fdd3ad] dark:text-[#fdd3ad] dark:hover:bg-[#058078]/70"
                      >
                        {t("common.cancel")}
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="cursor-pointer rounded-xl bg-teal-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-teal-500 dark:hover:bg-teal-600 dark:disabled:bg-teal-400"
                      >
                        {submitting
                          ? editing
                            ? t("common.update")
                            : t("common.creating")
                          : editing
                            ? t("common.edit")
                            : t("common.save")}
                      </button>
                      {/* <button
                        type="submit"
                        disabled={submitting}
                        className="cursor-pointer w-full rounded-xl bg-teal-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto dark:bg-[#012926] dark:text-[#fdd3ad] dark:hover:bg-[#058078]/70"
                      >
                        {submitting
                          ? t("common.saving")
                          : editing
                            ? t("common.edit")
                            : t("common.save")}
                      </button> */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function EmptyState({ onAdd, t }: { onAdd: () => void; t: any }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl dark:bg-[#012926]">
        📦
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-[#F5E1D0]">
        {t("admin.products.noProducts")}
      </h3>
    </div>
  );
}
