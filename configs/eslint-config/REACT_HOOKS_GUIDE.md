# React Hooks - ESLint Rules & Best Practices

## Configured Rules ✅

### 1. `react-hooks/rules-of-hooks` (Error)

Enforces the Rules of Hooks.

#### ❌ Bad

```tsx
// Conditional hook
if (condition) {
  const [state, setState] = useState(0); // ERROR
}

// Hook in loop
for (let i = 0; i < 10; i++) {
  useEffect(() => {}); // ERROR
}

// Hook in regular function
function regularFunction() {
  const [state, setState] = useState(0); // ERROR
}
```

#### ✅ Good

```tsx
function Component() {
  const [state, setState] = useState(0); // OK

  useEffect(() => {
    // OK
  }, []);

  return <div>{state}</div>;
}
```

### 2. `react-hooks/exhaustive-deps` (Warning)

Ensures all dependencies are included in hook arrays.

#### ❌ Bad

```tsx
function Component({ userId }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchUser(userId); // userId not in deps
  }, []); // WARNING: Missing dependency 'userId'

  const memoValue = useMemo(() => {
    return expensiveCalc(userId);
  }, []); // WARNING: Missing dependency 'userId'

  return <div>{data}</div>;
}
```

#### ✅ Good

```tsx
function Component({ userId }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchUser(userId);
  }, [userId]); // OK

  const memoValue = useMemo(() => {
    return expensiveCalc(userId);
  }, [userId]); // OK

  return <div>{data}</div>;
}
```

## Common Patterns & Solutions

### Pattern 1: Stable Function References

#### ❌ Problem

```tsx
function Component() {
  const handleClick = () => {
    console.log('clicked');
  };

  useEffect(() => {
    handleClick(); // handleClick recreated every render
  }, [handleClick]); // Effect runs every render
}
```

#### ✅ Solution: useCallback

```tsx
function Component() {
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []); // Stable reference

  useEffect(() => {
    handleClick();
  }, [handleClick]); // Only runs once
}
```

### Pattern 2: Object Dependencies

#### ❌ Problem

```tsx
function Component({ config }) {
  useEffect(() => {
    doSomething(config);
  }, [config]); // Runs every render if config is new object
}
```

#### ✅ Solution: Destructure or useMemo

```tsx
function Component({ config }) {
  const { apiUrl, timeout } = config;

  useEffect(() => {
    doSomething(apiUrl, timeout);
  }, [apiUrl, timeout]); // Only runs when values change
}

// OR

function Component({ config }) {
  const stableConfig = useMemo(() => config, [config.apiUrl, config.timeout]);

  useEffect(() => {
    doSomething(stableConfig);
  }, [stableConfig]);
}
```

### Pattern 3: Ignoring Specific Dependencies

#### When to Use

- Functions from props that don't need to trigger re-runs
- Stable refs
- Dispatch functions from useReducer/Redux

#### ✅ Solution: ESLint Disable Comment

```tsx
function Component({ onSuccess }) {
  useEffect(() => {
    fetchData().then(onSuccess);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // onSuccess intentionally omitted
}
```

### Pattern 4: Custom Hooks

#### ❌ Problem

```tsx
function useCustomHook(value) {
  useEffect(() => {
    console.log(value);
  }, []); // WARNING: Missing 'value'
}
```

#### ✅ Solution: Include Dependencies

```tsx
function useCustomHook(value) {
  useEffect(() => {
    console.log(value);
  }, [value]); // OK
}
```

#### Configure Custom Hooks

In `.eslintrc.js`:

```js
{
  rules: {
    'react-hooks/exhaustive-deps': ['warn', {
      additionalHooks: '(useMyCustomHook|useAnotherHook)'
    }]
  }
}
```

## Enterprise Best Practices

### 1. Always Use Cleanup Functions

```tsx
useEffect(() => {
  const subscription = api.subscribe();

  return () => {
    subscription.unsubscribe(); // Cleanup
  };
}, []);
```

### 2. Separate Concerns

```tsx
// ❌ Bad: Multiple concerns in one effect
useEffect(() => {
  fetchUser();
  trackPageView();
  setupWebSocket();
}, []);

// ✅ Good: Separate effects
useEffect(() => {
  fetchUser();
}, []);

useEffect(() => {
  trackPageView();
}, []);

useEffect(() => {
  const ws = setupWebSocket();
  return () => ws.close();
}, []);
```

### 3. Extract Complex Logic to Custom Hooks

```tsx
// ❌ Bad: Complex logic in component
function Component() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('/api/data')
      .then((res) => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  // ...
}

// ✅ Good: Custom hook
function useData(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

function Component() {
  const { data, loading, error } = useData('/api/data');
  // ...
}
```

### 4. Avoid Unnecessary Dependencies

```tsx
// ❌ Bad: Function recreated every render
function Component({ userId }) {
  const fetchUser = () => {
    api.getUser(userId);
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]); // Runs every render
}

// ✅ Good: Include primitive dependency
function Component({ userId }) {
  useEffect(() => {
    api.getUser(userId);
  }, [userId]); // Only runs when userId changes
}
```

### 5. Use Refs for Values That Don't Trigger Renders

```tsx
function Component() {
  const countRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      countRef.current += 1; // No re-render
      console.log(countRef.current);
    }, 1000);

    return () => clearInterval(interval);
  }, []); // Empty deps OK - ref is stable
}
```

## Common Mistakes

### 1. Missing Cleanup

```tsx
// ❌ Memory leak
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
}, []); // Timer never cleared

// ✅ Fixed
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  return () => clearInterval(timer);
}, []);
```

### 2. Stale Closures

```tsx
// ❌ Always logs 0
function Component() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setInterval(() => {
      console.log(count); // Always 0 (stale)
    }, 1000);
  }, []);
}

// ✅ Fixed
function Component() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(count); // Current value
    }, 1000);
    return () => clearInterval(interval);
  }, [count]); // Re-subscribe when count changes
}
```

### 3. Infinite Loops

```tsx
// ❌ Infinite loop
function Component() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([...data, 'new']); // Triggers effect again
  }, [data]); // Effect depends on data it modifies
}

// ✅ Fixed
function Component() {
  const [data, setData] = useState([]);

  const addItem = useCallback(() => {
    setData((prev) => [...prev, 'new']); // Use functional update
  }, []);
}
```

## Testing Hooks

```tsx
import { renderHook, act } from '@testing-library/react';

test('useCounter', () => {
  const { result } = renderHook(() => useCounter());

  expect(result.current.count).toBe(0);

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});
```

## Summary

✅ **Configured Rules:**

- `react-hooks/rules-of-hooks` - Enforces hook rules
- `react-hooks/exhaustive-deps` - Ensures complete dependencies

✅ **Best Practices:**

- Always include cleanup functions
- Separate concerns into multiple effects
- Extract complex logic to custom hooks
- Use useCallback for stable function references
- Use useMemo for expensive calculations
- Use refs for non-rendering values

✅ **Avoid:**

- Conditional hooks
- Hooks in loops
- Missing dependencies
- Stale closures
- Infinite loops
- Memory leaks
