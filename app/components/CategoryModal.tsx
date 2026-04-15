// "use client";

// import { useMemo, useState } from "react";
// import { useCategories } from "../context/CategoriesContext";
// import type { Category } from "@/app/types/category";

// type FormErrors = {
//   name?: string;
//   description?: string;
//   image?: string;
//   submit?: string;
// };

// export default function CreateCategoryModal({
//   open,
//   onClose,
//   onCreated,
// }: {
//   open: boolean;
//   onClose: () => void;
//   onCreated: (category: Category) => void;
// }) {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);
//   const [dragActive, setDragActive] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [errors, setErrors] = useState<FormErrors>({});

//   const { refreshCategories } = useCategories();

//   const acceptedTypes = useMemo(
//     () => ["image/jpeg", "image/png", "image/webp"],
//     [],
//   );

//   if (!open) return null;

//   const validateImage = (file: File) => {
//     const maxSize = 2 * 1024 * 1024;

//     if (!acceptedTypes.includes(file.type)) {
//       return "The image must be in JPG, PNG, or WEBP format";
//     }

//     if (file.size > maxSize) {
//       return "The image size must not exceed 2MB";
//     }

//     return "";
//   };

//   const validateForm = () => {
//     const nextErrors: FormErrors = {};

//     if (!name.trim()) nextErrors.name = "Required category name";
//     if (!description.trim())
//       nextErrors.description = "Required category description";
//     if (!image) nextErrors.image = "Required category image";

//     return nextErrors;
//   };

//   const handleSetImage = (file: File | null) => {
//     if (!file) return;

//     const imageError = validateImage(file);

//     if (imageError) {
//       setErrors((prev) => ({ ...prev, image: imageError }));
//       return;
//     }

//     setErrors((prev) => ({ ...prev, image: undefined }));
//     setImage(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   const handleSubmit = async (e: React.SubmitEvent) => {
//     e.preventDefault();

//     const nextErrors = validateForm();
//     setErrors(nextErrors);

//     if (Object.keys(nextErrors).length > 0) return;

//     setSubmitting(true);

//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("description", description);
//       if (image) formData.append("image", image);

//       const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/categories", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       refreshCategories();
//       if (!res.ok) {
//         throw new Error(data.error || "failed to create category");
//       }

//       onCreated(data.category);
//       setName("");
//       setDescription("");
//       setImage(null);
//       setPreview(null);
//       setErrors({});
//     } catch (error) {
//       setErrors((prev) => ({
//         ...prev,
//         submit: error instanceof Error ? error.message : "unxpected error",
//       }));
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-black/50 p-0 sm:p-4">
//       <div className="flex min-h-full items-center justify-center sm:items-center">
//         <div className="flex h-dvh w-screen flex-col overflow-hidden bg-white shadow-2xl sm:h-auto sm:max-h-[90vh] sm:max-w-4xl sm:rounded-3xl">
//           <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 sm:px-6">
//             <div>
//               <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
//                 Create New Category
//               </h3>
//             </div>

//             <button
//               onClick={onClose}
//               className="shrink-0 rounded-xl px-3 py-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
//               type="button"
//             >
//               ✕
//             </button>
//           </div>

//           <div className="flex-1 overflow-y-auto ">
//             <div className="flex h-full flex-col px-4  py-6 sm:px-6">
//               <form onSubmit={handleSubmit} className="space-y-5">
//                 <div>
//                   <label className="mb-2 block text-sm font-medium text-slate-700">
//                     Category Name
//                   </label>
//                   <input
//                     type="text"
//                     value={name}
//                     onChange={(e) => {
//                       setName(e.target.value);
//                       if (errors.name) {
//                         setErrors((prev) => ({ ...prev, name: undefined }));
//                       }
//                     }}
//                     placeholder="Category Name"
//                     className={`w-full rounded-xl border px-4 py-3 outline-none transition ${
//                       errors.name
//                         ? "border-red-300 focus:border-red-400"
//                         : "border-slate-200 focus:border-teal-600"
//                     }`}
//                   />
//                   {errors.name && (
//                     <p className="mt-2 text-sm text-red-500">{errors.name}</p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="mb-2 block text-sm font-medium text-slate-700">
//                     Description
//                   </label>
//                   <textarea
//                     value={description}
//                     onChange={(e) => {
//                       setDescription(e.target.value);
//                       if (errors.description) {
//                         setErrors((prev) => ({
//                           ...prev,
//                           description: undefined,
//                         }));
//                       }
//                     }}
//                     placeholder="Describe the category"
//                     rows={5}
//                     className={`w-full rounded-xl border px-4 py-3 outline-none transition ${
//                       errors.description
//                         ? "border-red-300 focus:border-red-400"
//                         : "border-slate-200 focus:border-teal-600"
//                     }`}
//                   />
//                   {errors.description && (
//                     <p className="mt-2 text-sm text-red-500">
//                       {errors.description}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="mb-2 block text-sm font-medium text-slate-700">
//                     Category Image
//                   </label>

//                   <div
//                     onDrop={(e) => {
//                       e.preventDefault();
//                       setDragActive(false);
//                       const file = e.dataTransfer.files?.[0] ?? null;
//                       handleSetImage(file);
//                     }}
//                     onDragOver={(e) => {
//                       e.preventDefault();
//                       setDragActive(true);
//                     }}
//                     onDragLeave={() => setDragActive(false)}
//                     className={`rounded-2xl border-2 border-dashed p-6 text-center transition ${
//                       dragActive
//                         ? "border-teal-600 bg-teal-50"
//                         : errors.image
//                           ? "border-red-300 bg-red-50/40"
//                           : "border-slate-300 bg-slate-50"
//                     }`}
//                   >
//                     <input
//                       id="category-image-modal"
//                       type="file"
//                       accept="image/png,image/jpeg,image/webp"
//                       onChange={(e) =>
//                         handleSetImage(e.target.files?.[0] ?? null)
//                       }
//                       className="hidden"
//                     />

//                     <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl shadow-sm">
//                       🖼️
//                     </div>

//                     <p className="mt-4 text-sm font-medium text-slate-700">
//                       Drag & drop your image here, or click to select a file
//                     </p>

//                     <p className="mt-1 text-xs text-slate-500">
//                       JPG / PNG / WEBP — max size 2MB
//                     </p>

//                     <label
//                       htmlFor="category-image-modal"
//                       className="mt-4 inline-flex cursor-pointer items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
//                     >
//                       choose Image
//                     </label>

//                     {preview && (
//                       <div className="mt-5">
//                         <img
//                           src={preview}
//                           alt="Preview"
//                           className="mx-auto h-40 w-full max-w-xs rounded-xl object-cover ring-1 ring-slate-200"
//                         />
//                       </div>
//                     )}
//                   </div>

//                   {errors.image && (
//                     <p className="mt-2 text-sm text-red-500">{errors.image}</p>
//                   )}
//                 </div>

//                 {errors.submit && (
//                   <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
//                     {errors.submit}
//                   </div>
//                 )}

//                 <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
//                   <button
//                     type="button"
//                     onClick={onClose}
//                     className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     type="submit"
//                     disabled={submitting}
//                     className="rounded-xl bg-teal-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
//                   >
//                     {submitting ? "Saving..." : "Save"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useMemo, useState } from "react";
import type { Category } from "@/app/types/category";
import { useCategories } from "@/app/hooks/useCategories";

type FormErrors = {
  name?: string;
  description?: string;
  image?: string;
  submit?: string;
};

type CategoryModalProps = {
  open: boolean;
  onClose: () => void;
  onSaved?: (category: Category) => void;
  category?: Category | null;
};

export default function CategoryModal({
  open,
  onClose,
  onSaved,
  category = null,
}: CategoryModalProps) {
  const isEditMode = Boolean(category);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const { mutateCategories } = useCategories();

  const acceptedTypes = useMemo(
    () => ["image/jpeg", "image/png", "image/webp"],
    [],
  );

  useEffect(() => {
    if (!open) return;

    setName(category?.name ?? "");
    setDescription(category?.description ?? "");
    setPreview(category?.imageUrl ?? null);
    setImage(null);
    setErrors({});
    setDragActive(false);
    setSubmitting(false);
  }, [open, category]);

  if (!open) return null;

  const resetForm = () => {
    setName("");
    setDescription("");
    setImage(null);
    setPreview(null);
    setErrors({});
    setDragActive(false);
    setSubmitting(false);
  };

  const validateImage = (file: File) => {
    const maxSize = 2 * 1024 * 1024;

    if (!acceptedTypes.includes(file.type)) {
      return "The image must be in JPG, PNG, or WEBP format";
    }

    if (file.size > maxSize) {
      return "The image size must not exceed 2MB";
    }

    return "";
  };

  const validateForm = () => {
    const nextErrors: FormErrors = {};

    if (!name.trim()) nextErrors.name = "Required category name";
    if (!description.trim()) {
      nextErrors.description = "Required category description";
    }

    if (!isEditMode && !image && !preview) {
      nextErrors.image = "Required category image";
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
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("description", description.trim());

      if (image) {
        formData.append("image", image);
      }

      const method: "POST" | "PUT" = isEditMode ? "PUT" : "POST";

      if (isEditMode && category?.id) {
        formData.append("id", String(category.id));
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
        method,
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.error ||
            (isEditMode
              ? "Failed to update category"
              : "Failed to create category"),
        );
      }

      await mutateCategories();

      const savedCategory: Category =
        data.category ?? data.updatedCategory ?? data;

      onSaved?.(savedCategory);
      handleClose();
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit: error instanceof Error ? error.message : "Unexpected error",
      }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 p-0 sm:p-4">
      <div className="flex min-h-full items-center justify-center sm:items-center">
        <div className="flex h-dvh w-screen flex-col overflow-hidden bg-white shadow-2xl sm:h-auto sm:max-h-[90vh] sm:max-w-4xl sm:rounded-3xl">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 sm:px-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
                {isEditMode ? "Edit Category" : "Create New Category"}
              </h3>
            </div>

            <button
              onClick={handleClose}
              className="shrink-0 rounded-xl px-3 py-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              type="button"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="flex h-full flex-col px-4 py-6 sm:px-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) {
                        setErrors((prev) => ({ ...prev, name: undefined }));
                      }
                    }}
                    placeholder="Category Name"
                    className={`w-full rounded-xl border px-4 py-3 outline-none transition ${
                      errors.name
                        ? "border-red-300 focus:border-red-400"
                        : "border-slate-200 focus:border-teal-600"
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      if (errors.description) {
                        setErrors((prev) => ({
                          ...prev,
                          description: undefined,
                        }));
                      }
                    }}
                    placeholder="Describe the category"
                    rows={5}
                    className={`w-full rounded-xl border px-4 py-3 outline-none transition ${
                      errors.description
                        ? "border-red-300 focus:border-red-400"
                        : "border-slate-200 focus:border-teal-600"
                    }`}
                  />
                  {errors.description && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.description}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Category Image
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
                    className={`rounded-2xl border-2 border-dashed p-6 text-center transition ${
                      dragActive
                        ? "border-teal-600 bg-teal-50"
                        : errors.image
                          ? "border-red-300 bg-red-50/40"
                          : "border-slate-300 bg-slate-50"
                    }`}
                  >
                    <input
                      id="category-image-modal"
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={(e) =>
                        handleSetImage(e.target.files?.[0] ?? null)
                      }
                      className="hidden"
                    />

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl shadow-sm">
                      🖼️
                    </div>

                    <p className="mt-4 text-sm font-medium text-slate-700">
                      Drag & drop your image here, or click to select a file
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      JPG / PNG / WEBP — max size 2MB
                    </p>

                    <label
                      htmlFor="category-image-modal"
                      className="mt-4 inline-flex cursor-pointer items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                    >
                      choose Image
                    </label>

                    {preview && (
                      <div className="mt-5">
                        <img
                          src={preview}
                          alt="Preview"
                          className="mx-auto h-40 w-full max-w-xs rounded-xl object-cover ring-1 ring-slate-200"
                        />
                      </div>
                    )}
                  </div>

                  {errors.image && (
                    <p className="mt-2 text-sm text-red-500">{errors.image}</p>
                  )}
                </div>
                {errors.submit && (
                  <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {errors.submit}
                  </div>
                )}

                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-xl bg-teal-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting
                      ? isEditMode
                        ? "Updating..."
                        : "Creating..."
                      : isEditMode
                        ? "Update Category"
                        : "Create Category"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
