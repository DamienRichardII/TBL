import type { Metadata } from "next";
import { PageShell, PageTitle } from "@/components/PageHero";
import { Partners } from "@/components/Partners";
import { ContactForm } from "@/components/ContactForm";
export const metadata: Metadata = { title: "Contact" };
export default function Page() { return (<><PageShell><PageTitle sub="Joueurs, partenaires, sponsors, médias ou demande générale : contactez l’organisation.">Contact</PageTitle><ContactForm /></PageShell><Partners /></>); }
