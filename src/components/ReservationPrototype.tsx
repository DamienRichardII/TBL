"use client";
import { useState } from "react";
import Link from "next/link";
import { Check, Minus, Plus } from "lucide-react";
import { Notice } from "./DemoNotice";

const days = ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"];
const EVENT_DAY = 19;

export function ReservationPrototype() {
  const [qty, setQty] = useState(1);
  const [demo, setDemo] = useState(false);
  const first = (new Date(2026, 11, 1).getDay() + 6) % 7; // lundi = 0
  const cells = [...Array(first).fill(null), ...Array.from({ length: 31 }, (_, i) => i + 1)];

  if (demo) return (
    <div className="mx-auto max-w-md rounded-2xl bg-bone p-8 text-center text-ink">
      <span className="mb-4 inline-block rounded bg-ink px-3 py-1 text-[11px] font-bold tracking-widest text-white">APERÇU DÉMO — NON VALIDE</span>
      <div className="mx-auto mt-2 flex h-16 w-16 items-center justify-center rounded-full bg-ink text-white"><Check size={30} /></div>
      <p className="title mt-5 text-2xl">Écran de confirmation</p>
      <p className="mt-2 text-sm text-ink/65">Ceci est un aperçu visuel du futur écran de confirmation. Aucune réservation n’a été effectuée ni enregistrée ; ce n’est pas un billet.</p>
      <button onClick={() => setDemo(false)} className="btn btn-dark mt-6 w-full">Retour au prototype</button>
      <Link href="/" className="btn mt-3 w-full border border-ink/30 text-ink hover:bg-ink hover:text-white">Retour à l’accueil</Link>
    </div>
  );

  return (
    <div className="mx-auto max-w-md">
      <h1 className="title mb-1 text-3xl">Réserver ma place</h1>
      <p className="mb-5 text-sm text-white/65">TBL 02 — The Throne · Orléans · accès gratuit</p>
      <Notice>Prototype visuel : aucune réservation n’est enregistrée pour le moment. Aucun paiement n’est demandé.</Notice>

      <section aria-label="Calendrier" className="mt-6 rounded-2xl border border-line p-4">
        <p className="mb-3 text-center text-sm font-medium">Décembre 2026</p>
        <div className="grid grid-cols-7 gap-1 text-center text-[12px]">
          {days.map((d) => <span key={d} className="py-1 text-white/40">{d}</span>)}
          {cells.map((c, i) => c === null ? <span key={i} /> :
            <span key={i} aria-current={c === EVENT_DAY ? "date" : undefined} className={`flex h-9 items-center justify-center rounded-full ${c === EVENT_DAY ? "bg-white font-bold text-ink" : "text-white/30"}`}>{c}</span>)}
        </div>
        <p className="mt-3 text-center text-[12px] text-white/55">Samedi 19 décembre · 18 h 00</p>
      </section>

      <section aria-label="Places" className="mt-4 flex items-center justify-between rounded-2xl border border-line p-4">
        <div><p className="text-sm font-medium">Accès événement</p><p className="text-[12px] text-white/55">Gratuit · sur réservation</p></div>
        <div className="flex items-center gap-3">
          <button aria-label="Retirer une place" onClick={() => setQty(Math.max(1, qty - 1))} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30"><Minus size={14} /></button>
          <span aria-live="polite" className="w-5 text-center text-sm">{qty}</span>
          <button aria-label="Ajouter une place" onClick={() => setQty(Math.min(10, qty + 1))} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30"><Plus size={14} /></button>
        </div>
      </section>
      <p className="mt-2 text-[11px] text-white/40">Nombre de places maximum par réservation : à confirmer par TBL.</p>

      <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-sm"><span>Total</span><span className="title text-xl">Gratuit</span></div>
      <button type="button" aria-disabled="true" className="btn btn-disabled mt-4 w-full">Réservation bientôt disponible</button>
      <button onClick={() => setDemo(true)} className="mt-4 w-full text-center text-[12px] text-white/50 underline underline-offset-4 hover:text-white">Voir l’aperçu de l’écran de confirmation (démo)</button>
    </div>
  );
}
