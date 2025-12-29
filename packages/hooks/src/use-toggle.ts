import {useState, useCallback} from "react";

/**
 * Custom hook for managing boolean toggle state
 *
 * @param initialValue - Initial boolean value
 * @returns Tuple of [value, toggle, setValue]
 *
 * @example
 * ```tsx
 * const [isVisible, toggle, setVisible] = useToggle(false)
 * ```
 */
export function useToggle(
  initialValue = false
): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue((prev) => !prev), []);

  return [value, toggle, setValue];
}