/**
 * Generate a unique ID with optional prefix
 * @param prefix
 */
export function getUniqueID(prefix: string = 'ideasui'): string {
  return `${prefix}${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Clamp number between min and max
 * @param value
 * @param min
 * @param max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Check if value is numeric
 * @param value
 */
export function isNumeric(value: any): value is number {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

/**
 * Convert value to number with fallback
 * @param value
 * @param fallback
 */
export function toNumber(value: any, fallback = 0): number {
  return isNumeric(value) ? Number(value) : fallback;
}

/**
 * Create range array
 * @param start
 * @param end
 * @param step
 */
export function range(start: number, end?: number, step = 1): number[] {
  if (end === undefined) {
    end = start;
    start = 0;
  }

  const result: number[] = [];

  for (let i = start; i < end; i += step) {
    result.push(i);
  }

  return result;
}

/**
 * Omit keys from object
 * @param obj
 * @param keys
 */
export function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  const result = { ...obj };

  keys.forEach((key) => delete result[key]);

  return result;
}

/**
 * Pick keys from object
 * @param obj
 * @param keys
 */
export function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> {
  const result = {} as Pick<T, K>;

  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });

  return result;
}
