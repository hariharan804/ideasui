import type { ClassValue } from 'clsx';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with conflict resolution
 * @param {ClassValue[]} inputs - Class values to merge
 * @returns {string} Merged class string
 */
export function cn(...inputs: ClassValue[]): string {
  const merged = twMerge(clsx(inputs));

  if (!merged?.includes(' ')) {
    return merged;
  }

  const parts = merged.split(' ');
  const unique = new Set<string>();
  const result: string[] = [];

  for (const part of parts) {
    if (part && !unique.has(part)) {
      unique.add(part);
      result.push(part);
    }
  }

  return result.join(' ');
}

/**
 * Create conditional Tailwind classes
 * @param {string} base - Base classes
 * @param {Record<string, Record<string, string>>} variants - Variant definitions
 * @returns {Function} Function to generate classes based on props
 */
export function cva(
  base: string,
  variants: Record<string, Record<string, string>>,
): (properties: Record<string, string | undefined> & { className?: ClassValue }) => string {
  return (properties: Record<string, string | undefined> & { className?: ClassValue }): string => {
    const classes = [base];

    for (const [key, values] of Object.entries(variants)) {
      const value = properties[key];

      if (value && values[value]) {
        classes.push(values[value]);
      }
    }

    if (properties.className) {
      classes.push(cn(properties.className));
    }

    return cn(classes);
  };
}

/**
 * Toggle Tailwind classes based on condition
 * @param {boolean} condition - Boolean condition
 * @param {string} trueClasses - Classes to apply if true
 * @param {string} [falseClasses] - Classes to apply if false
 * @returns {string} Resulting class string
 */
export function tw(condition: boolean, trueClasses: string, falseClasses = ''): string {
  return cn(condition ? trueClasses : falseClasses);
}

/**
 * Responsive Tailwind class builder
 * @param {object} classes - Object containing breakpoint-specific classes
 * @param {string} [classes.base] - Base classes
 * @param {string} [classes.sm] - Classes for sm breakpoint
 * @param {string} [classes.md] - Classes for md breakpoint
 * @param {string} [classes.lg] - Classes for lg breakpoint
 * @param {string} [classes.xl] - Classes for xl breakpoint
 
 * @returns {string} Responsive class string
 */
export function responsive(classes: {
  base?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  '2xl'?: string;
}): string {
  const responsiveClasses: string[] = [];

  if (classes.base) {
    responsiveClasses.push(classes.base);
  }
  if (classes.sm) {
    responsiveClasses.push(`sm:${classes.sm}`);
  }
  if (classes.md) {
    responsiveClasses.push(`md:${classes.md}`);
  }
  if (classes.lg) {
    responsiveClasses.push(`lg:${classes.lg}`);
  }
  if (classes.xl) {
    responsiveClasses.push(`xl:${classes.xl}`);
  }
  if (classes['2xl']) {
    responsiveClasses.push(`2xl:${classes['2xl']}`);
  }

  return cn(responsiveClasses);
}
