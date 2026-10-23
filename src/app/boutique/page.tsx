import type { Metadata } from "next";
import { ShoppingBag } from "lucide-react";
import { PageShell, PageTitle } from "@/components/PageHero";
export const metadata: Metadata = { title: "Boutique" };
const cats = ["Maillots officiels", "T-shirts", "Sweats", "Accessoires"];
export default function Page() {
  return (
    <PageShell>
      <PageTitle sub="Les produits officiels TBL arrivent bientôt.">Boutique officielle</PageTitle>
      <div className="flex flex-col items-center rounded-2xl border border-gold/30 py-16 text-center"><ShoppingBag size={44} strokeWidth={1.2} className="text-gold" /><p className="title gold-text mt-5 text-4xl">Coming soon</p><p className="mt-2 max-w-md px-4 text-sm text-white/65">La boutique officielle TBL ouvrira lorsque les produits seront disponibles.</p></div>
      <ul className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">{cats.map((c) => <li key={c} className="flex aspect-[4/3] items-center justify-center rounded-xl border border-dashed border-white/20 text-center text-sm text-white/60">{c}<br /><span className="text-[11px] text-gold">Bientôt</span></li>)}</ul>
    </PageShell>
  );
}
