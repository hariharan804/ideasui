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

import {
  animation,
  borderRadius,
  fontSize,
  spacing,
  letterSpacing,
  primitives,
  semantic,
  zIndex,
  opacity,
  fontFamily,
  fontWeight,
  border,
  blur,
  lightShadow,
  surface,
  content,
  dividerColors,
  duration,
  easing,
  keyframes,
  componentColors,
  componentShadows,
} from '../tokens';

import {
  flattenThemeObject,
  omit,
  escapeSelector,
  parseColorValue,
  formatColorComponents,
} from './utils';
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
  const autoGenerateScales = config?.autoGenerateScales ?? false;

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
    colors: deepMerge(
      {
        ...flattenThemeObject(primitives.light),
        ...semantic,
        ...surface,
        ...flattenThemeObject({ content, divider: dividerColors, ...componentColors }),
      },
      autoGenerateScales
        ? autoGenerateColorScales(
            flattenThemeObject(userLightColors) as Record<string, string>,
            false,
          )
        : (flattenThemeObject(userLightColors) as Record<string, string>),
    ) as Partial<ColorTokens>,
    designTokens: deepMerge(globalDesignTokens, userLightTokens),
    semanticTokens: deepMerge(globalSemanticTokens, userLightSemantic),
    components: deepMerge(globalComponents, userLightComponents),
  };

  const darkTheme: ConfigTheme = {
    colors: deepMerge(
      {
        ...flattenThemeObject(primitives.dark),
        ...semantic,
        ...surface,
        ...flattenThemeObject({ content, divider: dividerColors, ...componentColors }),
      },
      autoGenerateScales
        ? autoGenerateColorScales(
            flattenThemeObject(userDarkColors) as Record<string, string>,
            true,
          )
        : (flattenThemeObject(userDarkColors) as Record<string, string>),
    ) as Partial<ColorTokens>,
    designTokens: deepMerge(globalDesignTokens, userDarkTokens),
    semanticTokens: deepMerge(globalSemanticTokens, userDarkSemantic),
    components: deepMerge(globalComponents, userDarkComponents),
  };

  // Merge with any custom themes
  const customThemes: ConfigThemes = {};

  for (const [themeName, themeConfig] of Object.entries(omit(themeData, ['light', 'dark']))) {
    if (themeConfig) {
      const isDark = themeConfig.extend === 'dark' || themeName.includes('dark');
      let finalColors = themeConfig.colors
        ? (flattenThemeObject(themeConfig.colors) as Record<string, string>)
        : undefined;

      if (autoGenerateScales && finalColors) {
        finalColors = autoGenerateColorScales(finalColors, isDark);
      }

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
 *
 * Architecture:
 * - colors: flat CSS variable references (Tailwind v4 requires uniform types, no mixed flat+nested)
 * - spacing: 4px grid
 * - typography: fontSize with paired lineHeight
 * - motion: duration + easing + keyframes + animation presets
 * - All token families can be overridden via `tokenOverrides`
 *
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

  return {
    // ── Colors (flat CSS variable references — v4 requires uniform types) ──
    colors: {
      ...colors,
      transparent: 'transparent',
      // Map all flat semantic token overrides to their CSS variables so Tailwind detects them
      ...Object.fromEntries(
        Object.entries(semanticTokens)
          .filter(([key, value]) => key !== 'components' && typeof value === 'string')
          .map(([key]) => [key, `var(--${_prefix}-color-${key})`]),
      ),
      // Map legacy grouped semantic overrides if any still exist
      ...Object.fromEntries(
        Object.keys(
          ((semanticTokens as Record<string, unknown>).surface as Record<string, unknown>) || {},
        ).map((key) => [key, `var(--${_prefix}-color-${key})`]),
      ),
      ...Object.fromEntries(
        Object.keys(
          ((semanticTokens as Record<string, unknown>).content as Record<string, unknown>) || {},
        ).map((key) => [`content-${key}`, `var(--${_prefix}-color-content-${key})`]),
      ),
      ...Object.fromEntries(
        Object.keys(
          ((semanticTokens as Record<string, unknown>).border as Record<string, unknown>) || {},
        ).map((key) => [`border-${key}`, `var(--${_prefix}-border-${key})`]),
      ),
    },

    // ── Spacing (4px grid) ──
    spacing: { ...spacing, ...t.spacing },

    // ── Responsive ──
    container: { center: true },

    // ── Layout ──
    borderRadius: { ...borderRadius, ...t.borderRadius },
    divider: {
      DEFAULT: colors['divider'] || colors['divider-base'],
      base: colors['divider-base'],
      subtle: colors['divider-subtle'],
      strong: colors['divider-strong'],
      focus: colors['divider-focus'],
      error: colors['divider-error'],
      ...t.dividerColors,
      ...Object.fromEntries(
        Object.keys(
          ((semanticTokens as Record<string, unknown>).divider as Record<string, unknown>) || {},
        ).map((key) => [key, `var(--${_prefix}-divider-${key})`]),
      ),
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

const SHADES = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  '950',
] as const;
const CHROMA_FACTORS = [0.1, 0.18, 0.35, 0.55, 0.75, 1, 0.95, 0.85, 0.72, 0.55, 0.4] as const;

function findAnchorShade(presentShades: string[]): string {
  let anchorShade = '500';
  let minDiff = Infinity;

  for (const shade of presentShades) {
    const index = SHADES.indexOf(shade as (typeof SHADES)[number]);

    if (index !== -1) {
      const diff = Math.abs(index - 5);

      if (diff < minDiff) {
        minDiff = diff;
        anchorShade = shade;
      }
    }
  }

  return anchorShade;
}

function interpolateLightness(
  isDark: boolean,
  index: number,
  anchorIndex: number,
  lAnchor: number,
): number {
  if (isDark) {
    if (index < anchorIndex) {
      return lAnchor - ((lAnchor - 0.14) * (anchorIndex - index)) / anchorIndex;
    }
    if (index > anchorIndex) {
      return lAnchor + ((0.97 - lAnchor) * (index - anchorIndex)) / (10 - anchorIndex);
    }
  } else {
    if (index < anchorIndex) {
      return lAnchor + ((0.97 - lAnchor) * (anchorIndex - index)) / anchorIndex;
    }
    if (index > anchorIndex) {
      return lAnchor - ((lAnchor - 0.14) * (index - anchorIndex)) / (10 - anchorIndex);
    }
  }

  return lAnchor;
}

/**
 * Interpolates a single color family's shades based on the parsed anchor color.
 */
export function generateColorScale(
  familyColors: Record<string, string>,
  isDark: boolean,
): Record<string, string> {
  const presentShades = Object.keys(familyColors);

  if (presentShades.length === 0 || presentShades.length === SHADES.length) {
    return familyColors;
  }

  // Find closest anchor shade to 500 (index 5)
  const anchorShade = findAnchorShade(presentShades);
  const anchorValue = familyColors[anchorShade];

  if (!anchorValue) {
    return familyColors;
  }

  const parsed = parseColorValue(anchorValue);

  if (parsed?.cssFn !== 'oklch') {
    return familyColors;
  }

  const [lAnchor, cAnchor, hAnchor] = parsed.components as [number, number, number];
  const anchorIndex = SHADES.indexOf(anchorShade as (typeof SHADES)[number]);

  if (anchorIndex === -1) {
    return familyColors;
  }

  const result = { ...familyColors };

  for (const [index, shade] of SHADES.entries()) {
    if (familyColors[shade]) {
      continue;
    }

    let lTarget = interpolateLightness(isDark, index, anchorIndex, lAnchor);

    lTarget = Math.round(lTarget * 10_000) / 10_000;

    const anchorFactor = CHROMA_FACTORS[anchorIndex];
    const targetFactor = CHROMA_FACTORS[index];
    const cTarget = Math.round(cAnchor * (targetFactor / anchorFactor) * 10_000) / 10_000;

    const targetComponents: (string | number)[] = [lTarget, cTarget, hAnchor];

    if (parsed.components[3] !== undefined) {
      targetComponents.push(parsed.components[3]);
    }

    result[shade] = `oklch(${formatColorComponents(targetComponents)})`;
  }

  return result;
}

/**
 * Automates 11-stop color scale generation for any partially defined scales.
 */
export function autoGenerateColorScales(
  flatUserColors: Record<string, string>,
  isDark: boolean,
): Record<string, string> {
  const result = { ...flatUserColors };
  const overridesByFamily: Record<string, Record<string, string>> = {};

  for (const [key, value] of Object.entries(flatUserColors)) {
    const match = /^([a-z]+)-(\d+)$/i.exec(key);

    if (match) {
      const [, family, shade] = match;

      if (!overridesByFamily[family]) {
        overridesByFamily[family] = {};
      }
      overridesByFamily[family][shade] = value;
    }
  }

  for (const [family, shades] of Object.entries(overridesByFamily)) {
    const keys = Object.keys(shades);

    if (keys.length > 0 && keys.length < SHADES.length) {
      const completeScale = generateColorScale(shades, isDark);

      for (const [shade, value] of Object.entries(completeScale)) {
        result[`${family}-${shade}`] = value;
      }
    }
  }

  return result;
}
