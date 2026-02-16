import type { ThemeScriptConfig, ThemeScriptProps } from './types';

import { memo, useMemo } from 'react';

import { createScript } from './utils/script';
import { defaultConfig } from './utils/themes.config';

const THEME_MAX_LENGTH = 50;

const isValidString = (str: unknown): str is string =>
  typeof str === 'string' &&
  /^[\w.:-]+$/.test(str) &&
  str.length > 0 &&
  str.length < THEME_MAX_LENGTH;

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

export const ThemeScript = memo<ThemeScriptProps>((props) => {
  const { nonce, scriptProps, id = 'ideasui-theme-script', ...themeProps } = props;

  const script = useMemo(() => {
    const merged: ThemeScriptConfig = {
      ...defaultConfig,
      ...themeProps,
      themes: Array.from(new Set([...(defaultConfig.themes || []), ...(themeProps.themes || [])])),
    };

    return createScript(validateThemeConfig(merged));
  }, [themeProps]);

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
