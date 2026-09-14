'use client';

import type { ButtonProps as ButtonProperties } from './button.types';

import { createContext, useContext } from 'react';

export interface ButtonGroupContextType {
  size?: NonNullable<ButtonProperties['size']>;
  color?: NonNullable<ButtonProperties['color']>;
  variant?: NonNullable<ButtonProperties['variant']>;
  isDisabled?: boolean;
  isAttached?: boolean;
  isVertical?: boolean;
  radius?: NonNullable<ButtonProperties['radius']>;
  fullWidth?: boolean;
  disableAnimation?: boolean;
  divider?: 'full' | 'middle' | 'none';
}

export const ButtonGroupContext = createContext<ButtonGroupContextType | null>(null);

/**
 * Hook to consume the ButtonGroupContext.
 * @returns The button group context or null if not within a group.
 */
export function useButtonGroupContext(): ButtonGroupContextType | null {
  return useContext(ButtonGroupContext);
}
