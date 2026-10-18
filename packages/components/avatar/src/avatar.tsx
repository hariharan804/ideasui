'use client';

import type {
  AvatarComponent,
  AvatarProps,
  AvatarSlotClassNames,
  AvatarSlotProps,
} from './avatar.types';
import type { JSX, ReactNode } from 'react';

import { forwardRef, useState } from 'react';
import { avatar as avatarRecipe } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';

import { useAvatarGroupContext } from './avatar-context';
import { AvatarImage } from './avatar-image';
import { AvatarFallback } from './avatar-fallback';
import { AvatarGroup } from './avatar-group';
import { AvatarIcon } from './avatar-icon';

function getInitials(name: string): string {
  const trimmed = name.trim();

  if (!trimmed) {
    return '';
  }

  return trimmed
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

interface ResolvedAvatarGroupValues {
  variant: NonNullable<AvatarProps['variant']>;
  color: NonNullable<AvatarProps['color']>;
  size: NonNullable<AvatarProps['size']>;
  isBordered: boolean;
}

function resolveAvatarGroupValues(
  props: Pick<AvatarProps, 'variant' | 'color' | 'size' | 'isBordered'>,
  group: ReturnType<typeof useAvatarGroupContext>,
): ResolvedAvatarGroupValues {
  return {
    variant: props.variant ?? group?.variant ?? 'soft',
    color: props.color ?? group?.color ?? 'neutral',
    size: props.size ?? group?.size ?? 'md',
    isBordered: props.isBordered ?? group?.isBordered ?? false,
  };
}

interface RenderFallbackOptions {
  fallback?: ReactNode;
  icon?: ReactNode;
  initials?: string;
  name?: string;
  styles: ReturnType<typeof avatarRecipe>;
  classNames?: AvatarSlotClassNames;
  slotProps?: AvatarSlotProps;
}

function renderAvatarFallback(options: RenderFallbackOptions): ReactNode {
  const { fallback, icon, initials, name, styles, classNames, slotProps } = options;
  const fallbackClassName = cn(
    styles.fallback(),
    classNames?.fallback,
    slotProps?.fallback?.className,
  );

  if (fallback) {
    return (
      <AvatarFallback {...slotProps?.fallback} className={fallbackClassName}>
        {fallback}
      </AvatarFallback>
    );
  }

  if (icon) {
    return (
      <AvatarFallback {...slotProps?.fallback} className={fallbackClassName}>
        <AvatarIcon
          {...slotProps?.icon}
          className={cn(styles.icon(), classNames?.icon, slotProps?.icon?.className)}
        >
          {icon}
        </AvatarIcon>
      </AvatarFallback>
    );
  }

  const resolvedInitials = initials ?? (name ? getInitials(name) : undefined);

  return (
    <AvatarFallback
      {...slotProps?.fallback}
      className={fallbackClassName}
      initials={resolvedInitials}
    />
  );
}

const AvatarBase = forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      src,
      name,
      initials,
      icon,
      fallback,
      as,
      alt,
      variant,
      color,
      size,
      shape = 'circle',
      isBordered,
      isDisabled = false,
      className,
      classNames,
      slotProps,
      style,
      children,
      ...properties
    },
    reference,
  ): JSX.Element => {
    const group = useAvatarGroupContext();
    const resolved = resolveAvatarGroupValues({ variant, color, size, isBordered }, group);

    const [prevSrc, setPrevSrc] = useState(src);
    const [imgError, setImgError] = useState(false);

    if (src !== prevSrc) {
      setPrevSrc(src);
      setImgError(false);
    }

    const showImage = src && !imgError;

    const styles = avatarRecipe({
      variant: resolved.variant,
      color: resolved.color,
      size: resolved.size,
      shape,
      isBordered: resolved.isBordered,
      isDisabled,
    });

    return (
      <span
        ref={reference}
        aria-label={name}
        {...slotProps?.root}
        {...properties}
        className={cn(styles.root(), classNames?.root, className, slotProps?.root?.className)}
        data-disabled={isDisabled || undefined}
        data-slot="avatar"
        role="img"
        style={style}
      >
        {children ?? (
          <>
            {showImage ? (
              <AvatarImage
                alt={alt ?? name ?? ''}
                as={as}
                {...slotProps?.image}
                className={cn(styles.image(), classNames?.image, slotProps?.image?.className)}
                src={src}
                onError={() => setImgError(true)}
              />
            ) : null}
            {!showImage &&
              renderAvatarFallback({
                fallback,
                icon,
                initials,
                name,
                styles,
                classNames,
                slotProps,
              })}
          </>
        )}
      </span>
    );
  },
);

AvatarBase.displayName = 'IdeasUI.Avatar';

export const Avatar = AvatarBase as AvatarComponent;

Avatar.Group = AvatarGroup;
Avatar.Image = AvatarImage;
Avatar.Fallback = AvatarFallback;
Avatar.Icon = AvatarIcon;
