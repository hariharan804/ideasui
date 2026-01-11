/**
 * Get element by id with proper typing
 * @param id
 */
export function getElementById<T extends HTMLElement = HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

/**
 * Check if element contains another element
 * @param parent
 * @param child
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
   * @param element
   * @param options
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
   * @param container
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

    return Array.from(container.querySelectorAll(selector));
  },

  /**
   * Get first focusable element
   * @param container
   */
  getFirst: (container: HTMLElement): HTMLElement | null => {
    return focus.getFocusable(container)[0] || null;
  },

  /**
   * Get last focusable element
   * @param container
   */
  getLast: (container: HTMLElement): HTMLElement | null => {
    const focusable = focus.getFocusable(container);

    return focusable[focusable.length - 1] || null;
  },
};
