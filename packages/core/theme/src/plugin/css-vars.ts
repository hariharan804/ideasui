import type { TokenOverrides, SemanticTokenOverrides } from '../types';

import {
  duration,
  easing,
  // breakpoints,
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
  lightElevation,
  darkElevation,
  lightInteraction,
  darkInteraction,
  // accessibility,
} from '../tokens';
import { componentColors, componentShadows } from '../tokens/components';

import { kebabCase } from './utils';

/**
 * Generates CSS custom properties from design tokens
 * @param {string} prefix - The CSS variable prefix
 * @returns {Record<string, string>} The generated CSS variables
 */
export function generateDesignTokenCSSVars(prefix: string): Record<string, string> {
  const cssVars: Record<string, string> = {};

  // Duration tokens
  Object.entries(duration).forEach(([key, value]) => {
    cssVars[`--${prefix}-duration-${kebabCase(key)}`] = value;
  });

  // Easing tokens
  Object.entries(easing).forEach(([key, value]) => {
    cssVars[`--${prefix}-easing-${kebabCase(key)}`] = value;
  });

  // Breakpoint tokens (for JavaScript access)
  // Object.entries(breakpoints).forEach(([key, value]) => {
  //   cssVars[`--${prefix}-breakpoint-${key}`] = value;
  // });

  // Spacing tokens
  Object.entries(spacing).forEach(([key, value]) => {
    cssVars[`--${prefix}-spacing-${key.replace('.', '_')}`] = value;
  });

  // Font size tokens
  Object.entries(fontSize).forEach(([key, value]) => {
    const fontSizeValue = Array.isArray(value) ? value[0] : (value as unknown as string);

    cssVars[`--${prefix}-font-size-${key}`] = fontSizeValue;
  });

  // Border radius tokens
  Object.entries(borderRadius).forEach(([key, value]) => {
    cssVars[`--${prefix}-radius-${key}`] = value;
  });

  // Box shadow tokens
  Object.entries(lightShadow).forEach(([key, value]) => {
    cssVars[`--${prefix}-shadow-${key}`] = value;
  });

  // Z-index tokens
  Object.entries(zIndex).forEach(([key, value]) => {
    cssVars[`--${prefix}-z-index-${key}`] = String(value);
  });

  // Opacity tokens
  Object.entries(opacity).forEach(([key, value]) => {
    cssVars[`--${prefix}-opacity-${kebabCase(key)}`] = String(value);
  });

  // Letter spacing tokens
  Object.entries(letterSpacing).forEach(([key, value]) => {
    cssVars[`--${prefix}-tracking-${key}`] = value;
  });

  // Font family tokens
  Object.entries(fontFamily).forEach(([key, value]) => {
    cssVars[`--${prefix}-font-${kebabCase(key)}`] = value;
  });

  // Border width tokens (from border tokens)
  Object.entries(border).forEach(([key, value]) => {
    cssVars[`--${prefix}-border-${key}`] = value;
  });

  // Blur tokens
  Object.entries(blur).forEach(([key, value]) => {
    cssVars[`--${prefix}-blur-${key}`] = value;
  });

  // Backdrop tokens
  Object.entries(backdrop).forEach(([key, value]) => {
    cssVars[`--${prefix}-backdrop-${kebabCase(key)}`] = value;
  });

  // Elevation tokens
  Object.entries(lightElevation).forEach(([key, value]) => {
    cssVars[`--${prefix}-elevation-${kebabCase(key)}-surface`] = value.surface;
    cssVars[`--${prefix}-elevation-${kebabCase(key)}-shadow`] = value.shadow;
  });

  // Interaction tokens
  Object.entries(lightInteraction).forEach(([key, value]) => {
    cssVars[`--${prefix}-${kebabCase(key)}`] = String(value);
  });

  // Accessibility tokens
  // Object.entries(accessibility).forEach(([key, value]) => {
  //   cssVars[`--${prefix}-accessibility-${kebabCase(key)}`] = value;
  // });

  // Component colors
  Object.entries(componentColors).forEach(([component, tokens]) => {
    Object.entries(tokens as Record<string, string>).forEach(([key, value]) => {
      cssVars[`--${prefix}-${component}-${key}`] = value;
    });
  });

  // Component shadows
  Object.entries(componentShadows).forEach(([component, tokens]) => {
    Object.entries(tokens as Record<string, string>).forEach(([key, value]) => {
      cssVars[`--${prefix}-${component}-${key}`] = value;
    });
  });

  // Static colors
  // cssVars[`--${prefix}-white`] = '#ffffff';
  // cssVars[`--${prefix}-black`] = '#000000';

  return cssVars;
}

/**
 * Generates CSS custom properties for dark mode overrides
 * @param {string} prefix - The CSS variable prefix
 * @returns {Record<string, string>} The generated CSS variables for dark mode
 */
export function generateDarkDesignTokenCSSVars(prefix: string): Record<string, string> {
  const cssVars: Record<string, string> = {};

  // Box shadow tokens (dark)
  Object.entries(darkShadow).forEach(([key, value]) => {
    cssVars[`--${prefix}-shadow-${key}`] = value;
  });

  // Elevation tokens (dark)
  Object.entries(darkElevation).forEach(([key, value]) => {
    cssVars[`--${prefix}-elevation-${kebabCase(key)}-surface`] = value.surface;
    cssVars[`--${prefix}-elevation-${kebabCase(key)}-shadow`] = value.shadow;
  });

  // Interaction tokens (dark)
  Object.entries(darkInteraction).forEach(([key, value]) => {
    cssVars[`--${prefix}-${kebabCase(key)}`] = String(value);
  });

  return cssVars;

  return cssVars;
}

/**
 * Generates CSS custom properties from token overrides
 * @param {Partial<TokenOverrides>} tokens - The token overrides
 * @param {string} prefix - The CSS variable prefix
 * @returns {Record<string, string>} The generated CSS variables
 */
/**
 * Generates CSS custom properties from token overrides
 * @param {Partial<TokenOverrides | SemanticTokenOverrides>} tokens - The token overrides
 * @param {string} prefix - The CSS variable prefix
 * @returns {Record<string, string>} The generated CSS variables
 */
export function generateCSSVarsFromTokenOverrides(
  tokens: Partial<TokenOverrides & SemanticTokenOverrides>,
  prefix: string,
): Record<string, string> {
  const cssVars: Record<string, string> = {};
  const t = tokens;

  // Duration
  if (t.duration) {
    Object.entries(t.duration).forEach(([key, value]) => {
      cssVars[`--${prefix}-duration-${kebabCase(key)}`] = value;
    });
  }

  // Easing
  if (t.easing) {
    Object.entries(t.easing).forEach(([key, value]) => {
      cssVars[`--${prefix}-easing-${kebabCase(key)}`] = value;
    });
  }

  // Breakpoints
  // if (t.breakpoints) {
  //   Object.entries(t.breakpoints).forEach(([key, value]) => {
  //     cssVars[`--${prefix}-breakpoint-${key}`] = value;
  //   });
  // }

  // Spacing
  if (t.spacing) {
    Object.entries(t.spacing).forEach(([key, value]) => {
      cssVars[`--${prefix}-spacing-${key.replace('.', '_')}`] = value;
    });
  }

  // Font size
  if (t.fontSize) {
    Object.entries(t.fontSize).forEach(([key, value]) => {
      const fontSizeValue = Array.isArray(value) ? value[0] : (value as unknown as string);

      cssVars[`--${prefix}-font-size-${key}`] = fontSizeValue;
    });
  }

  // Border radius
  if (t.borderRadius) {
    Object.entries(t.borderRadius).forEach(([key, value]) => {
      cssVars[`--${prefix}-radius-${key}`] = value;
    });
  }

  // Box shadow
  if (t.boxShadow) {
    Object.entries(t.boxShadow).forEach(([key, value]) => {
      cssVars[`--${prefix}-shadow-${key}`] = value;
    });
  }

  // Z-index
  if (t.zIndex) {
    Object.entries(t.zIndex).forEach(([key, value]) => {
      cssVars[`--${prefix}-z-index-${key}`] = String(value);
    });
  }

  // Opacity
  if (t.opacity) {
    Object.entries(t.opacity).forEach(([key, value]) => {
      cssVars[`--${prefix}-opacity-${kebabCase(key)}`] = String(value);
    });
  }

  // Letter spacing
  if (t.letterSpacing) {
    Object.entries(t.letterSpacing).forEach(([key, value]) => {
      cssVars[`--${prefix}-tracking-${key}`] = value;
    });
  }

  // Font family
  if (t.fontFamily) {
    Object.entries(t.fontFamily).forEach(([key, value]) => {
      cssVars[`--${prefix}-font-${kebabCase(key)}`] = value;
    });
  }

  // Border width
  if (t.borderWidth) {
    Object.entries(t.borderWidth).forEach(([key, value]) => {
      cssVars[`--${prefix}-border-${key}`] = value;
    });
  }

  if (t.blur) {
    Object.entries(t.blur).forEach(([key, value]) => {
      cssVars[`--${prefix}-blur-${key}`] = value;
    });
  }

  // ── Semantic Tokens ──

  // Surface
  if (t.surface) {
    Object.entries(t.surface).forEach(([key, value]) => {
      cssVars[`--${prefix}-color-surface-${key}`] = value;
    });
  }

  // On Surface
  if (t.onSurface) {
    Object.entries(t.onSurface).forEach(([key, value]) => {
      cssVars[`--${prefix}-color-on-surface-${key}`] = value;
    });
  }

  // Content
  if (t.content) {
    Object.entries(t.content).forEach(([key, value]) => {
      cssVars[`--${prefix}-color-content-${key}`] = value;
    });
  }

  // Border (semantic)
  if (t.border) {
    Object.entries(t.border).forEach(([key, value]) => {
      cssVars[`--${prefix}-border-${key}`] = value;
    });
  }

  // Elevation (semantic)
  if (t.elevation) {
    Object.entries(t.elevation).forEach(([key, value]) => {
      // Elevation might be complex, but for now assuming string overrides or simple mapping
      // If the value is a string, it's likely a shadow definition.
      // If it ends up being an object like common elevation tokens, we might need deeper handling.
      // For now, let's treat it as a direct variable override or ignore if it needs special processing not defined yet.
      // Based on previous code, elevation maps to shadow vars.
      // But here we are generating vars for the override itself.

      cssVars[`--${prefix}-elevation-${kebabCase(key)}-shadow`] = value;
    });
  }

  return cssVars;
}
