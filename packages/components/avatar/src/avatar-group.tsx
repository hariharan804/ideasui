'use client';

import type { AvatarGroupProps } from './avatar.types';
import type { CSSProperties, JSX } from 'react';

import { Children, forwardRef, isValidElement, useMemo } from 'react';
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
      role = 'group',
      children,
      ...properties
    },
    reference,
  ): JSX.Element => {
    const { visibleChildren, overflowCount } = useMemo(() => {
      const childArray = Children.toArray(children).filter(isValidElement);

      return {
        visibleChildren: max === undefined ? childArray : childArray.slice(0, max),
        overflowCount: max === undefined ? 0 : Math.max(0, childArray.length - max),
      };
    }, [children, max]);

    const groupStyles = useMemo(() => avatarGroupRecipe({ size }), [size]);

    const contextValue = useMemo(
      () => ({ size, variant, color, isBordered }),
      [size, variant, color, isBordered],
    );

    return (
      <AvatarGroupContext.Provider value={contextValue}>
        <div
          ref={reference}
          aria-label={label}
          role={role}
          {...slotProps?.root}
          {...properties}
          className={cn(
            groupStyles.root(),
            classNames?.root,
            className,
            slotProps?.root?.className,
          )}
          data-slot="avatar-group"
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
