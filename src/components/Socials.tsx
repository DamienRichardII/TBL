import { Instagram, Youtube, Music2, Ghost } from "lucide-react";
/** Liens réseaux sociaux non fournis : icônes affichées, sans lien, jusqu'à réception des URLs officielles. */
const items = [
  { Icon: Music2, label: "TikTok" }, { Icon: Ghost, label: "Snapchat" },
  { Icon: Instagram, label: "Instagram" }, { Icon: Youtube, label: "YouTube" },
];
export function Socials({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <ul className={`flex items-center gap-4 ${className}`}>
      {items.map(({ Icon, label }) => (
        <li key={label}><span title={`${label} — lien officiel à venir`} aria-label={`${label} (lien à venir)`} role="img" className="text-white/90"><Icon size={size} strokeWidth={1.8} /></span></li>
      ))}
    </ul>
  );
}
