import type { Metadata } from "next";
import { PageShell } from "@/components/PageHero";
import { RankingList } from "@/components/RankingList";
export const metadata: Metadata = { title: "Classement officiel TBL — Saison 2026" };
export default function Page() {
  return (
    <PageShell>
      <div className="mb-10">
        <h1 className="title text-4xl lg:text-6xl">Classement</h1>
        <p className="title mt-2 text-lg tracking-[0.2em] text-[#e6c3ae] lg:text-2xl">Classement officiel TBL — Saison 2026</p>
      </div>
      <RankingList />
    </PageShell>
  );
}
