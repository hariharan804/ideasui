import type { ButtonProps as ButtonPrimitiveProps, ButtonRenderProps } from 'react-aria-components';
import type { ForwardRefExoticComponent, HTMLAttributes, ReactNode, RefAttributes } from 'react';
import type { ButtonVariantProps } from '@ideasui/theme/recipes';
import type { ButtonGroupProps } from './button-group';

/**
 * Granular class names for the Button component slots.
 */
export interface ButtonClassNames {
  /** Class name for the button container. */
  base?: string;
  /** Class name for the button label. */
  label?: string;
  /** Class name for the start icon container. */
  startIcon?: string;
  /** Class name for the end icon container. */
  endIcon?: string;
  /** Class name for the loading spinner. */
  spinner?: string;
  /** Class name for the shortcut container. */
  shortcut?: string;
}

/**
 * Props for the Button component.
 */
export interface ButtonProps
  extends
    Omit<ButtonPrimitiveProps, 'className'>,
    Omit<ButtonVariantProps, 'isLoading' | 'isDisabled'> {
  /**
   * Whether the button is in a loading state.
   * @default false
   */
  isLoading?: boolean;
  /**
   * The element to display as a loading indicator.
   * If not provided, a default spinner will be used.
   */
  loadingIndicator?: ReactNode;
  /**
   * The position of the loading indicator relative to the button content.
   * @default 'start'
   */
  loadingPosition?: 'start' | 'end' | 'center';
  /**
   * Whether the button should be square and optimized for icons.
   *
   * Note: When true, you MUST provide an `aria-label` or `aria-labelledby` for accessibility.
   * @default false
   */
  isIconOnly?: boolean;
  /**
   * Icon to display before the button content.
   */
  startIcon?: ReactNode;
  /**
   * Icon to display after the button content.
   */
  endIcon?: ReactNode;
  /**
   * The shortcut keys to display.
   */
  shortcut?: ReactNode;
  /**
   * Whether to show a divider between the buttons in a group.
   * @default true (when isAttached is true)
   */
  showDivider?: boolean;
  /**
   * Custom class names for individual button slots.
   */
  classNames?: ButtonClassNames;
  /**
   * The CSS class name for the button.
   * Can be a string or a function that receives the button render props.
   */
  className?: string | ((props: ButtonRenderProps) => string);
  /**
   * The content to display inside the button.
   * Can be a ReactNode or a function that receives the button render props.
   */
  children?: ReactNode | ((props: ButtonRenderProps) => ReactNode);
  /**
   * Accessibility label for the button.
   * Required if the button has no visible label (e.g., `isIconOnly`).
   */
  'aria-label'?: string;
  /**
   * ID of an element that serves as the accessible label for the button.
   */
  'aria-labelledby'?: string;
}

/**
 * Props for the Button.Label component.
 */
export interface ButtonLabelProps extends HTMLAttributes<HTMLSpanElement> {}

/**
 * Props for the Button.Icon component.
 */
export interface ButtonIconProps extends HTMLAttributes<HTMLElement> {
  /**
   * The icon content.
   */
  children: ReactNode;
  /**
   * The placement of the icon relative to the label.
   * @default 'start'
   */
  placement?: 'start' | 'end';
}

/**
 * Props for the Button.Spinner component.
 */
export interface ButtonSpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Accessibility label for the spinner.
   * @default 'Loading'
   */
  label?: string;
}

/**
 * Props for the Button.Shortcut component.
 */
export interface ButtonShortcutProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * The shortcut keys to display.
   */
  children: ReactNode;
}

/**
 * Type for the Button component with its static compound components.
 */
export interface ButtonComponent extends ForwardRefExoticComponent<
  ButtonProps & RefAttributes<HTMLButtonElement>
> {
  /**
   * Component to display the button label.
   */
  Label: ForwardRefExoticComponent<ButtonLabelProps & RefAttributes<HTMLSpanElement>>;
  /**
   * Component to display an icon inside the button.
   */
  Icon: ForwardRefExoticComponent<ButtonIconProps & RefAttributes<HTMLElement>>;
  /**
   * Component to display a shortcut indicator inside the button.
   */
  Shortcut: ForwardRefExoticComponent<ButtonShortcutProps & RefAttributes<HTMLSpanElement>>;
  /**
   * Component to display a loading spinner inside the button.
   */
  Spinner: ForwardRefExoticComponent<ButtonSpinnerProps & RefAttributes<HTMLSpanElement>>;
  /**
   * Component to group multiple buttons together.
   */
  Group: ForwardRefExoticComponent<ButtonGroupProps & RefAttributes<HTMLDivElement>>;
}
