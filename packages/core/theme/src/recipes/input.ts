import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

/**
 * Input **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {base, input, label, helper, error} = input({...})
 *
 * <div className={base()}>
 *    <label className={label()}>Label</label>
 *    <input className={input()} />
 *    <span className={helper()}>Helper text</span>
 * </div>
 * ```
 */
const input = tv({
  slots: {
    base: ['relative', 'flex', 'flex-col', 'w-full'],
    label: [
      'block',
      'text-sm',
      'font-medium',
      'text-foreground',
      'mb-2',
      'origin-top-left',
      'subpixel-antialiased',
    ],
    input: [
      'flex',
      'w-full',
      'border',
      'border-input',
      'bg-background',
      'ring-offset-background',
      'file:border-0',
      'file:bg-transparent',
      'file:text-sm',
      'file:font-medium',
      'placeholder:text-muted-foreground',
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-ring',
      'focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed',
      'disabled:opacity-50',
    ],
    startIcon: [
      'absolute',
      'left-3',
      'top-1/2',
      '-translate-y-1/2',
      'text-muted-foreground',
      'pointer-events-none',
    ],
    endIcon: [
      'absolute',
      'right-3',
      'top-1/2',
      '-translate-y-1/2',
      'text-muted-foreground',
      'pointer-events-none',
    ],
    helper: ['mt-1', 'text-xs', 'text-muted-foreground'],
    error: ['mt-1', 'text-xs', 'text-danger'],
  },
  variants: {
    size: {
      sm: {
        input: 'h-8 px-2 text-xs rounded-sm',
        startIcon: 'h-3 w-3',
        endIcon: 'h-3 w-3',
      },
      md: {
        input: 'h-10 px-3 text-sm rounded-md',
        startIcon: 'h-4 w-4',
        endIcon: 'h-4 w-4',
      },
      lg: {
        input: 'h-12 px-4 text-base rounded-lg',
        startIcon: 'h-5 w-5',
        endIcon: 'h-5 w-5',
      },
    },
    variant: {
      default: {},
      filled: {
        input: 'bg-muted border-transparent',
      },
      flushed: {
        input: 'rounded-none border-x-0 border-t-0 border-b-2 px-0',
      },
    },
    radius: {
      none: {
        input: 'rounded-none',
      },
      sm: {
        input: 'rounded-sm',
      },
      md: {
        input: 'rounded-md',
      },
      lg: {
        input: 'rounded-lg',
      },
    },
    isInvalid: {
      true: {
        input: 'border-danger focus-visible:ring-danger',
        label: 'text-danger',
      },
    },
    isDisabled: {
      true: {
        input: 'cursor-not-allowed opacity-50',
        label: 'cursor-not-allowed opacity-50',
      },
    },
    disableAnimation: {
      true: '',
      false: {
        input: 'transition-colors',
        label: 'transition-colors',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
    radius: 'md',
    isInvalid: false,
    isDisabled: false,
    disableAnimation: false,
  },
});

export type InputVariantProps = VariantProps<typeof input>;
export type InputSlots = keyof ReturnType<typeof input>;
export type InputReturnType = ReturnType<typeof input>;

export { input };