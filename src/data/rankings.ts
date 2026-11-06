import type { RankEntry } from "@/types";
/**
 * Classement général TBL — Saison 2026, dans l'ordre (1er en premier), validé par TBL :
 * 1 Samuel (champion), 2 Keran, 3 Kenny, 4 Adama, 5 Sébastien, puis le reste (ratio V/D).
 * Totaux = TBL + Top Hoops (détail dans history.ts). Toute modification est à valider par l'équipe TBL.
 */
export const rankings: RankEntry[] = [
  { slug: "samuel-marwakal", wins: 3, losses: 1 },
  { slug: "kieran", wins: 1, losses: 0 },
  { slug: "kenny-brown", wins: 1, losses: 1 },
  { slug: "adama", wins: 1, losses: 0 },
  { slug: "sebastien", wins: 1, losses: 0 },
  { slug: "clarence", wins: 1, losses: 0 },
  { slug: "desmo", wins: 2, losses: 1 },
  { slug: "leian", wins: 1, losses: 1 },
  { slug: "curtis", wins: 1, losses: 1 },
  { slug: "bryan-pamba", wins: 0, losses: 0 },
  { slug: "yanis", wins: 0, losses: 0 },
  { slug: "imran", wins: 0, losses: 0 },
  { slug: "dani", wins: 0, losses: 0 },
  { slug: "matthias", wins: 0, losses: 0 },
  { slug: "tiegbe-bamba", wins: 0, losses: 1 },
  { slug: "chris", wins: 0, losses: 1 },
  { slug: "aurelien", wins: 0, losses: 1 },
  { slug: "willis", wins: 0, losses: 1 },
  { slug: "lenny", wins: 0, losses: 1 },
];
