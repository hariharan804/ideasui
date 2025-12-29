"use client";
import * as React from "react";
import {useSwitch, useFocusRing} from "react-aria";
import {useToggleState} from "react-stately";
import {tv} from "tailwind-variants";

import {cn} from "../../../packages/button/src/lib/utils";

const switchVariants = tv({
  base: "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
});

const thumbVariants = tv({
  base: "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
});

interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  label?: string;
  description?: string;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({checked, defaultChecked, disabled, label, description, onChange, className}, ref) => {
    const state = useToggleState({
      isSelected: checked,
      defaultSelected: defaultChecked,
      onChange,
    });

    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => inputRef.current!);

    const {inputProps} = useSwitch({isDisabled: disabled}, state, inputRef);
    const {focusProps, isFocusVisible} = useFocusRing();

    return (
      <div className="flex items-center space-x-2">
        <label className={cn(switchVariants(), className)}>
          <input ref={inputRef} className="sr-only" {...inputProps} {...focusProps} />
          <span
            className={cn(thumbVariants(), isFocusVisible && "ring-ring ring-2 ring-offset-2")}
            data-state={state.isSelected ? "checked" : "unchecked"}
          />
        </label>
        {label ? (
          <div className="grid gap-1.5 leading-none">
            <span className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {label}
            </span>
            {description ? <p className="text-xs text-muted-foreground">{description}</p> : null}
        ) : null}
      </div>
    );
  },
);

Switch.displayName = "Switch";
