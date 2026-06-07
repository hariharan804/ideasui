/**
 * Convert CSS value to pixels
 * @param {string | number} value - Value to convert
 * @returns {string} Value in pixels
 */
export function toPx(value: string | number): string {
  return typeof value === 'number' ? `${value}px` : value;
}

const DEFAULT_REM_BASE = 16;

/**
 * Convert CSS value to rem
 * @param {number} value - Value in pixels
 * @param {number} [base=16] - Base font size
 * @returns {string} Value in rem
 */
export function toRem(value: number, base = DEFAULT_REM_BASE): string {
  return `${value / base}rem`;
}

/**
 * Parse CSS value to number
 * @param {string} value - CSS string value
 * @returns {number} Parsed number
 */
export function parseValue(value: string): number {
  const parsed = parseFloat(value.replace(/[^\d.-]/g, ''));

  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Get CSS custom property value
 * @param {string} name - Variable name
 * @param {Element} [element] - Target element
 * @returns {string} Variable value
 */
export function getCSSVar(name: string, element?: Element): string {
  const target = element || document.documentElement;
  const varName = name.startsWith('--') ? name : `--${name}`;

  return getComputedStyle(target).getPropertyValue(varName).trim();
}

/**
 * Set CSS custom property
 * @param {string} name - Variable name
 * @param {string | number} value - Variable value
 * @param {Element} [element] - Target element
 */
export function setCSSVar(name: string, value: string | number, element?: Element): void {
  const target = element || document.documentElement;
  const varName = name.startsWith('--') ? name : `--${name}`;
  const varValue = typeof value === 'number' ? `${value}px` : value;

  (target as HTMLElement).style.setProperty(varName, varValue);
}

/**
 * Remove CSS custom property
 * @param {string} name - Variable name
 * @param {Element} [element] - Target element
 */
export function removeCSSVar(name: string, element?: Element): void {
  const target = element || document.documentElement;
  const varName = name.startsWith('--') ? name : `--${name}`;

  (target as HTMLElement).style.removeProperty(varName);
}

/**
 * Set multiple CSS custom properties
 * @param {Record<string, string | number>} vars - Object of variables
 * @param {Element} [element] - Target element
 */
export function setCSSVars(vars: Record<string, string | number>, element?: Element): void {
  Object.entries(vars).forEach(([name, value]) => {
    setCSSVar(name, value, element);
  });
}

/**
 * Get multiple CSS custom properties
 * @param {string[]} names - Array of variable names
 * @param {Element} [element] - Target element
 * @returns {Record<string, string>} Object of variable values
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
 * @param {Record<string, string | number>} vars - Input variables
 * @returns {Record<string, string>} formatted CSS variables
 */
export function createCSSVars(vars: Record<string, string | number>): Record<string, string> {
  const result: Record<string, string> = {};

  Object.entries(vars).forEach(([key, value]) => {
    const cssVar = key.startsWith('--') ? key : `--${key}`;

    result[cssVar] = typeof value === 'number' ? `${value}px` : value;
  });

  return result;
}

const UNITLESS_PROPERTIES = new Set([
  'animationIterationCount',
  'borderImageOutset',
  'borderImageSlice',
  'borderImageWidth',
  'boxFlex',
  'boxFlexGroup',
  'boxOrdinalGroup',
  'columnCount',
  'columns',
  'flex',
  'flexGrow',
  'flexPositive',
  'flexShrink',
  'flexNegative',
  'flexOrder',
  'gridArea',
  'gridRow',
  'gridRowEnd',
  'gridRowSpan',
  'gridRowStart',
  'gridColumn',
  'gridColumnEnd',
  'gridColumnSpan',
  'gridColumnStart',
  'fontWeight',
  'lineClamp',
  'lineHeight',
  'opacity',
  'order',
  'orphans',
  'tabSize',
  'widows',
  'zIndex',
  'zoom',
  // SVG
  'fillOpacity',
  'floodOpacity',
  'stopOpacity',
  'strokeDasharray',
  'strokeDashoffset',
  'strokeMiterlimit',
  'strokeOpacity',
  'strokeWidth',
]);

/**
 * Convert object to CSS style string
 * @param {Record<string, string | number>} styles - Style object
 * @returns {string} CSS string
 */
export function toStyleString(styles: Record<string, string | number>): string {
  return Object.entries(styles)
    .map(([key, value]) => {
      const cssKey = key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
      const isUnitless = UNITLESS_PROPERTIES.has(key);
      const cssValue = typeof value === 'number' && !isUnitless ? `${value}px` : value;

      return `${cssKey}: ${cssValue}`;
    })
    .join('; ');
}

/**
 * Merge style objects
 * @param {Array<Record<string, string | number> | undefined>} styles - Objects to merge
 * @returns {Record<string, string | number>} Merged style object
 */
export function mergeStyles(
  ...styles: Array<Record<string, string | number> | undefined>
): Record<string, string | number> {
  return Object.assign({}, ...styles.filter(Boolean));
}

/**
 * Check if element is visible
 * @param {HTMLElement} element - Target element
 * @returns {boolean} True if visible
 */
export function isVisible(element: HTMLElement): boolean {
  const style = getComputedStyle(element);

  return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
}

/**
 * Dimensions object interface
 */
interface Dimensions {
  width: number;
  height: number;
  offsetWidth: number;
  offsetHeight: number;
  scrollWidth: number;
  scrollHeight: number;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
}

/**
 * Get element dimensions
 * @param {HTMLElement} element - Target element
 * @returns {Dimensions} Dimensions object
 */
export function getDimensions(element: HTMLElement): Dimensions {
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
