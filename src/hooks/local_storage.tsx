import { useEffect, useState } from 'react';

function useLocalStorage<T>(key: string, defaultValue: T) {
  const isClient = typeof window !== 'undefined';

  const [localStorageValue, setLocalStorageValue] = useState<T>(() => {
    if (!isClient) return defaultValue;

    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      try {
        return JSON.parse(storedValue);
      } catch {
        return storedValue;
      }
    }
    return defaultValue;
  });

  useEffect(() => {
    if (isClient) {
      localStorage.setItem(key, JSON.stringify(localStorageValue));
    }
  }, [key, localStorageValue, isClient]);

  const saveToLocalStorage = (value: T) => {
    setLocalStorageValue(value);
  };

  return [localStorageValue, saveToLocalStorage] as const;
}

export default useLocalStorage;
