import { Instagram, Youtube, Music2 } from "lucide-react";
import { INSTAGRAM_URL, TIKTOK_URL, YOUTUBE_URL } from "@/data/site";
const items = [
  { Icon: Music2, label: "TikTok", href: TIKTOK_URL },
  { Icon: Instagram, label: "Instagram", href: INSTAGRAM_URL },
  { Icon: Youtube, label: "YouTube", href: YOUTUBE_URL },
];
export function Socials({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <ul className={`flex items-center gap-4 ${className}`}>
      {items.map(({ Icon, label, href }) => (
        <li key={label}>
          <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} de TBL (nouvel onglet)`} title={label} className="text-white/90 transition hover:text-gold">
            <Icon size={size} strokeWidth={1.8} />
          </a>
        </li>
      ))}
    </ul>
  );
}
