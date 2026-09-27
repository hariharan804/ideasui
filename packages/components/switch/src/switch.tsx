'use client';

import type { SwitchGroupContextValue, SwitchProps, SwitchVariant } from './switch.types';
import type { ChangeEvent, JSX, ReactNode } from 'react';

import { forwardRef, useCallback, useId, useRef, useState } from 'react';
import { switchRecipe } from '@ideasui/theme/recipes';
import { cn, renderIcon } from '@ideasui/utils';

import { useSwitchGroupContext } from './switch-context';

interface ResolvedProps {
  variant: SwitchVariant;
  color: 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
  size: 'sm' | 'md' | 'lg';
  labelPlacement: 'start' | 'end';
  isDisabled: boolean;
  isReadOnly: boolean;
  isRequired: boolean;
  isInvalid: boolean;
  isSelected: boolean;
  isGroupControlled: boolean;
}

function resolveVariant(
  variant: SwitchProps['variant'],
  groupVariant: SwitchGroupContextValue['variant'],
): SwitchVariant {
  return variant ?? groupVariant ?? 'solid';
}

function resolveColor(
  color: SwitchProps['color'],
  groupColor: SwitchGroupContextValue['color'],
): 'primary' | 'neutral' | 'success' | 'warning' | 'danger' {
  return color ?? groupColor ?? 'primary';
}

function resolveSize(
  size: SwitchProps['size'],
  groupSize: SwitchGroupContextValue['size'],
): 'sm' | 'md' | 'lg' {
  return size ?? groupSize ?? 'md';
}

function resolveLabelPlacement(
  placement: SwitchProps['labelPlacement'],
  groupPlacement: SwitchGroupContextValue['labelPlacement'],
): 'start' | 'end' {
  return placement ?? groupPlacement ?? 'end';
}

function resolveProps(
  props: SwitchProps,
  group: SwitchGroupContextValue | null,
  internalSelected: boolean,
): ResolvedProps {
  const isGroupControlled = group !== null && props.value !== undefined;
  const isSelectedInGroup =
    props.value !== undefined && (group?.selectedValues?.includes(props.value) ?? false);

  return {
    variant: resolveVariant(props.variant, group?.variant),
    color: resolveColor(props.color, group?.color),
    size: resolveSize(props.size, group?.size),
    labelPlacement: resolveLabelPlacement(props.labelPlacement, group?.labelPlacement),
    isDisabled: props.isDisabled ?? group?.isDisabled ?? false,
    isReadOnly: props.isReadOnly ?? group?.isReadOnly ?? false,
    isRequired: props.isRequired ?? group?.isRequired ?? false,
    isInvalid: props.isInvalid ?? group?.isInvalid ?? false,
    isSelected: isGroupControlled ? isSelectedInGroup : (props.isSelected ?? internalSelected),
    isGroupControlled,
  };
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (properties, reference): JSX.Element => {
    const {
      variant,
      thumbVariant,
      thumbShape,
      thumbSize,
      color,
      size,
      labelPlacement,
      onLabel,
      offLabel,
      thumbIcon,
      checkedThumbIcon,
      uncheckedThumbIcon,
      isSelected,
      defaultSelected = false,
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

    const group = useSwitchGroupContext();
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
        labelPlacement,
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

    const styles = switchRecipe({
      variant: resolved.variant,
      thumbVariant,
      thumbShape,
      thumbSize,
      color: resolved.color,
      size: resolved.size,
      labelPlacement: resolved.labelPlacement,
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

    const renderThumbIcon = (): ReactNode => {
      if (resolved.isSelected && checkedThumbIcon !== undefined) {
        return renderIcon(checkedThumbIcon, styles.thumbIcon());
      }

      if (!resolved.isSelected && uncheckedThumbIcon !== undefined) {
        return renderIcon(uncheckedThumbIcon, styles.thumbIcon());
      }

      if (thumbIcon !== undefined) {
        if (typeof thumbIcon === 'function') {
          return thumbIcon({ isSelected: resolved.isSelected, className: styles.thumbIcon() });
        }

        return renderIcon(thumbIcon, styles.thumbIcon());
      }

      return null;
    };

    return (
      <label
        className={cn(styles.root(), className)}
        data-disabled={resolved.isDisabled || undefined}
        data-invalid={resolved.isInvalid || undefined}
        data-readonly={resolved.isReadOnly || undefined}
        data-selected={resolved.isSelected || undefined}
        data-slot="switch"
        style={style}
      >
        <input
          {...otherProperties}
          ref={setRefs}
          aria-checked={resolved.isSelected}
          aria-invalid={resolved.isInvalid || undefined}
          aria-required={resolved.isRequired || undefined}
          checked={resolved.isSelected}
          className="sr-only"
          data-slot="switch-input"
          disabled={resolved.isDisabled}
          id={inputId}
          readOnly={resolved.isReadOnly}
          required={resolved.isRequired}
          role="switch"
          type="checkbox"
          value={value}
          onChange={handleChange}
        />

        <span aria-hidden="true" className={cn(styles.track())} data-slot="switch-track">
          {onLabel && resolved.isSelected ? (
            <span className={cn(styles.onLabel())} data-slot="switch-on-label">
              {onLabel}
            </span>
          ) : null}
          <span className={cn(styles.thumb())} data-slot="switch-thumb">
            {renderThumbIcon()}
          </span>
          {offLabel && !resolved.isSelected ? (
            <span className={cn(styles.offLabel())} data-slot="switch-off-label">
              {offLabel}
            </span>
          ) : null}
        </span>

        {children ? (
          <span className={cn(styles.labelText())} data-slot="switch-label-text">
            {children}
          </span>
        ) : null}
      </label>
    );
  },
);

Switch.displayName = 'IdeasUI.Switch';
