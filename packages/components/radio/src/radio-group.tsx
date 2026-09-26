'use client';

import type { RadioGroupProps } from './radio.types';
import type { JSX } from 'react';

import { forwardRef, useId, useState, useCallback, useMemo } from 'react';
import { radioGroup } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';

import { RadioGroupContext } from './radio-context';

export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  (properties, reference): JSX.Element => {
    const {
      name: propName,
      value,
      defaultValue,
      onChange,
      variant = 'outline',
      color = 'primary',
      size = 'md',
      radius = 'full',
      orientation = 'vertical',
      isDisabled = false,
      isReadOnly = false,
      isRequired = false,
      isInvalid = false,
      isToggleable = false,
      className,
      style,
      children,
      ...otherProperties
    } = properties;

    const autoName = useId();
    const groupName = propName ?? `radio-group-${autoName}`;

    const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue);
    const selectedValue = value ?? internalValue;

    const groupLabelId = useId();
    const groupDescriptionId = useId();
    const groupErrorId = useId();

    const groupStyles = radioGroup({ orientation, isInvalid, isDisabled });

    const onGroupChange = useCallback(
      (itemValue: string) => {
        if (isReadOnly) {
          return;
        }

        if (value === undefined) {
          setInternalValue(itemValue);
        }

        onChange?.(itemValue);
      },
      [isReadOnly, value, onChange],
    );

    const contextValue = useMemo(
      () => ({
        name: groupName,
        variant,
        color,
        size,
        radius,
        isDisabled,
        isReadOnly,
        isRequired,
        isInvalid,
        isToggleable,
        groupLabelId,
        groupDescriptionId,
        groupErrorId,
        selectedValue,
        onGroupChange,
      }),
      [
        groupName,
        variant,
        color,
        size,
        radius,
        isDisabled,
        isReadOnly,
        isRequired,
        isInvalid,
        isToggleable,
        groupLabelId,
        groupDescriptionId,
        groupErrorId,
        selectedValue,
        onGroupChange,
      ],
    );

    return (
      <RadioGroupContext.Provider value={contextValue}>
        <fieldset
          {...otherProperties}
          ref={reference}
          aria-describedby={isInvalid ? groupErrorId : groupDescriptionId}
          aria-labelledby={groupLabelId}
          className={cn(groupStyles.root(), className)}
          data-disabled={isDisabled || undefined}
          data-invalid={isInvalid || undefined}
          data-readonly={isReadOnly || undefined}
          data-required={isRequired || undefined}
          data-slot="radio-group"
          style={style}
        >
          {children}
        </fieldset>
      </RadioGroupContext.Provider>
    );
  },
);

RadioGroup.displayName = 'IdeasUI.RadioGroup';
