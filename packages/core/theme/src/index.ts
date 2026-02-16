/**
 * IdeasUI Theme System
 * OKLCH-based theme system with Tailwind CSS v4+ integration
 * @module @ideasui/theme
 */

// IdeasuiTailwind plugin
export { ideasUIPlugin } from './plugin';

// Theme providers and hooks
export { ThemeProvider, ThemeScript, useTheme } from './providers';
export type { ThemeProviderProps, ThemeScriptProps, ThemeScriptConfig } from './providers';

// Design tokens
export * from './tokens';

// Component recipes
export * from './recipes';

// Type definitions
export type * from './types';
