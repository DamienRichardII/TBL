"use client";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase, supabaseConfigured } from "@/lib/supabase";
import { Field, Msg, input } from "./ui";
import { PlayersAdmin } from "./PlayersAdmin";
import { RankingsAdmin } from "./RankingsAdmin";
import { MatchesAdmin } from "./MatchesAdmin";
import { VideosAdmin } from "./VideosAdmin";
import { MessagesAdmin } from "./MessagesAdmin";

const tabs = ["Joueurs", "Classements", "Matchs & événements", "Vidéos", "Messages"] as const;

export function AdminApp() {
  const [session, setSession] = useState<Session | null>(null);
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<(typeof tabs)[number]>("Joueurs");

  useEffect(() => {
    if (!supabaseConfigured) { setReady(true); return; }
    const sb = supabase();
    sb.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true); });
    const { data } = sb.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) { setAllowed(null); return; }
    supabase().from("admin_users").select("email").then(({ data }) => setAllowed(Boolean(data && data.length)));
  }, [session]);

  if (!supabaseConfigured) return <p className="text-white/70">L’espace administrateur n’est pas encore relié à la base de données.</p>;
  if (!ready) return <p className="text-white/60">Chargement…</p>;
  if (!session) return <Login />;
  if (allowed === null) return <p className="text-white/60">Vérification des droits…</p>;
  if (!allowed) return (
    <div className="max-w-md">
      <h1 className="title text-3xl">Accès non autorisé</h1>
      <p className="mt-3 text-sm text-white/70">Le compte {session.user.email} n’a pas les droits d’administration.</p>
      <button onClick={() => supabase().auth.signOut()} className="btn btn-ghost mt-6">Se déconnecter</button>
    </div>
  );

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="title text-4xl lg:text-5xl">Administration</h1>
        <div className="flex items-center gap-3 text-[13px] text-white/60"><span>{session.user.email}</span><button onClick={() => supabase().auth.signOut()} className="underline underline-offset-4 hover:text-white">Se déconnecter</button></div>
      </div>
      <div role="tablist" className="mb-8 flex flex-wrap gap-2">
        {tabs.map((t) => <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`chip ${tab === t ? "border-gold bg-gold text-ink" : "border-white/25 text-white/75 hover:border-white"}`}>{t}</button>)}
      </div>
      <p className="mb-6 text-[12px] text-white/50">Les modifications apparaissent sur le site en moins d’une minute.</p>
      {tab === "Joueurs" && <PlayersAdmin />}
      {tab === "Classements" && <RankingsAdmin />}
      {tab === "Matchs & événements" && <MatchesAdmin />}
      {tab === "Vidéos" && <VideosAdmin />}
      {tab === "Messages" && <MessagesAdmin />}
    </div>
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase().auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) setMsg({ ok: false, text: "Identifiants incorrects." });
  }
  return (
    <form onSubmit={submit} className="max-w-sm space-y-4">
      <h1 className="title text-4xl">Administration</h1>
      <p className="text-sm text-white/65">Connexion réservée à l’équipe TBL.</p>
      <Field label="E-mail"><input type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className={input} /></Field>
      <Field label="Mot de passe"><input type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={input} /></Field>
      <button disabled={busy} className="btn btn-gold w-full disabled:opacity-60">{busy ? "Connexion…" : "Se connecter"}</button>
      <Msg m={msg} />
    </form>
  );
}
