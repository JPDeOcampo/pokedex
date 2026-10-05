import type { ViewMode } from "@/@types/pokemon";

export const PokemonSkeletons = ({
  viewMode,
  PAGE_SIZE,
}: {
  viewMode: ViewMode;
  PAGE_SIZE: number;
}) => {
  return (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4"
          : "grid gap-3 lg:grid-cols-2"
      }
      aria-label="Loading Pokémon"
    >
      {Array.from({ length: PAGE_SIZE }, (_, index) => (
        <div
          key={index}
          className={`animate-pulse rounded-3xl border border-stone-200 bg-white dark:border-white/10 dark:bg-white/5 ${
            viewMode === "grid" ? "aspect-4/5" : "h-26"
          }`}
        />
      ))}
    </div>
  );
};
