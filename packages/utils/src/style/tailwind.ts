import type { ClassValue } from 'clsx';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with conflict resolution
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Create conditional Tailwind classes
 */
export function cva(base: string, variants: Record<string, Record<string, string>>) {
  return (props: Record<string, any>) => {
    const classes = [base];

    Object.entries(variants).forEach(([key, values]) => {
      const value = props[key];
      if (value && values[value]) {
        classes.push(values[value]);
      }
    });

    return cn(classes, props.className);
  };
}

/**
 * Toggle Tailwind classes based on condition
 */
export function tw(condition: boolean, trueClasses: string, falseClasses = '') {
  return cn(condition ? trueClasses : falseClasses);
}

/**
 * Responsive Tailwind class builder
 */
export function responsive(classes: {
  base?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  '2xl'?: string;
}) {
  const responsiveClasses: string[] = [];

  if (classes.base) responsiveClasses.push(classes.base);
  if (classes.sm) responsiveClasses.push(`sm:${classes.sm}`);
  if (classes.md) responsiveClasses.push(`md:${classes.md}`);
  if (classes.lg) responsiveClasses.push(`lg:${classes.lg}`);
  if (classes.xl) responsiveClasses.push(`xl:${classes.xl}`);
  if (classes['2xl']) responsiveClasses.push(`2xl:${classes['2xl']}`);

  return cn(responsiveClasses);
}
