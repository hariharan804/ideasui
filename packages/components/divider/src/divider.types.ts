import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerLineStyle = 'solid' | 'dashed' | 'dotted';
export type DividerLayout = 'full' | 'inset' | 'inset-start' | 'inset-end' | 'middle';
export type DividerVariant = DividerLineStyle | DividerLayout;
export type DividerColor = 'default' | 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
export type DividerThickness = 'sm' | 'md' | 'lg';
export type DividerLabelPlacement = 'start' | 'center' | 'end';

/**
 * Granular class name slots for the Divider component.
 */
export interface DividerClassNames {
  /** Class name applied to the root element. */
  root?: string;
  /** Class name applied to line segment(s). */
  line?: string;
  /** Class name applied to the label wrapper. */
  label?: string;
}

/**
 * Props for the Divider component.
 */
export interface DividerProps extends Omit<HTMLAttributes<HTMLElement>, 'color'> {
  /**
   * Orientation of the divider line.
   * @default 'horizontal'
   */
  readonly orientation?: DividerOrientation;

  /**
   * Visual style or layout variant of the divider line:
   * - Line styles: `'solid'` | `'dashed'` | `'dotted'`
   * - Layout variants: `'full'` | `'inset'` | `'inset-start'` | `'inset-end'` | `'middle'`
   * @default 'solid'
   */
  readonly variant?: DividerVariant;

  /**
   * Layout span of the divider line:
   * - `full` — spans full width/height of parent (default)
   * - `inset` / `inset-start` — indented from the start (left in LTR)
   * - `inset-end` — indented from the end (right in LTR)
   * - `middle` — centered with equal margins on both sides
   * @default 'full'
   */
  readonly layout?: DividerLayout;

  /**
   * Border style of the line segments:
   * - `solid` | `dashed` | `dotted`
   * @default 'solid'
   */
  readonly lineStyle?: DividerLineStyle;

  /**
   * Shorthand for full width/height layout (`layout="full"`).
   */
  readonly full?: boolean;

  /**
   * Shorthand for inset layout:
   * - `true` | `'start'` — indents from start (`layout="inset-start"`)
   * - `'end'` — indents from end (`layout="inset-end"`)
   */
  readonly inset?: boolean | 'start' | 'end';

  /**
   * Shorthand for end-indented layout (`layout="inset-end"`).
   */
  readonly insetEnd?: boolean;

  /**
   * Shorthand for middle layout (`layout="middle"`).
   */
  readonly middle?: boolean;

  /**
   * Color scheme of the divider line.
   * @default 'default'
   */
  readonly color?: DividerColor;

  /**
   * Thickness scale of the divider line:
   * - `sm` → 1px
   * - `md` → 2px
   * - `lg` → 4px
   * @default 'sm'
   */
  readonly thickness?: DividerThickness;

  /**
   * Optional label rendered inside the divider.
   * Accepts text, icon, or any ReactNode.
   * When provided, the divider renders as a flex container with line segments.
   */
  readonly label?: ReactNode;

  /**
   * Placement of the label along the divider line.
   * Only applies when `label` is provided.
   * @default 'center'
   */
  readonly labelPlacement?: DividerLabelPlacement;

  /**
   * When `true`, the divider is purely decorative — `role="none"` and `aria-hidden="true"`
   * are applied, hiding the element from assistive technologies.
   * When `false` (default), `role="separator"` is applied.
   * @default false
   */
  readonly decorative?: boolean;

  /**
   * Custom class names for individual component slots.
   */
  readonly classNames?: DividerClassNames;

  /**
   * Additional CSS class name merged into the root slot.
   */
  readonly className?: string;

  /**
   * Inline styles applied to the root element.
   */
  readonly style?: CSSProperties;
}
