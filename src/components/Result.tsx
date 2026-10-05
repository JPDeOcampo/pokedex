interface ResultProps {
  isPending: boolean;
  isFetching: boolean;
  isClientMode: boolean;
  filteredCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
}

const Result = ({
  isPending,
  isFetching,
  isClientMode,
  filteredCount,
  page,
  pageSize,
  totalCount,
}: ResultProps) => {
  return (
    <div className="mb-4 flex items-center justify-between">
      <p
        className="text-sm text-slate-500 dark:text-slate-400"
        aria-live="polite"
      >
        {isPending
          ? "Searching the tall grass..."
          : isClientMode
            ? `${filteredCount} Pokémon found`
            : `Showing ${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, totalCount)} of ${totalCount}`}
      </p>
      {isFetching && !isPending && (
        <span className="text-xs font-bold text-red-600">Updating…</span>
      )}
    </div>
  );
};

export default Result;
