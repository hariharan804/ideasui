'use client';

import type { CheckboxGroupLabelProps } from './checkbox.types';
import type { JSX } from 'react';

import { forwardRef } from 'react';
import { checkboxGroup } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';

import { useRequiredCheckboxGroupContext } from './checkbox-context';

export const CheckboxGroupLabel = forwardRef<HTMLSpanElement, CheckboxGroupLabelProps>(
  (properties, reference): JSX.Element => {
    const { className, children, ...otherProperties } = properties;
    const { isDisabled, isRequired, groupLabelId } = useRequiredCheckboxGroupContext();
    const styles = checkboxGroup();

    return (
      <span
        {...otherProperties}
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

CheckboxGroupLabel.displayName = 'IdeasUI.CheckboxGroupLabel';
