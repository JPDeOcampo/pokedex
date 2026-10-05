import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useCapturedPokemon } from "@/context/CapturedPokemonContext";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { getPokemonList } from "@/services/pokeAPI";
import type { PokemonFilter, ViewMode } from "@/@types/pokemon";

export const PAGE_SIZE = 12;
export const GEN_ONE_COUNT = 150;

const isViewMode = (value: unknown): value is ViewMode => {
  return value === "grid" || value === "list";
};

export const usePokedexPokemon = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<PokemonFilter>("all");
  const [viewMode, setViewMode] = useLocalStorageState<ViewMode>(
    "pokedex.view",
    "grid",
    isViewMode,
  );
  const { capturedIds } = useCapturedPokemon();

  const normalizedSearch = search.trim().toLowerCase().replace(/^#/, "");
  const isClientMode = normalizedSearch.length > 0 || filter === "captured";

  const pageQuery = useQuery({
    queryKey: ["pokemon", "page", page],
    queryFn: ({ signal }) =>
      getPokemonList(
        Math.min(PAGE_SIZE, GEN_ONE_COUNT - (page - 1) * PAGE_SIZE),
        (page - 1) * PAGE_SIZE,
        signal,
      ),
    placeholderData: keepPreviousData,
    staleTime: 10 * 60 * 1000,
    enabled: !isClientMode,
  });

  const indexQuery = useQuery({
    queryKey: ["pokemon", "generation-one"],
    queryFn: ({ signal }) => getPokemonList(GEN_ONE_COUNT, 0, signal),
    staleTime: 30 * 60 * 1000,
    enabled: isClientMode,
  });

  const filteredPokemon = useMemo(() => {
    if (!isClientMode) return pageQuery.data?.results ?? [];
    return (indexQuery.data?.results ?? []).filter((pokemon) => {
      const matchesCaptured = filter === "all" || capturedIds.has(pokemon.id);
      const matchesSearch =
        normalizedSearch.length === 0 ||
        pokemon.name.includes(normalizedSearch) ||
        pokemon.id.toString() === normalizedSearch;
      return matchesCaptured && matchesSearch;
    });
  }, [
    capturedIds,
    filter,
    indexQuery.data?.results,
    isClientMode,
    normalizedSearch,
    pageQuery.data?.results,
  ]);

  const clientTotalPages = Math.max(
    1,
    Math.ceil(filteredPokemon.length / PAGE_SIZE),
  );
  const totalPages = isClientMode
    ? clientTotalPages
    : Math.ceil(GEN_ONE_COUNT / PAGE_SIZE);

  const safePage = Math.min(page, totalPages);

  const visiblePokemon = isClientMode
    ? filteredPokemon.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)
    : filteredPokemon;

  const activeQuery = isClientMode ? indexQuery : pageQuery;

  const resetPage = () => {
    setPage(1);
  };

  const changePage = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages) return;
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    resetPage();
  };

  const handleFilterChange = (nextFilter: PokemonFilter) => {
    setFilter(nextFilter);
    resetPage();
  };

  const clearFilters = () => {
    setSearch("");
    setFilter("all");
    resetPage();
  };

  return {
    // state
    page: safePage,
    rawPage: page,
    search,
    filter,
    viewMode,
    setViewMode,
    capturedIds,
    // derived
    isClientMode,
    filteredPokemon,
    visiblePokemon,
    totalPages,
    activeQuery,
    // actions
    handleSearchChange,
    handleFilterChange,
    changePage,
    clearFilters,
  };
};
