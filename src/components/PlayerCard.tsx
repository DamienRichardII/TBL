import Link from "next/link";
import type { Player } from "@/types";
import { PlayerPlaceholder } from "./Placeholder";
import { RecordLine } from "./RecordBadge";
export function PlayerCard({ p }: { p: Player }) {
  return (
    <Link href={`/joueurs/${p.slug}`} className="group block overflow-hidden rounded-2xl bg-ink text-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">
      <div className="aspect-[3/4]"><PlayerPlaceholder name={p.name} number={p.number} /></div>
      <div className="p-4">
        <h3 className="title text-xl group-hover:text-gold">{p.name}</h3>
        <p className="text-[12px] text-white/60">{p.nickname ? `« ${p.nickname} » · ` : ""}{p.height} · {p.division}</p>
        <div className="mt-2"><RecordLine p={p} /></div>
      </div>
    </Link>
  );
}
