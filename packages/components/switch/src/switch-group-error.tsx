'use client';

import type { SwitchGroupErrorProps } from './switch.types';
import type { JSX } from 'react';

import { forwardRef, useMemo } from 'react';
import { switchGroup } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';

import { useRequiredSwitchGroupContext } from './switch-context';

export const SwitchGroupError = forwardRef<HTMLParagraphElement, SwitchGroupErrorProps>(
  ({ className, children, ...properties }, reference): JSX.Element | null => {
    const { isInvalid, groupErrorId } = useRequiredSwitchGroupContext();
    const styles = useMemo(() => switchGroup(), []);

    if (!isInvalid) {
      return null;
    }

    return (
      <p
        {...properties}
        ref={reference}
        aria-live="polite"
        className={cn(styles.errorMessage(), 'ideasui-switch-group__error', className)}
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
