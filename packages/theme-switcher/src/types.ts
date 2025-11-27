/** How themes are applied to DOM elements */
export type ThemeMode =
  | 'class' // Uses CSS classes: html.dark { ... } (Tailwind CSS standard)
  | 'attribute' // Uses data attributes: html[data-theme="dark"] { ... }

/** Complete theme configuration interface */
export interface ThemeConfig {
  /** Available theme names */
  themes: string[]
  /** Default theme when none is stored */
  defaultTheme: string
  /** localStorage key for persistence */
  storageKey: string

  /** How to apply theme to DOM
   * - 'class': Adds theme as CSS class (Tailwind CSS standard)
   * - 'attribute': Sets theme as data attribute value
   */
  mode: ThemeMode
  /** Optional mapping of theme names to CSS class names */
  value?: Record<string, string>

  /** Mapping of system preferences to theme names */
  systemThemes: { light: string; dark: string }
}

/** Storage interface for theme persistence */
export interface StorageAdapter {
  /** Get stored value by key */
  getItem(key: string): string | null
  /** Store value by key */
  setItem(key: string, value: string): void
  /** Remove stored value by key */
  removeItem(key: string): void
}

/** Default configuration - sensible defaults for most use cases */
export const defaultConfig: ThemeConfig = {
  themes: ['light', 'dark'],
  defaultTheme: 'system',
  storageKey: 'theme',
  mode: 'class',
  systemThemes: { light: 'light', dark: 'dark' },
}
