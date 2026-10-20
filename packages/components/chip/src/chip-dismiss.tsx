'use client';

import type { ChipDismissProps } from './chip.types';
import type { JSX } from 'react';

import { forwardRef } from 'react';
import { chip as chipRecipe } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';

const XIcon = (): JSX.Element => (
  <svg
    aria-hidden="true"
    className="size-2.5 shrink-0"
    fill="none"
    focusable="false"
    viewBox="0 0 12 12"
  >
    <path
      d="M2.5 2.5l7 7M9.5 2.5l-7 7"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.25"
    />
  </svg>
);

export const ChipDismiss = forwardRef<HTMLButtonElement, ChipDismissProps>(
  ({ className, label = 'Remove', ...properties }, reference): JSX.Element => {
    const styles = chipRecipe();

    return (
      <button
        ref={reference}
        aria-label={label}
        className={cn(styles.dismiss(), className)}
        data-slot="chip-dismiss"
        type="button"
        {...properties}
      >
        <XIcon />
      </button>
    );
  },
);

ChipDismiss.displayName = 'IdeasUI.ChipDismiss';
