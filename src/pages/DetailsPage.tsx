import { useQuery } from "@tanstack/react-query";
import { type FormEvent, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import StatePanel from "@/components/ui/StatePanel";
import { ArrowLeft, Check } from "lucide-react";
import { useCapturedPokemon } from "@/context/CapturedPokemonContext";
import {
  formatDate,
  formatName,
  formatPokemonNumber,
  today,
} from "../lib/utils";
import { getPokemon } from "@/services/pokeAPI";

const DetailsPage = () => {
  const { id: idParam } = useParams();
  const id = Number(idParam);
  const isValidId = Number.isInteger(id) && id >= 1 && id <= 151;

  if (!isValidId) return <Navigate to="/" replace />;
  return <PokemonDetailsContent id={id} />;
};

const PokemonDetailsContent = ({ id }: { id: number }) => {
  const { findCaptured, saveCaptured, removeCaptured } = useCapturedPokemon();
  const existing = findCaptured(id);
  const [nickname, setNickname] = useState(existing?.nickname ?? "");
  const [date, setDate] = useState(existing?.date ?? today());
  const [error, setError] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  const pokemonQuery = useQuery({
    queryKey: ["pokemon", "detail", id],
    queryFn: ({ signal }) => getPokemon(id, signal),
    staleTime: 30 * 60 * 1000,
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanNickname = nickname.trim();
    if (!cleanNickname) {
      setError("Enter a nickname for your Pokémon.");
      return;
    }
    if (cleanNickname.length > 24) {
      setError("Nickname must be 24 characters or fewer.");
      return;
    }
    if (!date) {
      setError("Choose a capture date.");
      return;
    }
    if (date > today()) {
      setError("Capture date cannot be in the future.");
      return;
    }

    saveCaptured({ pokemonId: id, nickname: cleanNickname, date });
    setNickname(cleanNickname);
    setError("");
    setSavedMessage(existing ? "Capture updated." : "Added to your captures.");
  }

  if (pokemonQuery.isPending) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="h-130 animate-pulse rounded-4xl bg-stone-200 dark:bg-white/5" />
      </div>
    );
  }

  if (pokemonQuery.isError) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <StatePanel
          title="Unable to load Pokémon"
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
      </div>
    );
  }

  const pokemon = pokemonQuery.data;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <Link
        to="/"
        className="mb-7 inline-flex items-center gap-2 rounded-full text-sm font-bold text-slate-600 transition hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500 dark:text-slate-300"
      >
        <ArrowLeft className="size-4" />
        Back to Pokédex
      </Link>

      <div className="overflow-hidden rounded-4xl border border-stone-200 bg-white shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-white/5">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <section className="relative flex min-h-105 flex-col overflow-hidden bg-red-600 p-6 text-white sm:p-10 lg:min-h-145">
            <div className="absolute -right-24 -top-24 size-80 rounded-full border-[52px] border-white/10" />
            <div className="absolute -bottom-28 -left-28 size-80 rounded-full border-[52px] border-slate-950/10" />
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <span className="font-mono text-sm font-bold tracking-wider text-white/75">
                  {formatPokemonNumber(pokemon.id)}
                </span>
                <h1 className="font-display text-4xl font-bold sm:text-5xl">
                  {formatName(pokemon.name)}
                </h1>
              </div>
              {existing && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-emerald-700">
                  <Check className="size-4" />
                  Captured
                </span>
              )}
            </div>
            <div className="relative z-10 grid flex-1 place-items-center">
              <img
                src={pokemon.imageUrl}
                alt={`${formatName(pokemon.name)} sprite`}
                className="w-full max-w-sm object-contain [image-rendering:pixelated] drop-shadow-2xl"
              />
            </div>
            <div className="relative z-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <DetailStat label="Height" value={`${pokemon.height / 10} m`} />
              <DetailStat label="Weight" value={`${pokemon.weight / 10} kg`} />
              <DetailStat label="Type" value={formatName(pokemon.types[0])} />
              <DetailStat
                label="Ability"
                value={formatName(pokemon.abilities[0])}
              />
            </div>
          </section>

          <section className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
            <div className="mb-8">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-red-600">
                Capture record
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold">
                {existing ? "Update your catch" : "Got one? Tag it."}
              </h2>
              <p className="mt-3 leading-7 text-slate-500 dark:text-slate-400">
                {existing
                  ? `${formatName(pokemon.name)} was captured as ${existing.nickname} on ${formatDate(existing.date)}.`
                  : "Give your new companion a nickname and record the day you met."}
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-bold">Nickname</span>
                <input
                  type="text"
                  value={nickname}
                  onChange={(event) => {
                    setNickname(event.target.value);
                    setError("");
                    setSavedMessage("");
                  }}
                  maxLength={24}
                  autoComplete="off"
                  placeholder="e.g. Leafy"
                  className="h-12 w-full rounded-xl border border-stone-300 bg-stone-50 px-4 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/10 dark:border-white/15 dark:bg-slate-900"
                  aria-describedby={error ? "form-error" : undefined}
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-bold">
                  Capture date
                </span>
                <input
                  type="date"
                  value={date}
                  max={today()}
                  onChange={(event) => {
                    setDate(event.target.value);
                    setError("");
                    setSavedMessage("");
                  }}
                  className="h-12 w-full rounded-xl border border-stone-300 bg-stone-50 px-4 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/10 dark:border-white/15 dark:bg-slate-900"
                />
              </label>

              <div className="min-h-6" aria-live="polite">
                {error && (
                  <p
                    id="form-error"
                    className="text-sm font-semibold text-red-600"
                  >
                    {error}
                  </p>
                )}
                {savedMessage && (
                  <p className="text-sm font-semibold text-emerald-600">
                    {savedMessage}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  className="flex-1 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 dark:bg-white dark:text-slate-950 dark:hover:bg-red-600 dark:hover:text-white"
                >
                  {existing ? "Update capture" : "Tag as captured"}
                </button>
                {existing && (
                  <button
                    type="button"
                    onClick={() => {
                      removeCaptured(id);
                      setSavedMessage("Removed from your captures.");
                    }}
                    className="rounded-full border border-stone-300 px-5 py-3 text-sm font-bold text-slate-600 transition hover:border-red-300 hover:text-red-600 dark:border-white/15 dark:text-slate-300"
                  >
                    Remove
                  </button>
                )}
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

interface DetailStatProps {
  label: string;
  value: string;
}

const DetailStat = ({ label, value }: DetailStatProps) => {
  return (
    <div className="rounded-2xl bg-white/12 px-3 py-3 backdrop-blur-sm">
      <div className="text-xs text-white/65">{label}</div>
      <div className="mt-1 truncate text-sm font-bold">{value}</div>
    </div>
  );
};

export default DetailsPage;
