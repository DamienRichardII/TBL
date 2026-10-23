import Image from "next/image";
import Link from "next/link";
import { Crown } from "lucide-react";
import type { Player } from "@/types";
import { PlayerPlaceholder } from "./Placeholder";
import { RecordLine } from "./RecordBadge";
export function PlayerCard({ p }: { p: Player }) {
  return (
    <Link href={`/joueurs/${p.slug}`} className="group block overflow-hidden rounded-2xl bg-ink text-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">
      <div className="relative aspect-[3/4]">
        {p.photo ? <Image src={p.photo} alt={`Photo de ${p.name}`} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" /> : <PlayerPlaceholder name={p.name} number={p.number} />}
        {p.champion && <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-gold px-2.5 py-1 text-[10px] font-bold uppercase text-ink"><Crown size={12} />Champion</span>}
      </div>
      <div className="p-4">
        <h3 className="title text-xl group-hover:text-gold">{p.name}</h3>
        <p className="text-[12px] text-white/60">{p.nickname ? `« ${p.nickname} » · ` : ""}{p.height} · {p.division}</p>
        <div className="mt-2"><RecordLine p={p} /></div>
      </div>
    </Link>
  );
}
