import type { IconProps } from '../types';

import { forwardRef } from 'react';

const ICON_SIZE = 24;
const ICON_STROKE_WIDTH = 2;

/**
 * ArrowRight icon component
 */
export const ArrowRight = forwardRef<SVGSVGElement, IconProps>(
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
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  ),
);

ArrowRight.displayName = 'ArrowRight';
