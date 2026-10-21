'use client';

import type { AvatarImageProps } from './avatar.types';
import type { JSX } from 'react';

import { forwardRef } from 'react';
import { cn } from '@ideasui/utils';

export const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(
  (
    { src, alt = '', as: Renderer, children, className, onError, ...properties },
    reference,
  ): JSX.Element => {
    const imageClass = cn('w-full h-full object-cover', className);

    // Mode 1: inline SVG component as children
    if (children) {
      return (
        <span
          aria-hidden="true"
          className={cn(
            'absolute inset-0 flex h-full w-full items-center justify-center',
            className,
          )}
          data-slot="avatar-image"
        >
          {children}
        </span>
      );
    }

    // Mode 2: custom renderer (e.g. Next.js Image)
    if (Renderer) {
      return (
        <span className="absolute inset-0 h-full w-full" data-slot="avatar-image">
          <Renderer alt={alt} className={imageClass} src={src} onError={onError} />
        </span>
      );
    }

    // Mode 3: native <img> (default)
    return (
      <img
        ref={reference}
        alt={alt}
        className={imageClass}
        data-slot="avatar-image"
        src={src}
        onError={onError}
        {...properties}
      />
    );
  },
);

AvatarImage.displayName = 'IdeasUI.AvatarImage';
