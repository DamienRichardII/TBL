import type { Metadata } from "next";
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
        <div className="aspect-[3/4] overflow-hidden rounded-2xl"><PlayerPlaceholder name={p.name} number={p.number} /></div>
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-widest text-gold">{p.division}</p>
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
          {m && opp && <p className="mt-6 text-[15px]">TBL 02 · Game {m.game} ({m.label}) contre <Link href={`/joueurs/${opp.slug}`} className="underline underline-offset-4 hover:text-gold">{opp.name}</Link></p>}
          <div className="mt-8 max-w-xl"><Notice>Photo, palmarès détaillé et statistiques seront ajoutés après validation par TBL.</Notice></div>
        </div>
      </div>
    </PageShell>
  );
}
