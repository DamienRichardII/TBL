import type { Metadata } from "next";
import Image from "next/image";
import { Crown } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSiteData } from "@/lib/db";
import { PageShell } from "@/components/PageHero";
import { PlayerPlaceholder } from "@/components/Placeholder";
import { Notice } from "@/components/DemoNotice";
import { history, tally } from "@/data/history";

export const revalidate = 60;
export async function generateStaticParams() { return (await getSiteData()).players.map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { players } = await getSiteData();
  const slug = (await params).slug;
  const p = players.find((x) => x.slug === slug); if (!p) return { title: "Joueur" };
  const rec = p.tblRecord ? ` Bilan TBL : ${p.tblRecord.wins} victoire${p.tblRecord.wins > 1 ? "s" : ""}, ${p.tblRecord.losses} défaite${p.tblRecord.losses > 1 ? "s" : ""}.` : "";
  return { title: p.name, description: `${p.name}${p.nickname ? ` « ${p.nickname} »` : ""}, joueur ${p.division} de The Ballin League.${rec}` };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { players, matches } = await getSiteData();
  const getPlayer = (slug: string) => players.find((x) => x.slug === slug);
  const p = getPlayer((await params).slug);
  if (!p) notFound();
  const hist = history[p.slug] ?? [];
  const tbl = hist.length ? tally(hist, "TBL") : p.tblRecord;
  const th = hist.length ? tally(hist, "Top Hoops") : undefined;
  const other = th && th.wins + th.losses ? { source: "Top Hoops", ...th } : hist.length ? undefined : p.otherRecord;
  const m = matches.find((x) => x.a === p.slug || x.b === p.slug);
  const opp = m ? getPlayer(m.a === p.slug ? m.b : m.a) : undefined;
  return (
    <PageShell>
      <Link href="/joueurs" className="text-[13px] text-white/60 hover:text-white">← Tous les joueurs</Link>
      <div className="mt-6 grid gap-8 lg:grid-cols-[360px_1fr]">
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">{p.photo ? <Image src={p.photo} alt={`Photo de ${p.name}`} fill priority sizes="360px" className="object-cover" /> : <PlayerPlaceholder name={p.name} number={p.number} />}</div>
        <div>
          <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-widest text-gold">{p.division}{p.champion && <span className="inline-flex items-center gap-1 rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-bold text-ink"><Crown size={11} />Champion</span>}</p>
          <h1 className="title mt-1 text-5xl lg:text-7xl">{p.name}</h1>
          {p.nickname && <p className="title mt-2 text-2xl text-white/70">« {p.nickname} »</p>}
          <dl className="mt-8 grid max-w-md grid-cols-2 gap-4 text-sm">
            <div className="col-span-2 rounded-xl border border-line p-4"><dt className="text-white/50">Taille</dt><dd className="title mt-1 text-2xl">{p.height}</dd></div>
            <div className="col-span-2 rounded-xl border border-line p-4"><dt className="text-white/50">Bilan TBL</dt>
              <dd className="title mt-1 text-2xl">{tbl ? `${tbl.wins} V – ${tbl.losses} D` : "À confirmer"}</dd>
              {other && <dd className="mt-1 text-[12px] text-white/50">{other.source} : {other.wins} V – {other.losses} D — ligue 1v1 officielle, bilan inscrit au palmarès.</dd>}
            </div>
          </dl>
          {p.note && <p className="mt-6 max-w-xl text-[15px] text-white/75">{p.note}</p>}
          <h2 className="title mt-8 text-2xl">Historique des matchs</h2>
          <ul className="mt-3 space-y-2 text-[15px]">
            {m && opp ? <li className="rounded-xl border border-line p-4"><span className="text-[11px] font-semibold uppercase tracking-widest text-gold">TBL 02 · 19 déc. 2026 · Game {m.game} ({m.label})</span><br />contre <Link href={`/joueurs/${opp.slug}`} className="underline underline-offset-4 hover:text-gold">{opp.name}</Link>{m.result ? ` — ${m.result.winner === p.slug ? "Victoire" : "Défaite"}` : " — à venir"}</li> : null}
            {hist.map((h, i) => (
              <li key={i} className="flex flex-wrap items-center gap-x-3 rounded-xl border border-line p-4">
                <span className={`title text-xl ${h.result === "V" ? "text-emerald-400" : "text-red-400"}`}>{h.result === "V" ? "Victoire" : "Défaite"}</span>
                <span>contre {h.vsSlug ? <Link href={`/joueurs/${h.vsSlug}`} className="underline underline-offset-4 hover:text-gold">{h.vs}</Link> : <span className={h.vs.startsWith("Adversaire") ? "italic text-white/50" : ""}>{h.vs}</span>}{h.score ? ` (${h.score})` : ""}</span>
                <span className="rounded border border-white/15 px-1.5 py-px text-[10px] uppercase tracking-wider text-white/55">{h.platform}</span>
              </li>
            ))}
            {!hist.length && <li className="text-[13px] text-white/50">Les anciens matchs seront ajoutés après validation par TBL.</li>}
          </ul>
          <h2 className="title mt-8 text-2xl">Vidéos</h2>
          {p.videos?.length
            ? <ul className="mt-3 grid gap-3 sm:grid-cols-2">{p.videos.map((id) => <li key={id} className="relative aspect-video overflow-hidden rounded-xl"><iframe className="absolute inset-0 h-full w-full" loading="lazy" src={`https://www.youtube-nocookie.com/embed/${id}`} title={`Vidéo de ${p.name}`} allowFullScreen /></li>)}</ul>
            : <p className="mt-3 text-[13px] text-white/50">Les vidéos de ses performances seront ajoutées dès qu’elles seront disponibles.</p>}
          <div className="mt-8 max-w-xl"><Notice>Photo, palmarès détaillé et statistiques seront ajoutés après validation par TBL.</Notice></div>
        </div>
      </div>
    </PageShell>
  );
}
