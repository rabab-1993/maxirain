"use client";

import { useState } from "react";

export default function CategoriesPage() {
  const [name, setName] = useState("");

  const createCategory = async () => {
    await fetch("/api/categories", {
      method: "POST",
      body: JSON.stringify({
        name,
        slug: name.toLowerCase(),
      }),
    });
  };

  return (
    <div>
      <h1>Create Category</h1>

      <input value={name} onChange={(e) => setName(e.target.value)} />

      <button onClick={createCategory}>Add</button>
    </div>
  );
}
