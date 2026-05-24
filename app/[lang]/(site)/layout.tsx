import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";
import Providers from "./providers";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { getDirection, isValidLocale, Lang } from "@/i18n/config";
import { TranslationProvider } from "@/i18n/TranslationProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;

  return {
    title:
      lang === "ar"
        ? "ماكسي رين | إدارة المياه الذكية"
        : "Maxirain | Smart Water Management",

    description:
      lang === "ar"
        ? "تقنيات مبتكرة للري وإدارة المياه بكفاءة"
        : "Innovative irrigation and water-efficient technologies",
  };
}

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
            <Navbar lang={lang} />
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
