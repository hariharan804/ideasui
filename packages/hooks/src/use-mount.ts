import {useState, useEffect} from "react";

/**
 * Custom hook for tracking component mount state
 *
 * @returns Boolean indicating if component is mounted
 *
 * @example
 * ```tsx
 * const isMounted = useMount()
 * ```
 */
export function useMount(): boolean {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  return isMounted;
}