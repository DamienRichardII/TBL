import { YOUTUBE_CHANNEL_ID } from "@/data/site";

export interface YtVideo { id: string; title: string; published: string }

/** Parse le flux RSS public d'une chaîne YouTube. */
export function parseFeed(xml: string): YtVideo[] {
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [];
  return entries.flatMap((e) => {
    const id = e.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
    const title = e.match(/<title>([^<]*)<\/title>/)?.[1];
    const published = e.match(/<published>([^<]+)<\/published>/)?.[1] ?? "";
    if (!id || !title) return [];
    const clean = title.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    return [{ id, title: clean, published }];
  });
}

/** Dernières vidéos de la chaîne (rafraîchi toutes les heures). Liste vide si le flux est indisponible. */
export async function getLatestVideos(limit = 15): Promise<YtVideo[]> {
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    return parseFeed(await res.text()).slice(0, limit);
  } catch {
    return [];
  }
}

export type VideoKind = "Matchs complets" | "Highlights" | "Teasers";
/**
 * Classement automatique selon le titre (mots-clés), utilisé quand aucune catégorie n'a été choisie
 * dans l'espace administrateur. Une catégorie choisie dans l'admin l'emporte toujours.
 */
export function kindOf(title: string, override?: VideoKind): VideoKind {
  if (override) return override;
  const t = title.toLowerCase();
  if (/(teaser|trailer|annonce|promo|bient[oô]t|coming soon|d[ée]voil|reveal|save the date|avant[- ]go[uû]t|prochain)/.test(t)) return "Teasers";
  if (/(highlight|r[ée]sum[ée]|best[- ]?of|recap|moments?)/.test(t)) return "Highlights";
  if (/(\bvs\b|\bep\.? ?\d|match complet|full game|full match|[ée]pisode)/.test(t)) return "Matchs complets";
  return "Highlights";
}
