import type { Player } from "@/types";

export const players: Player[] = [
  { slug: "samuel-marwakal", photo: "/img/players/samuel-marwakal.webp", name: "Samuel", height: "1,92 m", division: "Middleweight", tblRecord: { wins: 3, losses: 1 }, note: "Bilan communiqué. Joueur confirmé de la scène 1v1." },
  { slug: "kieran", photo: "/img/players/kieran.webp", name: "Keran", height: "1,88 m", division: "Middleweight", tblRecord: { wins: 1, losses: 0 }, note: "Bilan communiqué, invaincu. Remplace Prince au main event." },
  { slug: "kenny-brown", photo: "/img/players/kenny-brown.webp", name: "Kenny", nickname: "Downtown", number: 1, height: "1,88 m", division: "Middleweight", tblRecord: { wins: 1, losses: 1 }, note: "Présent lors de TBL 01." },
  { slug: "bryan-pamba", photo: "/img/players/bryan-pamba.webp", name: "Bryan", nickname: "Chef B", number: 3, height: "1,86 m", division: "Middleweight", tblRecord: { wins: 0, losses: 0 }, note: "Expérience du basketball professionnel en Pro B et Pro A. Premier match 1v1 annoncé." },
  { slug: "aurelien", photo: "/img/players/aurelien.webp", name: "Aurélien", nickname: "Escanor", height: "2,00 m", division: "Heavyweight", tblRecord: { wins: 0, losses: 0 } },
  { slug: "tiegbe-bamba", photo: "/img/players/tiegbe-bamba.webp", name: "Tiegbe", nickname: "Bvmbino", number: 3, height: "1,99 m", division: "Heavyweight", tblRecord: { wins: 0, losses: 1 } },
  { slug: "adama", photo: "/img/players/adama.webp", name: "Adama", nickname: "Aladamantium", number: 23, height: "1,80 m", division: "Lightweight", tblRecord: { wins: 0, losses: 0 }, note: "Rivalité annoncée pour TBL 02." },
  { slug: "leian", photo: "/img/players/leian.webp", name: "Leïan", nickname: "Monkey", number: 10, height: "1,80 m", division: "Lightweight", tblRecord: { wins: 0, losses: 0 }, note: "Rivalité annoncée pour TBL 02." },
  { slug: "yanis", photo: "/img/players/yanis.webp", name: "Yanis", nickname: "Gnagne", number: 27, height: "1,83 m", division: "Lightweight", tblRecord: { wins: 0, losses: 0 }, note: "Première participation à TBL annoncée." },
  { slug: "curtis", photo: "/img/players/curtis.webp", name: "Curtis", nickname: "Bouncycurt", number: 0, height: "1,83 m", division: "Lightweight", tblRecord: { wins: 0, losses: 0 }, otherRecord: { source: "TapeUp", wins: 2, losses: 1 }, note: "Première participation à TBL annoncée." },
  { slug: "dani", photo: "/img/players/dani.webp", name: "Dani", nickname: "Humble", number: 5, height: "1,90 m", division: "Middleweight", tblRecord: { wins: 0, losses: 0 } },
  { slug: "matthias", photo: "/img/players/matthias.webp", name: "Matthias", nickname: "MD", number: 45, height: "1,92 m", division: "Middleweight", tblRecord: { wins: 0, losses: 0 } },
  { slug: "desmo", photo: "/img/players/desmo.webp", name: "Desmo", nickname: "Desmo_93", number: 93, height: "1,93 m", division: "Heavyweight", tblRecord: { wins: 0, losses: 0 }, otherRecord: { source: "TapeUp", wins: 2, losses: 0 } },
  { slug: "chris", photo: "/img/players/chris.webp", name: "Chris", nickname: "Chrisgotbounce", number: 13, height: "1,93 m", division: "Heavyweight", tblRecord: { wins: 0, losses: 1 } },
  { slug: "sebastien", photo: "/img/players/sebastien.webp", name: "Sébastien", nickname: "Roda", number: 0, height: "1,80 m", division: "Lightweight", tblRecord: { wins: 0, losses: 0 }, note: "Match de qualification (tryout)." },
  { slug: "imran", photo: "/img/players/imran.webp", name: "Imran", nickname: "IMS", number: 3, height: "1,80 m", division: "Lightweight", tblRecord: { wins: 0, losses: 0 }, note: "Match de qualification (tryout)." },
];

export const getPlayer = (slug: string) => players.find((p) => p.slug === slug);
export const initials = (name: string) => name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
