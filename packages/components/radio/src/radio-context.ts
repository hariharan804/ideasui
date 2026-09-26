'use client';

import type { RadioGroupContextValue } from './radio.types';

import { createContext, useContext } from 'react';

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export function useRadioGroupContext(): RadioGroupContextValue | null {
  return useContext(RadioGroupContext);
}

export function useRequiredRadioGroupContext(): RadioGroupContextValue {
  const context = useContext(RadioGroupContext);

  if (!context) {
    throw new Error('useRequiredRadioGroupContext must be used within a <RadioGroup> component.');
  }

  return context;
}
