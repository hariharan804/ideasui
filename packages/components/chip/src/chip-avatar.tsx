'use client';

import type { ChipAvatarProps } from './chip.types';
import type { JSX } from 'react';

import { forwardRef, useCallback, useMemo, useState } from 'react';
import { chip as chipRecipe } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export const ChipAvatar = forwardRef<HTMLSpanElement, ChipAvatarProps>(
  ({ alt, className, name, src, ...properties }, reference): JSX.Element => {
    const [imgError, setImgError] = useState(false);
    const styles = useMemo(() => chipRecipe(), []);
    const handleImageError = useCallback((): void => {
      setImgError(true);
    }, []);
    const initials = useMemo(() => (name ? getInitials(name) : ''), [name]);
    const showImage = Boolean(src && !imgError);

    return (
      <span
        ref={reference}
        aria-hidden="true"
        className={cn(styles.avatar(), className)}
        data-slot="chip-avatar"
        {...properties}
      >
        {showImage ? (
          <img
            alt={alt ?? name ?? ''}
            className={cn(styles.avatarImage())}
            src={src}
            onError={handleImageError}
          />
        ) : (
          <span>{initials}</span>
        )}
      </span>
    );
  },
);

ChipAvatar.displayName = 'IdeasUI.ChipAvatar';
