"use client";
import type { Metadata } from "next";
import Sidebar from "../components/Sidebar";
import Providers from "../(site)/providers";
import "../globals.css";
import { CategoriesProvider } from "../context/CategoriesContext";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";
import { useState } from "react";
// export const metadata: Metadata = {
//   title: "Maxirain | Smart Water Management",
//   description: "Innovative irrigation and water-efficient technologies",
// };

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <CategoriesProvider>
            <div className="min-h-screen bg-slate-50">
              <div className="flex min-h-screen">
                <AdminSidebar
                  open={sidebarOpen}
                  onClose={() => setSidebarOpen(false)}
                />

                <div className="flex min-h-screen min-w-0 flex-1 flex-col">
                  <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
                  <main className="flex-1 p-4 sm:p-6">{children}</main>
                </div>
              </div>
            </div>
          </CategoriesProvider>
        </Providers>
      </body>
    </html>
  );
}
