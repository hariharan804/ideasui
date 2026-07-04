import type { ThemeScriptConfig, ThemeScriptProps as ThemeScriptProperties } from './types';

import { memo, useMemo } from 'react';

import { createScript } from './utils/script';
import { defaultConfig } from './utils/themes.config';

const THEME_MAX_LENGTH = 50;

const isValidString = (string_: unknown): string_ is string =>
  typeof string_ === 'string' &&
  /^[\w.:-]+$/.test(string_) &&
  string_.length > 0 &&
  string_.length < THEME_MAX_LENGTH;

const validateThemeConfig = (config: ThemeScriptConfig): ThemeScriptConfig => {
  const validThemes = Array.isArray(config.themes)
    ? config.themes.filter(isValidString)
    : ['light', 'dark'];

  const defaultTheme = isValidString(config.defaultTheme) ? config.defaultTheme : 'light';

  return {
    ...config,
    themes: validThemes.length > 0 ? validThemes : ['light', 'dark'],
    defaultTheme,
    systemThemes: {
      light: isValidString(config.systemThemes?.light) ? config.systemThemes.light : 'light',
      dark: isValidString(config.systemThemes?.dark) ? config.systemThemes.dark : 'dark',
    },
  };
};

export const ThemeScript = memo<ThemeScriptProperties>((properties) => {
  const { nonce, scriptProps, id = 'ideasui-theme-script', ...themeProperties } = properties;

  const script = useMemo(() => {
    const merged: ThemeScriptConfig = {
      ...defaultConfig,
      ...themeProperties,
      themes: [...new Set([...(defaultConfig.themes || []), ...(themeProperties.themes || [])])],
    };

    return createScript(validateThemeConfig(merged));
  }, [themeProperties]);

  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
      data-testid="theme-script"
      id={id}
      nonce={nonce}
      {...scriptProps}
    />
  );
});

ThemeScript.displayName = 'IdeasUI.ThemeScript';
