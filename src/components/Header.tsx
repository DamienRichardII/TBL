"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Home, CalendarDays, BarChart3, Users, Play, Radio, Mail, Youtube } from "lucide-react";
import { Logo } from "./Logo";
import { Socials } from "./Socials";
import { nav, RESERVATION_HREF, YOUTUBE_URL } from "@/data/site";

const icons = [Home, CalendarDays, BarChart3, Users, Play, Radio, Mail];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
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
      <header className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${scrolled ? "border-b border-line bg-ink/90 backdrop-blur-md" : "bg-gradient-to-b from-ink/90 to-ink/30 backdrop-blur-[2px]"}`}>
        <div className="mx-auto flex h-16 max-w-page items-center justify-between px-4 lg:h-[72px] lg:px-6">
          <button className="lg:hidden" aria-label="Ouvrir le menu" aria-expanded={open} onClick={() => setOpen(true)}><Menu size={26} /></button>
          <Link href="/" aria-label="TBL – Accueil" className="hidden items-center gap-3 lg:flex">
            <Logo height={46} priority />
            <span className="title hidden text-[17px] tracking-[0.12em] xl:inline">The Ballin League</span>
          </Link>
          <Link href="/" aria-label="TBL – Accueil" className="absolute left-1/2 -translate-x-1/2 lg:hidden"><Logo height={38} priority /></Link>
          <nav aria-label="Navigation principale" className="hidden items-center gap-1.5 lg:flex">
            {nav.map((n, i) => { const Icon = icons[i]; const on = active(n.href); return (
              <Link key={n.href} href={n.href} aria-current={on ? "page" : undefined}
                className={`flex min-w-[68px] flex-col items-center gap-1 rounded-xl border px-2.5 py-2 text-[10px] font-semibold uppercase tracking-wider transition xl:min-w-[78px] xl:px-3 ${on ? "border-gold bg-gold/10 text-gold" : "border-white/10 text-white/80 hover:border-gold/50 hover:text-white"}`}>
                <Icon size={20} strokeWidth={1.6} className="text-gold" />{n.label}
              </Link>); })}
          </nav>
          <div className="flex items-center gap-3">
            <Socials className="hidden 2xl:flex" />
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-yt hidden !px-4 !py-2.5 lg:inline-flex gap-2"><Youtube size={16} />YouTube</a>
            <Link href={RESERVATION_HREF} className="btn btn-gold !px-4 !py-2.5 text-[11px] lg:!px-5">Réserver</Link>
          </div>
        </div>
      </header>

      {open && (
        <div role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-50 flex flex-col bg-ink px-8 pb-10 pt-5 lg:hidden">
          <button className="ml-auto" aria-label="Fermer le menu" onClick={() => setOpen(false)}><X size={26} /></button>
          <div className="mt-2 flex justify-center"><Logo height={84} /></div>
          <nav aria-label="Menu mobile" className="mt-8 flex flex-1 flex-col gap-5">
            {nav.map((n, i) => { const Icon = icons[i]; return (
              <Link key={n.href} href={n.href} className={`flex items-center gap-4 text-[15px] ${active(n.href) ? "text-gold" : "text-white"}`}>
                <Icon size={18} strokeWidth={1.6} /> {n.label}
              </Link>); })}
          </nav>
          <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-yt mb-3 w-full gap-2"><Youtube size={18} />Notre chaîne YouTube</a>
          <Link href="/evenements" className="btn btn-light w-full">Voir les événements</Link>
          <Link href={RESERVATION_HREF} className="btn btn-gold mt-3 w-full">Réserver ma place</Link>
          <Socials size={22} className="mt-8 justify-center gap-8" />
        </div>
      )}
    </>
  );
}
