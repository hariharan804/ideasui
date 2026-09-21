'use client';

import type { InputFieldDescriptionProps } from './input-field.types';
import type { JSX } from 'react';

import { forwardRef, useEffect } from 'react';
import { cn } from '@ideasui/utils';

import { useInputFieldContext } from './input-field-context';

export const InputFieldDescription = forwardRef<HTMLParagraphElement, InputFieldDescriptionProps>(
  ({ id, className, children, ...properties }, reference): JSX.Element | null => {
    const { descriptionId, isInvalid, classNames, registerDescription, styles } =
      useInputFieldContext();

    useEffect(() => {
      if (registerDescription) {
        return registerDescription();
      }
    }, [registerDescription]);

    if (isInvalid) {
      return null;
    }

    const finalId = id ?? descriptionId;

    return (
      <p
        {...properties}
        ref={reference}
        className={cn(styles?.description(), classNames?.description, className)}
        data-slot="description"
        id={finalId}
      >
        {children}
      </p>
    );
  },
);

InputFieldDescription.displayName = 'IdeasUI.InputFieldDescription';
