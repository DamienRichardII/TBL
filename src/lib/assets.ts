/** Table de correspondance centralisée des assets (aucun renommage des fichiers sources). */
const g = (n: number) => `/img/gallery/g${String(n).padStart(2, "0")}.webp`;
export const IMG = {
  logo: { src: "/img/tbl-logo.png", w: 430, h: 560 },
  posters: {
    group: "/img/posters/tbl02-groupe.webp",
    kennyBryan: "/img/posters/kenny-bryan.webp",
    adamaLeian: "/img/posters/adama-leian.webp",
    imranSebastien: "/img/posters/imran-sebastien.webp",
    curtisYanis: "/img/posters/curtis-yanis.webp",
    samuelKeran: "/img/posters/samuel-keran.webp",
    desmoChris: "/img/posters/desmo-chris.webp",
    daniMatthias: "/img/posters/dani-matthias.webp",
    tiegbeAurelien: "/img/posters/tiegbe-aurelien.webp",
  },
  hero: { left: g(24), right: g(28), mobile: g(24) },
  banner: g(15),
  gallery: Array.from({ length: 32 }, (_, i) => g(i + 1)),
  tbl01Cover: g(6),
} as const;
