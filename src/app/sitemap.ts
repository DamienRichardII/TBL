import type { MetadataRoute } from "next";
import { getSiteData } from "@/lib/db";
export const revalidate = 3600;
const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.theballinleague.fr";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { players, events } = await getSiteData();
  const fixed = ["", "/evenements", "/classement", "/joueurs", "/videos", "/livestream", "/boutique", "/a-propos", "/contact", "/mentions-legales", "/confidentialite", "/reservation/tbl-02-the-throne"];
  return [
    ...fixed.map((p) => ({ url: `${base}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...events.map((e) => ({ url: `${base}/evenements/${e.slug}`, changeFrequency: "weekly" as const, priority: 0.7 })),
    ...players.map((p) => ({ url: `${base}/joueurs/${p.slug}`, changeFrequency: "weekly" as const, priority: 0.6 })),
  ];
}
