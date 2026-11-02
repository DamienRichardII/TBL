import type { Metadata } from "next";
import { PageShell, PageTitle } from "@/components/PageHero";
import { RankingList } from "@/components/RankingList";
export const metadata: Metadata = { title: "Classement" };
export default function Page() { return (<PageShell><PageTitle>Classement</PageTitle><RankingList /></PageShell>); }
