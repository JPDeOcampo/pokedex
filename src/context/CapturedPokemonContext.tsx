import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { capturedPokemonStorage } from "@/services/capturePokemonStorage";
import type { CapturedPokemon } from "@/@types/pokemon";

interface CapturedPokemonContextValue {
  captured: CapturedPokemon[];
  capturedIds: Set<number>;
  findCaptured: (pokemonId: number) => CapturedPokemon | undefined;
  saveCaptured: (record: CapturedPokemon) => void;
  removeCaptured: (pokemonId: number) => void;
}

const CapturedPokemonContext =
  createContext<CapturedPokemonContextValue | null>(null);

export const CapturedPokemonProvider = ({ children }: PropsWithChildren) => {
  const [captured, setCaptured] = useState(capturedPokemonStorage.read);

  const saveCaptured = useCallback((record: CapturedPokemon) => {
    setCaptured((current) => {
      const next = [
        ...current.filter((item) => item.pokemonId !== record.pokemonId),
        record,
      ].sort((a, b) => a.pokemonId - b.pokemonId);
      capturedPokemonStorage.write(next);
      return next;
    });
  }, []);

  const removeCaptured = useCallback((pokemonId: number) => {
    setCaptured((current) => {
      const next = current.filter((item) => item.pokemonId !== pokemonId);
      capturedPokemonStorage.write(next);
      return next;
    });
  }, []);

  const capturedIds = useMemo(
    () => new Set(captured.map(({ pokemonId }) => pokemonId)),
    [captured],
  );

  const findCaptured = useCallback(
    (pokemonId: number) =>
      captured.find((item) => item.pokemonId === pokemonId),
    [captured],
  );

  const value = useMemo(
    () => ({
      captured,
      capturedIds,
      findCaptured,
      saveCaptured,
      removeCaptured,
    }),
    [captured, capturedIds, findCaptured, removeCaptured, saveCaptured],
  );

  return (
    <CapturedPokemonContext.Provider value={value}>
      {children}
    </CapturedPokemonContext.Provider>
  );
};

export const useCapturedPokemon = () => {
  const context = useContext(CapturedPokemonContext);
  if (!context) {
    throw new Error(
      "useCapturedPokemon must be used within CapturedPokemonProvider",
    );
  }
  return context;
};
