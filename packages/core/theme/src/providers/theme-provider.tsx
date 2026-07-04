'use client';

import type { PropsWithChildren, ReactElement } from 'react';
import type { ThemeScriptConfig } from './types';

import { useMemo, useEffect } from 'react';

import { ThemeContext } from './context';
import { applyThemeToDOM } from './utils/dom';
import { useSystemTheme } from './utils/use-system-theme';
import { useThemeStorage } from './utils/use-theme-storage';
import { defaultConfig } from './utils/themes.config';

export interface ThemeProviderProperties extends Partial<ThemeScriptConfig> {
  systemThemes?: { light: string; dark: string };
}

export function ThemeProvider({
  children,
  defaultTheme = defaultConfig.defaultTheme,
  themes: userThemes,
  systemThemes: userSystemThemes,
}: PropsWithChildren<ThemeProviderProperties>): ReactElement {
  const systemThemes = userSystemThemes ?? defaultConfig.systemThemes;

  const themes = useMemo(
    () => [...new Set([...(defaultConfig.themes || []), ...(userThemes || [])])],
    [userThemes],
  );

  const {
    theme,
    setThemeProp: setTheme,
    hasMounted,
  } = useThemeStorage({
    defaultTheme,
    themes,
    storageKey: defaultConfig.storageKey,
  });

  const remoteSystemTheme = useSystemTheme();

  // Handle system theme resolution
  const resolved = useMemo(() => {
    if (theme === 'system') {
      return remoteSystemTheme === 'dark' ? systemThemes.dark : systemThemes.light;
    }

    return theme;
  }, [theme, remoteSystemTheme, systemThemes]);

  // Apply to DOM
  useEffect(() => {
    applyThemeToDOM(resolved, systemThemes.dark);
  }, [resolved, systemThemes]);

  // Context value
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

  // Suppress hydration warning to allow the HTML attribute to differ initially
  return (
    <ThemeContext.Provider value={value}>
      {/* We only render children once mounted to avoid hydration mismatch if needed */}
      {hasMounted ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}
    </ThemeContext.Provider>
  );
}
