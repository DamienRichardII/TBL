import { getLatestVideos } from "@/lib/youtube";
export const revalidate = 3600;
/** Liste des dernières vidéos de la chaîne (utilisée par l'espace administrateur pour classer les vidéos). */
export async function GET() {
  return Response.json(await getLatestVideos(30));
}
