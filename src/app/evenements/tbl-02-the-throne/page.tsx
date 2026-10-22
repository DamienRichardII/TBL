import type { Metadata } from "next";
import { PageShell } from "@/components/PageHero";
import { EventDetail } from "@/components/EventDetail";
export const metadata: Metadata = { title: "TBL 02 — The Throne", description: "TBL 02 — The Throne : samedi 19 décembre 2026 à Orléans, 8 matchs 1v1. Accès gratuit sur réservation." };
export default function Page() { return (<PageShell><EventDetail /></PageShell>); }
