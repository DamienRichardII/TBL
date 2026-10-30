"use client";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Field, Msg, input } from "./ui";

interface M { id: number; event_slug: string; game: number; label: string; player_a: string; player_b: string; winner: string | null; result_detail: string | null }
interface E { slug: string; name: string; subtitle: string | null; status: string; date_label: string; time: string | null; city: string | null; venue: string | null; access: string | null; image: string; sort: number }
interface P { slug: string; name: string }

export function MatchesAdmin() {
  const [matches, setMatches] = useState<M[]>([]);
  const [events, setEvents] = useState<E[]>([]);
  const [players, setPlayers] = useState<P[]>([]);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const load = useCallback(async () => {
    const sb = supabase();
    const [m, e, p] = await Promise.all([sb.from("matches").select("id,event_slug,game,label,player_a,player_b,winner,result_detail").order("game", { ascending: false }), sb.from("events").select("*").order("sort"), sb.from("players").select("slug,name")]);
    setMatches((m.data as M[]) ?? []); setEvents((e.data as E[]) ?? []); setPlayers((p.data as P[]) ?? []);
  }, []);
  useEffect(() => { load(); }, [load]);
  const name = (s: string) => players.find((p) => p.slug === s)?.name ?? s;
  const updM = (id: number, patch: Partial<M>) => setMatches((l) => l.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const updE = (slug: string, patch: Partial<E>) => setEvents((l) => l.map((x) => (x.slug === slug ? { ...x, ...patch } : x)));

  async function saveM(m: M) {
    const { error } = await supabase().from("matches").update({ winner: m.winner || null, result_detail: m.result_detail || null, label: m.label }).eq("id", m.id);
    setMsg(error ? { ok: false, text: `Erreur : ${error.message}` } : { ok: true, text: `Game ${m.game} enregistré. Pense à mettre à jour les bilans dans l’onglet Joueurs.` });
  }
  async function saveE(e: E) {
    const { error } = await supabase().from("events").update({ name: e.name, subtitle: e.subtitle || null, status: e.status, date_label: e.date_label, time: e.time || null, city: e.city || null, venue: e.venue || null, access: e.access || null }).eq("slug", e.slug);
    setMsg(error ? { ok: false, text: `Erreur : ${error.message}` } : { ok: true, text: `${e.name} enregistré.` });
  }

  return (
    <div className="space-y-10">
      <section>
        <h2 className="title mb-4 text-2xl">Événements</h2>
        <div className="space-y-4">
          {events.map((e) => (
            <div key={e.slug} className="grid gap-3 rounded-xl border border-line p-4 sm:grid-cols-2">
              <Field label="Nom"><input className={input} value={e.name} onChange={(x) => updE(e.slug, { name: x.target.value })} /></Field>
              <Field label="Sous-titre"><input className={input} value={e.subtitle ?? ""} onChange={(x) => updE(e.slug, { subtitle: x.target.value })} /></Field>
              <Field label="Statut"><select className={input} value={e.status} onChange={(x) => updE(e.slug, { status: x.target.value })}><option>À venir</option><option>Passé</option></select></Field>
              <Field label="Date affichée"><input className={input} value={e.date_label} onChange={(x) => updE(e.slug, { date_label: x.target.value })} /></Field>
              <Field label="Heure"><input className={input} value={e.time ?? ""} onChange={(x) => updE(e.slug, { time: x.target.value })} /></Field>
              <Field label="Ville"><input className={input} value={e.city ?? ""} onChange={(x) => updE(e.slug, { city: x.target.value })} /></Field>
              <Field label="Lieu" className="sm:col-span-2"><input className={input} value={e.venue ?? ""} onChange={(x) => updE(e.slug, { venue: x.target.value })} /></Field>
              <div className="sm:col-span-2"><button onClick={() => saveE(e)} className="btn btn-gold">Enregistrer {e.name}</button></div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="title mb-1 text-2xl">Matchs de TBL 02 — résultats</h2>
        <p className="mb-4 text-[13px] text-white/60">Choisis le vainqueur après le match : il apparaît dans l’onglet Résultats de l’événement et sur le profil des joueurs.</p>
        <div className="space-y-3">
          {matches.map((m) => (
            <div key={m.id} className="grid items-end gap-3 rounded-xl border border-line p-4 sm:grid-cols-[1fr_1fr_1fr_auto]">
              <div><p className="text-[11px] font-semibold uppercase tracking-widest text-gold">Game {m.game} · {m.label}</p><p className="title text-lg">{name(m.player_a)} vs {name(m.player_b)}</p></div>
              <Field label="Vainqueur"><select className={input} value={m.winner ?? ""} onChange={(x) => updM(m.id, { winner: x.target.value || null })}><option value="">Pas encore joué</option><option value={m.player_a}>{name(m.player_a)}</option><option value={m.player_b}>{name(m.player_b)}</option></select></Field>
              <Field label="Détail (ex. score)"><input className={input} value={m.result_detail ?? ""} onChange={(x) => updM(m.id, { result_detail: x.target.value })} /></Field>
              <button onClick={() => saveM(m)} className="btn btn-gold">OK</button>
            </div>
          ))}
        </div>
      </section>
      <Msg m={msg} />
    </div>
  );
}
