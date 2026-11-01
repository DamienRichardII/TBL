import type { Match } from "@/types";
import { IMG } from "@/lib/assets";

export const matches: Match[] = [
  { game: 8, label: "Main event · Titre Middleweight", division: "Middleweight", title: true, a: "samuel-marwakal", b: "kieran", poster: IMG.posters.samuelKeran, posterAlt: "Affiche du match Samuel contre Keran" },
  { game: 7, label: "Middleweight", division: "Middleweight", a: "kenny-brown", b: "bryan-pamba", poster: IMG.posters.kennyBryan, posterAlt: "Affiche du match Kenny contre Bryan" },
  { game: 6, label: "Heavyweight", division: "Heavyweight", a: "aurelien", b: "tiegbe-bamba", poster: IMG.posters.tiegbeAurelien, posterAlt: "Affiche du match Tiegbe contre Aurélien" },
  { game: 5, label: "Lightweight", division: "Lightweight", a: "adama", b: "leian", poster: IMG.posters.adamaLeian, posterAlt: "Affiche du match Adama contre Leïan" },
  { game: 4, label: "Lightweight", division: "Lightweight", a: "curtis", b: "yanis", poster: IMG.posters.curtisYanis, posterAlt: "Affiche du match Curtis contre Yanis" },
  { game: 3, label: "Middleweight", division: "Middleweight", a: "dani", b: "matthias", poster: IMG.posters.daniMatthias, posterAlt: "Affiche du match Dani contre Matthias" },
  { game: 2, label: "Tryout Heavyweight", division: "Heavyweight", tryout: true, a: "desmo", b: "chris", poster: IMG.posters.desmoChris, posterAlt: "Affiche du match Desmo contre Chris" },
  { game: 1, label: "Tryout Lightweight", division: "Lightweight", tryout: true, a: "sebastien", b: "imran", poster: IMG.posters.imranSebastien, posterAlt: "Affiche du match Sébastien contre Imran" },
];
