import Link from "next/link";
export function Partners({ light = false }: { light?: boolean }) {
  return (
    <section aria-labelledby="partners" className={`${light ? "bg-bone text-ink" : "bg-ink text-white"} py-14`}>
      <div className="mx-auto max-w-page px-4 text-center lg:px-6">
        <p className="title gold-text text-sm tracking-[0.3em]">Ils nous accompagnent</p>
        <h2 id="partners" className="title mt-2 text-3xl lg:text-4xl">Partenaires & sponsors</h2>
        <ul className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {[1, 2, 3, 4].map((n) => (
            <li key={n} className="flex aspect-[3/2] items-center justify-center rounded-xl border border-dashed border-gold/50 text-[11px] uppercase tracking-widest text-gold/80">Votre logo ici</li>
          ))}
        </ul>
        <p className="mx-auto mt-6 max-w-xl text-sm opacity-70">Rejoignez l’aventure TBL et associez votre marque à la première ligue française de basketball 1v1.</p>
        <Link href="/contact" className="btn btn-gold mt-6">Devenir partenaire</Link>
      </div>
    </section>
  );
}
