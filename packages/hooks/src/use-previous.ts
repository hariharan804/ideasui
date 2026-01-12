import { useRef, useEffect } from 'react';

/**
 * Custom hook for tracking previous value
 *
 * @param {T} value - Current value to track
 * @returns {T | undefined} Previous value
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

  // eslint-disable-next-line react-hooks/refs
  return ref.current;
}
