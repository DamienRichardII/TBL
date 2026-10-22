import type { Metadata } from "next";
import { PageShell } from "@/components/PageHero";
import { ReservationPrototype } from "@/components/ReservationPrototype";
export const metadata: Metadata = { title: "Réservation TBL 02" };
export default function Page() { return (<PageShell><ReservationPrototype /></PageShell>); }
