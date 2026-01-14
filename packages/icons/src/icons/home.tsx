import type { IconProps } from '../types';

import { forwardRef } from 'react';

const ICON_SIZE = 24;
const ICON_STROKE_WIDTH = 2;

/**
 * Home icon component
 */
export const Home = forwardRef<SVGSVGElement, IconProps>(
  ({ size = ICON_SIZE, color = 'currentColor', strokeWidth = ICON_STROKE_WIDTH, className, ...props }, ref) => (
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
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
  <polyline points="9,22 9,12 15,12 15,22"/>
    </svg>
  )
);

Home.displayName = 'Home';
