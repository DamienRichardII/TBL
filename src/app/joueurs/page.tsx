import type { Metadata } from "next";
import { PageShell, PageTitle } from "@/components/PageHero";
import { PlayerBrowser } from "@/components/PlayerBrowser";
export const metadata: Metadata = { title: "Joueurs" };
export default function Page() {
  return (<PageShell light><PageTitle sub="Les 16 joueurs annoncés pour TBL 02. Les photos et statistiques complètes seront ajoutées après validation.">Nos joueurs</PageTitle><PlayerBrowser /></PageShell>);
}
