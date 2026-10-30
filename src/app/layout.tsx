import type { Metadata, Viewport } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SiteDataProvider } from "@/components/SiteDataProvider";
import { getSiteData } from "@/lib/db";

const display = Oswald({ subsets: ["latin"], variable: "--font-display", weight: ["400", "500", "600", "700"] });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
const description = "The Ballin League (TBL) : organisation française de basketball 1v1. Événements, joueurs, classements par division.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  openGraph: { type: "website", siteName: "TBL — The Ballin League", locale: "fr_FR", title: "TBL — The Ballin League | Basketball 1v1", description },
  twitter: { card: "summary_large_image", title: "TBL — The Ballin League | Basketball 1v1", description },
  title: { default: "TBL — The Ballin League | Basketball 1v1", template: "%s | TBL — The Ballin League" },
  description,
};
export const viewport: Viewport = { themeColor: "#08090B", width: "device-width", initialScale: 1 };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const data = await getSiteData();
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable}`}>
      <body><a href="#contenu" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-2 focus:text-ink">Aller au contenu</a>
        <SiteDataProvider data={data}><Header /><div id="contenu">{children}</div><Footer /></SiteDataProvider></body>
    </html>
  );
}
