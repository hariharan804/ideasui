import {useState, useCallback} from "react";

export interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  set: (value: number) => void;
}

/**
 * Custom hook for managing counter state
 *
 * @param initialValue - Initial counter value
 * @param step - Step size for increment/decrement
 * @returns Counter state and handlers
 *
 * @example
 * ```tsx
 * const {count, increment, decrement, reset} = useCounter(0, 1)
 * ```
 */
export function useCounter(initialValue = 0, step = 1): UseCounterReturn {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => setCount((prev) => prev + step), [step]);
  const decrement = useCallback(() => setCount((prev) => prev - step), [step]);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  const set = useCallback((value: number) => setCount(value), []);

  return {
    count,
    increment,
    decrement,
    reset,
    set,
  };
}