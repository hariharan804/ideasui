import { useState, useEffect } from 'react';

/**
 * Custom hook for tracking current time
 *
 * @param {number} [updateInterval=1000] - Update interval in milliseconds
 * @returns {Date} Current Date object
 *
 * @example
 * ```tsx
 * const now = useNow(1000) // Updates every second
 * ```
 */
const DEFAULT_INTERVAL = 1000;

export function useNow(updateInterval = DEFAULT_INTERVAL): Date {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, updateInterval);

    return () => clearInterval(interval);
  }, [updateInterval]);

  return now;
}
