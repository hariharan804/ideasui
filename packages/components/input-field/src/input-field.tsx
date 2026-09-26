'use client';

import type {
  InputFieldProps,
  InputFieldLabelVariant,
  InputFieldVariant,
  InputFieldShadow,
  InputFieldComponent,
} from './input-field.types';
import type { JSX, ReactNode } from 'react';

import { forwardRef, useId, useState, useCallback, useMemo } from 'react';
import { inputField } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';

import { InputFieldContext } from './input-field-context';
import { InputFieldLabel } from './input-field-label';
import { InputFieldInput } from './input-field-input';
import { InputFieldTextarea } from './input-field-textarea';
import { InputFieldDescription } from './input-field-description';
import { InputFieldError } from './input-field-error';

function resolveInputFieldShadow(
  shadow?: InputFieldShadow | boolean,
  variant?: InputFieldVariant,
): InputFieldShadow {
  if (typeof shadow === 'boolean') {
    return shadow ? 'md' : 'none';
  }

  if (shadow !== undefined) {
    return shadow;
  }

  if (variant === 'shadow') {
    return 'sm';
  }

  return 'none';
}

/* eslint-disable max-lines-per-function */
const checkIsFloating = (
  resolvedLabelVariant: InputFieldLabelVariant,
  labelVariant: InputFieldLabelVariant,
  isFocused: boolean,
  hasValue: boolean,
  hasStartContent: boolean,
  hasEndContent: boolean,
): boolean => {
  return (
    (resolvedLabelVariant === 'floating' || resolvedLabelVariant === 'inside-floating') &&
    (isFocused ||
      hasValue ||
      ((hasStartContent || hasEndContent) && labelVariant === 'inside-floating'))
  );
};

export const InputFieldBase = forwardRef<HTMLDivElement, InputFieldProps>(
  (
    {
      id,
      name,
      variant = 'outline',
      labelVariant = 'default',
      size = 'md',
      shadow,
      isDisabled = false,
      isReadOnly = false,
      isRequired = false,
      isInvalid = false,
      label,
      description,
      errorMessage,
      placeholder,
      startContent,
      endContent,
      value,
      defaultValue,
      type,
      autoComplete,
      inputMode,
      maxLength,
      minLength,
      pattern,
      min,
      max,
      step,
      autoFocus,
      inputRef,
      inputFilter,
      classNames,
      slotProps,
      onChange,
      onFocus,
      onBlur,
      className,
      style,
      children,
      ...properties
    },
    reference,
  ): JSX.Element => {
    const autoId = useId();
    const descriptionId = useId();
    const errorId = useId();

    const [customInputId, setCustomInputId] = useState<string>();
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    const [hasStartContent, setHasStartContent] = useState(false);
    const [hasEndContent, setHasEndContent] = useState(false);
    const [hasDescription, setHasDescription] = useState(false);
    const [hasErrorMessage, setHasErrorMessage] = useState(false);

    const registerDescription = useCallback(() => {
      setHasDescription(true);

      return (): void => {
        setHasDescription(false);
      };
    }, []);

    const registerErrorMessage = useCallback(() => {
      setHasErrorMessage(true);

      return (): void => {
        setHasErrorMessage(false);
      };
    }, []);

    const resolvedLabelVariant: InputFieldLabelVariant =
      labelVariant === 'inside' ? 'inside-fixed' : labelVariant;

    const resolvedShadow = resolveInputFieldShadow(shadow, variant);

    const effectiveInputId = customInputId ?? id ?? autoId;
    const isFloating = checkIsFloating(
      resolvedLabelVariant,
      labelVariant,
      isFocused,
      hasValue,
      hasStartContent,
      hasEndContent,
    );

    const styles = inputField({
      variant,
      labelVariant: resolvedLabelVariant,
      size,
      shadow: resolvedShadow,
      isDisabled,
      isInvalid,
      isFocused,
      isFloating,
      hasStartContent,
    });

    const contextValue = useMemo(
      () => ({
        variant,
        labelVariant: resolvedLabelVariant,
        size,
        shadow: resolvedShadow,
        inputFilter,
        isDisabled,
        isReadOnly,
        isRequired,
        isInvalid,
        isFocused,
        hasValue,
        isFloating,
        hasStartContent,
        hasEndContent,
        inputId: effectiveInputId,
        descriptionId,
        errorId,
        hasDescription,
        hasErrorMessage,
        classNames,
        slotProps,
        setCustomInputId,
        setIsFocused,
        setHasValue,
        setHasStartContent,
        setHasEndContent,
        registerDescription,
        registerErrorMessage,
        styles,
      }),
      [
        variant,
        resolvedLabelVariant,
        size,
        resolvedShadow,
        inputFilter,
        isDisabled,
        isReadOnly,
        isRequired,
        isInvalid,
        isFocused,
        hasValue,
        isFloating,
        hasStartContent,
        hasEndContent,
        effectiveInputId,
        descriptionId,
        errorId,
        hasDescription,
        hasErrorMessage,
        classNames,
        slotProps,
        setCustomInputId,
        setIsFocused,
        setHasValue,
        setHasStartContent,
        setHasEndContent,
        registerDescription,
        registerErrorMessage,
        styles,
      ],
    );

    const renderContent = (): ReactNode => {
      if (children) {
        return children;
      }

      const hasLabel = label !== undefined && label !== null && label !== '';
      const hasDesc = description !== undefined && description !== null && !isInvalid;
      const hasError = errorMessage !== undefined && errorMessage !== null && isInvalid;
      const errorSlotProps = slotProps?.errorMessage ?? slotProps?.error;

      return (
        <>
          {hasLabel ? <InputFieldLabel {...slotProps?.label}>{label}</InputFieldLabel> : null}
          <InputFieldInput
            {...slotProps?.input}
            autoComplete={autoComplete}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={autoFocus}
            defaultValue={defaultValue}
            endContent={endContent}
            id={id}
            inputFilter={inputFilter}
            inputMode={inputMode}
            inputRef={inputRef}
            max={max}
            maxLength={maxLength}
            min={min}
            minLength={minLength}
            name={name}
            pattern={pattern}
            placeholder={placeholder}
            startContent={startContent}
            step={step}
            type={type}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
          />
          {hasDesc ? (
            <InputFieldDescription {...slotProps?.description}>{description}</InputFieldDescription>
          ) : null}
          {hasError ? <InputFieldError {...errorSlotProps}>{errorMessage}</InputFieldError> : null}
        </>
      );
    };

    return (
      <InputFieldContext.Provider value={contextValue}>
        <div
          {...slotProps?.root}
          {...properties}
          ref={reference}
          className={cn(styles.root(), classNames?.root, className, slotProps?.root?.className)}
          data-disabled={isDisabled || undefined}
          data-floating={isFloating || undefined}
          data-focused={isFocused || undefined}
          data-invalid={isInvalid || undefined}
          data-label-variant={resolvedLabelVariant}
          data-readonly={isReadOnly || undefined}
          data-required={isRequired || undefined}
          data-slot="input-field"
          style={style}
        >
          {renderContent()}
        </div>
      </InputFieldContext.Provider>
    );
  },
);

InputFieldBase.displayName = 'IdeasUI.InputField';

export const InputField = InputFieldBase as InputFieldComponent;

InputField.Label = InputFieldLabel;
InputField.Input = InputFieldInput;
InputField.Textarea = InputFieldTextarea;
InputField.Description = InputFieldDescription;
InputField.Error = InputFieldError;
