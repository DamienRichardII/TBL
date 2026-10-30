import type { Metadata } from "next";
import { PageShell, PageTitle } from "@/components/PageHero";
import { YouTubeCTA } from "@/components/YouTubeCTA";
import { LIVE_VIDEO_ID } from "@/data/site";
export const metadata: Metadata = { title: "Livestream" };

export default function Page() {
  return (
    <PageShell>
      <PageTitle sub="Suivez les événements TBL en direct sur YouTube.">Livestream</PageTitle>
      <section aria-labelledby="live" className="relative mt-14 overflow-hidden rounded-2xl border border-gold/30 bg-neutral-950 p-6 lg:p-12">
        <div className="gold-glow absolute inset-0 opacity-50" />
        <div className="relative">
          <span className="mb-4 inline-flex items-center gap-2 rounded bg-neutral-800 px-3 py-1 text-[11px] font-bold tracking-widest text-white/70"><span className={`h-2 w-2 rounded-full ${LIVE_VIDEO_ID ? "bg-red-500" : "bg-neutral-500"}`} />{LIVE_VIDEO_ID ? "LIVE" : "LIVE — PROCHAINEMENT"}</span>
          <h2 id="live" className="title text-3xl lg:text-6xl">Le direct des événements TBL</h2>
          {LIVE_VIDEO_ID ? (
            <div className="relative mt-6 aspect-video overflow-hidden rounded-xl"><iframe className="absolute inset-0 h-full w-full" src={`https://www.youtube-nocookie.com/embed/${LIVE_VIDEO_ID}`} title="Live TBL" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen /></div>
          ) : (
            <p className="mt-3 max-w-xl text-white/70">Cet espace accueillera la diffusion en direct des prochains événements, avec lecteur vidéo et informations de l’événement. Aucun livestream n’est prévu pour TBL 02.</p>
          )}
        </div>
      </section>
      <YouTubeCTA compact className="mt-10 sm:justify-start" />
    </PageShell>
  );
}
