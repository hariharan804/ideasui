'use client';

import type { RadioGroupLabelProps } from './radio.types';
import type { JSX } from 'react';

import { forwardRef } from 'react';
import { radioGroup } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';

import { useRequiredRadioGroupContext } from './radio-context';

export const RadioGroupLabel = forwardRef<HTMLLegendElement, RadioGroupLabelProps>(
  (properties, reference): JSX.Element => {
    const { className, children, ...otherProperties } = properties;
    const { groupLabelId, isInvalid, isDisabled } = useRequiredRadioGroupContext();
    const groupStyles = radioGroup({ isInvalid, isDisabled });

    return (
      <legend
        {...otherProperties}
        ref={reference}
        className={cn(groupStyles.groupLabel(), className)}
        data-slot="radio-group-label"
        id={groupLabelId}
      >
        {children}
      </legend>
    );
  },
);

RadioGroupLabel.displayName = 'IdeasUI.RadioGroupLabel';
