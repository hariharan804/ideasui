import { useState, useEffect } from 'react';

/**
 * Custom hook for tracking component mount state
 *
 * @returns {boolean} Boolean indicating if component is mounted
 *
 * @example
 * ```tsx
 * const isMounted = useMount()
 * ```
 */
export function useMount(): boolean {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);

    return () => setIsMounted(false);
  }, []);

  return isMounted;
}
