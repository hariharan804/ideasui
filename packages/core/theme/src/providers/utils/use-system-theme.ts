'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to track system color scheme preference
 */
export function useSystemTheme(): 'light' | 'dark' {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (globalThis.window === undefined) {
      return 'light';
    }

    return globalThis.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    if (globalThis.window === undefined) {
      return;
    }

    const mq = globalThis.matchMedia?.('(prefers-color-scheme: dark)');

    if (!mq) {
      return;
    }

    const onChange = (e: MediaQueryListEvent): void => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    // eslint-disable-next-line sonarjs/deprecation
    mq.addEventListener?.('change', onChange) ?? mq.addListener?.(onChange);

    return () => {
      // eslint-disable-next-line sonarjs/deprecation
      mq.removeEventListener?.('change', onChange) ?? mq.removeListener?.(onChange);
    };
  }, []);

  return theme;
}
