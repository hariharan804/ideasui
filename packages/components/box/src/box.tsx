'use client'
import * as React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '@iui/utils'
import type { BoxProps } from './type'

const boxVariants = tv({
  base: 'block',
  variants: {
    display: {
      block: 'block',
      inline: 'inline',
      'inline-block': 'inline-block',
      flex: 'flex',
      'inline-flex': 'inline-flex',
      grid: 'grid',
      'inline-grid': 'inline-grid',
      hidden: 'hidden',
    },
    p: {
      0: 'p-0',
      1: 'p-1',
      2: 'p-2',
      3: 'p-3',
      4: 'p-4',
      5: 'p-5',
      6: 'p-6',
      8: 'p-8',
      10: 'p-10',
      12: 'p-12',
    },
    px: {
      0: 'px-0',
      1: 'px-1',
      2: 'px-2',
      3: 'px-3',
      4: 'px-4',
      5: 'px-5',
      6: 'px-6',
      8: 'px-8',
      10: 'px-10',
      12: 'px-12',
    },
    py: {
      0: 'py-0',
      1: 'py-1',
      2: 'py-2',
      3: 'py-3',
      4: 'py-4',
      5: 'py-5',
      6: 'py-6',
      8: 'py-8',
      10: 'py-10',
      12: 'py-12',
    },
    m: {
      0: 'm-0',
      1: 'm-1',
      2: 'm-2',
      3: 'm-3',
      4: 'm-4',
      5: 'm-5',
      6: 'm-6',
      8: 'm-8',
      10: 'm-10',
      12: 'm-12',
      auto: 'm-auto',
    },
    mx: {
      0: 'mx-0',
      1: 'mx-1',
      2: 'mx-2',
      3: 'mx-3',
      4: 'mx-4',
      5: 'mx-5',
      6: 'mx-6',
      8: 'mx-8',
      10: 'mx-10',
      12: 'mx-12',
      auto: 'mx-auto',
    },
    my: {
      0: 'my-0',
      1: 'my-1',
      2: 'my-2',
      3: 'my-3',
      4: 'my-4',
      5: 'my-5',
      6: 'my-6',
      8: 'my-8',
      10: 'my-10',
      12: 'my-12',
      auto: 'my-auto',
    },
    bg: {
      transparent: 'bg-transparent',
      white: 'bg-white',
      black: 'bg-black',
      gray: 'bg-gray-50',
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      success: 'bg-green-50',
      warning: 'bg-yellow-50',
      danger: 'bg-red-50',
    },
    border: {
      0: 'border-0',
      1: 'border',
      2: 'border-2',
      4: 'border-4',
      8: 'border-8',
    },
    borderColor: {
      transparent: 'border-transparent',
      current: 'border-current',
      gray: 'border-gray-200',
      primary: 'border-primary',
      secondary: 'border-secondary',
      success: 'border-green-200',
      warning: 'border-yellow-200',
      danger: 'border-red-200',
    },
    rounded: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      '2xl': 'rounded-2xl',
      '3xl': 'rounded-3xl',
      full: 'rounded-full',
    },
    shadow: {
      none: 'shadow-none',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
      '2xl': 'shadow-2xl',
    },
    position: {
      static: 'static',
      fixed: 'fixed',
      absolute: 'absolute',
      relative: 'relative',
      sticky: 'sticky',
    },
    overflow: {
      auto: 'overflow-auto',
      hidden: 'overflow-hidden',
      visible: 'overflow-visible',
      scroll: 'overflow-scroll',
    },
  },
  defaultVariants: {
    display: 'block',
  },
})

export const Box = React.forwardRef<HTMLElement, BoxProps>(
  ({ as: Component = 'div', className, children, ...props }, ref) => {
    const {
      display,
      p,
      px,
      py,
      m,
      mx,
      my,
      bg,
      border,
      borderColor,
      rounded,
      shadow,
      position,
      overflow,
      ...restProps
    } = props

    return (
      <Component
        ref={ref}
        className={cn(
          boxVariants({
            display,
            p,
            px,
            py,
            m,
            mx,
            my,
            bg,
            border,
            borderColor,
            rounded,
            shadow,
            position,
            overflow,
          }),
          className
        )}
        {...restProps}
      >
        {children}
      </Component>
    )
  }
)

Box.displayName = 'Box'