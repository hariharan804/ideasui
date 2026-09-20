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
const InputFieldBase = forwardRef<HTMLDivElement, InputFieldProps>(
  (
    {
      variant = 'outline',
      labelVariant = 'default',
      size = 'md',
      shadow,
      isDisabled = false,
      isReadOnly = false,
      isRequired = false,
      isInvalid = false,
      label,
      placeholder,
      description,
      errorMessage,
      startContent,
      endContent,
      value,
      defaultValue,
      type,
      inputFilter,
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

    const effectiveInputId = customInputId ?? autoId;
    const isFloating =
      (resolvedLabelVariant === 'floating' || resolvedLabelVariant === 'inside-floating') &&
      (isFocused ||
        hasValue ||
        ((hasStartContent || hasEndContent) && labelVariant === 'inside-floating'));

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

      return (
        <>
          {hasLabel ? <InputFieldLabel>{label}</InputFieldLabel> : null}
          <InputFieldInput
            defaultValue={defaultValue}
            endContent={endContent}
            inputFilter={inputFilter}
            placeholder={placeholder}
            startContent={startContent}
            type={type}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
          />
          {hasDesc ? <InputFieldDescription>{description}</InputFieldDescription> : null}
          {hasError ? <InputFieldError>{errorMessage}</InputFieldError> : null}
        </>
      );
    };

    return (
      <InputFieldContext.Provider value={contextValue}>
        <div
          {...properties}
          ref={reference}
          className={cn(styles.root(), className)}
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
InputField.Description = InputFieldDescription;
InputField.Error = InputFieldError;
