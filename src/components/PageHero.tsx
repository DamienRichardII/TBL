export function PageShell({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <main className={`${light ? "bg-bone text-ink" : "bg-ink text-white"} min-h-[70vh] pt-24 pb-20 lg:pt-32`}><div className="mx-auto max-w-page px-4 lg:px-6">{children}</div></main>;
}
export function PageTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (<div className="mb-8"><h1 className="title text-4xl lg:text-6xl">{children}</h1>{sub && <p className="mt-3 max-w-2xl text-sm opacity-70 lg:text-base">{sub}</p>}</div>);
}
