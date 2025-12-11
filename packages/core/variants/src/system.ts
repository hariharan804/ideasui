/**
 * Design system tokens and common keys for IdeasUI components
 * Compatible with Tailwind CSS v4
 */

export const spacing = {
  xs: 'p-2',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
} as const;

export const sizes = {
  xs: 'h-6 w-6',
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
} as const;

export const buttonSizes = {
  xs: 'h-6 px-2 text-xs',
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
  xl: 'h-14 px-8 text-lg',
} as const;

export const spinnerSizes = {
  xs: 'h-3 w-3',
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
  xl: 'h-6 w-6',
} as const;

export const colors = {
  default: {
    solid: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'border-2 border-gray-600 text-gray-600 hover:bg-gray-50',
    ghost: 'text-gray-600 hover:bg-gray-50',
  },
  primary: {
    solid: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
    ghost: 'text-blue-600 hover:bg-blue-50',
  },
  secondary: {
    solid: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'border-2 border-gray-600 text-gray-600 hover:bg-gray-50',
    ghost: 'text-gray-600 hover:bg-gray-50',
  },
  success: {
    solid: 'bg-green-600 text-white hover:bg-green-700',
    outline: 'border-2 border-green-600 text-green-600 hover:bg-green-50',
    ghost: 'text-green-600 hover:bg-green-50',
  },
  warning: {
    solid: 'bg-yellow-600 text-white hover:bg-yellow-700',
    outline: 'border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-50',
    ghost: 'text-yellow-600 hover:bg-yellow-50',
  },
  danger: {
    solid: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'border-2 border-red-600 text-red-600 hover:bg-red-50',
    ghost: 'text-red-600 hover:bg-red-50',
  },
  info: {
    solid: 'bg-cyan-600 text-white hover:bg-cyan-700',
    outline: 'border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-50',
    ghost: 'text-cyan-600 hover:bg-cyan-50',
  },
} as const;

export const radius = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
} as const;

export const shadows = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
} as const;

export const transitions = {
  none: 'transition-none',
  all: 'transition-all duration-200 ease-in-out',
  colors: 'transition-colors duration-200 ease-in-out',
  transform: 'transition-transform duration-200 ease-in-out',
} as const;

export const focus = {
  default: 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
  primary: 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
  secondary: 'focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
} as const;

export const disabled = {
  default: 'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
} as const;

export type Spacing = keyof typeof spacing;
export type Size = keyof typeof sizes;
export type ButtonSize = keyof typeof buttonSizes;
export type SpinnerSize = keyof typeof spinnerSizes;
export type ColorVariant = keyof typeof colors;
export type ColorType = keyof typeof colors.primary;
export type Radius = keyof typeof radius;
export type Shadow = keyof typeof shadows;
export type Transition = keyof typeof transitions;
export type Focus = keyof typeof focus;