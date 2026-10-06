import type { CapturedPokemon } from "@/@types/pokemon";
import { GEN_ONE_COUNT } from "@/hooks/usePokedexPokemon";

const STORAGE_KEY = "pokedex.captured.v1";

const isCapturedPokemon = (value: unknown): value is CapturedPokemon => {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    Number.isInteger(item.pokemonId) &&
    Number(item.pokemonId) >= 1 &&
    Number(item.pokemonId) <= GEN_ONE_COUNT &&
    typeof item.nickname === "string" &&
    typeof item.date === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(item.date)
  );
};

export const capturedPokemonStorage = {
  read(): CapturedPokemon[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed: unknown = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed.filter(isCapturedPokemon) : [];
    } catch {
      return [];
    }
  },

  write(captured: CapturedPokemon[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(captured));
    } catch {
      console.warn("Unable to save captured Pokémon to local storage.");
    }
  },
};
