import type {IconProps} from "./types";

import * as React from "react";

export const ChevronDown = React.forwardRef<SVGSVGElement, IconProps>(
  ({size = 24, color = "currentColor", ...props}, ref) => (
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
);

ChevronDown.displayName = "ChevronDown";
