'use client';

import type { AvatarFallbackProps } from './avatar.types';
import type { JSX } from 'react';

import { forwardRef } from 'react';
import { cn } from '@ideasui/utils';

import { AvatarIcon } from './avatar-icon';

const DefaultPersonIcon = (): JSX.Element => (
  <svg
    aria-hidden="true"
    fill="currentColor"
    focusable="false"
    height="60%"
    viewBox="0 0 24 24"
    width="60%"
  >
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
  </svg>
);

export const AvatarFallback = forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  ({ initials, icon, className, children, ...properties }, reference): JSX.Element => {
    const renderContent = (): React.ReactNode => {
      if (children) {
        return children;
      }

      if (icon) {
        return <AvatarIcon>{icon}</AvatarIcon>;
      }

      if (initials) {
        return initials;
      }

      return <DefaultPersonIcon />;
    };

    return (
      <span
        ref={reference}
        aria-hidden="true"
        className={cn('absolute inset-0 flex items-center justify-center', className)}
        data-slot="avatar-fallback"
        {...properties}
      >
        {renderContent()}
      </span>
    );
  },
);

AvatarFallback.displayName = 'IdeasUI.AvatarFallback';
