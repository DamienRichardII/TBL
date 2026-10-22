"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Home, Trophy, BarChart3, Users, Play, Info, Mail } from "lucide-react";
import { Logo } from "./Logo";
import { Socials } from "./Socials";
import { nav, RESERVATION_HREF } from "@/data/site";

const icons = [Home, Trophy, BarChart3, Users, Play, Info, Mail];

export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => { window.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [open]);
  const active = (h: string) => (h === "/" ? path === "/" : path.startsWith(h));

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-40 bg-gradient-to-b from-ink/90 to-ink/30 backdrop-blur-[2px]">
        <div className="mx-auto flex h-16 max-w-page items-center justify-between px-4 lg:h-[72px] lg:px-6">
          <button className="lg:hidden" aria-label="Ouvrir le menu" aria-expanded={open} onClick={() => setOpen(true)}><Menu size={26} /></button>
          <Link href="/" aria-label="TBL – Accueil" className="hidden items-center gap-3 lg:flex">
            <Logo height={46} priority />
            <span className="title text-[17px] tracking-[0.12em]">The Ballin League</span>
          </Link>
          <Link href="/" aria-label="TBL – Accueil" className="absolute left-1/2 -translate-x-1/2 lg:hidden"><Logo height={38} priority /></Link>
          <nav aria-label="Navigation principale" className="hidden items-center gap-6 lg:flex">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} aria-current={active(n.href) ? "page" : undefined}
                className={`border-b pb-0.5 text-[12px] font-medium transition hover:text-white ${active(n.href) ? "border-white text-white" : "border-transparent text-white/80"}`}>{n.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-5">
            <Socials className="" />
            <Link href={RESERVATION_HREF} className="btn btn-light hidden !py-2.5 lg:inline-flex">Billetterie</Link>
          </div>
        </div>
      </header>

      {open && (
        <div role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-50 flex flex-col bg-ink px-8 pb-10 pt-5 lg:hidden">
          <button className="ml-auto" aria-label="Fermer le menu" onClick={() => setOpen(false)}><X size={26} /></button>
          <div className="mt-2 flex justify-center"><Logo height={84} /></div>
          <nav aria-label="Menu mobile" className="mt-10 flex flex-1 flex-col gap-6">
            {nav.map((n, i) => { const Icon = icons[i]; return (
              <Link key={n.href} href={n.href} className={`flex items-center gap-4 text-[15px] ${active(n.href) ? "text-gold" : "text-white"}`}>
                <Icon size={18} strokeWidth={1.6} /> {n.label}
              </Link>); })}
          </nav>
          <Link href="/evenements" className="btn btn-light w-full">Voir les événements</Link>
          <Link href={RESERVATION_HREF} className="btn btn-ghost mt-3 w-full">Réserver ma place</Link>
          <Socials size={22} className="mt-8 justify-center gap-8" />
        </div>
      )}
    </>
  );
}
