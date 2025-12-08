import { tv } from 'tailwind-variants';

/**
 * Input variants for form components
 */
export const inputVariants = tv({
  base: [
    'w-full px-3 py-2',
    'border border-gray-300 rounded-md',
    'bg-white text-gray-900',
    'placeholder:text-gray-500',
    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'transition-colors duration-200',
  ],
  variants: {
    size: {
      sm: 'h-8 px-2 text-sm',
      md: 'h-10 px-3 text-sm',
      lg: 'h-12 px-4 text-base',
    },
    variant: {
      default: '',
      filled: 'bg-gray-50 border-transparent focus:bg-white',
      flushed: 'px-0 border-0 border-b-2 rounded-none focus:ring-0',
    },
    state: {
      default: '',
      error: 'border-red-500 focus:ring-red-500',
      success: 'border-green-500 focus:ring-green-500',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
    state: 'default',
  },
});