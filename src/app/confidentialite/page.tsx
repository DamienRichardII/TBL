import type { Metadata } from "next";
import { PageShell, PageTitle } from "@/components/PageHero";
import { Notice } from "@/components/DemoNotice";
export const metadata: Metadata = { title: "Politique de confidentialité" };
export default function Page() {
  return (
    <PageShell>
      <PageTitle>Politique de confidentialité</PageTitle>
      <div className="mb-8 max-w-2xl"><Notice>Version de travail à faire valider par TBL (et si besoin par un juriste) avant la mise en ligne officielle, notamment une fois le formulaire de contact et la billetterie activés.</Notice></div>
      <div className="max-w-3xl space-y-8 text-[15px] leading-relaxed text-white/80">
        <section><h2 className="title mb-2 text-xl text-gold">Responsable du traitement</h2><p>The Ballin League (TBL) — [coordonnées à fournir].</p></section>
        <section><h2 className="title mb-2 text-xl text-gold">Données collectées</h2><p>Actuellement, le site ne collecte aucune donnée personnelle : le formulaire de contact et la réservation ne sont pas encore actifs. Lorsqu’ils le seront, seules les données nécessaires seront demandées (nom, adresse e-mail, message, informations de réservation).</p></section>
        <section><h2 className="title mb-2 text-xl text-gold">Finalités et durée</h2><p>Répondre aux demandes (joueurs, partenaires, sponsors, médias) et gérer les réservations de billets. Les données sont conservées le temps nécessaire à ces finalités : [durée à définir].</p></section>
        <section><h2 className="title mb-2 text-xl text-gold">Vidéos YouTube</h2><p>Les vidéos intégrées utilisent le mode de confidentialité renforcée de YouTube (youtube-nocookie.com) et ne se chargent qu’au clic sur le lecteur.</p></section>
        <section><h2 className="title mb-2 text-xl text-gold">Vos droits</h2><p>Conformément au RGPD, vous disposez d’un droit d’accès, de rectification, d’effacement, d’opposition et de portabilité. Pour l’exercer : [adresse e-mail de contact]. Vous pouvez aussi saisir la CNIL (cnil.fr).</p></section>
      </div>
    </PageShell>
  );
}
