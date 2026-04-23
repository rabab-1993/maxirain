"use client";

import { useState, type ReactNode } from "react";
import AdminSidebar from "@/app/components/admin/AdminSidebar";
import { Lang } from "@/i18n/config";
import AdminHeader from "@/app/components/admin/AdminHeader";

type Props = {
  children: ReactNode;
  lang: Lang;
};

export default function AdminShell({children,  lang, }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        lang={lang as Lang}
      />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <AdminHeader
          onMenuClick={() => setSidebarOpen(true)}
          lang={lang as Lang}
        />
        {/* <AdminDashboardPage labels={labels} /> */}
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
