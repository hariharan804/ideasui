import type {IconProps} from "./types";

import * as React from "react";

export const Loader = React.forwardRef<SVGSVGElement, IconProps>(
  ({size = 24, color = "currentColor", ...props}, ref) => (
    <svg
      ref={ref}
      className="animate-spin"
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
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
);

Loader.displayName = "Loader";
