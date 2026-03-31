// "use client";
// import InputField, { Category } from "@/app/components/InputField";
// import { useEffect, useState } from "react";

// export default function CategoriesDashboard() {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [openDelete, setOpenDelete] = useState<number | null>(null);
//   const [formOpen, setFormOpen] = useState(false);
//   const [editing, setEditing] = useState<Category | null>(null);
//   const [errors, setErrors] = useState<Partial<Category>>({});
//   const [err, setErr] = useState(false);
//   const [toast, setToast] = useState(false);
//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     image: null as File | null,
//   });

//   const validate = () => {
//     let newErrors: Partial<Category> = {};

//     if (!form.name.trim()) newErrors.name = "Required";
//     if (!form.description.trim()) newErrors.description = "Required";
//     if (!form.image) newErrors.imageUrl = "Image is required";

//     return newErrors;
//   };
//   const fetchCategories = async () => {
//     const res = await fetch("/api/admin/categories");
//     const data = await res.json();
//     setCategories(data);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const handleDelete = async (id: number) => {
//     try {
//       await fetch("/api/admin/categories", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id }),
//       });

//       setCategories((prev) => prev.filter((c) => c.id !== id));
//       setOpenDelete(null);
//       console.log("Category deleted successfully");
//     } catch (error) {
//       console.error("Error deleting category:", error);
//     }
//   };

//   const handleSubmit = async () => {
//     const validationErrors = validate();
//     setErrors(validationErrors);
//     if (Object.keys(validationErrors).length > 0) return;

//     try {
//       const formData = new FormData();
//       formData.append("name", form.name);
//       formData.append("description", form.description);
//       if (form.image) formData.append("image", form.image);

//       const method = editing ? "PUT" : "POST";

//       if (editing) {
//         formData.append("id", String(editing.id));
//       }

//       await fetch("/api/admin/categories", {
//         method,
//         body: formData,
//       });

//       setForm({ name: "", description: "", image: null });
//       setEditing(null);
//       setFormOpen(false);
//       fetchCategories();
//       setToast(true);
//       setTimeout(() => setToast(false), 3000);
//       console.log("Category saved successfully");
//     } catch (error) {
//       setErr(true);
//       console.error("Error submitting form:", error);
//     }
//   };

//   if (loading) return <p className="p-6">Loading...</p>;

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
//       {/* TOAST NOTIFICATION */}
//       {toast && (
//         <>
//           {!err ? (
//             <div className=" fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-md shadow-lg text-sm ">
//               Category saved successfully
//             </div>
//           ) : (
//             <div className=" fixed bottom-6 right-6 bg-red-600 text-white px-6 py-3 rounded-md shadow-lg text-sm ">
//               Error saving category
//             </div>
//           )}
//         </>
//       )}
//       {/* Table */}
//       <div className="bg-white rounded-2xl shadow overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 text-left">Image</th>
//               <th className="p-3 text-left">Name</th>
//               <th className="p-3 text-left">Description</th>
//               <th className="p-3">Actions</th>
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

//                 {/* Delete Modal */}
//                 {openDelete === cat.id && (
//                   <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
//                     <div className="bg-white p-6 rounded-2xl">
//                       <p className="mb-4">Are you sure?</p>
//                       <div className="flex gap-2 justify-end">
//                         <button onClick={() => setOpenDelete(null)}>
//                           Cancel
//                         </button>
//                         <button
//                           onClick={() => handleDelete(cat.id)}
//                           className="bg-red-500 text-white px-3 py-1 rounded"
//                         >
//                           Confirm
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Form Modal */}
//       {formOpen && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-2xl w-100 space-y-4">
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
//             {/* <input
//               placeholder="Name"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//               className="w-full border p-2 rounded"
//             /> */}

//             {/* <textarea
//               placeholder="Description"
//               value={form.description}
//               onChange={(e) =>
//                 setForm({ ...form, description: e.target.value })
//               }
//               className="w-full border p-2 rounded"
//             /> */}

//             <input
//               type="file"
//               required
//               onChange={(e) =>
//                 setForm({ ...form, image: e.target.files?.[0] || null })
//               }
//             />
//             {/* <input
//               type="file"
//               onChange={(e) =>
//                 setForm({ ...form, image: e.target.files?.[0] || null })
//               }
//             /> */}

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

import InputField, { Category } from "@/app/components/InputField";
import { useEffect, useState } from "react";

export default function CategoriesDashboard() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDelete, setOpenDelete] = useState<number | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [errors, setErrors] = useState<Partial<Category>>({});
  const [err, setErr] = useState(false);
  const [toast, setToast] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    image: null as File | null,
  });

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

  const fetchCategories = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/categories");
    const data = await res.json();
    setCategories(data);
    setLoading(false);    
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await fetch(process.env.NEXT_PUBLIC_API_URL + "/categories/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      setCategories((prev) => prev.filter((c) => c.id !== id));
      setOpenDelete(null);
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

  // ✅ submit
  const handleSubmit = async () => {
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      // let imageUrl = editing?.imageUrl || "";

      // // رفع الصورة
      // if (form.image) {
      //   if (!validateImage(form.image)) return;

      //   const fileName = `${Date.now()}-${form.image.name}`;

      //   const { error: uploadError } = await supabase.storage
      //     .from("categories")
      //     .upload(fileName, form.image);

      //   if (uploadError) throw uploadError;

      //   const { data } = supabase.storage
      //     .from("categories")
      //     .getPublicUrl(fileName);

      //   imageUrl = data.publicUrl;
      // }

      // const method = editing ? "PUT" : "POST";

      // await fetch("/api/admin/categories", {
      //   method,
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     id: editing?.id,
      //     name: form.name,
      //     description: form.description,
      //     imageUrl,
      //   }),
      // });

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      if (form.image) formData.append("image", form.image);

      const method = editing ? "PUT" : "POST";

      if (editing) {
        formData.append("id", String(editing.id));
      }

      await fetch("/api/admin/categories", {
        method,
        body: formData,
      });

      setForm({ name: "", description: "", image: null });
      setPreview(null);
      setEditing(null);
      setFormOpen(false);
      fetchCategories();
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    } catch (error) {
      setErr(true);
      console.error("Error submitting form:", error);
    }
  };

  //   const handleSubmit = async () => {
  //     const validationErrors = validate();
  //     setErrors(validationErrors);
  //     if (Object.keys(validationErrors).length > 0) return;

  //     try {
  //       const formData = new FormData();
  //       formData.append("name", form.name);
  //       formData.append("description", form.description);
  //       if (form.image) formData.append("image", form.image);

  //       const method = editing ? "PUT" : "POST";

  //       if (editing) {
  //         formData.append("id", String(editing.id));
  //       }

  //       await fetch("/api/admin/categories", {
  //         method,
  //         body: formData,
  //       });

  //       setForm({ name: "", description: "", image: null });
  //       setEditing(null);
  //       setFormOpen(false);
  //       fetchCategories();
  //       setToast(true);
  //       setTimeout(() => setToast(false), 3000);
  //       console.log("Category saved successfully");
  //     } catch (error) {
  //       setErr(true);
  //       console.error("Error submitting form:", error);
  //     }
  //   };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Categories Dashboard</h1>
        <button
          onClick={() => setFormOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-xl"
        >
          + Add Category
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-md shadow-lg text-sm">
          Saved successfully ✅
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-t">
                <td className="p-3">
                  {cat.imageUrl && (
                    <img
                      src={cat.imageUrl}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                </td>
                <td className="p-3">{cat.name}</td>
                <td className="p-3">{cat.description}</td>
                <td className="p-3 flex gap-2 justify-center">
                  <button
                    onClick={() => {
                      setEditing(cat);
                      setForm({
                        name: cat.name,
                        description: cat.description,
                        image: null,
                      });
                      setPreview(cat.imageUrl || null);
                      setFormOpen(true);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => setOpenDelete(cat.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </td>

                {/* Delete Modal */}
                {openDelete === cat.id && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-2xl">
                      <p className="mb-4">Are you sure?</p>
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => setOpenDelete(null)}>
                          Cancel
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form Modal */}
      {formOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl w-96 space-y-4">
            <h2 className="text-xl font-bold">
              {editing ? "Edit Category" : "Add Category"}
            </h2>

            <InputField
              name="name"
              label="Category Name"
              value={form.name}
              error={errors.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <InputField
              name="description"
              label="Description"
              textarea
              value={form.description}
              error={errors.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            {/* Drag & Drop */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:border-blue-500"
            >
              <p>Drag & drop an image here or click to select</p>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="fileUpload"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  if (!validateImage(file)) return;

                  setForm({ ...form, image: file });
                  setPreview(URL.createObjectURL(file));
                }}
              />

              <label
                htmlFor="fileUpload"
                className="text-blue-600 cursor-pointer block mt-2"
              >
                select an image
              </label>

              {preview && (
                <img
                  src={preview}
                  className="w-28 h-28 object-cover mx-auto mt-4 rounded-lg"
                />
              )}

              {errors.imageUrl && (
                <p className="text-red-500 text-sm mt-2">{errors.imageUrl}</p>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <button onClick={() => setFormOpen(false)}>Cancel</button>
              <button
                onClick={handleSubmit}
                className="bg-[#0F8F8C] text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
