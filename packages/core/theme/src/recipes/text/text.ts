import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';

/**
 * Text recipe — maps variant props → BEM class names only.
 * Structural and utility styles live in text.css.
 */
export const text = tv({
  base: 'ideasui-text',

  variants: {
    variant: {
      body: 'ideasui-text--body',
      label: 'ideasui-text--label',
      caption: 'ideasui-text--caption',
      overline: 'ideasui-text--overline',
      code: 'ideasui-text--code',
      lead: 'ideasui-text--lead',
      helper: 'ideasui-text--helper',
      h1: 'ideasui-text--h1',
      h2: 'ideasui-text--h2',
      h3: 'ideasui-text--h3',
      h4: 'ideasui-text--h4',
      h5: 'ideasui-text--h5',
      h6: 'ideasui-text--h6',
    },

    size: {
      xs: 'ideasui-text--size-xs',
      sm: 'ideasui-text--size-sm',
      md: 'ideasui-text--size-md',
      lg: 'ideasui-text--size-lg',
      xl: 'ideasui-text--size-xl',
      '2xl': 'ideasui-text--size-2xl',
      '3xl': 'ideasui-text--size-3xl',
      '4xl': 'ideasui-text--size-4xl',
      '5xl': 'ideasui-text--size-5xl',
    },

    weight: {
      regular: 'ideasui-text--weight-regular',
      medium: 'ideasui-text--weight-medium',
      semibold: 'ideasui-text--weight-semibold',
      bold: 'ideasui-text--weight-bold',
    },

    color: {
      primary: 'ideasui-text--color-primary',
      secondary: 'ideasui-text--color-secondary',
      tertiary: 'ideasui-text--color-tertiary',
      muted: 'ideasui-text--color-muted',
      inverse: 'ideasui-text--color-inverse',
      success: 'ideasui-text--color-success',
      warning: 'ideasui-text--color-warning',
      danger: 'ideasui-text--color-danger',
      info: 'ideasui-text--color-info',
    },

    align: {
      start: 'ideasui-text--align-start',
      center: 'ideasui-text--align-center',
      end: 'ideasui-text--align-end',
      justify: 'ideasui-text--align-justify',
    },

    truncate: {
      true: 'ideasui-text--truncate',
    },

    lineClamp: {
      true: 'ideasui-text--line-clamp',
    },
  },

  defaultVariants: {
    variant: 'body',
    size: 'md',
    weight: 'regular',
    color: 'primary',
    align: 'start',
    truncate: false,
    lineClamp: false,
  },
});

export type TextVariantProps = VariantProps<typeof text>;
export type TextSlots = keyof ReturnType<typeof text>;
export type TextReturnType = ReturnType<typeof text>;
