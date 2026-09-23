'use client';

import type { CheckboxGroupErrorProps } from './checkbox.types';
import type { JSX } from 'react';

import { forwardRef } from 'react';
import { checkboxGroup } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';

import { useRequiredCheckboxGroupContext } from './checkbox-context';

export const CheckboxGroupError = forwardRef<HTMLParagraphElement, CheckboxGroupErrorProps>(
  (properties, reference): JSX.Element | null => {
    const { className, children, ...otherProperties } = properties;
    const { isInvalid, groupErrorId } = useRequiredCheckboxGroupContext();
    const styles = checkboxGroup();

    if (!isInvalid) {
      return null;
    }

    return (
      <p
        {...otherProperties}
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

CheckboxGroupError.displayName = 'IdeasUI.CheckboxGroupError';
