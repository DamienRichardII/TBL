import type { Metadata } from "next";
import { Play } from "lucide-react";
import { PageShell, PageTitle } from "@/components/PageHero";
import { Notice } from "@/components/DemoNotice";
export const metadata: Metadata = { title: "Vidéos" };
export default function Page() {
  return (
    <PageShell>
      <PageTitle>Vidéos</PageTitle>
      <section aria-labelledby="live" className="relative overflow-hidden rounded-2xl border border-line bg-neutral-950 p-8 lg:p-14">
        <span className="mb-4 inline-flex items-center gap-2 rounded bg-neutral-800 px-3 py-1 text-[11px] font-bold tracking-widest text-white/70"><span className="h-2 w-2 rounded-full bg-neutral-500" />LIVE — PROCHAINEMENT</span>
        <h2 id="live" className="title text-3xl lg:text-5xl">Le direct des événements TBL</h2>
        <p className="mt-3 max-w-xl text-white/70">L’espace Live accueillera les diffusions des événements futurs. Aucun livestream n’est prévu pour TBL 02.</p>
      </section>
      <h2 className="title mb-5 mt-12 text-2xl">Dernières vidéos</h2>
      <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[1, 2, 3, 4].map((n) => (
          <li key={n} className="flex aspect-video items-center justify-center rounded-xl border border-dashed border-white/20 bg-neutral-950 text-white/35"><Play size={28} strokeWidth={1.3} /><span className="sr-only">Vidéo à venir</span></li>
        ))}
      </ul>
      <div className="mt-8 max-w-xl"><Notice>Les vidéos seront publiées dès réception des fichiers officiels de TBL.</Notice></div>
    </PageShell>
  );
}
