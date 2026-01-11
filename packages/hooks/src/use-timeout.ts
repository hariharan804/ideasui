import { useEffect, useRef } from 'react';

/**
 * Custom hook for setting up timeouts
 *
 * @param callback - Function to call after delay
 * @param delay - Delay in milliseconds (null to cancel)
 *
 * @example
 * ```tsx
 * useTimeout(() => setVisible(false), 3000)
 * ```
 */
export function useTimeout(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;

    const id = setTimeout(() => savedCallback.current?.(), delay);
    return () => clearTimeout(id);
  }, [delay]);
}
