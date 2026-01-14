import type { ThemeConfig, ConfigThemes, ResolvedConfig, ConfigTheme } from './types';

import plugin from 'tailwindcss/plugin';
import deepMerge from 'deepmerge';

import {
  animation,
  borderRadius,
  boxShadow,
  fontSize,
  keyframes,
  spacing,
  transitionDuration,
  transitionTimingFunction,
} from '../tokens';
import { lightColorTokens, darkColorTokens } from '../tokens/colors';
import { darkLayout, lightLayout, lightCommonColors, darkCommonColors } from '../tokens/layout';

import {
  flattenThemeObject,
  kebabCase,
  mapKeys,
  omit,
  escapeSelector,
  parseColorValue,
  formatColorComponents,
  isNumericShade,
  extractColorBaseNames,
  SEMANTIC_TOKEN_MAP,
  DEFAULT_PREFIX,
} from './utils';

type ThemeMode = 'light' | 'dark';

// ─────────────────────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────────────────────

const ALPHA_COMPONENT_INDEX = 3;

/**
 * Generates semantic CSS vars that reference shade vars
 * @param {string} colorName - The base name of the color
 * @param {string} prefix - The CSS variable prefix
 * @param {ThemeMode} mode - The theme mode (light/dark)
 * @returns {Record<string, string>} The generated semantic variables
 */
function generateSemanticVars(
  colorName: string,
  prefix: string,
  mode: ThemeMode,
): Record<string, string> {
  // eslint-disable-next-line security/detect-object-injection
  const mapping = SEMANTIC_TOKEN_MAP[mode];
  const result: Record<string, string> = {};

  for (const [semantic, shade] of Object.entries(mapping)) {
    result[`--${prefix}-${colorName}-${semantic}`] = `var(--${prefix}-${colorName}-${shade})`;
  }

  return result;
}

/**
 * Creates CSS selectors for a theme
 * @param {string} themeName - The name of the theme
 * @param {string} defaultTheme - The name of the default theme
 * @returns {{ cssSelector: string; baseSelector: string }} The generated selectors
 */
function createThemeSelectors(
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
function getColorScheme(themeName: string, extend?: 'light' | 'dark'): string | null {
  if (themeName === 'light' || themeName === 'dark') {
    return themeName;
  }

  return extend || null;
}

/**
 * Determines the mode (light/dark) for a theme
 * @param {string} themeName - The name of the theme
 * @param {'light' | 'dark'} [extend] - The theme to extend
 * @returns {ThemeMode} The theme mode
 */
function getThemeMode(themeName: string, extend?: 'light' | 'dark'): ThemeMode {
  return themeName === 'dark' || extend === 'dark' ? 'dark' : 'light';
}

// ─────────────────────────────────────────────────────────────
// Color Processing
// ─────────────────────────────────────────────────────────────

/**
 * Processes and registers all colors for a theme
 * @param {Record<string, string>} flatColors - The flattened colors object
 * @param {string} prefix - The CSS variable prefix
 * @param {ThemeMode} mode - The theme mode
 * @param {ResolvedConfig} resolved - The mutable resolved config object
 * @param {string} cssSelector - The CSS selector for utilities
 * @param {string} baseSelector - The custom property selector
 */
/**
 * Processes a single shade color
 * @param {string} colorName - Name of the color
 * @param {string} colorValue - Value of the color
 * @param {string} prefix - CSS variable prefix
 * @param {ResolvedConfig} resolved - Mutable resolved config
 * @param {string} cssSelector - CSS selector
 * @param {string} baseSelector - Base selector
 */
function processShadeColor(
  colorName: string,
  colorValue: string,
  prefix: string,
  resolved: ResolvedConfig,
  cssSelector: string,
  baseSelector: string,
): void {
  // Skip non-numeric shades for shade-based colors
  if (colorName.includes('-')) {
    const shade = colorName.split('-').pop() || '';

    if (!isNumericShade(shade)) {
      return;
    }
  }

  const parsed = parseColorValue(colorValue);

  if (!parsed) {
    return;
  }

  const { components } = parsed;
  const colorVar = `--${prefix}-${colorName}`;
  const formattedValue = formatColorComponents(components);
  // eslint-disable-next-line security/detect-object-injection
  const alphaValue = components[ALPHA_COMPONENT_INDEX] ?? '<alpha-value>';

  // Register CSS variable (per-theme)
  // eslint-disable-next-line security/detect-object-injection
  resolved.utilities[cssSelector][colorVar] = formattedValue;
  // eslint-disable-next-line security/detect-object-injection
  resolved.baseStyles[baseSelector][colorVar] = formattedValue;

  // Register Tailwind color only if not already set (first theme wins)
  // eslint-disable-next-line security/detect-object-injection
  if (!resolved.colors[colorName]) {
    // eslint-disable-next-line security/detect-object-injection
    resolved.colors[colorName] = `oklch(var(${colorVar}) / ${alphaValue})`;
  }
}

/**
 * Processes and registers all colors for a theme
 * @param {Record<string, string>} flatColors - The flattened colors object
 * @param {string} prefix - The CSS variable prefix
 * @param {ThemeMode} mode - The theme mode
 * @param {ResolvedConfig} resolved - The mutable resolved config object
 * @param {string} cssSelector - The CSS selector for utilities
 * @param {string} baseSelector - The custom property selector
 */
function processColors(
  flatColors: Record<string, string>,
  prefix: string,
  mode: ThemeMode,
  resolved: ResolvedConfig,
  cssSelector: string,
  baseSelector: string,
): void {
  // Process shade colors
  for (const [colorName, colorValue] of Object.entries(flatColors)) {
    if (!colorValue) {
      continue;
    }

    processShadeColor(colorName, colorValue, prefix, resolved, cssSelector, baseSelector);
  }

  // Generate semantic tokens
  const colorBaseNames = extractColorBaseNames(flatColors);

  for (const baseName of colorBaseNames) {
    const semanticVars = generateSemanticVars(baseName, prefix, mode);

    for (const [varName, varValue] of Object.entries(semanticVars)) {
      // eslint-disable-next-line security/detect-object-injection
      resolved.utilities[cssSelector][varName] = varValue;
      // eslint-disable-next-line security/detect-object-injection
      resolved.baseStyles[baseSelector][varName] = varValue;

      // Register Tailwind color only if not already set (first theme wins)
      const tokenName = varName.replace(`--${prefix}-`, '').replace(/-DEFAULT$/, '');

      // eslint-disable-next-line security/detect-object-injection
      if (!resolved.colors[tokenName]) {
        // eslint-disable-next-line security/detect-object-injection
        resolved.colors[tokenName] = `oklch(var(${varName}) / <alpha-value>)`;
      }
    }
  }
}

// ─────────────────────────────────────────────────────────────
// Layout Processing
// ─────────────────────────────────────────────────────────────

/**
 * Processes and registers layout tokens for a theme
 * @param {Record<string, unknown>} flatLayout - The flattened layout object
 * @param {string} prefix - The CSS variable prefix
 * @param {ResolvedConfig} resolved - The mutable resolved config object
 * @param {string} cssSelector - The CSS selector for utilities
 * @param {string} baseSelector - The custom property selector
 */
function processLayout(
  flatLayout: Record<string, unknown>,
  prefix: string,
  resolved: ResolvedConfig,
  cssSelector: string,
  baseSelector: string,
): void {
  for (const [key, value] of Object.entries(flatLayout)) {
    if (!value) {
      continue;
    }

    const varName = `--${prefix}-${key}`;

    if (typeof value === 'object' && value !== null) {
      // Handle nested objects
      for (const [nestedKey, nestedValue] of Object.entries(value as Record<string, string>)) {
        const nestedVar = `${varName}-${nestedKey}`;

        // eslint-disable-next-line security/detect-object-injection
        resolved.utilities[cssSelector][nestedVar] = nestedValue;
        // eslint-disable-next-line security/detect-object-injection
        resolved.baseStyles[baseSelector][nestedVar] = nestedValue;
      }
    } else {
      // Format opacity values (0.5 → .5)
      const formattedValue =
        key.includes('opacity') && typeof value === 'number'
          ? value.toString().replace(/^0\./, '.')
          : String(value);

      // eslint-disable-next-line security/detect-object-injection
      resolved.utilities[cssSelector][varName] = formattedValue;
      // eslint-disable-next-line security/detect-object-injection
      resolved.baseStyles[baseSelector][varName] = formattedValue;
    }
  }
}

// ─────────────────────────────────────────────────────────────
// Config Resolution
// ─────────────────────────────────────────────────────────────

/**
 * Resolves theme configuration into CSS utilities, base styles, and variants
 * @param {ConfigThemes} themes - The themes configuration
 * @param {string} defaultTheme - The default theme name
 * @param {string} prefix - The CSS variable prefix
 * @returns {ResolvedConfig} The fully resolved configuration
 */
function resolveConfig(themes: ConfigThemes, defaultTheme: string, prefix: string): ResolvedConfig {
  const resolved: ResolvedConfig = {
    variants: [],
    utilities: {},
    colors: {},
    baseStyles: {},
  };

  for (const [themeName, { extend, layout, colors }] of Object.entries(themes)) {
    const { cssSelector, baseSelector } = createThemeSelectors(themeName, defaultTheme);
    const colorScheme = getColorScheme(themeName, extend);
    const mode = getThemeMode(themeName, extend);

    // Initialize style objects
    // eslint-disable-next-line security/detect-object-injection
    resolved.baseStyles[baseSelector] = colorScheme ? { 'color-scheme': colorScheme } : {};
    // eslint-disable-next-line security/detect-object-injection
    resolved.utilities[cssSelector] = colorScheme ? { 'color-scheme': colorScheme } : {};

    // Register variant
    resolved.variants.push({
      name: themeName,
      definition: [`&.${escapeSelector(themeName)}`, `&[data-theme='${themeName}']`],
    });

    // Process colors
    const flatColors = flattenThemeObject(colors || {}) as Record<string, string>;

    processColors(flatColors, prefix, mode, resolved, cssSelector, baseSelector);

    // Process layout
    const flatLayout = layout ? mapKeys(layout, (_, key) => kebabCase(key)) : {};

    processLayout(flatLayout, prefix, resolved, cssSelector, baseSelector);
  }

  return resolved;
}

// ─────────────────────────────────────────────────────────────
// Theme Building
// ─────────────────────────────────────────────────────────────

/**
 * Builds the final theme configuration by merging defaults with user config
 * @param {ThemeConfig} config - The partial user configuration
 * @returns {ConfigThemes} The complete themes map
 */
function buildThemes(config: ThemeConfig): ConfigThemes {
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
    colors: deepMerge({ ...lightColorTokens, ...lightCommonColors }, userLightColors),
  };

  const darkTheme: ConfigTheme = {
    layout: deepMerge({ ...baseLayout, ...darkLayout }, userDarkLayout),
    colors: deepMerge({ ...darkColorTokens, ...darkCommonColors }, userDarkColors),
  };

  // Merge with any custom themes
  return {
    light: lightTheme,
    dark: darkTheme,
    ...(omit(themeData, ['light', 'dark']) as ConfigThemes),
  };
}

// ─────────────────────────────────────────────────────────────
// Tailwind Theme Extension
// ─────────────────────────────────────────────────────────────

/**
 * Creates the Tailwind theme extension configuration
 * @param {Record<string, string>} colors - The resolved colors map
 * @param {string} prefix - The CSS variable prefix
 * @param {boolean} disableAnimations - Whether to disable animations
 * @returns {Record<string, any>} The Tailwind theme extension object
 */
function createThemeExtension(
  colors: Record<string, string>,
  prefix: string,
  disableAnimations: boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Record<string, any> {
  return {
    colors,
    spacing,
    borderRadius: {
      ...borderRadius,
      small: `var(--${prefix}-radius-small)`,
      medium: `var(--${prefix}-radius-medium)`,
      large: `var(--${prefix}-radius-large)`,
    },
    fontSize,
    boxShadow: {
      ...boxShadow,
      small: `var(--${prefix}-box-shadow-small)`,
      medium: `var(--${prefix}-box-shadow-medium)`,
      large: `var(--${prefix}-box-shadow-large)`,
    },
    animation: disableAnimations ? { none: 'none' } : animation,
    keyframes: disableAnimations ? {} : keyframes,
    transitionDuration,
    transitionTimingFunction,
  };
}

// ─────────────────────────────────────────────────────────────
// Plugin Export
// ─────────────────────────────────────────────────────────────

/**
 * IdeasUI Tailwind CSS plugin - generates CSS variables and utilities
 * @param {ThemeConfig} [config] - The plugin configuration object
 * @returns {ReturnType<typeof plugin>} The properly configured Tailwind plugin
 */
export const ideasUIPlugin = (config: ThemeConfig = {}): ReturnType<typeof plugin> => {
  const { defaultTheme = 'light', prefix = DEFAULT_PREFIX, disableAnimations = false } = config;

  const themes = buildThemes(config);
  const resolved = resolveConfig(themes, defaultTheme, prefix);

  return plugin(
    ({ addBase, addUtilities, addVariant }) => {
      addBase(resolved.baseStyles);
      addUtilities({ ...resolved.utilities });

      for (const variant of resolved.variants) {
        addVariant(variant.name, variant.definition);
      }

      if (disableAnimations) {
        addBase({
          '*,*::before,*::after': {
            animationDuration: '0.01ms !important',
            animationIterationCount: '1 !important',
            transitionDuration: '0.01ms !important',
          },
        });
      }
    },
    {
      theme: {
        extend: createThemeExtension(resolved.colors, prefix, disableAnimations),
      },
    },
  );
};
