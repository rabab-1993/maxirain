"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";

export default function Admin() {
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="flex">
      <div className="p-10">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
