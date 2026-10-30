import type { Player } from "@/types";

export const players: Player[] = [
  { slug: "samuel-marwakal", name: "Samuel", height: "1,92 m", division: "Middleweight", tblRecord: { wins: 3, losses: 1 }, note: "Bilan communiqué. Joueur confirmé de la scène 1v1." },
  { slug: "kieran", name: "Keran", height: "1,88 m", division: "Middleweight", tblRecord: { wins: 1, losses: 0 }, note: "Bilan communiqué, invaincu. Remplace Prince au main event." },
  { slug: "kenny-brown", name: "Kenny", nickname: "Downtown", number: 1, height: "1,88 m", division: "Middleweight", note: "Présent lors de TBL 01." },
  { slug: "bryan-pamba", name: "Bryan", nickname: "Chef B", number: 3, height: "1,86 m", division: "Middleweight", note: "Expérience du basketball professionnel en Pro B et Pro A. Premier match 1v1 annoncé." },
  { slug: "aurelien", name: "Aurélien", nickname: "Escanor", height: "2,00 m", division: "Heavyweight" },
  { slug: "tiegbe-bamba", name: "Tiegbe", nickname: "Bvmbino", number: 3, height: "1,99 m", division: "Heavyweight" },
  { slug: "adama", name: "Adama", nickname: "Aladamantium", number: 23, height: "1,80 m", division: "Lightweight", note: "Rivalité annoncée pour TBL 02." },
  { slug: "leian", name: "Leïan", nickname: "Monkey", number: 10, height: "1,80 m", division: "Lightweight", note: "Rivalité annoncée pour TBL 02." },
  { slug: "yanis", name: "Yanis", nickname: "Gnagne", number: 27, height: "1,83 m", division: "Lightweight", note: "Première participation à TBL annoncée." },
  { slug: "curtis", name: "Curtis", nickname: "Bouncycurt", number: 0, height: "1,83 m", division: "Lightweight", otherRecord: { source: "TapeUp", wins: 2, losses: 1 }, note: "Première participation à TBL annoncée." },
  { slug: "dani", name: "Dani", nickname: "Humble", number: 5, height: "1,90 m", division: "Middleweight" },
  { slug: "matthias", name: "Matthias", nickname: "MD", number: 45, height: "1,92 m", division: "Middleweight" },
  { slug: "desmo", name: "Desmo", nickname: "Desmo_93", number: 93, height: "1,93 m", division: "Heavyweight", otherRecord: { source: "TapeUp", wins: 2, losses: 0 } },
  { slug: "chris", name: "Chris", nickname: "Chrisgotbounce", number: 13, height: "1,93 m", division: "Heavyweight" },
  { slug: "sebastien", name: "Sébastien", nickname: "Roda", number: 0, height: "1,80 m", division: "Lightweight", note: "Match de qualification (tryout)." },
  { slug: "imran", name: "Imran", nickname: "IMS", number: 3, height: "1,80 m", division: "Lightweight", note: "Match de qualification (tryout)." },
];

export const getPlayer = (slug: string) => players.find((p) => p.slug === slug);
export const initials = (name: string) => name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
