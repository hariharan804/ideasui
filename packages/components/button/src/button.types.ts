import type {
  ButtonProps as ButtonPrimitiveProperties,
  ButtonRenderProps,
} from 'react-aria-components';
import type { ForwardRefExoticComponent, HTMLAttributes, ReactNode, RefAttributes } from 'react';
import type { ButtonVariantProps } from '@ideasui/theme/recipes';
import type { ButtonGroupProperties } from './button-group';

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
 * Granular props for individual Button slots.
 */
export interface ButtonSlotProps {
  /** Props for the button container base slot. */
  base?: ButtonPrimitiveProperties & { [key: `data-${string}`]: unknown };
  /** Props for the button label slot. */
  label?: ButtonLabelProperties;
  /** Props for the start icon container slot. */
  startIcon?: ButtonIconProperties;
  /** Props for the end icon container slot. */
  endIcon?: ButtonIconProperties;
  /** Props for the loading spinner slot. */
  spinner?: ButtonSpinnerProperties;
  /** Props for the shortcut container slot. */
  shortcut?: ButtonShortcutProperties;
}

/**
 * Base props for the Button component.
 */
interface ButtonBaseProperties
  extends
    Omit<ButtonPrimitiveProperties, 'className'>,
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
   * The type of divider to display between the buttons in a group.
   * @default 'full' (when isAttached is true)
   */
  divider?: 'full' | 'middle' | 'none';
  /**
   * Custom class names for individual button slots.
   */
  classNames?: ButtonClassNames;
  /**
   * Custom props for individual button slots.
   */
  slotProps?: ButtonSlotProps;
  /**
   * The CSS class name for the button.
   * Can be a string or a function that receives the button render props.
   */
  className?: string | ((properties: ButtonRenderProps) => string);
  /**
   * The content to display inside the button.
   * Can be a ReactNode or a function that receives the button render props.
   */
  children?: ReactNode | ((properties: ButtonRenderProps) => ReactNode);
  /**
   * Whether the button should be square and optimized for icons.
   *
   * Note: When true, you MUST provide an `aria-label` or `aria-labelledby` for accessibility.
   * @default false
   */
  isIconOnly?: boolean;
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
 * Props for the Button component.
 *
 * Enforces that if `isIconOnly` is true, either `aria-label` or `aria-labelledby` must be provided.
 */
export type ButtonProps =
  | (ButtonBaseProperties & {
      /**
       * Whether the button should be square and optimized for icons.
       * @default false
       */
      isIconOnly?: boolean;
      /**
       * Accessibility label for the button.
       * Required if the button has no visible label (e.g., `isIconOnly`).
       */
      'aria-label': string;
      /**
       * ID of an element that serves as the accessible label for the button.
       */
      'aria-labelledby'?: string;
    })
  | (ButtonBaseProperties & {
      /**
       * Whether the button should be square and optimized for icons.
       * @default false
       */
      isIconOnly?: boolean;
      /**
       * Accessibility label for the button.
       */
      'aria-label'?: string;
      /**
       * ID of an element that serves as the accessible label for the button.
       * Required if the button has no visible label (e.g., `isIconOnly`).
       */
      'aria-labelledby': string;
    })
  | (ButtonBaseProperties & {
      /**
       * Whether the button should be square and optimized for icons.
       * @default false
       */
      isIconOnly?: false;
      /**
       * Accessibility label for the button.
       */
      'aria-label'?: string;
      /**
       * ID of an element that serves as the accessible label for the button.
       */
      'aria-labelledby'?: string;
    });

/**
 * Props for the Button.Label component.
 */
export interface ButtonLabelProperties extends HTMLAttributes<HTMLSpanElement> {
  [key: `data-${string}`]: unknown;
}

/**
 * Props for the Button.Icon component.
 */
export interface ButtonIconProperties extends HTMLAttributes<HTMLElement> {
  /**
   * The icon content.
   */
  children?: ReactNode;
  /**
   * The placement of the icon relative to the label.
   * @default 'start'
   */
  placement?: 'start' | 'end';
  [key: `data-${string}`]: unknown;
}

/**
 * Props for the Button.Spinner component.
 */
export interface ButtonSpinnerProperties extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Accessibility label for the spinner.
   * @default 'Loading'
   */
  label?: string;
  [key: `data-${string}`]: unknown;
}

/**
 * Props for the Button.Shortcut component.
 */
export interface ButtonShortcutProperties extends HTMLAttributes<HTMLSpanElement> {
  /**
   * The shortcut keys to display.
   */
  children?: ReactNode;
  [key: `data-${string}`]: unknown;
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
  Label: ForwardRefExoticComponent<ButtonLabelProperties & RefAttributes<HTMLSpanElement>>;
  /**
   * Component to display an icon inside the button.
   */
  Icon: ForwardRefExoticComponent<ButtonIconProperties & RefAttributes<HTMLElement>>;
  /**
   * Component to display a shortcut indicator inside the button.
   */
  Shortcut: ForwardRefExoticComponent<ButtonShortcutProperties & RefAttributes<HTMLSpanElement>>;
  /**
   * Component to display a loading spinner inside the button.
   */
  Spinner: ForwardRefExoticComponent<ButtonSpinnerProperties & RefAttributes<HTMLSpanElement>>;
  /**
   * Component to group multiple buttons together.
   */
  Group: ForwardRefExoticComponent<ButtonGroupProperties & RefAttributes<HTMLDivElement>>;
}
