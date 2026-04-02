import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Providers from "./providers";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { CategoriesProvider } from "@/app/context/CategoriesContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maxirain | Smart Water Management",
  description: "Innovative irrigation and water-efficient technologies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <CategoriesProvider>
            <Navbar />
            <main className="grow">{children}</main>
            <Footer />
          </CategoriesProvider>
        </Providers>
      </body>
    </html>
  );
}
