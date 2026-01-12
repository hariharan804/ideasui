import type { IconProps } from '../types';

import { forwardRef } from 'react';

const ICON_SIZE = 24;
const ICON_STROKE_WIDTH = 2;

/**
 * User icon component
 */
export const User = forwardRef<SVGSVGElement, IconProps>(
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
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
);

User.displayName = 'User';
