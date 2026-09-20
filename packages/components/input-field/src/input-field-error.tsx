'use client';

import type { InputFieldErrorProps } from './input-field.types';
import type { JSX } from 'react';

import { forwardRef, useEffect } from 'react';
import { cn } from '@ideasui/utils';

import { useInputFieldContext } from './input-field-context';

export const InputFieldError = forwardRef<HTMLParagraphElement, InputFieldErrorProps>(
  ({ className, children, ...properties }, reference): JSX.Element | null => {
    const { errorId, isInvalid, registerErrorMessage, styles } = useInputFieldContext();

    useEffect(() => {
      if (registerErrorMessage && isInvalid) {
        return registerErrorMessage();
      }
    }, [registerErrorMessage, isInvalid]);

    if (!isInvalid) {
      return null;
    }

    return (
      <p
        {...properties}
        ref={reference}
        className={cn(styles?.errorMessage(), className)}
        data-slot="error-message"
        id={errorId}
        role="alert"
      >
        {children}
      </p>
    );
  },
);

InputFieldError.displayName = 'IdeasUI.InputFieldError';
