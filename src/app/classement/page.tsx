import type { Metadata } from "next";
import { PageShell, PageTitle } from "@/components/PageHero";
import { DivisionTabs } from "@/components/DivisionTabs";
export const metadata: Metadata = { title: "Classement" };
export default function Page() { return (<PageShell><PageTitle sub="Un classement par division, établi sur les seuls résultats officiels TBL.">Classement</PageTitle><DivisionTabs /></PageShell>); }
