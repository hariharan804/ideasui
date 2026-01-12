import { useState, useCallback, useRef } from 'react';

/**
 * Custom hook for tracking hover state
 *
 * @returns {[boolean, { ref: React.RefObject<T | null>; onMouseEnter: () => void; onMouseLeave: () => void; }]} Tuple of [isHovered, hoverProps]
 *
 * @example
 * ```tsx
 * const [isHovered, hoverProps] = useHover()
 * return <div {...hoverProps}>Hover me</div>
 * ```
 */
export function useHover<T extends HTMLElement>(): [
  boolean,
  {
    ref: React.RefObject<T | null>;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  },
] {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<T>(null);

  const onMouseEnter = useCallback(() => setIsHovered(true), []);
  const onMouseLeave = useCallback(() => setIsHovered(false), []);

  return [
    isHovered,
    {
      ref,
      onMouseEnter,
      onMouseLeave,
    },
  ];
}
