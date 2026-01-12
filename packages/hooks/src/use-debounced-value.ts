import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for debouncing a value with additional controls
 *
 * @param {T} value - The value to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {{debouncedValue: T, isPending: boolean, cancel: () => void, flush: () => void}} Object with debounced value and control functions
 *
 * @example
 * ```tsx
 * const {debouncedValue, isPending, cancel, flush} = useDebouncedValue(searchTerm, 300)
 * ```
 */
export function useDebouncedValue<T>(
  value: T,
  delay: number,
): {
  debouncedValue: T;
  isPending: boolean;
  cancel: () => void;
  flush: () => void;
} {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const handlerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    handlerRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (handlerRef.current) {
        clearTimeout(handlerRef.current);
      }
    };
  }, [value, delay]);

  const cancel = (): void => {
    if (handlerRef.current) {
      clearTimeout(handlerRef.current);
    }
  };

  const flush = (): void => {
    if (handlerRef.current) {
      clearTimeout(handlerRef.current);
    }
    setDebouncedValue(value);
  };

  const isPending = value !== debouncedValue;

  return {
    debouncedValue,
    isPending,
    cancel,
    flush,
  };
}
