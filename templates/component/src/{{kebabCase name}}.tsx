'use client'
import * as React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '@iui/utils'
import type { {{pascalCase name}}Props } from './type'

const {{camelCase name}}Variants = tv({
  base: 'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
    },
    size: {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4',
      lg: 'h-12 px-6 text-lg'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'md'
  }
})

export const {{pascalCase name}} = React.forwardRef<HTMLDivElement, {{pascalCase name}}Props>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn({{camelCase name}}Variants({ variant, size }), className)}
        {...props}
      >
        {children || '{{pascalCase name}} Component'}
      </div>
    )
  }
)

{{pascalCase name}}.displayName = '{{pascalCase name}}'