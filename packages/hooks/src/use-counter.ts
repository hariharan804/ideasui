import {useState, useCallback} from "react";

export interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  set: (value: number) => void;
}

/**
 * Custom hook for managing counter state with increment, decrement, reset, and set operations
 *
 * @param initialValue - Initial counter value
 * @param step - Step size for increment/decrement operations
 * @returns Counter state and control functions
 *
 * @default initialValue 0
 * @default step 1
 *
 * @example
 * ```tsx
 * // Basic usage
 * const {count, increment, decrement, reset} = useCounter(0, 1)
 *
 * // With custom initial value and step
 * const {count, increment, decrement, set} = useCounter(10, 5)
 * ```
 *
 * @see {@link https://react.dev/reference/react/useState} for useState reference
 * @see {@link https://react.dev/reference/react/useCallback} for useCallback reference
 *
 * @since 1.0.0
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