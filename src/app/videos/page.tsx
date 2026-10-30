import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageTitle } from "@/components/PageHero";
import { VideoGrid } from "@/components/VideoGrid";
import { YouTubeCTA } from "@/components/YouTubeCTA";
import { getLatestVideos, kindOf } from "@/lib/youtube";
import { getSiteData } from "@/lib/db";
export const metadata: Metadata = { title: "Vidéos" };
export const revalidate = 60;

export default async function Page() {
  const { videoOverrides } = await getSiteData();
  const vids = (await getLatestVideos(30)).filter((v) => !videoOverrides[v.id]?.hidden).map((v) => ({ ...v, kind: kindOf(v.title, videoOverrides[v.id]?.kind) }));
  return (
    <PageShell>
      <PageTitle sub="Matchs complets, highlights et teasers : tout est sur la chaîne YouTube de TBL.">Vidéos</PageTitle>
      <YouTubeCTA compact className="mb-10 sm:justify-start" />
      <VideoGrid videos={vids} filters />

      <p className="mt-10 text-sm text-white/70">Les événements TBL sont aussi diffusés en direct : <Link href="/livestream" className="text-gold underline underline-offset-4">voir la page Livestream</Link>.</p>
    </PageShell>
  );
}
