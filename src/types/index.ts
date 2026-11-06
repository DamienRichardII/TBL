export type Division = "Lightweight" | "Middleweight" | "Heavyweight";

export interface Player {
  slug: string;
  name: string;
  nickname?: string;          // jamais "À confirmer" : absent si non officiel
  number?: number;
  height: string;             // ex. "1,92 m"
  division: Division;
  /** Photo officielle (chemin /img/players/xxx.webp) : placeholder si absent */
  photo?: string;
  champion?: boolean;
  /** Bilan TBL confirmé uniquement (jamais de 0-0 par défaut) */
  tblRecord?: { wins: number; losses: number };
  /** Bilan hors TBL (Top Hoops…) : affiché à part, jamais dans le classement TBL */
  otherRecord?: { source: string; wins: number; losses: number };
  /** IDs YouTube de ses performances */
  videos?: string[];
  note?: string;
}

export interface Match {
  game: number;
  label: string;              // Main event, Tryout…
  division: Division;
  title?: boolean;
  tryout?: boolean;
  a: string;                  // slug joueur
  b: string;
  poster: string;
  posterAlt: string;
  /** Résultat : renseigné après l'événement */
  result?: { winner: string; detail?: string };
}

export interface TblEvent {
  slug: string;
  name: string;
  subtitle?: string;
  tags: ("1vs1" | "TBL événements" | "Show" | "Passés")[];
  status: "À venir" | "Passé";
  dateLabel: string;
  time?: string;
  city?: string;
  venue?: string;
  access?: string;
  image: string;
  href: string;
}

export interface RankEntry { slug: string; wins: number; losses: number; champion?: boolean }

/** Un match officiel 1v1 d'un joueur (TBL ou autre ligue officielle comme Top Hoops). */
export interface MatchLine { vs: string; vsSlug?: string; result: "V" | "D"; platform: "TBL" | "Top Hoops"; score?: string }
