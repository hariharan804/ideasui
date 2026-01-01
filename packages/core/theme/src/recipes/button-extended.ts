import { button } from './button';

// Method 1: Extend existing variant
export const extendedButton = button.extend({
  variants: {
    // Add new variant
    variant: {
      gradient: {
        base: 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white',
      },
    },
    // Add new size
    size: {
      '2xl': {
        base: 'h-14 px-12 text-xl rounded-xl',
        icon: 'h-7 w-7',
      },
    },
    // Add new property
    loading: {
      true: {
        base: 'cursor-wait opacity-75',
        icon: 'animate-spin',
      },
    },
  },
  compoundVariants: [
    {
      variant: 'gradient',
      color: 'primary',
      class: { base: 'from-primary-400 to-primary-600' },
    },
  ],
});

// Method 2: Override defaults
export const primaryButton = button.extend({
  defaultVariants: {
    variant: 'solid',
    color: 'primary',
    size: 'lg',
  },
});

// Method 3: Create specialized variant
export const iconButton = button.extend({
  variants: {
    size: {
      sm: { base: 'h-8 w-8', icon: 'h-4 w-4' },
      md: { base: 'h-10 w-10', icon: 'h-5 w-5' },
      lg: { base: 'h-12 w-12', icon: 'h-6 w-6' },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'ghost',
  },
});

export type ExtendedButtonProps = Parameters<typeof extendedButton>[0];
export type PrimaryButtonProps = Parameters<typeof primaryButton>[0];
export type IconButtonProps = Parameters<typeof iconButton>[0];