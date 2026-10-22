import Link from "next/link";
import { Logo } from "./Logo";
import { Socials } from "./Socials";
import { nav } from "@/data/site";
export function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto flex max-w-page flex-col items-center gap-6 px-4 py-10 text-center lg:flex-row lg:justify-between lg:px-6 lg:text-left">
        <div className="flex items-center gap-3"><Logo height={44} /><span className="title text-lg tracking-[0.12em]">The Ballin League</span></div>
        <nav aria-label="Pied de page" className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] text-white/70">
          {nav.map((n) => <Link key={n.href} href={n.href} className="hover:text-white">{n.label}</Link>)}
          <Link href="/boutique" className="hover:text-white">Boutique</Link>
        </nav>
        <Socials />
      </div>
      <p className="border-t border-line py-4 text-center text-[11px] text-white/50">© 2026 The Ballin League — Organisation française de basketball 1v1</p>
    </footer>
  );
}
