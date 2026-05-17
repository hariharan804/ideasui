/** Complete theme configuration interface */
export interface ThemeScriptConfig {
  /** Available theme names */
  themes: string[];
  /** Default theme when none is stored */
  defaultTheme: string;

  /** Mapping of system preferences to theme names */
  systemThemes: { light: string; dark: string };
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
    'id' | 'nonce' | 'errorouslySetInnerHTML' | 'suppressHydrationWarning'
  >;
  id?: string;
}
