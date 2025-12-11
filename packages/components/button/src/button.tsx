'use client'
import * as React from 'react'
import { useButton } from './use-button'
import { buttonVariants } from '@ideasui/variants/button'
import { spinnerSizes, type SpinnerSize } from '@ideasui/variants/system'
import { cn } from '@ideasui/utils'
import type { ButtonProps } from './button-types'

const Ripple = ({
  x,
  y,
  onComplete,
}: {
  x: number
  y: number
  onComplete: () => void
}) => {
  React.useEffect(() => {
    const timer = setTimeout(onComplete, 600)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <span
      className="absolute rounded-full bg-current opacity-30 animate-ping pointer-events-none"
      style={{
        left: x - 10,
        top: y - 10,
        width: 20,
        height: 20,
      }}
    />
  )
}

const Spinner = ({ size }: { size: SpinnerSize }) => {
  return (
    <svg
      className={cn('animate-spin', spinnerSizes[size] || 'h-4 w-4')}
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

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      as,
      className,
      variant = 'solid',
      color = 'default',
      size = 'md',
      radius = 'md',
      loading = false,
      loadingText,
      disabled,
      children,
      startContent,
      endContent,
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    const Component = as || 'button'

    const { buttonProps, isLoading, domRef, ripples } = useButton({
      as,
      loading,
      disabled,
      ...props,
    })

    React.useImperativeHandle(ref, () => domRef.current!)

    return (
      <Component
        {...buttonProps}
        className={cn(
          buttonVariants({
            variant,
            color,
            size,
            radius,
            fullWidth,
          }),
          'relative overflow-hidden',
          'min-h-11 min-w-11',
          'transition-all duration-200 ease-in-out',
          'motion-reduce:transition-none',
          'active:scale-95 motion-reduce:active:scale-100',
          className
        )}
      >
        {ripples.map((ripple) => (
          <Ripple
            key={ripple.key}
            x={ripple.x}
            y={ripple.y}
            onComplete={() => {}}
          />
        ))}
        {isLoading && <Spinner size={size} />}
        {!isLoading && startContent && (
          <span className="mr-2 shrink-0">{startContent}</span>
        )}

        <span className={isLoading ? 'ml-2' : ''}>
          {isLoading && loadingText ? loadingText : children}
        </span>

        {!isLoading && endContent && (
          <span className="ml-2 shrink-0">{endContent}</span>
        )}
      </Component>
    )
  }
)

Button.displayName = 'Button'

// Compound component pattern
const ButtonGroup = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
}) => (
  <div
    className={cn(
      'inline-flex rounded-md shadow-sm',
      '[&>button:not(:first-child)]:ml-[-1px]',
      '[&>button:not(:first-child):not(:last-child)]:rounded-none',
      '[&>button:first-child:not(:last-child)]:rounded-r-none',
      '[&>button:last-child:not(:first-child)]:rounded-l-none',
      className
    )}
    role="group"
    {...props}
  >
    {children}
  </div>
)

ButtonGroup.displayName = 'IdeasUI.ButtonGroup'

export { ButtonGroup }
