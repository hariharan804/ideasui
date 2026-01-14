import type { IconProps } from '../types';

import { forwardRef } from 'react';

const ICON_SIZE = 24;
const ICON_STROKE_WIDTH = 2;

/**
 * Settings icon component
 */
export const Settings = forwardRef<SVGSVGElement, IconProps>(
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
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m11-7a4 4 0 0 1 0 8 4 4 0 0 1 0-8z" />
    </svg>
  ),
);

Settings.displayName = 'Settings';
