"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Crown } from "lucide-react";
import { divisions } from "@/data/site";
import { useSiteData } from "./SiteDataProvider";
import { PlayerPlaceholder } from "./Placeholder";
import { Notice } from "./DemoNotice";
import type { Division } from "@/types";

export function DivisionTabs() {
  const { rankings, players } = useSiteData();
  const getPlayer = (slug: string) => players.find((p) => p.slug === slug);
  const [d, setD] = useState<Division>("Lightweight");
  const cur = divisions.find((x) => x.name === d)!;
  const rows = rankings[d];
  return (
    <>
      <div role="tablist" aria-label="Divisions" className="mb-8 flex flex-wrap gap-2">
        {divisions.map((x) => <button key={x.name} role="tab" aria-selected={d === x.name} onClick={() => setD(x.name)} className={`chip ${d === x.name ? "border-gold bg-gold text-ink" : "border-white/25 text-white/75 hover:border-white"}`}>{x.name}</button>)}
      </div>
      <div role="tabpanel" className="rounded-2xl border border-gold/30 p-5 lg:p-10">
        <h2 className="title text-3xl">{cur.name}</h2>
        <p className="gold-text title tracking-widest">{cur.range}</p>
        {rows.length === 0 ? (
          <div className="mt-6 max-w-2xl"><Notice>Le classement officiel {cur.name} n’a pas encore été communiqué. Les classements seront mis à jour chaque mois selon les résultats officiels TBL, après validation des statistiques.</Notice></div>
        ) : (
          <ol className="mt-6 divide-y divide-line">
            {rows.map((r, i) => { const p = getPlayer(r.slug); if (!p) return null; return (
              <li key={r.slug} className="flex items-center gap-4 py-3">
                <span className={`title w-8 text-center text-2xl ${i === 0 ? "gold-text" : "text-white/60"}`}>{i + 1}</span>
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">{p.photo ? <Image src={p.photo} alt="" fill sizes="56px" className="object-cover" /> : <PlayerPlaceholder name={p.name} />}</div>
                <Link href={`/joueurs/${p.slug}`} className="title flex-1 text-lg hover:text-gold">{p.name}{r.champion && <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-gold px-2 py-0.5 align-middle text-[10px] font-bold uppercase text-ink"><Crown size={11} />Champion</span>}</Link>
                <span className="text-sm text-white/80">{r.wins} V – {r.losses} D</span>
              </li>); })}
          </ol>
        )}
      </div>
    </>
  );
}
