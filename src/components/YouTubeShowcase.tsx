"use client";
import { useState } from "react";
import { Play, Youtube, ArrowRight } from "lucide-react";
import type { VideoItem } from "./VideoGrid";

function Thumb({ id, className = "" }: { id: string; className?: string }) {
  const [src, setSrc] = useState(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`);
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" loading="lazy" onError={() => setSrc(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)} className={className} />;
}

export function YouTubeShowcase({ videos, subscribeUrl, channelUrl }: { videos: VideoItem[]; subscribeUrl: string; channelUrl: string }) {
  const [mainId, setMainId] = useState(videos[0]?.id);
  const [playing, setPlaying] = useState(false);
  const main = videos.find((v) => v.id === mainId) ?? videos[0];
  const side = videos.filter((v) => v.id !== main?.id).slice(0, 3);
  const btn = "inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-4 text-[13px] font-semibold uppercase tracking-wide transition";
  return (
    <div>
      {main ? (
        <div className="grid gap-4 lg:grid-cols-[1.7fr_1fr] lg:gap-6">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-black ring-1 ring-white/10">
            {playing ? (
              <iframe className="absolute inset-0 h-full w-full" src={`https://www.youtube-nocookie.com/embed/${main.id}?autoplay=1&rel=0`} title={main.title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
            ) : (
              <button type="button" onClick={() => setPlaying(true)} aria-label={`Lire : ${main.title}`} className="group absolute inset-0 text-left">
                <Thumb id={main.id} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#FF0000] shadow-[0_0_50px_rgba(255,0,0,.55)] transition group-hover:scale-110 lg:h-20 lg:w-20"><Play size={30} fill="white" className="ml-1" /></span>
                <span className="absolute inset-x-0 bottom-0 p-4 lg:p-6"><span className="mb-1 block text-[11px] font-bold uppercase tracking-widest text-[#ff6b6b]">Dernière vidéo</span><span className="title line-clamp-2 text-xl lg:text-3xl">{main.title}</span></span>
              </button>
            )}
          </div>
          <ul className="grid grid-cols-3 gap-3 lg:grid-cols-1 lg:gap-4">
            {side.map((v) => (
              <li key={v.id}>
                <button type="button" onClick={() => { setMainId(v.id); setPlaying(true); }} aria-label={`Lire : ${v.title}`} className="group flex w-full flex-col gap-2 text-left lg:flex-row lg:items-center lg:gap-4">
                  <span className="relative block aspect-video w-full shrink-0 overflow-hidden rounded-lg bg-black ring-1 ring-white/10 lg:w-44">
                    <Thumb id={v.id} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/25 transition group-hover:bg-black/5"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF0000]"><Play size={14} fill="white" className="ml-0.5" /></span></span>
                  </span>
                  <span className="line-clamp-2 text-[12px] font-medium leading-snug text-white/85 group-hover:text-white lg:text-sm">{v.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-white/20 p-6 text-sm text-white/60">Les dernières vidéos s’afficheront ici. En attendant, retrouve-les sur notre chaîne YouTube.</p>
      )}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a href={subscribeUrl} target="_blank" rel="noopener noreferrer" className={`${btn} bg-[#FF0000] text-white shadow-[0_8px_30px_-8px_rgba(255,0,0,.6)] hover:bg-[#d90000]`}><Youtube size={20} />S’abonner</a>
        <a href={channelUrl} target="_blank" rel="noopener noreferrer" className={`${btn} border border-white/70 text-white hover:bg-white hover:text-ink`}>Voir notre chaîne YouTube <ArrowRight size={16} /></a>
      </div>
    </div>
  );
}
