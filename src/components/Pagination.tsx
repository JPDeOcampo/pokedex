import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const getPageNumbers = (page: number, totalPages: number): number[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (page <= 4) return [1, 2, 3, 4, 5, totalPages];
  if (page >= totalPages - 3) {
    return [
      1,
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }
  return [1, page - 1, page, page + 1, totalPages];
};

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;
  const pages = getPageNumbers(page, totalPages);

  return (
    <nav
      className="mt-8 flex items-center justify-center gap-2"
      aria-label="Pokédex pagination"
    >
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="grid size-10 place-items-center rounded-xl border border-stone-200 bg-white transition hover:border-red-300 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:bg-white/5"
        aria-label="Previous page"
      >
        <ChevronLeft className="size-5" />
      </button>
      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          onClick={() => onPageChange(pageNumber)}
          aria-current={pageNumber === page ? "page" : undefined}
          className={`h-10 min-w-10 rounded-xl px-2 text-sm font-bold transition ${
            pageNumber === page
              ? "bg-red-600 text-white shadow-sm"
              : "border border-stone-200 bg-white hover:border-red-300 hover:text-red-600 dark:border-white/10 dark:bg-white/5"
          }`}
        >
          {pageNumber}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="grid size-10 place-items-center rounded-xl border border-stone-200 bg-white transition hover:border-red-300 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:bg-white/5"
        aria-label="Next page"
      >
        <ChevronRight className="size-5" />
      </button>
    </nav>
  );
};

export default Pagination;
