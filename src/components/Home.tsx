import Image from "next/image";
import Link from "next/link";
import { Trophy, Users, BarChart3, Play, MapPin, Crown, Dribbble, Calendar, Ticket, Mail, Youtube, ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { Countdown } from "./Countdown";
import { YouTubeCTA } from "./YouTubeCTA";
import { VideoGrid } from "./VideoGrid";
import { RecordLine } from "./RecordBadge";
import { IMG } from "@/lib/assets";
import { getLatestVideos, kindOf } from "@/lib/youtube";
import { getPlayer } from "@/data/players";
import { matches } from "@/data/matches";
import { EVENT_START, RESERVATION_HREF, TICKETING_URL, YOUTUBE_URL } from "@/data/site";

const reservation = TICKETING_URL ? { href: TICKETING_URL, external: true } : { href: RESERVATION_HREF, external: false };
export function ReserveButton({ className = "" }: { className?: string }) {
  return reservation.external
    ? <a href={reservation.href} target="_blank" rel="noopener noreferrer" className={`btn btn-gold ${className}`}>Réserver ma place</a>
    : <Link href={reservation.href} className={`btn btn-gold ${className}`}>Réserver ma place</Link>;
}

const shortcuts = [
  { Icon: Dribbble, label: "1 contre 1", href: "/a-propos", ext: false },
  { Icon: Trophy, label: "Événements", href: "/evenements", ext: false },
  { Icon: Youtube, label: "YouTube", href: YOUTUBE_URL, ext: true },
  { Icon: Users, label: "Joueurs", href: "/joueurs", ext: false },
  { Icon: BarChart3, label: "Classement", href: "/classement", ext: false },
  { Icon: Crown, label: "Titres", href: "/a-propos", ext: false },
  { Icon: MapPin, label: "Orléans", href: "/evenements/tbl-02-the-throne", ext: false },
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
    <section className="relative isolate flex min-h-[640px] items-end justify-center overflow-hidden bg-ink pb-10 pt-24 lg:h-auto lg:flex-1 lg:pb-10">
      <div className="absolute inset-0 -z-10 grid grid-cols-1 lg:grid-cols-2">
        <div className="relative"><Image src={IMG.hero.left} alt="" fill priority sizes="(min-width:1024px) 50vw, 100vw" className="object-cover object-[50%_30%] grayscale contrast-125" /></div>
        <div className="relative hidden lg:block"><Image src={IMG.hero.right} alt="" fill priority sizes="50vw" className="object-cover object-[50%_30%] grayscale contrast-125" /></div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/75" />
        <div className="gold-glow absolute inset-x-0 bottom-0 h-1/2 opacity-80" />
      </div>
      <div className="flex w-full flex-col items-center px-4 text-center">
        <h1 className="sr-only">TBL — The Ballin League, basketball 1v1</h1>
        <Image src={IMG.logo.src} alt="TBL – The Ballin League" width={IMG.logo.w} height={IMG.logo.h} priority className="h-[clamp(150px,27vh,300px)] w-auto" />
        <p className="title mt-3 text-3xl tracking-[0.1em] lg:text-5xl">The Ballin League</p>
        <p className="title gold-text mt-2 text-sm tracking-[0.3em] lg:text-base">More than a game. A movement.</p>
        <div className="mt-6 flex w-full max-w-[340px] flex-col gap-3 lg:max-w-none lg:flex-row lg:justify-center">
          <ReserveButton className="lg:min-w-[250px] lg:!py-3.5" />
          <Link href="/evenements" className="btn btn-ghost lg:min-w-[250px] lg:!py-3.5">Voir les événements</Link>
        </div>
        <YouTubeCTA compact className="mt-3 max-w-[340px] sm:max-w-none" />
      </div>
    </section>
  );
}

export function Shortcuts() {
  return (
    <section aria-label="Raccourcis" className="border-y border-line bg-ink">
      <ul className="mx-auto grid max-w-page grid-cols-4 gap-y-6 px-4 py-6 lg:grid-cols-7 lg:px-6">
        {shortcuts.map(({ Icon, label, href, ext }) => (
          <li key={label}>
            {ext
              ? <a href={href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 text-[12px] text-white/90 transition hover:text-[#ff4d4d]"><Icon size={30} strokeWidth={1.4} className="text-[#FF0000]" />{label}</a>
              : <Link href={href} className="flex flex-col items-center gap-3 text-[12px] text-white/90 transition hover:text-gold"><Icon size={30} strokeWidth={1.4} />{label}</Link>}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function NextEvent() {
  return (
    <section className="relative overflow-hidden bg-ink py-12 lg:py-16">
      <div className="gold-glow pointer-events-none absolute inset-x-0 bottom-0 h-2/3 opacity-60" />
      <div className="relative mx-auto max-w-page px-4 lg:px-6">
        <p className="title gold-text text-sm tracking-[0.3em]">Prochain événement</p>
        <div className="mt-4 grid overflow-hidden rounded-2xl border border-gold/40 bg-neutral-950 shadow-[0_0_80px_-30px_rgba(201,161,92,.5)] lg:grid-cols-[1.1fr_1fr]">
          <div className="flex flex-col justify-center gap-5 p-6 lg:p-10">
            <h2 className="title text-5xl sm:text-6xl lg:text-7xl">TBL 02<span className="gold-text block text-3xl sm:text-4xl lg:text-5xl">The Throne</span></h2>
            <div className="gold-rule w-40" />
            <ul className="space-y-3 text-[15px]">
              <li className="flex items-center gap-3"><Calendar size={18} className="text-gold" /> Samedi 19 décembre 2026 · 18 h 00</li>
              <li className="flex items-start gap-3"><MapPin size={18} className="mt-0.5 shrink-0 text-gold" /><span>Orléans · gymnase Victor Fouillade <span className="text-white/50">(à confirmer)</span></span></li>
              <li className="flex items-center gap-3"><Ticket size={18} className="text-gold" /> Accès gratuit, réservation obligatoire</li>
            </ul>
            <Countdown target={EVENT_START} />
            <p className="text-sm text-white/65">8 matchs, 16 joueurs, 3 divisions. Un billet réservé est nécessaire pour entrer.</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ReserveButton />
              <Link href="/evenements/tbl-02-the-throne" className="btn btn-ghost">Voir les détails</Link>
            </div>
          </div>
          <div className="relative min-h-[420px] lg:min-h-[600px]">
            <Image src={IMG.posters.group} alt="Affiche TBL 02 — les seize joueurs de la soirée" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
            <div className="absolute right-4 top-4 border border-gold/80 bg-ink/80 px-3 py-2 text-center"><span className="title block text-2xl leading-none">19</span><span className="title gold-text block text-xl leading-none">DÉC</span><span className="title block text-sm leading-tight">2026</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

const featured = [8, 6, 7, 5];
export function FeaturedMatches() {
  const list = featured.map((g) => matches.find((m) => m.game === g)!).filter(Boolean);
  return (
    <section className="bg-ink py-12 lg:py-16">
      <div className="mx-auto max-w-page px-4 lg:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div><p className="title gold-text text-sm tracking-[0.3em]">TBL 02 — The Throne</p><h2 className="title mt-2 text-3xl lg:text-5xl">Les matchs à ne pas manquer</h2></div>
          <Link href="/evenements/tbl-02-the-throne" className="hidden items-center gap-2 text-sm text-white/80 hover:text-gold sm:flex">Voir les 8 matchs <ArrowRight size={16} /></Link>
        </div>
        <Reveal>
          <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {list.map((m) => { const a = getPlayer(m.a)!, b = getPlayer(m.b)!; return (
              <li key={m.game}>
                <Link href="/evenements/tbl-02-the-throne" className="group block overflow-hidden rounded-2xl border border-line bg-neutral-950 transition hover:border-gold/60">
                  <div className="relative aspect-[4/5]"><Image src={m.poster} alt={m.posterAlt} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover transition duration-500 group-hover:scale-105" /></div>
                  <div className="p-3 lg:p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-gold lg:text-[11px]">Game {m.game} · {m.label}</p>
                    <p className="title mt-1 text-base lg:text-xl">{a.name} <span className="text-gold">vs</span> {b.name}</p>
                    <div className="mt-1 hidden text-white/60 lg:block"><RecordLine p={a} /></div>
                  </div>
                </Link>
              </li>); })}
          </ul>
        </Reveal>
        <Link href="/evenements/tbl-02-the-throne" className="btn btn-ghost mt-6 w-full sm:hidden">Voir les 8 matchs</Link>
      </div>
    </section>
  );
}

export async function WatchSection() {
  const vids = (await getLatestVideos(6)).map((v) => ({ ...v, kind: kindOf(v.title) }));
  return (
    <section className="border-t border-line bg-neutral-950 py-12 lg:py-16">
      <div className="mx-auto max-w-page px-4 lg:px-6">
        <p className="title text-sm tracking-[0.3em] text-[#ff4d4d]">YouTube</p>
        <h2 className="title mt-2 text-3xl lg:text-5xl">Regardez nos matchs</h2>
        <p className="mt-3 max-w-2xl text-white/65">Retrouve les matchs, highlights et teasers de TBL directement ici, et abonne-toi pour ne rien rater.</p>
        <div className="mt-6"><VideoGrid videos={vids} limit={6} /></div>
        <YouTubeCTA className="mt-8" />
      </div>
    </section>
  );
}

export function Banner() {
  return (
    <section className="relative isolate overflow-hidden py-20 text-center">
      <Image src={IMG.banner} alt="" fill sizes="100vw" className="-z-10 object-cover grayscale" />
      <div className="absolute inset-0 -z-10 bg-ink/75" />
      <div className="gold-glow absolute inset-x-0 bottom-0 -z-10 h-full" />
      <Reveal>
        <h2 className="title text-3xl leading-tight lg:text-5xl">Une plateforme<br /><span className="gold-text">pour le basketball 1vs1</span></h2>
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
          <li key={t} className="flex flex-col items-center gap-3 text-center text-[13px] font-medium"><Icon size={34} strokeWidth={1.3} className="text-gold-lo" style={{ color: "#9C7430" }} />{t}</li>
        ))}
      </ul>
    </section>
  );
}
