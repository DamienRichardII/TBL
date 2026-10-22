"use client";
import { Notice } from "./DemoNotice";
const f = "w-full rounded-lg border border-white/20 bg-neutral-950 px-4 py-3 text-sm outline-none focus:border-gold";
export function ContactForm() {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="max-w-2xl space-y-4" aria-describedby="contact-note">
      <label className="block text-sm">Vous êtes
        <select className={`${f} mt-1`} defaultValue="joueur"><option value="joueur">Joueur</option><option value="partenaire">Partenaire</option><option value="sponsor">Sponsor</option><option value="media">Média</option></select></label>
      <label className="block text-sm">Nom<input className={`${f} mt-1`} autoComplete="name" /></label>
      <label className="block text-sm">E-mail<input type="email" className={`${f} mt-1`} autoComplete="email" /></label>
      <label className="block text-sm">Message<textarea rows={5} className={`${f} mt-1`} /></label>
      <button type="button" aria-disabled="true" className="btn btn-disabled w-full sm:w-auto">Envoi bientôt disponible</button>
      <div id="contact-note"><Notice>Ce formulaire est une maquette : aucun message n’est envoyé pour l’instant. Les coordonnées professionnelles de TBL seront publiées dès leur réception.</Notice></div>
    </form>
  );
}
