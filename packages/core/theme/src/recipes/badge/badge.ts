import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';

export const badge = tv({
  slots: {
    root: [
      'ideasui-badge',
      'inline-flex items-center justify-center',
      'font-semibold leading-none whitespace-nowrap',
      'border transition-opacity duration-150',
    ],
    anchor: 'ideasui-badge-anchor relative inline-flex shrink-0',
    badgeWrapper: 'ideasui-badge-anchor__wrapper absolute z-10',
  },

  variants: {
    variant: {
      solid: {
        root: 'ideasui-badge--solid border-transparent',
      },
      soft: {
        root: 'ideasui-badge--soft border-transparent',
      },
      outline: {
        root: 'ideasui-badge--outline bg-transparent',
      },
      ghost: {
        root: 'ideasui-badge--ghost bg-transparent border-transparent',
      },
    },

    color: {
      primary: { root: 'ideasui-badge--primary' },
      neutral: { root: 'ideasui-badge--neutral' },
      success: { root: 'ideasui-badge--success' },
      warning: { root: 'ideasui-badge--warning' },
      danger: { root: 'ideasui-badge--danger' },
    },

    size: {
      sm: {
        root: 'ideasui-badge--sm h-4 min-w-4 px-1 text-[10px] rounded-full',
        badgeWrapper: 'min-w-4',
      },
      md: {
        root: 'ideasui-badge--md h-5 min-w-5 px-1.5 text-xs rounded-full',
        badgeWrapper: 'min-w-5',
      },
      lg: {
        root: 'ideasui-badge--lg h-6 min-w-6 px-2 text-xs rounded-full',
        badgeWrapper: 'min-w-6',
      },
    },

    placement: {
      'top-right': {
        badgeWrapper:
          'ideasui-badge-anchor__wrapper--top-right top-0 right-0 translate-x-1/2 -translate-y-1/2',
      },
      'top-left': {
        badgeWrapper:
          'ideasui-badge-anchor__wrapper--top-left top-0 left-0 -translate-x-1/2 -translate-y-1/2',
      },
      'bottom-right': {
        badgeWrapper:
          'ideasui-badge-anchor__wrapper--bottom-right bottom-0 right-0 translate-x-1/2 translate-y-1/2',
      },
      'bottom-left': {
        badgeWrapper:
          'ideasui-badge-anchor__wrapper--bottom-left bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
      },
    },

    isDot: {
      true: {
        root: 'ideasui-badge--dot p-0 min-w-0 rounded-full',
      },
    },

    isInvisible: {
      true: {
        root: 'ideasui-badge--invisible opacity-0 pointer-events-none',
      },
    },
  },

  compoundVariants: [
    // solid + color
    { variant: 'solid', color: 'primary', class: { root: 'bg-primary text-on-primary' } },
    { variant: 'solid', color: 'neutral', class: { root: 'bg-neutral text-on-neutral' } },
    { variant: 'solid', color: 'success', class: { root: 'bg-success text-on-success' } },
    { variant: 'solid', color: 'warning', class: { root: 'bg-warning text-on-warning' } },
    { variant: 'solid', color: 'danger', class: { root: 'bg-danger text-on-danger' } },

    // soft + color
    { variant: 'soft', color: 'primary', class: { root: 'bg-primary-subtle text-primary' } },
    { variant: 'soft', color: 'neutral', class: { root: 'bg-neutral-subtle text-neutral' } },
    { variant: 'soft', color: 'success', class: { root: 'bg-success-subtle text-success' } },
    { variant: 'soft', color: 'warning', class: { root: 'bg-warning-subtle text-warning' } },
    { variant: 'soft', color: 'danger', class: { root: 'bg-danger-subtle text-danger' } },

    // outline + color
    { variant: 'outline', color: 'primary', class: { root: 'border-primary text-primary' } },
    { variant: 'outline', color: 'neutral', class: { root: 'border-neutral text-neutral' } },
    { variant: 'outline', color: 'success', class: { root: 'border-success text-success' } },
    { variant: 'outline', color: 'warning', class: { root: 'border-warning text-warning' } },
    { variant: 'outline', color: 'danger', class: { root: 'border-danger text-danger' } },

    // ghost + color
    { variant: 'ghost', color: 'primary', class: { root: 'text-primary' } },
    { variant: 'ghost', color: 'neutral', class: { root: 'text-neutral' } },
    { variant: 'ghost', color: 'success', class: { root: 'text-success' } },
    { variant: 'ghost', color: 'warning', class: { root: 'text-warning' } },
    { variant: 'ghost', color: 'danger', class: { root: 'text-danger' } },

    // dot sizes
    { isDot: true, size: 'sm', class: { root: 'size-2 min-w-0' } },
    { isDot: true, size: 'md', class: { root: 'size-2.5 min-w-0' } },
    { isDot: true, size: 'lg', class: { root: 'size-3 min-w-0' } },
  ],

  defaultVariants: {
    variant: 'solid',
    color: 'primary',
    size: 'md',
    placement: 'top-right',
    isDot: false,
    isInvisible: false,
  },
});

export type BadgeVariants = VariantProps<typeof badge>;
export type BadgeVariantProps = VariantProps<typeof badge>;
export type BadgeSlots = keyof ReturnType<typeof badge>;
export type BadgeReturnType = ReturnType<typeof badge>;
