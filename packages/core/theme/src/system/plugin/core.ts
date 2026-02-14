import type { ThemeConfig, ConfigThemes, ResolvedConfig, ConfigTheme } from '../types';

import deepMerge from 'deepmerge';

import {
  animation,
  borderRadius,
  fontSize,
  spacing,
  breakpoints,
  letterSpacing,
  primitives,
  semantic,
  lightLayout,
  darkLayout,
  commonColors,
  zIndex,
  opacity,
  fontFamily,
  border,
  blur,
  lightShadow,
  lightSurface,
  darkSurface,
  lightContent,
  darkContent,
  lightBorder,
  darkBorder,
  duration,
  easing,
  keyframes,
  componentColors,
  componentShadows,
} from '../../tokens';

import { flattenThemeObject, kebabCase, mapKeys, omit, escapeSelector } from './utils';
import { processColors } from './colors';
import { processLayout } from './layout';

// ─────────────────────────────────────────────────────────────
// Core resolution logic
// ─────────────────────────────────────────────────────────────

/**
 * Creates CSS selectors for a theme
 * @param {string} themeName - The name of the theme
 * @param {string} defaultTheme - The name of the default theme
 * @returns {{ cssSelector: string; baseSelector: string }} The generated selectors
 */
export function createThemeSelectors(
  themeName: string,
  defaultTheme: string,
): { cssSelector: string; baseSelector: string } {
  const cssSelector = `.${escapeSelector(themeName)}`;
  const baseSelector =
    themeName === defaultTheme
      ? `:root, .${themeName}, [data-theme='${themeName}']`
      : `.${themeName}, [data-theme='${themeName}']`;

  return { cssSelector, baseSelector };
}

/**
 * Determines the color scheme for a theme
 * @param {string} themeName - The name of the theme
 * @param {'light' | 'dark'} [extend] - The theme to extend
 * @returns {string | null} The color scheme
 */
export function getColorScheme(themeName: string, extend?: 'light' | 'dark'): string | null {
  if (themeName === 'light' || themeName === 'dark') {
    return themeName;
  }

  return extend || null;
}

/**
 * Resolves theme configuration into CSS utilities, base styles, and variants
 * @param {ConfigThemes} themes - The themes configuration
 * @param {string} defaultTheme - The default theme name
 * @param {string} prefix - The CSS variable prefix
 * @returns {ResolvedConfig} The fully resolved configuration
 */
export function resolveConfig(
  themes: ConfigThemes,
  defaultTheme: string,
  prefix: string,
): ResolvedConfig {
  const resolved: ResolvedConfig = {
    variants: [],
    utilities: {},
    colors: {},
    baseStyles: {},
  };

  for (const [themeName, { extend, layout, colors }] of Object.entries(themes)) {
    const { cssSelector, baseSelector } = createThemeSelectors(themeName, defaultTheme);
    const colorScheme = getColorScheme(themeName, extend);

    // Initialize style objects

    resolved.baseStyles[baseSelector] = colorScheme ? { 'color-scheme': colorScheme } : {};

    resolved.utilities[cssSelector] = colorScheme ? { 'color-scheme': colorScheme } : {};

    // Register variant
    resolved.variants.push({
      name: themeName,
      definition: [`&.${escapeSelector(themeName)}`, `&[data-theme='${themeName}']`],
    });

    // Process colors
    const flatColors = flattenThemeObject(colors || {}) as Record<string, string>;

    processColors(flatColors, prefix, resolved, cssSelector, baseSelector);

    // Process layout
    const flatLayout = layout ? mapKeys(layout, (_, key) => kebabCase(key)) : {};

    processLayout(flatLayout, prefix, resolved, cssSelector, baseSelector);
  }

  return resolved;
}

/**
 * Builds the final theme configuration by merging defaults with user config
 * @param {ThemeConfig} config - The partial user configuration
 * @returns {ConfigThemes} The complete themes map
 */
export function buildThemes(config: ThemeConfig): ConfigThemes {
  const themeData = config?.themes || {};
  const userLayout = config?.layout || {};

  // Extract user overrides
  const userLightColors = themeData.light?.colors || {};
  const userDarkColors = themeData.dark?.colors || {};
  const userLightLayout = themeData.light?.layout || {};
  const userDarkLayout = themeData.dark?.layout || {};

  // Build base layout (global layout merged with mode defaults)
  const baseLayout =
    userLayout && typeof userLayout === 'object' ? deepMerge(lightLayout, userLayout) : lightLayout;

  // Build theme configs
  const lightTheme: ConfigTheme = {
    layout: deepMerge({ ...baseLayout, ...lightLayout }, userLightLayout),
    colors: deepMerge(
      {
        ...deepMerge(primitives.light, semantic),
        ...commonColors,
        surface: lightSurface,
        content: lightContent,
        border: lightBorder,
        ...componentColors,
      },
      userLightColors,
    ),
  };

  const darkTheme: ConfigTheme = {
    layout: deepMerge({ ...baseLayout, ...darkLayout }, userDarkLayout),
    colors: deepMerge(
      {
        ...deepMerge(primitives.dark, semantic),
        ...commonColors,
        surface: darkSurface,
        content: darkContent,
        border: darkBorder,
        ...componentColors,
      },
      userDarkColors,
    ),
  };

  // Merge with any custom themes
  return {
    light: lightTheme,
    dark: darkTheme,
    ...(omit(themeData, ['light', 'dark']) as ConfigThemes),
  };
}

/**
 * Creates the Tailwind theme extension configuration.
 *
 * Architecture:
 * - colors: flat CSS variable references (Tailwind v4 requires uniform types, no mixed flat+nested)
 * - spacing: 4px grid
 * - typography: fontSize with paired lineHeight
 * - motion: duration + easing + keyframes + animation presets
 * - layout: zIndex, opacity, borderWidth, borderRadius
 *
 * @param {Record<string, string>} colors - The resolved flat colors map
 * @param {string} _prefix - The CSS variable prefix (unused, kept for API compat)
 * @param {boolean} disableAnimations - Whether to disable animations
 * @returns {Record<string, any>} The Tailwind theme extension object
 */
export function createThemeExtension(
  colors: Record<string, string>,
  _prefix: string,
  disableAnimations: boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Record<string, any> {
  return {
    // ── Colors (flat CSS variable references — v4 requires uniform types) ──
    colors: { ...colors, transparent: 'transparent' },

    // ── Spacing (4px grid) ──
    spacing,

    // ── Responsive ──
    screens: breakpoints,
    container: { center: true },

    // ── Layout ──
    borderRadius,
    borderWidth: {
      DEFAULT: border.widthDefault,
      ...Object.fromEntries(
        Object.entries(border).filter(
          ([key]) => !key.startsWith('color') && !key.startsWith('width'),
        ),
      ),
    },

    // ── Typography ──
    fontSize,
    letterSpacing,
    fontFamily,

    // ── Shadows ──
    boxShadow: { ...lightShadow, ...flattenThemeObject(componentShadows) },

    // ── Motion ──
    animation: disableAnimations ? { none: 'none' } : animation,
    keyframes: disableAnimations ? {} : keyframes,
    transitionDuration: duration,
    transitionTimingFunction: easing,

    // ── Depth ──
    zIndex,
    opacity,

    // ── Blur ──
    blur,
  };
}
