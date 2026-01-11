import { useEffect, useRef } from 'react';

/**
 * Custom hook for setting up intervals
 *
 * @param callback - Function to call on each interval
 * @param delay - Delay in milliseconds (null to pause)
 *
 * @example
 * ```tsx
 * useInterval(() => setCount(c => c + 1), 1000)
 * ```
 */
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) {
      return;
    }

    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };
    const id = setInterval(tick, delay);

    return () => clearInterval(id);
  }, [delay]);
}
