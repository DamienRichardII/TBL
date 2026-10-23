"use client";
import { useEffect, useState } from "react";

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return { j: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}

export function Countdown({ target, className = "" }: { target: string; className?: string }) {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const t = new Date(target).getTime();
    const tick = () => setLeft(t - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  if (left !== null && left <= 0) return <p className="title text-2xl gold-text">C’est le grand jour !</p>;
  const p = parts(left ?? 0);
  const items: [string, number][] = [["Jours", p.j], ["Heures", p.h], ["Min", p.m], ["Sec", p.s]];
  return (
    <div role="timer" aria-label="Compte à rebours avant TBL 02" className={`flex gap-2 sm:gap-3 ${className}`}>
      {items.map(([label, v]) => (
        <div key={label} className="min-w-[64px] rounded-xl border border-gold/40 bg-ink/70 px-3 py-2 text-center sm:min-w-[78px]">
          <span className="title gold-text block text-3xl sm:text-4xl" suppressHydrationWarning>{left === null ? "--" : String(v).padStart(2, "0")}</span>
          <span className="text-[10px] uppercase tracking-widest text-white/60">{label}</span>
        </div>
      ))}
    </div>
  );
}
