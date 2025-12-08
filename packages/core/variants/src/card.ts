import { tv } from 'tailwind-variants';

/**
 * Card variants for container components
 */
export const cardVariants = tv({
  base: [
    'bg-white border border-gray-200 rounded-lg',
    'shadow-sm',
  ],
  variants: {
    variant: {
      default: '',
      outlined: 'border-2',
      elevated: 'shadow-lg border-0',
      filled: 'bg-gray-50',
    },
    size: {
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
      xl: 'p-8',
    },
    radius: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
    radius: 'lg',
  },
});