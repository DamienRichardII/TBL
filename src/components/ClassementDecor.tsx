import Image from "next/image";

/** Cathédrale d'Orléans (silhouette stylisée, trait fin) — décor de la page Classement. */
function Cathedral() {
  const t = "#C9A15C";
  return (
    <svg viewBox="0 0 320 640" aria-hidden className="h-full w-auto" fill="none" stroke={t} strokeWidth="1.2" strokeLinejoin="round">
      <defs><linearGradient id="cf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1b1812" /><stop offset="1" stopColor="#08090B" /></linearGradient></defs>
      {/* tour gauche */}
      <path d="M40 640V250h80v390Z" fill="url(#cf)" />
      <path d="M40 250 80 40l40 210" fill="url(#cf)" /><path d="M80 40V6M72 18h16" />
      <path d="M52 250V190h56v60M60 190l20-48 20 48" />
      <path d="M58 330v-48a8 8 0 0 1 8-12h28a8 8 0 0 1 8 12v48M58 420v-48a8 8 0 0 1 8-12h28a8 8 0 0 1 8 12v48M58 510v-48a8 8 0 0 1 8-12h28a8 8 0 0 1 8 12v48" />
      {/* tour droite */}
      <path d="M200 640V250h80v390Z" fill="url(#cf)" />
      <path d="M200 250 240 40l40 210" fill="url(#cf)" /><path d="M240 40V6M232 18h16" />
      <path d="M212 250V190h56v60M220 190l20-48 20 48" />
      <path d="M218 330v-48a8 8 0 0 1 8-12h28a8 8 0 0 1 8 12v48M218 420v-48a8 8 0 0 1 8-12h28a8 8 0 0 1 8 12v48M218 510v-48a8 8 0 0 1 8-12h28a8 8 0 0 1 8 12v48" />
      {/* façade centrale */}
      <path d="M120 640V330l40-90 40 90v310Z" fill="url(#cf)" />
      <circle cx="160" cy="360" r="26" /><circle cx="160" cy="360" r="14" /><path d="M160 334v52M134 360h52M142 342l36 36M178 342l-36 36" />
      <path d="M138 520v-60a22 22 0 0 1 44 0v60M138 600v-50h44v50" />
      {/* contreforts / pinacles */}
      <path d="M20 640V420M20 420l10-30 10 30M300 640V420M300 420l-10-30-10 30M120 330l-14-30M200 330l14-30" />
    </svg>
  );
}

/** Ballon TBL à droite : disque sombre, contour doré, coutures et logo. */
function Ball() {
  return (
    <div className="relative aspect-square w-full rounded-full border-2 border-gold/50 bg-[radial-gradient(circle_at_30%_30%,#2a251b,#0b0b0c_62%)] shadow-[0_0_60px_-10px_rgba(201,161,92,.35),inset_0_0_60px_rgba(0,0,0,.8)]">
      <svg viewBox="0 0 200 200" aria-hidden className="absolute inset-0 h-full w-full" fill="none" stroke="#C9A15C" strokeOpacity=".55" strokeWidth="1.4">
        <path d="M100 0v200M0 100h200" /><path d="M30 30c40 28 40 112 0 140M170 30c-40 28-40 112 0 140" />
      </svg>
      <Image src="/img/tbl-logo.png" alt="" width={215} height={280} aria-hidden className="absolute left-[18%] top-1/2 w-[46%] -translate-y-1/2 -rotate-12 opacity-80 [filter:sepia(1)_saturate(2.2)_hue-rotate(-8deg)_brightness(.95)]" />
    </div>
  );
}

const stripe = "absolute h-px bg-gradient-to-r from-transparent via-gold to-transparent";
export function ClassementDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="gold-glow absolute inset-x-0 top-0 h-[700px] opacity-30 [mask-image:linear-gradient(to_bottom,black_40%,transparent)]" />
      <div className="absolute -left-6 top-24 hidden h-[620px] opacity-[.38] [mask-image:linear-gradient(to_right,black_45%,transparent),linear-gradient(to_bottom,black_65%,transparent)] [mask-composite:intersect] [-webkit-mask-composite:source-in] md:block xl:left-4"><Cathedral /></div>
      <div className="absolute -right-28 top-[22rem] hidden w-[340px] opacity-60 lg:block xl:-right-16 xl:w-[420px] 2xl:right-0"><Ball /></div>
      {/* traits dorés en diagonale */}
      <div className={`${stripe} -left-24 bottom-24 w-[520px] -rotate-45 opacity-70`} />
      <div className={`${stripe} -left-40 bottom-40 w-[520px] -rotate-45 opacity-35`} />
      <div className={`${stripe} -left-10 top-8 w-[360px] -rotate-45 opacity-50`} />
      <div className={`${stripe} -right-28 bottom-20 w-[560px] -rotate-45 opacity-60`} />
      <div className={`${stripe} -right-44 bottom-40 w-[560px] -rotate-45 opacity-30`} />
    </div>
  );
}
