import type { ParsedColor } from './types';

import { flatten } from 'flat';
import Color from 'color';

// ─────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────

export const DEFAULT_PREFIX = 'ideasui';

// ─────────────────────────────────────────────────────────────
// Semantic Token Configuration
// ─────────────────────────────────────────────────────────────

/**
 * Maps semantic token names to shade numbers.
 * Dark shades are already inverted in colors.ts
 */
export const SEMANTIC_TOKEN_MAP = {
  light: {
    DEFAULT: '500',
    on: '50',
    container: '100',
    onContainer: '900',
    subtle: '200',
    muted: '400',
    active: '700',
  },
  dark: {
    DEFAULT: '500',
    on: '50',
    container: '100',
    onContainer: '900',
    subtle: '200',
    muted: '400',
    active: '300',
  },
} as const;

/**
 * Converts a string to kebab-case
 * @param str
 */
export const kebabCase = (str: string) => str.replace(/([\da-z])([A-Z])/g, '$1-$2').toLowerCase();

/**
 * Maps values of an object
 * @param obj
 * @param fn
 */
export function mapKeys<T>(
  obj: Record<string, T>,
  fn: (value: T, key: string) => string,
): Record<string, T> {
  const result: Record<string, T> = {};

  Object.keys(obj).forEach((key) => {
    result[fn(obj[key], key)] = obj[key];
  });

  return result;
}

/**
 * Omits keys from an object
 * @param obj
 * @param keys
 */
export function omit<T extends Record<string, any>>(obj: T, keys: string[]) {
  const result = { ...obj };

  keys.forEach((key) => delete result[key]);

  return result;
}

/**
 * Escapes a selector string
 * @param str
 */
export const escapeSelector = (str: string) => {
  if (typeof CSS !== 'undefined' && CSS.escape) {
    return CSS.escape(str);
  }

  return str.replace(/([^\w-])/g, '\\$1');
};

/**
 * Flattens a theme object
 * @param obj
 */
export const flattenThemeObject = <TTarget>(obj: TTarget) => {
  return flatten(obj, {
    safe: true,
    delimiter: '-',
  }) as Record<string, any>;
};

// ─────────────────────────────────────────────────────────────
// Color Conversion Utilities
// ─────────────────────────────────────────────────────────────

/**
 * Converts sRGB to Linear RGB
 * @param c
 */
function srgbToLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/**
 * Converts RGB [0-255] to OKLCH [L: 0-1, C: 0-0.4, H: 0-360]
 * @param r
 * @param g
 * @param b
 */
export function rgbToOklch(r: number, g: number, b: number): [number, number, number] {
  // Normalize RGB to 0-1
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;

  // Convert to linear RGB
  const lr = srgbToLinear(rn);
  const lg = srgbToLinear(gn);
  const lb = srgbToLinear(bn);

  // Convert to Oklab via linear transformation
  const l_ = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const m_ = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const s_ = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;

  const l = Math.cbrt(l_);
  const m = Math.cbrt(m_);
  const s = Math.cbrt(s_);

  // Oklab values
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const bOk = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;

  // Convert Oklab to OKLCH
  const C = Math.sqrt(a * a + bOk * bOk);
  let H = (Math.atan2(bOk, a) * 180) / Math.PI;

  if (H < 0) {
    H += 360;
  }

  // Round to 4 decimal places
  return [Math.round(L * 10000) / 10000, Math.round(C * 10000) / 10000, Math.round(H * 100) / 100];
}

/**
 * Parses a color value and converts to OKLCH format
 * @param colorValue
 */
export function parseColorValue(colorValue: string): ParsedColor | null {
  try {
    const trimmed = colorValue.trim();

    // Handle oklch input - pass through directly
    if (trimmed.startsWith('oklch(')) {
      const match = trimmed.match(/oklch\(([^)]+)\)/);

      if (match) {
        const parts = match[1].split('/');
        const components = parts[0].trim().split(/\s+/);

        if (parts[1]) {
          components.push(parts[1].trim());
        }

        return { cssFn: 'oklch', components };
      }
    }

    // Convert all other formats (hex, rgb, hsl, named) to OKLCH
    const color = Color(trimmed);
    const rgb = color.rgb().array();
    const [l, c, h] = rgbToOklch(rgb[0], rgb[1], rgb[2]);
    const alpha = color.alpha();

    const components: (string | number)[] = [l, c, h];

    if (alpha < 1) {
      components.push(alpha);
    }

    return { cssFn: 'oklch', components };
  } catch {
    return null;
  }
}

/**
 * Formats oklch color components
 * @param components
 */
export function formatColorComponents(components: (string | number)[]): string {
  const [l, c, h] = components;

  return `${l} ${c} ${h}`;
}

/**
 * Check if key is a numeric shade (50, 100-900, 950)
 * @param key
 */
export const isNumericShade = (key: string): boolean =>
  /^(50|100|200|300|400|500|600|700|800|900|950)$/.test(key);

/** Regex to extract color base name from flattened key */
export const COLOR_NAME_REGEX =
  /^([a-z]+)-(50|100|200|300|400|500|600|700|800|900|950|default|on|container|oncontainer|subtle|muted|active)$/i;

/**
 * Extracts unique color base names from flattened color object
 * @param flatColors
 */
export function extractColorBaseNames(flatColors: Record<string, string>): Set<string> {
  const names = new Set<string>();

  for (const key of Object.keys(flatColors)) {
    const match = COLOR_NAME_REGEX.exec(key);

    if (match) {
      names.add(match[1]);
    }
  }

  return names;
}
