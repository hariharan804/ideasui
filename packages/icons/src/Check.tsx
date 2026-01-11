import type { IconProps } from './types';

import * as React from 'react';

export const Check = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 24, color = 'currentColor', ...props }, ref) => (
    <svg
      ref={ref}
      fill="none"
      height={size}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width={size}
      {...props}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
);

Check.displayName = 'Check';
