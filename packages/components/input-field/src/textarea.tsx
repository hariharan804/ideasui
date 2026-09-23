import type { JSX } from 'react';
import type { TextareaProps, TextareaComponent } from './textarea.types';

import { forwardRef } from 'react';

import { InputFieldBase } from './input-field';
import { InputFieldDescription } from './input-field-description';
import { InputFieldError } from './input-field-error';
import { InputFieldLabel } from './input-field-label';
import { InputFieldTextarea } from './input-field-textarea';

const TextareaRender = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(props, reference): JSX.Element {
    const {
      children,
      minRows = 3,
      maxRows,
      autoResize = true,
      resize = 'none',
      showCharacterCount = false,
      slotProps,
      onChange,
      onFocus,
      onBlur,
      onValueChange,
      value,
      defaultValue,
      placeholder,
      startContent,
      endContent,
      maxLength,
      id,
      name,
      ...wrapperProps
    } = props;

    // If children are supplied (compound subcomponent usage), render InputFieldBase with children
    if (children) {
      return (
        <InputFieldBase {...wrapperProps} id={id} name={name} slotProps={slotProps}>
          {children}
        </InputFieldBase>
      );
    }

    const { label, description, errorMessage, ...restWrapperProps } = wrapperProps;
    const hasLabel = label !== undefined && label !== null && label !== '';
    const hasDesc = description !== undefined && description !== null && !wrapperProps.isInvalid;
    const hasError = errorMessage !== undefined && errorMessage !== null && wrapperProps.isInvalid;
    const errorSlotProps = slotProps?.errorMessage ?? slotProps?.error;

    // Shorthand usage: wrap with InputFieldBase and render label, textarea, description/error
    return (
      <InputFieldBase
        {...restWrapperProps}
        description={description}
        errorMessage={errorMessage}
        id={id}
        label={label}
        name={name}
        slotProps={slotProps}
      >
        {hasLabel ? <InputFieldLabel {...slotProps?.label}>{label}</InputFieldLabel> : null}
        <InputFieldTextarea
          {...slotProps?.textarea}
          ref={reference}
          autoResize={autoResize}
          defaultValue={defaultValue}
          disabled={wrapperProps.isDisabled}
          endContent={endContent}
          id={id}
          maxLength={maxLength}
          maxRows={maxRows}
          minRows={minRows}
          name={name}
          placeholder={placeholder}
          readOnly={wrapperProps.isReadOnly}
          required={wrapperProps.isRequired}
          resize={resize}
          showCharacterCount={showCharacterCount}
          startContent={startContent}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          onValueChange={onValueChange}
        />
        {hasDesc ? (
          <InputFieldDescription {...slotProps?.description}>{description}</InputFieldDescription>
        ) : null}
        {hasError ? <InputFieldError {...errorSlotProps}>{errorMessage}</InputFieldError> : null}
      </InputFieldBase>
    );
  },
);

export const Textarea = TextareaRender as unknown as TextareaComponent;

Textarea.displayName = 'IdeasUI.Textarea';
Textarea.Label = InputFieldLabel;
Textarea.Input = InputFieldTextarea;
Textarea.Description = InputFieldDescription;
Textarea.Error = InputFieldError;
