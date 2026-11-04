import type { Metadata } from "next";
import { PageShell, PageTitle } from "@/components/PageHero";
import { EventCatalog } from "@/components/EventCatalog";
export const metadata: Metadata = { title: "Événements", description: "Tous les événements The Ballin League : TBL 02 The Throne à venir et les éditions passées de basketball 1v1." };
export default function Page() {
  return (<PageShell light><PageTitle sub="TBL 02 est le prochain rendez-vous. Les autres événements seront annoncés ici.">Tous les événements</PageTitle><EventCatalog /></PageShell>);
}
