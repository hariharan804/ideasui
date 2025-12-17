import * as React from 'react'
import { rippleVariants } from '@ideasui/variants/ripple'
import { cn } from '@ideasui/utils'
import { useRipple } from './use-ripple'
import type { RippleProps, RippleItem } from './ripple-types'

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

interface RippleEffectProps {
  ripples: RippleItem[]
  color?: string
  onClear: (key: React.Key) => void
}

function RippleEffect({
  ripples,
  color = 'currentColor',
  onClear,
}: RippleEffectProps) {
  return (
    <>
      {ripples.map((ripple) => {
        const duration = clamp(
          0.01 * ripple.size,
          0.2,
          ripple.size > 100 ? 0.75 : 0.5
        )

        return (
          <span
            key={ripple.key}
            className="absolute rounded-full pointer-events-none animate-ripple"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
              backgroundColor: color,
              animationDuration: `${duration}s`,
            }}
            onAnimationEnd={() => onClear(ripple.key)}
          />
        )
      })}
    </>
  )
}

export const Ripple = React.forwardRef<HTMLDivElement, RippleProps>(
  (
    {
      className,
      variant = 'solid',
      color = 'primary',
      size = 'md',
      radius = 'md',
      disabled = false,
      rippleColor,
      children,
      onClick,
      onMouseDown,
      ...props
    },
    ref
  ) => {
    const { ripples, onClear, onPress } = useRipple()

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
      if (!disabled) {
        onPress(event)
      }
      onMouseDown?.(event)
    }

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(event)
    }

    return (
      <div
        ref={ref}
        className={cn(
          rippleVariants({ variant, color, size, radius }),
          'relative overflow-hidden cursor-pointer select-none',
          disabled && 'pointer-events-none opacity-50',
          className
        )}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        {...props}
      >
        {children}
        <RippleEffect ripples={ripples} color={rippleColor} onClear={onClear} />
      </div>
    )
  }
)

Ripple.displayName = 'IdeasUI.Ripple'
