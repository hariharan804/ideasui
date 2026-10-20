'use client';

import type { ChipGroupContextValue } from './chip.types';

import { createContext, useContext } from 'react';

export const ChipGroupContext = createContext<ChipGroupContextValue | null>(null);

export function useChipGroupContext(): ChipGroupContextValue | null {
  return useContext(ChipGroupContext);
}

export function useRequiredChipGroupContext(): ChipGroupContextValue {
  const context = useContext(ChipGroupContext);

  if (!context) {
    throw new Error('useRequiredChipGroupContext must be used within a <ChipGroup> component.');
  }

  return context;
}
