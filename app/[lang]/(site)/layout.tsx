import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";
import Providers from "./providers";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { getDirection, isValidLocale, type Lang } from "@/i18n/config";
import { TranslationProvider } from "@/i18n/TranslationProvider";

export async function generateStaticParams() {
  return [{ lang: "ar" }, { lang: "en" }];
}

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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  if (!isValidLocale(lang)) notFound();

  const dictionary = await getDictionary(lang as Lang);
  const dir = getDirection(lang as Lang);

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <TranslationProvider dictionary={dictionary}>
            <Navbar lang={lang}/>
            <div className="min-h-screen bg-slate-50 dark:bg-[#085E5A]">
              
              {children}
              </div>
            <Footer />
          </TranslationProvider>
        </Providers>
      </body>
    </html>
  );
}
