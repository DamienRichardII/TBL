import type { Metadata } from "next";
import { PageShell, PageTitle } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
export const metadata: Metadata = { title: "Contact" };
export default function Page() { return (<PageShell><PageTitle sub="Joueurs, partenaires, sponsors et médias : contactez l’organisation.">Contact</PageTitle><ContactForm /></PageShell>); }
