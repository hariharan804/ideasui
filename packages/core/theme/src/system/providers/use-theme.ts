import type { ThemeState } from './context';

import { useTheme as useThemeContext } from './context';

/**
 * Hook to access and control theme
 *
 * @returns {object} Theme state and control functions
 *
 * @example
 * ```tsx
 * function ThemeToggle() {
 *   const { theme, setTheme, isDark } = useTheme();
 *
 *   return (
 *     <button onClick={() => setTheme(isDark ? 'light' : 'dark')}>
 *       Current: {theme}
 *     </button>
 *   );
 * }
 * ```
 */
export function useTheme(): ThemeState & {
  resolvedTheme: string;
  isDark: boolean;
} {
  const context = useThemeContext();

  return {
    ...context,
    resolvedTheme: context.resolved,
    isDark: context.resolved === context.systemThemes.dark,
  };
}
