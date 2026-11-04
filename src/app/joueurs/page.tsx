import type { Metadata } from "next";
import { PageShell, PageTitle } from "@/components/PageHero";
import { PlayerBrowser } from "@/components/PlayerBrowser";
export const metadata: Metadata = { title: "Joueurs", description: "Les joueurs de The Ballin League : profils, divisions, tailles et bilans victoires-défaites." };
export default function Page() {
  return (<PageShell light><PageTitle sub="Les 16 joueurs annoncés pour TBL 02. Les photos et statistiques complètes seront ajoutées après validation.">Nos joueurs</PageTitle><PlayerBrowser /></PageShell>);
}
