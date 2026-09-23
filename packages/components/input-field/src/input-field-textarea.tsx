'use client';

import type { InputFieldTextareaProps } from './textarea.types';
import type { JSX, FocusEvent, ChangeEvent, ReactNode, ForwardedRef, Ref } from 'react';

import { forwardRef, useEffect, useRef, useState, useMemo } from 'react';
import { cn } from '@ideasui/utils';

import { useInputFieldContext } from './input-field-context';
import { useTextareaAutoResize } from './use-textarea-auto-resize';

function assignRef<T>(ref: ForwardedRef<T> | Ref<T> | undefined, node: T | null): void {
  if (typeof ref === 'function') {
    ref(node);
  } else if (ref && 'current' in ref) {
    (ref as { current: T | null }).current = node;
  }
}

function getResizeClass(resize: string): string {
  switch (resize) {
    case 'vertical': {
      return 'ideasui-input-field__textarea--resize-vertical';
    }
    case 'horizontal': {
      return 'ideasui-input-field__textarea--resize-horizontal';
    }
    case 'both': {
      return 'ideasui-input-field__textarea--resize-both';
    }
    default: {
      return 'ideasui-input-field__textarea--resize-none';
    }
  }
}

function resolveCounterContent(
  showCharacterCount: boolean | ((count: number, maxLength?: number) => ReactNode),
  charCount: number,
  maxLength?: number,
): ReactNode {
  if (typeof showCharacterCount === 'function') {
    return showCharacterCount(charCount, maxLength);
  }
  if (maxLength !== undefined) {
    return `${charCount} / ${maxLength}`;
  }

  return charCount;
}

function renderCounterElement(
  showCharacterCount: boolean | ((count: number, maxLength?: number) => ReactNode) | undefined,
  charCount: number,
  maxLength: number | undefined,
  counterStyle: string | undefined,
  counterClass: string | undefined,
): ReactNode {
  if (!showCharacterCount) {
    return null;
  }

  return (
    <span
      className={cn(counterStyle, 'ideasui-input-field__counter', counterClass)}
      data-slot="counter"
    >
      {resolveCounterContent(showCharacterCount, charCount, maxLength)}
    </span>
  );
}

function useTextareaAriaDescribedBy(
  hasErrorMessage?: boolean,
  isInvalid?: boolean,
  errorId?: string,
  hasDescription?: boolean,
  descriptionId?: string,
): string | undefined {
  return useMemo(() => {
    const ids: string[] = [];

    if (hasErrorMessage && isInvalid && errorId) {
      ids.push(errorId);
    }

    if (hasDescription && descriptionId) {
      ids.push(descriptionId);
    }

    return ids.length > 0 ? ids.join(' ') : undefined;
  }, [hasErrorMessage, isInvalid, errorId, hasDescription, descriptionId]);
}

function renderAdornment(content: ReactNode, slotClass?: string, slotName?: string): ReactNode {
  if (!content) {
    return null;
  }

  return (
    <div className={slotClass} data-slot={slotName}>
      {content}
    </div>
  );
}

interface TextareaSyncContext {
  readonly setCustomInputId?: (id?: string) => void;
  readonly setHasStartContent?: (has: boolean) => void;
  readonly setHasEndContent?: (has: boolean) => void;
  readonly setHasValue?: (has: boolean) => void;
}

function useTextareaSync(
  id: string | undefined,
  startContent: ReactNode,
  endContent: ReactNode,
  value: string | number | readonly string[] | undefined,
  context: TextareaSyncContext,
  textareaRef: React.RefObject<HTMLTextAreaElement | null>,
): void {
  const { setCustomInputId, setHasStartContent, setHasEndContent, setHasValue } = context;

  useEffect(() => {
    setCustomInputId?.(id);

    return (): void => {
      setCustomInputId?.(undefined);
    };
  }, [id, setCustomInputId]);

  useEffect(() => {
    setHasStartContent?.(Boolean(startContent));

    return (): void => {
      setHasStartContent?.(false);
    };
  }, [startContent, setHasStartContent]);

  useEffect(() => {
    setHasEndContent?.(Boolean(endContent));

    return (): void => {
      setHasEndContent?.(false);
    };
  }, [endContent, setHasEndContent]);

  useEffect(() => {
    const element = textareaRef.current;
    const initialHasValue = value === undefined ? Boolean(element?.value) : Boolean(value);

    setHasValue?.(initialHasValue);
  }, [value, setHasValue, textareaRef]);
}

interface TextareaHandlerOptions {
  readonly onFocus?: (event: FocusEvent<HTMLTextAreaElement>) => void;
  readonly onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void;
  readonly onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  readonly onValueChange?: (value: string) => void;
  readonly setIsFocused?: (isFocused: boolean) => void;
  readonly setHasValue?: (hasValue: boolean) => void;
  readonly setUncontrolledCount: (count: number) => void;
  readonly adjustHeight: () => void;
}

interface TextareaHandlers {
  readonly handleFocus: (event: FocusEvent<HTMLTextAreaElement>) => void;
  readonly handleBlur: (event: FocusEvent<HTMLTextAreaElement>) => void;
  readonly handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

function useTextareaHandlers(options: TextareaHandlerOptions): TextareaHandlers {
  const {
    onFocus,
    onBlur,
    onChange,
    onValueChange,
    setIsFocused,
    setHasValue,
    setUncontrolledCount,
    adjustHeight,
  } = options;

  const handleFocus = (event: FocusEvent<HTMLTextAreaElement>): void => {
    setIsFocused?.(true);
    onFocus?.(event);
  };

  const handleBlur = (event: FocusEvent<HTMLTextAreaElement>): void => {
    setIsFocused?.(false);
    onBlur?.(event);
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const nextValue = event.target.value;

    setHasValue?.(Boolean(nextValue));
    setUncontrolledCount(nextValue.length);
    adjustHeight();
    onChange?.(event);
    onValueChange?.(nextValue);
  };

  return { handleFocus, handleBlur, handleChange };
}

export const InputFieldTextarea = forwardRef<HTMLTextAreaElement, InputFieldTextareaProps>(
  (props, reference): JSX.Element => {
    const {
      startContent,
      endContent,
      className,
      textareaClassName,
      id,
      value,
      defaultValue,
      minRows = 3,
      maxRows,
      autoResize = true,
      resize = 'none',
      showCharacterCount = false,
      maxLength,
      textareaRef: propTextareaRef,
      onFocus,
      onBlur,
      onChange,
      onValueChange,
      ...properties
    } = props;

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
      classNames,
      setCustomInputId,
      setIsFocused,
      setHasValue,
      setHasStartContent,
      setHasEndContent,
      styles,
    } = useInputFieldContext();

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const [uncontrolledCount, setUncontrolledCount] = useState<number>(() => {
      if (typeof defaultValue === 'string') {
        return defaultValue.length;
      }

      return 0;
    });

    const charCount = value === undefined ? uncontrolledCount : String(value).length;

    const setRef = (node: HTMLTextAreaElement | null): void => {
      textareaRef.current = node;
      assignRef(reference, node);
      assignRef(propTextareaRef, node);
    };

    const adjustHeight = useTextareaAutoResize(textareaRef, {
      autoResize,
      minRows,
      maxRows,
      value,
    });

    useTextareaSync(
      id,
      startContent,
      endContent,
      value,
      { setCustomInputId, setHasStartContent, setHasEndContent, setHasValue },
      textareaRef,
    );

    const { handleFocus, handleBlur, handleChange } = useTextareaHandlers({
      onFocus,
      onBlur,
      onChange,
      onValueChange,
      setIsFocused,
      setHasValue,
      setUncontrolledCount,
      adjustHeight,
    });

    const effectiveId = id ?? contextInputId;
    const ariaDescribedBy = useTextareaAriaDescribedBy(
      hasErrorMessage,
      isInvalid,
      errorId,
      hasDescription,
      descriptionId,
    );

    const counterSlotClass = (classNames as Record<string, string | undefined>)?.counter;
    const textareaSlotClass = (classNames as Record<string, string | undefined>)?.textarea;

    return (
      <div className="flex w-full flex-col">
        <div
          className={cn(
            styles?.wrapper?.(),
            'ideasui-input-field__wrapper--textarea',
            classNames?.wrapper,
            className,
          )}
          data-slot="wrapper"
        >
          {renderAdornment(
            startContent,
            cn(styles?.startContent?.(), classNames?.startContent),
            'start-content',
          )}

          <textarea
            {...properties}
            ref={setRef}
            aria-describedby={ariaDescribedBy}
            aria-invalid={isInvalid || undefined}
            aria-readonly={isReadOnly || undefined}
            aria-required={isRequired || undefined}
            className={cn(
              styles?.textarea?.(),
              'ideasui-input-field__textarea',
              getResizeClass(resize),
              textareaSlotClass,
              textareaClassName,
            )}
            data-slot="textarea"
            defaultValue={defaultValue}
            disabled={isDisabled}
            id={effectiveId}
            maxLength={maxLength}
            readOnly={isReadOnly}
            required={isRequired}
            rows={minRows}
            value={value}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
          />

          {renderAdornment(
            endContent,
            cn(styles?.endContent?.(), classNames?.endContent),
            'end-content',
          )}
        </div>

        {renderCounterElement(
          showCharacterCount,
          charCount,
          maxLength,
          styles?.counter?.(),
          counterSlotClass,
        )}
      </div>
    );
  },
);

InputFieldTextarea.displayName = 'IdeasUI.InputField.Textarea';
