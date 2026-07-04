/**
 * Get element by id with proper typing
 * @param {string} id - The element ID
 * @returns {T | null} The element or null
 */
export function getElementById<T extends HTMLElement = HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

/**
 * Check if element contains another element
 * @param {Element | null} parent - The parent element
 * @param {Element | null} child - The child element
 * @returns {boolean} True if the parent contains the child
 */
export function contains(parent: Element | null, child: Element | null): boolean {
  if (!parent || !child) {
    return false;
  }

  return parent === child || parent.contains(child);
}

/**
 * Focus management utilities
 */
export const focus = {
  /**
   * Focus element and scroll into view
   * @param {HTMLElement | null} element - The element to focus
   * @param {FocusOptions & ScrollIntoViewOptions} [options] - Options for focus and scroll
   */
  set: (element: HTMLElement | null, options?: FocusOptions & ScrollIntoViewOptions) => {
    if (!element) {
      return;
    }
    element.focus(options);
    element.scrollIntoView({ block: 'nearest', ...options });
  },

  /**
   * Get all focusable elements within container
   * @param {HTMLElement} container - The container element to search
   * @returns {Array<HTMLElement>} An array of focusable elements
   */
  getFocusable: (container: HTMLElement): HTMLElement[] => {
    const selector = [
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'button:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ].join(',');

    return [...container.querySelectorAll(selector)];
  },

  /**
   * Get first focusable element
   * @param {HTMLElement} container - The container element to search
   * @returns {HTMLElement | null} The first focusable element or null
   */
  getFirst: (container: HTMLElement): HTMLElement | null => {
    return focus.getFocusable(container)[0] || null;
  },

  /**
   * Get last focusable element
   * @param {HTMLElement} container - The container element to search
   * @returns {HTMLElement | null} The last focusable element or null
   */
  getLast: (container: HTMLElement): HTMLElement | null => {
    const focusable = focus.getFocusable(container);

    return focusable.at(-1) || null;
  },
};
