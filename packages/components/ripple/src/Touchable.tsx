import * as React from "react";
import {useTouchableRipple} from "./use-touchable-ripple";
import {TouchableRipple} from "./touchable-ripple";
import {cn} from "@ideasui/utils";
import {ComponentProps} from "@ideasui/utils/react";

/**
 * Touchable
 * ----------
 * • Drop-in ripple container
 * • No hook usage required by consumer
 * • Pointer + keyboard safe
 * • Works with any element
 */
export interface TouchableProps extends ComponentProps<{
  /**
   * Element to render
   * @default "button"
   */
  as?: React.ElementType;
  /**
   * Disable ripple & interactions
   */
  disabled?: boolean;

  /**
   * Ripple color
   */
  rippleColor?: string;
}> {}

export const Touchable = React.forwardRef<HTMLElement, TouchableProps>(
  (
    {as, children, className, disabled = false, rippleColor, onPointerDown, onKeyDown, ...props},
    ref,
  ) => {
    const Component = (as || "button") as React.ElementType;
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
        ref={ref}
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
