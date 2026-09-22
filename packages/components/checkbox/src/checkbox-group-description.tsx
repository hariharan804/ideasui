'use client';

import type { CheckboxGroupDescriptionProps } from './checkbox.types';
import type { JSX } from 'react';

import { forwardRef } from 'react';
import { checkboxGroup } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';

import { useRequiredCheckboxGroupContext } from './checkbox-context';

export const CheckboxGroupDescription = forwardRef<
  HTMLParagraphElement,
  CheckboxGroupDescriptionProps
>((properties, reference): JSX.Element | null => {
  const { className, children, ...otherProperties } = properties;
  const { isInvalid, groupDescriptionId } = useRequiredCheckboxGroupContext();
  const styles = checkboxGroup();

  if (isInvalid) {
    return null;
  }

  return (
    <p
      {...otherProperties}
      ref={reference}
      className={cn(styles.description(), className)}
      data-slot="group-description"
      id={groupDescriptionId}
      slot="description"
    >
      {children}
    </p>
  );
});

CheckboxGroupDescription.displayName = 'IdeasUI.CheckboxGroupDescription';
