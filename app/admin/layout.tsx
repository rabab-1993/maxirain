"use client";
import type { Metadata } from "next";
import Providers from "../(site)/providers";
import "../globals.css";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";
import { useState } from "react";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Maxirain Admin Dashboard</title>
        {/* <link rel="icon" type="image/x-icon" href="/favicon.ico" /> */}
      </head>
      <body>
        <Providers>
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
        </Providers>
      </body>
    </html>
  );
}
