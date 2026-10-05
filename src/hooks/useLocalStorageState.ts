import { useState } from "react";

export const useLocalStorageState = <T>(
  key: string,
  fallback: T,
  isValid: (value: unknown) => value is T,
) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(key) ?? "null");
      return isValid(saved) ? saved : fallback;
    } catch {
      return fallback;
    }
  });

  const updateValue = (next: T) => {
    setValue(next);
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch {
      console.warn("Unable to save state to local storage.");
    }
  };

  return [value, updateValue] as const;
};
