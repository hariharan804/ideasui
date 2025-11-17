import { forwardRef } from 'react'
import { cn } from '@your-org/lib'
import type { ButtonProps } from './type'


const Button = forwardRef<HTMLDivElement, ButtonProps>(
  ({ className, ...rest }, ref) => {
    return (
      <div
        className={cn(button, className)}
        ref={ref}
        {...rest}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }