import { cn } from '@ideasui/utils'
import * as React from 'react'

interface RippleProps {
  /**
   * Enable or disable ripple effect
   * @default true
   */
  enabled?: boolean

  /**
   * Ripple color (CSS color value)
   * @default 'rgba(255, 255, 255, 0.6)'
   */
  color?: string

  /**
   * Animation duration in milliseconds
   * @default 600
   */
  duration?: number

  /**
   * Additional className for ripple container
   */
  className?: string

  /**
   * Children elements
   */
  children: React.ReactNode
}

interface RippleState {
  x: number
  y: number
  size: number
  id: number
}

export const useRipple = (
  enabled = true,
  color = 'rgba(255, 255, 255, 0.6)',
  duration = 600
) => {
  const [ripples, setRipples] = React.useState<RippleState[]>([])

  const addRipple = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (!enabled) return

      const rect = event.currentTarget.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = event.clientX - rect.left - size / 2
      const y = event.clientY - rect.top - size / 2

      const newRipple: RippleState = {
        x,
        y,
        size,
        id: Date.now(),
      }

      setRipples((prev) => [...prev, newRipple])

      setTimeout(() => {
        setRipples((prev) =>
          prev.filter((ripple) => ripple.id !== newRipple.id)
        )
      }, duration)
    },
    [enabled, duration]
  )

  const rippleElements = ripples.map((ripple) => (
    <span
      key={ripple.id}
      className="absolute rounded-full animate-ping pointer-events-none"
      style={{
        left: ripple.x,
        top: ripple.y,
        width: ripple.size,
        height: ripple.size,
        backgroundColor: color,
        animationDuration: `${duration}ms`,
      }}
    />
  ))

  return { addRipple, rippleElements }
}

export const Ripple = React.forwardRef<HTMLDivElement, RippleProps>(
  (
    {
      enabled = true,
      color = 'rgba(255, 255, 255, 0.6)',
      duration = 600,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { addRipple, rippleElements } = useRipple(enabled, color, duration)

    return (
      <div
        ref={ref}
        className={cn('relative overflow-hidden', className)}
        onMouseDown={addRipple}
        {...props}
      >
        {children}
        {rippleElements}
      </div>
    )
  }
)

Ripple.displayName = 'Ripple'
