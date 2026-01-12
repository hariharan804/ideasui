/**
 * Keyboard utilities
 */
export const keyboard = {
  /**
   * Check if key matches
   * @param {KeyboardEvent} event - The keyboard event
   * @param {string | string[]} key - The key or keys to check against
   * @returns {boolean} True if the key matches
   */
  is: (event: KeyboardEvent, key: string | string[]): boolean => {
    const keys = Array.isArray(key) ? key : [key];

    return keys.includes(event.key);
  },

  /**
   * Common key checks
   * @param {KeyboardEvent} event - The keyboard event
   * @returns {boolean} True if the key is Enter
   */
  isEnter: (event: KeyboardEvent): boolean => keyboard.is(event, 'Enter'),

  /**
   * Check if Space key
   * @param {KeyboardEvent} event - The keyboard event
   * @returns {boolean} True if the key is Space
   */
  isSpace: (event: KeyboardEvent): boolean => keyboard.is(event, ' '),

  /**
   * Check if Escape key
   * @param {KeyboardEvent} event - The keyboard event
   * @returns {boolean} True if the key is Escape
   */
  isEscape: (event: KeyboardEvent): boolean => keyboard.is(event, 'Escape'),

  /**
   * Check if ArrowUp key
   * @param {KeyboardEvent} event - The keyboard event
   * @returns {boolean} True if the key is ArrowUp
   */
  isArrowUp: (event: KeyboardEvent): boolean => keyboard.is(event, 'ArrowUp'),

  /**
   * Check if ArrowDown key
   * @param {KeyboardEvent} event - The keyboard event
   * @returns {boolean} True if the key is ArrowDown
   */
  isArrowDown: (event: KeyboardEvent): boolean => keyboard.is(event, 'ArrowDown'),

  /**
   * Check if ArrowLeft key
   * @param {KeyboardEvent} event - The keyboard event
   * @returns {boolean} True if the key is ArrowLeft
   */
  isArrowLeft: (event: KeyboardEvent): boolean => keyboard.is(event, 'ArrowLeft'),

  /**
   * Check if ArrowRight key
   * @param {KeyboardEvent} event - The keyboard event
   * @returns {boolean} True if the key is ArrowRight
   */
  isArrowRight: (event: KeyboardEvent): boolean => keyboard.is(event, 'ArrowRight'),

  /**
   * Check if Tab key
   * @param {KeyboardEvent} event - The keyboard event
   * @returns {boolean} True if the key is Tab
   */
  isTab: (event: KeyboardEvent): boolean => keyboard.is(event, 'Tab'),

  /**
   * Check if Home key
   * @param {KeyboardEvent} event - The keyboard event
   * @returns {boolean} True if the key is Home
   */
  isHome: (event: KeyboardEvent): boolean => keyboard.is(event, 'Home'),

  /**
   * Check if End key
   * @param {KeyboardEvent} event - The keyboard event
   * @returns {boolean} True if the key is End
   */
  isEnd: (event: KeyboardEvent): boolean => keyboard.is(event, 'End'),
};

/**
 * Compose multiple event handlers
 * @param {Function} [originalEventHandler] - The original event handler
 * @param {Function} [ourEventHandler] - Our internal event handler
 * @param {object} [options] - Options for composition
 * @param {boolean} [options.checkForDefaultPrevented=true] - Whether to check if default was prevented
 * @returns {Function} The composed event handler
 */
export function composeEventHandlers<E>(
  originalEventHandler?: (event: E) => void,
  ourEventHandler?: (event: E) => void,
  { checkForDefaultPrevented = true } = {},
) {
  return function handleEvent(event: E) {
    originalEventHandler?.(event);

    if (
      checkForDefaultPrevented === false ||
      !(event as unknown as { defaultPrevented?: boolean })?.defaultPrevented
    ) {
      return ourEventHandler?.(event);
    }
  };
}
