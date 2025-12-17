"use client";
import type {VariantProps} from "tailwind-variants";

import * as React from "react";
import {useButton, usePress, useFocusRing} from "react-aria";
import {tv} from "tailwind-variants";

import {cn} from "../../../packages/button/src/lib/utils";

const cardVariants = tv({
  base: "rounded-lg border bg-card text-card-foreground transition-colors",
  variants: {
    variant: {
      elevated: "shadow-md hover:shadow-lg",
      outlined: "border-border",
      filled: "bg-muted border-transparent",
    },
    padding: {
      none: "p-0",
      sm: "p-3",
      md: "p-6",
      lg: "p-8",
      xl: "p-12",
    },
    clickable: {
      true: "cursor-pointer hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      false: "",
    },
  },
  defaultVariants: {
    variant: "elevated",
    padding: "md",
    clickable: false,
  },
});

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  clickable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({className, variant, padding, clickable, header, footer, children, onClick, ...props}, ref) => {
    const cardRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => cardRef.current!);

    const {buttonProps} = useButton(clickable ? {onPress: onClick as any, ...props} : {}, cardRef);
    const {pressProps} = usePress(clickable ? {onPress: onClick as any} : {});
    const {focusProps, isFocusVisible} = useFocusRing();

    const Component = clickable ? "div" : "div";

    return (
      <Component
        ref={cardRef}
        className={cn(
          cardVariants({variant, padding, clickable}),
          isFocusVisible && clickable && "ring-ring ring-2 ring-offset-2",
          className,
        )}
        {...(clickable ? {...buttonProps, ...pressProps, ...focusProps} : props)}
        role={clickable ? "button" : undefined}
        tabIndex={clickable ? 0 : undefined}
      >
        {header ? <div className="flex flex-col space-y-1.5 pb-6">{header}</div> : null}
        <div className="flex-1">{children}</div>
        {footer ? <div className="flex items-center pt-6">{footer}</div> : null}
      </Component>
    );
  },
);

Card.displayName = "Card";
