import { Youtube } from "lucide-react";
import { YOUTUBE_SUBSCRIBE_URL, YOUTUBE_URL } from "@/data/site";

export function YouTubeCTA({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={`flex w-full flex-col gap-3 sm:flex-row sm:justify-center ${className}`}>
      <a href={YOUTUBE_SUBSCRIBE_URL} target="_blank" rel="noopener noreferrer" className={`btn btn-yt gap-2.5 shadow-[0_8px_30px_-8px_rgba(255,0,0,.6)] ${compact ? "" : "sm:!px-8 sm:!py-4 sm:!text-[14px]"}`}>
        <Youtube size={compact ? 20 : 26} strokeWidth={2} /> S’abonner à notre chaîne YouTube
      </a>
      <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className={`btn btn-ghost gap-2 ${compact ? "" : "sm:!px-8 sm:!py-4 sm:!text-[14px]"}`}>
        Voir notre chaîne YouTube
      </a>
    </div>
  );
}
