"use client";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Field, Msg, input, numOrNull, slugify } from "./ui";

interface Row { slug: string; name: string; nickname: string | null; number: number | null; height: string; division: string; photo: string | null; champion: boolean; wins: number | null; losses: number | null; other_source: string | null; other_wins: number | null; other_losses: number | null; videos: string[]; note: string | null; sort: number }
const empty: Row = { slug: "", name: "", nickname: null, number: null, height: "", division: "Lightweight", photo: null, champion: false, wins: null, losses: null, other_source: null, other_wins: null, other_losses: null, videos: [], note: null, sort: 99 };

export function PlayersAdmin() {
  const [rows, setRows] = useState<Row[]>([]);
  const [cur, setCur] = useState<Row | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const load = useCallback(async () => { const { data } = await supabase().from("players").select("*").order("sort"); setRows((data as Row[]) ?? []); }, []);
  useEffect(() => { load(); }, [load]);

  const set = <K extends keyof Row>(k: K, v: Row[K]) => setCur((c) => (c ? { ...c, [k]: v } : c));
  const txt = (v: string) => (v.trim() === "" ? null : v);

  async function save() {
    if (!cur) return;
    const row = { ...cur, slug: isNew ? slugify(cur.name) : cur.slug };
    if (!row.slug || !row.name || !row.height) { setMsg({ ok: false, text: "Nom et taille obligatoires." }); return; }
    const { error } = await supabase().from("players").upsert(row, { onConflict: "slug" });
    setMsg(error ? { ok: false, text: `Erreur : ${error.message}` } : { ok: true, text: "Enregistré." });
    if (!error) { setCur(row); setIsNew(false); load(); }
  }
  async function remove() {
    if (!cur || isNew || !confirm(`Supprimer ${cur.name} ? Cette action est définitive.`)) return;
    const { error } = await supabase().from("players").delete().eq("slug", cur.slug);
    setMsg(error ? { ok: false, text: `Suppression impossible (le joueur est peut-être dans un match ou un classement) : ${error.message}` } : { ok: true, text: "Supprimé." });
    if (!error) { setCur(null); load(); }
  }
  async function upload(file: File) {
    if (!cur) return;
    const slug = isNew ? slugify(cur.name) : cur.slug;
    if (!slug) { setMsg({ ok: false, text: "Renseigne d’abord le nom du joueur." }); return; }
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const path = `${slug}-${Date.now()}.${ext}`;
    const { error } = await supabase().storage.from("player-photos").upload(path, file, { contentType: file.type, upsert: true });
    if (error) { setMsg({ ok: false, text: `Envoi de la photo impossible : ${error.message}` }); return; }
    set("photo", supabase().storage.from("player-photos").getPublicUrl(path).data.publicUrl);
    setMsg({ ok: true, text: "Photo envoyée. Pense à enregistrer le joueur." });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <div>
        <button onClick={() => { setCur({ ...empty }); setIsNew(true); setMsg(null); }} className="btn btn-gold mb-4 w-full">Nouveau joueur</button>
        <ul className="max-h-[70vh] divide-y divide-line overflow-auto rounded-xl border border-line">
          {rows.map((r) => <li key={r.slug}><button onClick={() => { setCur(r); setIsNew(false); setMsg(null); }} className={`flex w-full items-center justify-between px-3 py-2.5 text-left text-sm hover:bg-white/5 ${cur?.slug === r.slug && !isNew ? "bg-white/10" : ""}`}><span>{r.name}</span><span className="text-[11px] text-white/50">{r.division.slice(0, 5)}.</span></button></li>)}
        </ul>
      </div>
      {cur ? (
        <div className="space-y-4">
          <h2 className="title text-2xl">{isNew ? "Nouveau joueur" : cur.name}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nom"><input className={input} value={cur.name} onChange={(e) => set("name", e.target.value)} /></Field>
            <Field label="Surnom"><input className={input} value={cur.nickname ?? ""} onChange={(e) => set("nickname", txt(e.target.value))} /></Field>
            <Field label="Taille (ex. 1,92 m)"><input className={input} value={cur.height} onChange={(e) => set("height", e.target.value)} /></Field>
            <Field label="Numéro"><input className={input} inputMode="numeric" value={cur.number ?? ""} onChange={(e) => set("number", numOrNull(e.target.value))} /></Field>
            <Field label="Division"><select className={input} value={cur.division} onChange={(e) => set("division", e.target.value)}><option>Lightweight</option><option>Middleweight</option><option>Heavyweight</option></select></Field>
            <Field label="Victoires TBL (vide = à confirmer)"><input className={input} inputMode="numeric" value={cur.wins ?? ""} onChange={(e) => set("wins", numOrNull(e.target.value))} /></Field>
            <Field label="Défaites TBL (vide = à confirmer)"><input className={input} inputMode="numeric" value={cur.losses ?? ""} onChange={(e) => set("losses", numOrNull(e.target.value))} /></Field>
            <Field label="Bilan hors TBL : source (ex. TapeUp)"><input className={input} value={cur.other_source ?? ""} onChange={(e) => set("other_source", txt(e.target.value))} /></Field>
            <Field label="Hors TBL : victoires"><input className={input} inputMode="numeric" value={cur.other_wins ?? ""} onChange={(e) => set("other_wins", numOrNull(e.target.value))} /></Field>
            <Field label="Hors TBL : défaites"><input className={input} inputMode="numeric" value={cur.other_losses ?? ""} onChange={(e) => set("other_losses", numOrNull(e.target.value))} /></Field>
          </div>
          <Field label="Vidéos YouTube (identifiants séparés par des virgules)"><input className={input} value={cur.videos.join(", ")} onChange={(e) => set("videos", e.target.value.split(",").map((x) => x.trim()).filter(Boolean))} /></Field>
          <Field label="Note affichée sur le profil"><textarea rows={3} className={input} value={cur.note ?? ""} onChange={(e) => set("note", txt(e.target.value))} /></Field>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={cur.champion} onChange={(e) => set("champion", e.target.checked)} className="accent-[#C9A15C]" />Champion (couronne sur le site)</label>
          <div>
            <p className="text-[12px] text-white/70">Photo officielle</p>
            <div className="mt-2 flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {cur.photo && <img src={cur.photo} alt="" className="h-24 w-20 rounded-lg object-cover" />}
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} className="text-sm" />
              {cur.photo && <button onClick={() => set("photo", null)} className="text-[12px] underline">Retirer</button>}
            </div>
          </div>
          <div className="flex flex-wrap gap-3 pt-2"><button onClick={save} className="btn btn-gold">Enregistrer</button>{!isNew && <button onClick={remove} className="btn btn-ghost">Supprimer</button>}</div>
          <Msg m={msg} />
        </div>
      ) : <p className="text-sm text-white/60">Sélectionne un joueur ou crée-en un nouveau.</p>}
    </div>
  );
}
