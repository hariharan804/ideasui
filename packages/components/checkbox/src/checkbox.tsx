'use client';

import type { CheckboxGroupContextValue, CheckboxProps, CheckboxVariant } from './checkbox.types';
import type { ChangeEvent, JSX, ReactNode } from 'react';

import { forwardRef, useCallback, useEffect, useId, useRef, useState } from 'react';
import { checkbox as checkboxRecipe } from '@ideasui/theme/recipes';
import { cn, renderIcon } from '@ideasui/utils';

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
  variant: CheckboxVariant;
  color: 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
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
): CheckboxVariant {
  return variant ?? groupVariant ?? 'solid';
}

function resolveColor(
  color: CheckboxProps['color'],
  groupColor: CheckboxGroupContextValue['color'],
): 'primary' | 'neutral' | 'success' | 'warning' | 'danger' {
  return color ?? groupColor ?? 'primary';
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
    color: resolveColor(props.color, group?.color),
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
      color,
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
      checkedIcon,
      uncheckedIcon,
      indeterminateIcon,
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
        color,
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
      color: resolved.color,
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

    const renderIndicatorIcon = (): ReactNode => {
      if (isIndeterminate) {
        if (indeterminateIcon !== undefined) {
          return renderIcon(indeterminateIcon, styles.icon());
        }

        return <IndeterminateIcon className={styles.icon()} />;
      }

      if (resolved.isSelected) {
        if (checkedIcon !== undefined) {
          return renderIcon(checkedIcon, styles.icon());
        }

        return <CheckIcon className={styles.icon()} />;
      }

      if (uncheckedIcon !== undefined) {
        return renderIcon(
          uncheckedIcon,
          cn(styles.icon(), 'opacity-100 scale-100 group-data-[selected=true]/checkbox:opacity-0'),
        );
      }

      return <CheckIcon className={styles.icon()} />;
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
          {renderIndicatorIcon()}
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
