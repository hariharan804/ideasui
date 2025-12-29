import {useState, useEffect} from "react";

/**
 * Custom hook for tracking current time
 *
 * @param updateInterval - Update interval in milliseconds
 * @returns Current Date object
 *
 * @example
 * ```tsx
 * const now = useNow(1000) // Updates every second
 * ```
 */
export function useNow(updateInterval = 1000): Date {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, updateInterval);

    return () => clearInterval(interval);
  }, [updateInterval]);

  return now;
}