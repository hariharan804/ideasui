import type {
  ButtonHTMLAttributes,
  CSSProperties,
  ForwardRefExoticComponent,
  HTMLAttributes,
  ReactNode,
  RefAttributes,
} from 'react';
import type { ChipReturnType } from '@ideasui/theme/recipes';

export type ChipVariant = 'solid' | 'soft' | 'outline' | 'ghost';
export type ChipColor = 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
export type ChipSize = 'sm' | 'md' | 'lg';
export type ChipMode = 'static' | 'selectable' | 'dismissible';
export type ChipSelectionMode = 'single' | 'multiple';

/**
 * Slot class name overrides for granular customization.
 */
export interface ChipClassNames {
  root?: string;
  label?: string;
  startContent?: string;
  endContent?: string;
  avatar?: string;
  icon?: string;
  dismiss?: string;
}

/**
 * Granular HTML props customization for individual slots.
 */
export interface ChipSlotProps {
  label?: HTMLAttributes<HTMLSpanElement> & { [key: `data-${string}`]: unknown };
  startContent?: HTMLAttributes<HTMLSpanElement> & { [key: `data-${string}`]: unknown };
  endContent?: HTMLAttributes<HTMLSpanElement> & { [key: `data-${string}`]: unknown };
  dismiss?: ButtonHTMLAttributes<HTMLButtonElement> & { [key: `data-${string}`]: unknown };
}

export interface ChipProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /**
   * Interaction mode of the chip.
   * - `static`      — display only, not interactive
   * - `selectable`  — toggleable, renders as `<button>` with `aria-pressed`
   * - `dismissible` — removable, renders label as `<span>` with a `ChipDismiss` button
   * @default 'static'
   */
  readonly mode?: ChipMode;

  /**
   * Visual style variant.
   * @default 'soft'
   */
  readonly variant?: ChipVariant;

  /**
   * Color scheme of the chip.
   * @default 'neutral'
   */
  readonly color?: ChipColor;

  /**
   * Size scale of the chip.
   * @default 'md'
   */
  readonly size?: ChipSize;

  /**
   * Controlled selected state. Only applies when `mode="selectable"`.
   */
  readonly isSelected?: boolean;

  /**
   * Uncontrolled default selected state. Only applies when `mode="selectable"`.
   * @default false
   */
  readonly defaultSelected?: boolean;

  /**
   * Marks the chip as disabled.
   * @default false
   */
  readonly isDisabled?: boolean;

  /**
   * Value used when inside a ChipGroup.
   */
  readonly value?: string;

  /**
   * Change handler for selectable mode — receives the new boolean selected state.
   */
  readonly onChange?: (isSelected: boolean) => void;

  /**
   * Dismiss handler for dismissible mode — called when the dismiss button is activated.
   */
  readonly onDismiss?: () => void;

  /**
   * Accessible label for the dismiss button. Defaults to `"Remove {children}"`.
   */
  readonly dismissLabel?: string;

  /**
   * Element rendered before the label (e.g. ChipAvatar, ChipIcon).
   */
  readonly startContent?: ReactNode;

  /**
   * Element rendered after the label (e.g. ChipDismiss, custom icon).
   */
  readonly endContent?: ReactNode;

  /**
   * Custom CSS class names merged via `cn()`.
   */
  readonly className?: string;

  /**
   * Granular slot class overrides.
   */
  readonly classNames?: ChipClassNames;

  /**
   * Granular HTML props customization for individual slots.
   */
  readonly slotProps?: ChipSlotProps;

  /**
   * Inline styles applied to the root element.
   */
  readonly style?: CSSProperties;

  /**
   * Visible label text or child nodes.
   */
  readonly children?: ReactNode;
}

export interface ChipGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Selection mode of the group.
   * - `single`   — only one chip can be selected at a time
   * - `multiple` — multiple chips can be selected simultaneously
   * @default 'multiple'
   */
  readonly selectionMode?: ChipSelectionMode;

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
   * Visual style variant propagated to all child Chips.
   * @default 'soft'
   */
  readonly variant?: ChipVariant;

  /**
   * Color scheme propagated to all child Chips.
   * @default 'neutral'
   */
  readonly color?: ChipColor;

  /**
   * Size scale propagated to all child Chips.
   * @default 'md'
   */
  readonly size?: ChipSize;

  /**
   * Marks all chips in the group as disabled.
   * @default false
   */
  readonly isDisabled?: boolean;

  /**
   * Accessible label for the chip group (used as `aria-label`).
   */
  readonly label?: string;

  /**
   * Custom CSS class names merged via `cn()`.
   */
  readonly className?: string;

  /**
   * Inline styles applied to the root wrapper element.
   */
  readonly style?: CSSProperties;

  /**
   * Child Chip components.
   */
  readonly children: ReactNode;
}

export interface ChipAvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
  /**
   * Image source URL.
   */
  readonly src?: string;

  /**
   * Full name used to generate initials fallback.
   */
  readonly name?: string;

  /**
   * Alt text for the image. Defaults to `name` if provided.
   */
  readonly alt?: string;

  /**
   * Color scheme for the avatar.
   */
  readonly color?: ChipColor;

  /**
   * Custom CSS class name.
   */
  readonly className?: string;
}

export interface ChipIconProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Custom CSS class name.
   */
  readonly className?: string;

  /**
   * Icon content.
   */
  readonly children: ReactNode;
}

export interface ChipDismissProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Accessible label for the dismiss button.
   * @default 'Remove'
   */
  readonly label?: string;

  /**
   * Custom CSS class name.
   */
  readonly className?: string;
}

export interface ChipGroupContextValue {
  readonly selectionMode?: ChipSelectionMode;
  readonly variant?: ChipVariant;
  readonly color?: ChipColor;
  readonly size?: ChipSize;
  readonly isDisabled?: boolean;
  readonly selectedValues?: string[];
  readonly onGroupChange?: (value: string, selected: boolean) => void;
  readonly styles?: ChipReturnType;
}

export type ChipComponent = ForwardRefExoticComponent<ChipProps & RefAttributes<HTMLElement>> & {
  Group: ForwardRefExoticComponent<ChipGroupProps & RefAttributes<HTMLDivElement>>;
  Avatar: ForwardRefExoticComponent<ChipAvatarProps & RefAttributes<HTMLSpanElement>>;
  Icon: ForwardRefExoticComponent<ChipIconProps & RefAttributes<HTMLSpanElement>>;
  Dismiss: ForwardRefExoticComponent<ChipDismissProps & RefAttributes<HTMLButtonElement>>;
};
