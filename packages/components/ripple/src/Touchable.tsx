import * as React from "react";
import {useTouchableRipple} from "./use-touchable-ripple";
import {TouchableRipple} from "./touchable-ripple";
import {cn} from "@ideasui/utils";

export interface TouchableProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Render element type
   * @default "button"
   */
  as?: any; // keyof JSX.IntrinsicElements;

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
 * Touchable
 * ----------
 * • Drop-in ripple container
 * • No hook usage required by consumer
 * • Pointer + keyboard safe
 * • Works with any element
 */
export const Touchable = React.forwardRef<HTMLElement, TouchableProps>(
  (
    {
      as: Component = "button",
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
    const {ripples, onClick, onClear} = useTouchableRipple();

    const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
      if (!disabled) {
        onClick(event);
      }
      onPointerDown?.(event);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
      if (disabled) return;

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onClick(event);
      }

      onKeyDown?.(event);
    };

    return (
      <Component
        ref={ref as any}
        className={cn(
          "relative overflow-hidden",
          disabled ? "pointer-events-none opacity-50" : "",
          className,
        )}
        onPointerDown={handlePointerDown}
        onKeyDown={handleKeyDown}
        aria-disabled={disabled || undefined}
        {...props}
      >
        {children}
        <TouchableRipple ripples={ripples} color={rippleColor} onClear={onClear} />
      </Component>
    );
  },
);

Touchable.displayName = "IdeasUI.Touchable";
