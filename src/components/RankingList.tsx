"use client";
import Image from "next/image";
import Link from "next/link";
import { Crown, ChevronRight } from "lucide-react";
import { useSiteData } from "./SiteDataProvider";
import type { RankEntry } from "@/types";
import { guests, history, tally, withTotals } from "@/data/history";

const plural = (n: number, w: string) => `${n} ${w}${n > 1 ? "s" : ""}`;
const W = "text-emerald-400";
const L = "text-red-400";
const rose = "text-[#e6c3ae]";

type P = { slug: string; name: string; nickname?: string; division?: string; photo?: string; link: boolean };

function Avatar({ p, size }: { p: P; size: string }) {
  return (
    <div className={`relative shrink-0 overflow-hidden rounded-full text-lg ${size}`}>
      {p.photo ? <Image src={p.photo} alt={`Photo de ${p.name}`} fill sizes="200px" className="object-cover" /> : <span role="img" aria-label={`Photo de ${p.name} à venir`} className="flex h-full w-full items-center justify-center bg-gradient-to-b from-neutral-700 to-neutral-900"><span className="title text-[1.4em] text-white/70">{p.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}</span></span>}
    </div>
  );
}

function Wrap({ p, rank, className, children }: { p: P; rank: number; className: string; children: React.ReactNode }) {
  return p.link ? <Link href={`/joueurs/${p.slug}`} aria-label={`${p.name}, rang ${rank} : voir le profil`} className={className}>{children}</Link> : <div className={className}>{children}</div>;
}

/** Ex. « TBL 2V/0D · Top Hoops 1V/1D » (plateformes jouées uniquement). */
function breakdown(slug: string) {
  const h = history[slug];
  if (!h) return null;
  return (["TBL", "Top Hoops"] as const).flatMap((pf) => { const t = tally(h, pf); return t.wins + t.losses ? [`${pf} ${t.wins}V/${t.losses}D`] : []; }).join(" · ");
}

function Matches({ slug }: { slug: string }) {
  const h = history[slug];
  if (!h?.length) return null;
  return (
    <details className="group/d border-t border-white/5 bg-white/[.015] px-3 py-2 text-[13px] sm:px-5 sm:pl-[4.5rem]">
      <summary className="cursor-pointer list-none text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45 hover:text-[#e6c3ae]">Voir les matchs ({h.length})</summary>
      <ul className="mt-2 space-y-1.5">
        {h.map((m, i) => (
          <li key={i} className="flex flex-wrap items-center gap-x-2 text-white/80">
            <span className={`title w-5 text-center text-base ${m.result === "V" ? W : L}`}>{m.result}</span>
            <span>contre {m.vsSlug ? <Link href={`/joueurs/${m.vsSlug}`} className="underline underline-offset-4 hover:text-[#e6c3ae]">{m.vs}</Link> : <span className={m.vs.startsWith("Adversaire") ? "italic text-white/50" : ""}>{m.vs}</span>}{m.score ? ` (${m.score})` : ""}</span>
            <span className="rounded border border-white/15 px-1.5 py-px text-[10px] uppercase tracking-wider text-white/55">{m.platform}</span>
          </li>
        ))}
      </ul>
    </details>
  );
}

export function RankingList() {
  const { rankings, players } = useSiteData();
  const rows = rankings.flatMap((e: RankEntry, i: number) => {
    const r = withTotals(e);
    const pl = players.find((x) => x.slug === r.slug);
    const p: P | undefined = pl ? { slug: pl.slug, name: pl.name, nickname: pl.nickname, division: pl.division, photo: pl.photo, link: true } : guests[r.slug] ? { slug: r.slug, name: guests[r.slug], link: false } : undefined;
    return p ? [{ r, p, rank: i + 1 }] : [];
  });
  if (rows.length === 0) return <p className="rounded-xl border border-white/15 p-6 text-white/75">Le classement officiel sera publié prochainement.</p>;
  const top = rows.slice(0, 3);
  const rest = rows.slice(3);
  const podiumOrder = [top[1], top[0], top[2]].filter(Boolean);
  return (
    <div>
      <ol className="grid gap-4 sm:grid-cols-3 sm:items-end">
        {podiumOrder.map(({ r, p, rank }) => {
          const first = rank === 1;
          return (
            <li key={r.slug} className={`${rank === 1 ? "max-sm:order-first" : rank === 2 ? "max-sm:order-2" : "max-sm:order-3"}`}>
              <Wrap p={p} rank={rank} className={`group relative block overflow-hidden rounded-2xl border text-center transition hover:-translate-y-0.5 ${first ? "border-[#e6c3ae]/70 bg-gradient-to-b from-[#e6c3ae]/[.14] via-ink to-ink px-4 pb-8 pt-8 shadow-[0_24px_70px_-30px_rgba(230,195,174,.55)]" : "border-[#e6c3ae]/30 bg-gradient-to-b from-white/[.06] to-ink px-4 pb-7 pt-7 hover:border-[#e6c3ae]/60"}`}>
                {first && <Crown aria-hidden className={`mx-auto mb-2 ${rose}`} size={30} strokeWidth={1.4} />}
                <div className="relative mx-auto w-fit">
                  <Avatar p={p} size={first ? "h-40 w-40 ring-2 ring-[#e6c3ae]/80 sm:h-44 sm:w-44 lg:h-52 lg:w-52" : "h-32 w-32 ring-1 ring-[#e6c3ae]/50 lg:h-40 lg:w-40"} />
                  <span className={`title absolute -bottom-3 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full text-xl ${first ? "bg-[#e6c3ae] text-ink" : "bg-white text-ink"}`}>{rank}</span>
                </div>
                <span className="title mt-7 block text-2xl group-hover:text-[#e6c3ae] lg:text-3xl">{p.name}</span>
                <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">{p.division}</span>
                <p className="title mt-2 text-lg tracking-wide"><span className={W}>{plural(r.wins, "victoire")}</span><span className="px-1.5 text-white/30">/</span><span className={L}>{plural(r.losses, "défaite")}</span></p>
                {breakdown(r.slug) && <p className="mt-1.5 text-[11px] tracking-wide text-white/55">{breakdown(r.slug)}</p>}
              </Wrap>
            </li>
          );
        })}
      </ol>

      <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
        <div aria-hidden className="hidden grid-cols-[3rem_1fr_9rem_5.5rem_5.5rem_1.5rem] items-center gap-4 border-b border-white/10 bg-white/[.04] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/45 sm:grid">
          <span className="text-center">Rang</span><span>Joueur</span><span>Catégorie</span><span className="text-center">Victoires</span><span className="text-center">Défaites</span><span />
        </div>
        <ol className="divide-y divide-white/10">
          {rest.map(({ r, p, rank }) => (
            <li key={r.slug}>
              <Wrap p={p} rank={rank} className="group grid grid-cols-[2rem_1fr_auto] items-center gap-3 bg-white/[.02] px-3 py-3 transition hover:bg-white/[.06] sm:grid-cols-[3rem_1fr_9rem_5.5rem_5.5rem_1.5rem] sm:gap-4 sm:px-5">
                <span className="title text-center text-2xl text-white/70">{rank}</span>
                <span className="flex min-w-0 items-center gap-3 sm:gap-4">
                  <Avatar p={p} size="h-12 w-12 sm:h-14 sm:w-14" />
                  <span className="min-w-0">
                    <span className="title block truncate text-lg group-hover:text-[#e6c3ae] sm:text-xl">{p.name}</span>
                    {p.nickname && <span className="block truncate text-[12px] text-white/50">« {p.nickname} »</span>}
                    {breakdown(r.slug) && <span className="block text-[11px] tracking-wide text-white/55">{breakdown(r.slug)}</span>}
                    <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40 sm:hidden">{p.division ?? "Catégorie à confirmer"}</span>
                  </span>
                </span>
                <span className="hidden text-[12px] font-semibold uppercase tracking-[0.15em] text-white/60 sm:block">{p.division ?? "À confirmer"}</span>
                <span className="title text-right text-xl sm:text-center sm:text-2xl"><span className={W}>{r.wins}</span><span className="sm:hidden"><span className="px-1 text-white/30">–</span><span className={L}>{r.losses}</span></span></span>
                <span className={`title hidden text-center text-2xl sm:block ${L}`}>{r.losses}</span>
                {p.link ? <ChevronRight aria-hidden size={18} className="hidden text-white/30 transition group-hover:translate-x-0.5 group-hover:text-[#e6c3ae] sm:block" /> : <span />}
              </Wrap>
              <Matches slug={r.slug} />
            </li>
          ))}
        </ol>
      </div>
      <p className="mt-5 max-w-3xl text-[12px] leading-relaxed text-white/50">Le classement cumule les victoires et défaites en ligues 1v1 officielles (TBL et Top Hoops) ; le détail par plateforme et par match est indiqué pour chaque joueur. Les adversaires non confirmés sont signalés comme tels.</p>
    </div>
  );
}
