interface HeroProps {
  capturedCount: number;
  totalCount: number;
}

const Stat = ({ value, label }: { value: string; label: string }) => {
  return (
    <div>
      <div className="font-display text-xl font-bold">{value}</div>
      <div className="text-xs text-slate-500 dark:text-slate-400">{label}</div>
    </div>
  );
};

const Hero = ({ capturedCount, totalCount }: HeroProps) => {
  const completion = Math.round((capturedCount / totalCount) * 100);

  return (
    <section className="mb-9 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
      <div>
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Find your next
          <span className="block text-red-600">great catch.</span>
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
          Explore all {totalCount} original Pokémon. Search for a specific one,
          track your captures, and complete your collection.
        </p>
      </div>
      <div className="flex gap-8 rounded-2xl border border-stone-200 bg-white px-6 py-4 shadow-sm dark:border-white/10 dark:bg-white/5">
        <Stat value={totalCount.toString()} label="Pokémon" />
        <div className="w-px bg-stone-200 dark:bg-white/10" />
        <Stat value={capturedCount.toString()} label="Captured" />
        <div className="w-px bg-stone-200 dark:bg-white/10" />
        <Stat value={`${completion}%`} label="Complete" />
      </div>
    </section>
  );
};

export default Hero;
