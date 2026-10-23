import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PageShell } from "@/components/PageHero";
import { ReservationPrototype } from "@/components/ReservationPrototype";
import { TICKETING_URL } from "@/data/site";
export const metadata: Metadata = { title: "Réservation TBL 02" };
export default function Page() {
  if (TICKETING_URL) redirect(TICKETING_URL);
  return (<PageShell><ReservationPrototype /></PageShell>);
}
