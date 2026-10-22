import type { Metadata } from "next";
import { ShoppingBag } from "lucide-react";
import { PageShell, PageTitle } from "@/components/PageHero";
export const metadata: Metadata = { title: "Boutique" };
export default function Page() {
  return (<PageShell><PageTitle>Boutique officielle</PageTitle>
    <div className="flex flex-col items-center rounded-2xl border border-line py-20 text-center"><ShoppingBag size={44} strokeWidth={1.2} className="text-gold" /><p className="title mt-5 text-3xl">Prochainement</p><p className="mt-2 max-w-md text-sm text-white/65">La boutique officielle TBL ouvrira lorsque les produits seront disponibles.</p></div></PageShell>);
}
