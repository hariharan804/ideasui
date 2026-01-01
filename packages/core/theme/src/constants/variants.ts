/**
 * Shared variant constants for consistent styling across components
 */

export const RADIUS_VARIANTS = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
} as const;

export const SIZE_VARIANTS = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
} as const;

export const COLOR_VARIANTS = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  info: 'info',
  neutral: 'neutral',
  gray: 'gray',
} as const;

export const COMMON_VARIANTS = {
  radius: RADIUS_VARIANTS,
  size: SIZE_VARIANTS,
  color: COLOR_VARIANTS,
} as const;

// Type exports
export type RadiusVariant = keyof typeof RADIUS_VARIANTS;
export type SizeVariant = keyof typeof SIZE_VARIANTS;
export type ColorVariant = keyof typeof COLOR_VARIANTS;