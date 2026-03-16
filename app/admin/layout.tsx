import Sidebar from "../components/Sidebar";
import Providers from "../(site)/providers";
import "../globals.css";
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
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
