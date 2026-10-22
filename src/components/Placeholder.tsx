import { initials } from "@/data/players";
/** Placeholder neutre : aucune photo de joueur n'a été fournie (cf. ASSETS_MANQUANTS.md). */
export function PlayerPlaceholder({ name, number, dark = true }: { name: string; number?: number; dark?: boolean }) {
  return (
    <div className={`relative flex h-full w-full items-center justify-center overflow-hidden ${dark ? "bg-gradient-to-b from-neutral-800 to-ink" : "bg-neutral-200"}`} role="img" aria-label={`Photo de ${name} à venir`}>
      <span className="title select-none text-7xl text-white/10">{number !== undefined ? number : ""}</span>
      <span className="title absolute text-4xl text-white/60">{initials(name)}</span>
      <span className="absolute bottom-2 text-[10px] uppercase tracking-widest text-white/40">Photo à venir</span>
    </div>
  );
}
