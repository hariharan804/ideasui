import type { IconProps } from '../types';

import { forwardRef } from 'react';

const ICON_SIZE = 24;
const ICON_STROKE_WIDTH = 2;

/**
 * Search icon component
 */
export const Search = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      size = ICON_SIZE,
      color = 'currentColor',
      strokeWidth = ICON_STROKE_WIDTH,
      className,
      ...props
    },
    ref,
  ) => (
    <svg
      ref={ref}
      className={className}
      fill="none"
      height={size}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      viewBox="0 0 24 24"
      width={size}
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  ),
);

Search.displayName = 'Search';
