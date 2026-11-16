import Image from "next/image";

const stripe = "absolute h-px bg-gradient-to-r from-transparent via-gold to-transparent";
/** Décor de la page Classement : cathédrale d'Orléans à gauche, joueur à droite (photos en noir et blanc). */
export function ClassementDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="gold-glow absolute inset-x-0 top-0 h-[700px] opacity-30 [mask-image:linear-gradient(to_bottom,black_40%,transparent)]" />
      <Image src="/img/bg/classement-cathedrale.webp" alt="" width={680} height={1020} sizes="440px" quality={85} className="absolute -left-10 top-20 hidden h-[640px] w-auto opacity-60 [mask-image:linear-gradient(to_right,black_40%,transparent),linear-gradient(to_bottom,transparent,black_14%,black_55%,transparent)] [mask-composite:intersect] [-webkit-mask-composite:source-in] md:block xl:left-0" />
      <Image src="/img/bg/classement-joueur.webp" alt="" width={706} height={941} sizes="460px" quality={85} className="absolute -right-16 top-24 hidden h-[640px] w-auto opacity-60 [mask-image:linear-gradient(to_left,black_40%,transparent),linear-gradient(to_bottom,transparent,black_14%,black_55%,transparent)] [mask-composite:intersect] [-webkit-mask-composite:source-in] md:block xl:right-0" />
      <div className={`${stripe} -left-24 bottom-24 w-[520px] -rotate-45 opacity-70`} />
      <div className={`${stripe} -left-40 bottom-40 w-[520px] -rotate-45 opacity-35`} />
      <div className={`${stripe} -left-10 top-8 w-[360px] -rotate-45 opacity-50`} />
      <div className={`${stripe} -right-28 bottom-20 w-[560px] -rotate-45 opacity-60`} />
      <div className={`${stripe} -right-44 bottom-40 w-[560px] -rotate-45 opacity-30`} />
    </div>
  );
}
