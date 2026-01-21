import type { PropsWithChildren, ReactElement } from 'react';
import type { ThemeScriptConfig, StorageAdapter } from './types';

import { useState, useEffect, useCallback, useMemo } from 'react';

import { ThemeContext } from './context';
import { defaultConfig } from './utils/themes.config';
import { storageAdapters } from './utils/storage';

export interface ThemeProviderProps extends Partial<ThemeScriptConfig> {
  /** System theme mappings */
  systemThemes?: { light: string; dark: string };
}

/**
 * Theme provider that manages theme state and applies it to the DOM
 *
 * @param {object} props - ThemeProvider configuration and children
 * @param {ReactNode} props.children - React children to render
 * @param {string} props.defaultTheme - Initial theme to use (default: 'light')
 * @param {string[]} props.themes - List of available theme names
 * @param {object} props.systemThemes - Mapping for system theme preference
 * @returns {ReactElement} Provider component
 * @example
 * ```tsx
 * <ThemeProvider defaultTheme="system">
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  children,
  defaultTheme = defaultConfig.defaultTheme,

  themes: userThemes,
  systemThemes: userSystemThemes,
}: PropsWithChildren<ThemeProviderProps>): ReactElement {
  // Resolve configuration
  const systemThemes = userSystemThemes ?? defaultConfig.systemThemes;
  const themes = useMemo(
    () => Array.from(new Set([...(defaultConfig.themes || []), ...(userThemes || [])])),
    [userThemes],
  );

  const storage: StorageAdapter = storageAdapters.local;

  // Helper functions
  const prefersDark = useCallback(
    (): boolean =>
      typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches,
    [],
  );

  const resolve = useCallback(
    (t: string): string =>
      t === 'system' ? (prefersDark() ? systemThemes.dark : systemThemes.light) : t,
    [prefersDark, systemThemes],
  );

  const applyToDOM = useCallback((resolved: string): void => {
    if (typeof window === 'undefined') {
      return;
    }

    const el = document.documentElement;

    el.setAttribute('data-ideasui-theme', resolved);
  }, []);

  // Initialize state
  const [state, setState] = useState(() => {
    if (typeof window === 'undefined') {
      // SSR: Use default theme
      const initial = defaultTheme;
      const initialResolved = resolve(initial);

      return {
        theme: initial,
        resolved: initialResolved,
        themes,
        systemThemes,
      };
    }

    // Client: Check storage
    const rawStored = storage.getItem(defaultConfig.storageKey);
    const initial = rawStored ?? defaultTheme;
    const initialResolved = resolve(initial);

    // Seed storage on first run
    if (rawStored === null) {
      if (initial === 'system') {
        storage.removeItem(defaultConfig.storageKey);
      } else {
        storage.setItem(defaultConfig.storageKey, initial);
      }
    }

    return {
      theme: initial,
      resolved: initialResolved,
      themes,
      systemThemes,
    };
  });

  // setTheme function
  const setTheme = useCallback(
    (next: string) => {
      if (next === state.theme) {
        return;
      } // No-op if same

      setState((prev) => ({
        ...prev,
        theme: next,
        resolved: resolve(next),
      }));
    },
    [state.theme, resolve],
  );

  // Apply theme to DOM whenever resolved changes
  useEffect(() => {
    applyToDOM(state.resolved);
  }, [state.resolved, applyToDOM]);

  // Persist theme to storage
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (state.theme === 'system') {
      storage.removeItem(defaultConfig.storageKey);
    } else {
      storage.setItem(defaultConfig.storageKey, state.theme);
    }
  }, [state.theme, storage]);

  // Listen to system preference changes
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (state.theme !== 'system') {
      return;
    } // Only when theme is 'system'

    const mq = window.matchMedia?.('(prefers-color-scheme: dark)');

    if (!mq) {
      return;
    }

    const onSystem = (): void => {
      const newResolved = resolve('system');

      if (newResolved !== state.resolved) {
        setState((prev) => ({ ...prev, resolved: newResolved }));
      }
    };

    mq.addEventListener?.('change', onSystem) ?? mq.addListener?.(onSystem);

    return () => {
      mq.removeEventListener?.('change', onSystem) ?? mq.removeListener?.(onSystem);
    };
  }, [state.theme, state.resolved, resolve]);

  // Cross-tab synchronization
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const onStorage = (e: StorageEvent): void => {
      if (e.key !== defaultConfig.storageKey) {
        return;
      }

      const next = e.newValue ?? 'system';

      if (next === 'system' || themes.includes(next)) {
        const newResolved = resolve(next);

        setState((prev) => {
          if (prev.theme === next && prev.resolved === newResolved) {
            return prev; // No change
          }

          return {
            ...prev,
            theme: next,
            resolved: newResolved,
          };
        });
      }
    };

    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener('storage', onStorage);
    };
  }, [themes, resolve]);

  // Create context value
  const value = useMemo(
    () => ({
      ...state,
      setTheme,
    }),
    [state, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
