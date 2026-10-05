import { Link } from "react-router-dom";
import { formatName, formatPokemonNumber } from "@/lib/utils";
import type { PokemonListItem, ViewMode } from "@/@types/pokemon";
import { ArrowRight, Check } from "lucide-react";
interface PokemonCardProps {
  pokemon: PokemonListItem;
  isCaptured: boolean;
  viewMode: ViewMode;
}

const PokemonCard = ({ pokemon, isCaptured, viewMode }: PokemonCardProps) => {
  if (viewMode === "list") {
    return (
      <Link
        to={`/pokemon/${pokemon.id}`}
        className="group flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-red-200 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 dark:border-white/10 dark:bg-white/5 dark:hover:border-red-500/40 sm:p-4"
      >
        <div className="grid size-18 shrink-0 place-items-center rounded-xl bg-stone-100 dark:bg-white/5 sm:size-22">
          <img
            src={pokemon.imageUrl}
            alt={`${formatName(pokemon.name)} sprite`}
            className="size-16 object-contain [image-rendering:pixelated] sm:size-20"
            loading="lazy"
          />
        </div>
        <div className="min-w-0 flex-1">
          <span className="font-mono text-xs font-bold tracking-wider text-red-600">
            {formatPokemonNumber(pokemon.id)}
          </span>
          <h2 className="truncate font-display text-lg font-bold sm:text-xl">
            {formatName(pokemon.name)}
          </h2>
        </div>
        {isCaptured && <CapturedBadge compact />}
        <ArrowRight className="size-5 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1" />
      </Link>
    );
  }

  return (
    <Link
      to={`/pokemon/${pokemon.id}`}
      className="group relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl hover:shadow-slate-900/8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 dark:border-white/10 dark:bg-white/5 dark:hover:border-red-500/40"
    >
      <div className="absolute -right-8 -top-10 size-28 rounded-full bg-red-50 transition-transform duration-300 group-hover:scale-125 dark:bg-red-500/10" />
      <div className="relative flex items-start justify-between">
        <span className="font-mono text-xs font-bold tracking-wider text-red-600">
          {formatPokemonNumber(pokemon.id)}
        </span>
        {isCaptured && <CapturedBadge compact />}
      </div>
      <div className="relative my-2 grid aspect-square place-items-center">
        <img
          src={pokemon.imageUrl}
          alt={`${formatName(pokemon.name)} sprite`}
          className="h-4/5 w-4/5 object-contain [image-rendering:pixelated] transition-transform duration-200 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="relative flex items-center justify-between gap-2">
        <h2 className="truncate font-display text-lg font-bold">
          {formatName(pokemon.name)}
        </h2>
        <ArrowRight className="size-5 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-red-600" />
      </div>
    </Link>
  );
};

const CapturedBadge = ({ compact = false }: { compact?: boolean }) => {
  return (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-300">
      <Check className="size-3.5" />
      <span className={compact ? "sr-only sm:not-sr-only" : ""}>Captured</span>
    </span>
  );
};

export default PokemonCard;
