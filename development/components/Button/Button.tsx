"use client";
import type {VariantProps} from "tailwind-variants";

import * as React from "react";
import {useButton, usePress, useFocusRing} from "react-aria";
import {tv} from "tailwind-variants";

import {cn} from "../../../packages/button/src/lib/utils";

const buttonVariants = tv({
  base: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  variants: {
    variant: {
      solid: "bg-primary text-primary-foreground hover:bg-primary/90",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    },
    size: {
      sm: "h-9 px-3",
      md: "h-10 px-4 py-2",
      lg: "h-11 px-8",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    variant: "solid",
    size: "md",
  },
});

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, variant, size, loading, leftIcon, rightIcon, children, ...props}, ref) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    React.useImperativeHandle(ref, () => buttonRef.current!);

    const {buttonProps} = useButton(props, buttonRef);
    const {pressProps} = usePress(props);
    const {focusProps, isFocusVisible} = useFocusRing();

    return (
      <button
        ref={buttonRef}
        className={cn(
          buttonVariants({variant, size}),
          isFocusVisible && "ring-ring ring-2 ring-offset-2",
          className,
        )}
        {...buttonProps}
        {...pressProps}
        {...focusProps}
        disabled={loading || props.disabled}
      >
        {loading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : leftIcon ? (
          <span className="mr-2">{leftIcon}</span>
        ) : null}
        {children}
        {rightIcon ? <span className="ml-2">{rightIcon}</span> : null}
      </button>
    );
  },
);

Button.displayName = "Button";
