import { useState, useCallback } from 'react';

/**
 * Custom hook for managing boolean toggle state with toggle and set operations
 *
 * @param initialValue - Initial boolean value for the toggle state
 * @returns Tuple containing [current value, toggle function, setValue function]
 *
 * @default initialValue false
 *
 * @example
 * ```tsx
 * // Basic usage
 * const [isVisible, toggle, setVisible] = useToggle(false)
 *
 * // Toggle the state
 * toggle() // isVisible becomes true
 *
 * // Set specific value
 * setVisible(false) // isVisible becomes false
 * ```
 *
 * @usage Ideal for managing modal visibility, dropdown states, or any boolean UI state
 *
 * @see {@link https://react.dev/reference/react/useState} for useState reference
 * @see {@link https://react.dev/reference/react/useCallback} for useCallback reference
 *
 * @since 1.0.0
 */
export function useToggle(initialValue = false): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue((prev) => !prev), []);

  return [value, toggle, setValue];
}
