import type { ResolvedConfig } from '../types';

import { parseColorValue, formatColorComponents } from './utils';

const ALPHA_COMPONENT_INDEX = 3;

/**
 * Processes a single shade color
 */
export function processShadeColor(
  colorName: string,
  colorValue: string,
  prefix: string,
  resolved: ResolvedConfig,
  cssSelector: string,
  baseSelector: string,
): void {
  const colorVariable = `--${prefix}-color-${colorName}`;
  const trimmed = colorValue.trim();

  if (trimmed.startsWith('var(') || trimmed.startsWith('oklch(var(')) {
    resolved.utilities[cssSelector][colorVariable] = trimmed;
    resolved.baseStyles[baseSelector][colorVariable] = trimmed;

    const twName = colorName.endsWith('-DEFAULT') ? colorName.replace('-DEFAULT', '') : colorName;

    if (!resolved.colors[twName]) {
      resolved.colors[twName] = trimmed.startsWith('oklch(var(')
        ? `var(${colorVariable})`
        : `oklch(var(${colorVariable}) / <alpha-value>)`;
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

  resolved.utilities[cssSelector][colorVariable] = formattedValue;
  resolved.baseStyles[baseSelector][colorVariable] = formattedValue;

  const twName = colorName.endsWith('-DEFAULT') ? colorName.replace('-DEFAULT', '') : colorName;

  if (!resolved.colors[twName]) {
    resolved.colors[twName] = `oklch(var(${colorVariable}) / ${alphaValue})`;
  }
}

/**
 * Processes and registers all colors for a theme
 */
export function processColors(
  flatColors: Record<string, string>,
  prefix: string,
  resolved: ResolvedConfig,
  cssSelector: string,
  baseSelector: string,
): void {
  for (const [colorName, colorValue] of Object.entries(flatColors)) {
    if (!colorValue) {
      continue;
    }

    processShadeColor(colorName, colorValue, prefix, resolved, cssSelector, baseSelector);
  }
}
