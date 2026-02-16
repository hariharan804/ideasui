import { createContext, useContext } from 'react';

/**
 * Theme state managed by React Context
 */
export interface ThemeState {
  /** Current theme value (may be 'system') */
  theme: string;
  /** Resolved theme (actual class applied to DOM) */
  resolved: string;
  /** Available theme names */
  themes: string[];
  /** System theme mappings */
  systemThemes: { light: string; dark: string };
  /** Set theme function */
  setTheme: (theme: string) => void;
}

/**
 * Theme context - holds current theme state
 * @internal
 */
export const ThemeContext = createContext<ThemeState | null>(null);

/**
 * Hook to access theme state and controls
 * Must be used within ThemeProvider
 *
 * @example
 * ```tsx
 * function ThemeToggle() {
 *   const { theme, setTheme } = useTheme();
 *   return (
 *     <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
 *       Toggle theme
 *     </button>
 *   );
 * }
 * ```
 * @returns {ThemeState} Theme context state
 */
export function useThemeContext(): ThemeState {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'useThemeContext must be used within ThemeProvider. ' +
        'Wrap your app with <ThemeProvider> to use theme functionality.',
    );
  }

  return context;
}
