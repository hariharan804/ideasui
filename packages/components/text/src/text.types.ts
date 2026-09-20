import type { ElementType, HTMLAttributes, ReactNode } from 'react';

export type TextElement =
  | 'p'
  | 'span'
  | 'div'
  | 'label'
  | 'a'
  | 'strong'
  | 'em'
  | 'small'
  | 'code'
  | 'blockquote'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6';

export type TextVariant =
  | 'body'
  | 'label'
  | 'caption'
  | 'overline'
  | 'code'
  | 'lead'
  | 'helper'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6';
export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';
export type TextColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'muted'
  | 'inverse'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';
export type TextAlign = 'start' | 'center' | 'end' | 'justify';

export interface TextProps extends Omit<HTMLAttributes<HTMLElement>, 'slot'> {
  /**
   * The underlying HTML element or React component to render.
   * If omitted, automatically selects the semantic element based on `variant`:
   * - `h1`–`h6` → `<h1>`–`<h6>`
   * - `body`, `lead` → `<p>`
   * - `label`, `caption`, `overline`, `helper` → `<span>`
   * - `code` → `<code>`
   */
  readonly as?: ElementType;

  /**
   * Typographic intent variant. Sets default font size, font weight, line height, and HTML tag.
   * @default 'body'
   */
  readonly variant?: TextVariant;

  /**
   * Font size scale override. When provided, overrides the default font size scale of the active `variant`.
   */
  readonly size?: TextSize;

  /**
   * Font weight setting override. When provided, overrides the default font weight of the active `variant`.
   */
  readonly weight?: TextWeight;

  /**
   * Semantic OKLCH content color token.
   * @default 'primary'
   */
  readonly color?: TextColor;

  /**
   * Text alignment using logical properties (start/end for RTL compatibility).
   * @default 'start'
   */
  readonly align?: TextAlign;

  /**
   * Truncate overflowing text on a single line with ellipsis.
   * @default false
   */
  readonly truncate?: boolean;

  /**
   * Maximum number of lines to display before truncating.
   */
  readonly lineClamp?: number;

  /**
   * Slot identifier used for composition with React Aria components.
   */
  readonly slot?: string | null;

  /**
   * Custom CSS class names merged via `cn()`.
   */
  readonly className?: string;

  /**
   * Children content to render inside the text element.
   */
  readonly children?: ReactNode;
}
