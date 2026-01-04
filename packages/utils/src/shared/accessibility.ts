/**
 * ARIA utilities for accessible components
 */

/**
 * Generate ARIA attributes for form controls
 */
export function getAriaFormProps({
  id,
  label,
  description,
  errorMessage,
  isRequired = false,
  isInvalid = false,
  isDisabled = false,
  isReadOnly = false,
}: {
  id?: string;
  label?: string;
  description?: string;
  errorMessage?: string;
  isRequired?: boolean;
  isInvalid?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
}) {
  const describedBy = [
    description && `${id}-description`,
    isInvalid && errorMessage && `${id}-error`,
  ].filter(Boolean).join(' ') || undefined;

  return {
    id,
    'aria-label': label,
    'aria-describedby': describedBy,
    'aria-required': isRequired || undefined,
    'aria-invalid': isInvalid || undefined,
    'aria-disabled': isDisabled || undefined,
    'aria-readonly': isReadOnly || undefined,
  };
}

/**
 * Generate ARIA attributes for disclosure components (collapsible, accordion, etc.)
 */
export function getAriaDisclosureProps({
  id,
  isExpanded,
  controls,
}: {
  id?: string;
  isExpanded: boolean;
  controls?: string;
}) {
  return {
    'aria-expanded': isExpanded,
    'aria-controls': controls || `${id}-content`,
  };
}

/**
 * Generate ARIA attributes for listbox/combobox
 */
export function getAriaListboxProps({
  id,
  isOpen,
  activeDescendant,
  multiselectable = false,
}: {
  id?: string;
  isOpen: boolean;
  activeDescendant?: string;
  multiselectable?: boolean;
}) {
  return {
    role: 'listbox',
    'aria-expanded': isOpen,
    'aria-activedescendant': activeDescendant,
    'aria-multiselectable': multiselectable || undefined,
  };
}

/**
 * Generate ARIA attributes for dialog/modal
 */
export function getAriaDialogProps({
  id,
  labelledBy,
  describedBy,
  modal = true,
}: {
  id?: string;
  labelledBy?: string;
  describedBy?: string;
  modal?: boolean;
}) {
  return {
    role: 'dialog',
    'aria-modal': modal,
    'aria-labelledby': labelledBy || `${id}-title`,
    'aria-describedby': describedBy || `${id}-description`,
  };
}

/**
 * Generate ARIA attributes for tabs
 */
export function getAriaTabsProps({
  id,
  selectedIndex,
  orientation = 'horizontal',
}: {
  id?: string;
  selectedIndex: number;
  orientation?: 'horizontal' | 'vertical';
}) {
  return {
    tabList: {
      role: 'tablist',
      'aria-orientation': orientation,
    },
    tab: (index: number) => ({
      role: 'tab',
      'aria-selected': index === selectedIndex,
      'aria-controls': `${id}-panel-${index}`,
      id: `${id}-tab-${index}`,
      tabIndex: index === selectedIndex ? 0 : -1,
    }),
    panel: (index: number) => ({
      role: 'tabpanel',
      'aria-labelledby': `${id}-tab-${index}`,
      id: `${id}-panel-${index}`,
      hidden: index !== selectedIndex,
    }),
  };
}

/**
 * Screen reader utilities
 */
export const screenReader = {
  /**
   * Announce message to screen readers
   */
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = message;
    
    document.body.appendChild(announcer);
    
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  },

  /**
   * Create visually hidden element for screen readers
   */
  createHidden: (text: string) => {
    const element = document.createElement('span');
    element.className = 'sr-only';
    element.textContent = text;
    return element;
  },
};

/**
 * Live region utilities
 */
export const liveRegion = {
  /**
   * Create live region element
   */
  create: (priority: 'polite' | 'assertive' = 'polite') => {
    const region = document.createElement('div');
    region.setAttribute('aria-live', priority);
    region.setAttribute('aria-atomic', 'true');
    region.className = 'sr-only';
    document.body.appendChild(region);
    return region;
  },

  /**
   * Update live region content
   */
  update: (region: HTMLElement, message: string) => {
    region.textContent = message;
  },

  /**
   * Remove live region
   */
  remove: (region: HTMLElement) => {
    if (region.parentNode) {
      region.parentNode.removeChild(region);
    }
  },
};

/**
 * Focus trap utilities
 */
export const focusTrap = {
  /**
   * Get tabbable elements within container
   */
  getTabbable: (container: HTMLElement): HTMLElement[] => {
    const selector = [
      'input:not([disabled]):not([tabindex="-1"])',
      'select:not([disabled]):not([tabindex="-1"])',
      'textarea:not([disabled]):not([tabindex="-1"])',
      'button:not([disabled]):not([tabindex="-1"])',
      'a[href]:not([tabindex="-1"])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]:not([tabindex="-1"])',
    ].join(',');
    
    return Array.from(container.querySelectorAll(selector))
      .filter((el) => {
        const element = el as HTMLElement;
        return element.offsetParent !== null && !element.hidden;
      }) as HTMLElement[];
  },

  /**
   * Create focus trap
   */
  create: (container: HTMLElement) => {
    const tabbable = focusTrap.getTabbable(container);
    const firstTabbable = tabbable[0];
    const lastTabbable = tabbable[tabbable.length - 1];

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        if (document.activeElement === firstTabbable) {
          event.preventDefault();
          lastTabbable?.focus();
        }
      } else {
        if (document.activeElement === lastTabbable) {
          event.preventDefault();
          firstTabbable?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    return {
      destroy: () => {
        container.removeEventListener('keydown', handleKeyDown);
      },
      updateTabbable: () => {
        const newTabbable = focusTrap.getTabbable(container);
        return {
          first: newTabbable[0],
          last: newTabbable[newTabbable.length - 1],
        };
      },
    };
  },
};