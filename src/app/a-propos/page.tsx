import type { Metadata } from "next";
import { PageShell, PageTitle } from "@/components/PageHero";
import { Notice } from "@/components/DemoNotice";
import { divisions } from "@/data/site";
export const metadata: Metadata = { title: "À propos" };

const Block = ({ t, children }: { t: string; children: React.ReactNode }) => (
  <section className="border-t border-line py-8 lg:grid lg:grid-cols-[260px_1fr] lg:gap-10"><h2 className="title mb-3 text-2xl text-gold">{t}</h2><div className="max-w-3xl space-y-4 text-[15px] leading-relaxed text-white/80">{children}</div></section>
);
export default function Page() {
  return (
    <PageShell>
      <PageTitle>À propos de TBL</PageTitle>
      <Block t="Présentation"><p>The Ballin League (TBL) est une organisation française de basketball dédiée aux confrontations en un contre un (1v1). Elle réunit des joueurs talentueux autour de rencontres compétitives, de rivalités sportives et d’événements conçus pour mettre en lumière la culture du basketball.</p></Block>
      <Block t="Vision et ambition"><p>Développer une référence du basketball 1v1 en France, puis à l’international, en donnant de la visibilité aux joueurs et en proposant des événements structurés, des classements, des titres et des contenus de qualité.</p></Block>
      <Block t="Fondateur et cofondateur">
        <p><strong className="text-white">Stéphane Manga — Fondateur.</strong> Ancien joueur de NCAA Division 1 à Seton Hall University et ancien joueur professionnel, Stéphane Manga a fondé TBL pour mettre son expérience du haut niveau au service d’une nouvelle scène compétitive du basketball 1v1 en France.</p>
        <p><strong className="text-white">Olivier Abena — Cofondateur.</strong> Ancien joueur de Nationale 2 à Orléans, Olivier Abena connaît le basketball compétitif et l’univers semi-professionnel. Passionné depuis l’enfance, il a commencé le basket aux côtés de Stéphane Manga, son ami de longue date. En participant au développement de TBL, il souhaite donner une nouvelle dimension à leur passion commune et offrir davantage de visibilité aux joueurs.</p>
        <p><strong className="text-white">Leur histoire.</strong> Une amitié forgée sur les terrains et une ambition partagée : construire une organisation qui valorise les talents et fait grandir le basketball 1v1.</p>
      </Block>
      <Block t="Divisions officielles"><ul className="grid gap-3 sm:grid-cols-3">{divisions.map((d) => <li key={d.name} className="rounded-xl border border-line p-4"><p className="title text-xl text-white">{d.name}</p><p className="text-sm">{d.range}</p></li>)}</ul></Block>
      <Block t="Titres et championnats">
        <p>TBL organise des rencontres permettant de déterminer les meilleurs joueurs de chaque division. Les ceintures se défendent exclusivement lors des événements TBL.</p>
        <Notice>Règle provisoire, à valider avant publication : un joueur doit obtenir trois victoires TBL sans défaite pour prétendre au statut de champion. La formulation définitive du règlement sera communiquée par TBL.</Notice>
      </Block>
    </PageShell>
  );
}
