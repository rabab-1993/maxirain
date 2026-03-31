import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../app/globals.css";
import Providers from "./providers";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { getCategories } from "@/lib/categories";
import CategoryProvider from "./categories-provider";

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
  const categoryPromise = getCategories();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <CategoryProvider categoryPromise={categoryPromise}>
            <Navbar />
            <main className="grow">{children}</main>
            <Footer />
          </CategoryProvider>
        </Providers>
      </body>
    </html>
  );
}
