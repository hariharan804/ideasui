import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

/**
 * Button **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {base, icon, label} = button({...})
 *
 * <button className={base()}>
 *    <span className={icon()}>Icon</span>
 *    <span className={label()}>Label</span>
 * </button>
 * ```
 */
const button = tv({
  slots: {
    base: [
      'inline-flex',
      'items-center',
      'justify-center',
      'font-medium',
      'transition-colors',
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-ring',
      'focus-visible:ring-offset-2',
      'disabled:opacity-50',
      'disabled:pointer-events-none',
    ],
    icon: ['shrink-0'],
    label: ['truncate'],
  },
  variants: {
    variant: {
      solid: {
        base: 'bg-primary text-primary-foreground hover:bg-primary/90',
      },
      outline: {
        base: 'border border-input bg-background hover:bg-muted hover:text-muted-foreground',
      },
      ghost: {
        base: 'hover:bg-muted hover:text-muted-foreground',
      },
      link: {
        base: 'text-primary underline-offset-4 hover:underline',
      },
    },
    size: {
      sm: {
        base: 'h-9 px-3 text-sm rounded-md',
        icon: 'h-4 w-4',
      },
      md: {
        base: 'h-10 px-4 py-2 text-sm rounded-md',
        icon: 'h-4 w-4',
      },
      lg: {
        base: 'h-11 px-8 text-base rounded-lg',
        icon: 'h-5 w-5',
      },
      icon: {
        base: 'h-10 w-10 rounded-md',
        icon: 'h-4 w-4',
      },
    },
    color: {
      primary: {},
      secondary: {
        base: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      },
      success: {
        base: 'bg-success text-success-foreground hover:bg-success/90',
      },
      warning: {
        base: 'bg-warning text-warning-foreground hover:bg-warning/90',
      },
      danger: {
        base: 'bg-danger text-danger-foreground hover:bg-danger/90',
      },
      info: {
        base: 'bg-info text-info-foreground hover:bg-info/90',
      },
    },
    isDisabled: {
      true: {
        base: 'opacity-50 cursor-not-allowed pointer-events-none',
      },
    },
    disableAnimation: {
      true: '',
      false: {
        base: 'transition-colors',
      },
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
    color: 'primary',
    isDisabled: false,
    disableAnimation: false,
  },
});

export type ButtonVariantProps = VariantProps<typeof button>;
export type ButtonSlots = keyof ReturnType<typeof button>;
export type ButtonReturnType = ReturnType<typeof button>;

export { button };