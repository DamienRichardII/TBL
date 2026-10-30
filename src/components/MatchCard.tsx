import Image from "next/image";
import Link from "next/link";
import type { Match, Player } from "@/types";
import { Crown } from "lucide-react";
import { RecordLine } from "./RecordBadge";

export function MatchCard({ m, players }: { m: Match; players: Player[] }) {
  const getPlayer = (slug: string) => players.find((p) => p.slug === slug);
  const a = getPlayer(m.a), b = getPlayer(m.b);
  if (!a || !b) return null;
  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-neutral-900">
      <div className="relative aspect-[4/5] w-full">
        <Image src={m.poster} alt={m.posterAlt} fill sizes="(min-width:1024px) 25vw, (min-width:640px) 45vw, 90vw" className="object-cover" />
      </div>
      <div className="p-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-gold">Game {m.game} · {m.label}</p>
        {m.result && <p className="mt-2 inline-flex items-center gap-1.5 rounded bg-gold/20 px-2 py-1 text-[12px] font-semibold text-gold"><Crown size={13} />Vainqueur : {getPlayer(m.result.winner)?.name}{m.result.detail ? ` · ${m.result.detail}` : ""}</p>}
        <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-start gap-2">
          <PlayerBit p={a} />
          <span className="title pt-1 text-sm text-gold">VS</span>
          <PlayerBit p={b} right />
        </div>
      </div>
    </article>
  );
}

function PlayerBit({ p, right = false }: { p: Player; right?: boolean }) {
  return (
    <div className={right ? "text-right" : ""}>
      <Link href={`/joueurs/${p.slug}`} className="title text-lg hover:text-gold">{p.name}</Link>
      <p className="text-[12px] text-white/60">{p.nickname ? `« ${p.nickname} » · ` : ""}{p.height}</p>
      <RecordLine p={p} />
    </div>
  );
}
