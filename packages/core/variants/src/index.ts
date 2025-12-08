import { tv } from 'tailwind-variants';
import { clsx, type ClassValue } from 'clsx';

export * from './system';
export * from './button';
export * from './input';
export * from './card';
export * from './badge';

/**
 * Utility function to merge class names
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Create variants with tailwind-variants
 */
export const createVariants = tv;