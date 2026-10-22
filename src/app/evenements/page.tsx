import type { Metadata } from "next";
import { PageShell, PageTitle } from "@/components/PageHero";
import { EventCatalog } from "@/components/EventCatalog";
export const metadata: Metadata = { title: "Événements" };
export default function Page() {
  return (<PageShell light><PageTitle sub="TBL 02 est le prochain rendez-vous. Les autres événements seront annoncés ici.">Tous les événements</PageTitle><EventCatalog /></PageShell>);
}
