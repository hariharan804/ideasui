import type {
  ReactNode,
  TextareaHTMLAttributes,
  Ref,
  ForwardRefExoticComponent,
  RefAttributes,
  ChangeEvent,
  FocusEvent,
  CSSProperties,
} from 'react';
import type {
  InputFieldProps,
  InputFieldClassNames,
  InputFieldSlotProps,
} from './input-field.types';
import type { InputFieldLabel } from './input-field-label';
import type { InputFieldDescription } from './input-field-description';
import type { InputFieldError } from './input-field-error';
import type { InputFieldTextarea } from './input-field-textarea';

/**
 * Resize handle behavior for the multi-line textarea.
 */
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

/**
 * Props for the InputField.Textarea subcomponent and primitive textarea element.
 */
export interface InputFieldTextareaProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'size'
> {
  /**
   * Adornment content rendered at the start inside the textarea wrapper.
   */
  readonly startContent?: ReactNode;

  /**
   * Adornment content rendered at the end inside the textarea wrapper.
   */
  readonly endContent?: ReactNode;

  /**
   * Minimum number of visible text rows.
   * @default 3
   */
  readonly minRows?: number;

  /**
   * Maximum number of visible text rows before vertical scrolling kicks in.
   */
  readonly maxRows?: number;

  /**
   * Whether the textarea automatically resizes height based on content.
   * @default true
   */
  readonly autoResize?: boolean;

  /**
   * Directional resize handle control.
   * @default 'none'
   */
  readonly resize?: TextareaResize;

  /**
   * Whether to display the character count (e.g. 24 / 200).
   * Can be a boolean or a custom render function.
   * @default false
   */
  readonly showCharacterCount?: boolean | ((count: number, maxLength?: number) => ReactNode);

  /**
   * Direct ref to the underlying native `<textarea>` element.
   */
  readonly textareaRef?: Ref<HTMLTextAreaElement>;

  /**
   * Additional class names for the outer wrapper.
   */
  readonly className?: string;

  /**
   * Additional class names applied directly to the native `<textarea>`.
   */
  readonly textareaClassName?: string;

  /**
   * Whether the textarea element should automatically receive focus on mount.
   */
  readonly autoFocus?: boolean;

  /**
   * Callback fired when value changes, receiving the new text string.
   */
  readonly onValueChange?: (value: string) => void;
}

/**
 * Custom CSS class names for individual Textarea component slots.
 */
export interface TextareaClassNames extends InputFieldClassNames {
  /** Class name applied to the textarea wrapper. */
  readonly textarea?: string;
  /** Class name applied to the character counter element. */
  readonly counter?: string;
}

/**
 * Custom props for individual Textarea component slots in shorthand usage.
 */
export interface TextareaSlotProps extends InputFieldSlotProps {
  /** Props passed to the InputFieldTextarea slot. */
  readonly textarea?: InputFieldTextareaProps;
}

/**
 * Props for the standalone `<Textarea>` component.
 */
export interface TextareaProps {
  /**
   * Label content for the textarea.
   */
  readonly label?: ReactNode;

  /**
   * Helper description text rendered below the textarea.
   */
  readonly description?: ReactNode;

  /**
   * Error message text displayed when isInvalid is true.
   */
  readonly errorMessage?: ReactNode;

  /**
   * Visual surface styling variant.
   * @default 'outline'
   */
  readonly variant?: InputFieldProps['variant'];

  /**
   * Label positioning and floating behavior.
   * @default 'default'
   */
  readonly labelVariant?: InputFieldProps['labelVariant'];

  /**
   * Size scale for the textarea.
   * @default 'md'
   */
  readonly size?: InputFieldProps['size'];

  /**
   * Shadow elevation level.
   * @default false
   */
  readonly shadow?: InputFieldProps['shadow'];

  /**
   * Whether the textarea is disabled.
   * @default false
   */
  readonly isDisabled?: boolean;

  /**
   * Whether the textarea is in read-only mode.
   * @default false
   */
  readonly isReadOnly?: boolean;

  /**
   * Whether the textarea is marked as required.
   * @default false
   */
  readonly isRequired?: boolean;

  /**
   * Whether the textarea is in an invalid/error state.
   * @default false
   */
  readonly isInvalid?: boolean;

  /**
   * Controlled value of the textarea.
   */
  readonly value?: string | number | readonly string[];

  /**
   * Default uncontrolled value of the textarea.
   */
  readonly defaultValue?: string | number | readonly string[];

  /**
   * Placeholder text shown when the textarea is empty.
   */
  readonly placeholder?: string;

  /**
   * Adornment content rendered at the start inside the textarea wrapper.
   */
  readonly startContent?: ReactNode;

  /**
   * Adornment content rendered at the end inside the textarea wrapper.
   */
  readonly endContent?: ReactNode;

  /**
   * Minimum number of visible text rows.
   * @default 3
   */
  readonly minRows?: number;

  /**
   * Maximum number of visible text rows before vertical scrolling kicks in.
   */
  readonly maxRows?: number;

  /**
   * Whether the textarea automatically resizes height based on content.
   * @default true
   */
  readonly autoResize?: boolean;

  /**
   * Directional resize handle control.
   * @default 'none'
   */
  readonly resize?: TextareaResize;

  /**
   * Whether to display the character count (e.g. 24 / 200).
   * Can be a boolean or a custom render function.
   * @default false
   */
  readonly showCharacterCount?: boolean | ((count: number, maxLength?: number) => ReactNode);

  /**
   * Maximum number of characters allowed.
   */
  readonly maxLength?: number;

  /**
   * Unique identifier for the textarea.
   */
  readonly id?: string;

  /**
   * Whether the textarea element should automatically receive focus on mount.
   */
  readonly autoFocus?: boolean;

  /**
   * Form field name for the textarea.
   */
  readonly name?: string;

  /**
   * Additional CSS class name for the root container.
   */
  readonly className?: string;

  /**
   * Inline styles for the root container.
   */
  readonly style?: CSSProperties;

  /**
   * Custom CSS class names for individual component slots.
   */
  readonly classNames?: TextareaClassNames;

  /**
   * Custom props for individual component slots.
   */
  readonly slotProps?: TextareaSlotProps;

  /**
   * Compound subcomponent children (e.g. `<Textarea.Label>`, `<Textarea.Input>`).
   */
  readonly children?: ReactNode;

  /**
   * Focus event handler for the textarea element.
   */
  readonly onFocus?: (event: FocusEvent<HTMLTextAreaElement>) => void;

  /**
   * Blur event handler for the textarea element.
   */
  readonly onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void;

  /**
   * Change event handler for the textarea element.
   */
  readonly onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;

  /**
   * Callback fired when value changes, receiving the new text string.
   */
  readonly onValueChange?: (value: string) => void;
}

/**
 * Type definition for the standalone Textarea compound component.
 */
export type TextareaComponent = ForwardRefExoticComponent<
  TextareaProps & RefAttributes<HTMLTextAreaElement>
> & {
  /** Label subcomponent. */
  Label: typeof InputFieldLabel;
  /** Multi-line textarea subcomponent. */
  Input: typeof InputFieldTextarea;
  /** Helper description subcomponent. */
  Description: typeof InputFieldDescription;
  /** Error message subcomponent. */
  Error: typeof InputFieldError;
};
