import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import StatePanel from "@/components/ui/StatePanel";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useCapturedPokemon } from "@/context/CapturedPokemonContext";
import { formatDate, formatName, formatPokemonNumber } from "../lib/utils";
import { getPokemonList } from "@/services/pokeAPI";
import { GEN_ONE_COUNT } from "@/hooks/usePokedexPokemon";

const CapturedPage = () => {
  const { captured } = useCapturedPokemon();
  const pokemonQuery = useQuery({
    queryKey: ["pokemon", "generation-one"],
    queryFn: ({ signal }) => getPokemonList(GEN_ONE_COUNT, 0, signal),
    staleTime: 30 * 60 * 1000,
    enabled: captured.length > 0,
  });

  const pokemonById = new Map(
    pokemonQuery.data?.results.map((pokemon) => [pokemon.id, pokemon]),
  );

  return (
    <div className="mx-auto min-h-[calc(100vh-9rem)] max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Link
        to="/"
        className="mb-7 inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-red-600 dark:text-slate-300"
      >
        <ArrowLeft className="size-4" />
        Back to Pokédex
      </Link>
      <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-red-600">
            Trainer collection
          </span>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Your captures
          </h1>
          <p className="mt-3 text-slate-500 dark:text-slate-400">
            Every adventure deserves a record.
          </p>
        </div>
        {captured.length > 0 && (
          <div className="flex items-center gap-3 rounded-2xl bg-emerald-100 px-4 py-3 text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-300">
            <Check className="size-5" />
            <span className="text-sm font-bold">
              {captured.length} of {GEN_ONE_COUNT} captured
            </span>
          </div>
        )}
      </div>

      {captured.length === 0 ? (
        <StatePanel
          title="Your collection is waiting"
          description="You haven’t captured any Pokémon yet. Explore the Pokédex and tag your first companion."
          action={
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
            >
              Explore the Pokédex
              <ArrowRight className="size-4" />
            </Link>
          }
        />
      ) : pokemonQuery.isPending ? (
        <div className="grid gap-4 md:grid-cols-2">
          {captured.map(({ pokemonId }) => (
            <div
              key={pokemonId}
              className="h-34 animate-pulse rounded-3xl bg-stone-200 dark:bg-white/5"
            />
          ))}
        </div>
      ) : pokemonQuery.isError ? (
        <StatePanel
          title="Unable to load your collection"
          description={pokemonQuery.error.message}
          action={
            <button
              type="button"
              onClick={() => pokemonQuery.refetch()}
              className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-bold text-white"
            >
              Try again
            </button>
          }
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {captured.map((record) => {
            const pokemon = pokemonById.get(record.pokemonId);
            if (!pokemon) return null;
            return (
              <Link
                key={record.pokemonId}
                to={`/pokemon/${record.pokemonId}`}
                className="group flex items-center gap-4 rounded-3xl border border-stone-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-red-200 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 dark:border-white/10 dark:bg-white/5"
              >
                <div className="grid size-24 shrink-0 place-items-center rounded-2xl bg-red-50 dark:bg-red-500/10">
                  <img
                    src={pokemon.imageUrl}
                    alt={`${formatName(pokemon.name)} sprite`}
                    className="size-22 object-contain [image-rendering:pixelated]"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-mono text-xs font-bold text-red-600">
                    {formatPokemonNumber(pokemon.id)}
                  </span>
                  <h2 className="truncate font-display text-xl font-bold">
                    {formatName(pokemon.name)}
                  </h2>
                  <p className="mt-1 truncate text-sm text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-200">
                      {record.nickname}
                    </span>
                    {" · "}
                    {formatDate(record.date)}
                  </p>
                </div>
                <ArrowRight className="size-5 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-red-600" />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CapturedPage;
