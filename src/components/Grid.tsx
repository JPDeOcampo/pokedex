import PokemonCard from "@/components/ui/PokemonCard";
import type { PokemonListItem, ViewMode } from "@/@types/pokemon";

interface GridProps {
  pokemon: PokemonListItem[];
  capturedIds: Set<number>;
  viewMode: ViewMode;
}

const Grid = ({ pokemon, capturedIds, viewMode }: GridProps) => {
  return (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4"
          : "grid gap-3 lg:grid-cols-2"
      }
    >
      {pokemon.map((item) => (
        <PokemonCard
          key={item.id}
          pokemon={item}
          isCaptured={capturedIds.has(item.id)}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
};

export default Grid;
