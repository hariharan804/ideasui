import type { ResolvedConfig } from '../types';

/**
 * Processes and registers layout tokens for a theme
 * @param {Record<string, unknown>} flatLayout - The flattened layout object
 * @param {string} prefix - The CSS variable prefix
 * @param {ResolvedConfig} resolved - The mutable resolved config object
 * @param {string} cssSelector - The CSS selector for utilities
 * @param {string} baseSelector - The custom property selector
 */
export function processLayout(
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

        resolved.utilities[cssSelector][nestedVar] = nestedValue;

        resolved.baseStyles[baseSelector][nestedVar] = nestedValue;
      }
    } else {
      // Format opacity values (0.5 → .5)
      const formattedValue =
        key.includes('opacity') && typeof value === 'number'
          ? value.toString().replace(/^0\./, '.')
          : String(value);

      resolved.utilities[cssSelector][varName] = formattedValue;

      resolved.baseStyles[baseSelector][varName] = formattedValue;
    }
  }
}
