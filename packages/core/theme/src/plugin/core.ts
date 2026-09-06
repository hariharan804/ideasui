import type {
  ThemeConfig,
  ConfigThemes,
  ResolvedConfig,
  ConfigTheme,
  TokenOverrides,
  SemanticTokenOverrides,
  ColorTokens,
} from '../types';

import deepMerge from 'deepmerge';

import { flattenThemeObject, omit, escapeSelector } from './utils';
import { processColors } from './colors';
import { generateCSSVarsFromTokenOverrides as generateCSVariablesFromTokenOverrides } from './css-vars';

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
    ? `:root, .${themeName}, [data-theme='${themeName}']`
    : `.${escapeSelector(themeName)}, [data-theme='${themeName}']`;
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

function processTokenAndSemanticOverrides(
  designTokens: TokenOverrides | undefined,
  semanticTokens: SemanticTokenOverrides | undefined,
  prefix: string,
  cssSelector: string,
  resolved: ResolvedConfig,
): void {
  if (designTokens) {
    const tokenVariables = generateCSVariablesFromTokenOverrides(designTokens, prefix);

    resolved.utilities[cssSelector] = {
      ...resolved.utilities[cssSelector],
      ...tokenVariables,
    };
  }

  if (semanticTokens) {
    const semanticVariables = generateCSVariablesFromTokenOverrides(semanticTokens, prefix);

    resolved.utilities[cssSelector] = {
      ...resolved.utilities[cssSelector],
      ...semanticVariables,
    };
  }
}

function processComponentOverrides(
  components: unknown,
  prefix: string,
  cssSelector: string,
  resolved: ResolvedConfig,
): void {
  if (!components) {
    return;
  }

  const flatComponents = flattenThemeObject(components, 4) as Record<string, string>;
  const componentVariables: Record<string, string> = {};

  for (const [key, value] of Object.entries(flatComponents)) {
    if (value !== undefined) {
      const formattedKey = key.replaceAll(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

      componentVariables[`--${prefix}-${formattedKey}`] = value;
    }
  }

  resolved.utilities[cssSelector] = {
    ...resolved.utilities[cssSelector],
    ...componentVariables,
  };
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

  for (const [
    themeName,
    { extend, colors, designTokens, semanticTokens, components },
  ] of Object.entries(themes)) {
    const { cssSelector, baseSelector } = createThemeSelectors(themeName, defaultTheme);
    const colorScheme = getColorScheme(themeName, extend);

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

    // Process token and semantic overrides
    processTokenAndSemanticOverrides(designTokens, semanticTokens, prefix, cssSelector, resolved);

    // Process component overrides
    processComponentOverrides(components, prefix, cssSelector, resolved);
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
  const globalDesignTokens = config?.designTokens || {};
  const globalSemanticTokens = config?.semanticTokens || {};
  const globalComponents = config?.components || {};

  const userLightColors = themeData.light?.colors || {};
  const userLightTokens = themeData.light?.designTokens || {};
  const userLightSemantic = themeData.light?.semanticTokens || {};
  const userDarkColors = themeData.dark?.colors || {};
  const userDarkTokens = themeData.dark?.designTokens || {};
  const userDarkSemantic = themeData.dark?.semanticTokens || {};
  const userLightComponents = themeData.light?.components || {};
  const userDarkComponents = themeData.dark?.components || {};

  // Build theme configs
  const lightTheme: ConfigTheme = {
    colors: flattenThemeObject(userLightColors) as Partial<ColorTokens>,
    designTokens: deepMerge(globalDesignTokens, userLightTokens),
    semanticTokens: deepMerge(globalSemanticTokens, userLightSemantic),
    components: deepMerge(globalComponents, userLightComponents),
  };

  const darkTheme: ConfigTheme = {
    colors: flattenThemeObject(userDarkColors) as Partial<ColorTokens>,
    designTokens: deepMerge(globalDesignTokens, userDarkTokens),
    semanticTokens: deepMerge(globalSemanticTokens, userDarkSemantic),
    components: deepMerge(globalComponents, userDarkComponents),
  };

  // Merge with any custom themes
  const customThemes: ConfigThemes = {};

  for (const [themeName, themeConfig] of Object.entries(omit(themeData, ['light', 'dark']))) {
    if (themeConfig) {
      const finalColors = themeConfig.colors ? flattenThemeObject(themeConfig.colors) : {};

      customThemes[themeName] = {
        ...themeConfig,
        colors: finalColors as unknown as Partial<ColorTokens>,
      };
    }
  }

  return {
    light: lightTheme,
    dark: darkTheme,
    ...customThemes,
  };
}

/**
 * Creates the Tailwind theme extension configuration.
 */
export function createThemeExtension(
  colors: Record<string, string>,
  prefix: string,
  disableAnimations: boolean,
  tokenOverrides: Partial<TokenOverrides> = {},
  semanticTokens: Partial<SemanticTokenOverrides> = {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Record<string, any> {
  const t = tokenOverrides;

  const defaultColorRefs: Record<string, string> = {
    primary: `oklch(var(--${prefix}-color-primary) / <alpha-value>)`,
    'on-primary': `oklch(var(--${prefix}-color-on-primary) / <alpha-value>)`,
    'primary-subtle': `oklch(var(--${prefix}-color-primary-subtle) / <alpha-value>)`,
    'on-primary-subtle': `oklch(var(--${prefix}-color-on-primary-subtle) / <alpha-value>)`,
    'primary-muted': `oklch(var(--${prefix}-color-primary-muted) / <alpha-value>)`,
    'on-primary-muted': `oklch(var(--${prefix}-color-on-primary-muted) / <alpha-value>)`,
    secondary: `oklch(var(--${prefix}-color-secondary) / <alpha-value>)`,
    'on-secondary': `oklch(var(--${prefix}-color-on-secondary) / <alpha-value>)`,
    tertiary: `oklch(var(--${prefix}-color-tertiary) / <alpha-value>)`,
    'on-tertiary': `oklch(var(--${prefix}-color-on-tertiary) / <alpha-value>)`,
    success: `oklch(var(--${prefix}-color-success) / <alpha-value>)`,
    'on-success': `oklch(var(--${prefix}-color-on-success) / <alpha-value>)`,
    warning: `oklch(var(--${prefix}-color-warning) / <alpha-value>)`,
    'on-warning': `oklch(var(--${prefix}-color-on-warning) / <alpha-value>)`,
    danger: `oklch(var(--${prefix}-color-danger) / <alpha-value>)`,
    'on-danger': `oklch(var(--${prefix}-color-on-danger) / <alpha-value>)`,
    info: `oklch(var(--${prefix}-color-info) / <alpha-value>)`,
    'on-info': `oklch(var(--${prefix}-color-on-info) / <alpha-value>)`,
    neutral: `oklch(var(--${prefix}-color-neutral) / <alpha-value>)`,
    'on-neutral': `oklch(var(--${prefix}-color-on-neutral) / <alpha-value>)`,
    surface: `oklch(var(--${prefix}-color-surface) / <alpha-value>)`,
    'on-surface': `oklch(var(--${prefix}-color-on-surface) / <alpha-value>)`,
    'surface-subtle': `oklch(var(--${prefix}-color-surface-subtle) / <alpha-value>)`,
    'surface-muted': `oklch(var(--${prefix}-color-surface-muted) / <alpha-value>)`,
    'surface-strong': `oklch(var(--${prefix}-color-surface-strong) / <alpha-value>)`,
    'surface-inverse': `oklch(var(--${prefix}-color-surface-inverse) / <alpha-value>)`,
    background: `oklch(var(--${prefix}-color-background) / <alpha-value>)`,
    'on-background': `oklch(var(--${prefix}-color-on-background) / <alpha-value>)`,
    border: `oklch(var(--${prefix}-color-border) / <alpha-value>)`,
    'border-base': `oklch(var(--${prefix}-color-border-base) / <alpha-value>)`,
    'border-subtle': `oklch(var(--${prefix}-color-border-subtle) / <alpha-value>)`,
    'border-strong': `oklch(var(--${prefix}-color-border-strong) / <alpha-value>)`,
    'border-focus': `oklch(var(--${prefix}-color-border-focus) / <alpha-value>)`,
    'border-danger': `oklch(var(--${prefix}-color-border-danger) / <alpha-value>)`,
    'content-primary': `oklch(var(--${prefix}-color-content-primary) / <alpha-value>)`,
    'content-secondary': `oklch(var(--${prefix}-color-content-secondary) / <alpha-value>)`,
    'content-tertiary': `oklch(var(--${prefix}-color-content-tertiary) / <alpha-value>)`,
    'content-disabled': `oklch(var(--${prefix}-color-content-disabled) / <alpha-value>)`,
    'content-inverse': `oklch(var(--${prefix}-color-content-inverse) / <alpha-value>)`,
    'surface-overlay': `oklch(var(--${prefix}-color-surface-overlay) / <alpha-value>)`,
    'common-white': `oklch(var(--${prefix}-color-common-white))`,
    'common-black': `oklch(var(--${prefix}-color-common-black))`,
    scrim: `oklch(var(--${prefix}-color-scrim))`,
  };

  return {
    colors: {
      ...defaultColorRefs,
      ...colors,
      transparent: 'transparent',
      ...Object.fromEntries(
        Object.entries(semanticTokens)
          .filter(([key, value]) => key !== 'components' && typeof value === 'string')
          .map(([key]) => [key, `var(--${prefix}-color-${key})`]),
      ),
    },
    spacing: { ...t.spacing },
    container: { center: true },
    borderRadius: { ...t.borderRadius },
    borderWidth: {
      DEFAULT: `var(--${prefix}-border-thin)`,
      ...t.borderWidth,
    },
    fontSize: { ...t.fontSize },
    fontWeight: { ...t.fontWeight },
    letterSpacing: { ...t.letterSpacing },
    fontFamily: { ...t.fontFamily },
    boxShadow: { ...t.boxShadow },
    animation: disableAnimations ? { none: 'none' } : { ...t.animation },
    keyframes: disableAnimations ? {} : { ...t.keyframes },
    transitionDuration: { ...t.duration },
    transitionTimingFunction: { ...t.easing },
    zIndex: { ...t.zIndex },
    opacity: { ...t.opacity },
    blur: { ...t.blur },
  };
}
