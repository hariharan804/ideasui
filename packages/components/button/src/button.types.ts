import type { ButtonProps as ButtonPrimitiveProps, ButtonRenderProps } from 'react-aria-components';
import type { ForwardRefExoticComponent, HTMLAttributes, ReactNode, RefAttributes } from 'react';
import type { ButtonVariantProps } from '@ideasui/theme/recipes';
import type { ButtonGroupProps } from './button-group';

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
   * The variant of the button.
   * @default 'solid'
   */
  variant?: 'solid' | 'outline' | 'ghost' | 'soft' | 'link' | 'text' | 'elevated';
  /**
   * The color of the button.
   * @default 'primary'
   */
  color?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'neutral'
    | 'danger'
    | 'success'
    | 'warning'
    | 'info';
  /**
   * The size of the button.
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Whether to show a divider between the buttons in a group.
   * @default true (when isAttached is true)
   */
  showDivider?: boolean;
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
   * Component to display a loading spinner inside the button.
   */
  Spinner: ForwardRefExoticComponent<ButtonSpinnerProps & RefAttributes<HTMLSpanElement>>;
  /**
   * Component to group multiple buttons together.
   */
  Group: ForwardRefExoticComponent<ButtonGroupProps & RefAttributes<HTMLDivElement>>;
}
