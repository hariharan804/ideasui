'use client';

import type {
  SwitchClassNames,
  SwitchGroupContextValue,
  SwitchProps,
  SwitchReturnType,
  SwitchSlotProps,
  SwitchVariant,
} from './switch.types';
import type { ChangeEvent, ForwardedRef, JSX, ReactNode } from 'react';

import { forwardRef, useCallback, useId, useRef, useState } from 'react';
import { switchRecipe } from '@ideasui/theme/recipes';
import { cn, mergeRefs, omit, renderIcon } from '@ideasui/utils';

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

function resolveProps(
  props: SwitchProps,
  group: SwitchGroupContextValue | null,
  internalSelected: boolean,
): ResolvedProps {
  const g = group ?? {};
  const isGroupControlled = group !== null && props.value !== undefined;
  const isSelectedInGroup =
    props.value !== undefined && (g.selectedValues?.includes(props.value) ?? false);

  return {
    variant: props.variant ?? g.variant ?? 'solid',
    color: props.color ?? g.color ?? 'primary',
    size: props.size ?? g.size ?? 'md',
    labelPlacement: props.labelPlacement ?? g.labelPlacement ?? 'end',
    isDisabled: props.isDisabled ?? g.isDisabled ?? false,
    isReadOnly: props.isReadOnly ?? g.isReadOnly ?? false,
    isRequired: props.isRequired ?? g.isRequired ?? false,
    isInvalid: props.isInvalid ?? g.isInvalid ?? false,
    isSelected: isGroupControlled ? isSelectedInGroup : (props.isSelected ?? internalSelected),
    isGroupControlled,
  };
}

interface RenderSwitchThumbIconProps {
  isSelected: boolean;
  checkedThumbIcon?: SwitchProps['checkedThumbIcon'];
  uncheckedThumbIcon?: SwitchProps['uncheckedThumbIcon'];
  thumbIcon?: SwitchProps['thumbIcon'];
  thumbIconClassName: string;
}

function renderSwitchThumbIcon({
  isSelected,
  checkedThumbIcon,
  uncheckedThumbIcon,
  thumbIcon,
  thumbIconClassName,
}: RenderSwitchThumbIconProps): ReactNode {
  if (isSelected && checkedThumbIcon !== undefined) {
    return renderIcon(checkedThumbIcon, thumbIconClassName);
  }

  if (!isSelected && uncheckedThumbIcon !== undefined) {
    return renderIcon(uncheckedThumbIcon, thumbIconClassName);
  }

  if (thumbIcon !== undefined) {
    if (typeof thumbIcon === 'function') {
      return thumbIcon({ isSelected, className: thumbIconClassName });
    }

    return renderIcon(thumbIcon, thumbIconClassName);
  }

  return null;
}

interface RenderSwitchTrackProps {
  isSelected: boolean;
  onLabel?: string;
  offLabel?: string;
  checkedThumbIcon?: SwitchProps['checkedThumbIcon'];
  uncheckedThumbIcon?: SwitchProps['uncheckedThumbIcon'];
  thumbIcon?: SwitchProps['thumbIcon'];
  styles: SwitchReturnType;
  classNames?: SwitchClassNames;
  slotProps?: SwitchSlotProps;
}

function renderSwitchTrack({
  isSelected,
  onLabel,
  offLabel,
  checkedThumbIcon,
  uncheckedThumbIcon,
  thumbIcon,
  styles,
  classNames,
  slotProps,
}: RenderSwitchTrackProps): ReactNode {
  const thumbIconClassName = cn(
    styles.thumbIcon(),
    classNames?.thumbIcon,
    slotProps?.thumbIcon?.className,
  );

  return (
    <span
      aria-hidden="true"
      {...slotProps?.track}
      className={cn(styles.track(), classNames?.track, slotProps?.track?.className)}
      data-slot="switch-track"
    >
      {onLabel && isSelected ? (
        <span
          {...slotProps?.onLabel}
          className={cn(styles.onLabel(), classNames?.onLabel, slotProps?.onLabel?.className)}
          data-slot="switch-on-label"
        >
          {onLabel}
        </span>
      ) : null}
      <span
        {...slotProps?.thumb}
        className={cn(styles.thumb(), classNames?.thumb, slotProps?.thumb?.className)}
        data-slot="switch-thumb"
      >
        {renderSwitchThumbIcon({
          isSelected,
          checkedThumbIcon,
          uncheckedThumbIcon,
          thumbIcon,
          thumbIconClassName,
        })}
      </span>
      {offLabel && !isSelected ? (
        <span
          {...slotProps?.offLabel}
          className={cn(styles.offLabel(), classNames?.offLabel, slotProps?.offLabel?.className)}
          data-slot="switch-off-label"
        >
          {offLabel}
        </span>
      ) : null}
    </span>
  );
}

interface UseSwitchControlReturn {
  setRefs: (node: HTMLInputElement | null) => void;
  inputId: string;
  resolved: ResolvedProps;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function useSwitchControl(
  properties: SwitchProps,
  reference: ForwardedRef<HTMLInputElement>,
): UseSwitchControlReturn {
  const group = useSwitchGroupContext();
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (resolved.isReadOnly) {
      return;
    }

    const checked = event.target.checked;

    if (resolved.isGroupControlled && properties.value !== undefined) {
      group?.onGroupChange?.(properties.value, checked);
    } else {
      if (properties.isSelected === undefined) {
        setInternalSelected(checked);
      }

      properties.onChange?.(checked);
    }
  };

  return { setRefs: combinedRef, inputId, resolved, handleChange };
}

const SWITCH_PROPS_TO_OMIT = [
  'variant',
  'thumbVariant',
  'thumbShape',
  'thumbSize',
  'color',
  'size',
  'labelPlacement',
  'onLabel',
  'offLabel',
  'thumbIcon',
  'checkedThumbIcon',
  'uncheckedThumbIcon',
  'isSelected',
  'defaultSelected',
  'isDisabled',
  'isReadOnly',
  'isRequired',
  'isInvalid',
  'value',
  'onChange',
  'className',
  'classNames',
  'slotProps',
  'style',
  'children',
] as const;

interface RenderSwitchLayoutProps {
  properties: SwitchProps;
  resolved: ResolvedProps;
  inputId: string;
  setRefs: (node: HTMLInputElement | null) => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  styles: SwitchReturnType;
}

function renderSwitchLayout({
  properties,
  resolved,
  inputId,
  setRefs,
  handleChange,
  styles,
}: RenderSwitchLayoutProps): JSX.Element {
  const {
    onLabel,
    offLabel,
    thumbIcon,
    checkedThumbIcon,
    uncheckedThumbIcon,
    value,
    className,
    classNames,
    slotProps,
    style,
    children,
  } = properties;

  const otherProperties = omit(
    properties as Record<string, unknown>,
    SWITCH_PROPS_TO_OMIT as unknown as (keyof Record<string, unknown>)[],
  );

  return (
    <label
      {...slotProps?.root}
      className={cn(styles.root(), classNames?.root, slotProps?.root?.className, className)}
      data-disabled={resolved.isDisabled || undefined}
      data-invalid={resolved.isInvalid || undefined}
      data-readonly={resolved.isReadOnly || undefined}
      data-selected={resolved.isSelected || undefined}
      data-slot="switch"
      style={style}
    >
      <input
        {...slotProps?.input}
        {...otherProperties}
        ref={setRefs}
        aria-checked={resolved.isSelected}
        aria-invalid={resolved.isInvalid || undefined}
        aria-required={resolved.isRequired || undefined}
        checked={resolved.isSelected}
        className={cn('sr-only', classNames?.input, slotProps?.input?.className)}
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

      {renderSwitchTrack({
        isSelected: resolved.isSelected,
        onLabel,
        offLabel,
        checkedThumbIcon,
        uncheckedThumbIcon,
        thumbIcon,
        styles,
        classNames,
        slotProps,
      })}

      {children ? (
        <span
          {...slotProps?.labelText}
          className={cn(styles.labelText(), classNames?.labelText, slotProps?.labelText?.className)}
          data-slot="switch-label-text"
        >
          {children}
        </span>
      ) : null}
    </label>
  );
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (properties, reference): JSX.Element => {
    const control = useSwitchControl(properties, reference);

    const styles = switchRecipe({
      variant: control.resolved.variant,
      thumbVariant: properties.thumbVariant,
      thumbShape: properties.thumbShape,
      thumbSize: properties.thumbSize,
      color: control.resolved.color,
      size: control.resolved.size,
      labelPlacement: control.resolved.labelPlacement,
      isDisabled: control.resolved.isDisabled,
      isInvalid: control.resolved.isInvalid,
    });

    return renderSwitchLayout({
      properties,
      resolved: control.resolved,
      inputId: control.inputId,
      setRefs: control.setRefs,
      handleChange: control.handleChange,
      styles,
    });
  },
);

Switch.displayName = 'IdeasUI.Switch';
