import type { TblEvent } from "@/types";
import { IMG } from "@/lib/assets";

export const SLUG_TBL02 = "tbl-02-the-throne";

export const events: TblEvent[] = [
  {
    slug: SLUG_TBL02, name: "TBL 02", subtitle: "The Throne", tags: ["1vs1"], status: "À venir",
    dateLabel: "Samedi 19 décembre 2026", time: "18 h 00", city: "Orléans",
    venue: "Gymnase Victor Fouillade (nom et adresse à confirmer)",
    access: "Gratuit, sur réservation en ligne", image: IMG.posters.group,
  },
  {
    slug: "tbl-01", name: "TBL 01", tags: ["1vs1", "Passés"], status: "Passé",
    dateLabel: "Date à confirmer", image: IMG.tbl01Cover,
  },
];
