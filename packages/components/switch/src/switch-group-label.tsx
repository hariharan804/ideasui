'use client';

import type { SwitchGroupLabelProps } from './switch.types';
import type { JSX } from 'react';

import { forwardRef } from 'react';
import { switchGroup } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';

import { useRequiredSwitchGroupContext } from './switch-context';

export const SwitchGroupLabel = forwardRef<HTMLSpanElement, SwitchGroupLabelProps>(
  ({ className, children, ...properties }, reference): JSX.Element => {
    const { isDisabled, isRequired, groupLabelId } = useRequiredSwitchGroupContext();
    const styles = switchGroup();

    return (
      <span
        {...properties}
        ref={reference}
        className={cn(styles.groupLabel(), className)}
        data-disabled={isDisabled || undefined}
        data-slot="group-label"
        id={groupLabelId}
        slot="label"
      >
        {children}
        {isRequired ? (
          <span aria-hidden="true" className="text-danger ml-0.5">
            *
          </span>
        ) : null}
      </span>
    );
  },
);

SwitchGroupLabel.displayName = 'IdeasUI.SwitchGroupLabel';
