"use client";
import { createContext, useContext } from "react";
import type { SiteData } from "@/lib/db";

const Ctx = createContext<SiteData | null>(null);
export function SiteDataProvider({ data, children }: { data: SiteData; children: React.ReactNode }) {
  return <Ctx.Provider value={data}>{children}</Ctx.Provider>;
}
/** Données du site (joueurs, matchs, événements, classements) pour les composants client. */
export function useSiteData(): SiteData {
  const v = useContext(Ctx);
  if (!v) throw new Error("SiteDataProvider manquant");
  return v;
}
