import { tv } from 'tailwind-variants';
import { RADIUS_VARIANTS, COLOR_VARIANTS } from '../constants/variants';

/**
 * {{pascalCase name}} component variants
 */
export const {{camelCase name}} = tv({
  base: [
    // Base styles here
    'inline-flex',
    'items-center',
    'justify-center',
  ],
  variants: {
    variant: {
      solid: '',
      outline: 'border-2 bg-transparent',
      ghost: 'bg-transparent',
    },
    size: {
      xs: 'text-xs px-2 py-1',
      sm: 'text-sm px-3 py-2', 
      md: 'text-base px-4 py-2',
      lg: 'text-lg px-6 py-3',
      xl: 'text-xl px-8 py-4',
    },
    color: Object.fromEntries(
      Object.keys(COLOR_VARIANTS).map(color => [color, {}])
    ) as Record<keyof typeof COLOR_VARIANTS, {}>,
    radius: {
      none: { base: RADIUS_VARIANTS.none },
      sm: { base: RADIUS_VARIANTS.sm },
      md: { base: RADIUS_VARIANTS.md },
      lg: { base: RADIUS_VARIANTS.lg },
      xl: { base: RADIUS_VARIANTS.xl },
      full: { base: RADIUS_VARIANTS.full },
    },
    isDisabled: {
      true: 'opacity-50 cursor-not-allowed pointer-events-none',
    },
  },
  compoundVariants: [
    // Add compound variants here based on your color system
    {
      variant: 'solid',
      color: 'primary',
      class: 'bg-primary-500 text-white hover:bg-primary-600',
    },
    // Add more compound variants as needed
  ],
  defaultVariants: {
    variant: 'solid',
    size: 'md',
    color: 'primary',
    radius: 'md',
    isDisabled: false,
  },
});