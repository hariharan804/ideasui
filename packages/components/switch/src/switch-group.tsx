'use client';

import type { SwitchGroupProps } from './switch.types';
import type { JSX } from 'react';

import { forwardRef, useCallback, useId, useMemo, useState } from 'react';
import { switchGroup } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';

import { SwitchGroupContext } from './switch-context';

export const SwitchGroup = forwardRef<HTMLFieldSetElement, SwitchGroupProps>(
  (properties, reference): JSX.Element => {
    const {
      value,
      defaultValue = [],
      onChange,
      variant = 'solid',
      color = 'primary',
      size = 'md',
      labelPlacement = 'end',
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

    const groupStyles = switchGroup({ orientation, isInvalid, isDisabled });

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
        color,
        size,
        labelPlacement,
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
        color,
        size,
        labelPlacement,
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
      <SwitchGroupContext.Provider value={contextValue}>
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
          data-slot="switch-group"
          style={style}
        >
          {children}
        </fieldset>
      </SwitchGroupContext.Provider>
    );
  },
);

SwitchGroup.displayName = 'IdeasUI.SwitchGroup';
