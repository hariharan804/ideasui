'use client';

import type { RadioGroupErrorProps } from './radio.types';
import type { JSX } from 'react';

import { forwardRef } from 'react';
import { radioGroup } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';

import { useRequiredRadioGroupContext } from './radio-context';

export const RadioGroupError = forwardRef<HTMLParagraphElement, RadioGroupErrorProps>(
  (properties, reference): JSX.Element | null => {
    const { className, children, ...otherProperties } = properties;
    const { groupErrorId, isInvalid, isDisabled } = useRequiredRadioGroupContext();
    const groupStyles = radioGroup({ isInvalid, isDisabled });

    if (!isInvalid) {
      return null;
    }

    return (
      <p
        {...otherProperties}
        ref={reference}
        className={cn(groupStyles.errorMessage(), className)}
        data-slot="radio-group-error"
        id={groupErrorId}
      >
        {children}
      </p>
    );
  },
);

RadioGroupError.displayName = 'IdeasUI.RadioGroupError';
