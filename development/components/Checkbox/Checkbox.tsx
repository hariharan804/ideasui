"use client";
import * as React from "react";
import {useCheckbox, useFocusRing} from "react-aria";
import {useToggleState} from "react-stately";
import {tv} from "tailwind-variants";

import {cn} from "../../../packages/button/src/lib/utils";

const checkboxVariants = tv({
  base: "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
});

interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  label?: string;
  description?: string;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {checked, defaultChecked, indeterminate, disabled, label, description, onChange, className},
    ref,
  ) => {
    const state = useToggleState({
      isSelected: checked,
      defaultSelected: defaultChecked,
      onChange,
    });

    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => inputRef.current!);

    const {inputProps} = useCheckbox(
      {isIndeterminate: indeterminate, isDisabled: disabled},
      state,
      inputRef,
    );
    const {focusProps, isFocusVisible} = useFocusRing();

    return (
      <div className="flex items-center space-x-2">
        <input
          ref={inputRef}
          className={cn(
            checkboxVariants(),
            isFocusVisible && "ring-ring ring-2 ring-offset-2",
            className,
          )}
          {...inputProps}
          {...focusProps}
        />
        {label ? (
          <div className="grid gap-1.5 leading-none">
            <label className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {label}
            </label>
            {description ? <p className="text-xs text-muted-foreground">{description}</p> : null}
        ) : null}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
