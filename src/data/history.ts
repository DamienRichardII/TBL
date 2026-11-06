import type { MatchLine, RankEntry } from "@/types";

/**
 * Historique des matchs officiels par joueur (source : « TBL_classement_V_D_par_match », novembre 2026).
 * Le classement cumule TBL + Top Hoops ; le détail par plateforme et par adversaire en est déduit.
 * Les adversaires externes (Prince, Yvad…) ne sont pas membres du classement : texte simple, sans lien.
 */
const TBC = "Adversaire à confirmer";
export const history: Record<string, MatchLine[]> = {
  "samuel-marwakal": [
    { vs: "Kenny Brown", vsSlug: "kenny-brown", result: "V", platform: "TBL" },
    { vs: "Tiegbe", vsSlug: "tiegbe-bamba", result: "V", platform: "TBL" },
    { vs: "Yvad", result: "V", platform: "Top Hoops", score: "30–28" },
    { vs: "Prince", result: "D", platform: "Top Hoops" },
  ],
  "kenny-brown": [
    { vs: "Willis", result: "V", platform: "TBL" },
    { vs: "Samuel", vsSlug: "samuel-marwakal", result: "D", platform: "TBL" },
  ],
  "tiegbe-bamba": [{ vs: "Samuel", vsSlug: "samuel-marwakal", result: "D", platform: "TBL" }],
  kieran: [{ vs: "Chris", vsSlug: "chris", result: "V", platform: "TBL" }],
  chris: [{ vs: "Keran", vsSlug: "kieran", result: "D", platform: "TBL" }],
  desmo: [
    { vs: "Curtis", vsSlug: "curtis", result: "V", platform: "Top Hoops" },
    { vs: "Monkey", result: "V", platform: "Top Hoops" },
    { vs: "Rub's", result: "D", platform: "Top Hoops" },
  ],
  curtis: [
    { vs: "Joedoff", result: "V", platform: "Top Hoops" },
    { vs: "Desmo", vsSlug: "desmo", result: "D", platform: "Top Hoops" },
  ],
  adama: [{ vs: "YBK", result: "V", platform: "Top Hoops", score: "30–23" }],
  sebastien: [{ vs: "Stanley", result: "V", platform: "Top Hoops" }],
  willis: [{ vs: "Kenny Brown", vsSlug: "kenny-brown", result: "D", platform: "TBL" }],
  clarence: [{ vs: TBC, result: "V", platform: "TBL" }],
  lenny: [{ vs: TBC, result: "D", platform: "TBL" }],
};

/** Joueurs présents au classement sans fiche joueur (division et taille à confirmer). */
export const guests: Record<string, string> = { willis: "Willis", clarence: "Clarence", lenny: "Lenny" };

export const tally = (m: MatchLine[], platform?: MatchLine["platform"]) => {
  const l = platform ? m.filter((x) => x.platform === platform) : m;
  return { wins: l.filter((x) => x.result === "V").length, losses: l.filter((x) => x.result === "D").length };
};

/** Totaux du classement : déduits de l'historique quand il existe, sinon valeurs saisies. */
export const withTotals = (e: RankEntry): RankEntry => {
  const h = history[e.slug];
  return h ? { ...e, ...tally(h) } : e;
};
