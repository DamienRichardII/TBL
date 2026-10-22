"use client";
import { useState } from "react";
import { divisions } from "@/data/site";
import { Notice } from "./DemoNotice";
export function DivisionTabs() {
  const [d, setD] = useState<string>(divisions[0].name);
  const cur = divisions.find((x) => x.name === d)!;
  return (
    <>
      <div role="tablist" aria-label="Divisions" className="mb-8 flex flex-wrap gap-2">
        {divisions.map((x) => <button key={x.name} role="tab" aria-selected={d === x.name} onClick={() => setD(x.name)} className={`chip ${d === x.name ? "border-white bg-white text-ink" : "border-white/25 text-white/75 hover:border-white"}`}>{x.name}</button>)}
      </div>
      <div role="tabpanel" className="rounded-2xl border border-line p-6 lg:p-10">
        <h2 className="title text-3xl">{cur.name}</h2>
        <p className="mt-1 text-gold">{cur.range}</p>
        <div className="mt-6 max-w-2xl"><Notice>Le classement officiel {cur.name} n’a pas encore été communiqué. Les classements seront mis à jour chaque mois selon les résultats officiels TBL, après validation des statistiques.</Notice></div>
      </div>
    </>
  );
}
