import {useState, useCallback} from "react";

export interface UseControllableStateProps<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
}

/**
 * Custom hook for managing controllable state (controlled/uncontrolled pattern)
 *
 * @param props - Configuration object
 * @returns Tuple of [value, setValue]
 *
 * @example
 * ```tsx
 * const [value, setValue] = useControllableState({
 *   value: controlledValue,
 *   defaultValue: 'default',
 *   onChange: onValueChange
 * })
 * ```
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateProps<T>): [T, (value: T) => void] {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const setValue = useCallback(
    (newValue: T) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [isControlled, onChange]
  );

  return [currentValue as T, setValue];
}