import Image from "next/image";
import { existsSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import { Users, BarChart3, Play, MapPin, Dribbble, Calendar, CalendarDays, Ticket, Mail, Youtube, ArrowRight, Swords, CirclePlay, Crown } from "lucide-react";
import { Reveal } from "./Reveal";
import { Countdown } from "./Countdown";
import { YouTubeCTA } from "./YouTubeCTA";
import { YouTubeShowcase } from "./YouTubeShowcase";
import { Logo } from "./Logo";
import { MatchCarousel } from "./MatchCarousel";
import { RecordLine } from "./RecordBadge";
import { IMG } from "@/lib/assets";
import { getLatestVideos, kindOf } from "@/lib/youtube";
import { getSiteData } from "@/lib/db";
import { EVENT_START, RESERVATION_HREF, TICKETING_URL, YOUTUBE_URL, YOUTUBE_SUBSCRIBE_URL } from "@/data/site";

const reservation = TICKETING_URL ? { href: TICKETING_URL, external: true } : { href: RESERVATION_HREF, external: false };
export function ReserveButton({ className = "", icons = false }: { className?: string; icons?: boolean }) {
  const inner = <>{icons && <Ticket size={18} />}Réserver ma place{icons && <ArrowRight size={16} />}</>;
  return reservation.external
    ? <a href={reservation.href} target="_blank" rel="noopener noreferrer" className={`btn btn-gold ${className}`}>{inner}</a>
    : <Link href={reservation.href} className={`btn btn-gold ${className}`}>{inner}</Link>;
}

const reasons = [
  { Icon: Dribbble, t: "Matchs 1v1 structurés" },
  { Icon: BarChart3, t: "Classements par division" },
  { Icon: Ticket, t: "TBL 02 gratuit sur réservation" },
  { Icon: Play, t: "Live pour les événements futurs" },
  { Icon: Mail, t: "Contact médias et partenaires" },
];

const stats = [{ n: "8", t: "Matchs" }, { n: "16", t: "Joueurs" }, { n: "3", t: "Divisions" }, { n: "1", t: "Mouvement" }];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink pt-24 lg:flex lg:min-h-[min(100svh,920px)] lg:items-center lg:pt-[72px]">
      <div aria-hidden className="absolute inset-y-0 right-0 -z-10 hidden w-[74%] lg:block">
        <Image src="/img/hero-bg.webp" alt="" fill priority sizes="74vw" className="object-cover object-[50%_22%] saturate-[1.2] contrast-[1.05]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#08090B_0%,rgba(8,9,11,.7)_14%,rgba(8,9,11,.2)_36%,transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_70%_at_75%_40%,rgba(201,161,92,.22),transparent)] mix-blend-screen" />
        <div className="absolute inset-x-0 bottom-0 h-1/6 bg-gradient-to-t from-ink to-transparent" />
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-ink/70 to-transparent" />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <Image src="/img/dust-left.webp" alt="" width={700} height={1100} className="absolute left-0 top-0 h-full w-auto max-w-[45vw] object-cover object-left opacity-80 [mask-image:linear-gradient(to_right,black_40%,transparent)]" />
        <Image src="/img/dust-right.webp" alt="" width={700} height={1100} className="absolute right-0 top-0 hidden h-full w-auto max-w-[30vw] object-cover object-right opacity-90 lg:block" />
        <Crown className="absolute right-[4%] top-[34%] hidden text-gold/70 xl:block" size={64} strokeWidth={1} />
      </div>
      <div className="mx-auto w-full max-w-page px-4 lg:px-6">
        <div className="relative pb-6 pt-4 lg:max-w-[64%] lg:py-10 lg:pl-6">
          <span aria-hidden className="absolute bottom-6 left-0 top-4 hidden w-[3px] bg-[linear-gradient(to_bottom,#E8CB8B,#C9A15C_60%,transparent)] lg:block lg:bottom-10 lg:top-10" />
          <h1 className="sr-only">TBL — The Ballin League, basketball 1v1</h1>
          <p className="title gold-text text-[12px] tracking-[0.4em] lg:text-sm">The Ballin League</p>
          <p aria-hidden className="title mt-3 font-bold text-[clamp(3.25rem,13vw,5.25rem)] leading-[0.9] drop-shadow-[0_4px_30px_rgba(0,0,0,.6)] lg:whitespace-nowrap lg:text-[clamp(3.5rem,5.2vw,6.25rem)]">More than<br />a game.<span className="gold-text block">A movement.</span></p>
          <p className="title mt-4 text-[12px] tracking-[0.3em] text-white/85 lg:text-base">La ligue 1v1 de référence en France</p>
          <div className="mt-5 flex max-w-xl flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-gold/60 lg:max-w-[40rem] lg:flex-nowrap bg-black/45 px-4 py-3 backdrop-blur-sm">
            <span className="title text-3xl lg:text-4xl">TBL 02</span>
            <span aria-hidden className="hidden h-9 w-px bg-white/25 sm:block" />
            <span className="relative"><Crown aria-hidden size={16} className="absolute -top-3.5 left-1 text-gold" /><span className="title gold-text pr-2 text-2xl italic lg:text-3xl">The Throne</span></span>
            <span aria-hidden className="hidden h-9 w-px bg-white/25 sm:block" />
            <span className="text-[11px] font-semibold uppercase leading-snug tracking-wide text-white/90 lg:text-[12px]">
              <span className="flex items-center gap-1.5"><Calendar size={13} className="text-gold" />19 décembre 2026</span>
              <span className="mt-0.5 flex items-center gap-1.5"><MapPin size={13} className="text-gold" />Gymnase Victor Fouillade · Orléans</span>
            </span>
          </div>
          <ul className="mt-3 grid max-w-xl grid-cols-4 overflow-hidden rounded-xl border border-white/15 bg-black/35 backdrop-blur-sm">
            {stats.map((x) => <li key={x.t} className="border-r border-white/10 px-2 py-2.5 text-center last:border-r-0"><span className="title gold-text block text-2xl lg:text-3xl">{x.n}</span><span className="block text-[9px] font-semibold uppercase tracking-widest text-white/65 lg:text-[10px]">{x.t}</span></li>)}
          </ul>
          <div className="mt-5 flex max-w-xl flex-col gap-3 sm:flex-row">
            <ReserveButton icons className="!py-4 sm:flex-1 shadow-[0_10px_40px_-10px_rgba(201,161,92,.7)]" />
            <Link href="/evenements/tbl-02-the-throne" className="btn btn-ghost !py-4 sm:flex-1"><CirclePlay size={18} />Découvrir TBL 02 <ArrowRight size={16} /></Link>
          </div>
        </div>
      </div>
      <div className="relative mx-4 mb-8 h-[min(100vw,440px)] overflow-hidden rounded-2xl lg:hidden">
        <Image src="/img/hero-bg.webp" alt="Samuel, joueur TBL" fill priority sizes="100vw" className="object-cover object-[50%_28%] saturate-[1.2]" />
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-ink to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-ink to-transparent" />
      </div>
    </section>
  );
}

export function NextEvent() {
  const side = "absolute top-0 h-full w-[200%] max-w-none";
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <div className="mx-auto grid max-w-[1600px] grid-cols-2 lg:grid-cols-[1fr_minmax(0,1.15fr)_1fr]">
        <div className="relative aspect-[4/5] overflow-hidden lg:order-1 lg:aspect-auto lg:min-h-[560px]">
          <div className={`${side} left-0`}><Image src={IMG.posters.samuelKeran} alt="Keran — TBL 02" fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover object-[50%_0%] lg:object-[50%_9%]" /></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-ink max-lg:hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent lg:hidden" />
        </div>
        <div className="relative aspect-[4/5] overflow-hidden lg:order-3 lg:aspect-auto lg:min-h-[560px]">
          <div className={`${side} right-0`}><Image src={IMG.posters.samuelKeran} alt="Samuel — TBL 02" fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover object-[50%_0%] lg:object-[50%_9%]" /></div>
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-ink max-lg:hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent lg:hidden" />
        </div>
        <div className="relative z-10 col-span-2 flex flex-col items-center justify-center px-4 pb-14 pt-2 text-center lg:order-2 lg:col-span-1 lg:px-0 lg:py-16">
          <div className="gold-glow pointer-events-none absolute inset-0 -z-10 opacity-70" />
          <p className="title gold-text text-sm tracking-[0.35em]">Prochain événement</p>
          <h2 className="title mt-3 text-6xl leading-none sm:text-7xl lg:text-8xl">TBL 02<span className="gold-text mt-1 block text-4xl italic sm:text-5xl lg:text-6xl">The Throne</span></h2>
          <p className="mt-5 inline-block border-y border-gold/60 px-5 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-gold">Middleweight title</p>
          <p className="title mt-5 text-3xl text-white lg:text-4xl">Keran <span className="gold-text">vs</span> Samuel</p>
          <ul className="mt-5 space-y-2 text-[14px] text-white/85">
            <li className="flex items-center justify-center gap-2"><Calendar size={16} className="text-gold" /> Samedi 19 décembre 2026</li>
            <li className="flex items-center justify-center gap-2"><MapPin size={16} className="shrink-0 text-gold" /> Gymnase Victor Fouillade · Orléans</li>
          </ul>
          <Countdown target={EVENT_START} className="mt-6 justify-center" />
          <div className="mt-7 flex w-full max-w-sm flex-col gap-3">
            <ReserveButton />
            <Link href="/evenements/tbl-02-the-throne" className="btn btn-ghost">Voir tous les matchs <ArrowRight size={16} /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export async function FeaturedMatches() {
  const { matches, players } = await getSiteData();
  const nm = (slug: string) => players.find((p) => p.slug === slug)?.name;
  const items = matches.filter((m) => nm(m.a) && nm(m.b)).sort((x, y) => y.game - x.game)
    .map((m) => ({ game: m.game, label: m.label, poster: m.poster, alt: m.posterAlt, a: nm(m.a)!, b: nm(m.b)!, main: m.game === 8 }));
  return (
    <section className="relative bg-ink pb-16 pt-6 lg:pb-24">
      <div className="mx-auto max-w-page px-4 lg:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div><p className="title gold-text text-sm tracking-[0.3em]">TBL 02 — The Throne</p><h2 className="title mt-2 text-4xl lg:text-6xl">La carte des 8 matchs</h2></div>
          <Link href="/evenements/tbl-02-the-throne" className="hidden items-center gap-2 text-sm text-white/80 hover:text-gold sm:flex">Voir tous les matchs <ArrowRight size={16} /></Link>
        </div>
        <Reveal><MatchCarousel items={items} /></Reveal>
        <Link href="/evenements/tbl-02-the-throne" className="btn btn-ghost mt-8 w-full sm:hidden">Voir tous les matchs</Link>
      </div>
    </section>
  );
}

export async function WatchSection() {
  const { videoOverrides } = await getSiteData();
  const vids = (await getLatestVideos(30)).filter((v) => !videoOverrides[v.id]?.hidden).map((v) => ({ ...v, kind: kindOf(v.title, videoOverrides[v.id]?.kind) }));
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ink via-neutral-950 to-ink py-14 lg:py-24">
      <div className="mx-auto max-w-page px-4 lg:px-6">
        <p className="title text-sm tracking-[0.3em] text-[#ff4d4d]">YouTube</p>
        <h2 className="title mt-2 text-4xl lg:text-6xl">Regardez nos vidéos YouTube</h2>
        <p className="mt-3 max-w-2xl text-white/70">Retrouve les matchs, highlights et teasers de TBL directement ici, et abonne-toi pour ne rien rater.</p>
        <div className="mt-8"><YouTubeShowcase videos={vids} subscribeUrl={YOUTUBE_SUBSCRIBE_URL} channelUrl={YOUTUBE_URL} /></div>
      </div>
    </section>
  );
}

const divisions = [
  { slug: "lightweight", name: "Lightweight", range: "1,70 m à 1,84 m", cat: "Titre officiel TBL" },
  { slug: "middleweight", name: "Middleweight", range: "1,85 m à 1,92 m", cat: "Titre officiel TBL" },
  { slug: "heavyweight", name: "Heavyweight", range: "1,93 m et plus", cat: "Titre officiel TBL" },
];
export function Divisions() {
  const belt = (slug: string) => existsSync(path.join(process.cwd(), "public/img/belts", `${slug}.webp`)) ? `/img/belts/${slug}.webp` : null;
  return (
    <section className="relative isolate overflow-hidden bg-ink py-16 lg:py-28">
      <Image src="/img/side-left.webp" alt="" width={700} height={819} aria-hidden className="pointer-events-none absolute -left-32 bottom-0 -z-10 hidden h-[82%] w-auto opacity-30 [mask-image:linear-gradient(to_right,black_35%,transparent)] xl:-left-16 lg:block" />
      <Image src="/img/side-right.webp" alt="" width={385} height={950} aria-hidden className="pointer-events-none absolute bottom-0 right-[2%] -z-10 hidden h-[88%] w-auto opacity-45 [mask-image:linear-gradient(to_bottom,black_55%,transparent)] xl:right-[5%] lg:block" />
      <div className="gold-glow pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-2/3 opacity-60" />
      <div className="mx-auto max-w-page px-4 text-center lg:px-6">
        <p className="title gold-text text-sm tracking-[0.3em]">Les titres TBL</p>
        <h2 className="title mt-2 text-4xl lg:text-6xl">Trois divisions, trois titres</h2>
        <Reveal>
          <ul className="mx-auto mt-10 grid max-w-4xl gap-8 sm:grid-cols-3 lg:gap-10">
            {divisions.map((d) => { const b = belt(d.slug); return (
              <li key={d.slug} className="flex flex-col items-center">
                <div className="relative flex h-40 w-full items-center justify-center">
                  {b ? <Image src={b} alt={`Ceinture ${d.name}`} fill sizes="280px" className="object-contain drop-shadow-[0_10px_30px_rgba(201,161,92,.35)]" />
                    : <div className="flex h-36 w-36 items-center justify-center rounded-full border border-gold/50 bg-[radial-gradient(closest-side,rgba(201,161,92,.25),transparent)] shadow-[0_0_60px_-10px_rgba(201,161,92,.6)]"><Logo height={84} /></div>}
                </div>
                <h3 className="title gold-text mt-4 text-3xl lg:text-4xl">{d.name}</h3>
                <p className="mt-1 text-[15px] text-white">{d.range}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/55">{d.cat}</p>
              </li>); })}
          </ul>
        </Reveal>
        <Link href="/classement" className="btn btn-gold mt-12 lg:min-w-[280px]">Voir le classement <ArrowRight size={16} /></Link>
      </div>
    </section>
  );
}

export function Banner() {
  return (
    <section className="relative isolate overflow-hidden py-24 text-center lg:py-40">
      <Image src={IMG.banner} alt="" fill sizes="100vw" className="-z-10 object-cover object-[50%_22%] grayscale" />
      <div className="absolute inset-0 -z-10 bg-ink/70" />
      <div className="gold-glow absolute inset-x-0 bottom-0 -z-10 h-full" />
      <Reveal>
        <h2 className="title text-4xl leading-tight lg:text-7xl">Une plateforme<br /><span className="gold-text">pour le basketball 1vs1</span></h2>
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
