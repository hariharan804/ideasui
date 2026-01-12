import { useState, useEffect } from 'react';

/**
 * Custom hook for media query matching
 *
 * @param {string} query - CSS media query string
 * @returns {boolean} Boolean indicating if query matches
 *
 * @example
 * ```tsx
 * const isMobile = useMediaQuery('(max-width: 768px)')
 * ```
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const media = window.matchMedia(query);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMatches(media.matches);

    const listener = (event: MediaQueryListEvent): void => {
      setMatches(event.matches);
    };

    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}
