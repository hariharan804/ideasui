import type { TokenOverrides, SemanticTokenOverrides } from '../types';

import {
  duration,
  easing,
  spacing,
  fontSize,
  borderRadius,
  lightShadow,
  darkShadow,
  zIndex,
  opacity,
  letterSpacing,
  fontFamily,
  border,
  blur,
  backdrop,
  lightInteraction,
  darkInteraction,
} from '../tokens';
import { componentColors, componentShadows } from '../tokens/components';

import { kebabCase } from './utils';

function getBaseCSSVars(prefix: string): Record<string, string> {
  const cssVariables: Record<string, string> = {};

  // Duration tokens
  for (const [key, value] of Object.entries(duration)) {
    cssVariables[`--${prefix}-duration-${kebabCase(key)}`] = value;
  }

  // Easing tokens
  for (const [key, value] of Object.entries(easing)) {
    cssVariables[`--${prefix}-easing-${kebabCase(key)}`] = value;
  }

  // Spacing tokens
  for (const [key, value] of Object.entries(spacing)) {
    cssVariables[`--${prefix}-spacing-${key.replace('.', '_')}`] = value;
  }

  // Font size tokens
  for (const [key, value] of Object.entries(fontSize)) {
    const fontSizeValue = Array.isArray(value) ? value[0] : (value as unknown as string);

    cssVariables[`--${prefix}-font-size-${key}`] = fontSizeValue;
  }

  // Border radius tokens
  for (const [key, value] of Object.entries(borderRadius)) {
    const variableName = key === 'DEFAULT' ? `--${prefix}-radius` : `--${prefix}-radius-${key}`;

    cssVariables[variableName] = value;
  }

  // Box shadow tokens
  for (const [key, value] of Object.entries(lightShadow)) {
    cssVariables[`--${prefix}-shadow-${key}`] = value;
  }

  return cssVariables;
}

function getTypographyAndEffectCSSVars(prefix: string): Record<string, string> {
  const cssVariables: Record<string, string> = {};

  // Z-index tokens
  for (const [key, value] of Object.entries(zIndex)) {
    cssVariables[`--${prefix}-z-index-${key}`] = String(value);
  }

  // Opacity tokens
  for (const [key, value] of Object.entries(opacity)) {
    cssVariables[`--${prefix}-opacity-${kebabCase(key)}`] = String(value);
  }

  // Letter spacing tokens
  for (const [key, value] of Object.entries(letterSpacing)) {
    cssVariables[`--${prefix}-tracking-${key}`] = value;
  }

  // Font family tokens
  for (const [key, value] of Object.entries(fontFamily)) {
    cssVariables[`--${prefix}-font-${kebabCase(key)}`] = value;
  }

  // Border width tokens (from border tokens)
  for (const [key, value] of Object.entries(border)) {
    cssVariables[`--${prefix}-border-${key}`] = value;
  }

  // Blur tokens
  for (const [key, value] of Object.entries(blur)) {
    cssVariables[`--${prefix}-blur-${key}`] = value;
  }

  // Backdrop tokens
  for (const [key, value] of Object.entries(backdrop)) {
    cssVariables[`--${prefix}-backdrop-${kebabCase(key)}`] = value;
  }

  // Interaction tokens
  for (const [key, value] of Object.entries(lightInteraction)) {
    cssVariables[`--${prefix}-${kebabCase(key)}`] = String(value);
  }

  return cssVariables;
}

function getComponentCSSVars(prefix: string): Record<string, string> {
  const cssVariables: Record<string, string> = {};

  // Component colors
  for (const [component, tokens] of Object.entries(componentColors)) {
    for (const [key, value] of Object.entries(tokens as Record<string, string>)) {
      cssVariables[`--${prefix}-${component}-${key}`] = value;
    }
  }

  // Component shadows
  for (const [component, tokens] of Object.entries(componentShadows)) {
    for (const [key, value] of Object.entries(tokens as Record<string, string>)) {
      cssVariables[`--${prefix}-${component}-${key}`] = value;
    }
  }

  return cssVariables;
}

/**
 * Generates CSS custom properties from design tokens
 * @param {string} prefix - The CSS variable prefix
 * @returns {Record<string, string>} The generated CSS variables
 */
export function generateDesignTokenCSSVars(prefix: string): Record<string, string> {
  return {
    ...getBaseCSSVars(prefix),
    ...getTypographyAndEffectCSSVars(prefix),
    ...getComponentCSSVars(prefix),
  };
}

/**
 * Generates CSS custom properties for dark mode overrides
 * @param {string} prefix - The CSS variable prefix
 * @returns {Record<string, string>} The generated CSS variables for dark mode
 */
export function generateDarkDesignTokenCSSVars(prefix: string): Record<string, string> {
  const cssVariables: Record<string, string> = {};

  // Box shadow tokens (dark)
  for (const [key, value] of Object.entries(darkShadow)) {
    cssVariables[`--${prefix}-shadow-${key}`] = value;
  }

  // Interaction tokens (dark)
  for (const [key, value] of Object.entries(darkInteraction)) {
    cssVariables[`--${prefix}-${kebabCase(key)}`] = String(value);
  }

  return cssVariables;
}

/**
 * Generates CSS custom properties from design token and/or semantic token overrides.
 * Accepts either a TokenOverrides object, a SemanticTokenOverrides object, or any
 * combination thereof. Keys are resolved according to their namespace:
 * - Design tokens (spacing, radius, shadow, etc.) → `--prefix-{token}-{key}`
 * - Semantic grouped tokens (surface, content, border) → `--prefix-color-{key}` etc.
 * - Flat semantic strings → `--prefix-color-{key}`
 *
 * @param tokens - Token overrides (design, semantic, or mixed)
 * @param prefix - CSS variable prefix (e.g. `ideasui`)
 */
interface TokenCategoryConfig {
  key: string;
  getName: (key: string, prefix: string) => string;
  getValue?: (value: unknown) => string;
}

const tokenConfigs: TokenCategoryConfig[] = [
  {
    key: 'duration',
    getName: (key, prefix) => `--${prefix}-duration-${kebabCase(key)}`,
  },
  {
    key: 'easing',
    getName: (key, prefix) => `--${prefix}-easing-${kebabCase(key)}`,
  },
  {
    key: 'spacing',
    getName: (key, prefix) => `--${prefix}-spacing-${key.replace('.', '_')}`,
  },
  {
    key: 'fontSize',
    getName: (key, prefix) => `--${prefix}-font-size-${key}`,
    getValue: (value) => (Array.isArray(value) ? value[0] : String(value)),
  },
  {
    key: 'borderRadius',
    getName: (key, prefix) =>
      key === 'DEFAULT' ? `--${prefix}-radius` : `--${prefix}-radius-${key}`,
  },
  {
    key: 'boxShadow',
    getName: (key, prefix) => `--${prefix}-shadow-${key}`,
  },
  {
    key: 'shadow',
    getName: (key, prefix) => `--${prefix}-shadow-${key}`,
  },
  {
    key: 'zIndex',
    getName: (key, prefix) => `--${prefix}-z-index-${key}`,
    getValue: String,
  },
  {
    key: 'opacity',
    getName: (key, prefix) => `--${prefix}-opacity-${kebabCase(key)}`,
    getValue: String,
  },
  {
    key: 'blur',
    getName: (key, prefix) => `--${prefix}-blur-${key}`,
  },
  {
    key: 'letterSpacing',
    getName: (key, prefix) => `--${prefix}-tracking-${key}`,
  },
  {
    key: 'fontFamily',
    getName: (key, prefix) => `--${prefix}-font-${kebabCase(key)}`,
  },
  {
    key: 'fontWeight',
    getName: (key, prefix) => `--${prefix}-font-weight-${key}`,
  },
  {
    key: 'borderWidth',
    getName: (key, prefix) => `--${prefix}-border-${key}`,
  },
  {
    key: 'animation',
    getName: (key, prefix) => `--${prefix}-animation-${key}`,
  },
  {
    key: 'borderColor',
    getName: (key, prefix) => `--${prefix}-border-${key}`,
  },
  {
    key: 'surface',
    getName: (key, prefix) => `--${prefix}-color-${key}`,
  },
  {
    key: 'content',
    getName: (key, prefix) => `--${prefix}-color-content-${key}`,
  },
  {
    key: 'border',
    getName: (key, prefix) => `--${prefix}-border-${key}`,
  },
];

function processTokenCategory(
  t: Record<string, unknown>,
  prefix: string,
  cssVariables: Record<string, string>,
  config: TokenCategoryConfig,
): void {
  const categoryData = t[config.key];

  if (!categoryData || typeof categoryData !== 'object') {
    return;
  }

  for (const [key, value] of Object.entries(categoryData)) {
    if (value !== undefined) {
      const varName = config.getName(key, prefix);
      const varValue = config.getValue ? config.getValue(value) : String(value);

      cssVariables[varName] = varValue;
    }
  }
}

interface FlattenContext {
  prefix: string;
  cssVariables: Record<string, string>;
}

function flattenComponents(
  object: Record<string, unknown>,
  currentPrefix: string,
  context: FlattenContext,
  depth: number = 0,
): void {
  // Prevent infinite recursion or exploding CSS variables by capping the nesting depth.
  if (depth > 4) {
    return;
  }

  for (const [key, value] of Object.entries(object)) {
    const newPrefix = currentPrefix ? `${currentPrefix}-${key}` : key;

    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      flattenComponents(value as Record<string, unknown>, newPrefix, context, depth + 1);
    } else if (typeof value === 'string' || typeof value === 'number') {
      // Convert camelCase css properties to kebab-case
      const kebabKey = newPrefix.replaceAll(/([\da-z]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();

      context.cssVariables[`--${context.prefix}-${kebabKey}`] = String(value);
    }
  }
}

export function generateCSSVarsFromTokenOverrides(
  tokens: Partial<TokenOverrides> | SemanticTokenOverrides | Record<string, unknown>,
  prefix: string,
): Record<string, string> {
  const t = tokens as Record<string, unknown> & { components?: unknown };
  const cssVariables: Record<string, string> = {};

  for (const config of tokenConfigs) {
    processTokenCategory(t, prefix, cssVariables, config);
  }

  // Components (Nested objects)
  // e.g. { button: { base: { backgroundColor: 'red' } } } -> --prefix-button-base-background-color: red
  if (t.components && typeof t.components === 'object') {
    flattenComponents(t.components as Record<string, unknown>, '', { prefix, cssVariables });
  }

  // Flat semantic token overrides
  // Any key whose value is a plain string is emitted as --prefix-color-{key}.
  // 'components' is the only key with its own nested handler above.
  for (const [key, value] of Object.entries(t)) {
    if (key !== 'components' && typeof value === 'string') {
      cssVariables[`--${prefix}-color-${key}`] = value;
    }
  }

  return cssVariables;
}
