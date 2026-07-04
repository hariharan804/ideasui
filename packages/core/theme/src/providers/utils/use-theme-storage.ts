'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

import { storageAdapters } from './storage';
import { defaultConfig } from './themes.config';

const storage = storageAdapters.local;

interface UseThemeStorageProperties {
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
}: UseThemeStorageProperties): {
  theme: string;
  setTheme: (next: string) => void;
  hasMounted: boolean;
} {
  const [themeState, setThemeState] = useState<string>(defaultTheme);
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  const themesReference = useRef(themes);

  useEffect(() => {
    themesReference.current = themes;
  }, [themes]);

  // Set mounted state and initialize from storage on mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasMounted(true);

    if (globalThis.window !== undefined) {
      const stored = storage.getItem(storageKey);

      if (stored && (stored === 'system' || themesReference.current.includes(stored))) {
        setThemeState(stored);
      }
    }
  }, [storageKey]);

  const setTheme = useCallback((next: string) => {
    setThemeState((previous) => (previous === next ? previous : next));
  }, []);

  // Storage Persistence
  useEffect(() => {
    if (globalThis.window === undefined) {
      return;
    }

    if (themeState === 'system') {
      storage.removeItem(storageKey);
    } else {
      storage.setItem(storageKey, themeState);
    }
  }, [themeState, storageKey]);

  // Cross-Tab Sync
  useEffect(() => {
    if (globalThis.window === undefined) {
      return;
    }

    const onStorage = (e: StorageEvent): void => {
      if (e.key !== storageKey) {
        return;
      }

      const next = e.newValue ?? 'system';

      if (next === 'system' || themesReference.current.includes(next)) {
        setThemeState(next);
      }
    };

    globalThis.addEventListener('storage', onStorage);

    return () => globalThis.removeEventListener('storage', onStorage);
  }, [storageKey]);

  return { theme: themeState, setTheme, hasMounted } as const;
}
