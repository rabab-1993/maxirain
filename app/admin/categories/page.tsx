"use client";

import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
}

export default function CategoriesDashboard() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDelete, setOpenDelete] = useState<number | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    image: null as File | null,
  });

  const fetchCategories = async () => {
    const res = await fetch("/api/admin/categories");
    const data = await res.json();
    setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: number) => {
    await fetch("/api/admin/categories", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    setCategories((prev) => prev.filter((c) => c.id !== id));
    setOpenDelete(null);
  };

  const handleSubmit = async () => {
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
    setEditing(null);
    setFormOpen(false);
    fetchCategories();
  };

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

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3">Actions</th>
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
          <div className="bg-white p-6 rounded-2xl w-100 space-y-4">
            <h2 className="text-xl font-bold">
              {editing ? "Edit Category" : "Add Category"}
            </h2>

            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
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
