import type {
  CSSProperties,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  ChangeEvent,
  FocusEvent,
  ForwardRefExoticComponent,
  RefAttributes,
  HTMLInputTypeAttribute,
  Ref,
} from 'react';
import type { InputFieldReturnType } from '@ideasui/theme/recipes';

/**
 * Visual style variant of the input field surface.
 */
export type InputFieldVariant = 'outline' | 'filled' | 'flushed' | 'unstyled' | 'shadow';

/**
 * Positioning and behavior variant of the input field label.
 * - 'default': External label rendered above the input wrapper.
 * - 'inside-fixed': Label stays permanently positioned at the top inside the input wrapper.
 * - 'inside-floating': Label starts inside as placeholder and moves to top inside on focus/value.
 * - 'floating': Label starts inside as placeholder and floats over the top border on focus/value.
 * - 'inside': Alias for 'inside-fixed'.
 */
export type InputFieldLabelVariant =
  'default' | 'inside-fixed' | 'inside-floating' | 'floating' | 'inside';

/**
 * Size scale of the input field.
 */
export type InputFieldSize = 'sm' | 'md' | 'lg';

/**
 * Shadow elevation scale of the input field surface.
 */
export type InputFieldShadow = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Allowed input character filter modes for InputFieldInput.
 * - 'numeric': restricts input to digits (0-9).
 * - 'decimal': restricts input to digits and a single decimal point (0-9, .).
 * - 'alpha': restricts input to alphabetic characters (a-z, A-Z).
 * - 'alphanumeric': restricts input to alphanumeric characters (a-z, A-Z, 0-9).
 */
export type InputFieldInputFilter = 'numeric' | 'decimal' | 'alpha' | 'alphanumeric';

/**
 * Custom CSS class names for individual InputField slots.
 */
export interface InputFieldClassNames {
  /** Class name for the root container element. */
  readonly root?: string;
  /** Class name for the label element. */
  readonly label?: string;
  /** Class name for the outer input wrapper container element. */
  readonly wrapper?: string;
  /** Class name for the native `<input>` element. */
  readonly input?: string;
  /** Class name for the start content adornment container element. */
  readonly startContent?: string;
  /** Class name for the end content adornment container element. */
  readonly endContent?: string;
  /** Class name for the helper description text element. */
  readonly description?: string;
  /** Class name for the validation error message text element. */
  readonly errorMessage?: string;
}

/**
 * Custom props for individual InputField slots in shorthand usage.
 */
export interface InputFieldSlotProps {
  /** Props passed to the root container element slot. */
  readonly root?: HTMLAttributes<HTMLDivElement>;
  /** Props passed to the InputFieldLabel slot. */
  readonly label?: InputFieldLabelProps;
  /** Props passed to the InputFieldInput slot. */
  readonly input?: InputFieldInputProps;
  /** Props passed to the InputFieldDescription slot. */
  readonly description?: InputFieldDescriptionProps;
  /** Props passed to the InputFieldError slot. */
  readonly errorMessage?: InputFieldErrorProps;
  /** Alias for errorMessage slot props. */
  readonly error?: InputFieldErrorProps;
}

/**
 * Props for the root InputField component wrapper.
 */
export interface InputFieldProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange' | 'onInput' | 'onFocus' | 'onBlur' | 'id'
> {
  /**
   * Explicit input element ID. Overrides auto-generated ID.
   */
  readonly id?: string;

  /**
   * Form control name for HTML form submission and form libraries.
   */
  readonly name?: string;

  /**
   * Visual style variant of the input surface.
   * @default 'outline'
   */
  readonly variant?: InputFieldVariant;

  /**
   * Positioning and behavior variant of the label.
   * @default 'default'
   */
  readonly labelVariant?: InputFieldLabelVariant;

  /**
   * Size scale of the input field.
   * @default 'md'
   */
  readonly size?: InputFieldSize;

  /**
   * Shadow elevation scale of the input field surface.
   * @default 'none' (or 'sm' when variant="shadow")
   */
  readonly shadow?: InputFieldShadow | boolean;

  /**
   * Marks the field as disabled. Propagated to all sub-components via context.
   * @default false
   */
  readonly isDisabled?: boolean;

  /**
   * Marks the field as read-only.
   * @default false
   */
  readonly isReadOnly?: boolean;

  /**
   * Marks the field as required. Adds `required` to the input and visual asterisk indicator.
   * @default false
   */
  readonly isRequired?: boolean;

  /**
   * Marks the field as invalid. Shows `InputFieldError`, hides `InputFieldDescription`.
   * @default false
   */
  readonly isInvalid?: boolean;

  /**
   * Label text or node rendered when used as a single component.
   */
  readonly label?: ReactNode;

  /**
   * Native placeholder text rendered when used as a single component.
   */
  readonly placeholder?: string;

  /**
   * Helper description text rendered when used as a single component.
   */
  readonly description?: ReactNode;

  /**
   * Error message text rendered when `isInvalid` is true in single component usage.
   */
  readonly errorMessage?: ReactNode;

  /**
   * Element rendered before the input (e.g. decorative icon).
   */
  readonly startContent?: ReactNode;

  /**
   * Element rendered after the input (e.g. decorative icon).
   */
  readonly endContent?: ReactNode;

  /**
   * Current value of the input when used as a single component.
   */
  readonly value?: string | number;

  /**
   * Initial uncontrolled value of the input when used as a single component.
   */
  readonly defaultValue?: string | number;

  /**
   * Input element HTML type (e.g. 'text', 'email', 'password', 'number').
   */
  readonly type?: HTMLInputTypeAttribute;

  /**
   * Browser autofill / autocomplete attribute (e.g. 'email', 'current-password', 'given-name').
   */
  readonly autoComplete?: string;

  /**
   * Virtual keyboard hint for mobile browsers (e.g. 'numeric', 'decimal', 'email', 'tel').
   */
  readonly inputMode?: InputHTMLAttributes<HTMLInputElement>['inputMode'];

  /**
   * Maximum character count allowed in the native input.
   */
  readonly maxLength?: number;

  /**
   * Minimum character count required in the native input.
   */
  readonly minLength?: number;

  /**
   * Regex pattern string for native HTML form validation.
   */
  readonly pattern?: string;

  /**
   * Minimum value allowed for numeric/date input types.
   */
  readonly min?: number | string;

  /**
   * Maximum value allowed for numeric/date input types.
   */
  readonly max?: number | string;

  /**
   * Granular step increment for numeric input types.
   */
  readonly step?: number | string;

  /**
   * Automatically focuses the input element when mounted.
   * @default false
   */
  readonly autoFocus?: boolean;

  /**
   * Ref forwarded directly to the underlying native `<input>` element when using shorthand usage.
   */
  readonly inputRef?: Ref<HTMLInputElement>;

  /**
   * Character input filter restricting allowed entry ('numeric', 'decimal', 'alpha', 'alphanumeric').
   */
  readonly inputFilter?: InputFieldInputFilter;

  /**
   * Custom CSS class names for individual slots (`root`, `label`, `wrapper`, `input`, `startContent`, `endContent`, `description`, `errorMessage`).
   */
  readonly classNames?: InputFieldClassNames;

  /**
   * Custom props for individual sub-component slots (`root`, `label`, `input`, `description`, `errorMessage`).
   */
  readonly slotProps?: InputFieldSlotProps;

  /**
   * Change event handler when used as a single component.
   */
  readonly onChange?: (event: ChangeEvent<HTMLInputElement>) => void;

  /**
   * Focus event handler when used as a single component.
   */
  readonly onFocus?: (event: FocusEvent<HTMLInputElement>) => void;

  /**
   * Blur event handler when used as a single component.
   */
  readonly onBlur?: (event: FocusEvent<HTMLInputElement>) => void;

  /**
   * Custom CSS class names merged via `cn()`.
   */
  readonly className?: string;

  /**
   * Inline styles applied to the root wrapper element.
   */
  readonly style?: CSSProperties;

  /**
   * Sub-components (compound pattern) OR omit for single-component shorthand pattern.
   */
  readonly children?: ReactNode;
}

/**
 * Props for the InputFieldLabel sub-component.
 */
export interface InputFieldLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Custom CSS class names merged via `cn()`.
   */
  readonly className?: string;

  /**
   * Label content.
   */
  readonly children?: ReactNode;

  /**
   * Data attributes for testing and DOM targeting.
   */
  readonly [key: `data-${string}`]: unknown;
}

/**
 * Props for the InputFieldInput sub-component.
 */
export interface InputFieldInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'className'
> {
  /**
   * Ref forwarded directly to the native `<input>` element.
   */
  readonly inputRef?: Ref<HTMLInputElement>;

  /**
   * Element rendered before the input (e.g. decorative icon, currency symbol).
   * Note: Must be non-interactive/decorative only.
   */
  readonly startContent?: ReactNode;

  /**
   * Element rendered after the input (e.g. decorative icon).
   * Note: Must be non-interactive/decorative only.
   */
  readonly endContent?: ReactNode;

  /**
   * Custom CSS class names merged via `cn()` on the outer input wrapper `<div>`.
   */
  readonly className?: string;

  /**
   * Custom CSS class names merged via `cn()` on the native `<input>` element.
   */
  readonly inputClassName?: string;

  /**
   * Character input filter restricting allowed entry ('numeric', 'decimal', 'alpha', 'alphanumeric').
   */
  readonly inputFilter?: InputFieldInputFilter;

  /**
   * Data attributes for testing and DOM targeting.
   */
  readonly [key: `data-${string}`]: unknown;
}

/**
 * Props for the InputFieldDescription sub-component.
 */
export interface InputFieldDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  /**
   * Custom CSS class names merged via `cn()`.
   */
  readonly className?: string;

  /**
   * Helper description content.
   */
  readonly children?: ReactNode;

  /**
   * Data attributes for testing and DOM targeting.
   */
  readonly [key: `data-${string}`]: unknown;
}

/**
 * Props for the InputFieldError sub-component.
 */
export interface InputFieldErrorProps extends HTMLAttributes<HTMLParagraphElement> {
  /**
   * Custom CSS class names merged via `cn()`.
   */
  readonly className?: string;

  /**
   * Error message content.
   */
  readonly children?: ReactNode;

  /**
   * Data attributes for testing and DOM targeting.
   */
  readonly [key: `data-${string}`]: unknown;
}

/**
 * Internal context state shared between InputField compound components.
 */
export interface InputFieldContextValue {
  readonly variant?: InputFieldVariant;
  readonly labelVariant: InputFieldLabelVariant;
  readonly size?: InputFieldSize;
  readonly shadow?: InputFieldShadow;
  readonly inputFilter?: InputFieldInputFilter;
  readonly isDisabled?: boolean;
  readonly isReadOnly?: boolean;
  readonly isRequired?: boolean;
  readonly isInvalid?: boolean;
  readonly isFocused?: boolean;
  readonly hasValue?: boolean;
  readonly isFloating?: boolean;
  readonly hasStartContent?: boolean;
  readonly hasEndContent?: boolean;
  readonly inputId?: string;
  readonly descriptionId?: string;
  readonly errorId?: string;
  readonly hasDescription?: boolean;
  readonly hasErrorMessage?: boolean;
  readonly classNames?: InputFieldClassNames;
  readonly slotProps?: InputFieldSlotProps;
  readonly setCustomInputId?: (id: string | undefined) => void;
  readonly setIsFocused?: (isFocused: boolean) => void;
  readonly setHasValue?: (hasValue: boolean) => void;
  readonly setHasStartContent?: (hasStartContent: boolean) => void;
  readonly setHasEndContent?: (hasEndContent: boolean) => void;
  readonly registerDescription?: () => () => void;
  readonly registerErrorMessage?: () => () => void;
  readonly styles?: InputFieldReturnType;
}

/**
 * Type for the InputField component with its static compound components attached.
 */
export interface InputFieldComponent extends ForwardRefExoticComponent<
  InputFieldProps & RefAttributes<HTMLDivElement>
> {
  /**
   * Component for the input field label.
   */
  Label: ForwardRefExoticComponent<InputFieldLabelProps & RefAttributes<HTMLLabelElement>>;
  /**
   * Component for the input element wrapper.
   */
  Input: ForwardRefExoticComponent<InputFieldInputProps & RefAttributes<HTMLInputElement>>;
  /**
   * Component for helper/description text.
   */
  Description: ForwardRefExoticComponent<
    InputFieldDescriptionProps & RefAttributes<HTMLParagraphElement>
  >;
  /**
   * Component for validation error message text.
   */
  Error: ForwardRefExoticComponent<InputFieldErrorProps & RefAttributes<HTMLParagraphElement>>;
}
