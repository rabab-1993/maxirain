"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*");

    setProducts(data || []);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p: any) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
