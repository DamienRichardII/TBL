"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Calendar, MapPin, Clock, Ticket } from "lucide-react";
import { useSiteData } from "./SiteDataProvider";
import { MatchCard } from "./MatchCard";
import { Notice } from "./DemoNotice";
import { IMG } from "@/lib/assets";
import { RESERVATION_HREF, TICKETING_URL } from "@/data/site";

const tabs = ["Infos", "Matchs", "Résultats", "Galerie"] as const;

export function EventDetail() {
  const { matches, players } = useSiteData();
  const [tab, setTab] = useState<(typeof tabs)[number]>("Infos");
  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl lg:max-w-none">
          <Image src={IMG.posters.group} alt="Affiche TBL 02 — The Throne" fill priority sizes="(min-width:1024px) 45vw, 90vw" className="object-cover" />
        </div>
        <div>
          <h1 className="title text-5xl lg:text-7xl">TBL 02</h1>
          <p className="title text-3xl text-gold lg:text-4xl">The Throne</p>
          <ul className="mt-6 space-y-3 text-[15px]">
            <li className="flex items-center gap-3"><Calendar size={18} className="text-gold" />Samedi 19 décembre 2026</li>
            <li className="flex items-center gap-3"><Clock size={18} className="text-gold" />Début à 18 h 00</li>
            <li className="flex items-start gap-3"><MapPin size={18} className="mt-0.5 text-gold" /><span>Orléans · gymnase Victor Fouillade<br /><span className="text-white/50">Nom exact et adresse à confirmer</span></span></li>
            <li className="flex items-center gap-3"><Ticket size={18} className="text-gold" />Accès gratuit, sur réservation en ligne uniquement</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-wider">
            {["1vs1", "8 matchs", "16 joueurs", "3 divisions"].map((t) => <span key={t} className="rounded border border-gold/60 px-3 py-1.5 text-gold">{t}</span>)}
          </div>
          <div className="mt-6"><Notice>Un billet réservé est nécessaire pour entrer. Aucun livestream n’est prévu pour TBL 02. La réservation en ligne sera ouverte prochainement.</Notice></div>
          {TICKETING_URL
            ? <a href={TICKETING_URL} target="_blank" rel="noopener noreferrer" className="btn btn-gold mt-6 w-full lg:w-auto lg:min-w-[280px]">Réserver ma place</a>
            : <Link href={RESERVATION_HREF} className="btn btn-gold mt-6 w-full lg:w-auto lg:min-w-[280px]">Réserver ma place</Link>}
        </div>
      </div>

      <div role="tablist" aria-label="Sections de l’événement" className="mt-12 flex gap-6 border-b border-line">
        {tabs.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`-mb-px border-b-2 pb-3 text-sm font-medium transition ${tab === t ? "border-white text-white" : "border-transparent text-white/55 hover:text-white"}`}>{t === "Matchs" ? "Matchs & joueurs" : t}</button>
        ))}
      </div>

      <div className="mt-8" role="tabpanel">
        {tab === "Infos" && (
          <div className="max-w-3xl space-y-4 text-[15px] leading-relaxed text-white/80">
            <p>TBL 02 — The Throne réunit huit confrontations 1v1 et seize joueurs répartis dans les trois divisions officielles de la ligue : Lightweight, Middleweight et Heavyweight.</p>
            <p>Le main event oppose Samuel et Keran pour le titre Middleweight. Deux matchs de qualification (tryouts) complètent la carte.</p>
            <p className="text-[13px] text-white/50">Carte sous réserve de validation finale des affiches et des participants.</p>
          </div>
        )}
        {tab === "Matchs" && (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{matches.map((m) => <li key={m.game}><MatchCard m={m} players={players} /></li>)}</ul>
        )}
        {tab === "Résultats" && (matches.some((m) => m.result)
          ? <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{matches.filter((m) => m.result).map((m) => <li key={m.game}><MatchCard m={m} players={players} /></li>)}</ul>
          : <Notice>Les résultats des huit matchs seront publiés ici juste après l’événement.</Notice>)}
        {tab === "Galerie" && (<>
          <p className="mb-4 text-[13px] text-white/55">Photos issues des événements TBL précédents (attribution à confirmer).</p>
          <ul className="columns-2 gap-3 lg:columns-4 [&>li]:mb-3">
            {IMG.gallery.slice(0, 16).map((src, i) => (
              <li key={src} className="overflow-hidden rounded-xl"><Image src={src} alt={`Photo de la galerie TBL ${i + 1}`} width={600} height={800} loading="lazy" sizes="(min-width:1024px) 25vw, 50vw" className="h-auto w-full" /></li>
            ))}
          </ul></>
        )}
      </div>
    </>
  );
}
