import { tv } from 'tailwind-variants';

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
      sm: 'text-sm px-3 py-2',
      md: 'text-base px-4 py-2',
      lg: 'text-lg px-6 py-3',
    },
    color: {
      primary: 'bg-primary-500 text-white',
      secondary: 'bg-secondary-500 text-white',
      danger: 'bg-danger-500 text-white',
      success: 'bg-success-500 text-white',
    },
    isDisabled: {
      true: 'opacity-50 cursor-not-allowed pointer-events-none',
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
    color: 'primary',
    isDisabled: false,
  },
});