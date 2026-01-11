import { useState, useEffect } from 'react';

/**
 * Custom hook for debouncing a value with additional controls
 *
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds
 * @returns Object with debounced value and control functions
 *
 * @example
 * ```tsx
 * const {debouncedValue, isPending, cancel, flush} = useDebouncedValue(searchTerm, 300)
 * ```
 */
export function useDebouncedValue<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setIsPending(true);

    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setIsPending(false);
    }, delay);

    return () => {
      clearTimeout(handler);
      setIsPending(false);
    };
  }, [value, delay]);

  const cancel = () => {
    setIsPending(false);
  };

  const flush = () => {
    setDebouncedValue(value);
    setIsPending(false);
  };

  return {
    debouncedValue,
    isPending,
    cancel,
    flush,
  };
}
