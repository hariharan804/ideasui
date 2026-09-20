import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';

/**
 * Text recipe — maps typography props to Tailwind class names.
 */
export const text = tv({
  base: ['text-content-primary', 'transition-colors', 'duration-150'],

  variants: {
    variant: {
      body: 'text-base leading-relaxed',
      label: 'text-sm font-medium tracking-tight',
      caption: 'text-content-tertiary text-xs leading-normal',
      overline: 'text-content-tertiary text-[10px] font-bold tracking-widest uppercase',
      code: 'font-mono text-xs bg-surface-muted px-1.5 py-0.5 rounded-md',
      lead: 'text-lg font-normal leading-relaxed sm:text-xl',
      helper: 'text-content-secondary text-xs leading-normal',
      h1: 'text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl',
      h2: 'text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl',
      h3: 'text-xl font-bold tracking-tight sm:text-2xl md:text-3xl',
      h4: 'text-lg font-semibold tracking-tight sm:text-xl',
      h5: 'text-base font-semibold tracking-tight sm:text-lg',
      h6: 'text-sm font-semibold tracking-tight',
    },

    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
    },

    weight: {
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },

    color: {
      primary: 'text-content-primary',
      secondary: 'text-content-secondary',
      tertiary: 'text-content-tertiary',
      muted: 'text-content-muted',
      inverse: 'text-content-inverse',
      success: 'text-success',
      warning: 'text-warning',
      danger: 'text-danger',
      info: 'text-info',
    },

    align: {
      start: 'text-start',
      center: 'text-center',
      end: 'text-end',
      justify: 'text-justify',
    },

    truncate: {
      true: 'truncate',
    },

    lineClamp: {
      true: 'line-clamp-[var(--ideasui-line-clamp)]',
    },
  },

  defaultVariants: {
    variant: 'body',
    align: 'start',
    truncate: false,
  },
});

export type TextVariantProps = VariantProps<typeof text>;
export type TextSlots = keyof ReturnType<typeof text>;
export type TextReturnType = ReturnType<typeof text>;
