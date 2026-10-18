'use client';

import type { AvatarIconProps } from './avatar.types';
import type { JSX } from 'react';

import { forwardRef } from 'react';
import { cn } from '@ideasui/utils';

export const AvatarIcon = forwardRef<HTMLSpanElement, AvatarIconProps>(
  ({ className, children, ...properties }, reference): JSX.Element => (
    <span
      ref={reference}
      aria-hidden="true"
      className={cn('flex items-center justify-center', className)}
      data-slot="avatar-icon"
      {...properties}
    >
      {children}
    </span>
  ),
);

AvatarIcon.displayName = 'IdeasUI.AvatarIcon';
