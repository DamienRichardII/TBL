"use client";
import Image from "next/image";
import Link from "next/link";
import { Crown } from "lucide-react";
import { useSiteData } from "./SiteDataProvider";
import type { Player, RankEntry } from "@/types";

const plural = (n: number, w: string) => `${n} ${w}${n > 1 ? "s" : ""}`;
const bilan = (r: RankEntry) => `${plural(r.wins, "victoire")} / ${plural(r.losses, "défaite")}`;

function Avatar({ p, size }: { p: Player; size: string }) {
  return (
    <div className={`relative shrink-0 overflow-hidden rounded-full text-lg ${size}`}>
      {p.photo ? <Image src={p.photo} alt={`Photo de ${p.name}`} fill sizes="128px" className="object-cover" /> : <span role="img" aria-label={`Photo de ${p.name} à venir`} className="flex h-full w-full items-center justify-center bg-gradient-to-b from-neutral-700 to-neutral-900"><span className="title text-[1.4em] text-white/70">{p.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}</span></span>}
    </div>
  );
}

export function RankingList() {
  const { rankings, players } = useSiteData();
  const rows = rankings.flatMap((r, i) => { const p = players.find((x) => x.slug === r.slug); return p ? [{ r, p, rank: i + 1 }] : []; });
  if (rows.length === 0) return <p className="rounded-xl border border-gold/30 p-6 text-white/75">Le classement officiel sera publié prochainement.</p>;
  const top = rows.slice(0, 3);
  const rest = rows.slice(3);
  const podiumOrder = [top[1], top[0], top[2]].filter(Boolean); // 2 · 1 · 3 sur grand écran
  return (
    <div>
      <ol className="grid gap-4 sm:grid-cols-3 sm:items-end">
        {podiumOrder.map(({ r, p, rank }) => {
          const first = rank === 1;
          return (
            <li key={r.slug} className={`relative overflow-hidden rounded-2xl border text-center ${first ? "border-gold bg-gradient-to-b from-gold/20 via-ink to-ink px-4 pb-7 pt-8 shadow-[0_20px_60px_-25px_rgba(201,161,92,.8)] sm:order-none max-sm:order-first" : "border-gold/40 bg-gradient-to-b from-white/[.06] to-ink px-4 pb-6 pt-6"} ${rank === 2 ? "max-sm:order-2" : rank === 3 ? "max-sm:order-3" : ""}`}>
              {first && <Crown aria-hidden className="mx-auto mb-2 text-gold" size={28} strokeWidth={1.5} />}
              <div className="relative mx-auto w-fit">
                <Avatar p={p} size={first ? "h-32 w-32 ring-2 ring-gold lg:h-40 lg:w-40" : "h-24 w-24 ring-1 ring-gold/60 lg:h-28 lg:w-28"} />
                <span className={`title absolute -bottom-2 left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full text-xl ${first ? "bg-gold text-ink" : "bg-white text-ink"}`}>{rank}</span>
              </div>
              <Link href={`/joueurs/${p.slug}`} className="title mt-6 block text-2xl hover:text-gold lg:text-3xl">{p.name}</Link>
              <p className="gold-text title mt-1 text-lg tracking-wide">{bilan(r)}</p>
            </li>
          );
        })}
      </ol>
      <ol className="mt-8 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10">
        {rest.map(({ r, p, rank }) => (
          <li key={r.slug} className="flex items-center gap-3 bg-white/[.02] px-3 py-3 sm:gap-4 sm:px-5">
            <span className="title w-8 shrink-0 text-center text-2xl text-white/70">{rank}</span>
            <Avatar p={p} size="h-12 w-12 sm:h-14 sm:w-14" />
            <Link href={`/joueurs/${p.slug}`} className="min-w-0 flex-1 hover:text-gold">
              <span className="title block truncate text-lg sm:text-xl">{p.name}</span>
              {p.nickname && <span className="block truncate text-[12px] text-white/50">« {p.nickname} »</span>}
            </Link>
            <span className="shrink-0 text-right text-[13px] leading-tight text-white/85 sm:text-sm"><span className="block font-semibold">{r.wins} V – {r.losses} D</span><span className="hidden text-[11px] text-white/45 sm:block">{bilan(r)}</span></span>
          </li>
        ))}
      </ol>
      <p className="mt-5 max-w-3xl text-[12px] leading-relaxed text-white/50">Classement officiel d’octobre 2026. Les rangs 1 à 5 sont fixés ; les rangs 6 à 16 (tous à 0 victoire / 0 défaite) sont affichés dans un ordre provisoire. Seuls les matchs officiels TBL sont comptabilisés, pas ceux d’autres compétitions.</p>
    </div>
  );
}
