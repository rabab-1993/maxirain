"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const limit = 5;

  const loadProducts = async () => {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase.from("Product").select("*").range(from, to);

    if (search) {
      query = query.ilike("name", `%${search}%`);
    }

    const { data } = await query;

    setProducts(data || []);
  };

  useEffect(() => {
    loadProducts();
  }, [page, search]);

  const deleteProduct = async (id: string) => {
    await supabase.from("Product").delete().eq("id", id);

    loadProducts();
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-6 font-bold">Products</h1>

      {/* search */}
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <input
          placeholder="Search product..."
          className="border p-2 mb-4 w-64"
          onChange={(e) => setSearch(e.target.value)}
        />

        <Link
          href="/admin/products/new"
          className="bg-[#0F8F8C] text-white px-4 py-2 rounded-3xl mb-4"
        >
          Add Product
        </Link>
      </div>
      {/* table */}

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Image</th>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Price</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">
                {p.image && (
                  <img src={p.image} className="w-16 h-16 object-cover" />
                )}
              </td>

              <td className="border p-2">{p.name}</td>

              <td className="border p-2">${p.price}</td>

              <td className="border p-2 flex gap-2">
                <button
                  onClick={() =>
                    (window.location.href = `/admin/products/edit/${p.id}`)
                  }
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteProduct(p.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* pagination */}

      <div className="flex gap-3 mt-6">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="border px-3 py-1"
        >
          Prev
        </button>

        <span>Page {page}</span>

        <button onClick={() => setPage(page + 1)} className="border px-3 py-1">
          Next
        </button>
      </div>
    </div>
  );
}
