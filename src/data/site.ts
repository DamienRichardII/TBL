export const YOUTUBE_URL = "https://www.youtube.com/@TheBallinLeague";
export const YOUTUBE_SUBSCRIBE_URL = "https://www.youtube.com/@TheBallinLeague?sub_confirmation=1";
export const YOUTUBE_CHANNEL_ID = "UC1LzeX_PGYv2UZkQLic-ekQ";
export const INSTAGRAM_URL = "https://www.instagram.com/theballinleague/";
export const TIKTOK_URL = "https://www.tiktok.com/@theballinleague";

/** Lien de la vraie billetterie : à renseigner dès réception. Vide = page de réservation provisoire. */
export const TICKETING_URL = "";
/** ID YouTube d'un live à venir (vide = aucun live programmé). */
export const LIVE_VIDEO_ID = "";
/** Début de TBL 02 — samedi 19 décembre 2026, 18 h (heure de Paris). */
export const EVENT_START = "2026-12-19T18:00:00+01:00";

export const nav = [
  { href: "/", label: "Accueil" },
  { href: "/evenements", label: "Événements" },
  { href: "/classement", label: "Classement" },
  { href: "/joueurs", label: "Joueurs" },
  { href: "/videos", label: "Vidéos" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];
export const RESERVATION_HREF = "/reservation/tbl-02-the-throne";
export const divisions = [
  { name: "Lightweight", range: "1,70 m à 1,84 m" },
  { name: "Middleweight", range: "1,85 m à 1,92 m" },
  { name: "Heavyweight", range: "1,93 m et plus" },
] as const;
