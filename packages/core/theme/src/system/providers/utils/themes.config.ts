import type { ThemeScriptConfig } from '../types';

/** Default configuration - sensible defaults for most use cases */
export const defaultConfig: ThemeScriptConfig = {
  themes: ['light', 'dark', 'system'],
  defaultTheme: 'light',
  storageKey: 'ideasui-theme',
  mode: 'class',
  systemThemes: { light: 'light', dark: 'dark' },
};
