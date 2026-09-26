'use client';

import type { RadioGroupContextValue, RadioProps, RadioVariant } from './radio.types';
import type { ChangeEvent, JSX, ReactNode } from 'react';

import { forwardRef, useCallback, useId, useRef, useState } from 'react';
import { radio as radioRecipe } from '@ideasui/theme/recipes';
import { cn, renderIcon } from '@ideasui/utils';

import { useRadioGroupContext } from './radio-context';

interface ResolvedProps {
  variant: RadioVariant;
  color: 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
  size: 'sm' | 'md' | 'lg';
  radius: RadioProps['radius'];
  isDisabled: boolean;
  isReadOnly: boolean;
  isRequired: boolean;
  isInvalid: boolean;
  isSelected: boolean;
  isToggleable: boolean;
  isGroupControlled: boolean;
  name?: string;
}

function resolveSelection(
  value: string | undefined,
  group: RadioGroupContextValue | null,
  isSelectedProp: boolean | undefined,
  internalSelected: boolean,
): { isSelected: boolean; isGroupControlled: boolean } {
  if (group !== null && value !== undefined) {
    return {
      isSelected: group.selectedValue === value,
      isGroupControlled: true,
    };
  }

  return {
    isSelected: isSelectedProp ?? internalSelected,
    isGroupControlled: false,
  };
}

function resolveProps(
  props: RadioProps,
  group: RadioGroupContextValue | null,
  internalSelected: boolean,
): ResolvedProps {
  const g = group ?? {};
  const { isSelected, isGroupControlled } = resolveSelection(
    props.value,
    group,
    props.isSelected,
    internalSelected,
  );

  const isToggleable = props.isToggleable ?? g.isToggleable ?? group === null;

  return {
    variant: props.variant ?? g.variant ?? 'outline',
    color: props.color ?? g.color ?? 'primary',
    size: props.size ?? g.size ?? 'md',
    radius: props.radius ?? g.radius ?? 'full',
    isDisabled: props.isDisabled ?? g.isDisabled ?? false,
    isReadOnly: props.isReadOnly ?? g.isReadOnly ?? false,
    isRequired: props.isRequired ?? g.isRequired ?? false,
    isInvalid: props.isInvalid ?? g.isInvalid ?? false,
    isSelected,
    isToggleable,
    isGroupControlled,
    name: props.name ?? g.name,
  };
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (properties, reference): JSX.Element => {
    const {
      variant,
      color,
      size,
      radius,
      isSelected,
      defaultSelected = false,
      isToggleable,
      isDisabled,
      isReadOnly,
      isRequired,
      isInvalid,
      value,
      name,
      onChange,
      className,
      style,
      children,
      icon,
      ...otherProperties
    } = properties;

    const group = useRadioGroupContext();
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
        isToggleable,
        isDisabled,
        isReadOnly,
        isRequired,
        isInvalid,
        value,
        name,
      },
      group,
      internalSelected,
    );

    const styles = radioRecipe({
      variant: resolved.variant,
      color: resolved.color,
      size: resolved.size,
      radius: resolved.radius,
      isDisabled: resolved.isDisabled,
      isInvalid: resolved.isInvalid,
    });

    const handleClick = (event: React.MouseEvent<HTMLInputElement>): void => {
      (otherProperties as { onClick?: (e: React.MouseEvent<HTMLInputElement>) => void }).onClick?.(
        event,
      );

      if (resolved.isDisabled || resolved.isReadOnly) {
        return;
      }

      if (resolved.isSelected && resolved.isToggleable) {
        event.preventDefault();
        if (resolved.isGroupControlled && value !== undefined) {
          group?.onGroupChange?.('');
        } else {
          if (isSelected === undefined) {
            setInternalSelected(false);
          }
          onChange?.(false);
        }
      }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
      if (resolved.isReadOnly) {
        return;
      }

      const checked = event.target.checked;

      if (resolved.isGroupControlled && value !== undefined) {
        group?.onGroupChange?.(value);
      } else {
        if (isSelected === undefined) {
          setInternalSelected(checked);
        }

        onChange?.(checked);
      }
    };

    const renderDot = (): ReactNode => {
      if (icon !== undefined) {
        return renderIcon(icon, styles.dot());
      }

      return <span className={styles.dot()} data-slot="radio-dot" />;
    };

    return (
      <label
        className={cn(styles.root(), className)}
        data-disabled={resolved.isDisabled || undefined}
        data-invalid={resolved.isInvalid || undefined}
        data-readonly={resolved.isReadOnly || undefined}
        data-selected={resolved.isSelected || undefined}
        data-slot="radio"
        style={style}
      >
        <input
          {...otherProperties}
          ref={setRefs}
          checked={resolved.isSelected}
          className="sr-only"
          data-slot="radio-input"
          disabled={resolved.isDisabled}
          id={inputId}
          name={resolved.name}
          readOnly={resolved.isReadOnly}
          required={resolved.isRequired}
          type="radio"
          value={value}
          onChange={handleChange}
          onClick={handleClick}
        />
        <span aria-hidden="true" className={cn(styles.indicator())} data-slot="radio-indicator">
          {renderDot()}
        </span>
        {children ? (
          <span className={cn(styles.labelText())} data-slot="radio-label-text">
            {children}
          </span>
        ) : null}
      </label>
    );
  },
);

Radio.displayName = 'IdeasUI.Radio';
