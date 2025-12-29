import {useEffect, useRef, useState, useLayoutEffect} from "react";

export function useFocusTrap<T extends HTMLElement>(enabled = true) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const container = ref.current;
    const focusable = container.querySelectorAll(
      'input, select, textarea, button, a[href], [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0] as HTMLElement;
    const last = focusable[focusable.length - 1] as HTMLElement;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

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

    container.addEventListener("keydown", handleKeyDown);
    first?.focus();

    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [enabled]);

  return ref;
}

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return {data, loading, error};
}

export function useAsync<T>(asyncFunction: () => Promise<T>, deps: any[] = []) {
  const [state, setState] = useState({data: null, loading: true, error: null});

  useEffect(() => {
    setState({data: null, loading: true, error: null});
    asyncFunction()
      .then((data) => setState({data, loading: false, error: null}))
      .catch((error) => setState({data: null, loading: false, error}));
  }, deps);

  return state;
}

export function useThrottle<T>(value: T, limit: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRan = useRef(Date.now());

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

export function useUpdateEffect(effect: () => void, deps: any[]) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    return effect();
  }, deps);
}

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
