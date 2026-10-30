"use client";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Msg, input, numOrNull } from "./ui";

const DIVS = ["Lightweight", "Middleweight", "Heavyweight"] as const;
interface P { slug: string; name: string; division: string }
interface Line { player_slug: string; wins: number; losses: number; champion: boolean }

export function RankingsAdmin() {
  const [div, setDiv] = useState<(typeof DIVS)[number]>("Lightweight");
  const [players, setPlayers] = useState<P[]>([]);
  const [lines, setLines] = useState<Line[]>([]);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const load = useCallback(async () => {
    const sb = supabase();
    const [p, r] = await Promise.all([sb.from("players").select("slug,name,division").order("name"), sb.from("rankings").select("*").eq("division", div).order("position")]);
    setPlayers((p.data as P[]) ?? []);
    setLines(((r.data as Line[]) ?? []).map((x) => ({ player_slug: x.player_slug, wins: x.wins, losses: x.losses, champion: x.champion })));
    setMsg(null);
  }, [div]);
  useEffect(() => { load(); }, [load]);

  const upd = (i: number, patch: Partial<Line>) => setLines((l) => l.map((x, j) => (j === i ? { ...x, ...patch } : x)));
  const move = (i: number, d: number) => setLines((l) => { const n = [...l]; const j = i + d; if (j < 0 || j >= n.length) return l; [n[i], n[j]] = [n[j], n[i]]; return n; });

  async function save() {
    const slugs = lines.map((l) => l.player_slug);
    if (slugs.some((s) => !s) || new Set(slugs).size !== slugs.length) { setMsg({ ok: false, text: "Chaque ligne doit avoir un joueur différent." }); return; }
    const sb = supabase();
    if (lines.length) {
      const { error } = await sb.from("rankings").upsert(lines.map((l, i) => ({ division: div, position: i + 1, ...l })), { onConflict: "division,player_slug" });
      if (error) { setMsg({ ok: false, text: `Erreur : ${error.message}` }); return; }
    }
    let del = sb.from("rankings").delete().eq("division", div);
    if (slugs.length) del = del.not("player_slug", "in", `(${slugs.map((s) => `"${s}"`).join(",")})`);
    const { error } = await del;
    setMsg(error ? { ok: false, text: `Erreur : ${error.message}` } : { ok: true, text: "Classement enregistré." });
  }

  return (
    <div>
      <div role="tablist" className="mb-6 flex gap-2">{DIVS.map((d) => <button key={d} role="tab" aria-selected={div === d} onClick={() => setDiv(d)} className={`chip ${div === d ? "border-white bg-white text-ink" : "border-white/25 text-white/75"}`}>{d}</button>)}</div>
      <p className="mb-4 max-w-2xl text-[13px] text-white/60">Le premier de la liste est n°1. Un classement vide affiche « pas encore communiqué » sur le site. Ne publie que des résultats validés par TBL.</p>
      <ol className="space-y-2">
        {lines.map((l, i) => (
          <li key={i} className="flex flex-wrap items-center gap-2 rounded-xl border border-line p-3">
            <span className="title w-8 text-center text-xl text-gold">{i + 1}</span>
            <select className={`${input} !w-auto min-w-[10rem] flex-1`} value={l.player_slug} onChange={(e) => upd(i, { player_slug: e.target.value })}><option value="">Joueur…</option>{players.filter((p) => p.division === div).map((p) => <option key={p.slug} value={p.slug}>{p.name}</option>)}</select>
            <input aria-label="Victoires" className={`${input} !w-16`} inputMode="numeric" value={l.wins} onChange={(e) => upd(i, { wins: numOrNull(e.target.value) ?? 0 })} />
            <span className="text-white/50">V</span>
            <input aria-label="Défaites" className={`${input} !w-16`} inputMode="numeric" value={l.losses} onChange={(e) => upd(i, { losses: numOrNull(e.target.value) ?? 0 })} />
            <span className="text-white/50">D</span>
            <label className="flex items-center gap-1 text-[12px]"><input type="checkbox" checked={l.champion} onChange={(e) => upd(i, { champion: e.target.checked })} className="accent-[#C9A15C]" />Champion</label>
            <button onClick={() => move(i, -1)} aria-label="Monter" className="px-2">↑</button><button onClick={() => move(i, 1)} aria-label="Descendre" className="px-2">↓</button>
            <button onClick={() => setLines((x) => x.filter((_, j) => j !== i))} aria-label="Retirer" className="px-2 text-[#ff6b6b]">✕</button>
          </li>
        ))}
      </ol>
      <div className="mt-4 flex flex-wrap gap-3">
        <button onClick={() => setLines((l) => [...l, { player_slug: "", wins: 0, losses: 0, champion: false }])} className="btn btn-ghost">Ajouter une ligne</button>
        <button onClick={save} className="btn btn-gold">Enregistrer le classement</button>
      </div>
      <Msg m={msg} />
    </div>
  );
}
