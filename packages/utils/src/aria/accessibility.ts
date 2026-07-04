import type { ReactNode } from 'react';

import { isValidElement } from 'react';

import { focus } from '../client/dom';

const ANNOUNCEMENT_TIMEOUT = 1000;

/**
 * Convert boolean to data attribute value
 * @param {boolean | undefined} condition - The condition to evaluate
 * @returns {string | undefined} 'true' if condition is true, otherwise undefined
 */
export function toDataAttr(condition: boolean | undefined): string | undefined {
  return condition ? 'true' : undefined;
}

/**
 * ARIA form props generator
 * @param {object} options - Generation options
 * @param {boolean} [options.required] - Whether the field is required
 * @param {boolean} [options.invalid] - Whether the field is invalid
 * @param {string} [options.describedBy] - ID of element describing the field
 * @param {string} [options.labelledBy] - ID of element labelling the field
 * @returns {Record<string, string | undefined>} ARIA props object
 */
export function getAriaFormProps(options: {
  required?: boolean;
  invalid?: boolean;
  describedBy?: string;
  labelledBy?: string;
}): Record<string, string | undefined> {
  return {
    'aria-required': options.required ? 'true' : undefined,
    'aria-invalid': options.invalid ? 'true' : undefined,
    'aria-describedby': options.describedBy,
    'aria-labelledby': options.labelledBy,
  };
}

/**
 * ARIA disclosure props generator (for dropdowns, modals)
 * @param {object} options - Generation options
 * @param {boolean} options.expanded - Whether component is expanded
 * @param {string} [options.controls] - ID of controlled element
 * @param {boolean | string} [options.hasPopup] - Popup type
 * @returns {Record<string, string | boolean | undefined>} ARIA props object
 */
export function getAriaDisclosureProps(options: {
  expanded: boolean;
  controls?: string;
  hasPopup?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
}): Record<string, string | boolean | undefined> {
  return {
    'aria-expanded': options.expanded ? 'true' : 'false',
    'aria-controls': options.controls,
    'aria-haspopup': options.hasPopup === true ? 'true' : options.hasPopup,
  };
}

/**
 * ARIA listbox props generator
 * @param {object} options - Generation options
 * @param {boolean} [options.multiselectable] - Whether multiple selection is allowed
 * @param {string} [options.orientation] - Listbox orientation
 * @param {string} [options.activedescendant] - ID of active item
 * @returns {Record<string, string | undefined>} ARIA props object
 */
export function getAriaListboxProps(options: {
  multiselectable?: boolean;
  orientation?: 'horizontal' | 'vertical';
  activedescendant?: string;
}): Record<string, string | undefined> {
  return {
    role: 'listbox',
    'aria-multiselectable': options.multiselectable ? 'true' : undefined,
    'aria-orientation': options.orientation,
    'aria-activedescendant': options.activedescendant,
  };
}

/**
 * ARIA dialog props generator
 * @param {object} options - Generation options
 * @param {string} [options.labelledBy] - ID of element labelling the dialog
 * @param {string} [options.describedBy] - ID of element describing the dialog
 * @param {boolean} [options.modal] - Whether dialog is modal
 * @returns {Record<string, string | undefined>} ARIA props object
 */
export function getAriaDialogProps(options: {
  labelledBy?: string;
  describedBy?: string;
  modal?: boolean;
}): Record<string, string | undefined> {
  return {
    role: options.modal ? 'dialog' : 'alertdialog',
    'aria-modal': options.modal ? 'true' : undefined,
    'aria-labelledby': options.labelledBy,
    'aria-describedby': options.describedBy,
  };
}

/**
 * ARIA tabs props generator
 * @param {object} options - Generation options
 * @param {string} [options.orientation] - Tabs orientation
 * @param {string} [options.activedescendant] - ID of active tab
 * @returns {Record<string, string | undefined>} ARIA props object
 */
export function getAriaTabsProps(options: {
  orientation?: 'horizontal' | 'vertical';
  activedescendant?: string;
}): Record<string, string | undefined> {
  return {
    role: 'tablist',
    'aria-orientation': options.orientation || 'horizontal',
    'aria-activedescendant': options.activedescendant,
  };
}

/**
 * Screen reader utilities
 */
export const screenReader = {
  /**
   * Announce message to screen readers
   * @param {string} message - Message to announce
   * @param {string} [priority='polite'] - Announcement priority
   */
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite'): void => {
    const announcement = document.createElement('div');

    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.append(announcement);

    setTimeout(() => {
      announcement.remove();
    }, ANNOUNCEMENT_TIMEOUT);
  },

  /**
   * Create screen reader only text
   * @param {string} text - Text content
   * @returns {HTMLSpanElement} Sr-only element
   */
  only: (text: string): HTMLSpanElement => {
    const span = document.createElement('span');

    span.className = 'sr-only';
    span.textContent = text;

    return span;
  },
};

/**
 * Live region utilities
 */
export const liveRegion = {
  /**
   * Create live region element
   * @param {string} [priority='polite'] - Live region priority
   * @returns {HTMLDivElement} Live region element
   */
  create: (priority: 'polite' | 'assertive' = 'polite'): HTMLDivElement => {
    const region = document.createElement('div');

    region.setAttribute('aria-live', priority);
    region.setAttribute('aria-atomic', 'true');
    region.className = 'sr-only';

    return region;
  },

  /**
   * Update live region content
   * @param {HTMLElement} element - Region element
   * @param {string} message - New content
   */
  update: (element: HTMLElement, message: string): void => {
    element.textContent = message;
  },
};

/**
 * Focus trap utilities
 */
export const focusTrap = {
  /**
   * Get focusable elements
   * @param {HTMLElement} container - Container to search
   * @returns {Array<HTMLElement>} Focusable elements
   */
  getFocusable: (container: HTMLElement): HTMLElement[] => {
    return focus.getFocusable(container);
  },

  /**
   * Trap focus within container
   * @param {HTMLElement} container - Trap container
   * @returns {Function} Cleanup function
   */
  trap: (container: HTMLElement): (() => void) => {
    const focusable = focusTrap.getFocusable(container);
    const first = focusable[0];
    const last = focusable.at(-1);

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key !== 'Tab') {
        return;
      }

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    first?.focus();

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  },
};

/**
 * Extracts plain text from React children.
 * Useful for generating accessible names from nested components.
 * @param {ReactNode} children - React children to process
 * @param {number} [depth=0] - Current recursion depth
 * @returns {string} Extracted text
 * @internal
 */
export function extractTextFromChildren(children: ReactNode, depth = 0): string {
  if (depth > 10) {
    return '';
  }

  if (typeof children === 'string' || typeof children === 'number') {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map((child) => extractTextFromChildren(child as ReactNode, depth + 1)).join('');
  }

  if (isValidElement(children)) {
    // @ts-expect-error - children.props might not have children in its type definition but it exists at runtime for many components
    return extractTextFromChildren(children.props.children, depth + 1);
  }

  return '';
}

/**
 * Helper to determine the accessible name for a component.
 * Priority: aria-label > aria-labelledby > children text.
 * @param {object} props - Component props
 * @param {ReactNode} [children] - Component children
 * @returns {string | undefined} The resolved accessible name
 */
export function getAccessibleName(
  properties: { 'aria-label'?: string; 'aria-labelledby'?: string },
  children?: ReactNode,
): string | undefined {
  if (properties['aria-label']) {
    return properties['aria-label'];
  }

  if (properties['aria-labelledby']) {
    return undefined; // Handled by aria-labelledby attribute itself
  }

  const extractedText = extractTextFromChildren(children).trim();

  return extractedText || undefined;
}
