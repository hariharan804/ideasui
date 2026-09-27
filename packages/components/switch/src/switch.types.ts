import type { CSSProperties, HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';
import type { SwitchReturnType } from '@ideasui/theme/recipes';

export type { SwitchReturnType } from '@ideasui/theme/recipes';

export type SwitchVariant = 'solid' | 'outline' | 'soft' | 'contrast';
export type SwitchThumbVariant = 'solid' | 'flat' | 'gradient' | 'bordered' | 'contrast' | 'dark';
export type SwitchThumbShape = 'full' | 'pill' | 'square' | 'rectangle';
export type SwitchThumbSize = 'contained' | 'extended';
export type SwitchColor = 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
export type SwitchSize = 'sm' | 'md' | 'lg';
export type SwitchLabelPlacement = 'start' | 'end';

export interface SwitchClassNames {
  readonly root?: string;
  readonly input?: string;
  readonly track?: string;
  readonly thumb?: string;
  readonly thumbIcon?: string;
  readonly onLabel?: string;
  readonly offLabel?: string;
  readonly labelText?: string;
}

export interface SwitchSlotProps {
  readonly root?: HTMLAttributes<HTMLLabelElement> & { readonly [key: `data-${string}`]: unknown };
  readonly input?: InputHTMLAttributes<HTMLInputElement> & {
    readonly [key: `data-${string}`]: unknown;
  };
  readonly track?: HTMLAttributes<HTMLSpanElement> & { readonly [key: `data-${string}`]: unknown };
  readonly thumb?: HTMLAttributes<HTMLSpanElement> & { readonly [key: `data-${string}`]: unknown };
  readonly thumbIcon?: HTMLAttributes<HTMLElement> & { readonly [key: `data-${string}`]: unknown };
  readonly onLabel?: HTMLAttributes<HTMLSpanElement> & {
    readonly [key: `data-${string}`]: unknown;
  };
  readonly offLabel?: HTMLAttributes<HTMLSpanElement> & {
    readonly [key: `data-${string}`]: unknown;
  };
  readonly labelText?: HTMLAttributes<HTMLSpanElement> & {
    readonly [key: `data-${string}`]: unknown;
  };
}

export interface SwitchProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'onChange' | 'color'
> {
  /**
   * Custom CSS class names for individual switch sub-slots (`root`, `input`, `track`, `thumb`, `thumbIcon`, `onLabel`, `offLabel`, `labelText`).
   */
  readonly classNames?: SwitchClassNames;

  /**
   * Granular props for individual switch sub-slots (`root`, `input`, `track`, `thumb`, `thumbIcon`, `onLabel`, `offLabel`, `labelText`).
   */
  readonly slotProps?: SwitchSlotProps;

  /**
   * Visual style variant of the switch track.
   * @default 'solid'
   */
  readonly variant?: SwitchVariant;

  /**
   * Style variant of the switch thumb indicator.
   * @default 'solid'
   */
  readonly thumbVariant?: SwitchThumbVariant;

  /**
   * Shape of the thumb indicator element.
   * @default 'full'
   */
  readonly thumbShape?: SwitchThumbShape;

  /**
   * Sizing style of the thumb relative to the track bounds.
   * - `contained`: Thumb sits inside track bounds (default).
   * - `extended`: Android 12 style where thumb extends past track top/bottom edges.
   * @default 'contained'
   */
  readonly thumbSize?: SwitchThumbSize;

  /**
   * Color scheme applied to the on/active state.
   * @default 'primary'
   */
  readonly color?: SwitchColor;

  /**
   * Size scale of the switch.
   * @default 'md'
   */
  readonly size?: SwitchSize;

  /**
   * Position of the label relative to the track.
   * @default 'end'
   */
  readonly labelPlacement?: SwitchLabelPlacement;

  /**
   * Text rendered inside the track when the switch is on.
   */
  readonly onLabel?: string;

  /**
   * Text rendered inside the track when the switch is off.
   */
  readonly offLabel?: string;

  /**
   * Custom icon rendered inside the thumb. Can be a ReactNode or render function receiving `{ isSelected, className }`.
   */
  readonly thumbIcon?:
    ReactNode | ((props: { isSelected: boolean; className: string }) => ReactNode);

  /**
   * Custom icon rendered inside the thumb when selected (on).
   */
  readonly checkedThumbIcon?: ReactNode | ((props: { className: string }) => ReactNode);

  /**
   * Custom icon rendered inside the thumb when unselected (off).
   */
  readonly uncheckedThumbIcon?: ReactNode | ((props: { className: string }) => ReactNode);

  /**
   * Controlled selected (on) state.
   */
  readonly isSelected?: boolean;

  /**
   * Uncontrolled default selected state.
   * @default false
   */
  readonly defaultSelected?: boolean;

  /**
   * Marks the switch as disabled.
   * @default false
   */
  readonly isDisabled?: boolean;

  /**
   * Marks the switch as read-only.
   * @default false
   */
  readonly isReadOnly?: boolean;

  /**
   * Marks the switch as required.
   * @default false
   */
  readonly isRequired?: boolean;

  /**
   * Marks the switch as invalid.
   * @default false
   */
  readonly isInvalid?: boolean;

  /**
   * Value used when inside a SwitchGroup.
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
   * Visible label text rendered beside the track.
   */
  readonly children?: ReactNode;
}

export interface SwitchGroupProps extends Omit<
  HTMLAttributes<HTMLFieldSetElement>,
  'onChange' | 'color'
> {
  /**
   * Controlled array of active (on) values.
   */
  readonly value?: string[];

  /**
   * Uncontrolled default active values.
   */
  readonly defaultValue?: string[];

  /**
   * Change handler — receives the new array of active values.
   */
  readonly onChange?: (value: string[]) => void;

  /**
   * Visual style variant propagated to all child Switches.
   * @default 'solid'
   */
  readonly variant?: SwitchVariant;

  /**
   * Color scheme propagated to all child Switches.
   * @default 'primary'
   */
  readonly color?: SwitchColor;

  /**
   * Size scale propagated to all child Switches.
   * @default 'md'
   */
  readonly size?: SwitchSize;

  /**
   * Label placement propagated to all child Switches.
   * @default 'end'
   */
  readonly labelPlacement?: SwitchLabelPlacement;

  /**
   * Layout direction of the switch group.
   * @default 'vertical'
   */
  readonly orientation?: 'vertical' | 'horizontal';

  /**
   * Marks all switches in the group as disabled.
   * @default false
   */
  readonly isDisabled?: boolean;

  /**
   * Marks all switches in the group as read-only.
   * @default false
   */
  readonly isReadOnly?: boolean;

  /**
   * Marks the group as required.
   * @default false
   */
  readonly isRequired?: boolean;

  /**
   * Marks the group as invalid. Shows SwitchGroupError, hides SwitchGroupDescription.
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
   * Sub-components: SwitchGroupLabel, Switch[], SwitchGroupDescription, SwitchGroupError.
   */
  readonly children: ReactNode;
}

export interface SwitchGroupLabelProps extends HTMLAttributes<HTMLSpanElement> {
  readonly className?: string;
  readonly children: ReactNode;
}

export interface SwitchGroupDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  readonly className?: string;
  readonly children: ReactNode;
}

export interface SwitchGroupErrorProps extends HTMLAttributes<HTMLParagraphElement> {
  readonly className?: string;
  readonly children: ReactNode;
}

export interface SwitchGroupContextValue {
  readonly variant?: SwitchVariant;
  readonly color?: SwitchColor;
  readonly size?: SwitchSize;
  readonly labelPlacement?: SwitchLabelPlacement;
  readonly isDisabled?: boolean;
  readonly isReadOnly?: boolean;
  readonly isRequired?: boolean;
  readonly isInvalid?: boolean;
  readonly groupLabelId?: string;
  readonly groupDescriptionId?: string;
  readonly groupErrorId?: string;
  readonly selectedValues?: string[];
  readonly onGroupChange?: (value: string, checked: boolean) => void;
  readonly styles?: SwitchReturnType;
}
