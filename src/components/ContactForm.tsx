"use client";
import { useState } from "react";
import Link from "next/link";
import { Notice } from "./DemoNotice";
import { SUPABASE_KEY, SUPABASE_URL, supabaseConfigured } from "@/lib/supabase";

const f = "w-full rounded-lg border border-white/20 bg-neutral-950 px-4 py-3 text-sm outline-none focus:border-gold";
type State = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [state, setState] = useState<State>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    if (d.get("website")) return; // champ piège anti-spam : un humain ne le remplit pas
    setState("sending");
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/contact_messages`, {
        method: "POST",
        headers: { apikey: SUPABASE_KEY, "Content-Type": "application/json", Prefer: "return=minimal" },
        body: JSON.stringify({ category: d.get("category"), name: String(d.get("name") ?? "").trim(), email: String(d.get("email") ?? "").trim(), message: String(d.get("message") ?? "").trim() }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setState("sent");
    } catch {
      setState("error");
    }
  }

  if (!supabaseConfigured) {
    return <div className="max-w-2xl"><Notice>Le formulaire sera disponible très prochainement. En attendant, retrouve-nous sur Instagram, TikTok et YouTube.</Notice></div>;
  }
  if (state === "sent") {
    return <div role="status" className="max-w-2xl rounded-xl border border-gold/40 bg-gold/10 p-6"><p className="title text-2xl">Message envoyé</p><p className="mt-2 text-sm text-white/80">Merci, l’équipe TBL a bien reçu ta demande et te répondra par e-mail.</p><button onClick={() => setState("idle")} className="btn btn-ghost mt-4">Envoyer un autre message</button></div>;
  }
  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-4">
      <label className="block text-sm">Vous êtes
        <select name="category" className={`${f} mt-1`} defaultValue="joueur"><option value="joueur">Joueur</option><option value="partenaire">Partenaire</option><option value="sponsor">Sponsor</option><option value="media">Média</option><option value="general">Demande générale</option></select></label>
      <label className="block text-sm">Nom<input name="name" required maxLength={120} className={`${f} mt-1`} autoComplete="name" /></label>
      <label className="block text-sm">E-mail<input name="email" type="email" required maxLength={200} className={`${f} mt-1`} autoComplete="email" /></label>
      <label className="block text-sm">Message<textarea name="message" required minLength={5} maxLength={5000} rows={5} className={`${f} mt-1`} /></label>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <label className="flex items-start gap-3 text-[13px] text-white/75"><input type="checkbox" required className="mt-1 accent-[#C9A15C]" /><span>J’accepte que ces informations soient utilisées pour répondre à ma demande. <Link href="/confidentialite" className="underline underline-offset-4 hover:text-gold">Politique de confidentialité</Link></span></label>
      <button type="submit" disabled={state === "sending"} className="btn btn-gold w-full disabled:opacity-60 sm:w-auto">{state === "sending" ? "Envoi…" : "Envoyer le message"}</button>
      {state === "error" && <p role="alert" className="text-sm text-[#ff6b6b]">L’envoi a échoué. Réessaie dans un instant.</p>}
    </form>
  );
}
