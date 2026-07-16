export default function DesignPortfolioPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-24 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <section className="mx-auto flex max-w-4xl flex-col gap-6">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          Portfolio / Design
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Design projects.
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          A place for brand identity, web design, UI systems, and creative
          direction case studies.
        </p>
      </section>
    </main>
  );
}
