import {useRef, useEffect} from "react";

/**
 * Custom hook for tracking previous value
 *
 * @param value - Current value to track
 * @returns Previous value
 *
 * @example
 * ```tsx
 * const prevCount = usePrevious(count)
 * ```
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
