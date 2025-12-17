"use client";
import type {VariantProps} from "tailwind-variants";

import * as React from "react";
import {tv} from "tailwind-variants";

import {cn} from "../../../packages/button/src/lib/utils";

const badgeVariants = tv({
  base: "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  variants: {
    variant: {
      solid: "",
      outline: "border",
      soft: "",
    },
    color: {
      primary: "",
      secondary: "",
      success: "",
      warning: "",
      danger: "",
    },
    size: {
      sm: "px-2 py-0.5 text-xs",
      md: "px-2.5 py-0.5 text-xs",
      lg: "px-3 py-1 text-sm",
    },
  },
  compoundVariants: [
    {variant: "solid", color: "primary", class: "bg-primary text-primary-foreground"},
    {variant: "solid", color: "success", class: "bg-green-500 text-white"},
    {variant: "outline", color: "primary", class: "border-primary text-primary"},
  ],
  defaultVariants: {
    variant: "solid",
    color: "primary",
    size: "md",
  },
});

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({className, variant, color, size, ...props}, ref) => {
    return (
      <div ref={ref} className={cn(badgeVariants({variant, color, size}), className)} {...props} />
    );
  },
);

Badge.displayName = "Badge";
