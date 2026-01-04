import { flatten } from "flat";


/**
 * Converts a string to kebab-case
 */
export const kebabCase = (str: string) => str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

/**
 * Maps values of an object
 */
export function mapKeys<T>(obj: Record<string, T>, fn: (value: T, key: string) => string): Record<string, T> {
  const result: Record<string, T> = {};
  Object.keys(obj).forEach((key) => {
    result[fn(obj[key], key)] = obj[key];
  });
  return result;
}

/**
 * Omits keys from an object
 */
export function omit<T extends Record<string, any>>(obj: T, keys: string[]) {
  const result = {...obj};
  keys.forEach((key) => delete result[key]);
  return result;
}

/**
 * Escapes a selector string
 */
export const escapeSelector = (str: string) => {
  if (typeof CSS !== "undefined" && CSS.escape) {
    return CSS.escape(str);
  }
  return str.replace(/([^\w-])/g, "\\$1");
};


/**
 * Inverts the values of a color scale (e.g., 50 <-> 900)
 */
// export function invertColorScale(colors: Record<string, string | number>): Record<string, string | number> {
//   const keys = Object.keys(colors);
//   const values = Object.values(colors).reverse();

//   return keys.reduce((acc, key, i) => {
//     acc[key] = values[i];
//     return acc;
//   }, {} as Record<string, string | number>);
// }


/**
 * Flattens a theme object
 * (Equivalent to flatten)
 */
export const flattenThemeObject = <TTarget>(obj: TTarget) => {
  return flatten(obj, {
    safe: true,
    delimiter: "-",
  }) as Record<string, any>;
};
