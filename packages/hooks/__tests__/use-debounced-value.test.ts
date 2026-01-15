import { renderHook, act } from '@testing-library/react';

import { useDebouncedValue } from '../src/use-debounced-value';
const DELAY = 500;

describe('useDebouncedValue', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should debounce value', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebouncedValue(value, delay), {
      initialProps: { value: 'initial', delay: DELAY },
    });

    expect(result.current.debouncedValue).toBe('initial');
    expect(result.current.isPending).toBe(false);

    rerender({ value: 'updated', delay: DELAY });

    expect(result.current.debouncedValue).toBe('initial');
    expect(result.current.isPending).toBe(true);

    act(() => {
      jest.advanceTimersByTime(DELAY);
    });

    expect(result.current.debouncedValue).toBe('updated');
    expect(result.current.isPending).toBe(false);
  });

  it('should cancel debounce', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebouncedValue(value, delay), {
      initialProps: { value: 'initial', delay: DELAY },
    });

    rerender({ value: 'updated', delay: DELAY });

    act(() => {
      result.current.cancel();
      jest.advanceTimersByTime(DELAY);
    });

    expect(result.current.debouncedValue).toBe('initial');
  });

  it('should flush debounce', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebouncedValue(value, delay), {
      initialProps: { value: 'initial', delay: DELAY },
    });

    rerender({ value: 'updated', delay: DELAY });

    act(() => {
      result.current.flush();
    });

    expect(result.current.debouncedValue).toBe('updated');
  });
});
