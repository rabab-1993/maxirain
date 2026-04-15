"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
const supabase = createClient();
  const createProduct = async () => {
    let imageUrl = "";

    if (image) {
      const fileName = Date.now() + image.name;

      await supabase.storage.from("Product").upload(fileName, image);

      const { data } = supabase.storage.from("Product").getPublicUrl(fileName);

      imageUrl = data.publicUrl;
    }

    await supabase.from("Product").insert({
      name,
      price,
      image: imageUrl,
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        placeholder="Product name"
        onChange={(e) => setName(e.target.value)}
        className="border p-2"
      />

      <input
        placeholder="Price"
        onChange={(e) => setPrice(e.target.value)}
        className="border p-2"
      />

      <input
        type="file"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />

      <button onClick={createProduct} className="bg-[#0F8F8C] text-white p-2">
        Create
      </button>
    </div>
  );
}
