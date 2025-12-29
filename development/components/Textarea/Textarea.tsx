"use client";
import * as React from "react";
import {useTextField, useFocusRing} from "react-aria";
import {tv} from "tailwind-variants";

import {cn} from "../../../packages/button/src/lib/utils";

const textareaVariants = tv({
  base: "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  variants: {
    error: {
      true: "border-destructive focus-visible:ring-destructive",
      false: "",
    },
  },
  defaultVariants: {
    error: false,
  },
});

interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "rows"> {
  label?: string;
  helperText?: string;
  error?: boolean;
  rows?: number;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({className, label, helperText, error, rows = 3, ...props}, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    React.useImperativeHandle(ref, () => textareaRef.current!);

    const {labelProps, inputProps, descriptionProps, errorMessageProps} = useTextField(
      {
        label,
        description: helperText,
        errorMessage: error ? helperText : undefined,
        isInvalid: error,
        ...props,
      },
      textareaRef,
    );
    const {focusProps, isFocusVisible} = useFocusRing();

    return (
      <div className="w-full">
        {label ? (
          <label {...labelProps} className="mb-2 block text-sm leading-none font-medium">
            {label}
          </label>
        ) : null}
        <textarea
          ref={textareaRef}
          className={cn(
            textareaVariants({error}),
            isFocusVisible && "ring-ring ring-2 ring-offset-2",
            className,
          )}
          rows={rows}
          {...inputProps}
          {...focusProps}
        />
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

Textarea.displayName = "Textarea";
