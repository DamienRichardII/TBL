import type { Metadata } from "next";
import { PageShell } from "@/components/PageHero";
import { RankingList } from "@/components/RankingList";
import { ClassementDecor } from "@/components/ClassementDecor";
export const metadata: Metadata = { title: "Classement officiel TBL — Saison 2026", description: "Classement officiel The Ballin League, saison 2026 : podium, bilan victoires-défaites et position de chaque joueur." };
export default function Page() {
  return (
    <PageShell decor={<ClassementDecor />}>
      <div className="mb-10 text-center lg:mb-14">
        <svg aria-hidden viewBox="0 0 48 30" className="mx-auto mb-2 h-7 w-auto text-gold" fill="currentColor"><path d="M2 8l9 7 7-12 6 10 6-10 7 12 9-7-4 20H6Z" /><circle cx="2" cy="7" r="2" /><circle cx="46" cy="7" r="2" /><circle cx="24" cy="2" r="2" /></svg>
        <h1 className="title inline-block -skew-x-6 text-5xl font-bold tracking-wide sm:text-6xl lg:text-8xl"><span className="bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent">Classement</span> <span className="gold-text">officiel</span></h1>
        <div className="mx-auto mt-3 flex max-w-xl items-center gap-4 text-gold">
          <span className="gold-rule h-px flex-1" /><p className="title text-sm tracking-[0.4em] text-white/90 sm:text-base">TBL — Saison 2026</p><span className="gold-rule h-px flex-1" />
        </div>
      </div>
      <RankingList />
    </PageShell>
  );
}
