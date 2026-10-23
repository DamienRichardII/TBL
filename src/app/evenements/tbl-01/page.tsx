import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageShell, PageTitle } from "@/components/PageHero";
import { Notice } from "@/components/DemoNotice";
import { IMG } from "@/lib/assets";
export const metadata: Metadata = { title: "TBL 01" };
export default function Page() {
  return (
    <PageShell>
      <Link href="/evenements" className="text-[13px] text-white/60 hover:text-white">← Tous les événements</Link>
      <div className="mt-4"><PageTitle sub="Première édition de The Ballin League.">TBL 01</PageTitle></div>
      <div className="mb-8 max-w-2xl"><Notice>Date, lieu et résultats détaillés de TBL 01 à compléter après validation par TBL. Les photos ci-dessous sont issues des événements TBL précédents (attribution à confirmer).</Notice></div>
      <ul className="columns-2 gap-3 lg:columns-4 [&>li]:mb-3">
        {IMG.gallery.slice(0, 20).map((src, i) => (
          <li key={src} className="overflow-hidden rounded-xl"><Image src={src} alt={`Photo TBL ${i + 1}`} width={600} height={800} loading="lazy" sizes="(min-width:1024px) 25vw, 50vw" className="h-auto w-full" /></li>
        ))}
      </ul>
    </PageShell>
  );
}
