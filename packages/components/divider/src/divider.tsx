'use client';

import type {
  DividerLayout,
  DividerLineStyle,
  DividerProps,
  DividerVariant,
} from './divider.types';
import type { JSX } from 'react';

import { forwardRef, useMemo } from 'react';
import { divider as dividerRecipe } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';

/**
 * Resolves the effective layout option based on shorthand flags and layout props.
 */
function resolveDividerLayout(
  variant?: DividerVariant,
  layout?: DividerLayout,
  full?: boolean,
  inset?: boolean | 'start' | 'end',
  insetEnd?: boolean,
  middle?: boolean,
): DividerLayout {
  if (full) {
    return 'full';
  }
  if (inset === 'end' || insetEnd) {
    return 'inset-end';
  }
  if (inset === 'start' || inset === true) {
    return 'inset-start';
  }
  if (middle) {
    return 'middle';
  }
  if (layout) {
    return layout;
  }
  if (
    variant === 'full' ||
    variant === 'inset' ||
    variant === 'inset-start' ||
    variant === 'inset-end' ||
    variant === 'middle'
  ) {
    return variant;
  }

  return 'full';
}

/**
 * Resolves the effective line style (solid, dashed, dotted).
 */
function resolveDividerLineStyle(
  variant?: DividerVariant,
  lineStyle?: DividerLineStyle,
): DividerLineStyle {
  if (lineStyle) {
    return lineStyle;
  }
  if (variant === 'dashed' || variant === 'dotted') {
    return variant;
  }

  return 'solid';
}

/**
 * Divider is a theme-aware visual separator for content sections, list items, or layout regions.
 * Supports horizontal and vertical orientations, line style variants, layout options (full, inset, middle),
 * color tokens, and optional labels.
 */
export const Divider = forwardRef<HTMLElement, DividerProps>(
  (properties, reference): JSX.Element => {
    const {
      orientation = 'horizontal',
      variant = 'solid',
      layout,
      lineStyle,
      full,
      inset,
      insetEnd,
      middle,
      color = 'default',
      thickness = 'sm',
      label,
      labelPlacement = 'center',
      decorative = false,
      className,
      classNames,
      style,
      ...otherProperties
    } = properties;

    const resolvedLayout = resolveDividerLayout(variant, layout, full, inset, insetEnd, middle);
    const resolvedVariant = resolveDividerLineStyle(variant, lineStyle);

    const hasLabel = label !== undefined && label !== null && label !== '';
    const styles = useMemo(
      () =>
        dividerRecipe({
          orientation,
          variant: resolvedVariant,
          layout: resolvedLayout,
          color,
          thickness,
          labelPlacement,
          hasLabel,
        }),
      [orientation, resolvedVariant, resolvedLayout, color, thickness, labelPlacement, hasLabel],
    );

    const ariaProps = decorative
      ? ({ role: 'none', 'aria-hidden': 'true' } as const)
      : ({ role: 'separator', 'aria-orientation': orientation } as const);

    // Without label — render semantic <hr> for horizontal, <div> for vertical
    if (!hasLabel) {
      if (orientation === 'horizontal') {
        return (
          <hr
            ref={reference as React.Ref<HTMLHRElement>}
            className={cn(styles.root(), classNames?.root, className)}
            data-orientation={orientation}
            data-slot="divider"
            style={style}
            {...ariaProps}
            {...(otherProperties as React.HTMLAttributes<HTMLHRElement>)}
          />
        );
      }

      return (
        <div
          ref={reference as React.Ref<HTMLDivElement>}
          className={cn(styles.root(), classNames?.root, className)}
          data-orientation={orientation}
          data-slot="divider"
          style={style}
          {...ariaProps}
          {...(otherProperties as React.HTMLAttributes<HTMLDivElement>)}
        />
      );
    }

    // With label — render flex container with line segments
    const showStartLine = labelPlacement === 'center' || labelPlacement === 'end';
    const showEndLine = labelPlacement === 'center' || labelPlacement === 'start';

    return (
      <div
        ref={reference as React.Ref<HTMLDivElement>}
        className={cn(styles.root(), classNames?.root, className)}
        data-orientation={orientation}
        data-slot="divider"
        style={style}
        {...ariaProps}
        {...(otherProperties as React.HTMLAttributes<HTMLDivElement>)}
      >
        {showStartLine ? (
          <span
            aria-hidden="true"
            className={cn(styles.line(), classNames?.line)}
            data-slot="divider-line"
          />
        ) : null}
        <span className={cn(styles.label(), classNames?.label)} data-slot="divider-label">
          {label}
        </span>
        {showEndLine ? (
          <span
            aria-hidden="true"
            className={cn(styles.line(), classNames?.line)}
            data-slot="divider-line"
          />
        ) : null}
      </div>
    );
  },
);

Divider.displayName = 'IdeasUI.Divider';
