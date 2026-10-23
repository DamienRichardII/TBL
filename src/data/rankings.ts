import type { Division, RankEntry } from "@/types";
/**
 * Classements officiels par division, dans l'ordre (1er en premier).
 * Vide tant que TBL n'a pas communiqué de classement validé — ne jamais inventer de rang.
 * Exemple : { slug: "samuel-marwakal", wins: 3, losses: 1, champion: true }
 */
export const rankings: Record<Division, RankEntry[]> = {
  Lightweight: [],
  Middleweight: [],
  Heavyweight: [],
};
