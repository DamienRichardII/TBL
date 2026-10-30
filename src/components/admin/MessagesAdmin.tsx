"use client";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface M { id: string; created_at: string; category: string; name: string; email: string; message: string; handled: boolean }
const labels: Record<string, string> = { joueur: "Joueur", partenaire: "Partenaire", sponsor: "Sponsor", media: "Média", general: "Demande générale" };

export function MessagesAdmin() {
  const [rows, setRows] = useState<M[]>([]);
  const load = useCallback(async () => { const { data } = await supabase().from("contact_messages").select("*").order("created_at", { ascending: false }); setRows((data as M[]) ?? []); }, []);
  useEffect(() => { load(); }, [load]);
  async function toggle(m: M) { await supabase().from("contact_messages").update({ handled: !m.handled }).eq("id", m.id); load(); }
  async function remove(m: M) { if (confirm("Supprimer ce message ?")) { await supabase().from("contact_messages").delete().eq("id", m.id); load(); } }
  return (
    <ul className="space-y-3">
      {rows.map((m) => (
        <li key={m.id} className={`rounded-xl border p-4 ${m.handled ? "border-line opacity-60" : "border-gold/40"}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 text-[12px] text-white/60"><span className="font-semibold uppercase tracking-widest text-gold">{labels[m.category] ?? m.category}</span><span>{new Date(m.created_at).toLocaleString("fr-FR")}</span></div>
          <p className="mt-2 text-sm"><strong>{m.name}</strong> · <a href={`mailto:${m.email}`} className="underline underline-offset-4">{m.email}</a></p>
          <p className="mt-2 whitespace-pre-wrap text-[15px] text-white/85">{m.message}</p>
          <div className="mt-3 flex gap-4 text-[13px]"><button onClick={() => toggle(m)} className="underline underline-offset-4">{m.handled ? "Marquer non traité" : "Marquer traité"}</button><button onClick={() => remove(m)} className="text-[#ff6b6b] underline underline-offset-4">Supprimer</button></div>
        </li>
      ))}
      {rows.length === 0 && <li className="text-sm text-white/60">Aucun message pour le moment.</li>}
    </ul>
  );
}
