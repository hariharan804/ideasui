import { useState, useEffect, useCallback } from 'react';

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
}: UseThemeStorageProps): readonly [string, (next: string) => void] {
  const [theme, setThemeState] = useState<string>(() => {
    if (typeof window === 'undefined') {
      return defaultTheme;
    }

    const stored = storage.getItem(storageKey);

    if (!stored) {
      return defaultTheme;
    }

    if (stored === 'system' || themes.includes(stored)) {
      return stored;
    }

    return defaultTheme;
  });

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

      if (next === 'system' || themes.includes(next)) {
        setThemeState(next);
      }
    };

    window.addEventListener('storage', onStorage);

    return () => window.removeEventListener('storage', onStorage);
  }, [themes, storageKey]);

  return [theme, setTheme] as const;
}
