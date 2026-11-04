import Image from "next/image";

const backdrops = {
  classement: { l: ["/img/bg/classement-l-v2.webp", 547, 900], r: ["/img/bg/classement-r-v2.webp", 428, 900] },
  videos: { l: ["/img/bg/videos-l-v2.webp", 518, 900], r: ["/img/bg/videos-r-v2.webp", 404, 900] },
  livestream: { l: ["/img/bg/live-l-v2.webp", 317, 643], r: ["/img/bg/live-r-v2.webp", 425, 900] },
  contact: { l: ["/img/bg/contact-l-v2.webp", 416, 889], r: ["/img/bg/contact-r-v2.webp", 507, 751] },
} as const;

export function PageShell({ children, light = false, backdrop }: { children: React.ReactNode; light?: boolean; backdrop?: keyof typeof backdrops }) {
  const b = backdrop ? backdrops[backdrop] : null;
  return (
    <main className={`${light ? "bg-bone text-ink" : "bg-ink text-white"} relative isolate min-h-[70vh] overflow-hidden pt-24 pb-20 lg:pt-32`}>
      {b && (<>
        <Image src={b.l[0]} alt="" width={b.l[1]} height={b.l[2]} aria-hidden sizes="40vw" className="pointer-events-none absolute -left-32 top-20 grayscale -z-10 hidden h-[640px] w-auto opacity-30 [mask-image:linear-gradient(to_right,black_30%,transparent),linear-gradient(to_bottom,black_60%,transparent)] [mask-composite:intersect] [-webkit-mask-composite:source-in] lg:block xl:-left-16" />
        <Image src={b.r[0]} alt="" width={b.r[1]} height={b.r[2]} aria-hidden sizes="40vw" className="pointer-events-none absolute -right-10 top-20 grayscale -z-10 hidden h-[680px] w-auto opacity-30 [mask-image:linear-gradient(to_right,transparent,black_40%),linear-gradient(to_bottom,black_50%,transparent)] [mask-composite:intersect] [-webkit-mask-composite:source-in] lg:block xl:right-0" />
        <div className="gold-glow pointer-events-none absolute inset-x-0 top-0 -z-10 h-[700px] opacity-40 [mask-image:linear-gradient(to_bottom,black_50%,transparent)]" />
      </>)}
      <div className="mx-auto max-w-page px-4 lg:px-6">{children}</div>
    </main>
  );
}
export function PageTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (<div className="mb-8"><h1 className="title text-4xl lg:text-6xl">{children}</h1>{sub && <p className="mt-3 max-w-2xl text-sm opacity-70 lg:text-base">{sub}</p>}</div>);
}
