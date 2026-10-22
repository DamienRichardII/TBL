import type { Player } from "@/types";
export function RecordLine({ p, light = false }: { p: Player; light?: boolean }) {
  const mute = light ? "text-ink/55" : "text-white/55";
  return (
    <div className="text-[12px] leading-snug">
      {p.tblRecord ? <span className="font-semibold">Bilan TBL : {p.tblRecord.wins} V – {p.tblRecord.losses} D</span> : <span className={mute}>Bilan TBL à confirmer</span>}
      {p.otherRecord && <span className={`block ${mute}`}>{p.otherRecord.source} : {p.otherRecord.wins} V – {p.otherRecord.losses} D (hors TBL)</span>}
    </div>
  );
}
