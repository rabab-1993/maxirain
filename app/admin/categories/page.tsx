// "use client";

// import { useEffect, useState } from "react";

// export default function CategoriesPage() {
//   const [name, setName] = useState("");
//   const [categories, setCategories] = useState<any[]>([]);

//   const loadCategories = async () => {
//     const res = await fetch("/api/admin/categories");
//     const data = await res.json();
//     setCategories(data || []);
//   };
//   useEffect(() => {
//     loadCategories();
//   }, []);

//   async function createCategory() {
//     await fetch("/api/admin/categories", {
//       method: "POST",
//       body: JSON.stringify({
//         name,
//         slug: name.toLowerCase(),
//       }),
//     });
//     setName("");
//     loadCategories();
//   }

//   return (
//     <div className="p-10 max-w-xl">
//       <h1 className="text-2xl font-bold mb-6">Categories</h1>

//       {/* form */}

//       <div className="flex gap-2 mb-6">
//         <input
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Category name"
//           className="border p-2 flex-1"
//         />

//         <button
//           onClick={createCategory}
//           className="bg-green-600 text-white px-4 py-2 rounded"
//         >
//           Add
//         </button>
//       </div>

//       {/* list */}

//       <div className="space-y-2">
//         {categories.map((c) => (
//           <div key={c.id} className="border p-3 rounded">
//             {c.name}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";

export default function CategoriesPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [categories, setCategories] = useState<any[]>([]);

  const loadCategories = async () => {
    const res = await fetch("/api/admin/categories");
    const data = await res.json();
    setCategories(data || []);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const createCategory = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    if (image) {
      formData.append("image", image);
    }

    await fetch("/api/admin/categories", {
      method: "POST",
      body: formData,
    });

    setName("");
    setDescription("");
    setImage(null);

    loadCategories();
  };

  return (
    <div className="p-10 max-w-2xl">
      {" "}
      <h1 className="text-2xl font-bold mb-6">Categories</h1>
      {/* form */}
      <div className="space-y-3 mb-8">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name"
          className="border p-2 w-full"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Category description"
          className="border p-2 w-full"
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />

        <button
          onClick={createCategory}
          className="bg-[#0F8F8C] text-white px-4 py-2 rounded"
        >
          Add Category
        </button>
      </div>
      {/* categories list */}
      <div className="space-y-4">
        {categories.map((c) => (
          <div key={c.id} className="border p-4 rounded flex gap-4">
            <img src={c.imageUrl} className="w-20 h-20 object-cover rounded" />

            <div>
              <h2 className="font-bold">{c.name}</h2>
              <p className="text-sm text-gray-600">{c.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
