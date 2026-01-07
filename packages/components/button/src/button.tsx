"use client";
import type {ElementType, ReactNode, Ref} from "react";
import React, {useImperativeHandle} from "react";
import {buttonVariants, spinnerSizes, SpinnerSize} from "@ideasui/themes/recipes";
import {cn} from "@ideasui/utils";

import {useButton} from "./use-button";
import {Ripple} from "@ideasui/ripple";

// const Ripple = ({x, y, onComplete}: {x: number; y: number; onComplete: () => void}) => {
//   useEffect(() => {
//     const timer = setTimeout(onComplete, 600);

//     return () => clearTimeout(timer);
//   }, [onComplete]);

//   return (
//     <span
//       className="pointer-events-none absolute animate-ping rounded-full bg-current opacity-30"
//       style={{
//         left: x - 10,
//         top: y - 10,
//         width: 20,
//         height: 20,
//       }}
//     />
//   );
// };

const Spinner = ({size}: {size: SpinnerSize}) => {
  return (
    <svg
      className={cn("animate-spin", spinnerSizes[size] || "h-4 w-4")}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        fill="currentColor"
      />
    </svg>
  );
};
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The element or component to render as
   * @default 'button'
   */
  as?: ElementType;

  /**
   * Visual variant of the button
   * @default 'solid'
   */
  variant?: "solid" | "outline" | "ghost";

  /**
   * Color variant based on semantic intent
   * @default 'default'
   */
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "info";

  /**
   * Size of the button
   * @default 'md'
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Border radius variant
   * @default 'md'
   */
  radius?: "none" | "sm" | "md" | "lg" | "xl" | "full";

  /**
   * Whether the button should take full width
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Whether the button is in loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Text to show when loading
   */
  loadingText?: string;

  /**
   * Content to show at the start of the button
   */
  startContent?: ReactNode;

  /**
   * Content to show at the end of the button
   */
  endContent?: ReactNode;

  /**
   * Whether the button should display a ripple effect
   * @default false
   */
  disableRipple?: boolean;
}
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      as,
      className,
      variant = "solid",
      color = "default",
      size = "md",
      radius = "md",
      loading = false,
      loadingText,
      disabled,
      children,
      startContent,
      endContent,
      fullWidth = false,
      disableRipple = false,
      ...props
    },
    ref,
  ) => {
    // Validate 'as' prop - ensure it's a valid component
    const Component = React.useMemo(() => {
      if (!as) {
        return "button";
      }

      // Check if it's a valid React component or HTML element
      if (typeof as === "string") {
        // Validate HTML element names
        const validElements = ["button", "a", "div", "span", "input"];

        return validElements.includes(as) ? as : "button";
      }

      // For React components, check if it's a valid component
      if (typeof as === "function" || (typeof as === "object" && as !== null)) {
        return as;
      }

      // Fallback to button for invalid values
      return "button";
    }, [as]);

    const {getButtonProps, isLoading, domRef, getRippleProps} = useButton({
      as: Component,
      loading,
      disabled,
      ...props,
    });

    useImperativeHandle(ref, () => domRef.current!);

    return (
      <Component
        {...getButtonProps()}
        className={cn(
          buttonVariants({
            variant,
            color,
            size,
            radius,
            fullWidth,
          }),
          "relative overflow-hidden",
          "min-h-11 min-w-11",
          "transition-all duration-200 ease-in-out",
          "motion-reduce:transition-none",
          "active:scale-95 motion-reduce:active:scale-100",
          className,
        )}
      >
        {isLoading ? <Spinner size={size} /> : null}
        {!isLoading && startContent ? <span className="mr-2 shrink-0">{startContent}</span> : null}

        <span className={isLoading ? "ml-2" : ""}>
          {isLoading && loadingText ? loadingText : children}
        </span>

        {!isLoading && endContent ? <span className="ml-2 shrink-0">{endContent}</span> : null}
        {!disableRipple && <Ripple {...getRippleProps()} />}
      </Component>
    );
  },
);

Button.displayName = "IdeasUI.Button";
