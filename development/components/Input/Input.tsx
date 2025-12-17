"use client";
import type {VariantProps} from "tailwind-variants";

import * as React from "react";
import {useTextField, useFocusRing} from "react-aria";
import {tv} from "tailwind-variants";

import {cn} from "../../../packages/button/src/lib/utils";

const inputVariants = tv({
  base: "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  variants: {
    variant: {
      outline: "border-input",
      filled: "border-transparent bg-muted",
      underlined: "border-0 border-b-2 border-input rounded-none bg-transparent px-0",
    },
    size: {
      sm: "h-8 px-2 text-xs",
      md: "h-10 px-3 text-sm",
      lg: "h-12 px-4 text-base",
    },
    error: {
      true: "border-destructive focus-visible:ring-destructive",
      false: "",
    },
  },
  defaultVariants: {
    variant: "outline",
    size: "md",
    error: false,
  },
});

interface InputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  error?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({className, variant, size, error, label, helperText, leftIcon, rightIcon, ...props}, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => inputRef.current!);

    const {labelProps, inputProps, descriptionProps, errorMessageProps} = useTextField(
      {
        label,
        description: helperText,
        errorMessage: error ? helperText : undefined,
        isInvalid: error,
        ...props,
      },
      inputRef,
    );
    const {focusProps, isFocusVisible} = useFocusRing();

    return (
      <div className="w-full">
        {label ? (
          <label
            {...labelProps}
            className="mb-2 block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        ) : null}
        <div className="relative">
          {leftIcon ? (
            <div className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
              {leftIcon}
            </div>
          ) : null}
          <input
            ref={inputRef}
            className={cn(
              inputVariants({variant, size, error}),
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              isFocusVisible && "ring-ring ring-2 ring-offset-2",
              className,
            )}
            {...inputProps}
            {...focusProps}
          />
          {rightIcon ? (
            <div className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2">
              {rightIcon}
            </div>
          ) : null}
        </div>
        {helperText ? (
          <p
            {...(error ? errorMessageProps : descriptionProps)}
            className={cn("mt-1 text-xs", error ? "text-destructive" : "text-muted-foreground")}
          >
            {helperText}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";
