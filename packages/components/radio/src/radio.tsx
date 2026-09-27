'use client';

import type {
  RadioGroupContextValue,
  RadioProps,
  RadioReturnType,
  RadioVariant,
} from './radio.types';
import type { ChangeEvent, ForwardedRef, JSX, ReactNode } from 'react';

import { forwardRef, useCallback, useId, useRef, useState } from 'react';
import { radio as radioRecipe } from '@ideasui/theme/recipes';
import { cn, mergeRefs, omit, renderIcon } from '@ideasui/utils';

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

function renderRadioDot(
  icon: RadioProps['icon'],
  iconClassName: string,
  iconSlotProps?: RadioProps['slotProps'] extends infer S
    ? S extends { icon?: infer I }
      ? I
      : undefined
    : undefined,
): ReactNode {
  if (icon !== undefined) {
    return renderIcon(icon, iconClassName);
  }

  return <span {...iconSlotProps} className={iconClassName} data-slot="radio-dot" />;
}

interface UseRadioControlReturn {
  setRefs: (node: HTMLInputElement | null) => void;
  inputId: string;
  resolved: ResolvedProps;
  handleClick: (event: React.MouseEvent<HTMLInputElement>) => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function useRadioControl(
  properties: RadioProps,
  reference: ForwardedRef<HTMLInputElement>,
): UseRadioControlReturn {
  const group = useRadioGroupContext();
  const internalInputRef = useRef<HTMLInputElement | null>(null);
  const inputId = useId();

  const [internalSelected, setInternalSelected] = useState<boolean>(
    properties.defaultSelected ?? false,
  );

  const combinedRef = useCallback(
    (node: HTMLInputElement | null) => {
      internalInputRef.current = node;
      mergeRefs(reference)(node);
    },
    [reference],
  );

  const resolved = resolveProps(properties, group, internalSelected);

  const handleClick = (event: React.MouseEvent<HTMLInputElement>): void => {
    (properties as { onClick?: (e: React.MouseEvent<HTMLInputElement>) => void }).onClick?.(event);

    if (resolved.isDisabled || resolved.isReadOnly) {
      return;
    }

    if (resolved.isSelected && resolved.isToggleable) {
      event.preventDefault();
      if (resolved.isGroupControlled && properties.value !== undefined) {
        group?.onGroupChange?.('');
      } else {
        if (properties.isSelected === undefined) {
          setInternalSelected(false);
        }
        properties.onChange?.(false);
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (resolved.isReadOnly) {
      return;
    }

    const checked = event.target.checked;

    if (resolved.isGroupControlled && properties.value !== undefined) {
      group?.onGroupChange?.(properties.value);
    } else {
      if (properties.isSelected === undefined) {
        setInternalSelected(checked);
      }

      properties.onChange?.(checked);
    }
  };

  return { setRefs: combinedRef, inputId, resolved, handleClick, handleChange };
}

const RADIO_PROPS_TO_OMIT = [
  'variant',
  'color',
  'size',
  'radius',
  'isSelected',
  'defaultSelected',
  'isToggleable',
  'isDisabled',
  'isReadOnly',
  'isRequired',
  'isInvalid',
  'value',
  'name',
  'onChange',
  'className',
  'classNames',
  'slotProps',
  'style',
  'children',
  'icon',
] as const;

interface RenderRadioInputProps {
  properties: RadioProps;
  resolved: ResolvedProps;
  inputId: string;
  setRefs: (node: HTMLInputElement | null) => void;
  handleClick: (event: React.MouseEvent<HTMLInputElement>) => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function renderRadioInput({
  properties,
  resolved,
  inputId,
  setRefs,
  handleClick,
  handleChange,
}: RenderRadioInputProps): JSX.Element {
  const { value, classNames, slotProps } = properties;
  const otherProperties = omit(
    properties as Record<string, unknown>,
    RADIO_PROPS_TO_OMIT as unknown as (keyof Record<string, unknown>)[],
  );

  return (
    <input
      {...slotProps?.input}
      {...otherProperties}
      ref={setRefs}
      checked={resolved.isSelected}
      className={cn('sr-only', classNames?.input, slotProps?.input?.className)}
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
  );
}

interface RenderRadioLayoutProps {
  properties: RadioProps;
  resolved: ResolvedProps;
  inputId: string;
  setRefs: (node: HTMLInputElement | null) => void;
  handleClick: (event: React.MouseEvent<HTMLInputElement>) => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  styles: RadioReturnType;
}

function renderRadioLayout({
  properties,
  resolved,
  inputId,
  setRefs,
  handleClick,
  handleChange,
  styles,
}: RenderRadioLayoutProps): JSX.Element {
  const { className, classNames, slotProps, style, children, icon } = properties;

  const iconClassName = cn(styles.dot(), classNames?.icon, slotProps?.icon?.className);

  return (
    <label
      {...slotProps?.root}
      className={cn(styles.root(), classNames?.root, slotProps?.root?.className, className)}
      data-disabled={resolved.isDisabled || undefined}
      data-invalid={resolved.isInvalid || undefined}
      data-readonly={resolved.isReadOnly || undefined}
      data-selected={resolved.isSelected || undefined}
      data-slot="radio"
      style={style}
    >
      {renderRadioInput({
        properties,
        resolved,
        inputId,
        setRefs,
        handleClick,
        handleChange,
      })}
      <span
        aria-hidden="true"
        {...slotProps?.indicator}
        className={cn(styles.indicator(), classNames?.indicator, slotProps?.indicator?.className)}
        data-slot="radio-indicator"
      >
        {renderRadioDot(icon, iconClassName, slotProps?.icon)}
      </span>
      {children ? (
        <span
          {...slotProps?.labelText}
          className={cn(styles.labelText(), classNames?.labelText, slotProps?.labelText?.className)}
          data-slot="radio-label-text"
        >
          {children}
        </span>
      ) : null}
    </label>
  );
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (properties, reference): JSX.Element => {
    const control = useRadioControl(properties, reference);
    const styles = radioRecipe({
      variant: control.resolved.variant,
      color: control.resolved.color,
      size: control.resolved.size,
      radius: control.resolved.radius,
      isDisabled: control.resolved.isDisabled,
      isInvalid: control.resolved.isInvalid,
    });

    return renderRadioLayout({
      properties,
      resolved: control.resolved,
      inputId: control.inputId,
      setRefs: control.setRefs,
      handleClick: control.handleClick,
      handleChange: control.handleChange,
      styles,
    });
  },
);

Radio.displayName = 'IdeasUI.Radio';
