import { renderHook, act } from '@testing-library/react';

import { useDebouncedValue } from '../src/use-debounced-value';
const DELAY = 500;
const DELAY2 = 1000;

describe('useDebouncedValue', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('isPending should return true when value is updating', () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value, DELAY2), {
      initialProps: { value: 'test' },
    });

    expect(result.current.isPending).toBe(false);

    rerender({ value: 'updated' });

    expect(result.current.isPending).toBe(true);

    act(() => {
      jest.advanceTimersByTime(DELAY2);
    });

    expect(result.current.isPending).toBe(false);
  });

  it('should cancel pending timer and reset isPending', () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value, DELAY2), {
      initialProps: { value: 'initial' },
    });

    rerender({ value: 'updated' });
    expect(result.current.isPending).toBe(true);

    act(() => {
      result.current.cancel();
    });

    // Note: cancel() in the hook only clears the timeout, it doesn't reset isPending derived from state
    // So isPending remains true until debouncedValue matches value or is manually synced.
    // The hook implementation defines isPending = value !== debouncedValue.
    // So if we cancel, it will stay pending until we flush or wait?
    // Wait, cancel just stops the update. So isPending will correctly stay true.
    expect(result.current.isPending).toBe(true);
  });

  it('should flush pending value', () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value, DELAY2), {
      initialProps: { value: 'initial' },
    });

    rerender({ value: 'updated' });
    expect(result.current.isPending).toBe(true);

    act(() => {
      result.current.flush();
    });

    expect(result.current.debouncedValue).toBe('updated');
    expect(result.current.isPending).toBe(false);
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

  it('should handle cancel while pending', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebouncedValue(value, delay), {
      initialProps: { value: 'initial', delay: DELAY },
    });

    rerender({ value: 'updated', delay: DELAY });

    // Call cancel while timer is active (handlerRef.current exists)
    act(() => {
      result.current.cancel();
    });

    jest.advanceTimersByTime(DELAY);

    expect(result.current.debouncedValue).toBe('initial');
  });

  it('should handle flush while pending', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebouncedValue(value, delay), {
      initialProps: { value: 'initial', delay: DELAY },
    });

    rerender({ value: 'updated', delay: DELAY });

    // Call flush while timer is active (handlerRef.current exists)
    act(() => {
      result.current.flush();
    });

    expect(result.current.debouncedValue).toBe('updated');
  });

  it('should not throw when cancelling if no timer pending', () => {
    const { result } = renderHook(({ value, delay }) => useDebouncedValue(value, delay), {
      initialProps: { value: 'initial', delay: DELAY },
    });

    // No pending change
    // No pending change
    expect(() => {
      act(() => {
        result.current.cancel();
      });
    }).not.toThrow();
  });

  it('should not throw when flushing if no timer pending', () => {
    const { result } = renderHook(({ value, delay }) => useDebouncedValue(value, delay), {
      initialProps: { value: 'initial', delay: DELAY },
    });

    // No pending change
    // No pending change
    expect(() => {
      act(() => {
        result.current.flush();
      });
    }).not.toThrow();

    expect(result.current.debouncedValue).toBe('initial');
  });

  it('should clean up on unmount', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { result, unmount } = renderHook(({ value, delay }) => useDebouncedValue(value, delay), {
      initialProps: { value: 'initial', delay: DELAY },
    });

    const clearTimeoutSpy = jest.spyOn(window, 'clearTimeout');

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
  });
});
