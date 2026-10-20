'use client';

import type { ChipIconProps } from './chip.types';
import type { JSX } from 'react';

import { forwardRef } from 'react';
import { chip as chipRecipe } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';

export const ChipIcon = forwardRef<HTMLSpanElement, ChipIconProps>(
  ({ className, children, ...properties }, reference): JSX.Element => {
    const styles = chipRecipe();

    return (
      <span
        ref={reference}
        aria-hidden="true"
        className={cn(styles.icon(), className)}
        data-slot="chip-icon"
        {...properties}
      >
        {children}
      </span>
    );
  },
);

ChipIcon.displayName = 'IdeasUI.ChipIcon';
