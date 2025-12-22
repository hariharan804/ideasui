import * as React from "react";
import {useTouchableRipple} from "./use-touchable-ripple";
import {TouchableRipple} from "./touchable-ripple";
import {cn, forwardRef, type PolymorphicComponent} from "@ideasui/utils";

/**
 * Props for Touchable component
 */
export interface TouchableProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element type to render as
   * @default "button"
   */
  as?: React.ElementType;

  /**
   * Disable ripple & interactions
   * @default false
   */
  disabled?: boolean;

  /**
   * Ripple color
   * @default "currentColor"
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
export const Touchable = forwardRef<"button", TouchableProps>(
  (
    {
      as: Component = "button",
      children,
      className,
      disabled = false,
      rippleColor,
      onPointerDown,
      onKeyDown,
      ...restProps
    },
    ref,
  ) => {
    const {ripples, onClick, onClear} = useTouchableRipple();

    const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
      if (!disabled) {
        onClick(event as any);
      }
      onPointerDown?.(event);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
      if (disabled) return;

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onClick(event as any);
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
        {...restProps}
      >
        {children}
        <TouchableRipple ripples={ripples} color={rippleColor} onClear={onClear} />
      </Component>
    );
  },
);

Touchable.displayName = "IdeasUI.Touchable";
