import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

/**
 * Card **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {base, header, body, footer} = card({...})
 *
 * <div className={base()}>
 *    <div className={header()}>Header</div>
 *    <div className={body()}>Body</div>
 *    <div className={footer()}>Footer</div>
 * </div>
 * ```
 */
const card = tv({
  slots: {
    base: [
      'flex',
      'flex-col',
      'relative',
      'overflow-hidden',
      'h-auto',
      'text-foreground',
      'box-border',
      'bg-card',
      'border',
      'border-border',
    ],
    header: [
      'flex',
      'p-6',
      'z-10',
      'w-full',
      'justify-start',
      'items-center',
      'shrink-0',
      'overflow-inherit',
      'color-inherit',
      'subpixel-antialiased',
    ],
    body: [
      'relative',
      'flex',
      'flex-1',
      'w-full',
      'p-6',
      'pt-0',
      'flex-auto',
      'flex-col',
      'place-content-inherit',
      'align-items-inherit',
      'h-auto',
      'break-words',
      'text-left',
      'overflow-y-auto',
      'subpixel-antialiased',
    ],
    footer: [
      'p-6',
      'pt-0',
      'h-auto',
      'flex',
      'w-full',
      'items-center',
      'overflow-hidden',
      'color-inherit',
      'subpixel-antialiased',
    ],
  },
  variants: {
    shadow: {
      none: {
        base: 'shadow-none',
      },
      sm: {
        base: 'shadow-sm',
      },
      md: {
        base: 'shadow-md',
      },
      lg: {
        base: 'shadow-lg',
      },
    },
    radius: {
      none: {
        base: 'rounded-none',
        header: 'rounded-none',
        footer: 'rounded-none',
      },
      sm: {
        base: 'rounded-sm',
        header: 'rounded-t-sm',
        footer: 'rounded-b-sm',
      },
      md: {
        base: 'rounded-md',
        header: 'rounded-t-md',
        footer: 'rounded-b-md',
      },
      lg: {
        base: 'rounded-lg',
        header: 'rounded-t-lg',
        footer: 'rounded-b-lg',
      },
    },
    variant: {
      default: {},
      elevated: {
        base: 'shadow-md',
      },
      outlined: {
        base: 'border-2',
      },
    },
    padding: {
      none: {
        header: 'p-0',
        body: 'p-0',
        footer: 'p-0',
      },
      sm: {
        header: 'p-4',
        body: 'p-4 pt-0',
        footer: 'p-4 pt-0',
      },
      md: {
        header: 'p-6',
        body: 'p-6 pt-0',
        footer: 'p-6 pt-0',
      },
      lg: {
        header: 'p-8',
        body: 'p-8 pt-0',
        footer: 'p-8 pt-0',
      },
    },
    fullWidth: {
      true: {
        base: 'w-full',
      },
    },
    isHoverable: {
      true: {
        base: 'hover:bg-muted/50 transition-colors',
      },
    },
    isPressable: {
      true: {
        base: 'cursor-pointer',
      },
    },
    isDisabled: {
      true: {
        base: 'opacity-50 cursor-not-allowed',
      },
    },
    disableAnimation: {
      true: '',
      false: {
        base: 'transition-all',
      },
    },
  },
  compoundVariants: [
    {
      isPressable: true,
      class: 'active:scale-[0.98] tap-highlight-transparent',
    },
  ],
  defaultVariants: {
    radius: 'lg',
    shadow: 'sm',
    variant: 'default',
    padding: 'md',
    fullWidth: false,
    isHoverable: false,
    isPressable: false,
    isDisabled: false,
    disableAnimation: false,
  },
});

export type CardVariantProps = VariantProps<typeof card>;
export type CardSlots = keyof ReturnType<typeof card>;
export type CardReturnType = ReturnType<typeof card>;

export { card };