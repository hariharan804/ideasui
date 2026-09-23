'use client';
import type { CheckboxGroupContextValue } from './checkbox.types';

import { createContext, useContext } from 'react';

export const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null);

export function useCheckboxGroupContext(): CheckboxGroupContextValue | null {
  return useContext(CheckboxGroupContext);
}

export function useRequiredCheckboxGroupContext(): CheckboxGroupContextValue {
  const context = useContext(CheckboxGroupContext);

  if (!context) {
    throw new Error(
      'useRequiredCheckboxGroupContext must be used within a <CheckboxGroup> component.',
    );
  }

  return context;
}
