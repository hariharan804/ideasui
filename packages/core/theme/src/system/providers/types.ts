import type { storageAdapters } from './utils/storage';

/** How themes are applied to DOM elements */
export type ThemeModeVariant =
  | 'class' // Uses CSS classes: html.dark { ... } (Tailwind CSS standard)
  | 'attribute'; // Uses data attributes: html[data-theme="dark"] { ... }

/** Complete theme configuration interface */
export interface ThemeScriptConfig {
  /** Available theme names */
  themes: string[];
  /** Default theme when none is stored */
  defaultTheme: string;
  /** localStorage key for persistence */
  storageKey: string;

  /** How to apply theme to DOM
   * - 'class': Adds theme as CSS class (Tailwind CSS standard)
   * - 'attribute': Sets theme as data attribute value
   */
  mode: ThemeModeVariant;

  /** Mapping of system preferences to theme names */
  systemThemes: { light: string; dark: string };

  storage?: keyof typeof storageAdapters;
}

/** Storage interface for theme persistence */
export interface StorageAdapter {
  /** Get stored value by key */
  getItem(key: string): string | null;
  /** Store value by key */
  setItem(key: string, value: string): void;
  /** Remove stored value by key */
  removeItem(key: string): void;
}

export interface ThemeScriptProps extends Partial<ThemeScriptConfig> {
  nonce?: string;
  scriptProps?: Omit<
    React.ScriptHTMLAttributes<HTMLScriptElement>,
    'id' | 'nonce' | 'dangerouslySetInnerHTML' | 'suppressHydrationWarning'
  >;
  id?: string;
}
