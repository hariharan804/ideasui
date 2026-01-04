/**
 * ARIA form props generator
 */
export function getAriaFormProps(options: {
  required?: boolean;
  invalid?: boolean;
  describedBy?: string;
  labelledBy?: string;
}) {
  return {
    'aria-required': options.required ? 'true' : undefined,
    'aria-invalid': options.invalid ? 'true' : undefined,
    'aria-describedby': options.describedBy,
    'aria-labelledby': options.labelledBy,
  };
}

/**
 * ARIA disclosure props generator (for dropdowns, modals)
 */
export function getAriaDisclosureProps(options: {
  expanded: boolean;
  controls?: string;
  hasPopup?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
}) {
  return {
    'aria-expanded': options.expanded ? 'true' : 'false',
    'aria-controls': options.controls,
    'aria-haspopup': options.hasPopup === true ? 'true' : options.hasPopup,
  };
}

/**
 * ARIA listbox props generator
 */
export function getAriaListboxProps(options: {
  multiselectable?: boolean;
  orientation?: 'horizontal' | 'vertical';
  activedescendant?: string;
}) {
  return {
    role: 'listbox',
    'aria-multiselectable': options.multiselectable ? 'true' : undefined,
    'aria-orientation': options.orientation,
    'aria-activedescendant': options.activedescendant,
  };
}

/**
 * ARIA dialog props generator
 */
export function getAriaDialogProps(options: {
  labelledBy?: string;
  describedBy?: string;
  modal?: boolean;
}) {
  return {
    role: options.modal ? 'dialog' : 'alertdialog',
    'aria-modal': options.modal ? 'true' : undefined,
    'aria-labelledby': options.labelledBy,
    'aria-describedby': options.describedBy,
  };
}

/**
 * ARIA tabs props generator
 */
export function getAriaTabsProps(options: {
  orientation?: 'horizontal' | 'vertical';
  activedescendant?: string;
}) {
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
   */
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  },
  
  /**
   * Create screen reader only text
   */
  only: (text: string) => {
    const span = document.createElement('span');
    span.className = 'sr-only';
    span.textContent = text;
    return span;
  }
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
    return region;
  },
  
  /**
   * Update live region content
   */
  update: (element: HTMLElement, message: string) => {
    element.textContent = message;
  }
};

/**
 * Focus trap utilities
 */
export const focusTrap = {
  /**
   * Get focusable elements
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
   * Trap focus within container
   */
  trap: (container: HTMLElement) => {
    const focusable = focusTrap.getFocusable(container);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      
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
  }
};