import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';

/**
 * Divider recipe — maps variant props to BEM and Tailwind CSS tokens.
 * Complies with IdeasUI OKLCH semantic token system.
 */
export const divider = tv({
  slots: {
    root: 'ideasui-divider flex items-center shrink-0',
    line: 'ideasui-divider__line flex-1 border-0',
    label:
      'ideasui-divider__label shrink-0 px-3 text-sm text-content-secondary select-none whitespace-nowrap',
  },

  variants: {
    orientation: {
      horizontal: {
        root: 'ideasui-divider--horizontal w-full flex-row',
        line: 'border-t',
      },
      vertical: {
        root: 'ideasui-divider--vertical h-full self-stretch min-h-[1.25rem] flex-col mx-2',
        line: 'border-l',
      },
    },

    variant: {
      solid: {
        root: 'ideasui-divider--solid',
        line: 'ideasui-divider__line--solid border-solid',
      },
      dashed: {
        root: 'ideasui-divider--dashed',
        line: 'ideasui-divider__line--dashed border-dashed',
      },
      dotted: {
        root: 'ideasui-divider--dotted',
        line: 'ideasui-divider__line--dotted border-dotted',
      },
      full: {
        root: 'ideasui-divider--full ideasui-divider--solid',
        line: 'ideasui-divider__line--solid border-solid',
      },
      inset: {
        root: 'ideasui-divider--inset ideasui-divider--inset-start ideasui-divider--solid',
        line: 'ideasui-divider__line--solid border-solid',
      },
      'inset-start': {
        root: 'ideasui-divider--inset ideasui-divider--inset-start ideasui-divider--solid',
        line: 'ideasui-divider__line--solid border-solid',
      },
      'inset-end': {
        root: 'ideasui-divider--inset-end ideasui-divider--solid',
        line: 'ideasui-divider__line--solid border-solid',
      },
      middle: {
        root: 'ideasui-divider--middle ideasui-divider--solid',
        line: 'ideasui-divider__line--solid border-solid',
      },
    },

    layout: {
      full: {
        root: 'ideasui-divider--full',
      },
      inset: {
        root: 'ideasui-divider--inset ideasui-divider--inset-start',
      },
      'inset-start': {
        root: 'ideasui-divider--inset ideasui-divider--inset-start',
      },
      'inset-end': {
        root: 'ideasui-divider--inset-end',
      },
      middle: {
        root: 'ideasui-divider--middle',
      },
    },

    color: {
      default: {
        root: 'ideasui-divider--default border-border-strong',
        line: 'ideasui-divider__line--default border-border-strong',
      },

      primary: {
        root: 'ideasui-divider--primary border-primary',
        line: 'ideasui-divider__line--primary border-primary',
      },
      neutral: {
        root: 'ideasui-divider--neutral border-neutral',
        line: 'ideasui-divider__line--neutral border-neutral',
      },
      success: {
        root: 'ideasui-divider--success border-success',
        line: 'ideasui-divider__line--success border-success',
      },
      warning: {
        root: 'ideasui-divider--warning border-warning',
        line: 'ideasui-divider__line--warning border-warning',
      },
      danger: {
        root: 'ideasui-divider--danger border-danger',
        line: 'ideasui-divider__line--danger border-danger',
      },
    },

    thickness: {
      sm: {
        root: 'ideasui-divider--sm',
        line: 'ideasui-divider__line--sm',
      },
      md: {
        root: 'ideasui-divider--md',
        line: 'ideasui-divider__line--md',
      },
      lg: {
        root: 'ideasui-divider--lg',
        line: 'ideasui-divider__line--lg',
      },
    },

    labelPlacement: {
      start: {
        root: 'ideasui-divider--label-start justify-start',
      },
      center: {
        root: 'ideasui-divider--label-center justify-center',
      },
      end: {
        root: 'ideasui-divider--label-end justify-end',
      },
    },

    hasLabel: {
      true: {
        root: 'ideasui-divider--has-label border-0',
      },
      false: {
        root: 'p-0 m-0',
      },
    },
  },

  compoundVariants: [
    // ── Layout: horizontal ──────────────────────────────────────────
    {
      orientation: 'horizontal',
      layout: 'full',
      class: { root: 'w-full mx-0' },
    },
    {
      orientation: 'horizontal',
      layout: 'inset',
      class: { root: 'ms-16 w-auto' },
    },
    {
      orientation: 'horizontal',
      layout: 'inset-start',
      class: { root: 'ms-16 w-auto' },
    },
    {
      orientation: 'horizontal',
      layout: 'inset-end',
      class: { root: 'me-16 w-auto' },
    },
    {
      orientation: 'horizontal',
      layout: 'middle',
      class: { root: 'mx-6 w-auto' },
    },

    // ── Layout: vertical ────────────────────────────────────────────
    {
      orientation: 'vertical',
      layout: 'full',
      class: { root: 'h-full my-0' },
    },
    {
      orientation: 'vertical',
      layout: 'inset',
      class: { root: 'mt-4 h-[calc(100%-1rem)]' },
    },
    {
      orientation: 'vertical',
      layout: 'inset-start',
      class: { root: 'mt-4 h-[calc(100%-1rem)]' },
    },
    {
      orientation: 'vertical',
      layout: 'inset-end',
      class: { root: 'mb-4 h-[calc(100%-1rem)]' },
    },
    {
      orientation: 'vertical',
      layout: 'middle',
      class: { root: 'my-2.5 h-[calc(100%-1.25rem)]' },
    },

    // ── Direct variant support (when layout is passed via variant) ──
    {
      orientation: 'horizontal',
      variant: 'inset',
      class: { root: 'ms-16 w-auto' },
    },
    {
      orientation: 'horizontal',
      variant: 'inset-start',
      class: { root: 'ms-16 w-auto' },
    },
    {
      orientation: 'horizontal',
      variant: 'inset-end',
      class: { root: 'me-16 w-auto' },
    },
    {
      orientation: 'horizontal',
      variant: 'middle',
      class: { root: 'mx-6 w-auto' },
    },
    {
      orientation: 'horizontal',
      variant: 'full',
      class: { root: 'w-full mx-0' },
    },
    {
      orientation: 'vertical',
      variant: 'inset',
      class: { root: 'mt-4 h-[calc(100%-1rem)]' },
    },
    {
      orientation: 'vertical',
      variant: 'inset-start',
      class: { root: 'mt-4 h-[calc(100%-1rem)]' },
    },
    {
      orientation: 'vertical',
      variant: 'inset-end',
      class: { root: 'mb-4 h-[calc(100%-1rem)]' },
    },
    {
      orientation: 'vertical',
      variant: 'middle',
      class: { root: 'my-2.5 h-[calc(100%-1.25rem)]' },
    },
    {
      orientation: 'vertical',
      variant: 'full',
      class: { root: 'h-full my-0' },
    },

    // Without label: horizontal renders border-t on root
    {
      hasLabel: false,
      orientation: 'horizontal',
      thickness: 'sm',
      class: { root: 'block border-b-0 border-x-0 border-t-[1px]' },
    },
    {
      hasLabel: false,
      orientation: 'horizontal',
      thickness: 'md',
      class: { root: 'block border-b-0 border-x-0 border-t-[2px]' },
    },
    {
      hasLabel: false,
      orientation: 'horizontal',
      thickness: 'lg',
      class: { root: 'block border-b-0 border-x-0 border-t-[4px]' },
    },

    // Without label: vertical renders border-l on root
    {
      hasLabel: false,
      orientation: 'vertical',
      thickness: 'sm',
      class: { root: 'inline-flex border-r-0 border-y-0 border-l-[1px]' },
    },
    {
      hasLabel: false,
      orientation: 'vertical',
      thickness: 'md',
      class: { root: 'inline-flex border-r-0 border-y-0 border-l-[2px]' },
    },
    {
      hasLabel: false,
      orientation: 'vertical',
      thickness: 'lg',
      class: { root: 'inline-flex border-r-0 border-y-0 border-l-[4px]' },
    },

    // With label: horizontal line segments render border-t
    {
      hasLabel: true,
      orientation: 'horizontal',
      thickness: 'sm',
      class: { line: 'border-t-[1px]' },
    },
    {
      hasLabel: true,
      orientation: 'horizontal',
      thickness: 'md',
      class: { line: 'border-t-[2px]' },
    },
    {
      hasLabel: true,
      orientation: 'horizontal',
      thickness: 'lg',
      class: { line: 'border-t-[4px]' },
    },

    // With label: vertical line segments render border-l
    {
      hasLabel: true,
      orientation: 'vertical',
      thickness: 'sm',
      class: { line: 'border-l-[1px]' },
    },
    {
      hasLabel: true,
      orientation: 'vertical',
      thickness: 'md',
      class: { line: 'border-l-[2px]' },
    },
    {
      hasLabel: true,
      orientation: 'vertical',
      thickness: 'lg',
      class: { line: 'border-l-[4px]' },
    },

    // Border styles without label
    {
      hasLabel: false,
      variant: 'solid',
      class: { root: 'border-solid' },
    },
    {
      hasLabel: false,
      variant: 'dashed',
      class: { root: 'border-dashed' },
    },
    {
      hasLabel: false,
      variant: 'dotted',
      class: { root: 'border-dotted' },
    },
    {
      hasLabel: false,
      variant: 'full',
      class: { root: 'border-solid' },
    },
    {
      hasLabel: false,
      variant: 'inset',
      class: { root: 'border-solid' },
    },
    {
      hasLabel: false,
      variant: 'inset-start',
      class: { root: 'border-solid' },
    },
    {
      hasLabel: false,
      variant: 'inset-end',
      class: { root: 'border-solid' },
    },
    {
      hasLabel: false,
      variant: 'middle',
      class: { root: 'border-solid' },
    },
  ],

  defaultVariants: {
    orientation: 'horizontal',
    variant: 'solid',
    layout: 'full',
    color: 'default',
    thickness: 'sm',
    labelPlacement: 'center',
    hasLabel: false,
  },
});

export type DividerVariants = VariantProps<typeof divider>;
export type DividerSlots = keyof ReturnType<typeof divider>;
export type DividerReturnType = ReturnType<typeof divider>;
