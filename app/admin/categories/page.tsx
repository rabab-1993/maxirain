// import { useCategories } from "@/app/context/CategoriesContext";
// import { useEffect, useState } from "react";

// export default function CategoriesDashboard() {

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Categories Dashboard</h1>
//         <button
//           onClick={() => setFormOpen(true)}
//           className="bg-green-600 text-white px-4 py-2 rounded-xl"
//         >
//           + Add Category
//         </button>
//       </div>

//       {/* Toast */}
//       {toast && (
//         <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-md shadow-lg text-sm">
//           Saved successfully ✅
//         </div>
//       )}

//       {/* Table */}
//       <div className="bg-white rounded-2xl shadow overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 text-left">Image</th>
//               <th className="p-3 text-left">Name</th>
//               <th className="p-3 text-left">Description</th>
//               <th className="p-3 text-center">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {categories.map((cat) => (
//               <tr key={cat.id} className="border-t">
//                 <td className="p-3">
//                   {cat.imageUrl && (
//                     <img
//                       src={cat.imageUrl}
//                       className="w-16 h-16 object-cover rounded-lg"
//                     />
//                   )}
//                 </td>
//                 <td className="p-3">{cat.name}</td>
//                 <td className="p-3">{cat.description}</td>
//                 <td className="p-3 flex gap-2 justify-center">
//                   <button
//                     onClick={() => {
//                       setEditing(cat);
//                       setForm({
//                         name: cat.name,
//                         description: cat.description,
//                         image: null,
//                       });
//                       setPreview(cat.imageUrl || null);
//                       setFormOpen(true);
//                     }}
//                     className="bg-blue-500 text-white px-3 py-1 rounded-lg"
//                   >
//                     Edit
//                   </button>

//                   <button
//                     onClick={() => setOpenDelete(cat.id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded-lg"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {/* Delete Modal */}
//         {openDelete && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
//             <div className="bg-white p-6 rounded-2xl">
//               <p className="mb-4">Are you sure?</p>
//               <div className="flex gap-2 justify-end">
//                 <button onClick={() => setOpenDelete(null)}>Cancel</button>
//                 <button
//                   onClick={() => handleDelete(openDelete)}
//                   className="bg-red-500 text-white px-3 py-1 rounded"
//                 >
//                   Confirm
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Form Modal */}
//       {formOpen && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-2xl w-96 space-y-4">
//             <h2 className="text-xl font-bold">
//               {editing ? "Edit Category" : "Add Category"}
//             </h2>

//             <InputField
//               name="name"
//               label="Category Name"
//               value={form.name}
//               error={errors.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//             />

//             <InputField
//               name="description"
//               label="Description"
//               textarea
//               value={form.description}
//               error={errors.description}
//               onChange={(e) =>
//                 setForm({ ...form, description: e.target.value })
//               }
//             />

//             {/* Drag & Drop */}
//             <div
//               onDrop={handleDrop}
//               onDragOver={handleDragOver}
//               className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:border-blue-500"
//             >
//               <p>Drag & drop an image here or click to select</p>

//               <input
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 id="fileUpload"
//                 onChange={(e) => {
//                   const file = e.target.files?.[0];
//                   if (!file) return;

//                   if (!validateImage(file)) return;

//                   setForm({ ...form, image: file });
//                   setPreview(URL.createObjectURL(file));
//                 }}
//               />

//               <label
//                 htmlFor="fileUpload"
//                 className="text-blue-600 cursor-pointer block mt-2"
//               >
//                 select an image
//               </label>

//               {preview && (
//                 <img
//                   src={preview}
//                   className="w-28 h-28 object-cover mx-auto mt-4 rounded-lg"
//                 />
//               )}

//               {errors.imageUrl && (
//                 <p className="text-red-500 text-sm mt-2">{errors.imageUrl}</p>
//               )}
//             </div>

//             <div className="flex justify-end gap-2">
//               <button onClick={() => setFormOpen(false)}>Cancel</button>
//               <button
//                 onClick={handleSubmit}
//                 className="bg-[#0F8F8C] text-white px-4 py-2 rounded"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
// import { cookies } from "next/headers";
import { useEffect, useState } from "react";
import InputField, { Category } from "@/app/components/InputField";
import { useCategories } from "@/app/context/CategoriesContext";
import CategoryModal from "@/app/components/CategoryModal";

export default function CategoriesDashboard({
  initialCategories,
}: {
  initialCategories: Category[];
}) {
  // const cookieStore = await cookies();
  const supabase = createClient();
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [errors, setErrors] = useState<Partial<Category>>({});
  const [toast, setToast] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const { refreshCategories } = useCategories();
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: null as File | null,
  });

  const fetchCategories = async () => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/categories");
      const data = await res.json();
      setCategories(data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ validation
  const validate = () => {
    let newErrors: Partial<Category> = {};

    if (!form.name.trim()) newErrors.name = "Required";
    if (!form.description.trim()) newErrors.description = "Required";

    if (!form.image && !editing) {
      newErrors.imageUrl = "Image is required";
    }

    return newErrors;
  };

  const validateImage = (file: File) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 2 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        imageUrl: "The file type is not allowed",
      }));
      return false;
    }

    if (file.size > maxSize) {
      setErrors((prev) => ({
        ...prev,
        imageUrl: "The file size is too large",
      }));
      return false;
    }

    return true;
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(process.env.NEXT_PUBLIC_API_URL + "/categories/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      setCategories((prev) => prev.filter((c) => c.id !== id));
      console.log("Category deleted successfully");
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // ✅ Drag & Drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (!validateImage(file)) return;

    setForm({ ...form, image: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // // ✅ submit
  // const handleSubmit = async () => {
  //   const validationErrors = validate();
  //   setErrors(validationErrors);
  //   if (Object.keys(validationErrors).length > 0) return;

  //   try {
  //     const formData = new FormData();
  //     formData.append("name", form.name);
  //     formData.append("description", form.description);
  //     if (form.image) formData.append("image", form.image);

  //     const method = editing ? "PUT" : "POST";

  //     if (editing) {
  //       formData.append("id", String(editing.id));
  //     }

  //     await fetch(process.env.NEXT_PUBLIC_API_URL + "/categories", {
  //       method,
  //       body: formData,
  //     });

  //     setForm({ name: "", description: "", image: null });
  //     setPreview(null);
  //     setEditing(null);
  //     setFormOpen(false);
  //     fetchCategories();
  //     setToast(true);
  //     setTimeout(() => setToast(false), 3000);
  //     refreshCategories();
  //     console.log("Category saved successfully");
  //   } catch (error) {
  //     setErr(true);
  //     console.error("Error submitting form:", error);
  //   }
  // };

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Categories</h2>
          <p className="mt-1 text-sm text-slate-500">
            control and manage your product categories
          </p>
        </div>

        <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-red-600 shadow-sm">
          Failed to load categories.
        </div>
      </div>
    );
  }

  const totalCategories = categories?.length ?? 0;
  const categoriesWithImages =
    categories?.filter((category) => category.imageUrl).length ?? 0;
  const categoriesWithDescriptions =
    categories?.filter((category) => category.description).length ?? 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Categories</h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage your product categories and display them in an organized
            manner within the site
          </p>
        </div>

        <button
          onClick={() => setFormOpen(true)}
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-teal-700 px-4 py-3 text-sm font-medium text-white transition hover:bg-teal-800"
        >
          + Add Category
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">إجمالي الأقسام</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {totalCategories}
          </p>
        </div>
      </div>

      {/* Table / Empty State */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        {categories && categories.length > 0 ? (
          <div>
            <table className="w-full min-w-190">
              <thead className="bg-slate-50">
                <tr className="text-right text-sm text-slate-500">
                  <th className="px-4 py-4 font-medium">الصورة</th>
                  <th className="px-4 py-4 font-medium">الاسم</th>
                  <th className="px-4 py-4 font-medium">الوصف</th>
                  <th className="px-4 py-4 font-medium">تاريخ الإضافة</th>
                  <th className="px-4 py-4 font-medium">الإجراءات</th>
                </tr>
              </thead>

              <tbody>
                {categories.map((category) => {
                  const imageSrc = category.imageUrl;

                  return (
                    <tr
                      key={category.id}
                      className="border-t border-slate-100 transition hover:bg-slate-50/70"
                    >
                      <td className="px-4 py-4">
                        {imageSrc ? (
                          <img
                            src={imageSrc}
                            alt={category.name}
                            className="h-14 w-14 rounded-xl object-cover ring-1 ring-slate-200"
                          />
                        ) : (
                          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 text-xs text-slate-400">
                            لا توجد
                          </div>
                        )}
                      </td>

                      <td className="px-4 py-4">
                        <div className="font-semibold text-slate-900">
                          {category.name}
                        </div>
                      </td>

                      <td className="px-4 py-4 text-sm text-slate-600">
                        <div className="max-w-md line-clamp-2">
                          {category.description || "-"}
                        </div>
                      </td>

                      <td className="px-4 py-4 text-sm text-slate-500">
                        {category.createdAt
                          ? new Date(category.createdAt).toLocaleDateString(
                              "ar-SA",
                            )
                          : "-"}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex flex-wrap items-center gap-2">
                          {/* <Link
                            href={`/admin/categories/${category.id}`}
                            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                          >
                            عرض
                          </Link> */}

                          <button className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100">
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(category.id)}
                            className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
                            type="button"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl">
              📂
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              لا توجد أقسام بعد
            </h3>
            <p className="mt-2 max-w-md text-sm text-slate-500">
              ابدأ بإضافة أول قسم لعرض منتجاتك بشكل منظم داخل لوحة التحكم
              والموقع الرئيسي.
            </p>

            <button
              onClick={() => setFormOpen(true)}
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-teal-700 px-4 py-3 text-sm font-medium text-white transition hover:bg-teal-800"
            >
              + إضافة أول قسم
            </button>
          </div>
        )}
      </div>
      <CategoryModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onCreated={(newCategory) => {
          setCategories((prev) => [newCategory, ...prev]);
          setFormOpen(false);
        }}
      />
    </div>
  );
}
