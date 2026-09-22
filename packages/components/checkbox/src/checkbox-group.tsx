'use client';

import type { CheckboxGroupProps } from './checkbox.types';
import type { JSX } from 'react';

import { forwardRef, useId, useState, useCallback, useMemo } from 'react';
import { checkboxGroup } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';

import { CheckboxGroupContext } from './checkbox-context';

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (properties, reference): JSX.Element => {
    const {
      value,
      defaultValue = [],
      onChange,
      variant = 'solid',
      colorScheme = 'primary',
      size = 'md',
      radius,
      orientation = 'vertical',
      isDisabled = false,
      isReadOnly = false,
      isRequired = false,
      isInvalid = false,
      className,
      style,
      children,
      ...otherProperties
    } = properties;

    const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
    const selectedValues = value ?? internalValue;

    const groupLabelId = useId();
    const groupDescriptionId = useId();
    const groupErrorId = useId();

    const groupStyles = checkboxGroup({ orientation, isInvalid, isDisabled });

    const onGroupChange = useCallback(
      (itemValue: string, checked: boolean) => {
        if (isReadOnly) {
          return;
        }

        const next = checked
          ? [...selectedValues, itemValue]
          : selectedValues.filter((v) => v !== itemValue);

        if (!value) {
          setInternalValue(next);
        }

        onChange?.(next);
      },
      [isReadOnly, selectedValues, value, onChange],
    );

    const contextValue = useMemo(
      () => ({
        variant,
        colorScheme,
        size,
        radius,
        isDisabled,
        isReadOnly,
        isRequired,
        isInvalid,
        groupLabelId,
        groupDescriptionId,
        groupErrorId,
        selectedValues,
        onGroupChange,
      }),
      [
        variant,
        colorScheme,
        size,
        radius,
        isDisabled,
        isReadOnly,
        isRequired,
        isInvalid,
        groupLabelId,
        groupDescriptionId,
        groupErrorId,
        selectedValues,
        onGroupChange,
      ],
    );

    return (
      <CheckboxGroupContext.Provider value={contextValue}>
        <div
          {...otherProperties}
          ref={reference}
          aria-describedby={isInvalid ? groupErrorId : groupDescriptionId}
          aria-labelledby={groupLabelId}
          className={cn(groupStyles.root(), className)}
          data-disabled={isDisabled || undefined}
          data-invalid={isInvalid || undefined}
          data-readonly={isReadOnly || undefined}
          data-required={isRequired || undefined}
          data-slot="checkbox-group"
          role="group"
          style={style}
        >
          {children}
        </div>
      </CheckboxGroupContext.Provider>
    );
  },
);

CheckboxGroup.displayName = 'IdeasUI.CheckboxGroup';
