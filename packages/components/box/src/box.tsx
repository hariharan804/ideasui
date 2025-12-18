"use client";
import type {BoxProps} from "./type";

import * as React from "react";
import {boxVariants} from "@ideasui/variants";
import {cn} from "@ideasui/utils";

export const Box = React.forwardRef<HTMLElement, BoxProps>(
  ({as: Component = "div", className, children, ...props}, ref) => {
    const {
      display,
      p,
      px,
      py,
      m,
      mx,
      my,
      bg,
      border,
      borderColor,
      rounded,
      shadow,
      position,
      overflow,
      ...restProps
    } = props;

    return (
      <Component
        ref={ref}
        className={cn(
          boxVariants({
            display,
            p,
            px,
            py,
            m,
            mx,
            my,
            bg,
            border,
            borderColor,
            rounded,
            shadow,
            position,
            overflow,
          }),
          className,
        )}
        {...restProps}
      >
        {children}
      </Component>
    );
  },
);

Box.displayName = "Box";
