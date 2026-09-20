'use client';

import type { InputFieldInputFilter, InputFieldInputProps } from './input-field.types';
import type { JSX, FocusEvent, ChangeEvent, SyntheticEvent, InputHTMLAttributes } from 'react';

import { forwardRef, useEffect, useRef } from 'react';
import { cn } from '@ideasui/utils';

import { useInputFieldContext } from './input-field-context';

function filterInputValue(value: string, inputFilter?: InputFieldInputFilter): string {
  if (!inputFilter) {
    return value;
  }

  if (inputFilter === 'numeric') {
    return value.replaceAll(/\D/g, '');
  }

  if (inputFilter === 'decimal') {
    const sanitized = value.replaceAll(/[^\d.]/g, '');
    const parts = sanitized.split('.');

    if (parts.length > 2) {
      return `${parts[0]}.${parts.slice(1).join('')}`;
    }

    return sanitized;
  }

  if (inputFilter === 'alpha') {
    return value.replaceAll(/[^A-Za-z]/g, '');
  }

  if (inputFilter === 'alphanumeric') {
    return value.replaceAll(/[^\dA-Za-z]/g, '');
  }

  return value;
}

function resolveInputMode(
  inputMode?: InputHTMLAttributes<HTMLInputElement>['inputMode'],
  inputFilter?: InputFieldInputFilter,
): InputHTMLAttributes<HTMLInputElement>['inputMode'] {
  if (inputMode) {
    return inputMode;
  }

  if (inputFilter === 'numeric') {
    return 'numeric';
  }

  if (inputFilter === 'decimal') {
    return 'decimal';
  }

  return undefined;
}

/* eslint-disable max-lines-per-function */
export const InputFieldInput = forwardRef<HTMLInputElement, InputFieldInputProps>(
  (
    {
      startContent,
      endContent,
      className,
      inputClassName,
      id,
      value,
      defaultValue,
      inputFilter: inputFilterProp,
      onFocus,
      onBlur,
      onChange,
      onInput,
      ...properties
    },
    reference,
  ): JSX.Element => {
    const {
      inputId: contextInputId,
      descriptionId,
      errorId,
      hasDescription,
      hasErrorMessage,
      isDisabled,
      isReadOnly,
      isRequired,
      isInvalid,
      inputFilter: contextInputFilter,
      setCustomInputId,
      setIsFocused,
      setHasValue,
      setHasStartContent,
      setHasEndContent,
      styles,
    } = useInputFieldContext();

    const inputRef = useRef<HTMLInputElement | null>(null);

    const effectiveInputFilter = inputFilterProp ?? contextInputFilter;

    const setRef = (node: HTMLInputElement | null): void => {
      inputRef.current = node;

      if (typeof reference === 'function') {
        reference(node);
      } else if (reference && 'current' in reference) {
        (reference as { current: HTMLInputElement | null }).current = node;
      }
    };

    useEffect(() => {
      if (id && setCustomInputId) {
        setCustomInputId(id);

        return (): void => {
          setCustomInputId(undefined);
        };
      }
    }, [id, setCustomInputId]);

    useEffect(() => {
      if (setHasStartContent) {
        const hasStart = Boolean(startContent);

        setHasStartContent(hasStart);

        return (): void => {
          setHasStartContent(false);
        };
      }
    }, [startContent, setHasStartContent]);

    useEffect(() => {
      if (setHasEndContent) {
        const hasEnd = Boolean(endContent);

        setHasEndContent(hasEnd);

        return (): void => {
          setHasEndContent(false);
        };
      }
    }, [endContent, setHasEndContent]);

    useEffect(() => {
      if (setHasValue) {
        if (value !== undefined && value !== null) {
          setHasValue(String(value).length > 0);
        } else if (defaultValue !== undefined && defaultValue !== null) {
          setHasValue(String(defaultValue).length > 0);
        } else if (inputRef.current) {
          setHasValue(inputRef.current.value.length > 0);
        }
      }
    }, [value, defaultValue, setHasValue]);

    const handleFocus = (event: FocusEvent<HTMLInputElement>): void => {
      setIsFocused?.(true);
      onFocus?.(event);
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>): void => {
      setIsFocused?.(false);
      onBlur?.(event);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
      if (effectiveInputFilter) {
        const filteredValue = filterInputValue(event.target.value, effectiveInputFilter);

        if (event.target.value !== filteredValue) {
          event.target.value = filteredValue;
        }
      }
      setHasValue?.(event.target.value.length > 0);
      onChange?.(event);
    };

    const handleInput = (event: SyntheticEvent<HTMLInputElement>): void => {
      const target = event.target as HTMLInputElement;

      if (effectiveInputFilter) {
        const filteredValue = filterInputValue(target.value, effectiveInputFilter);

        if (target.value !== filteredValue) {
          target.value = filteredValue;
        }
      }
      setHasValue?.(target.value.length > 0);
      if (onInput) {
        (onInput as (e: SyntheticEvent<HTMLInputElement>) => void)(event);
      }
    };

    const finalInputId = id ?? contextInputId;

    let describedBy: string | undefined;

    if (isInvalid && hasErrorMessage) {
      describedBy = errorId;
    } else if (hasDescription) {
      describedBy = descriptionId;
    }

    const resolvedInputMode = resolveInputMode(properties.inputMode, effectiveInputFilter);

    const displayValue =
      value !== undefined && value !== null && effectiveInputFilter
        ? filterInputValue(String(value), effectiveInputFilter)
        : value;

    const displayDefaultValue =
      defaultValue !== undefined && defaultValue !== null && effectiveInputFilter
        ? filterInputValue(String(defaultValue), effectiveInputFilter)
        : defaultValue;

    return (
      <div className={cn(styles?.wrapper(), className)} data-slot="input-wrapper">
        {Boolean(startContent) && (
          <span aria-hidden="true" className={styles?.startContent()} data-slot="start-content">
            {startContent}
          </span>
        )}
        <input
          {...properties}
          ref={setRef}
          aria-describedby={describedBy}
          aria-invalid={isInvalid || undefined}
          aria-required={isRequired || undefined}
          className={cn(styles?.input(), inputClassName)}
          data-slot="input"
          defaultValue={displayDefaultValue}
          disabled={isDisabled}
          id={finalInputId}
          inputMode={resolvedInputMode}
          readOnly={isReadOnly}
          required={isRequired}
          value={displayValue}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          onInput={handleInput}
        />
        {Boolean(endContent) && (
          <span aria-hidden="true" className={styles?.endContent()} data-slot="end-content">
            {endContent}
          </span>
        )}
      </div>
    );
  },
);

InputFieldInput.displayName = 'IdeasUI.InputFieldInput';
