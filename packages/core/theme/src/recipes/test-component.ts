import { tv } from 'tailwind-variants';

// BEM base class names
const BEM_BASE = 'test-component';
const BEM_SOLID = 'test-component--solid';
const BEM_OUTLINE = 'test-component--outline';
const BEM_GHOST = 'test-component--ghost';

/**
 * TestComponent component recipe
 * @see https://www.tailwind-variants.org
 */
export const testComponentRecipe = tv({
  base: [
    BEM_BASE, // BEM base class for debugging
    // Base styles here
    'inline-flex',
    'items-center',
    'justify-center',
  ],
  variants: {
    variant: {
      solid: [BEM_SOLID, ''],
      outline: [BEM_OUTLINE, 'border-2', 'bg-transparent'],
      ghost: [BEM_GHOST, 'bg-transparent'],
    },
    size: {
      sm: ['test-component--sm', 'text-sm', 'px-3', 'py-2'],
      md: ['test-component--md', 'text-base', 'px-4', 'py-2'],
      lg: ['test-component--lg', 'text-lg', 'px-6', 'py-3'],
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
