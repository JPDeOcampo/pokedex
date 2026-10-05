import StatePanel from "@/components/ui/StatePanel";
import type { PokemonFilter } from "@/@types/pokemon";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  return (
    <StatePanel
      title="Unable to load Pokémon"
      description={message}
      action={
        <button
          type="button"
          onClick={onRetry}
          className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
        >
          Try again
        </button>
      }
    />
  );
};

interface EmptyStateProps {
  filter: PokemonFilter;
  search: string;
  onClear: () => void;
}

export const EmptyState = ({ filter, search, onClear }: EmptyStateProps) => {
  return (
    <StatePanel
      title={
        filter === "captured"
          ? "No captured Pokémon found"
          : `No results for “${search.trim()}”`
      }
      description={
        filter === "captured"
          ? "Try another search, or explore the Pokédex and tag your first catch."
          : "Try a different Pokémon name or Pokédex number."
      }
      action={
        <button
          type="button"
          onClick={onClear}
          className="rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-bold transition hover:border-slate-400 dark:border-white/15 dark:bg-white/5"
        >
          Clear filters
        </button>
      }
    />
  );
};
