import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/providers/Query-provider";
import { Header } from "@/components/layout/Header";
import { Inter } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zentory",
  description: "Zentory inventory management",
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>
}) {
  
   const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider>
          <Header />
          <QueryProvider>{children}</QueryProvider>
          <Footer/>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}