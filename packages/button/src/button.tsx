import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from './lib/utils'
import { ButtonProps } from './type'
import { useRipple } from './ripple'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        solid: '',
        outline: 'border-2 bg-transparent',
        ghost: 'bg-transparent',
        link: 'underline-offset-4 hover:underline bg-transparent',
      },
      color: {
        primary: '',
        secondary: '',
        success: '',
        warning: '',
        danger: '',
        info: '',
        gray: '',
      },
      size: {
        xs: 'h-7 px-2 text-xs',
        sm: 'h-8 px-3 text-sm',
        default: 'h-10 px-4 py-2',
        lg: 'h-12 px-6 text-lg',
        xl: 'h-14 px-8 text-xl',
        icon: 'h-10 w-10',
      },
      loading: {
        true: 'cursor-not-allowed',
        false: '',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'solid',
      color: 'primary',
      size: 'default',
      loading: false,
      fullWidth: false,
    },
    compoundVariants: [
      // Solid variants
      { variant: 'solid', color: 'primary', class: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800' },
      { variant: 'solid', color: 'secondary', class: 'bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800' },
      { variant: 'solid', color: 'success', class: 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800' },
      { variant: 'solid', color: 'warning', class: 'bg-yellow-500 text-white hover:bg-yellow-600 active:bg-yellow-700' },
      { variant: 'solid', color: 'danger', class: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800' },
      { variant: 'solid', color: 'info', class: 'bg-cyan-600 text-white hover:bg-cyan-700 active:bg-cyan-800' },
      { variant: 'solid', color: 'gray', class: 'bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300' },
      
      // Outline variants
      { variant: 'outline', color: 'primary', class: 'border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100' },
      { variant: 'outline', color: 'secondary', class: 'border-gray-600 text-gray-600 hover:bg-gray-50 active:bg-gray-100' },
      { variant: 'outline', color: 'success', class: 'border-green-600 text-green-600 hover:bg-green-50 active:bg-green-100' },
      { variant: 'outline', color: 'warning', class: 'border-yellow-500 text-yellow-600 hover:bg-yellow-50 active:bg-yellow-100' },
      { variant: 'outline', color: 'danger', class: 'border-red-600 text-red-600 hover:bg-red-50 active:bg-red-100' },
      { variant: 'outline', color: 'info', class: 'border-cyan-600 text-cyan-600 hover:bg-cyan-50 active:bg-cyan-100' },
      { variant: 'outline', color: 'gray', class: 'border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100' },
      
      // Ghost variants
      { variant: 'ghost', color: 'primary', class: 'text-blue-600 hover:bg-blue-50 active:bg-blue-100' },
      { variant: 'ghost', color: 'secondary', class: 'text-gray-600 hover:bg-gray-50 active:bg-gray-100' },
      { variant: 'ghost', color: 'success', class: 'text-green-600 hover:bg-green-50 active:bg-green-100' },
      { variant: 'ghost', color: 'warning', class: 'text-yellow-600 hover:bg-yellow-50 active:bg-yellow-100' },
      { variant: 'ghost', color: 'danger', class: 'text-red-600 hover:bg-red-50 active:bg-red-100' },
      { variant: 'ghost', color: 'info', class: 'text-cyan-600 hover:bg-cyan-50 active:bg-cyan-100' },
      { variant: 'ghost', color: 'gray', class: 'text-gray-600 hover:bg-gray-50 active:bg-gray-100' },
      
      // Link variants
      { variant: 'link', color: 'primary', class: 'text-blue-600 hover:text-blue-700' },
      { variant: 'link', color: 'secondary', class: 'text-gray-600 hover:text-gray-700' },
      { variant: 'link', color: 'success', class: 'text-green-600 hover:text-green-700' },
      { variant: 'link', color: 'warning', class: 'text-yellow-600 hover:text-yellow-700' },
      { variant: 'link', color: 'danger', class: 'text-red-600 hover:text-red-700' },
      { variant: 'link', color: 'info', class: 'text-cyan-600 hover:text-cyan-700' },
      { variant: 'link', color: 'gray', class: 'text-gray-600 hover:text-gray-700' },
    ],
  }
)

const LoadingSpinner = ({ size = 'default', className }: { size?: string; className?: string }) => {
  const spinnerSize =
    {
      xs: 'h-3 w-3',
      sm: 'h-3 w-3',
      default: 'h-4 w-4',
      lg: 'h-5 w-5',
      xl: 'h-6 w-6',
      icon: 'h-4 w-4',
    }[size] || 'h-4 w-4'

  return (
    <svg
      className={cn('animate-spin', spinnerSize, className)}
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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      classNames,
      variant,
      color,
      size,
      asChild = false,
      loading = false,
      loadingText,
      fullWidth = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ripple = false,
      onClick,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    const isDisabled = disabled || loading
    const { addRipple, rippleElements } = useRipple(ripple && !isDisabled)
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (ripple && !isDisabled) {
        addRipple(event)
      }
      onClick?.(event)
    }

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, color, size, loading, fullWidth }),
          ripple && 'relative overflow-hidden',
          className,
          classNames?.root
        )}
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        onClick={handleClick}
        {...props}
      >
        {loading && (
          <LoadingSpinner 
            size={size || 'default'} 
            className={classNames?.spinner}
          />
        )}
        {!loading && leftIcon && (
          <span className={cn('mr-2 flex-shrink-0', classNames?.leftIcon)}>
            {leftIcon}
          </span>
        )}
        <span className={cn(
          loading && 'ml-2',
          classNames?.content,
          loading && loadingText && classNames?.loadingText
        )}>
          {loading && loadingText ? loadingText : children}
        </span>
        {!loading && rightIcon && (
          <span className={cn('ml-2 flex-shrink-0', classNames?.rightIcon)}>
            {rightIcon}
          </span>
        )}
        {ripple && rippleElements}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants, type ButtonProps }
export { Ripple, useRipple } from './ripple'
