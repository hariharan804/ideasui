import { ThemeConfig } from './types'

/** Default configuration - sensible defaults for most use cases */
export const defaultConfig: ThemeConfig = {
  themes: ['light', 'dark', 'system'],
  defaultTheme: 'light',
  storageKey: 'itheme',
  mode: 'class',
  systemThemes: { light: 'light', dark: 'dark' },
}
