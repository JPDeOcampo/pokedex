import type {
  PokemonDetails,
  PokemonListItem,
  PokemonListResponse,
} from "@/@types/pokemon";

const API_URL = import.meta.env.VITE_API_URL;
const SPRITE_URL = import.meta.env.VITE_SPRITE_URL;

interface ApiListItem {
  name: string;
  url: string;
}

interface ApiListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ApiListItem[];
}

interface ApiPokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Array<{ type: { name: string } }>;
  abilities: Array<{ ability: { name: string } }>;
}

const getPokemonId = (url: string): number => {
  const id = Number(url.split("/").filter(Boolean).at(-1));
  if (!Number.isInteger(id))
    throw new Error("The API returned an invalid Pokémon.");
  return id;
};

export const getPokemonImageUrl = (id: number): string => {
  return `${SPRITE_URL}/${id}.png`;
};

export const getPokemonList = async (
  limit: number,
  offset: number,
  signal?: AbortSignal,
): Promise<PokemonListResponse> => {
  const response = await fetch(
    `${API_URL}/pokemon/?limit=${limit}&offset=${offset}`,
    { signal },
  );

  if (!response.ok) {
    throw new Error("Unable to load Pokémon. Please try again.");
  }

  const data = (await response.json()) as ApiListResponse;
  const results: PokemonListItem[] = data.results.map((pokemon) => {
    const id = getPokemonId(pokemon.url);
    return {
      ...pokemon,
      id,
      imageUrl: getPokemonImageUrl(id),
    };
  });

  return { ...data, results };
};

export const getPokemon = async (
  id: number,
  signal?: AbortSignal,
): Promise<PokemonDetails> => {
  const response = await fetch(`${API_URL}/pokemon/${id}`, { signal });
  if (!response.ok) {
    throw new Error(
      response.status === 404
        ? "This Pokémon could not be found."
        : "Unable to load this Pokémon. Please try again.",
    );
  }

  const data = (await response.json()) as ApiPokemonDetails;
  return {
    id: data.id,
    name: data.name,
    height: data.height,
    weight: data.weight,
    types: data.types.map(({ type }) => type.name),
    abilities: data.abilities.map(({ ability }) => ability.name),
    imageUrl: getPokemonImageUrl(data.id),
  };
};
