'use client';

import type { ChipDismissProps } from './chip.types';
import type { JSX } from 'react';

import { forwardRef } from 'react';
import { chip as chipRecipe } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';

const XIcon = (): JSX.Element => (
  <svg aria-hidden="true" className="size-full" fill="none" focusable="false" viewBox="0 0 12 12">
    <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
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
