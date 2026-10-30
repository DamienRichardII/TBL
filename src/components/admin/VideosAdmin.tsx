"use client";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Msg, input } from "./ui";
import { kindOf, type VideoKind } from "@/lib/youtube";

interface V { id: string; title: string }
type Choice = "auto" | VideoKind | "hidden";

export function VideosAdmin() {
  const [videos, setVideos] = useState<V[]>([]);
  const [choices, setChoices] = useState<Record<string, Choice>>({});
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const load = useCallback(async () => {
    const [v, o] = await Promise.all([fetch("/api/videos").then((r) => r.json() as Promise<V[]>).catch(() => []), supabase().from("video_overrides").select("*")]);
    setVideos(v);
    setChoices(Object.fromEntries(((o.data as { video_id: string; kind: VideoKind; hidden: boolean }[]) ?? []).map((x) => [x.video_id, x.hidden ? "hidden" : x.kind])));
  }, []);
  useEffect(() => { load(); }, [load]);

  async function change(id: string, c: Choice) {
    setChoices((x) => ({ ...x, [id]: c }));
    const sb = supabase();
    const { error } = c === "auto"
      ? await sb.from("video_overrides").delete().eq("video_id", id)
      : await sb.from("video_overrides").upsert({ video_id: id, kind: c === "hidden" ? "Matchs complets" : c, hidden: c === "hidden" }, { onConflict: "video_id" });
    setMsg(error ? { ok: false, text: `Erreur : ${error.message}` } : { ok: true, text: "Enregistré." });
  }

  return (
    <div>
      <p className="mb-4 max-w-2xl text-[13px] text-white/60">Les dernières vidéos de la chaîne YouTube arrivent automatiquement. Choisis ici leur catégorie, ou masque une vidéo du site. « Auto » utilise le classement par mots-clés du titre.</p>
      <ul className="space-y-3">
        {videos.map((v) => (
          <li key={v.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-line p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://i.ytimg.com/vi/${v.id}/mqdefault.jpg`} alt="" className="h-14 w-24 rounded object-cover" />
            <div className="min-w-[12rem] flex-1"><p className="text-sm">{v.title}</p><p className="text-[11px] text-white/45">Auto : {kindOf(v.title)}</p></div>
            <select aria-label={`Catégorie de ${v.title}`} className={`${input} !w-auto`} value={choices[v.id] ?? "auto"} onChange={(e) => change(v.id, e.target.value as Choice)}>
              <option value="auto">Auto</option><option>Matchs complets</option><option>Highlights</option><option>Teasers</option><option value="hidden">Masquer</option>
            </select>
          </li>
        ))}
        {videos.length === 0 && <li className="text-sm text-white/60">Aucune vidéo disponible pour le moment.</li>}
      </ul>
      <Msg m={msg} />
    </div>
  );
}
