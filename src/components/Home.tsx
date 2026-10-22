import Image from "next/image";
import Link from "next/link";
import { Trophy, Users, BarChart3, Play, MapPin, Crown, Dribbble, Calendar, Ticket, Mail } from "lucide-react";
import { Logo } from "./Logo";
import { Reveal } from "./Reveal";
import { IMG } from "@/lib/assets";
import { RESERVATION_HREF } from "@/data/site";

const shortcuts = [
  { Icon: Dribbble, label: "1 contre 1", href: "/a-propos" },
  { Icon: Trophy, label: "Événements", href: "/evenements" },
  { Icon: Play, label: "Live YouTube", href: "/videos" },
  { Icon: Users, label: "Joueurs", href: "/joueurs" },
  { Icon: BarChart3, label: "Classement", href: "/classement" },
  { Icon: Crown, label: "Cash Prize", href: "/a-propos" },
  { Icon: MapPin, label: "Orléans", href: "/evenements/tbl-02-the-throne" },
];
const reasons = [
  { Icon: Dribbble, t: "Matchs 1v1 structurés" },
  { Icon: BarChart3, t: "Classements par division" },
  { Icon: Ticket, t: "TBL 02 gratuit sur réservation" },
  { Icon: Play, t: "Live pour les événements futurs" },
  { Icon: Mail, t: "Contact médias et partenaires" },
];

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[640px] items-end justify-center overflow-hidden bg-ink pb-14 pt-28 lg:h-auto lg:flex-1 lg:pb-16">
      <div className="absolute inset-0 -z-10 grid grid-cols-1 lg:grid-cols-2">
        <div className="relative"><Image src={IMG.hero.left} alt="" fill priority sizes="(min-width:1024px) 50vw, 100vw" className="object-cover object-[50%_30%] grayscale contrast-125" /></div>
        <div className="relative hidden lg:block"><Image src={IMG.hero.right} alt="" fill priority sizes="50vw" className="object-cover object-[50%_30%] grayscale contrast-125" /></div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/70" />
      </div>
      <div className="flex flex-col items-center text-center">
        <h1 className="sr-only">TBL — The Ballin League, basketball 1v1</h1>
        <Logo height={300} priority className="max-h-[38vh] w-auto lg:max-h-none" />
        <p className="title mt-4 text-3xl tracking-[0.1em] lg:text-5xl">The Ballin League</p>
        <div className="mt-9 flex w-full max-w-[320px] flex-col gap-3 lg:max-w-none lg:flex-row lg:justify-center">
          <Link href="/evenements" className="btn btn-light lg:min-w-[250px] lg:!py-4">Voir les événements</Link>
          <Link href={RESERVATION_HREF} className="btn btn-ghost lg:min-w-[250px] lg:!py-4">Réserver ma place</Link>
        </div>
      </div>
    </section>
  );
}

export function Shortcuts() {
  return (
    <section aria-label="Raccourcis" className="border-y border-line bg-ink">
      <ul className="mx-auto grid max-w-page grid-cols-4 gap-y-6 px-4 py-8 lg:grid-cols-7 lg:px-6">
        {shortcuts.map(({ Icon, label, href }) => (
          <li key={label}><Link href={href} className="flex flex-col items-center gap-3 text-[12px] text-white/90 transition hover:text-gold"><Icon size={30} strokeWidth={1.4} />{label}</Link></li>
        ))}
      </ul>
    </section>
  );
}

export function NextEvent() {
  return (
    <section className="bg-ink py-12 lg:py-16">
      <div className="mx-auto max-w-page px-4 lg:px-6">
        <h2 className="title text-3xl lg:text-4xl">Prochain événement</h2>
        <div className="mt-6 grid overflow-hidden rounded-2xl border border-line bg-neutral-950 lg:grid-cols-[1.1fr_1fr]">
          <div className="flex flex-col justify-center gap-5 p-6 lg:p-10">
            <p className="title inline-block self-start border border-white/70 px-4 py-2 text-3xl lg:text-5xl">TBL 02 — The Throne</p>
            <ul className="space-y-3 text-[15px]">
              <li className="flex items-center gap-3"><Calendar size={18} className="text-gold" /> Samedi 19 décembre 2026 · 18 h 00</li>
              <li className="flex items-start gap-3"><MapPin size={18} className="mt-0.5 shrink-0 text-gold" /><span>Orléans · gymnase Victor Fouillade <span className="text-white/50">(à confirmer)</span></span></li>
              <li className="flex items-center gap-3"><Ticket size={18} className="text-gold" /> Accès gratuit, sur réservation en ligne</li>
            </ul>
            <p className="text-sm text-white/65">8 matchs, 16 joueurs, 3 divisions. Un billet réservé est nécessaire pour entrer.</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href={RESERVATION_HREF} className="btn btn-light">Réserver ma place</Link>
              <Link href="/evenements/tbl-02-the-throne" className="btn btn-ghost">Voir les détails</Link>
            </div>
          </div>
          <div className="relative min-h-[420px] lg:min-h-[560px]">
            <Image src={IMG.posters.group} alt="Affiche TBL 02 — les seize joueurs de la soirée" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
            <div className="absolute right-4 top-4 border border-white/80 bg-ink/80 px-3 py-2 text-center"><span className="title block text-2xl leading-none">19</span><span className="title block text-xl leading-none">DÉC</span><span className="title block text-sm leading-tight">2026</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Banner() {
  return (
    <section className="relative isolate overflow-hidden py-20 text-center">
      <Image src={IMG.banner} alt="" fill sizes="100vw" className="-z-10 object-cover grayscale" />
      <div className="absolute inset-0 -z-10 bg-ink/75" />
      <Reveal>
        <h2 className="title text-3xl leading-tight lg:text-5xl">Une plateforme<br />pour le basketball 1vs1</h2>
        <Link href="/a-propos" className="btn btn-light mt-8 lg:min-w-[280px]">Découvrir la ligue</Link>
      </Reveal>
    </section>
  );
}

export function Reasons() {
  return (
    <section className="bg-bone text-ink">
      <ul className="mx-auto grid max-w-page grid-cols-2 gap-8 px-4 py-12 lg:grid-cols-5 lg:px-6">
        {reasons.map(({ Icon, t }) => (
          <li key={t} className="flex flex-col items-center gap-3 text-center text-[13px] font-medium"><Icon size={34} strokeWidth={1.3} />{t}</li>
        ))}
      </ul>
    </section>
  );
}
