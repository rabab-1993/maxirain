import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "./components/Navbar";

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
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>
        {/* FOOTER */}
        <footer className="bg-blue-900 text-blue-100 py-10">
          <div className="max-w-7xl mx-auto px-6 text-center text-sm">
            © {new Date().getFullYear()} Maxirain — Water-Efficient Technologies
          </div>
        </footer>
      </body>
    </html>
  );
}
