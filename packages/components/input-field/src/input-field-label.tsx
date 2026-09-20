'use client';

import type { InputFieldLabelProps } from './input-field.types';
import type { JSX } from 'react';

import { forwardRef } from 'react';
import { cn } from '@ideasui/utils';

import { useInputFieldContext } from './input-field-context';

export const InputFieldLabel = forwardRef<HTMLLabelElement, InputFieldLabelProps>(
  ({ htmlFor, className, children, ...properties }, reference): JSX.Element => {
    const { inputId: contextInputId, isDisabled, isRequired, styles } = useInputFieldContext();

    const finalHtmlFor = htmlFor ?? contextInputId;

    return (
      <label
        {...properties}
        ref={reference}
        className={cn(styles?.label(), className)}
        data-disabled={isDisabled || undefined}
        data-slot="label"
        htmlFor={finalHtmlFor}
      >
        {children}
        {Boolean(isRequired) && (
          <span aria-hidden="true" className="text-danger ml-0.5">
            *
          </span>
        )}
      </label>
    );
  },
);

InputFieldLabel.displayName = 'IdeasUI.InputFieldLabel';
