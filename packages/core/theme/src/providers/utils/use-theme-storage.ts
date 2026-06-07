'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

import { storageAdapters } from './storage';
import { defaultConfig } from './themes.config';

const storage = storageAdapters.local;

interface UseThemeStorageProps {
  defaultTheme: string;
  themes: string[];
  storageKey?: string;
}

/**
 * Hook to manage theme storage and cross-tab synchronization
 */
export function useThemeStorage({
  defaultTheme,
  themes,
  storageKey = defaultConfig.storageKey,
}: UseThemeStorageProps): {
  theme: string;
  setTheme: (next: string) => void;
  hasMounted: boolean;
} {
  const [theme, setThemeState] = useState<string>(defaultTheme);
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  const themesRef = useRef(themes);

  useEffect(() => {
    themesRef.current = themes;
  }, [themes]);

  // Set mounted state and initialize from storage on mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasMounted(true);

    if (typeof window !== 'undefined') {
      const stored = storage.getItem(storageKey);

      if (stored && (stored === 'system' || themesRef.current.includes(stored))) {
        setThemeState(stored);
      }
    }
  }, [storageKey]);

  const setTheme = useCallback((next: string) => {
    setThemeState((prev) => (prev === next ? prev : next));
  }, []);

  // Storage Persistence
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (theme === 'system') {
      storage.removeItem(storageKey);
    } else {
      storage.setItem(storageKey, theme);
    }
  }, [theme, storageKey]);

  // Cross-Tab Sync
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const onStorage = (e: StorageEvent): void => {
      if (e.key !== storageKey) {
        return;
      }

      const next = e.newValue ?? 'system';

      if (next === 'system' || themesRef.current.includes(next)) {
        setThemeState(next);
      }
    };

    window.addEventListener('storage', onStorage);

    return () => window.removeEventListener('storage', onStorage);
  }, [storageKey]);

  return { theme, setTheme, hasMounted } as const;
}
