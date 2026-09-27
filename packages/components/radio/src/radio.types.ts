import type { CSSProperties, HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';
import type { RadioReturnType } from '@ideasui/theme/recipes';

export type RadioVariant = 'solid' | 'outline' | 'subtle' | 'ghost' | 'soft';
export type RadioColor = 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
export type RadioSize = 'sm' | 'md' | 'lg';
export type RadioRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';

export interface RadioProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'onChange' | 'color'
> {
  /**
   * Visual style variant of the radio indicator.
   * @default 'outline'
   */
  readonly variant?: RadioVariant;

  /**
   * Color applied to the checked state.
   * @default 'primary'
   */
  readonly color?: RadioColor;

  /**
   * Size scale of the radio.
   * @default 'md'
   */
  readonly size?: RadioSize;

  /**
   * Border radius corner shape of the radio indicator.
   * @default 'full'
   */
  readonly radius?: RadioRadius;

  /**
   * Controlled selected state when used standalone.
   */
  readonly isSelected?: boolean;

  /**
   * Uncontrolled default selected state when used standalone.
   * @default false
   */
  readonly defaultSelected?: boolean;

  /**
   * Whether pressing an already selected radio unchecks it.
   * Defaults to true for standalone Radio, and inherits from RadioGroup if in a group.
   */
  readonly isToggleable?: boolean;

  /**
   * Marks the radio as disabled.
   * @default false
   */
  readonly isDisabled?: boolean;

  /**
   * Marks the radio as read-only.
   * @default false
   */
  readonly isReadOnly?: boolean;

  /**
   * Marks the radio as required.
   * @default false
   */
  readonly isRequired?: boolean;

  /**
   * Marks the radio as invalid.
   * @default false
   */
  readonly isInvalid?: boolean;

  /**
   * Value of the radio option when used inside a RadioGroup.
   */
  readonly value?: string;

  /**
   * Change handler — receives boolean selected state or value.
   */
  readonly onChange?: (isSelected: boolean) => void;

  /**
   * Custom CSS class names merged via `cn()` on the root label element.
   */
  readonly className?: string;

  /**
   * Inline styles applied to the root label element.
   */
  readonly style?: CSSProperties;

  /**
   * Visible label text rendered beside the indicator.
   */
  readonly children?: ReactNode;

  /**
   * Custom icon/element rendered inside indicator when selected.
   * Can be a ReactNode or a render function receiving `{ className: string }`.
   */
  readonly icon?: ReactNode | ((props: { readonly className: string }) => ReactNode);
}

export interface RadioGroupProps extends Omit<
  HTMLAttributes<HTMLFieldSetElement>,
  'onChange' | 'color'
> {
  /**
   * Form control name propagated to all nested radio inputs.
   */
  readonly name?: string;

  /**
   * Controlled value of the selected radio option.
   */
  readonly value?: string;

  /**
   * Uncontrolled default value of the selected radio option.
   */
  readonly defaultValue?: string;

  /**
   * Change handler — receives the newly selected option value string.
   */
  readonly onChange?: (value: string) => void;

  /**
   * Visual style variant propagated to all child Radios.
   * @default 'outline'
   */
  readonly variant?: RadioVariant;

  /**
   * Color propagated to all child Radios.
   * @default 'primary'
   */
  readonly color?: RadioColor;

  /**
   * Size scale propagated to all child Radios.
   * @default 'md'
   */
  readonly size?: RadioSize;

  /**
   * Border radius corner shape propagated to all child Radios.
   * @default 'full'
   */
  readonly radius?: RadioRadius;

  /**
   * Layout direction of the radio group.
   * @default 'vertical'
   */
  readonly orientation?: 'vertical' | 'horizontal';

  /**
   * Marks all radios in the group as disabled.
   * @default false
   */
  readonly isDisabled?: boolean;

  /**
   * Marks all radios in the group as read-only.
   * @default false
   */
  readonly isReadOnly?: boolean;

  /**
   * Marks the group as required.
   * @default false
   */
  readonly isRequired?: boolean;

  /**
   * Marks the group as invalid. Shows RadioGroupError, hides RadioGroupDescription.
   * @default false
   */
  readonly isInvalid?: boolean;

  /**
   * Whether pressing an already selected radio option in the group deselects it.
   * @default false
   */
  readonly isToggleable?: boolean;

  /**
   * Custom CSS class names merged via `cn()`.
   */
  readonly className?: string;

  /**
   * Inline styles applied to the root fieldset element.
   */
  readonly style?: CSSProperties;

  /**
   * Sub-components: RadioGroupLabel, Radio[], RadioGroupDescription, RadioGroupError.
   */
  readonly children: ReactNode;
}

/**
 * Props for the RadioGroupLabel sub-component.
 */
export interface RadioGroupLabelProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Custom CSS class names merged via `cn()`.
   */
  readonly className?: string;

  /**
   * Label content rendered above the group of radios.
   */
  readonly children: ReactNode;
}

/**
 * Props for the RadioGroupDescription sub-component.
 */
export interface RadioGroupDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  /**
   * Custom CSS class names merged via `cn()`.
   */
  readonly className?: string;

  /**
   * Accessible description text rendered below the radio group when valid.
   */
  readonly children: ReactNode;
}

/**
 * Props for the RadioGroupError sub-component.
 */
export interface RadioGroupErrorProps extends HTMLAttributes<HTMLParagraphElement> {
  /**
   * Custom CSS class names merged via `cn()`.
   */
  readonly className?: string;

  /**
   * Error text rendered below the radio group when isInvalid is true.
   */
  readonly children: ReactNode;
}

export interface RadioGroupContextValue {
  readonly name?: string;
  readonly variant?: RadioVariant;
  readonly color?: RadioColor;
  readonly size?: RadioSize;
  readonly radius?: RadioRadius;
  readonly isDisabled?: boolean;
  readonly isReadOnly?: boolean;
  readonly isRequired?: boolean;
  readonly isInvalid?: boolean;
  readonly isToggleable?: boolean;
  readonly groupLabelId?: string;
  readonly groupDescriptionId?: string;
  readonly groupErrorId?: string;
  readonly selectedValue?: string;
  readonly onGroupChange?: (value: string) => void;
  readonly styles?: RadioReturnType;
}
