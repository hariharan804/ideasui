import type { IconProps } from '../types';

import React from 'react';

/**
 * ArrowRight icon component
 */
export const ArrowRight = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 24, color = 'currentColor', strokeWidth = 2, className, ...props }, ref) => (
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
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  ),
);

ArrowRight.displayName = 'ArrowRight';
