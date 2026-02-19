import type { ParsedColor } from '../types';

import { flatten } from 'flat';
import Color from 'color';

// ─────────────────────────────────────────────────────────────
// Semantic Token Configuration
// ─────────────────────────────────────────────────────────────

const SRGB_TO_LINEAR_THRESHOLD = 0.04045;
const SRGB_TO_LINEAR_DIVISOR = 12.92;
const SRGB_TO_LINEAR_OFFSET = 0.055;
const SRGB_TO_LINEAR_SCALAR = 1.055;
const SRGB_TO_LINEAR_POWER = 2.4;
const RGB_MAX_VALUE = 255;

const L_COEFF_LR = 0.4122214708;
const L_COEFF_LG = 0.5363325363;
const L_COEFF_LB = 0.0514459929;
const M_COEFF_LR = 0.2119034982;
const M_COEFF_LG = 0.6806995451;
const M_COEFF_LB = 0.1073969566;
const S_COEFF_LR = 0.0883024619;
const S_COEFF_LG = 0.2817188376;
const S_COEFF_LB = 0.6299787005;

const OKLAB_L_COEFF_L = 0.2104542553;
const OKLAB_L_COEFF_M = 0.793617785;
const OKLAB_L_COEFF_S = 0.0040720468;
const OKLAB_A_COEFF_L = 1.9779984951;
const OKLAB_A_COEFF_M = 2.428592205;
const OKLAB_A_COEFF_S = 0.4505937099;
const OKLAB_B_COEFF_L = 0.0259040371;
const OKLAB_B_COEFF_M = 0.7827717662;
const OKLAB_B_COEFF_S = 0.808675766;

const DEGREES_180 = 180;
const DEGREES_360 = 360;

const PRECISION_4 = 10000;
const PRECISION_2 = 100;

/**
 * Converts a string to kebab-case
 * @param {string} str - The string to convert
 * @returns {string} The kebab-cased string
 */
export const kebabCase = (str: string): string =>
  str.replace(/([\da-z])([A-Z])/g, '$1-$2').toLowerCase();

/**
 * Maps values of an object
 * @param {Record<string, T>} obj - The object to map
 * @param {Function} fn - The mapping function
 * @returns {Record<string, T>} A new object with mapped keys
 */
export function mapKeys<T>(
  obj: Record<string, T>,
  fn: (value: T, key: string) => string,
): Record<string, T> {
  const result: Record<string, T> = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    const newKey = fn(value, key);

    result[newKey] = value;
  });

  return result;
}

/**
 * Omits keys from an object
 * @param {T} obj - The object to omit keys from
 * @param {string[]} keys - The keys to omit
 * @returns {Partial<T>} A new object with keys omitted
 */
export function omit<T extends Record<string, unknown>>(obj: T, keys: string[]): Partial<T> {
  const result = { ...obj };

  keys.forEach((key) => {
    delete result[key];
  });

  return result;
}

/**
 * Escapes a selector string
 * @param {string} str - The string to escape
 * @returns {string} The escaped selector string
 */
export const escapeSelector = (str: string): string => {
  if (typeof CSS !== 'undefined' && CSS.escape) {
    return CSS.escape(str);
  }

  return str.replace(/([^\w-])/g, '\\$1');
};

/**
 * Flattens a theme object
 * @param {TTarget} obj - The theme object to flatten
 * @returns {Record<string, unknown>} The flattened theme object
 */
export const flattenThemeObject = <TTarget>(obj: TTarget): Record<string, unknown> => {
  return flatten(obj, {
    safe: true,
    delimiter: '-',
  }) as Record<string, unknown>;
};

// ─────────────────────────────────────────────────────────────
// Color Conversion Utilities
// ─────────────────────────────────────────────────────────────

/**
 * Converts sRGB to Linear RGB
 * @param {number} c - The color component value
 * @returns {number} The linear RGB value
 */
function srgbToLinear(c: number): number {
  return c <= SRGB_TO_LINEAR_THRESHOLD
    ? c / SRGB_TO_LINEAR_DIVISOR
    : Math.pow((c + SRGB_TO_LINEAR_OFFSET) / SRGB_TO_LINEAR_SCALAR, SRGB_TO_LINEAR_POWER);
}

/**
 * Converts RGB [0-255] to OKLCH [L: 0-1, C: 0-0.4, H: 0-360]
 * @param {number} r - The red component
 * @param {number} g - The green component
 * @param {number} b - The blue component
 * @returns {[number, number, number]} The OKLCH color components
 */
export function rgbToOklch(r: number, g: number, b: number): [number, number, number] {
  // Normalize RGB to 0-1
  const rn = r / RGB_MAX_VALUE;
  const gn = g / RGB_MAX_VALUE;
  const bn = b / RGB_MAX_VALUE;

  // Convert to linear RGB
  const lr = srgbToLinear(rn);
  const lg = srgbToLinear(gn);
  const lb = srgbToLinear(bn);

  // Convert to Oklab via linear transformation
  const lLinear = L_COEFF_LR * lr + L_COEFF_LG * lg + L_COEFF_LB * lb;
  const mLinear = M_COEFF_LR * lr + M_COEFF_LG * lg + M_COEFF_LB * lb;
  const sLinear = S_COEFF_LR * lr + S_COEFF_LG * lg + S_COEFF_LB * lb;

  const l = Math.cbrt(lLinear);
  const m = Math.cbrt(mLinear);
  const s = Math.cbrt(sLinear);

  // Oklab values
  const L = OKLAB_L_COEFF_L * l + OKLAB_L_COEFF_M * m - OKLAB_L_COEFF_S * s;
  const a = OKLAB_A_COEFF_L * l - OKLAB_A_COEFF_M * m + OKLAB_A_COEFF_S * s;
  const bOk = OKLAB_B_COEFF_L * l + OKLAB_B_COEFF_M * m - OKLAB_B_COEFF_S * s;

  // Convert Oklab to OKLCH
  const C = Math.sqrt(a * a + bOk * bOk);
  let H = (Math.atan2(bOk, a) * DEGREES_180) / Math.PI;

  if (H < 0) {
    H += DEGREES_360;
  }

  // Round to 4 decimal places
  return [
    Math.round(L * PRECISION_4) / PRECISION_4,
    Math.round(C * PRECISION_4) / PRECISION_4,
    Math.round(H * PRECISION_2) / PRECISION_2,
  ];
}

/**
 * Parses a color value and converts to OKLCH format
 * @param {string} colorValue - The color string to parse
 * @returns {ParsedColor | null} The parsed color object or null if invalid
 */
export function parseColorValue(colorValue: string): ParsedColor | null {
  try {
    const trimmed = colorValue.trim();

    // Handle oklch input - pass through directly
    if (trimmed.startsWith('oklch(')) {
      // Handle oklch(var(--variable)) specifically
      const oklchVarMatch = trimmed.match(/oklch\((var\(--[^)]+\))\)/);

      if (oklchVarMatch) {
        return { cssFn: 'var', components: [oklchVarMatch[1]] };
      }

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

    // Handle var() input - pass through directly as a single component
    if (trimmed.startsWith('var(')) {
      return { cssFn: 'var', components: [trimmed] };
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
 * @param {(string | number)[]} components - The color components array
 * @returns {string} The formatted color string
 */
export function formatColorComponents(components: (string | number)[]): string {
  return components.filter((c) => c !== undefined).join(' ');
}

/**
 * Check if key is a numeric shade (50, 100-900, 950)
 * @param {string} key - The key to check
 * @returns {boolean} True if key is a numeric shade
 */
export const isNumericShade = (key: string): boolean =>
  /^(50|100|200|300|400|500|600|700|800|900|950)$/.test(key);

/** Regex to extract color base name from flattened key */
export const COLOR_NAME_REGEX = /^([a-z]+)-(50|100|200|300|400|500|600|700|800|900|950)$/i;
