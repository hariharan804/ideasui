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
export function generateCSSVarsFromTokenOverrides(
  tokens: Partial<TokenOverrides> | SemanticTokenOverrides | Record<string, unknown>,
  prefix: string,
): Record<string, string> {
  const t = tokens as Partial<TokenOverrides & SemanticTokenOverrides>;
  const cssVariables: Record<string, string> = {};

  // Duration
  if (t.duration) {
    for (const [key, value] of Object.entries(t.duration)) {
      if (value !== undefined) {
        cssVariables[`--${prefix}-duration-${kebabCase(key)}`] = value;
      }
    }
  }

  // Easing
  if (t.easing) {
    for (const [key, value] of Object.entries(t.easing)) {
      if (value !== undefined) {
        cssVariables[`--${prefix}-easing-${kebabCase(key)}`] = value;
      }
    }
  }

  // Spacing
  if (t.spacing) {
    for (const [key, value] of Object.entries(t.spacing)) {
      if (value !== undefined) {
        cssVariables[`--${prefix}-spacing-${key.replace('.', '_')}`] = value;
      }
    }
  }

  // Font size
  if (t.fontSize) {
    for (const [key, value] of Object.entries(t.fontSize)) {
      if (value !== undefined) {
        const fontSizeValue = Array.isArray(value) ? value[0] : (value as unknown as string);

        cssVariables[`--${prefix}-font-size-${key}`] = fontSizeValue;
      }
    }
  }

  // Border radius
  if (t.borderRadius) {
    for (const [key, value] of Object.entries(t.borderRadius)) {
      if (value !== undefined) {
        const variableName = key === 'DEFAULT' ? `--${prefix}-radius` : `--${prefix}-radius-${key}`;

        cssVariables[variableName] = value;
      }
    }
  }

  // Box shadow
  if (t.boxShadow) {
    for (const [key, value] of Object.entries(t.boxShadow)) {
      if (value !== undefined) {
        cssVariables[`--${prefix}-shadow-${key}`] = value;
      }
    }
  }

  // Shadow — alias for boxShadow (same CSS var pattern)
  if (t.shadow) {
    for (const [key, value] of Object.entries(t.shadow)) {
      if (value !== undefined) {
        cssVariables[`--${prefix}-shadow-${key}`] = value;
      }
    }
  }

  // Z-index
  if (t.zIndex) {
    for (const [key, value] of Object.entries(t.zIndex)) {
      if (value !== undefined) {
        cssVariables[`--${prefix}-z-index-${key}`] = String(value);
      }
    }
  }

  // Components (Nested objects)
  // e.g. { button: { base: { backgroundColor: 'red' } } } -> --prefix-button-base-background-color: red
  if (t.components) {
    const flattenComponents = (
      object: Record<string, unknown>,
      currentPrefix: string,
      depth: number = 0,
    ): void => {
      // Prevent infinite recursion or exploding CSS variables by capping the nesting depth.
      if (depth > 4) {
        return;
      }

      for (const [key, value] of Object.entries(object)) {
        const newPrefix = currentPrefix ? `${currentPrefix}-${key}` : key;

        if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
          flattenComponents(value as Record<string, unknown>, newPrefix, depth + 1);
        } else if (typeof value === 'string' || typeof value === 'number') {
          // Convert camelCase css properties to kebab-case
          const kebabKey = newPrefix
            .replaceAll(/([\da-z]|(?=[A-Z]))([A-Z])/g, '$1-$2')
            .toLowerCase();

          cssVariables[`--${prefix}-${kebabKey}`] = String(value);
        }
      }
    };

    flattenComponents(t.components as unknown as Record<string, unknown>, '');
  }

  // Opacity
  if (t.opacity) {
    for (const [key, value] of Object.entries(t.opacity)) {
      if (value !== undefined) {
        cssVariables[`--${prefix}-opacity-${kebabCase(key)}`] = String(value);
      }
    }
  }

  // Letter spacing
  if (t.letterSpacing) {
    for (const [key, value] of Object.entries(t.letterSpacing)) {
      if (value !== undefined) {
        cssVariables[`--${prefix}-tracking-${key}`] = value;
      }
    }
  }

  // Font family
  if (t.fontFamily) {
    for (const [key, value] of Object.entries(t.fontFamily)) {
      if (value !== undefined) {
        cssVariables[`--${prefix}-font-${kebabCase(key)}`] = value;
      }
    }
  }

  // Border width
  if (t.borderWidth) {
    for (const [key, value] of Object.entries(t.borderWidth)) {
      if (value !== undefined) {
        cssVariables[`--${prefix}-border-${key}`] = value;
      }
    }
  }

  if (t.blur) {
    for (const [key, value] of Object.entries(t.blur)) {
      if (value !== undefined) {
        cssVariables[`--${prefix}-blur-${key}`] = value;
      }
    }
  }

  // Font weight
  if (t.fontWeight) {
    for (const [key, value] of Object.entries(t.fontWeight)) {
      if (value !== undefined) {
        cssVariables[`--${prefix}-font-weight-${key}`] = value;
      }
    }
  }

  // Animation
  if (t.animation) {
    for (const [key, value] of Object.entries(t.animation)) {
      if (value !== undefined) {
        cssVariables[`--${prefix}-animation-${key}`] = value;
      }
    }
  }

  // Border color overrides
  if (t.borderColor) {
    for (const [key, value] of Object.entries(t.borderColor)) {
      if (value !== undefined) {
        cssVariables[`--${prefix}-border-${key}`] = value;
      }
    }
  }

  // Surface (Role-based)
  if (t.surface) {
    for (const [key, value] of Object.entries(t.surface)) {
      if (value !== undefined) {
        cssVariables[`--${prefix}-color-${key}`] = value;
      }
    }
  }

  // Content
  if (t.content) {
    for (const [key, value] of Object.entries(t.content)) {
      if (value !== undefined) {
        cssVariables[`--${prefix}-color-content-${key}`] = value;
      }
    }
  }

  // Border (semantic)
  if (t.border) {
    for (const [key, value] of Object.entries(t.border)) {
      if (value !== undefined) {
        cssVariables[`--${prefix}-border-${key}`] = value;
      }
    }
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
