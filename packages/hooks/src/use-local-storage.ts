import { useState, useCallback } from 'react';

/**
 * Custom hook for managing localStorage state with automatic serialization and SSR support
 *
 * @param {string} key - The localStorage key to store the value under
 * @param {T} initialValue - Initial value to use if the key doesn't exist in localStorage
 * @returns {[T, (value: T | ((prev: T) => T)) => void, () => void]} Tuple containing [current value, setValue function, removeValue function]
 *
 * @example
 * ```tsx
 * // Basic usage for theme preference
 * const [theme, setTheme, removeTheme] = useLocalStorage('theme', 'light')
 *
 * // Usage with objects
 * const [user, setUser] = useLocalStorage('user', { name: '', email: '' })
 *
 * // Usage with function updates
 * setTheme(prev => prev === 'light' ? 'dark' : 'light')
 *
 * // Remove from localStorage
 * removeTheme() // Resets to initialValue
 * ```
 *
 * Ideal for persisting user preferences, form data, or any state that should survive page refreshes
 *
 * @see {@link https://react.dev/reference/react/useState} for useState reference
 * @see {@link https://react.dev/reference/react/useCallback} for useCallback reference
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage} for localStorage reference
 *
 * @since 1.0.0
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);

      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;

        setStoredValue(valueToStore);

        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue],
  );

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}
