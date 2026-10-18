'use client';

import type { AvatarGroupProps } from './avatar.types';
import type { CSSProperties, JSX } from 'react';

import { Children, forwardRef, isValidElement } from 'react';
import { avatarGroup as avatarGroupRecipe } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';

import { AvatarGroupContext } from './avatar-context';

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    {
      max,
      spacing = '-0.5rem',
      size = 'md',
      variant = 'soft',
      color = 'neutral',
      isBordered = false,
      label,
      className,
      classNames,
      slotProps,
      style,
      children,
      ...properties
    },
    reference,
  ): JSX.Element => {
    const childArray = Children.toArray(children).filter(isValidElement);
    const visibleChildren = max === undefined ? childArray : childArray.slice(0, max);
    const overflowCount = max === undefined ? 0 : Math.max(0, childArray.length - max);

    const groupStyles = avatarGroupRecipe({ size });

    return (
      <AvatarGroupContext.Provider value={{ size, variant, color, isBordered }}>
        <div
          ref={reference}
          aria-label={label}
          {...slotProps?.root}
          {...properties}
          className={cn(
            groupStyles.root(),
            classNames?.root,
            className,
            slotProps?.root?.className,
          )}
          data-slot="avatar-group"
          role="group"
          style={style}
        >
          {visibleChildren.map((child, index) => (
            <span
              key={child.key}
              style={{ marginInlineStart: index === 0 ? undefined : spacing } as CSSProperties}
            >
              {child}
            </span>
          ))}
          {overflowCount > 0 && (
            <span
              aria-label={`${overflowCount} more`}
              {...slotProps?.overflow}
              className={cn(
                groupStyles.overflow(),
                classNames?.overflow,
                slotProps?.overflow?.className,
              )}
              data-slot="avatar-overflow"
              style={{ marginInlineStart: spacing } as CSSProperties}
            >
              +{overflowCount}
            </span>
          )}
        </div>
      </AvatarGroupContext.Provider>
    );
  },
);

AvatarGroup.displayName = 'IdeasUI.AvatarGroup';
