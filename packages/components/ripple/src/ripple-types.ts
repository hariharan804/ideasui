import type {ColorVariant, ButtonSize, Radius} from "@ideasui/variants";
import type * as React from "react";

export interface RippleProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual style variant
   * @default 'solid'
   */
  variant?: "solid" | "outline" | "ghost";

  /**
   * Color variant based on semantic intent
   * @default 'primary'
   */
  color?: ColorVariant;

  /**
   * Size of the ripple effect
   * @default 'md'
   */
  size?: ButtonSize;

  /**
   * Border radius variant
   * @default 'md'
   */
  radius?: Radius;

  /**
   * Whether the ripple is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Custom ripple color (overrides color variant)
   */
  rippleColor?: string;

  /**
   * Children to render inside the ripple container
   */
  children?: React.ReactNode;
}

export interface RippleItem {
  key: React.Key;
  x: number;
  y: number;
  size: number;
}
