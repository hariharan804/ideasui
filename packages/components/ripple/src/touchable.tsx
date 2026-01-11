import * as React from 'react';
import { cn } from '@ideasui/utils/style';
import { forwardRef } from '@ideasui/utils/react';

import { Ripple } from './ripple';
import { useRipple } from './use-ripple';

export interface TouchableProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Render element type
   * @default "button"
   */
  as?: keyof React.JSX.IntrinsicElements;

  /**
   * Disable ripple & interactions
   */
  disabled?: boolean;

  /**
   * Ripple color
   */
  rippleColor?: string;
}

/**
 * Touchable component with ripple effects
 *
 * @example
 * ```tsx
 * <Touchable as="div" rippleColor="blue">
 *   Click me
 * </Touchable>
 * ```
 */
export const Touchable = forwardRef<'button', TouchableProps>(
  (
    {
      as: Component = 'button',
      children,
      className,
      disabled = false,
      rippleColor,
      onPointerDown,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const { ripples, onPress, onClear } = useRipple();

    const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
      if (!disabled) {
        onPress(event);
      }
      onPointerDown?.(event);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
      if (disabled) {
        return;
      }

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onPress(event as any);
      }

      onKeyDown?.(event);
    };

    return (
      <Component
        ref={ref as any}
        aria-disabled={disabled || undefined}
        className={cn(
          'relative overflow-hidden',
          disabled ? 'pointer-events-none opacity-50' : '',
          className,
        )}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        {...props}
      >
        {children}
        <Ripple color={rippleColor} ripples={ripples} onClear={onClear} />
      </Component>
    );
  },
);

Touchable.displayName = 'IdeasUI.Touchable';
