'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to track system color scheme preference
 */
export function useSystemTheme(): 'light' | 'dark' {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') {
      return 'light';
    }

    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mq = window.matchMedia?.('(prefers-color-scheme: dark)');

    if (!mq) {
      return;
    }

    const onChange = (e: MediaQueryListEvent): void => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    mq.addEventListener?.('change', onChange) ?? mq.addListener?.(onChange);

    return () => {
      mq.removeEventListener?.('change', onChange) ?? mq.removeListener?.(onChange);
    };
  }, []);

  return theme;
}
