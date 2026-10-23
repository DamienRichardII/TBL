"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import { events } from "@/data/events";
import { RESERVATION_HREF, TICKETING_URL } from "@/data/site";

const filters = ["Tous", "1vs1", "Tournois", "Show", "Passés"] as const;

export function EventCatalog() {
  const [f, setF] = useState<(typeof filters)[number]>("Tous");
  const list = events.filter((e) => f === "Tous" || e.tags.includes(f)).sort((a, b) => (a.status === b.status ? 0 : a.status === "À venir" ? -1 : 1));
  return (
    <>
      <div role="tablist" aria-label="Filtrer les événements" className="mb-8 flex flex-wrap gap-2">
        {filters.map((x) => (
          <button key={x} role="tab" aria-selected={f === x} onClick={() => setF(x)} className={`chip ${f === x ? "border-ink bg-ink text-white" : "border-ink/20 text-ink/70 hover:border-ink"}`}>{x}</button>
        ))}
      </div>
      {list.length === 0 ? (
        <p className="rounded-xl border border-ink/15 bg-white p-6 text-sm text-ink/70">Aucun événement dans cette catégorie pour le moment. Les prochains événements seront annoncés ici.</p>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((e) => (
            <li key={e.slug} className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="relative aspect-[4/3] bg-ink"><Image src={e.image} alt={`Visuel ${e.name}`} fill sizes="(min-width:1024px) 33vw, 90vw" className={`${e.status === "Passé" ? "grayscale" : ""} object-cover object-top`} /></div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="title text-xl">{e.name}{e.subtitle ? ` — ${e.subtitle}` : ""}</h2>
                  <span className={`shrink-0 rounded px-2 py-0.5 text-[11px] font-semibold ${e.status === "À venir" ? "bg-gold/30 text-ink" : "bg-neutral-200 text-neutral-600"}`}>{e.status}</span>
                </div>
                <p className="mt-2 flex items-center gap-2 text-[13px] text-ink/70"><Calendar size={14} />{e.dateLabel}</p>
                {e.city && <p className="mt-1 flex items-center gap-2 text-[13px] text-ink/70"><MapPin size={14} />{e.city}</p>}
                {e.status === "À venir" && (TICKETING_URL
                  ? <a href={TICKETING_URL} target="_blank" rel="noopener noreferrer" className="btn btn-dark mt-4 w-full">Réserver ma place</a>
                  : <Link href={RESERVATION_HREF} className="btn btn-dark mt-4 w-full">Réserver ma place</Link>)}
                <Link href={e.href} className={`${e.status === "À venir" ? "mt-2" : "mt-4"} block text-center text-[13px] font-medium underline underline-offset-4`}>{e.status === "À venir" ? "Voir les détails" : "Voir l’édition"}</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
