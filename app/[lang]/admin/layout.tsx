import type { ReactNode } from "react";
import Providers from "../(site)/providers";
import "../../globals.css";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { getDirection, isValidLocale, Lang } from "@/i18n/config";
import AdminShell from "./AdminShell";
import { TranslationProvider } from "@/i18n/TranslationProvider";

export async function generateStaticParams() {
  return [{ lang: "ar" }, { lang: "en" }];
}

export default async function AdminLayout({
  children,
  params,
}: {
  children: ReactNode;

  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isValidLocale(lang)) notFound();

  const dictionary = await getDictionary(lang as Lang);
  const dir = getDirection(lang as Lang);
  const title =
    lang === "ar" ? "ماكسي رين | لوحة التحكم" : "Maxirain | Dashboard";
  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
      </head>
      <body>
        <Providers>
          <TranslationProvider dictionary={dictionary}>
            <div className="min-h-screen bg-slate-50 dark:bg-[#085E5A]">
              <AdminShell lang={lang as Lang}>{children}</AdminShell>
            </div>
          </TranslationProvider>
        </Providers>
      </body>
    </html>
  );
}
