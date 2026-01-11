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
 * Compose multiple event handlers
 */
export function composeEventHandlers<E>(
  originalEventHandler?: (event: E) => void,
  ourEventHandler?: (event: E) => void,
  { checkForDefaultPrevented = true } = {},
) {
  return function handleEvent(event: E) {
    originalEventHandler?.(event);

    if (checkForDefaultPrevented === false || !(event as any)?.defaultPrevented) {
      return ourEventHandler?.(event);
    }
  };
}
