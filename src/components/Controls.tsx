import { Grid2x2, List, Search } from "lucide-react";
import type { PokemonFilter, ViewMode } from "@/@types/pokemon";

interface ControlsProps {
  search: string;
  filter: PokemonFilter;
  viewMode: ViewMode;
  onSearchChange: (value: string) => void;
  onFilterChange: (filter: PokemonFilter) => void;
  onViewModeChange: (mode: ViewMode) => void;
}

const FILTERS: PokemonFilter[] = ["all", "captured"];

const Controls = ({
  search,
  filter,
  viewMode,
  onSearchChange,
  onFilterChange,
  onViewModeChange,
}: ControlsProps) => {
  return (
    <section
      className="mb-7 rounded-3xl border border-stone-200 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-4"
      aria-label="Pokédex controls"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">Search Pokémon by name or number</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by name or Pokédex number..."
            className="h-12 w-full rounded-2xl border border-stone-200 bg-stone-50 pl-12 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 dark:border-white/10 dark:bg-slate-900"
          />
        </label>
        <div className="flex items-center justify-between gap-3">
          <div className="flex rounded-xl bg-stone-100 p-1 dark:bg-white/5">
            {FILTERS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onFilterChange(item)}
                className={`rounded-lg px-4 py-2 text-sm font-bold capitalize transition ${
                  filter === item
                    ? "bg-white text-slate-950 shadow-sm dark:bg-slate-700 dark:text-white"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
                aria-pressed={filter === item}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="flex rounded-xl bg-stone-100 p-1 dark:bg-white/5">
            <ViewButton
              mode="grid"
              current={viewMode}
              label="Grid view"
              onClick={() => onViewModeChange("grid")}
            >
              <Grid2x2 className="size-4" />
            </ViewButton>
            <ViewButton
              mode="list"
              current={viewMode}
              label="List view"
              onClick={() => onViewModeChange("list")}
            >
              <List className="size-4" />
            </ViewButton>
          </div>
        </div>
      </div>
    </section>
  );
};

const ViewButton = ({
  mode,
  current,
  label,
  onClick,
  children,
}: {
  mode: ViewMode;
  current: ViewMode;
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`grid size-9 place-items-center rounded-lg transition ${
        current === mode
          ? "bg-white text-slate-950 shadow-sm dark:bg-slate-700 dark:text-white"
          : "text-slate-400 hover:text-slate-900 dark:hover:text-white"
      }`}
      aria-label={label}
      aria-pressed={current === mode}
    >
      {children}
    </button>
  );
};

export default Controls;
