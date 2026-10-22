"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import { players } from "@/data/players";
import { PlayerCard } from "./PlayerCard";
const tabs = ["Tous", "Lightweight", "Middleweight", "Heavyweight"] as const;
export function PlayerBrowser() {
  const [d, setD] = useState<(typeof tabs)[number]>("Tous");
  const [q, setQ] = useState("");
  const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const list = players.filter((p) => (d === "Tous" || p.division === d) && norm(`${p.name} ${p.nickname ?? ""}`).includes(norm(q)));
  return (
    <>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="tablist" aria-label="Filtrer par division" className="flex flex-wrap gap-2">
          {tabs.map((t) => <button key={t} role="tab" aria-selected={d === t} onClick={() => setD(t)} className={`chip ${d === t ? "border-ink bg-ink text-white" : "border-ink/20 text-ink/70 hover:border-ink"}`}>{t}</button>)}
        </div>
        <label className="relative block lg:w-72"><span className="sr-only">Rechercher un joueur</span>
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher un joueur" className="w-full rounded-full border border-ink/20 bg-white py-2.5 pl-9 pr-4 text-sm outline-none focus:border-ink" />
        </label>
      </div>
      {list.length ? <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">{list.map((p) => <li key={p.slug}><PlayerCard p={p} /></li>)}</ul>
        : <p className="text-sm text-ink/60">Aucun joueur ne correspond à cette recherche.</p>}
    </>
  );
}
