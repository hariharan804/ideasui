'use client'
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from './lib/utils'
import { useRipple } from './ripple'
import { ButtonProps } from './type'

/* ---------------------------- VARIANTS ---------------------------- */

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        solid: '',
        outline: 'border bg-transparent',
        ghost: 'bg-transparent',
        link: 'underline-offset-4 hover:underline bg-transparent p-0 h-auto',
      },
      color: {
        primary: 'text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800',
        secondary:
          'text-white bg-gray-600 hover:bg-gray-700 active:bg-gray-800',
        success:
          'text-white bg-green-600 hover:bg-green-700 active:bg-green-800',
        warning:
          'text-white bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700',
        danger: 'text-white bg-red-600 hover:bg-red-700 active:bg-red-800',
        info: 'text-white bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800',
        gray: 'text-gray-900 bg-gray-100 hover:bg-gray-200 active:bg-gray-300',
      },
      size: {
        xs: 'h-7 px-2 text-xs',
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4',
        lg: 'h-12 px-6 text-lg',
        xl: 'h-14 px-8 text-xl',
        icon: 'h-10 w-10 p-0',
      },
      fullWidth: {
        true: 'w-full',
      },
      loading: {
        true: 'cursor-not-allowed opacity-90',
      },
    },
    defaultVariants: {
      variant: 'solid',
      color: 'primary',
      size: 'md',
      fullWidth: false,
      loading: false,
    },
  }
)

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
      asChild = false,
      children,
      className,
      classNames,
      leftIcon,
      rightIcon,
      loading = false,
      loadingText,
      fullWidth,
      ripple = false,
      onClick,
      size = 'md',
      color,
      disabled,
      ...rest
    },
    ref
  ) => {
    const Component = asChild ? Slot : 'button'
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
          buttonVariants({ size, fullWidth, loading, color }),
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
