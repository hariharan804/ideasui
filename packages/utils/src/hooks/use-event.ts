import { useCallback, useEffect, useRef } from 'react';

/**
 * Create stable callback that doesn't change on re-renders
 */
export function useEvent<T extends (...args: any[]) => any>(callback: T): T {
  const ref = useRef<T>(callback);
  
  useEffect(() => {
    ref.current = callback;
  });
  
  return useCallback(((...args) => ref.current(...args)) as T, []);
}