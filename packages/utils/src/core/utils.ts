const RANDOM_STRING_BASE = 36;
const ID_SUFFIX_LENGTH = 9;

/**
 * Generate a unique ID with optional prefix
 * @param {string} [prefix='ideasui'] - The prefix for the ID
 * @returns {string} The unique ID
 */
export function getUniqueID(prefix: string = 'ideasui'): string {
  const randomArray = new Uint32Array(1);

  globalThis.crypto.getRandomValues(randomArray);
  const randomString = randomArray[0]
    .toString(RANDOM_STRING_BASE)
    .slice(0, ID_SUFFIX_LENGTH)
    .padEnd(ID_SUFFIX_LENGTH, '0');

  return `${prefix}${Date.now()}-${randomString}`;
}

/**
 * Clamp number between min and max
 * @param {number} value - The value to clamp
 * @param {number} min - The minimum value
 * @param {number} max - The maximum value
 * @returns {number} The clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Check if value is numeric
 * @param {unknown} value - The value to check
 * @returns {boolean} True if the value is numeric
 */
export function isNumeric(value: unknown): value is number {
  if (typeof value === 'number') {
    return !isNaN(value) && isFinite(value);
  }

  if (typeof value === 'string' && value.trim() !== '') {
    return !isNaN(Number.parseFloat(value)) && isFinite(Number(value));
  }

  return false;
}

/**
 * Convert value to number with fallback
 * @param {unknown} value - The value to convert
 * @param {number} [fallback=0] - The fallback value if conversion fails
 * @returns {number} The converted number or fallback
 */
export function toNumber(value: unknown, fallback = 0): number {
  return isNumeric(value) ? Number(value) : fallback;
}

/**
 * Create range array
 * @param {number} start - The start of the range
 * @param {number} [end] - The end of the range
 * @param {number} [step=1] - The step between values
 * @returns {Array<number>} The range array
 */
export function range(start: number, end?: number, step = 1): number[] {
  let rangeEnd = end;
  let rangeStart = start;

  if (rangeEnd === undefined) {
    rangeEnd = start;
    rangeStart = 0;
  }

  const result: number[] = [];

  for (let index = rangeStart; index < rangeEnd; index += step) {
    result.push(index);
  }

  return result;
}

/**
 * Omit keys from object
 * @param {T} obj - The object to omit keys from
 * @param {Array<K>} keys - The keys to omit
 * @returns {Omit<T, K>} The object without the omitted keys
 */
export function omit<T extends Record<string, unknown>, K extends keyof T>(
  object: T,
  keys: K[],
): Omit<T, K> {
  const result = { ...object };

  for (const key of keys) {
    delete result[key];
  }

  return result as Omit<T, K>;
}

/**
 * Pick keys from object
 * @param {T} obj - The object to pick keys from
 * @param {Array<K>} keys - The keys to pick
 * @returns {Pick<T, K>} The object with only the picked keys
 */
export function pick<T extends Record<string, unknown>, K extends keyof T>(
  object: T,
  keys: K[],
): Pick<T, K> {
  const result = {} as Pick<T, K>;

  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      result[key] = object[key];
    }
  }

  return result;
}
