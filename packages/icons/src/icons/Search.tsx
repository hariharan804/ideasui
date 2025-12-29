import React from 'react';
import type { IconProps } from '../types';

/**
 * Search icon component
 */
export const Search = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 24, color = 'currentColor', strokeWidth = 2, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="11" cy="11" r="8"/>
  <path d="m21 21-4.35-4.35"/>
    </svg>
  )
);

Search.displayName = 'Search';
