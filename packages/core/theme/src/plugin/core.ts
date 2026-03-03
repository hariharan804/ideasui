import type {
  ThemeConfig,
  ConfigThemes,
  ResolvedConfig,
  ConfigTheme,
  TokenOverrides,
  SemanticTokenOverrides,
} from '../types';

import deepMerge from 'deepmerge';

import {
  animation,
  borderRadius,
  fontSize,
  spacing,
  letterSpacing,
  primitives,
  semantic,
  commonColors,
  zIndex,
  opacity,
  fontFamily,
  fontWeight,
  border,
  blur,
  lightShadow,
  lightSurface,
  darkSurface,
  lightContent,
  darkContent,
  onSurfaceLight,
  onSurfaceDark,
  lightBorder,
  darkBorder,
  duration,
  easing,
  keyframes,
  componentColors,
  componentShadows,
} from '../tokens';

import { flattenThemeObject, omit, escapeSelector } from './utils';
import { processColors } from './colors';
import { generateCSSVarsFromTokenOverrides } from './css-vars';

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
  const isDefault = themeName === defaultTheme;
  const baseSelector = isDefault
    ? `:root, .${themeName}, [data-ideasui-theme='${themeName}']`
    : `.${escapeSelector(themeName)}, [data-ideasui-theme='${themeName}']`;
  const cssSelector = baseSelector;

  return { cssSelector, baseSelector };
}

/**
 * Determines the color scheme for a theme
 */
export function getColorScheme(themeName: string, extend?: string): string | undefined {
  if (extend) {
    return extend;
  }
  if (themeName === 'light') {
    return 'light';
  }
  if (themeName === 'dark') {
    return 'dark';
  }

  return undefined;
}

/**
 * Resolves theme configuration into CSS variables, utilities, and base styles
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

  for (const [themeName, { extend, colors, designTokens, semanticTokens }] of Object.entries(
    themes,
  )) {
    const { cssSelector, baseSelector } = createThemeSelectors(themeName, defaultTheme);
    const colorScheme = getColorScheme(themeName, extend);

    // Initialize style objects

    resolved.baseStyles[baseSelector] = colorScheme ? { 'color-scheme': colorScheme } : {};

    resolved.utilities[cssSelector] = colorScheme ? { 'color-scheme': colorScheme } : {};

    // Register variant
    resolved.variants.push({
      name: themeName,
      definition: [`&.${escapeSelector(themeName)}`, `&[data-ideasui-theme='${themeName}']`],
    });

    // Process colors
    const flatColors = flattenThemeObject(colors || {}) as Record<string, string>;

    processColors(flatColors, prefix, resolved, cssSelector, baseSelector);

    // Process token overrides
    if (designTokens) {
      const tokenVars = generateCSSVarsFromTokenOverrides(designTokens, prefix);

      resolved.utilities[cssSelector] = {
        ...resolved.utilities[cssSelector],
        ...tokenVars,
      };
    }

    // Process semantic token overrides
    if (semanticTokens) {
      const semanticVars = generateCSSVarsFromTokenOverrides(semanticTokens, prefix);

      resolved.utilities[cssSelector] = {
        ...resolved.utilities[cssSelector],
        ...semanticVars,
      };
    }
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

  // Extract user overrides
  const globalSemanticTokens = config?.semanticTokens || {};
  const userLightColors = themeData.light?.colors || {};
  const userLightTokens = themeData.light?.designTokens || {};
  const userLightSemantic = themeData.light?.semanticTokens || {};
  const userDarkColors = themeData.dark?.colors || {};
  const userDarkTokens = themeData.dark?.designTokens || {};
  const userDarkSemantic = themeData.dark?.semanticTokens || {};

  // Build theme configs
  const lightTheme: ConfigTheme = {
    colors: deepMerge(
      {
        ...deepMerge(primitives.light, semantic),
        ...commonColors,
        surface: lightSurface,
        'on-surface': onSurfaceLight,
        content: lightContent,
        border: lightBorder,
        ...componentColors,
      },
      userLightColors,
    ),
    designTokens: deepMerge({}, userLightTokens),
    semanticTokens: deepMerge(globalSemanticTokens, userLightSemantic),
  };

  const darkTheme: ConfigTheme = {
    colors: deepMerge(
      {
        ...deepMerge(primitives.dark, semantic),
        ...commonColors,
        surface: darkSurface,
        'on-surface': onSurfaceDark,
        content: darkContent,
        border: darkBorder,
        ...componentColors,
      },
      userDarkColors,
    ),
    designTokens: deepMerge({}, userDarkTokens),
    semanticTokens: deepMerge(globalSemanticTokens, userDarkSemantic),
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
 * - All token families can be overridden via `tokenOverrides`
 *'
 * @param {Record<string, string>} colors - The resolved flat colors map
 * @param {string} _prefix - The CSS variable prefix (unused, kept for API compat)
 * @param {boolean} disableAnimations - Whether to disable animations
 * @param {Partial<TokenOverrides>} tokenOverrides - User overrides for any token family
 * @returns {Record<string, any>} The Tailwind theme extension object
 */
export function createThemeExtension(
  colors: Record<string, string>,
  _prefix: string,
  disableAnimations: boolean,
  tokenOverrides: Partial<TokenOverrides> = {},
  semanticTokens: Partial<SemanticTokenOverrides> = {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Record<string, any> {
  const t = tokenOverrides;
  const s = semanticTokens;

  return {
    // ── Colors (flat CSS variable references — v4 requires uniform types) ──
    colors: { ...colors, transparent: 'transparent' },

    // ── Spacing (4px grid) ──
    spacing: { ...spacing, ...t.spacing },

    // ── Responsive ──
    container: { center: true },

    // ── Layout ──
    borderRadius: { ...borderRadius, ...t.borderRadius },
    borderColor: {
      default: colors['border-default'],
      subtle: colors['border-subtle'],
      strong: colors['border-strong'],
      focus: colors['border-focus'],
      danger: colors['border-danger'],
      ...t.borderColor,
    },
    borderWidth: {
      DEFAULT: border.thin,
      ...Object.fromEntries(
        Object.entries(border).filter(
          ([key]) => !key.startsWith('color') && !key.startsWith('width'),
        ),
      ),
      ...t.borderWidth,
    },

    // ── Typography ──
    fontSize: { ...fontSize, ...t.fontSize },
    fontWeight: { ...fontWeight, ...t.fontWeight },
    letterSpacing: { ...letterSpacing, ...t.letterSpacing },
    fontFamily: { ...fontFamily, ...t.fontFamily },

    // ── Shadows ──
    boxShadow: {
      ...Object.fromEntries(
        Object.keys(lightShadow).map((key) => [key, `var(--${_prefix}-shadow-${key})`]),
      ),
      ...flattenThemeObject(componentShadows),
      ...t.boxShadow,
      ...s.elevation,
    },

    // ── Motion ──
    animation: disableAnimations ? { none: 'none' } : { ...animation, ...t.animation },
    keyframes: disableAnimations ? {} : { ...keyframes, ...t.keyframes },
    transitionDuration: { ...duration, ...t.duration },
    transitionTimingFunction: { ...easing, ...t.easing },

    // ── Depth ──
    zIndex: { ...zIndex, ...t.zIndex },
    opacity: { ...opacity, ...t.opacity },

    // ── Blur ──
    blur: { ...blur, ...t.blur },
  };
}
