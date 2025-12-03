'use client'
import * as React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '../../../packages/button/src/lib/utils'

const boxVariants = tv({
  base: 'block',
  variants: {
    padding: {
      none: 'p-0',
      xs: 'p-1',
      sm: 'p-2',
      md: 'p-4',
      lg: 'p-6',
      xl: 'p-8',
    },
    margin: {
      none: 'm-0',
      xs: 'm-1',
      sm: 'm-2',
      md: 'm-4',
      lg: 'm-6',
      xl: 'm-8',
    },
    bg: {
      none: '',
      white: 'bg-white',
      gray: 'bg-gray-50',
      primary: 'bg-primary',
      secondary: 'bg-secondary',
    },
    border: {
      none: '',
      default: 'border border-border',
      primary: 'border border-primary',
      secondary: 'border border-secondary',
    },
    radius: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      full: 'rounded-full',
    },
    shadow: {
      none: '',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
    },
  },
  defaultVariants: {
    padding: 'none',
    margin: 'none',
    bg: 'none',
    border: 'none',
    radius: 'none',
    shadow: 'none',
  },
})

interface BoxProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof boxVariants> {
  as?: React.ElementType
  children: React.ReactNode
}

export const Box = React.forwardRef<HTMLElement, BoxProps>(
  ({ as: Component = 'div', className, padding, margin, bg, border, radius, shadow, children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(boxVariants({ padding, margin, bg, border, radius, shadow }), className)}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Box.displayName = 'Box'