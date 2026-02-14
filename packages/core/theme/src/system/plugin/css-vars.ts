import {
  duration,
  easing,
  breakpoints,
  spacing,
  fontSize,
  borderRadius,
  lightShadow,
  zIndex,
  opacity,
  lineHeight,
  letterSpacing,
  fontFamily,
  border,
  blur,
  backdrop,
  lightElevation,
  interaction,
  accessibility,
} from '../../tokens';

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
  Object.entries(breakpoints).forEach(([key, value]) => {
    cssVars[`--${prefix}-breakpoint-${key}`] = value;
  });

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
    cssVars[`--${prefix}-opacity-${key}`] = String(value);
  });

  // Line height tokens
  Object.entries(lineHeight).forEach(([key, value]) => {
    cssVars[`--${prefix}-line-height-${key}`] = value;
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
  Object.entries(interaction).forEach(([key, value]) => {
    cssVars[`--${prefix}-interaction-${kebabCase(key)}`] = String(value);
  });

  // Accessibility tokens
  Object.entries(accessibility).forEach(([key, value]) => {
    cssVars[`--${prefix}-accessibility-${kebabCase(key)}`] = value;
  });

  return cssVars;
}
