import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, test } from 'vitest';

import { Variable } from '@/types/types';

import useLocalStorage from '../../hooks/local_storage';

describe('useLocalStorage', () => {
  const key = 'testKey';
  const defaultValue: Variable[] = [
    {
      id: '#1',
      name: 'var1',
      value: 'val1',
    },
  ];

  beforeEach(() => {
    localStorage.clear();
  });

  test('initializes with default value when no value in localStorage', () => {
    const { result } = renderHook(() => useLocalStorage(key, defaultValue));
    expect(result.current).toBeDefined();
    expect(result.current[0]).toEqual(defaultValue);
  });

  test('receive value from localStorage if present', () => {
    const storedValue = JSON.stringify(defaultValue);
    localStorage.setItem(key, storedValue);
    const { result } = renderHook(() =>
      useLocalStorage<Variable[]>(key, defaultValue)
    );
    expect(result.current).toBeDefined();
    expect(result.current[0]).toEqual(defaultValue);
  });
  test('saves a new value to localStorage', () => {
    const { result } = renderHook(() =>
      useLocalStorage<Variable[]>(key, defaultValue)
    );

    const newValue: Variable[] = [
      {
        id: '#2',
        name: 'var2',
        value: 'val2',
      },
    ];

    act(() => {
      result.current[1](newValue);
    });
    expect(localStorage.getItem(key)).toEqual(JSON.stringify(newValue));
    expect(result.current[0]).toEqual(newValue);
  });
  test('handles JSON parsing errors', () => {
    localStorage.setItem(key, 'invalid JSON');
    const { result } = renderHook(() =>
      useLocalStorage<Variable[]>(key, defaultValue)
    );
    expect(result.current).toBeDefined();
  });
});
