"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";

export default function EditProduct() {
  const { id } = useParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setName(data.name);
        setPrice(data.price);
      }
    };

    load();
  }, []);

  const update = async () => {
    await supabase
      .from("products")
      .update({
        name,
        price,
      })
      .eq("id", id);

    router.push("/admin/products");
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-6">Edit Product</h1>

      <div className="flex flex-col gap-3 w-64">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2"
        />

        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2"
        />

        <button onClick={update} className="bg-green-600 text-white p-2">
          Update
        </button>
      </div>
    </div>
  );
}
