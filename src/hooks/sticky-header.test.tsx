import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, test } from 'vitest';

import { useStickyHeader } from './sticky-header';

describe('useStickyHeader', () => {
  beforeEach(() => {
    window.scrollY = 0;
  });

  test('should not be sticky at the initial scroll position', () => {
    const { result } = renderHook(() => useStickyHeader(100));

    expect(result.current).toBe(false);
  });

  test('should become sticky when scrolled past the offset', () => {
    const { result } = renderHook(() => useStickyHeader(100));

    act(() => {
      window.scrollY = 150;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(true);
  });

  test('should not become sticky when scrolled back above the offset', () => {
    const { result } = renderHook(() => useStickyHeader(100));

    act(() => {
      window.scrollY = 150;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(true);

    act(() => {
      window.scrollY = 50;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(false);
  });

  test('should allow dynamic offset', () => {
    const { result, rerender } = renderHook(
      ({ offset }) => useStickyHeader(offset),
      {
        initialProps: { offset: 100 },
      }
    );

    act(() => {
      window.scrollY = 150;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(true);

    rerender({ offset: 200 });

    act(() => {
      window.scrollY = 150;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(false);
  });
});
