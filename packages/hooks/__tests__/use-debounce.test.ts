import { renderHook, act } from '@testing-library/react';

import { useDebounce } from '../src/use-debounce';

const DELAY_MS = 500;

// Mock timers
jest.useFakeTimers();

describe('useDebounce', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', DELAY_MS));

    expect(result.current).toBe('initial');
  });

  it('should debounce value changes', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: DELAY_MS },
    });

    expect(result.current).toBe('initial');

    // Change value
    rerender({ value: 'updated', delay: DELAY_MS });
    expect(result.current).toBe('initial'); // Still old value

    // Fast forward time
    act(() => {
      jest.advanceTimersByTime(DELAY_MS);
    });

    expect(result.current).toBe('updated');
  });

  it('should cancel previous timeout on rapid changes', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: DELAY_MS },
    });

    // Rapid changes
    rerender({ value: 'change1', delay: DELAY_MS });
    rerender({ value: 'change2', delay: DELAY_MS });
    rerender({ value: 'final', delay: DELAY_MS });

    // Advance time
    act(() => {
      jest.advanceTimersByTime(DELAY_MS);
    });

    expect(result.current).toBe('final');
  });
});
