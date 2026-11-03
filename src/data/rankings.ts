import type { RankEntry } from "@/types";
/**
 * Classement général TBL — Saison 2026, dans l'ordre (1er en premier).
 * Tri par ratio victoires / (victoires + défaites) décroissant ; égalité : plus de victoires, puis ordre du PDF TBL d'octobre 2026.
 * Joueurs sans match (0 V / 0 D) : placés entre les ratios positifs et les joueurs à 0 victoire.
 * Résultats TBL uniquement (jamais Top Hoops). Toute modification est à valider par l'équipe TBL.
 */
export const rankings: RankEntry[] = [
  { slug: "kieran", wins: 1, losses: 0 },
  { slug: "adama", wins: 1, losses: 0 },
  { slug: "samuel-marwakal", wins: 3, losses: 1 },
  { slug: "kenny-brown", wins: 1, losses: 1 },
  { slug: "leian", wins: 1, losses: 1 },
  { slug: "bryan-pamba", wins: 0, losses: 0 },
  { slug: "yanis", wins: 0, losses: 0 },
  { slug: "curtis", wins: 0, losses: 0 },
  { slug: "imran", wins: 0, losses: 0 },
  { slug: "desmo", wins: 0, losses: 0 },
  { slug: "dani", wins: 0, losses: 0 },
  { slug: "matthias", wins: 0, losses: 0 },
  { slug: "tiegbe-bamba", wins: 0, losses: 1 },
  { slug: "chris", wins: 0, losses: 1 },
  { slug: "aurelien", wins: 0, losses: 1 },
  { slug: "sebastien", wins: 0, losses: 1 },
];
