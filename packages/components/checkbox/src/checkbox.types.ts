import type { CSSProperties, HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';
import type { CheckboxReturnType } from '@ideasui/theme/recipes';

export type CheckboxVariant = 'solid' | 'outline' | 'subtle';
export type CheckboxColorScheme = 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
export type CheckboxSize = 'sm' | 'md' | 'lg';
export type CheckboxRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'onChange'
> {
  /**
   * Visual style variant of the checkbox indicator.
   * @default 'solid'
   */
  readonly variant?: CheckboxVariant;

  /**
   * Color scheme applied to the checked/indeterminate state.
   * @default 'primary'
   */
  readonly colorScheme?: CheckboxColorScheme;

  /**
   * Size scale of the checkbox.
   * @default 'md'
   */
  readonly size?: CheckboxSize;

  /**
   * Border radius corner shape of the checkbox indicator.
   * Use 'none' for square or 'full' for circular checkboxes.
   */
  readonly radius?: CheckboxRadius;

  /**
   * Controlled selected state.
   */
  readonly isSelected?: boolean;

  /**
   * Uncontrolled default selected state.
   * @default false
   */
  readonly defaultSelected?: boolean;

  /**
   * Indeterminate state — used for parent checkboxes in a selection tree.
   * @default false
   */
  readonly isIndeterminate?: boolean;

  /**
   * Marks the checkbox as disabled.
   * @default false
   */
  readonly isDisabled?: boolean;

  /**
   * Marks the checkbox as read-only.
   * @default false
   */
  readonly isReadOnly?: boolean;

  /**
   * Marks the checkbox as required.
   * @default false
   */
  readonly isRequired?: boolean;

  /**
   * Marks the checkbox as invalid.
   * @default false
   */
  readonly isInvalid?: boolean;

  /**
   * Value used when inside a CheckboxGroup.
   */
  readonly value?: string;

  /**
   * Change handler — receives the new boolean selected state.
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
}

export interface CheckboxGroupProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange' | 'color'
> {
  /**
   * Controlled array of selected values.
   */
  readonly value?: string[];

  /**
   * Uncontrolled default selected values.
   */
  readonly defaultValue?: string[];

  /**
   * Change handler — receives the new array of selected values.
   */
  readonly onChange?: (value: string[]) => void;

  /**
   * Visual style variant propagated to all child Checkboxes.
   * @default 'solid'
   */
  readonly variant?: CheckboxVariant;

  /**
   * Color scheme propagated to all child Checkboxes.
   * @default 'primary'
   */
  readonly colorScheme?: CheckboxColorScheme;

  /**
   * Size scale propagated to all child Checkboxes.
   * @default 'md'
   */
  readonly size?: CheckboxSize;

  /**
   * Border radius corner shape propagated to all child Checkboxes.
   */
  readonly radius?: CheckboxRadius;

  /**
   * Layout direction of the checkbox group.
   * @default 'vertical'
   */
  readonly orientation?: 'vertical' | 'horizontal';

  /**
   * Marks all checkboxes in the group as disabled.
   * @default false
   */
  readonly isDisabled?: boolean;

  /**
   * Marks all checkboxes in the group as read-only.
   * @default false
   */
  readonly isReadOnly?: boolean;

  /**
   * Marks the group as required.
   * @default false
   */
  readonly isRequired?: boolean;

  /**
   * Marks the group as invalid. Shows CheckboxGroupError, hides CheckboxGroupDescription.
   * @default false
   */
  readonly isInvalid?: boolean;

  /**
   * Custom CSS class names merged via `cn()`.
   */
  readonly className?: string;

  /**
   * Inline styles applied to the root wrapper element.
   */
  readonly style?: CSSProperties;

  /**
   * Sub-components: CheckboxGroupLabel, Checkbox[], CheckboxGroupDescription, CheckboxGroupError.
   */
  readonly children: ReactNode;
}

/**
 * Props for the CheckboxGroupLabel sub-component.
 */
export interface CheckboxGroupLabelProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Custom CSS class names merged via `cn()`.
   */
  readonly className?: string;

  /**
   * Label content rendered above the group of checkboxes.
   */
  readonly children: ReactNode;
}

/**
 * Props for the CheckboxGroupDescription sub-component.
 */
export interface CheckboxGroupDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  /**
   * Custom CSS class names merged via `cn()`.
   */
  readonly className?: string;

  /**
   * Accessible description text rendered below the checkbox group when valid.
   */
  readonly children: ReactNode;
}

/**
 * Props for the CheckboxGroupError sub-component.
 */
export interface CheckboxGroupErrorProps extends HTMLAttributes<HTMLParagraphElement> {
  /**
   * Custom CSS class names merged via `cn()`.
   */
  readonly className?: string;

  /**
   * Error text rendered below the checkbox group when isInvalid is true.
   */
  readonly children: ReactNode;
}

export interface CheckboxGroupContextValue {
  readonly variant?: CheckboxVariant;
  readonly colorScheme?: CheckboxColorScheme;
  readonly size?: CheckboxSize;
  readonly radius?: CheckboxRadius;
  readonly isDisabled?: boolean;
  readonly isReadOnly?: boolean;
  readonly isRequired?: boolean;
  readonly isInvalid?: boolean;
  readonly groupLabelId?: string;
  readonly groupDescriptionId?: string;
  readonly groupErrorId?: string;
  readonly selectedValues?: string[];
  readonly onGroupChange?: (value: string, checked: boolean) => void;
  readonly styles?: CheckboxReturnType;
}
