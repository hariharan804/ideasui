import { useState, useEffect, useCallback, useRef } from 'react';

export interface UseFetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
  enabled?: boolean;
}

export interface UseFetchReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
  abort: () => void;
}

/**
 * Custom hook for data fetching with comprehensive features
 *
 * @param {string} url - The URL to fetch
 * @param {UseFetchOptions} [options] - Fetch options and configuration
 * @returns {UseFetchReturn<T>} Object with data, loading state, error, and control functions
 *
 * @example
 * ```tsx
 * const {data, loading, error, refetch} = useFetch<User[]>('/api/users')
 * ```
 */
export function useFetch<T = unknown>(
  url: string,
  options: UseFetchOptions = {},
): UseFetchReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  const { method = 'GET', headers, body, enabled = true } = options;

  const fetchData = useCallback(async () => {
    if (!enabled) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Abort previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller
      abortControllerRef.current = new AbortController();

      const fetchOptions: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        signal: abortControllerRef.current.signal,
      };

      if (body && method !== 'GET') {
        fetchOptions.body = JSON.stringify(body);
      }

      const response = await fetch(url, fetchOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (mountedRef.current) {
        setData(result);
      }
    } catch (error_) {
      if (mountedRef.current && error_ instanceof Error && error_.name !== 'AbortError') {
        setError(error_);
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [url, method, headers, body, enabled]);

  const abort = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  useEffect(() => {
    fetchData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    abort,
  };
}
