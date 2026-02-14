import type { ResolvedConfig } from '../types';

import { parseColorValue, formatColorComponents, isNumericShade } from './utils';

const ALPHA_COMPONENT_INDEX = 3;

/**
 * Processes a single shade color
 * @param {string} colorName - Name of the color
 * @param {string} colorValue - Value of the color
 * @param {string} prefix - CSS variable prefix
 * @param {ResolvedConfig} resolved - Mutable resolved config
 * @param {string} cssSelector - CSS selector
 * @param {string} baseSelector - Base selector
 */
export function processShadeColor(
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

    // Only enforce numeric shade validation if the shade identifier looks like a number
    if (!isNaN(Number(shade)) && !isNumericShade(shade)) {
      return;
    }
  }

  const colorVar = `--${prefix}-${colorName}`;

  // If the value is a var() reference to another token, preserve the reference
  // This ensures semantic tokens (e.g. primary-base) derive from palette scale
  // (e.g. --ideasui-primary-500) rather than duplicating raw OKLCH values
  const trimmed = colorValue.trim();

  if (trimmed.startsWith('var(')) {
    // Store the var() reference directly
    resolved.utilities[cssSelector][colorVar] = trimmed;
    resolved.baseStyles[baseSelector][colorVar] = trimmed;

    // Register Tailwind color with the new var (alpha still works via the referenced var)
    if (!resolved.colors[colorName]) {
      resolved.colors[colorName] = `oklch(var(${colorVar}) / <alpha-value>)`;
    }

    return;
  }

  const parsed = parseColorValue(colorValue);

  if (!parsed) {
    return;
  }

  const { components } = parsed;
  const formattedValue = formatColorComponents(components);

  const alphaValue = components[ALPHA_COMPONENT_INDEX] ?? '<alpha-value>';

  // Register CSS variable (per-theme)
  resolved.utilities[cssSelector][colorVar] = formattedValue;
  resolved.baseStyles[baseSelector][colorVar] = formattedValue;

  // Register Tailwind color only if not already set (first theme wins)
  if (!resolved.colors[colorName]) {
    resolved.colors[colorName] = `oklch(var(${colorVar}) / ${alphaValue})`;
  }
}

/**
 * Processes and registers all colors for a theme
 * @param {Record<string, string>} flatColors - The flattened colors object
 * @param {string} prefix - The CSS variable prefix
 * @param {ResolvedConfig} resolved - The mutable resolved config object
 * @param {string} cssSelector - The CSS selector for utilities
 * @param {string} baseSelector - The custom property selector
 */
export function processColors(
  flatColors: Record<string, string>,
  prefix: string,
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
}
