"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useSiteData } from "./SiteDataProvider";
import type { RankEntry } from "@/types";
import { guests, history, tally, withTotals } from "@/data/history";

const plural = (n: number, w: string) => `${n} ${w}${n > 1 ? "s" : ""}`;
const W = "text-emerald-400";
const L = "text-red-400";
const ratio = (w: number, l: number) => (w + l === 0 ? "—" : `${Math.round((w / (w + l)) * 100)} %`);

const tone = {
  1: { num: "from-[#F4DDA6] to-[#B98A3E]", ring: "border-[#E8CC94]/80 shadow-[0_0_60px_-12px_rgba(232,204,148,.6)]", div: "text-[#E8CC94]" },
  2: { num: "from-white to-[#8e9399]", ring: "border-white/35 shadow-[0_0_40px_-18px_rgba(255,255,255,.35)]", div: "text-white/70" },
  3: { num: "from-[#f0b985] to-[#9a5d2f]", ring: "border-[#c98a56]/55 shadow-[0_0_40px_-18px_rgba(201,138,86,.5)]", div: "text-[#d9a273]" },
} as const;

function Laurel({ flip = false }: { flip?: boolean }) {
  const leaves = Array.from({ length: 9 }, (_, i) => { const a = (i / 8) * 1.7 - 0.2; return { x: 14 + 34 * Math.sin(a) * 0.9, y: 112 - i * 11.5, r: -40 + i * 9 }; });
  return (
    <svg aria-hidden viewBox="0 0 60 120" className={`h-28 w-auto text-[#E8CC94] sm:h-36 ${flip ? "-scale-x-100" : ""}`} fill="currentColor">
      <path d="M10 116C2 84 4 44 26 8" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {leaves.map((l, i) => <ellipse key={i} cx={l.x + 2} cy={l.y} rx="11" ry="4.2" transform={`rotate(${l.r} ${l.x + 2} ${l.y})`} opacity={0.95 - i * 0.04} />)}
    </svg>
  );
}

type P = { slug: string; name: string; nickname?: string; division?: string; photo?: string; link: boolean };

function Avatar({ p, size }: { p: P; size: string }) {
  return (
    <div className={`relative shrink-0 overflow-hidden rounded-full text-lg ${size}`}>
      {p.photo ? <Image src={p.photo} alt={`Photo de ${p.name}`} fill sizes="200px" className="object-cover object-top" /> : <span role="img" aria-label={`Photo de ${p.name} à venir`} className="flex h-full w-full items-center justify-center bg-gradient-to-b from-neutral-700 to-neutral-900"><span className="title text-[1.4em] text-white/70">{p.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}</span></span>}
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
    <details className="group/d border-t border-gold/10 bg-black/30 px-3 py-2 text-[13px] sm:px-5 sm:pl-[4.5rem]">
      <summary className="cursor-pointer list-none text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45 hover:text-gold">Voir les matchs ({h.length})</summary>
      <ul className="mt-2 space-y-1.5">
        {h.map((m, i) => (
          <li key={i} className="flex flex-wrap items-center gap-x-2 text-white/80">
            <span className={`title w-5 text-center text-base ${m.result === "V" ? W : L}`}>{m.result}</span>
            <span>contre {m.vsSlug ? <Link href={`/joueurs/${m.vsSlug}`} className="underline underline-offset-4 hover:text-gold">{m.vs}</Link> : <span className={m.vs.startsWith("Adversaire") ? "italic text-white/50" : ""}>{m.vs}</span>}{m.score ? ` (${m.score})` : ""}</span>
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
      <ol className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-3 sm:items-end">
        {podiumOrder.map(({ r, p, rank }) => {
          const first = rank === 1;
          const t = tone[rank as 1 | 2 | 3];
          return (
            <li key={r.slug} className={`${rank === 1 ? "max-sm:order-first" : rank === 2 ? "max-sm:order-2" : "max-sm:order-3"}`}>
              <Wrap p={p} rank={rank} className={`group relative block overflow-hidden rounded-2xl border bg-neutral-950 transition duration-300 hover:-translate-y-1 ${t.ring} ${first ? "aspect-[4/4.9] sm:aspect-[4/5.6]" : "aspect-[4/4.6] sm:aspect-[4/4.7]"}`}>
                {p.photo ? <Image src={p.photo} alt={`Photo de ${p.name}`} fill quality={85} sizes="(min-width:1024px) 380px, (min-width:640px) 33vw, 90vw" className="object-cover object-top transition duration-500 group-hover:scale-[1.03]" /> : <span role="img" aria-label={`Photo de ${p.name} à venir`} className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-neutral-700 to-neutral-950"><span className="title text-6xl text-white/60">{p.name.slice(0, 2)}</span></span>}
                <span aria-hidden className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,.35),transparent_28%,transparent_42%,rgba(0,0,0,.92)_88%)]" />
                <span className={`title absolute left-4 top-3 -skew-x-6 bg-gradient-to-b bg-clip-text text-7xl font-bold text-transparent drop-shadow-[0_4px_14px_rgba(0,0,0,.6)] sm:text-8xl ${t.num}`}>{rank}</span>
                {first && <span aria-hidden className="absolute right-4 top-4 text-[#E8CC94] drop-shadow-[0_0_12px_rgba(232,204,148,.7)]"><svg viewBox="0 0 48 30" className="h-8 w-auto" fill="currentColor"><path d="M2 8l9 7 7-12 6 10 6-10 7 12 9-7-4 20H6Z" /></svg></span>}
                <span className="absolute inset-x-0 bottom-0 px-4 pb-5 text-center">
                  {first && <span aria-hidden className="pointer-events-none absolute inset-x-2 bottom-3 flex items-end justify-between opacity-90"><Laurel /><Laurel flip /></span>}
                  <span className="relative block">
                    <span className="title block -skew-x-6 text-3xl font-bold group-hover:text-gold sm:text-4xl">{p.name}</span>
                    <span className={`mt-1 block text-[11px] font-semibold uppercase tracking-[0.3em] ${t.div}`}>{p.division ?? "À confirmer"}</span>
                    <span className="mt-3 inline-flex items-center divide-x divide-white/25 rounded-lg border border-gold/40 bg-black/70 px-1 py-1.5 text-[12px] font-semibold uppercase tracking-wide backdrop-blur-sm">
                      <span className={`px-3 ${W}`}>{plural(r.wins, "victoire")}</span><span className={`px-3 ${L}`}>{plural(r.losses, "défaite")}</span>
                    </span>
                    {breakdown(r.slug) && <span className="mt-2 block text-[11px] tracking-wide text-white/65">{breakdown(r.slug)}</span>}
                  </span>
                </span>
              </Wrap>
            </li>
          );
        })}
      </ol>

      <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-2xl border border-gold/50 bg-black/60 shadow-[0_0_50px_-20px_rgba(201,161,92,.5)] backdrop-blur-sm">
        <div aria-hidden className="hidden grid-cols-[3rem_1fr_9rem_5rem_5rem_5rem_1.5rem] items-center gap-4 border-b border-gold/30 bg-white/[.04] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80 sm:grid">
          <span className="text-center">#</span><span>Joueur</span><span>Catégorie</span><span className="text-center">Victoires</span><span className="text-center">Défaites</span><span className="text-center">Ratio</span><span />
        </div>
        <ol className="divide-y divide-white/10">
          {rest.map(({ r, p, rank }) => (
            <li key={r.slug}>
              <Wrap p={p} rank={rank} className="group grid grid-cols-[2rem_1fr_auto] items-center gap-3 px-3 py-3 transition hover:bg-gold/[.07] sm:grid-cols-[3rem_1fr_9rem_5rem_5rem_5rem_1.5rem] sm:gap-4 sm:px-5">
                <span className="title text-center text-2xl text-white/80">{rank}</span>
                <span className="flex min-w-0 items-center gap-3 sm:gap-4">
                  <Avatar p={p} size="h-12 w-12 !rounded-lg ring-1 ring-gold/30 sm:h-14 sm:w-14" />
                  <span className="min-w-0">
                    <span className="title block -skew-x-6 truncate text-lg font-semibold group-hover:text-gold sm:text-xl">{p.name}</span>
                    {p.nickname && <span className="block truncate text-[12px] text-white/50">« {p.nickname} »</span>}
                    {breakdown(r.slug) && <span className="block text-[11px] tracking-wide text-white/55">{breakdown(r.slug)}</span>}
                    <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45 sm:hidden">{p.division ?? "Catégorie à confirmer"} · {ratio(r.wins, r.losses)}</span>
                  </span>
                </span>
                <span className="hidden text-[12px] font-medium uppercase tracking-[0.12em] text-white/70 sm:block">{p.division ?? "À confirmer"}</span>
                <span className="title text-right text-xl sm:text-center sm:text-2xl"><span className={W}>{r.wins}</span><span className="sm:hidden"><span className="px-1 text-white/30">–</span><span className={L}>{r.losses}</span></span></span>
                <span className={`title hidden text-center text-2xl sm:block ${L}`}>{r.losses}</span>
                <span className="hidden text-center text-[15px] font-semibold text-white/85 sm:block">{ratio(r.wins, r.losses)}</span>
                {p.link ? <ChevronRight aria-hidden size={18} className="hidden text-gold/70 transition group-hover:translate-x-0.5 group-hover:text-gold sm:block" /> : <span />}
              </Wrap>
              <Matches slug={r.slug} />
            </li>
          ))}
        </ol>
      </div>
      <p className="mx-auto mt-5 max-w-5xl text-[12px] leading-relaxed text-white/50">Le classement cumule les victoires et défaites en ligues 1v1 officielles (TBL et Top Hoops) ; le détail par plateforme et par match est indiqué pour chaque joueur. Les adversaires non confirmés sont signalés comme tels.</p>
    </div>
  );
}
