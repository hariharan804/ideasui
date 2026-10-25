import type {
  CSSProperties,
  ElementType,
  ForwardRefExoticComponent,
  HTMLAttributes,
  ReactNode,
  RefAttributes,
} from 'react';

export type BadgeVariant =
  'standard' | 'dot' | 'solid' | 'soft' | 'outline' | 'ghost' | (string & {});

export type BadgeColor =
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'default'
  | 'error'
  | (string & {});

export type BadgeSize = 'sm' | 'md' | 'lg';

export type BadgePlacement = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export type BadgeOverlap = 'rectangular' | 'circular';

export interface BadgeAnchorOrigin {
  /**
   * Vertical position of the anchor.
   * @default 'top'
   */
  readonly vertical?: 'top' | 'bottom';

  /**
   * Horizontal position of the anchor.
   * @default 'right'
   */
  readonly horizontal?: 'left' | 'right';
}

/**
 * Slot class overrides for Badge.
 */
export interface BadgeClassNames {
  /** Class name applied to the badge root element (wrapper when children exist, or badge when standalone). */
  readonly root?: string;
  /** Class name applied to the badge indicator element. */
  readonly badge?: string;
}

/**
 * Custom components used for each slot inside Badge.
 */
export interface BadgeSlots {
  /** Component used for the root element. */
  readonly root?: ElementType;
  /** Component used for the badge indicator element. */
  readonly badge?: ElementType;
}

/**
 * Custom slot props for Badge.
 */
export interface BadgeSlotProps {
  /** Props forwarded to the root element. */
  readonly root?: HTMLAttributes<HTMLSpanElement> & { readonly [key: `data-${string}`]: unknown };
  /** Props forwarded to the badge indicator element. */
  readonly badge?: HTMLAttributes<HTMLSpanElement> & { readonly [key: `data-${string}`]: unknown };
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * The anchor of the badge relative to the wrapped child.
   * @default { vertical: 'top', horizontal: 'right' }
   */
  readonly anchorOrigin?: BadgeAnchorOrigin;

  /**
   * Placement shorthand of the badge relative to the wrapped child.
   * @default 'top-right'
   */
  readonly placement?: BadgePlacement;

  /**
   * The content rendered within the badge.
   * When `children` are present, `badgeContent` is rendered inside the badge indicator.
   */
  readonly badgeContent?: ReactNode;

  /**
   * Wrapped shape the badge should overlap.
   * Use `'circular'` when the badged element is circular (e.g. Avatar).
   * @default 'rectangular'
   */
  readonly overlap?: BadgeOverlap;

  /**
   * The variant to use.
   * @default 'standard'
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
   * If true, the badge is invisible.
   * Scales and hides the badge with smooth transition without unmounting.
   * @default false
   */
  readonly invisible?: boolean;

  /**
   * Alias for `invisible`.
   * @default false
   */
  readonly isInvisible?: boolean;

  /**
   * Controls whether the badge is hidden when `badgeContent` is zero.
   * @default false
   */
  readonly showZero?: boolean;

  /**
   * Max count to show. When numeric count exceeds this value, renders `{max}+`.
   * @default 99
   */
  readonly max?: number;

  /**
   * Renders the badge as a compact status indicator dot without text content.
   * Equivalent to `variant="dot"`.
   * @default false
   */
  readonly isDot?: boolean;

  /**
   * Adds a high-contrast surface ring around the badge indicator.
   * @default false
   */
  readonly bordered?: boolean;

  /**
   * The component used for the root node. Either a string to use an HTML element or a component.
   * @default 'span'
   */
  readonly component?: ElementType;

  /**
   * Custom components used for each slot inside Badge.
   */
  readonly slots?: BadgeSlots;

  /**
   * Custom props forwarded to component slots.
   */
  readonly slotProps?: BadgeSlotProps;

  /**
   * Override or extend the styles applied to the component slots (MUI classes compatibility).
   */
  readonly classes?: BadgeClassNames;

  /**
   * Granular class overrides for component slots.
   */
  readonly classNames?: BadgeClassNames;

  /**
   * Custom CSS class names merged via `cn()`.
   */
  readonly className?: string;

  /**
   * Inline styles applied to the root element.
   */
  readonly style?: CSSProperties;

  /**
   * The element to which the badge is anchored.
   * If omitted and `badgeContent` is not provided, `children` is treated as the badge content.
   */
  readonly children?: ReactNode;
}

/**
 * Slot class overrides for BadgeAnchor.
 */
export interface BadgeAnchorClassNames {
  /** Class name applied to the anchor wrapper element. */
  readonly root?: string;
  /** Class name applied to the inner positioned badge wrapper element. */
  readonly badgeWrapper?: string;
}

/**
 * Custom slot props for BadgeAnchor.
 */
export interface BadgeAnchorSlotProps {
  /** Props forwarded to the anchor root span element. */
  readonly root?: HTMLAttributes<HTMLSpanElement> & { readonly [key: `data-${string}`]: unknown };
  /** Props forwarded to the inner positioned badge wrapper element. */
  readonly badgeWrapper?: HTMLAttributes<HTMLSpanElement> & {
    readonly [key: `data-${string}`]: unknown;
  };
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
   * Wrapped shape the badge should overlap.
   * Use `'circular'` when the badged element is circular (e.g. Avatar).
   * @default 'rectangular'
   */
  readonly overlap?: BadgeOverlap;

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
