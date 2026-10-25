'use client';

import type { ChipAvatarProps } from './chip.types';
import type { JSX } from 'react';

import { forwardRef, useMemo } from 'react';
import { Avatar } from '@ideasui/avatar';
import { chip as chipRecipe } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';

export const ChipAvatar = forwardRef<HTMLSpanElement, ChipAvatarProps>(
  ({ alt, className, color, name, src, ...properties }, reference): JSX.Element => {
    const styles = useMemo(() => chipRecipe(), []);

    return (
      <Avatar
        ref={reference}
        alt={alt}
        aria-hidden="true"
        className={cn(styles.avatar(), className)}
        color={color}
        data-slot="chip-avatar"
        name={name}
        role="presentation"
        size="xs"
        src={src}
        {...properties}
      />
    );
  },
);

ChipAvatar.displayName = 'IdeasUI.ChipAvatar';
