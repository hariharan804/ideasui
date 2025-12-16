import * as React from 'react'
import { rippleVariants } from '@ideasui/variants'
import { cn } from '@ideasui/utils'
import type { RippleProps } from './ripple-types'

export const Ripple = React.forwardRef<HTMLButtonElement, RippleProps>(
  ({ className, variant, color, size, radius, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(rippleVariants({ variant, color, size, radius }), className)}
        {...props}
      />
    )
  }
)

Ripple.displayName = 'IdeasUI.Ripple'