"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Menu } from "lucide-react";

export default function AdminHeader({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(error.message);
      return;
    }

    router.replace("/login");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 md:hidden"
          type="button"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <h1 className="text-lg font-bold text-slate-900 sm:text-xl">
            Maxirain Admin
          </h1>
          <p className="text-xs text-slate-500 sm:text-sm">Dashboard</p>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="cursor-pointer rounded-xl bg-red-500 px-3 py-2 text-xs font-medium text-white transition hover:bg-red-600 sm:px-4 sm:py-2 sm:text-sm"
      >
        Logout
      </button>
    </header>
  );
}
