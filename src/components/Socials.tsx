import { Instagram, Youtube, Music2 } from "lucide-react";
const items = [
  { Icon: Music2, label: "TikTok", href: "https://www.tiktok.com/@theballinleague" },
  { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/theballinleague/" },
  { Icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@TheBallinLeague" },
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
