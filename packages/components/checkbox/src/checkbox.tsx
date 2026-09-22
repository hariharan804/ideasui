'use client';

import type { CheckboxGroupContextValue, CheckboxProps } from './checkbox.types';
import type { ChangeEvent, JSX } from 'react';

import { forwardRef, useId, useRef, useEffect, useState, useCallback } from 'react';
import { checkbox as checkboxRecipe } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';

import { useCheckboxGroupContext } from './checkbox-context';

const CheckIcon = ({ className }: { className?: string }): JSX.Element => (
  <svg
    aria-hidden="true"
    className={cn('block size-full shrink-0', className)}
    fill="none"
    focusable="false"
    viewBox="0 0 12 12"
  >
    <path
      d="M2 6l3 3 5-5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

const IndeterminateIcon = ({ className }: { className?: string }): JSX.Element => (
  <svg
    aria-hidden="true"
    className={cn('block size-full shrink-0', className)}
    fill="none"
    focusable="false"
    viewBox="0 0 12 12"
  >
    <path d="M2.5 6h7" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
  </svg>
);

interface ResolvedProps {
  variant: 'solid' | 'outline' | 'subtle';
  colorScheme: 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
  size: 'sm' | 'md' | 'lg';
  radius: CheckboxProps['radius'];
  isDisabled: boolean;
  isReadOnly: boolean;
  isRequired: boolean;
  isInvalid: boolean;
  isSelected: boolean;
  isGroupControlled: boolean;
}

function resolveVariant(
  variant: CheckboxProps['variant'],
  groupVariant: CheckboxGroupContextValue['variant'],
): 'solid' | 'outline' | 'subtle' {
  return variant ?? groupVariant ?? 'solid';
}

function resolveColorScheme(
  colorScheme: CheckboxProps['colorScheme'],
  groupColorScheme: CheckboxGroupContextValue['colorScheme'],
): 'primary' | 'neutral' | 'success' | 'warning' | 'danger' {
  return colorScheme ?? groupColorScheme ?? 'primary';
}

function resolveSize(
  size: CheckboxProps['size'],
  groupSize: CheckboxGroupContextValue['size'],
): 'sm' | 'md' | 'lg' {
  return size ?? groupSize ?? 'md';
}

function resolveProps(
  props: CheckboxProps,
  group: CheckboxGroupContextValue | null,
  internalSelected: boolean,
): ResolvedProps {
  const isGroupControlled = group !== null && props.value !== undefined;
  const isSelectedInGroup =
    props.value !== undefined && (group?.selectedValues?.includes(props.value) ?? false);

  return {
    variant: resolveVariant(props.variant, group?.variant),
    colorScheme: resolveColorScheme(props.colorScheme, group?.colorScheme),
    size: resolveSize(props.size, group?.size),
    radius: props.radius ?? group?.radius,
    isDisabled: props.isDisabled ?? group?.isDisabled ?? false,
    isReadOnly: props.isReadOnly ?? group?.isReadOnly ?? false,
    isRequired: props.isRequired ?? group?.isRequired ?? false,
    isInvalid: props.isInvalid ?? group?.isInvalid ?? false,
    isSelected: isGroupControlled ? isSelectedInGroup : (props.isSelected ?? internalSelected),
    isGroupControlled,
  };
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (properties, reference): JSX.Element => {
    const {
      variant,
      colorScheme,
      size,
      radius,
      isSelected,
      defaultSelected = false,
      isIndeterminate = false,
      isDisabled,
      isReadOnly,
      isRequired,
      isInvalid,
      value,
      onChange,
      className,
      style,
      children,
      ...otherProperties
    } = properties;

    const group = useCheckboxGroupContext();
    const internalInputRef = useRef<HTMLInputElement | null>(null);
    const inputId = useId();

    const [internalSelected, setInternalSelected] = useState<boolean>(defaultSelected);

    const setRefs = useCallback(
      (node: HTMLInputElement | null) => {
        internalInputRef.current = node;

        if (typeof reference === 'function') {
          reference(node);
        } else if (reference) {
          (reference as { current: HTMLInputElement | null }).current = node;
        }
      },
      [reference],
    );

    const resolved = resolveProps(
      {
        variant,
        colorScheme,
        size,
        radius,
        isSelected,
        defaultSelected,
        isDisabled,
        isReadOnly,
        isRequired,
        isInvalid,
        value,
      },
      group,
      internalSelected,
    );

    useEffect(() => {
      if (internalInputRef.current) {
        internalInputRef.current.indeterminate = isIndeterminate;
      }
    }, [isIndeterminate]);

    const styles = checkboxRecipe({
      variant: resolved.variant,
      colorScheme: resolved.colorScheme,
      size: resolved.size,
      radius: resolved.radius,
      isDisabled: resolved.isDisabled,
      isInvalid: resolved.isInvalid,
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
      if (resolved.isReadOnly) {
        return;
      }

      const checked = event.target.checked;

      if (resolved.isGroupControlled && value !== undefined) {
        group?.onGroupChange?.(value, checked);
      } else {
        if (isSelected === undefined) {
          setInternalSelected(checked);
        }

        onChange?.(checked);
      }
    };

    return (
      <label
        className={cn(styles.root(), className)}
        data-disabled={resolved.isDisabled || undefined}
        data-indeterminate={isIndeterminate || undefined}
        data-invalid={resolved.isInvalid || undefined}
        data-readonly={resolved.isReadOnly || undefined}
        data-selected={resolved.isSelected || undefined}
        data-slot="checkbox"
        style={style}
      >
        <input
          {...otherProperties}
          ref={setRefs}
          aria-checked={isIndeterminate ? 'mixed' : resolved.isSelected}
          aria-invalid={resolved.isInvalid || undefined}
          aria-required={resolved.isRequired || undefined}
          checked={resolved.isSelected}
          className="sr-only"
          data-slot="checkbox-input"
          disabled={resolved.isDisabled}
          id={inputId}
          readOnly={resolved.isReadOnly}
          required={resolved.isRequired}
          type="checkbox"
          value={value}
          onChange={handleChange}
        />
        <span aria-hidden="true" className={cn(styles.indicator())} data-slot="checkbox-indicator">
          {isIndeterminate ? (
            <IndeterminateIcon className={styles.icon()} />
          ) : (
            <CheckIcon className={styles.icon()} />
          )}
        </span>
        {children ? (
          <span className={cn(styles.labelText())} data-slot="checkbox-label-text">
            {children}
          </span>
        ) : null}
      </label>
    );
  },
);

Checkbox.displayName = 'IdeasUI.Checkbox';
