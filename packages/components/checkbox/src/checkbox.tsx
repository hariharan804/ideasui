'use client';

import type {
  CheckboxGroupContextValue,
  CheckboxProps,
  CheckboxReturnType,
  CheckboxVariant,
} from './checkbox.types';
import type { ChangeEvent, ForwardedRef, JSX, ReactNode } from 'react';

import { forwardRef, useCallback, useEffect, useId, useRef, useState } from 'react';
import { checkbox as checkboxRecipe } from '@ideasui/theme/recipes';
import { cn, mergeRefs, omit, renderIcon } from '@ideasui/utils';

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

function resolveProps(
  props: CheckboxProps,
  group: CheckboxGroupContextValue | null,
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
    radius: props.radius ?? g.radius,
    isDisabled: props.isDisabled ?? g.isDisabled ?? false,
    isReadOnly: props.isReadOnly ?? g.isReadOnly ?? false,
    isRequired: props.isRequired ?? g.isRequired ?? false,
    isInvalid: props.isInvalid ?? g.isInvalid ?? false,
    isSelected: isGroupControlled ? isSelectedInGroup : (props.isSelected ?? internalSelected),
    isGroupControlled,
  };
}

interface RenderCheckboxIconProps {
  isIndeterminate: boolean;
  isSelected: boolean;
  indeterminateIcon?: CheckboxProps['indeterminateIcon'];
  checkedIcon?: CheckboxProps['checkedIcon'];
  uncheckedIcon?: CheckboxProps['uncheckedIcon'];
  iconClassName: string;
  iconSlotProps?: CheckboxProps['slotProps'] extends infer S
    ? S extends { icon?: infer I }
      ? I
      : undefined
    : undefined;
}

function renderCheckboxIndicatorIcon({
  isIndeterminate,
  isSelected,
  indeterminateIcon,
  checkedIcon,
  uncheckedIcon,
  iconClassName,
  iconSlotProps,
}: RenderCheckboxIconProps): ReactNode {
  if (isIndeterminate) {
    if (indeterminateIcon !== undefined) {
      return renderIcon(indeterminateIcon, iconClassName);
    }

    return <IndeterminateIcon className={iconClassName} {...iconSlotProps} />;
  }

  if (isSelected) {
    if (checkedIcon !== undefined) {
      return renderIcon(checkedIcon, iconClassName);
    }

    return <CheckIcon className={iconClassName} {...iconSlotProps} />;
  }

  if (uncheckedIcon !== undefined) {
    return renderIcon(
      uncheckedIcon,
      cn(iconClassName, 'opacity-100 scale-100 group-data-[selected=true]/checkbox:opacity-0'),
    );
  }

  return <CheckIcon className={iconClassName} {...iconSlotProps} />;
}

interface UseCheckboxControlReturn {
  setRefs: (node: HTMLInputElement | null) => void;
  inputId: string;
  resolved: ResolvedProps;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function useCheckboxControl(
  properties: CheckboxProps,
  reference: ForwardedRef<HTMLInputElement>,
): UseCheckboxControlReturn {
  const group = useCheckboxGroupContext();
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

  useEffect(() => {
    if (internalInputRef.current) {
      internalInputRef.current.indeterminate = properties.isIndeterminate ?? false;
    }
  }, [properties.isIndeterminate]);

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

const CHECKBOX_PROPS_TO_OMIT = [
  'variant',
  'color',
  'size',
  'radius',
  'isSelected',
  'defaultSelected',
  'isIndeterminate',
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
  'checkedIcon',
  'uncheckedIcon',
  'indeterminateIcon',
] as const;

interface RenderCheckboxInputProps {
  properties: CheckboxProps;
  resolved: ResolvedProps;
  inputId: string;
  setRefs: (node: HTMLInputElement | null) => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function renderCheckboxInput({
  properties,
  resolved,
  inputId,
  setRefs,
  handleChange,
}: RenderCheckboxInputProps): JSX.Element {
  const { isIndeterminate = false, value, classNames, slotProps } = properties;
  const otherProperties = omit(
    properties as Record<string, unknown>,
    CHECKBOX_PROPS_TO_OMIT as unknown as (keyof Record<string, unknown>)[],
  );

  return (
    <input
      {...slotProps?.input}
      {...otherProperties}
      ref={setRefs}
      aria-checked={isIndeterminate ? 'mixed' : resolved.isSelected}
      aria-invalid={resolved.isInvalid || undefined}
      aria-required={resolved.isRequired || undefined}
      checked={resolved.isSelected}
      className={cn('sr-only', classNames?.input, slotProps?.input?.className)}
      data-slot="checkbox-input"
      disabled={resolved.isDisabled}
      id={inputId}
      readOnly={resolved.isReadOnly}
      required={resolved.isRequired}
      type="checkbox"
      value={value}
      onChange={handleChange}
    />
  );
}

interface RenderCheckboxLayoutProps {
  properties: CheckboxProps;
  resolved: ResolvedProps;
  inputId: string;
  setRefs: (node: HTMLInputElement | null) => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  styles: CheckboxReturnType;
}

function renderCheckboxLayout({
  properties,
  resolved,
  inputId,
  setRefs,
  handleChange,
  styles,
}: RenderCheckboxLayoutProps): JSX.Element {
  const {
    isIndeterminate = false,
    className,
    classNames,
    slotProps,
    style,
    children,
    checkedIcon,
    uncheckedIcon,
    indeterminateIcon,
  } = properties;

  const iconClassName = cn(styles.icon(), classNames?.icon, slotProps?.icon?.className);

  return (
    <label
      {...slotProps?.root}
      className={cn(styles.root(), classNames?.root, slotProps?.root?.className, className)}
      data-disabled={resolved.isDisabled || undefined}
      data-indeterminate={isIndeterminate || undefined}
      data-invalid={resolved.isInvalid || undefined}
      data-readonly={resolved.isReadOnly || undefined}
      data-selected={resolved.isSelected || undefined}
      data-slot="checkbox"
      style={style}
    >
      {renderCheckboxInput({ properties, resolved, inputId, setRefs, handleChange })}
      <span
        aria-hidden="true"
        {...slotProps?.indicator}
        className={cn(styles.indicator(), classNames?.indicator, slotProps?.indicator?.className)}
        data-slot="checkbox-indicator"
      >
        {renderCheckboxIndicatorIcon({
          isIndeterminate,
          isSelected: resolved.isSelected,
          indeterminateIcon,
          checkedIcon,
          uncheckedIcon,
          iconClassName,
          iconSlotProps: slotProps?.icon,
        })}
      </span>
      {children ? (
        <span
          {...slotProps?.labelText}
          className={cn(styles.labelText(), classNames?.labelText, slotProps?.labelText?.className)}
          data-slot="checkbox-label-text"
        >
          {children}
        </span>
      ) : null}
    </label>
  );
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (properties, reference): JSX.Element => {
    const control = useCheckboxControl(properties, reference);
    const styles = checkboxRecipe({
      variant: control.resolved.variant,
      color: control.resolved.color,
      size: control.resolved.size,
      radius: control.resolved.radius,
      isDisabled: control.resolved.isDisabled,
      isInvalid: control.resolved.isInvalid,
    });

    return renderCheckboxLayout({
      properties,
      resolved: control.resolved,
      inputId: control.inputId,
      setRefs: control.setRefs,
      handleChange: control.handleChange,
      styles,
    });
  },
);

Checkbox.displayName = 'IdeasUI.Checkbox';
