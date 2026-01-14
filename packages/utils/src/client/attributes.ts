/**
 * Get element attribute with fallback
 * @param {Element} element - The element to get the attribute from
 * @param {string} name - The attribute name
 * @param {string} [fallback] - The fallback value if attribute is missing
 * @returns {string | null} The attribute value or fallback or null
 */
export function getAttr(element: Element, name: string, fallback?: string): string | null {
  return element.getAttribute(name) ?? fallback ?? null;
}

/**
 * Set multiple attributes on element
 * @param {Element} element - The element to set attributes on
 * @param {Record<string, string | null | undefined>} attrs - The attributes to set
 */
export function setAttrs(element: Element, attrs: Record<string, string | null | undefined>): void {
  Object.entries(attrs).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      element.removeAttribute(key);
    } else {
      element.setAttribute(key, value);
    }
  });
}

/**
 * Toggle attribute based on condition
 * @param {Element} element - The element to toggle attribute on
 * @param {string} name - The attribute name
 * @param {boolean} condition - Whether to add or remove the attribute
 * @param {string} [value=''] - The value to set if condition is true
 */
export function toggleAttr(element: Element, name: string, condition: boolean, value = ''): void {
  if (condition) {
    element.setAttribute(name, value);
  } else {
    element.removeAttribute(name);
  }
}

/**
 * Check if element has attribute
 * @param {Element} element - The element to check
 * @param {string} name - The attribute name
 * @returns {boolean} True if the element has the attribute
 */
export function hasAttr(element: Element, name: string): boolean {
  return element.hasAttribute(name);
}

/**
 * Get data attribute with type conversion
 * @param {Element} element - The element to get data attribute from
 * @param {string} name - The data attribute name suffix (without 'data-')
 * @returns {T | null} The parsed value or raw string or null
 */
export function getDataAttr<T = string>(element: Element, name: string): T | null {
  const value = element.getAttribute(`data-${name}`);

  if (value === null) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return value as unknown as T;
  }
}

/**
 * Set data attribute with JSON serialization
 * @param {Element} element - The element to set data attribute on
 * @param {string} name - The data attribute name suffix (without 'data-')
 * @param {unknown} value - The value to set (will be JSON stringified if not string)
 */
export function setDataAttr(element: Element, name: string, value: unknown): void {
  const serialized = typeof value === 'string' ? value : JSON.stringify(value);

  element.setAttribute(`data-${name}`, serialized);
}

/**
 * Convert object to data attributes
 * @param {Record<string, unknown>} data - The data object to convert
 * @returns {Record<string, string>} The data attributes object
 */
export function toDataAttrs(data: Record<string, unknown>): Record<string, string> {
  const result: Record<string, string> = {};

  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      const dataKey = `data-${key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)}`;

      result[dataKey] = typeof value === 'string' ? value : JSON.stringify(value);
    }
  });

  return result;
}
