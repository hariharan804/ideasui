# @ideasui/hooks

Custom React hooks for state management, side effects, and reusable logic with comprehensive JSDoc documentation.

## 📦 Installation

```bash
npm install @ideasui/hooks
# or
pnpm add @ideasui/hooks
# or
yarn add @ideasui/hooks
```

## 🚀 Usage

```tsx
import { useLocalStorage, useDisclosure, useDebounce } from '@ideasui/hooks'

// Use in your components
function MyComponent() {
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const debouncedValue = useDebounce(searchTerm, 300)
  
  return (
    // Your component JSX
  )
}
```

## 📋 Hook Categories

### 1. State Management Hooks

- `useLocalStorage` - Persist state in localStorage
- `useSessionStorage` - Persist state in sessionStorage
- `useToggle` - Boolean state toggle
- `useCounter` - Counter with increment/decrement

### 2. UI/UX Hooks

- `useDisclosure` - Modal/drawer open/close state
- `useFocusTrap` - Trap focus within element
- `useClickOutside` - Detect clicks outside element
- `useHover` - Track hover state

### 4. Performance Hooks

- `useDebounce` - Debounce values
- `useThrottle` - Throttle function calls
- `usePrevious` - Get previous value
- `useMount` - Run effect on mount only

### 5. Utility Hooks

- `useInterval` - Declarative setInterval
- `useTimeout` - Declarative setTimeout
- `useNow` - Current timestamp with updates
- `useStopwatch` - Stopwatch functionality

## 🎯 Hook Template

````tsx
import {useState, useEffect, useCallback} from "react";

/**
 * Custom hook for managing localStorage state with automatic serialization and SSR support
 *
 * @param key - The localStorage key to store the value under
 * @param initialValue - Initial value to use if the key doesn't exist in localStorage
 * @returns Tuple containing [current value, setValue function, removeValue function]
 *
 * @default initialValue - Used when localStorage is not available or key doesn't exist
 *
 * @example
 * ```tsx
 * // Basic usage for theme preference
 * const [theme, setTheme, removeTheme] = useLocalStorage('theme', 'light')
 *
 * // Usage with objects
 * const [user, setUser] = useLocalStorage('user', { name: '', email: '' })
 *
 * // Remove from localStorage
 * removeTheme() // Resets to initialValue
 * ```
 *
 * @usage Ideal for persisting user preferences, form data, or any state that should survive page refreshes
 *
 * @see {@link https://react.dev/reference/react/useState} for useState reference
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage} for localStorage reference
 *
 * @since 1.0.0
 */
export function useCustomHook<T>(initialValue: T, options?: HookOptions): HookReturn<T> {
  const [state, setState] = useState<T>(initialValue);

  const handleUpdate = useCallback(
    (newValue: T) => {
      setState(newValue);
      options?.onUpdate?.(newValue);
    },
    [options],
  );

  useEffect(() => {
    // Side effects
    return () => {
      // Cleanup
    };
  }, []);

  return {
    value: state,
    setValue: handleUpdate,
    // Other return values
  };
}

// TypeScript interfaces
interface HookOptions {
  onUpdate?: (value: any) => void;
}

interface HookReturn<T> {
  value: T;
  setValue: (value: T) => void;
}
````

## 📖 Hook Examples

### 1. useLocalStorage

```tsx
import {useState, useEffect} from "react";

export function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return defaultValue;

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const setStoredValue = (newValue: T) => {
    try {
      setValue(newValue);
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error(`Error saving to localStorage:`, error);
    }
  };

  return [value, setStoredValue];
}

// Usage
const [theme, setTheme] = useLocalStorage("theme", "light");
```

### 2. useDisclosure

```tsx
import {useState, useCallback} from "react";

interface UseDisclosureReturn {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

export function useDisclosure(defaultIsOpen = false): UseDisclosureReturn {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  const onToggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return {isOpen, onOpen, onClose, onToggle};
}

// Usage
const {isOpen, onOpen, onClose} = useDisclosure();
```

### 3. useClickOutside

```tsx
import {useEffect, useRef} from "react";

export function useClickOutside<T extends HTMLElement>(handler: () => void) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handler]);

  return ref;
}

// Usage
const ref = useClickOutside<HTMLDivElement>(() => setIsOpen(false));
```

### 4. useDebounce

```tsx
import {useState, useEffect} from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// Usage
const debouncedSearchTerm = useDebounce(searchTerm, 300);
```

### 5. useFetch

```tsx
import {useState, useEffect} from "react";

interface UseFetchReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useFetch<T>(url: string): UseFetchReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch");
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return {data, loading, error, refetch: fetchData};
}

// Usage
const {data, loading, error} = useFetch<User[]>("/api/users");
```

## 🧪 Testing Hooks

### Test Setup

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Test Template

```tsx
import {renderHook, act} from "@testing-library/react";
import {useCustomHook} from "../useCustomHook";

describe("useCustomHook", () => {
  it("should initialize with default value", () => {
    const {result} = renderHook(() => useCustomHook("initial"));
    expect(result.current.value).toBe("initial");
  });

  it("should update value", () => {
    const {result} = renderHook(() => useCustomHook("initial"));

    act(() => {
      result.current.setValue("updated");
    });

    expect(result.current.value).toBe("updated");
  });

  it("should cleanup on unmount", () => {
    const cleanup = jest.fn();
    const {unmount} = renderHook(() => useCustomHook("test"));

    unmount();
    expect(cleanup).toHaveBeenCalled();
  });
});
```

## 📦 Package Structure

```
hooks/
├── src/
│   ├── useLocalStorage/
│   │   ├── useLocalStorage.ts
│   │   ├── useLocalStorage.test.ts
│   │   └── index.ts
│   ├── useDisclosure/
│   │   ├── useDisclosure.ts
│   │   ├── useDisclosure.test.ts
│   │   └── index.ts
│   └── index.ts              # Export all hooks
├── package.json
├── README.md
└── tsconfig.json
```

## 🎯 Best Practices

### 1. Naming Convention

- Always start with `use` prefix
- Use descriptive names: `useLocalStorage` not `useLS`
- Be consistent with return patterns

### 2. TypeScript

- Use generics for flexible types
- Provide proper interfaces for options and returns
- Add JSDoc comments for better IntelliSense

### 3. Performance

- Use `useCallback` for functions returned from hooks
- Use `useMemo` for expensive calculations
- Avoid unnecessary re-renders

### 4. Error Handling

- Handle edge cases gracefully
- Provide fallback values
- Log errors appropriately

### 5. SSR Compatibility

- Check for `window` object availability
- Use `useEffect` for browser-only code
- Provide server-safe defaults

## 📋 Hook Checklist

- [ ] Descriptive name starting with `use`
- [ ] TypeScript interfaces and generics
- [ ] JSDoc documentation with examples
- [ ] Unit tests with >90% coverage
- [ ] Error handling and edge cases
- [ ] SSR compatibility
- [ ] Performance optimizations
- [ ] Cleanup in useEffect
- [ ] Consistent return pattern
