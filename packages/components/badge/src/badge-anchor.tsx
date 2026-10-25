'use client';

import type { CSSProperties, JSX } from 'react';
import type { BadgeAnchorProps } from './badge.types';

import { forwardRef } from 'react';
import { badge as badgeRecipe } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';

export const BadgeAnchor = forwardRef<HTMLSpanElement, BadgeAnchorProps>(
  (
    {
      badge,
      placement = 'top-right',
      overlap = 'rectangular',
      offset,
      className,
      classNames,
      slotProps,
      style,
      children,
      ...properties
    },
    reference,
  ): JSX.Element => {
    const styles = badgeRecipe({ placement, overlap });

    const offsetStyle: CSSProperties = offset
      ? ({
          transform: `translate(${offset.x ?? 0}px, ${offset.y ?? 0}px)`,
        } as CSSProperties)
      : {};

    return (
      <span
        ref={reference}
        className={cn(styles.anchor(), classNames?.root, className, slotProps?.root?.className)}
        data-slot="badge-anchor"
        style={{ ...style, ...slotProps?.root?.style }}
        {...properties}
        {...slotProps?.root}
      >
        {children}
        <span
          className={cn(
            styles.badgeWrapper(),
            classNames?.badgeWrapper,
            slotProps?.badgeWrapper?.className,
          )}
          data-slot="badge-wrapper"
          style={{ ...offsetStyle, ...slotProps?.badgeWrapper?.style }}
          {...slotProps?.badgeWrapper}
        >
          {badge}
        </span>
      </span>
    );
  },
);

BadgeAnchor.displayName = 'IdeasUI.BadgeAnchor';
