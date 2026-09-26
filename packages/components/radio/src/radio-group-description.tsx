'use client';

import type { RadioGroupDescriptionProps } from './radio.types';
import type { JSX } from 'react';

import { forwardRef } from 'react';
import { radioGroup } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';

import { useRequiredRadioGroupContext } from './radio-context';

export const RadioGroupDescription = forwardRef<HTMLParagraphElement, RadioGroupDescriptionProps>(
  (properties, reference): JSX.Element | null => {
    const { className, children, ...otherProperties } = properties;
    const { groupDescriptionId, isInvalid, isDisabled } = useRequiredRadioGroupContext();
    const groupStyles = radioGroup({ isInvalid, isDisabled });

    if (isInvalid) {
      return null;
    }

    return (
      <p
        {...otherProperties}
        ref={reference}
        className={cn(groupStyles.description(), className)}
        data-slot="radio-group-description"
        id={groupDescriptionId}
      >
        {children}
      </p>
    );
  },
);

RadioGroupDescription.displayName = 'IdeasUI.RadioGroupDescription';
