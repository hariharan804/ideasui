'use client';

import type { InputFieldContextValue } from './input-field.types';

import { createContext, useContext } from 'react';

export const InputFieldContext = createContext<InputFieldContextValue | null>(null);

/**
 * Custom hook to consume InputFieldContext state within InputField sub-components.
 * Throws a descriptive error if called outside an <InputField> wrapper.
 */
export function useInputFieldContext(): InputFieldContextValue {
  const context = useContext(InputFieldContext);

  if (!context) {
    throw new Error('useInputFieldContext must be used within an <InputField> component.');
  }

  return context;
}
