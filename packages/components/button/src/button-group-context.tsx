'use client';

import type { ButtonProps as ButtonProperties } from './button.types';

import { createContext, useContext } from 'react';

export interface ButtonGroupContextType {
  size?: ButtonProperties['size'];
  color?: ButtonProperties['color'];
  variant?: ButtonProperties['variant'];
  isDisabled?: boolean;
  isAttached?: boolean;
  isVertical?: boolean;
  radius?: ButtonProperties['radius'];
  fullWidth?: boolean;
  disableAnimation?: boolean;
  showDivider?: boolean;
  isIconOnly?: boolean;
}

export const ButtonGroupContext = createContext<ButtonGroupContextType | null>(null);

/**
 * Hook to consume the ButtonGroupContext.
 * @returns The button group context or null if not within a group.
 */
export function useButtonGroupContext(): ButtonGroupContextType | null {
  return useContext(ButtonGroupContext);
}
