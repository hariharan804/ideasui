import {useState, useEffect} from "react";

/**
 * Custom hook for debouncing a value to prevent excessive updates or API calls
 *
 * @param value - The value to debounce (can be any type)
 * @param delay - Delay in milliseconds before updating the debounced value
 * @returns The debounced value that updates after the specified delay
 *
 * @default delay 300
 *
 * @example
 * ```tsx
 * // Basic usage for search input
 * const [searchTerm, setSearchTerm] = useState('')
 * const debouncedSearchTerm = useDebounce(searchTerm, 300)
 *
 * // Use debounced value for API calls
 * useEffect(() => {
 *   if (debouncedSearchTerm) {
 *     searchAPI(debouncedSearchTerm)
 *   }
 * }, [debouncedSearchTerm])
 * ```
 *
 * @usage Perfect for search inputs, form validation, or any scenario where you want to delay updates
 *
 * @see {@link https://react.dev/reference/react/useState} for useState reference
 * @see {@link https://react.dev/reference/react/useEffect} for useEffect reference
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/setTimeout} for setTimeout reference
 *
 * @since 1.0.0
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}