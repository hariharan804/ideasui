/**
 * Common constants used throughout the theme system
 */

export const DEFAULT_PREFIX = 'ideasui';

export const THEME_MODES = ['light', 'dark'] as const;

export type ThemeMode = (typeof THEME_MODES)[number];
