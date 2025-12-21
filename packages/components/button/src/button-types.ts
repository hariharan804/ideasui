import type {ElementType, ReactNode, Ref} from "react";

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

export interface UseButtonProps extends Omit<ButtonProps, "children"> {
  /**
   * Ref to the DOM node
   */
  ref?: Ref<HTMLButtonElement>;
  /**
   * Whether the button should display a loading spinner
   */
  isLoading?: boolean;
  /**
   * Whether the button is disabled
   */
  isDisabled?: boolean;
  /**
   * Whether to disable the ripple effect
   */
  disableRipple?: boolean;
}
