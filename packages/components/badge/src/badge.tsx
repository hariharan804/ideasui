'use client';

import type { JSX, ReactNode } from 'react';
import type { BadgeComponent, BadgeProps } from './badge.types';

import { forwardRef } from 'react';
import { badge as badgeRecipe } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';

import { BadgeAnchor } from './badge-anchor';

function parseNumeric(value: ReactNode): number {
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'string' && value.trim() !== '') {
    return Number(value);
  }

  return Number.NaN;
}

function resolveContent(children: ReactNode, max: number | undefined, isDot: boolean): ReactNode {
  if (isDot) {
    return null;
  }
  if (max !== undefined) {
    const numeric = parseNumeric(children);

    if (!Number.isNaN(numeric) && Number.isFinite(numeric) && numeric > max) {
      return `${max}+`;
    }
  }

  return children;
}

const BadgeBase = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'solid',
      color = 'primary',
      size = 'md',
      isDot = false,
      max,
      isInvisible = false,
      className,
      classNames,
      slotProps,
      style,
      children,
      ...properties
    },
    reference,
  ): JSX.Element => {
    const styles = badgeRecipe({ variant, color, size, isDot, isInvisible });
    const content = resolveContent(children, max, isDot);

    return (
      <span
        ref={reference}
        aria-hidden={isDot || isInvisible ? 'true' : undefined}
        className={cn(styles.root(), classNames?.root, className, slotProps?.root?.className)}
        data-dot={isDot || undefined}
        data-invisible={isInvisible || undefined}
        data-slot="badge"
        style={{ ...style, ...slotProps?.root?.style }}
        {...properties}
        {...slotProps?.root}
      >
        {content}
      </span>
    );
  },
);

BadgeBase.displayName = 'IdeasUI.Badge';

export const Badge = BadgeBase as BadgeComponent;
Badge.Anchor = BadgeAnchor;
