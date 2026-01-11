import { useEffect, useRef } from 'react';

/**
 * Custom hook for detecting clicks outside an element
 *
 * @param handler - Function to call when clicking outside
 * @param enabled - Whether the hook is enabled
 * @returns Ref to attach to the element
 *
 * @example
 * ```tsx
 * const ref = useClickOutside<HTMLDivElement>(() => setIsOpen(false))
 * return <div ref={ref}>Content</div>
 * ```
 */
export function useClickOutside<T extends HTMLElement>(
  handler: (event: MouseEvent | TouchEvent) => void,
  enabled = true,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [handler, enabled]);

  return ref;
}
