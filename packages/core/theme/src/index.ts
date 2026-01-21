/**
 * IdeasUI Theme System
 * OKLCH-based theme system with Tailwind CSS v4+ integration
 * @module @ideasui/theme
 */

// IdeasuiTailwind plugin
export { ideasUIPlugin } from './system/plugin';

// Theme providers and hooks
export { ThemeProvider, ThemeScript, useTheme } from './system/providers';
export type { ThemeProviderProps, ThemeScriptProps, ThemeScriptConfig } from './system/providers';

// Design tokens
export * from './tokens';

// Component recipes
export * from './recipes';

// Type definitions
export type * from './system/types';
