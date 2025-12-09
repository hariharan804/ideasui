'use client'
import * as React from 'react'
import { cn } from './lib/utils'
import { useRipple } from './ripple'
import { ButtonProps } from './type'
import { buttonVariants } from '@ideasui/variants/button'

/* ---------------------------- VARIANTS ---------------------------- */

/**
 * Color styles (variant -> color -> tailwind classes)
 * Add or modify colors to match your tailwind config tokens.
 */
export const COLOR_STYLES = {
  solid: {
    primary: 'text-white bg-primary hover:bg-primary-700 active:bg-primary-800',
    secondary:
      'text-white bg-secondary hover:bg-secondary-700 active:bg-secondary-800',
    success: 'text-white bg-success hover:bg-success-700 active:bg-success-800',
    warning: 'text-black bg-warning hover:bg-warning-700 active:bg-warning-800',
    danger: 'text-white bg-danger hover:bg-danger-700 active:bg-danger-800',
    info: 'text-white bg-info hover:bg-info-700 active:bg-info-800',
    gray: 'text-gray-900 bg-gray-100 hover:bg-gray-200 active:bg-gray-300',
  },

  outline: {
    primary: 'text-primary border border-primary hover:bg-primary/10',
    secondary: 'text-secondary border border-secondary hover:bg-secondary/10',
    success: 'text-success border border-success hover:bg-success/10',
    warning: 'text-warning border border-warning hover:bg-warning/10',
    danger: 'text-danger border border-danger hover:bg-danger/10',
    info: 'text-info border border-info hover:bg-info/10',
    gray: 'text-gray-700 border border-gray-300 hover:bg-gray-100',
  },

  ghost: {
    primary: 'text-primary hover:bg-primary/10',
    secondary: 'text-secondary hover:bg-secondary/10',
    success: 'text-success hover:bg-success/10',
    warning: 'text-warning hover:bg-warning/10',
    danger: 'text-danger hover:bg-danger/10',
    info: 'text-info hover:bg-info/10',
    gray: 'text-gray-700 hover:bg-gray-100',
  },

  soft: {
    primary:
      'text-primary bg-primary/15 hover:bg-primary/25 active:bg-primary/35',
    secondary:
      'text-secondary bg-secondary/15 hover:bg-secondary/25 active:bg-secondary/35',
    success:
      'text-success bg-success/15 hover:bg-success/25 active:bg-success/35',
    warning:
      'text-warning bg-warning/15 hover:bg-warning/25 active:bg-warning/35',
    danger: 'text-danger bg-danger/15 hover:bg-danger/25 active:bg-danger/35',
    info: 'text-info bg-info/15 hover:bg-info/25 active:bg-info/35',
    gray: 'text-gray-700 bg-gray-100 hover:bg-gray-200 active:bg-gray-300',
  },

  link: {
    primary: 'text-primary underline-offset-4 hover:underline',
    secondary: 'text-secondary underline-offset-4 hover:underline',
    success: 'text-success underline-offset-4 hover:underline',
    warning: 'text-warning underline-offset-4 hover:underline',
    danger: 'text-danger underline-offset-4 hover:underline',
    info: 'text-info underline-offset-4 hover:underline',
    gray: 'text-gray-700 underline-offset-4 hover:underline',
  },
} as const

/** Types for variants */
type Variant = 'solid' | 'outline' | 'ghost' | 'soft' | 'link'
type Color =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'gray'
// type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon'

/** helper to build compoundVariants programmatically */
export function buildCompoundVariants() {
  const compound: Array<Record<string, any>> = []

  const variantKeys = Object.keys(COLOR_STYLES) as Variant[]
  for (const variant of variantKeys) {
    const colorMap = COLOR_STYLES[
      variant as keyof typeof COLOR_STYLES
    ] as Record<string, string>
    for (const color of Object.keys(colorMap) as Color[]) {
      compound.push({
        variant,
        color,
        class: colorMap[color],
      })
    }
  }

  return compound
}

/** base classes shared by all buttons */
// const baseClasses =
//   'inline-flex items-center justify-center cursor-pointer whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 capitalize'

// /** sizes */
// const sizeMap: Record<Size, string> = {
//   xs: 'h-7 px-2 text-xs',
//   sm: 'h-8 px-3 text-sm',
//   md: 'h-10 px-4',
//   lg: 'h-12 px-6 text-lg',
//   xl: 'h-14 px-8 text-xl',
//   icon: 'h-10 w-10 p-0',
// }

/**
 * The tv config
 * - We keep variant and color keys minimal (empty strings) because compoundVariants will inject the color classes
 */
// export const buttonVariants = tv({
//   base: baseClasses,
//   variants: {
//     variant: {
//       solid: '',
//       outline: 'border bg-transparent',
//       ghost: 'bg-transparent hover:bg-opacity-10',
//       soft: '',
//       link: 'underline-offset-4 hover:underline bg-transparent p-0 h-auto',
//     },
//     color: {
//       primary: '',
//       secondary: '',
//       success: '',
//       warning: '',
//       danger: '',
//       info: '',
//       gray: '',
//     },
//     size: {
//       xs: sizeMap.xs,
//       sm: sizeMap.sm,
//       md: sizeMap.md,
//       lg: sizeMap.lg,
//       xl: sizeMap.xl,
//       icon: sizeMap.icon,
//     },
//     fullWidth: {
//       true: 'w-full',
//       false: '',
//     },
//     loading: {
//       true: 'cursor-not-allowed opacity-90',
//       false: '',
//     },
//     /** optional: iconOnly modifies spacing if you want special behavior for icon-only buttons */
//     iconOnly: {
//       true: 'p-0 w-10 h-10',
//       false: '',
//     },
//     radius: {
//       full: 'rounded-full',
//       none: 'rounded-none',
//       sm: 'rounded-sm',
//       md: 'rounded-md',
//       lg: 'rounded-lg',
//       xl: 'rounded-xl',
//     },
//   },
//   compoundVariants: buildCompoundVariants(),
//   defaultVariants: {
//     variant: 'solid',
//     color: 'primary',
//     size: 'md',
//     fullWidth: false,
//     loading: false,
//     iconOnly: false,
//   },
// })
// export type ButtonVariantProps = VariantProps<typeof buttonVariants>

/* ---------------------------- SPINNER ---------------------------- */

const spinnerSizeMap: Record<string, string> = {
  xs: 'h-3 w-3',
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
  xl: 'h-6 w-6',
  icon: 'h-4 w-4',
}

const LoadingSpinner = ({ size }: { size: string }) => (
  <svg
    className={cn('animate-spin', spinnerSizeMap[size] || 'h-4 w-4')}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
)

/* ---------------------------- BUTTON ---------------------------- */

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      component = 'button',
      children,
      className,
      classNames,
      leftIcon,
      rightIcon,
      loading = false,
      loadingText,
      fullWidth,
      ripple = true,
      onClick,
      size = 'md',
      color,
      disabled,
      variant,
      iconOnly,
      radius,
      ...rest
    },
    ref
  ) => {
    const Component = component as any
    const isDisabled = disabled || loading
    const { addRipple, rippleElements } = useRipple(ripple && !isDisabled)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (ripple) addRipple(e)
      onClick?.(e)
    }

    return (
      <Component
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        onClick={handleClick}
        className={cn(
          buttonVariants({
            size,
            fullWidth,
            // loading,
            color,
            // iconOnly,
            variant,
            radius,
          }),
          className,
          ripple && 'relative overflow-hidden'
        )}
        {...rest}
      >
        {loading ? (
          <LoadingSpinner size={size as any} />
        ) : (
          leftIcon && <span className="mr-2 flex-shrink-0">{leftIcon}</span>
        )}

        <span className={loading ? 'ml-2' : ''}>
          {loading && loadingText ? loadingText : children}
        </span>

        {!loading && rightIcon && (
          <span className="ml-2 flex-shrink-0">{rightIcon}</span>
        )}

        {ripple && rippleElements}
      </Component>
    )
  }
)

Button.displayName = 'Button'
