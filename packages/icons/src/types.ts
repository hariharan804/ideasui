import React from "react";

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, "ref"> {
  /** Icon size in pixels */
  size?: number | string;
  /** Icon color (CSS color value) */
  color?: string;
  /** Stroke width */
  strokeWidth?: number | string;
  /** Additional CSS classes */
  className?: string;
}

export interface DynamicIconProps extends IconProps {
  /** Name of the icon to load dynamically */
  name: string;
  /** Fallback component to show while loading or on error */
  fallback?: React.FC<IconProps>;
}

export interface IconSetProps extends Partial<IconProps> {
  /** Default size for all icons in the set */
  size?: number | string;
  /** Default color for all icons in the set */
  color?: string;
  /** Default class name for all icons in the set */
  className?: string;
}
