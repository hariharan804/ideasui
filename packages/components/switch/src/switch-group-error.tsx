'use client';

import type { SwitchGroupErrorProps } from './switch.types';
import type { JSX } from 'react';

import { forwardRef } from 'react';
import { switchGroup } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';

import { useRequiredSwitchGroupContext } from './switch-context';

export const SwitchGroupError = forwardRef<HTMLParagraphElement, SwitchGroupErrorProps>(
  ({ className, children, ...properties }, reference): JSX.Element | null => {
    const { isInvalid, groupErrorId } = useRequiredSwitchGroupContext();
    const styles = switchGroup();

    if (!isInvalid) {
      return null;
    }

    return (
      <p
        {...properties}
        ref={reference}
        aria-live="polite"
        className={cn(styles.errorMessage(), className)}
        data-slot="group-error"
        id={groupErrorId}
        role="alert"
        slot="errorMessage"
      >
        {children}
      </p>
    );
  },
);

SwitchGroupError.displayName = 'IdeasUI.SwitchGroupError';
