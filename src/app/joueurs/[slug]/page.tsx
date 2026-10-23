import type { Metadata } from "next";
import Image from "next/image";
import { Crown } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { players, getPlayer } from "@/data/players";
import { matches } from "@/data/matches";
import { PageShell } from "@/components/PageHero";
import { PlayerPlaceholder } from "@/components/Placeholder";
import { Notice } from "@/components/DemoNotice";

export const dynamicParams = false;
export function generateStaticParams() { return players.map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getPlayer((await params).slug); return { title: p ? p.name : "Joueur" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPlayer((await params).slug);
  if (!p) notFound();
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
            <div className="rounded-xl border border-line p-4"><dt className="text-white/50">Taille</dt><dd className="title mt-1 text-2xl">{p.height}</dd></div>
            <div className="rounded-xl border border-line p-4"><dt className="text-white/50">Numéro</dt><dd className="title mt-1 text-2xl">{p.number !== undefined ? `#${p.number}` : "À confirmer"}</dd></div>
            <div className="col-span-2 rounded-xl border border-line p-4"><dt className="text-white/50">Bilan TBL</dt>
              <dd className="title mt-1 text-2xl">{p.tblRecord ? `${p.tblRecord.wins} V – ${p.tblRecord.losses} D` : "À confirmer"}</dd>
              {p.otherRecord && <dd className="mt-1 text-[12px] text-white/50">{p.otherRecord.source} : {p.otherRecord.wins} V – {p.otherRecord.losses} D — bilan hors TBL, non compté au classement TBL.</dd>}
            </div>
          </dl>
          {p.note && <p className="mt-6 max-w-xl text-[15px] text-white/75">{p.note}</p>}
          <h2 className="title mt-8 text-2xl">Historique TBL</h2>
          <ul className="mt-3 space-y-2 text-[15px]">
            {m && opp ? <li className="rounded-xl border border-line p-4"><span className="text-[11px] font-semibold uppercase tracking-widest text-gold">TBL 02 · 19 déc. 2026 · Game {m.game} ({m.label})</span><br />contre <Link href={`/joueurs/${opp.slug}`} className="underline underline-offset-4 hover:text-gold">{opp.name}</Link>{m.result ? ` — ${m.result.winner === p.slug ? "Victoire" : "Défaite"}` : " — à venir"}</li> : null}
            <li className="text-[13px] text-white/50">Les anciens matchs TBL seront ajoutés après validation par TBL.</li>
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
