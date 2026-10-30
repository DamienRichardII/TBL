import { cache } from "react";
import type { Division, Match, Player, RankEntry, TblEvent } from "@/types";
import { players as staticPlayers } from "@/data/players";
import { matches as staticMatches } from "@/data/matches";
import { events as staticEvents } from "@/data/events";
import { rankings as staticRankings } from "@/data/rankings";
import type { VideoKind } from "@/lib/youtube";

/** Données du site : lues dans Supabase (modifiables depuis /admin), avec repli sur les données du code si la base est indisponible. */
export interface VideoOverride { kind: VideoKind; hidden: boolean }
export interface SiteData {
  players: Player[];
  matches: Match[];
  events: TblEvent[];
  rankings: Record<Division, RankEntry[]>;
  videoOverrides: Record<string, VideoOverride>;
}

const URL_ = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function rest<T>(table: string, query = "select=*"): Promise<T[] | null> {
  if (!URL_ || !KEY) return null;
  try {
    const res = await fetch(`${URL_}/rest/v1/${table}?${query}`, { headers: { apikey: KEY }, next: { revalidate: 60 } });
    if (!res.ok) return null;
    return (await res.json()) as T[];
  } catch {
    return null;
  }
}

interface PlayerRow { slug: string; name: string; nickname: string | null; number: number | null; height: string; division: Division; photo: string | null; champion: boolean; wins: number | null; losses: number | null; other_source: string | null; other_wins: number | null; other_losses: number | null; videos: string[] | null; note: string | null }
interface MatchRow { event_slug: string; game: number; label: string; division: Division; title: boolean; tryout: boolean; player_a: string; player_b: string; poster: string; poster_alt: string; winner: string | null; result_detail: string | null }
interface EventRow { slug: string; name: string; subtitle: string | null; status: "À venir" | "Passé"; date_label: string; time: string | null; city: string | null; venue: string | null; access: string | null; image: string }
interface RankRow { division: Division; player_slug: string; position: number; wins: number; losses: number; champion: boolean }
interface VideoRow { video_id: string; kind: VideoKind; hidden: boolean }

const toPlayer = (r: PlayerRow): Player => ({
  slug: r.slug, name: r.name, height: r.height, division: r.division,
  ...(r.nickname ? { nickname: r.nickname } : {}),
  ...(r.number !== null ? { number: r.number } : {}),
  ...(r.photo ? { photo: r.photo } : {}),
  ...(r.champion ? { champion: true } : {}),
  ...(r.wins !== null && r.losses !== null ? { tblRecord: { wins: r.wins, losses: r.losses } } : {}),
  ...(r.other_source && r.other_wins !== null && r.other_losses !== null ? { otherRecord: { source: r.other_source, wins: r.other_wins, losses: r.other_losses } } : {}),
  ...(r.videos?.length ? { videos: r.videos } : {}),
  ...(r.note ? { note: r.note } : {}),
});
const toMatch = (r: MatchRow): Match => ({
  game: r.game, label: r.label, division: r.division, a: r.player_a, b: r.player_b, poster: r.poster, posterAlt: r.poster_alt,
  ...(r.title ? { title: true } : {}), ...(r.tryout ? { tryout: true } : {}),
  ...(r.winner ? { result: { winner: r.winner, ...(r.result_detail ? { detail: r.result_detail } : {}) } } : {}),
});
const toEvent = (r: EventRow): TblEvent => ({
  slug: r.slug, name: r.name, status: r.status, dateLabel: r.date_label, image: r.image, href: `/evenements/${r.slug}`,
  tags: r.status === "Passé" ? ["1vs1", "Passés"] : ["1vs1"],
  ...(r.subtitle ? { subtitle: r.subtitle } : {}), ...(r.time ? { time: r.time } : {}), ...(r.city ? { city: r.city } : {}),
  ...(r.venue ? { venue: r.venue } : {}), ...(r.access ? { access: r.access } : {}),
});

export const getSiteData = cache(async (): Promise<SiteData> => {
  const [p, m, e, r, v] = await Promise.all([
    rest<PlayerRow>("players", "select=*&order=sort.asc"),
    rest<MatchRow>("matches", "select=*&event_slug=eq.tbl-02-the-throne&order=game.desc"),
    rest<EventRow>("events", "select=*&order=sort.asc"),
    rest<RankRow>("rankings", "select=*&order=position.asc"),
    rest<VideoRow>("video_overrides"),
  ]);
  const base: SiteData = {
    players: staticPlayers, matches: staticMatches, events: staticEvents, rankings: staticRankings,
    videoOverrides: Object.fromEntries((v ?? []).map((x) => [x.video_id, { kind: x.kind, hidden: x.hidden }])),
  };
  // La base fait foi dès qu'elle contient des joueurs ; sinon on garde les données du code.
  if (!p || p.length === 0) return base;
  const rankings: Record<Division, RankEntry[]> = { Lightweight: [], Middleweight: [], Heavyweight: [] };
  for (const x of r ?? []) rankings[x.division].push({ slug: x.player_slug, wins: x.wins, losses: x.losses, ...(x.champion ? { champion: true } : {}) });
  return {
    ...base,
    players: p.map(toPlayer),
    matches: m && m.length ? m.map(toMatch) : staticMatches,
    events: e && e.length ? e.map(toEvent) : staticEvents,
    rankings: r ? rankings : staticRankings,
  };
});
