'use client';

import type { AvatarGroupContextValue } from './avatar.types';

import { createContext, useContext } from 'react';

export const AvatarGroupContext = createContext<AvatarGroupContextValue | null>(null);

export function useAvatarGroupContext(): AvatarGroupContextValue | null {
  return useContext(AvatarGroupContext);
}

export function useRequiredAvatarGroupContext(): AvatarGroupContextValue {
  const context = useContext(AvatarGroupContext);

  if (!context) {
    throw new Error(
      'useRequiredAvatarGroupContext must be used within an <AvatarGroup> component.',
    );
  }

  return context;
}
