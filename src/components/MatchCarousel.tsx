"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type CarouselItem = { game: number; label: string; poster: string; alt: string; a: string; b: string; main: boolean };

export function MatchCarousel({ items }: { items: CarouselItem[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const go = (d: number) => ref.current?.scrollBy({ left: d * Math.max(280, ref.current.clientWidth * 0.8), behavior: "smooth" });
  const arrow = "absolute top-[38%] z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold/60 bg-ink/80 text-gold backdrop-blur transition hover:bg-gold hover:text-ink lg:flex";
  return (
    <div className="relative">
      <button type="button" aria-label="Matchs précédents" onClick={() => go(-1)} className={`${arrow} left-2`}><ChevronLeft size={22} /></button>
      <button type="button" aria-label="Matchs suivants" onClick={() => go(1)} className={`${arrow} right-2`}><ChevronRight size={22} /></button>
      <ul ref={ref} className="no-scrollbar -mx-4 flex snap-x snap-mandatory items-end gap-4 overflow-x-auto scroll-smooth px-4 pb-2 lg:mx-0 lg:gap-6 lg:px-0">
        {items.map((m) => (
          <li key={m.game} className={`shrink-0 snap-start ${m.main ? "w-[78vw] sm:w-[360px] lg:w-[420px]" : "w-[62vw] sm:w-[280px] lg:w-[300px]"}`}>
            <Link href="/evenements/tbl-02-the-throne" className="group block">
              <div className={`relative aspect-[4/5] overflow-hidden rounded-xl transition duration-500 group-hover:-translate-y-1 ${m.main ? "shadow-[0_0_60px_-15px_rgba(201,161,92,.7)] ring-1 ring-gold/70" : "ring-1 ring-white/10"}`}>
                <Image src={m.poster} alt={m.alt} fill sizes={m.main ? "(min-width:1024px) 420px, 78vw" : "(min-width:1024px) 300px, 62vw"} className="object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <p className="mt-3 text-[10px] font-semibold uppercase tracking-widest text-gold lg:text-[11px]">Game {m.game} · {m.label}</p>
              <p className={`title mt-0.5 ${m.main ? "text-2xl lg:text-3xl" : "text-lg lg:text-xl"}`}>{m.a} <span className="text-gold">vs</span> {m.b}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
