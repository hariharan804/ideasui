'use client';

import type { ChipGroupProps } from './chip.types';
import type { JSX } from 'react';

import { forwardRef, useState, useCallback } from 'react';
import { chipGroup } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';

import { ChipGroupContext } from './chip-context';

export const ChipGroup = forwardRef<HTMLDivElement, ChipGroupProps>(
  (
    {
      selectionMode = 'multiple',
      value,
      defaultValue = [],
      onChange,
      variant = 'soft',
      color = 'neutral',
      size = 'md',
      isDisabled = false,
      label,
      className,
      style,
      children,
      ...properties
    },
    reference,
  ): JSX.Element => {
    const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
    const selectedValues = value ?? internalValue;

    const groupStyles = chipGroup({ isDisabled });

    const onGroupChange = useCallback(
      (itemValue: string, selected: boolean) => {
        let next: string[];

        if (selectionMode === 'single') {
          next = selected ? [itemValue] : [];
        } else {
          next = selected
            ? [...selectedValues, itemValue]
            : selectedValues.filter((v) => v !== itemValue);
        }
        if (value === undefined) {
          setInternalValue(next);
        }
        onChange?.(next);
      },
      [selectionMode, selectedValues, value, onChange],
    );

    return (
      <ChipGroupContext.Provider
        value={{
          selectionMode,
          variant,
          color,
          size,
          isDisabled,
          selectedValues,
          onGroupChange,
        }}
      >
        <div
          ref={reference}
          aria-label={label}
          className={cn(groupStyles.root(), className)}
          data-disabled={isDisabled || undefined}
          data-slot="chip-group"
          role="group"
          style={style}
          {...properties}
        >
          {children}
        </div>
      </ChipGroupContext.Provider>
    );
  },
);

ChipGroup.displayName = 'IdeasUI.ChipGroup';
