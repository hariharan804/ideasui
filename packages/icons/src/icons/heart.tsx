import type { IconProps } from '../types';

import { forwardRef } from 'react';

const ICON_SIZE = 24;
const ICON_STROKE_WIDTH = 2;

/**
 * Heart icon component
 */
export const Heart = forwardRef<SVGSVGElement, IconProps>(
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
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
);

Heart.displayName = 'Heart';
