/**
 * Theme system providers and hooks
 * @module providers
 */

export { ThemeProvider } from './theme-provider';
export type { ThemeProviderProps } from './theme-provider';
export { useTheme } from './use-theme';
export { ThemeScript } from './theme-script';
export type { ThemeScriptProps, ThemeScriptConfig } from './types';

// Internal exports (for advanced use cases)
export { ThemeContext } from './context';
export type { ThemeState } from './context';
