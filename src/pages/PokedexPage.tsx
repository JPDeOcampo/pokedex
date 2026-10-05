import { PokemonSkeletons } from "@/components/ui/Loading";
import Controls from "@/components/Controls";
import Hero from "@/components/Hero";
import Pagination from "@/components/Pagination";
import Result from "@/components/Result";
import { EmptyState, ErrorState } from "@/components/States";
import PokemonGrid from "@/components/Grid";
import {
  GEN_ONE_COUNT,
  PAGE_SIZE,
  usePokedexPokemon,
} from "@/hooks/usePokedexPokemon";

const PokedexPage = () => {
  const {
    page,
    search,
    filter,
    viewMode,
    setViewMode,
    capturedIds,
    isClientMode,
    filteredPokemon,
    visiblePokemon,
    totalPages,
    activeQuery,
    handleSearchChange,
    handleFilterChange,
    changePage,
    clearFilters,
  } = usePokedexPokemon();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Hero capturedCount={capturedIds.size} totalCount={GEN_ONE_COUNT} />

      <Controls
        search={search}
        filter={filter}
        viewMode={viewMode}
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
        onViewModeChange={setViewMode}
      />

      <Result
        isPending={activeQuery.isPending}
        isFetching={activeQuery.isFetching}
        isClientMode={isClientMode}
        filteredCount={filteredPokemon.length}
        page={page}
        pageSize={PAGE_SIZE}
        totalCount={GEN_ONE_COUNT}
      />

      {activeQuery.isPending ? (
        <PokemonSkeletons viewMode={viewMode} PAGE_SIZE={PAGE_SIZE} />
      ) : activeQuery.isError ? (
        <ErrorState
          message={
            activeQuery.error instanceof Error
              ? activeQuery.error.message
              : "Check your connection and try again."
          }
          onRetry={() => activeQuery.refetch()}
        />
      ) : visiblePokemon.length === 0 ? (
        <EmptyState filter={filter} search={search} onClear={clearFilters} />
      ) : (
        <>
          <PokemonGrid
            pokemon={visiblePokemon}
            capturedIds={capturedIds}
            viewMode={viewMode}
          />
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={changePage}
          />
        </>
      )}
    </div>
  );
};

export default PokedexPage;
