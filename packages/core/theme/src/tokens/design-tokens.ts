/**
 * Design system tokens and common keys for IdeasUI components
 * Compatible with Tailwind CSS v4
 */

// export const spacing = {
//   xs: "p-2",
//   sm: "p-3",
//   md: "p-4",
//   lg: "p-6",
//   xl: "p-8",
// } as const;

export const sizes = {
  xs: "h-6 w-6",
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
} as const;

export const buttonSizes = {
  xs: "h-6 px-2 text-xs",
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
  xl: "h-14 px-8 text-lg",
} as const;

export const spinnerSizes = {
  xs: "h-3 w-3",
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
  xl: "h-6 w-6",
} as const;

export const colorsWithVariant = {
  primary: {
    solid: "bg-primary-500 text-white hover:bg-primary-600",
    outline: "border-2 border-primary-500 text-primary-500 hover:bg-primary-50",
    ghost: "text-primary-500 hover:bg-primary-50",
  },
  secondary: {
    solid: "bg-secondary-500 text-white hover:bg-secondary-600",
    outline: "border-2 border-secondary-500 text-secondary-500 hover:bg-secondary-50",
    ghost: "text-secondary-500 hover:bg-secondary-50",
  },
  success: {
    solid: "bg-success-500 text-white hover:bg-success-600",
    outline: "border-2 border-success-500 text-success-500 hover:bg-success-50",
    ghost: "text-success-500 hover:bg-success-50",
  },
  warning: {
    solid: "bg-warning-500 text-white hover:bg-warning-600",
    outline: "border-2 border-warning-500 text-warning-500 hover:bg-warning-50",
    ghost: "text-warning-500 hover:bg-warning-50",
  },
  danger: {
    solid: "bg-danger-500 text-white hover:bg-danger-600",
    outline: "border-2 border-danger-500 text-danger-500 hover:bg-danger-50",
    ghost: "text-danger-500 hover:bg-danger-50",
  },
  info: {
    solid: "bg-info-500 text-white hover:bg-info-600",
    outline: "border-2 border-info-500 text-info-500 hover:bg-info-50",
    ghost: "text-info-500 hover:bg-info-50",
  },
} as const;

// export const radius = {
//   none: "rounded-none",
//   sm: "rounded-sm",
//   md: "rounded-md",
//   lg: "rounded-lg",
//   xl: "rounded-xl",
//   full: "rounded-full",
// } as const;

// export const shadows = {
//   none: "shadow-none",
//   sm: "shadow-sm",
//   md: "shadow-md",
//   lg: "shadow-lg",
//   xl: "shadow-xl",
// } as const;

// export const transitions = {
//   none: "transition-none",
//   all: "transition-all duration-200 ease-in-out",
//   colors: "transition-colors duration-200 ease-in-out",
//   transform: "transition-transform duration-200 ease-in-out",
// } as const;

export const focus = {
  default: "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
  primary: "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
  secondary: "focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2",
} as const;

export const disabled = {
  default: "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
} as const;

export type Size = keyof typeof sizes;
export type ButtonSize = keyof typeof buttonSizes;
export type SpinnerSize = keyof typeof spinnerSizes;
export type ColorVariant = keyof typeof colorsWithVariant;
export type ColorType = keyof typeof colorsWithVariant.primary;
// export type Radius = keyof typeof radius;
// export type Shadow = keyof typeof shadows;
// export type Transition = keyof typeof transitions;
export type Focus = keyof typeof focus;
