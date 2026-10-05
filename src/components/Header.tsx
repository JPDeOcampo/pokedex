import { NavLink } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { BallIcon } from "@/components/ui/Icons";
import { useCapturedPokemon } from "@/context/CapturedPokemonContext";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500",
    isActive
      ? "bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-950"
      : "text-slate-600 hover:bg-stone-200/70 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white",
  ].join(" ");

const Header = () => {
  const { captured } = useCapturedPokemon();
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-stone-50/90 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <NavLink
          to="/"
          aria-label="Pokédex"
          className="group flex items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500"
        >
          <span className="grid size-10 place-items-center rounded-full bg-red-600 text-white shadow-lg shadow-red-600/20 transition-transform duration-300 group-hover:-rotate-12">
            <BallIcon className="size-6" aria-hidden="true" />
          </span>

          <span className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Poke<span className="text-red-600">dex</span>
          </span>
        </NavLink>

        {/* Navigation */}
        <nav
          className="flex items-center gap-1.5 sm:gap-2"
          aria-label="Primary navigation"
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${navLinkClass({ isActive })} hidden sm:block`
            }
          >
            Pokédex
          </NavLink>

          <NavLink
            to="/captured"
            className={({ isActive }) =>
              `${navLinkClass({ isActive })} flex items-center gap-2 px-3 sm:px-4`
            }
          >
            <span>Captured</span>

            <span
              aria-label="0 Pokémon captured"
              className="grid min-w-5 place-items-center rounded-full bg-red-600 px-1.5 py-0.5 text-xs font-bold leading-none text-white"
            >
              {captured.length}
            </span>
          </NavLink>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${isLight ? "dark" : "light"} theme`}
            className="grid size-10 place-items-center rounded-full border border-stone-200 bg-white text-slate-700 transition-all duration-200 hover:border-stone-300 hover:bg-stone-100 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-white/20 dark:hover:bg-white/10"
          >
            {isLight ? (
              <Moon className="size-5" aria-hidden="true" />
            ) : (
              <Sun className="size-5" aria-hidden="true" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
