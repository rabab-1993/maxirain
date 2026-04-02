import Sidebar from "../components/Sidebar";
import Providers from "../(site)/providers";
import "../globals.css";
import { CategoriesProvider } from "../context/CategoriesContext";
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <CategoriesProvider>
            <div className="flex">
              <Sidebar />

              <div className="flex-1">
                <div className="p-6">{children}</div>
              </div>
            </div>
          </CategoriesProvider>
        </Providers>
      </body>
    </html>
  );
}
