/**
 * Convert CSS value to pixels
 */
export function toPx(value: string | number): string {
  return typeof value === 'number' ? `${value}px` : value;
}

/**
 * Convert CSS value to rem
 */
export function toRem(value: number, base = 16): string {
  return `${value / base}rem`;
}

/**
 * Parse CSS value to number
 */
export function parseValue(value: string): number {
  return parseFloat(value.replace(/[^\d.-]/g, ''));
}

/**
 * Get CSS custom property value
 */
export function getCSSVar(name: string, element?: Element): string {
  const target = element || document.documentElement;
  const varName = name.startsWith('--') ? name : `--${name}`;
  return getComputedStyle(target).getPropertyValue(varName).trim();
}

/**
 * Set CSS custom property
 */
export function setCSSVar(name: string, value: string | number, element?: Element): void {
  const target = element || document.documentElement;
  const varName = name.startsWith('--') ? name : `--${name}`;
  const varValue = typeof value === 'number' ? `${value}px` : value;
  (target as HTMLElement).style.setProperty(varName, varValue);
}

/**
 * Remove CSS custom property
 */
export function removeCSSVar(name: string, element?: Element): void {
  const target = element || document.documentElement;
  const varName = name.startsWith('--') ? name : `--${name}`;
  (target as HTMLElement).style.removeProperty(varName);
}

/**
 * Set multiple CSS custom properties
 */
export function setCSSVars(vars: Record<string, string | number>, element?: Element): void {
  Object.entries(vars).forEach(([name, value]) => {
    setCSSVar(name, value, element);
  });
}

/**
 * Get multiple CSS custom properties
 */
export function getCSSVars(names: string[], element?: Element): Record<string, string> {
  const result: Record<string, string> = {};
  names.forEach((name) => {
    result[name] = getCSSVar(name, element);
  });
  return result;
}

/**
 * Create CSS custom properties object
 */
export function createCSSVars(vars: Record<string, string | number>): Record<string, string> {
  const result: Record<string, string> = {};

  Object.entries(vars).forEach(([key, value]) => {
    const cssVar = key.startsWith('--') ? key : `--${key}`;
    result[cssVar] = typeof value === 'number' ? `${value}px` : value;
  });

  return result;
}

/**
 * Convert object to CSS style string
 */
export function toStyleString(styles: Record<string, string | number>): string {
  return Object.entries(styles)
    .map(([key, value]) => {
      const cssKey = key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
      const cssValue = typeof value === 'number' ? `${value}px` : value;
      return `${cssKey}: ${cssValue}`;
    })
    .join('; ');
}

/**
 * Merge style objects
 */
export function mergeStyles(
  ...styles: Array<Record<string, string | number> | undefined>
): Record<string, string | number> {
  return Object.assign({}, ...styles.filter(Boolean));
}

/**
 * Check if element is visible
 */
export function isVisible(element: HTMLElement): boolean {
  const style = getComputedStyle(element);
  return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
}

/**
 * Get element dimensions
 */
export function getDimensions(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const style = getComputedStyle(element);

  return {
    width: rect.width,
    height: rect.height,
    offsetWidth: element.offsetWidth,
    offsetHeight: element.offsetHeight,
    scrollWidth: element.scrollWidth,
    scrollHeight: element.scrollHeight,
    marginTop: parseValue(style.marginTop),
    marginRight: parseValue(style.marginRight),
    marginBottom: parseValue(style.marginBottom),
    marginLeft: parseValue(style.marginLeft),
    paddingTop: parseValue(style.paddingTop),
    paddingRight: parseValue(style.paddingRight),
    paddingBottom: parseValue(style.paddingBottom),
    paddingLeft: parseValue(style.paddingLeft),
  };
}
