"use client";
import { useState } from "react";
import { Play } from "lucide-react";
import type { YtVideo, VideoKind } from "@/lib/youtube";

const KINDS: ("Toutes" | VideoKind)[] = ["Toutes", "Matchs complets", "Highlights", "Teasers"];

export type VideoItem = YtVideo & { kind: VideoKind };

export function VideoGrid({ videos, filters = false, limit }: { videos: VideoItem[]; filters?: boolean; limit?: number }) {
  const [kind, setKind] = useState<(typeof KINDS)[number]>("Toutes");
  const [playing, setPlaying] = useState<string | null>(null);
  const list = videos.filter((v) => kind === "Toutes" || v.kind === kind).slice(0, limit);

  return (
    <div>
      {filters && (
        <div role="tablist" aria-label="Catégories de vidéos" className="mb-6 flex flex-wrap gap-2">
          {KINDS.map((k) => (
            <button key={k} role="tab" aria-selected={kind === k} onClick={() => setKind(k)} className={`chip ${kind === k ? "border-gold bg-gold text-ink" : "border-white/25 text-white/75 hover:border-white"}`}>{k}</button>
          ))}
        </div>
      )}
      {list.length === 0 ? (
        <p className="rounded-xl border border-dashed border-white/20 p-6 text-sm text-white/60">
          {videos.length === 0 ? "Les dernières vidéos s’afficheront ici. En attendant, retrouve-les sur notre chaîne YouTube." : "Aucune vidéo dans cette catégorie pour le moment."}
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((v) => (
            <li key={v.id} className="overflow-hidden rounded-2xl border border-line bg-neutral-950">
              <div className="relative aspect-video bg-black">
                {playing === v.id ? (
                  <iframe className="absolute inset-0 h-full w-full" src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`} title={v.title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
                ) : (
                  <button onClick={() => setPlaying(v.id)} aria-label={`Lire : ${v.title}`} className="group absolute inset-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt="" loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                    <span className="absolute inset-0 bg-black/30 transition group-hover:bg-black/10" />
                    <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#FF0000] shadow-lg transition group-hover:scale-110"><Play size={24} fill="white" className="ml-0.5" /></span>
                  </button>
                )}
              </div>
              <p className="line-clamp-2 p-4 text-sm font-medium">{v.title}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
