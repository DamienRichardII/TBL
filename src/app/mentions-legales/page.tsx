import type { Metadata } from "next";
import { PageShell, PageTitle } from "@/components/PageHero";
import { Notice } from "@/components/DemoNotice";
export const metadata: Metadata = { title: "Mentions légales" };
export default function Page() {
  return (
    <PageShell>
      <PageTitle>Mentions légales</PageTitle>
      <div className="mb-8 max-w-2xl"><Notice>Version de travail : les informations entre crochets sont à fournir par TBL avant la mise en ligne officielle.</Notice></div>
      <div className="max-w-3xl space-y-8 text-[15px] leading-relaxed text-white/80">
        <section><h2 className="title mb-2 text-xl text-gold">Éditeur du site</h2><p>The Ballin League (TBL) — [forme juridique, SIRET, adresse du siège].<br />Responsable de publication : [nom].<br />Contact : [adresse e-mail officielle].</p></section>
        <section><h2 className="title mb-2 text-xl text-gold">Hébergement</h2><p>Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — vercel.com.</p></section>
        <section><h2 className="title mb-2 text-xl text-gold">Conception et développement</h2><p>DamCompany.</p></section>
        <section><h2 className="title mb-2 text-xl text-gold">Propriété intellectuelle</h2><p>Le nom, le logo, les visuels, les photographies et les vidéos de The Ballin League sont protégés. Toute reproduction sans autorisation écrite de TBL est interdite.</p></section>
        <section><h2 className="title mb-2 text-xl text-gold">Liens externes</h2><p>Le site renvoie vers des services tiers (YouTube, Instagram, TikTok, plateforme de billetterie). TBL n’est pas responsable de leur contenu.</p></section>
      </div>
    </PageShell>
  );
}
