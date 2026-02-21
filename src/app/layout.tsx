import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UZ Light Industry Catalog — B2B Marketplace",
  description: "Find trusted Uzbekistan manufacturers for wholesale textile, clothing, footwear and carpets. Request quotes, send RFQs and manage orders in one platform.",
  keywords: "uzbekistan textile, wholesale clothing, b2b catalog, manufacturer, light industry",
  openGraph: {
    title: "UZ Light Industry Catalog — B2B Portal",
    description: "Connect with verified Uzbekistan light industry manufacturers",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable}`}>
        <Header />
        <main style={{ minHeight: "calc(100vh - 80px)" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
