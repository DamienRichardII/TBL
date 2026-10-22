import { Info } from "lucide-react";
export function Notice({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div role="note" className={`flex gap-3 rounded-xl border p-4 text-[13px] ${light ? "border-ink/15 bg-white text-ink/80" : "border-gold/40 bg-gold/10 text-white/85"}`}>
      <Info size={18} className="mt-0.5 shrink-0 text-gold" /><div>{children}</div>
    </div>
  );
}
