import { useEffect, useRef } from 'react';

/**
 * Custom hook for setting up intervals
 *
 * @param {() => void} callback - Function to call on each interval
 * @param {number | null} delay - Delay in milliseconds (null to pause)
 *
 * @example
 * ```tsx
 * useInterval(() => setCount(c => c + 1), 1000)
 * ```
 */
export function useInterval(callback: () => void, delay: number | null): void {
  const savedCallback = useRef<() => void>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) {
      return;
    }

    const tick = (): void => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };
    const id = setInterval(tick, delay);

    return () => clearInterval(id);
  }, [delay]);
}
