'use client';

import type { ButtonProps } from './button.types';

import { createContext, useContext } from 'react';

export interface ButtonGroupContextType {
  size?: ButtonProps['size'];
  color?: ButtonProps['color'];
  variant?: ButtonProps['variant'];
  isDisabled?: boolean;
  isAttached?: boolean;
  isVertical?: boolean;
  radius?: ButtonProps['radius'];
  fullWidth?: boolean;
  disableAnimation?: boolean;
  showDivider?: boolean;
}

export const ButtonGroupContext = createContext<ButtonGroupContextType | null>(null);

/**
 * Hook to consume the ButtonGroupContext.
 * @returns The button group context or null if not within a group.
 */
export function useButtonGroupContext(): ButtonGroupContextType | null {
  return useContext(ButtonGroupContext);
}
