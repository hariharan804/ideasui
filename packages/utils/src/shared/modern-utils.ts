import { useCallback, useEffect, useRef } from 'react';

/**
 * Create stable callback that doesn't change on re-renders
 */
export function useEvent<T extends (...args: any[]) => any>(callback: T): T {
  const ref = useRef<T>(callback);
  
  useEffect(() => {
    ref.current = callback;
  });
  
  return useCallback(((...args) => ref.current(...args)) as T, []);
}

/**
 * Compose multiple event handlers
 */
export function composeEventHandlers<E>(
  originalEventHandler?: (event: E) => void,
  ourEventHandler?: (event: E) => void,
  { checkForDefaultPrevented = true } = {}
) {
  return function handleEvent(event: E) {
    originalEventHandler?.(event);

    if (
      checkForDefaultPrevented === false ||
      !(event as any)?.defaultPrevented
    ) {
      return ourEventHandler?.(event);
    }
  };
}

/**
 * Get element by id with proper typing
 */
export function getElementById<T extends HTMLElement = HTMLElement>(
  id: string
): T | null {
  return document.getElementById(id) as T | null;
}

/**
 * Check if element contains another element
 */
export function contains(parent: Element | null, child: Element | null): boolean {
  if (!parent || !child) return false;
  return parent === child || parent.contains(child);
}

/**
 * Focus management utilities
 */
export const focus = {
  /**
   * Focus element and scroll into view
   */
  set: (element: HTMLElement | null, options?: FocusOptions & ScrollIntoViewOptions) => {
    if (!element) return;
    element.focus(options);
    element.scrollIntoView({ block: 'nearest', ...options });
  },

  /**
   * Get all focusable elements within container
   */
  getFocusable: (container: HTMLElement): HTMLElement[] => {
    const selector = [
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'button:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]'
    ].join(',');
    
    return Array.from(container.querySelectorAll(selector));
  },

  /**
   * Get first focusable element
   */
  getFirst: (container: HTMLElement): HTMLElement | null => {
    return focus.getFocusable(container)[0] || null;
  },

  /**
   * Get last focusable element
   */
  getLast: (container: HTMLElement): HTMLElement | null => {
    const focusable = focus.getFocusable(container);
    return focusable[focusable.length - 1] || null;
  }
};

/**
 * Keyboard utilities
 */
export const keyboard = {
  /**
   * Check if key matches
   */
  is: (event: KeyboardEvent, key: string | string[]): boolean => {
    const keys = Array.isArray(key) ? key : [key];
    return keys.includes(event.key);
  },

  /**
   * Common key checks
   */
  isEnter: (event: KeyboardEvent) => keyboard.is(event, 'Enter'),
  isSpace: (event: KeyboardEvent) => keyboard.is(event, ' '),
  isEscape: (event: KeyboardEvent) => keyboard.is(event, 'Escape'),
  isArrowUp: (event: KeyboardEvent) => keyboard.is(event, 'ArrowUp'),
  isArrowDown: (event: KeyboardEvent) => keyboard.is(event, 'ArrowDown'),
  isArrowLeft: (event: KeyboardEvent) => keyboard.is(event, 'ArrowLeft'),
  isArrowRight: (event: KeyboardEvent) => keyboard.is(event, 'ArrowRight'),
  isTab: (event: KeyboardEvent) => keyboard.is(event, 'Tab'),
  isHome: (event: KeyboardEvent) => keyboard.is(event, 'Home'),
  isEnd: (event: KeyboardEvent) => keyboard.is(event, 'End'),
};

/**
 * Clamp number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Check if value is numeric
 */
export function isNumeric(value: any): value is number {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

/**
 * Convert value to number with fallback
 */
export function toNumber(value: any, fallback = 0): number {
  return isNumeric(value) ? Number(value) : fallback;
}

/**
 * Debounce function calls
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): T & { cancel: () => void } {
  let timeout: NodeJS.Timeout;
  
  const debounced = ((...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T & { cancel: () => void };
  
  debounced.cancel = () => clearTimeout(timeout);
  
  return debounced;
}

/**
 * Throttle function calls
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): T {
  let inThrottle: boolean;
  
  return ((...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  }) as T;
}

/**
 * Create range array
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
 */
export function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  keys.forEach(key => delete result[key]);
  return result;
}

/**
 * Pick keys from object
 */
export function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
}