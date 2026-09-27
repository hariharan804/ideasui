'use client';

import type { SwitchGroupContextValue } from './switch.types';

import { createContext, useContext } from 'react';

export const SwitchGroupContext = createContext<SwitchGroupContextValue | null>(null);

export function useSwitchGroupContext(): SwitchGroupContextValue | null {
  return useContext(SwitchGroupContext);
}

export function useRequiredSwitchGroupContext(): SwitchGroupContextValue {
  const context = useContext(SwitchGroupContext);

  if (!context) {
    throw new Error('useRequiredSwitchGroupContext must be used within a <SwitchGroup> component.');
  }

  return context;
}
