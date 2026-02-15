import type { PropsWithChildren, ReactElement } from 'react';
import type { ThemeScriptConfig } from './types';

import { useState, useEffect, useCallback, useMemo } from 'react';

import { ThemeContext } from './context';
import { defaultConfig } from './utils/themes.config';
import { storageAdapters } from './utils/storage';

const storage = storageAdapters.local;

export interface ThemeProviderProps extends Partial<ThemeScriptConfig> {
  systemThemes?: { light: string; dark: string };
}

const disableTransitions = (): void => {
  const style = document.createElement('style');

  style.appendChild(document.createTextNode('*{transition:none!important}'));
  document.head.appendChild(style);

  // Force reflow
  void window.getComputedStyle(document.body);

  setTimeout(() => {
    document.head.removeChild(style);
  }, 1);
};

export function ThemeProvider({
  children,
  defaultTheme = defaultConfig.defaultTheme,
  themes: userThemes,
  systemThemes: userSystemThemes,
}: PropsWithChildren<ThemeProviderProps>): ReactElement {
  const systemThemes = userSystemThemes ?? defaultConfig.systemThemes;

  const themes = useMemo(
    () => Array.from(new Set([...(defaultConfig.themes || []), ...(userThemes || [])])),
    [userThemes],
  );

  // ---------- Helpers ----------

  const prefersDark = useCallback(
    () =>
      typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches,
    [],
  );

  const resolve = useCallback(
    (t: string): string =>
      t === 'system' ? (prefersDark() ? systemThemes.dark : systemThemes.light) : t,
    [prefersDark, systemThemes],
  );

  const applyToDOM = useCallback(
    (resolved: string): void => {
      if (typeof window === 'undefined') {
        return;
      }

      const el = document.documentElement;

      disableTransitions();

      el.setAttribute(defaultConfig.attribute, resolved);

      // Native browser UI theming
      el.style.setProperty('color-scheme', resolved === systemThemes.dark ? 'dark' : 'light');
    },
    [systemThemes.dark],
  );

  // ---------- Initial State ----------

  const [theme, setThemeState] = useState<string>(() => {
    if (typeof window === 'undefined') {
      return defaultTheme;
    }

    const stored = storage.getItem(defaultConfig.storageKey);

    if (!stored) {
      return defaultTheme;
    }

    if (stored === 'system' || themes.includes(stored)) {
      return stored;
    }

    return defaultTheme; // invalid value fallback
  });

  const resolved = useMemo(() => resolve(theme), [theme, resolve]);

  // ---------- Public API ----------

  const setTheme = useCallback((next: string) => {
    setThemeState((prev) => (prev === next ? prev : next));
  }, []);

  // ---------- DOM Apply ----------

  useEffect(() => {
    applyToDOM(resolved);
  }, [resolved, applyToDOM]);

  // ---------- Storage Persistence ----------

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (theme === 'system') {
      storage.removeItem(defaultConfig.storageKey);
    } else {
      storage.setItem(defaultConfig.storageKey, theme);
    }
  }, [theme]);

  // ---------- System Preference Listener ----------

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (theme !== 'system') {
      return;
    }

    const mq = window.matchMedia?.('(prefers-color-scheme: dark)');

    if (!mq) {
      return;
    }

    const onChange = (): void => applyToDOM(resolve('system'));

    mq.addEventListener?.('change', onChange) ?? mq.addListener?.(onChange);

    return () => {
      mq.removeEventListener?.('change', onChange) ?? mq.removeListener?.(onChange);
    };
  }, [theme, resolve, applyToDOM]);

  // ---------- Cross-Tab Sync ----------

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
        setThemeState(next);
      }
    };

    window.addEventListener('storage', onStorage);

    return () => window.removeEventListener('storage', onStorage);
  }, [themes]);

  // ---------- Context Value ----------

  const value = useMemo(
    () => ({
      theme,
      resolved,
      themes,
      systemThemes,
      setTheme,
    }),
    [theme, resolved, themes, systemThemes, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
