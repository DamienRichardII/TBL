import type { Metadata } from "next";
import { PageShell, PageTitle } from "@/components/PageHero";
import { RankingList } from "@/components/RankingList";
export const metadata: Metadata = { title: "Classement" };
export default function Page() { return (<PageShell><PageTitle sub="Classement officiel des joueurs TBL — octobre 2026, établi sur les seuls résultats officiels de la ligue.">Classement</PageTitle><RankingList /></PageShell>); }
