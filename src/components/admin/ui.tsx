"use client";
export const input = "w-full rounded-lg border border-white/20 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-gold";
export function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return <label className={`block text-[12px] text-white/70 ${className}`}>{label}<div className="mt-1">{children}</div></label>;
}
export function Msg({ m }: { m: { ok: boolean; text: string } | null }) {
  if (!m) return null;
  return <p role="status" className={`mt-3 text-sm ${m.ok ? "text-gold" : "text-[#ff6b6b]"}`}>{m.text}</p>;
}
export const numOrNull = (v: string): number | null => (v.trim() === "" || Number.isNaN(Number(v)) ? null : Math.trunc(Number(v)));
export const slugify = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
