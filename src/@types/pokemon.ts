export interface PokemonListItem {
  id: number;
  name: string;
  url: string;
  imageUrl: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: string[];
  abilities: string[];
  imageUrl: string;
}

export interface CapturedPokemon {
  pokemonId: number;
  nickname: string;
  date: string;
}

export type ViewMode = "grid" | "list";
export type PokemonFilter = "all" | "captured";
