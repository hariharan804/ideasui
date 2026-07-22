import type { ThemeScriptConfig } from '../types';

/** Default configuration - sensible defaults for most use cases */
export const defaultConfig: ThemeScriptConfig & { attribute: string; storageKey: string } = {
  themes: ['light', 'dark', 'system'],
  defaultTheme: 'light',
  storageKey: 'ideasui-theme',
  attribute: 'data-theme',
  systemThemes: { light: 'light', dark: 'dark' },
};
