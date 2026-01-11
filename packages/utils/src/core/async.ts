/**
 * Debounce function calls
 * @param func
 * @param wait
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): T & { cancel: () => void } {
  let timeout: NodeJS.Timeout;

  const debounced = ((...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T & { cancel: () => void };

  debounced.cancel = () => clearTimeout(timeout);

  return debounced;
}

/**
 * Throttle function calls
 * @param func
 * @param limit
 */
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): T {
  let inThrottle: boolean;

  return ((...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  }) as T;
}
