// "use client";

// import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabase";
// import Link from "next/link";

// export default function ProductsPage() {
//   const [products, setProducts] = useState<any[]>([]);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);

//   const limit = 5;

//   const loadProducts = async () => {
//     const from = (page - 1) * limit;
//     const to = from + limit - 1;

//     let query = supabase.from("Product").select("*").range(from, to);

//     if (search) {
//       query = query.ilike("name", `%${search}%`);
//     }

//     const { data } = await query;

//     setProducts(data || []);
//   };

//   useEffect(() => {
//     loadProducts();
//   }, [page, search]);

//   const deleteProduct = async (id: string) => {
//     await supabase.from("Product").delete().eq("id", id);

//     loadProducts();
//   };

//   return (
//     <div className="p-10">
//       <h1 className="text-2xl mb-6 font-bold">Products</h1>

//       {/* search */}
//       <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
//         <input
//           placeholder="Search product..."
//           className="border p-2 mb-4 w-64"
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <Link
//           href="/admin/products/new"
//           className="bg-[#0F8F8C] text-white px-4 py-2 rounded-3xl mb-4"
//         >
//           Add Product
//         </Link>
//       </div>
//       {/* table */}

//       <table className="w-full border">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-3 border">Image</th>
//             <th className="p-3 border">Name</th>
//             <th className="p-3 border">Price</th>
//             <th className="p-3 border">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {products.map((p) => (
//             <tr key={p.id}>
//               <td className="border p-2">
//                 {p.image && (
//                   <img src={p.image} className="w-16 h-16 object-cover" />
//                 )}
//               </td>

//               <td className="border p-2">{p.name}</td>

//               <td className="border p-2">${p.price}</td>

//               <td className="border p-2 flex gap-2">
//                 <button
//                   onClick={() =>
//                     (window.location.href = `/admin/products/edit/${p.id}`)
//                   }
//                   className="bg-blue-500 text-white px-3 py-1 rounded"
//                 >
//                   Edit
//                 </button>

//                 <button
//                   onClick={() => deleteProduct(p.id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* pagination */}

//       <div className="flex gap-3 mt-6">
//         <button
//           onClick={() => setPage(page - 1)}
//           disabled={page === 1}
//           className="border px-3 py-1"
//         >
//           Prev
//         </button>

//         <span>Page {page}</span>

//         <button onClick={() => setPage(page + 1)} className="border px-3 py-1">
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  isVisible?: boolean;
  imageUrl?: string;
  categoryId?: number;
}

interface Category {
  id: number;
  name: string;
}

export default function ProductsDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    categoryId: "",
    isVisible: true,
    image: null as File | null,
  });

  const fetchData = async () => {
    const [pRes, cRes] = await Promise.all([
      fetch("/api/admin/products"),
      fetch("/api/admin/categories"),
    ]);

    const productsData = await pRes.json();
    const categoriesData = await cRes.json();

    setProducts(productsData);
    setCategories(categoriesData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
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

    await fetch("/api/admin/products", {
      method,
      body: formData,
    });

    setForm({
      name: "",
      price: "",
      description: "",
      categoryId: "",
      isVisible: true,
      image: null,
    });
    setEditing(null);
    setFormOpen(false);
    fetchData();
  };

  const handleDelete = async (id: number) => {
    await fetch("/api/admin/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleteId(null);
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Products Dashboard</h1>
        <button
          onClick={() => setFormOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-xl"
        >
          + Add Product
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Description</th>
              <th className="p-3">Status</th>
              <th className="p-3">Category</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3">
                  {p.imageUrl && (
                    <img
                      src={p.imageUrl}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </td>
                <td className="p-3">{p.name}</td>
                <td className="p-3">${p.price}</td>
                <td className="p-3 max-w-xs truncate">{p.description}</td>
                <td className="p-3">
                  {p.isVisible ? (
                    <span className="text-green-600">Available</span>
                  ) : (
                    <span className="text-red-500">Out of stock</span>
                  )}
                </td>
                <td className="p-3">
                  {categories.find((c) => c.id === p.categoryId)?.name}
                </td>
                <td className="p-3 flex gap-2 justify-center">
                  <button
                    onClick={() => {
                      setEditing(p);
                      setForm({
                        name: p.name,
                        price: String(p.price),
                        description: p.description || "",
                        categoryId: String(p.categoryId || ""),
                        isVisible: p.isVisible ?? true,
                        image: null,
                      });
                      setFormOpen(true);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => setDeleteId(p.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>

                {/* Delete Modal */}
                {deleteId === p.id && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl">
                      <p className="mb-4">Confirm delete?</p>
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => setDeleteId(null)}>
                          Cancel
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Delete
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
          <div className="bg-white p-6 rounded-2xl w-100 space-y-4">
            <h2 className="text-xl font-bold">
              {editing ? "Edit Product" : "Add Product"}
            </h2>

            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border p-2 rounded"
            />

            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full border p-2 rounded"
            />

            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full border p-2 rounded"
            />

            <select
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.isVisible}
                onChange={(e) =>
                  setForm({ ...form, isVisible: e.target.checked })
                }
              />
              Product Available
            </label>

            <input
              type="file"
              onChange={(e) =>
                setForm({ ...form, image: e.target.files?.[0] || null })
              }
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setFormOpen(false)}>Cancel</button>
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded"
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
