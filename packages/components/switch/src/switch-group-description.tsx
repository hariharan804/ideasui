'use client';

import type { SwitchGroupDescriptionProps } from './switch.types';
import type { JSX } from 'react';

import { forwardRef } from 'react';
import { switchGroup } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';

import { useRequiredSwitchGroupContext } from './switch-context';

export const SwitchGroupDescription = forwardRef<HTMLParagraphElement, SwitchGroupDescriptionProps>(
  ({ className, children, ...properties }, reference): JSX.Element | null => {
    const { isInvalid, groupDescriptionId } = useRequiredSwitchGroupContext();
    const styles = switchGroup();

    if (isInvalid) {
      return null;
    }

    return (
      <p
        {...properties}
        ref={reference}
        className={cn(styles.description(), className)}
        data-slot="group-description"
        id={groupDescriptionId}
        slot="description"
      >
        {children}
      </p>
    );
  },
);

SwitchGroupDescription.displayName = 'IdeasUI.SwitchGroupDescription';
