/**
 * Get element attribute with fallback
 * @param element
 * @param name
 * @param fallback
 */
export function getAttr(element: Element, name: string, fallback?: string): string | null {
  return element.getAttribute(name) ?? fallback ?? null;
}

/**
 * Set multiple attributes on element
 * @param element
 * @param attrs
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
 * @param element
 * @param name
 * @param condition
 * @param value
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
 * @param element
 * @param name
 */
export function hasAttr(element: Element, name: string): boolean {
  return element.hasAttribute(name);
}

/**
 * Get data attribute with type conversion
 * @param element
 * @param name
 */
export function getDataAttr<T = string>(element: Element, name: string): T | null {
  const value = element.getAttribute(`data-${name}`);

  if (value === null) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return value as T;
  }
}

/**
 * Set data attribute with JSON serialization
 * @param element
 * @param name
 * @param value
 */
export function setDataAttr(element: Element, name: string, value: any): void {
  const serialized = typeof value === 'string' ? value : JSON.stringify(value);

  element.setAttribute(`data-${name}`, serialized);
}

/**
 * Convert object to data attributes
 * @param data
 */
export function toDataAttrs(data: Record<string, any>): Record<string, string> {
  const result: Record<string, string> = {};

  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      const dataKey = `data-${key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)}`;

      result[dataKey] = typeof value === 'string' ? value : JSON.stringify(value);
    }
  });

  return result;
}
