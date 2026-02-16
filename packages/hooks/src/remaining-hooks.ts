import type { DependencyList } from 'react';

import { useEffect, useRef, useState, useLayoutEffect } from 'react';

export function useFocusTrap<T extends HTMLElement>(enabled = true): React.RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!enabled || !ref.current) {
      return;
    }

    const container = ref.current;
    const focusable = container.querySelectorAll(
      'input, select, textarea, button, a[href], [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0] as HTMLElement;
    const last = focusable[focusable.length - 1] as HTMLElement;

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key !== 'Tab') {
        return;
      }

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

    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [enabled]);

  return ref;
}

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  deps: DependencyList = [],
): {
  data: T | null;
  loading: boolean;
  error: Error | null;
} {
  const [state, setState] = useState<{ data: T | null; loading: boolean; error: Error | null }>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let ignore = false;

    const execute = async (): Promise<void> => {
      setState({ data: null, loading: true, error: null });

      try {
        const result = await asyncFunction();

        if (!ignore) {
          setState({ data: result, loading: false, error: null });
        }
      } catch (error_) {
        if (!ignore) {
          setState({ data: null, loading: false, error: error_ as Error });
        }
      }
    };

    execute();

    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}

export function useThrottle<T>(value: T, limit: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRan = useRef(0);

  useEffect(() => {
    lastRan.current = Date.now();
  }, []);

  useEffect(() => {
    const handler = setTimeout(
      () => {
        if (Date.now() - lastRan.current >= limit) {
          setThrottledValue(value);
          lastRan.current = Date.now();
        }
      },
      limit - (Date.now() - lastRan.current),
    );

    return () => clearTimeout(handler);
  }, [value, limit]);

  return throttledValue;
}

export function useUpdateEffect(effect: () => void, deps: DependencyList): void {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      return;
    }

    return effect();
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
