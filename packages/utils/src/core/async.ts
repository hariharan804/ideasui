/**
 * Debounce function calls
 * @param {Function} func - The function to debounce
 * @param {number} wait - The wait time in milliseconds
 * @returns {Function} The debounced function with a cancel method
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number,
): T & { cancel: () => void } {
  let timeout: NodeJS.Timeout;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const debounced = ((...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T & { cancel: () => void };

  debounced.cancel = () => clearTimeout(timeout);

  return debounced;
}

/**
 * Throttle function calls
 * @param {Function} func - The function to throttle
 * @param {number} limit - The throttle limit in milliseconds
 * @returns {Function} The throttled function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(func: T, limit: number): T {
  let inThrottle: boolean;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ((...args: any[]) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  }) as T;
}
