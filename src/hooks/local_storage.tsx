'use client';
import { useState } from 'react';

function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] {
  const isClient = typeof window !== 'undefined';
  const [value, setValue] = useState<T>(initValue());

  function initValue() {
    if (isClient) {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        try {
          return JSON.parse(storedValue);
        } catch (error) {
          console.error('Error parsing stored value:', error);
        }
      } else return defaultValue;
    }
  }

  function saveValue(value: T) {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event('storage'));
    setValue(value);
  }

  return [value, saveValue];
}

export default useLocalStorage;
