import type { PropsWithChildren, ReactElement } from 'react';
import type { ThemeScriptConfig } from './types';

import { useMemo, useEffect } from 'react';

import { ThemeContext } from './context';
import { applyThemeToDOM } from './utils/dom';
import { useSystemTheme } from './utils/use-system-theme';
import { useThemeStorage } from './utils/use-theme-storage';
import { defaultConfig } from './utils/themes.config';

export interface ThemeProviderProps extends Partial<ThemeScriptConfig> {
  systemThemes?: { light: string; dark: string };
}

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

  const [theme, setTheme] = useThemeStorage({
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

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
