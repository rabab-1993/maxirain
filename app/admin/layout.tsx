import Sidebar from "../components/Sidebar";
import Providers from "../(site)/providers";
import "../globals.css";
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      
      <body>
        <Providers>
          <div className="flex">
            <Sidebar />

            <div className="flex-1">
              <div className="p-6">{children}</div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
