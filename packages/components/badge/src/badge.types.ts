import type {
  CSSProperties,
  ForwardRefExoticComponent,
  HTMLAttributes,
  ReactNode,
  RefAttributes,
} from 'react';

export type BadgeVariant = 'solid' | 'soft' | 'outline' | 'ghost';
export type BadgeColor = 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgePlacement = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

/**
 * Slot class overrides for Badge.
 */
export interface BadgeClassNames {
  /** Class name applied to the badge root element. */
  root?: string;
}

/**
 * Custom slot props for Badge.
 */
export interface BadgeSlotProps {
  /** Props forwarded to the root span element. */
  root?: HTMLAttributes<HTMLSpanElement> & { [key: `data-${string}`]: unknown };
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Visual style variant of the badge.
   * @default 'solid'
   */
  readonly variant?: BadgeVariant;

  /**
   * Color scheme of the badge.
   * @default 'primary'
   */
  readonly color?: BadgeColor;

  /**
   * Size scale of the badge.
   * @default 'md'
   */
  readonly size?: BadgeSize;

  /**
   * Renders the badge as a small dot with no text content.
   * When `true`, `children` and `max` are ignored.
   * @default false
   */
  readonly isDot?: boolean;

  /**
   * Maximum numeric value to display. When `children` exceeds this value,
   * renders `{max}+` instead. Only applies when `children` is a number or
   * numeric string.
   */
  readonly max?: number;

  /**
   * Hides the badge visually and from layout without removing it from the DOM.
   * Useful for animated show/hide transitions.
   * @default false
   */
  readonly isInvisible?: boolean;

  /**
   * Custom CSS class names merged via `cn()`.
   */
  readonly className?: string;

  /**
   * Granular class overrides for component slots.
   */
  readonly classNames?: BadgeClassNames;

  /**
   * Custom props forwarded to component slots.
   */
  readonly slotProps?: BadgeSlotProps;

  /**
   * Inline styles applied to the root element.
   */
  readonly style?: CSSProperties;

  /**
   * Badge content — count, label, or icon.
   * Ignored when `isDot=true`.
   */
  readonly children?: ReactNode;
}

/**
 * Slot class overrides for BadgeAnchor.
 */
export interface BadgeAnchorClassNames {
  /** Class name applied to the anchor wrapper element. */
  root?: string;
  /** Class name applied to the inner positioned badge wrapper element. */
  badgeWrapper?: string;
}

/**
 * Custom slot props for BadgeAnchor.
 */
export interface BadgeAnchorSlotProps {
  /** Props forwarded to the anchor root span element. */
  root?: HTMLAttributes<HTMLSpanElement> & { [key: `data-${string}`]: unknown };
  /** Props forwarded to the inner positioned badge wrapper element. */
  badgeWrapper?: HTMLAttributes<HTMLSpanElement> & { [key: `data-${string}`]: unknown };
}

export interface BadgeAnchorProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * The `Badge` element to overlay on the child.
   */
  readonly badge: ReactNode;

  /**
   * Placement of the badge relative to the child element.
   * @default 'top-right'
   */
  readonly placement?: BadgePlacement;

  /**
   * Offset applied to the badge position. Useful for fine-tuning overlap.
   * @default { x: 0, y: 0 }
   */
  readonly offset?: { readonly x?: number; readonly y?: number };

  /**
   * Custom CSS class names merged via `cn()` on the anchor wrapper.
   */
  readonly className?: string;

  /**
   * Granular class overrides for anchor slots.
   */
  readonly classNames?: BadgeAnchorClassNames;

  /**
   * Custom props forwarded to anchor slots.
   */
  readonly slotProps?: BadgeAnchorSlotProps;

  /**
   * Inline styles applied to the anchor wrapper element.
   */
  readonly style?: CSSProperties;

  /**
   * The element being badged (avatar, icon button, etc.).
   */
  readonly children: ReactNode;
}

export type BadgeAnchorComponent = ForwardRefExoticComponent<
  BadgeAnchorProps & RefAttributes<HTMLSpanElement>
>;

export type BadgeComponent = ForwardRefExoticComponent<
  BadgeProps & RefAttributes<HTMLSpanElement>
> & {
  Anchor: BadgeAnchorComponent;
};
