import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';

export const badge = tv({
  slots: {
    root: 'ideasui-badge-root relative inline-flex shrink-0',
    badge: [
      'ideasui-badge',
      'inline-flex items-center justify-center',
      'font-semibold leading-none whitespace-nowrap',
      'border transition-[transform,opacity] duration-200 ease-in-out',
    ],
    anchor: 'ideasui-badge-anchor relative inline-flex shrink-0',
    badgeWrapper: 'ideasui-badge-anchor__wrapper absolute z-10',
  },

  variants: {
    variant: {
      standard: { badge: 'ideasui-badge--standard border-transparent' },
      solid: { badge: 'ideasui-badge--solid border-transparent' },
      soft: { badge: 'ideasui-badge--soft border-transparent' },
      outline: { badge: 'ideasui-badge--outline bg-transparent' },
      ghost: { badge: 'ideasui-badge--ghost bg-transparent border-transparent' },
      dot: { badge: 'ideasui-badge--dot p-0 min-w-0 rounded-full border-transparent' },
    },

    color: {
      primary: { badge: 'ideasui-badge--primary' },
      secondary: { badge: 'ideasui-badge--secondary' },
      neutral: { badge: 'ideasui-badge--neutral' },
      default: { badge: 'ideasui-badge--neutral' },
      success: { badge: 'ideasui-badge--success' },
      warning: { badge: 'ideasui-badge--warning' },
      danger: { badge: 'ideasui-badge--danger' },
      error: { badge: 'ideasui-badge--danger' },
      info: { badge: 'ideasui-badge--info' },
    },

    size: {
      sm: {
        badge: 'ideasui-badge--sm h-4 min-w-4 px-1 text-[10px] rounded-full',
        badgeWrapper: 'min-w-4',
      },
      md: {
        badge: 'ideasui-badge--md h-5 min-w-5 px-1.5 text-xs rounded-full',
        badgeWrapper: 'min-w-5',
      },
      lg: {
        badge: 'ideasui-badge--lg h-6 min-w-6 px-2 text-xs rounded-full',
        badgeWrapper: 'min-w-6',
      },
    },

    placement: {
      'top-right': {
        badge: 'ideasui-badge--top-right origin-top-right',
        badgeWrapper:
          'ideasui-badge-anchor__wrapper--top-right top-0 right-0 translate-x-1/2 -translate-y-1/2',
      },
      'top-left': {
        badge: 'ideasui-badge--top-left origin-top-left',
        badgeWrapper:
          'ideasui-badge-anchor__wrapper--top-left top-0 left-0 -translate-x-1/2 -translate-y-1/2',
      },
      'bottom-right': {
        badge: 'ideasui-badge--bottom-right origin-bottom-right',
        badgeWrapper:
          'ideasui-badge-anchor__wrapper--bottom-right bottom-0 right-0 translate-x-1/2 translate-y-1/2',
      },
      'bottom-left': {
        badge: 'ideasui-badge--bottom-left origin-bottom-left',
        badgeWrapper:
          'ideasui-badge-anchor__wrapper--bottom-left bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
      },
    },

    overlap: {
      rectangular: {
        badge: 'ideasui-badge--overlap-rectangular',
      },
      circular: {
        badge: 'ideasui-badge--overlap-circular',
      },
    },

    isAnchored: {
      true: {
        badge: 'absolute z-10',
      },
      false: {
        badge: 'relative',
      },
    },

    bordered: {
      true: {
        badge: 'ideasui-badge--bordered ring-2 ring-surface',
      },
    },

    isDot: {
      true: {
        badge: 'ideasui-badge--dot p-0 min-w-0 rounded-full',
      },
    },

    isInvisible: {
      true: {
        badge: 'ideasui-badge--invisible scale-0 opacity-0 pointer-events-none',
      },
      false: {
        badge: 'scale-100 opacity-100',
      },
    },
  },

  compoundVariants: [
    // Rectangular overlap placements
    {
      isAnchored: true,
      overlap: 'rectangular',
      placement: 'top-right',
      class: { badge: 'top-0 right-0 translate-x-1/2 -translate-y-1/2' },
    },
    {
      isAnchored: true,
      overlap: 'rectangular',
      placement: 'top-left',
      class: { badge: 'top-0 left-0 -translate-x-1/2 -translate-y-1/2' },
    },
    {
      isAnchored: true,
      overlap: 'rectangular',
      placement: 'bottom-right',
      class: { badge: 'bottom-0 right-0 translate-x-1/2 translate-y-1/2' },
    },
    {
      isAnchored: true,
      overlap: 'rectangular',
      placement: 'bottom-left',
      class: { badge: 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2' },
    },

    // Circular overlap placements
    {
      isAnchored: true,
      overlap: 'circular',
      placement: 'top-right',
      class: { badge: 'top-[14%] right-[14%] translate-x-1/2 -translate-y-1/2' },
    },
    {
      isAnchored: true,
      overlap: 'circular',
      placement: 'top-left',
      class: { badge: 'top-[14%] left-[14%] -translate-x-1/2 -translate-y-1/2' },
    },
    {
      isAnchored: true,
      overlap: 'circular',
      placement: 'bottom-right',
      class: { badge: 'bottom-[14%] right-[14%] translate-x-1/2 translate-y-1/2' },
    },
    {
      isAnchored: true,
      overlap: 'circular',
      placement: 'bottom-left',
      class: { badge: 'bottom-[14%] left-[14%] -translate-x-1/2 translate-y-1/2' },
    },

    // solid / standard / dot + color
    { variant: 'solid', color: 'primary', class: { badge: 'bg-primary text-on-primary' } },
    { variant: 'standard', color: 'primary', class: { badge: 'bg-primary text-on-primary' } },
    { variant: 'dot', color: 'primary', class: { badge: 'bg-primary text-on-primary' } },
    { variant: 'solid', color: 'secondary', class: { badge: 'bg-secondary text-on-secondary' } },
    { variant: 'standard', color: 'secondary', class: { badge: 'bg-secondary text-on-secondary' } },
    { variant: 'dot', color: 'secondary', class: { badge: 'bg-secondary text-on-secondary' } },
    { variant: 'solid', color: 'neutral', class: { badge: 'bg-neutral text-on-neutral' } },
    { variant: 'standard', color: 'neutral', class: { badge: 'bg-neutral text-on-neutral' } },
    { variant: 'dot', color: 'neutral', class: { badge: 'bg-neutral text-on-neutral' } },
    { variant: 'solid', color: 'default', class: { badge: 'bg-neutral text-on-neutral' } },
    { variant: 'standard', color: 'default', class: { badge: 'bg-neutral text-on-neutral' } },
    { variant: 'dot', color: 'default', class: { badge: 'bg-neutral text-on-neutral' } },
    { variant: 'solid', color: 'success', class: { badge: 'bg-success text-on-success' } },
    { variant: 'standard', color: 'success', class: { badge: 'bg-success text-on-success' } },
    { variant: 'dot', color: 'success', class: { badge: 'bg-success text-on-success' } },
    { variant: 'solid', color: 'warning', class: { badge: 'bg-warning text-on-warning' } },
    { variant: 'standard', color: 'warning', class: { badge: 'bg-warning text-on-warning' } },
    { variant: 'dot', color: 'warning', class: { badge: 'bg-warning text-on-warning' } },
    { variant: 'solid', color: 'danger', class: { badge: 'bg-danger text-on-danger' } },
    { variant: 'standard', color: 'danger', class: { badge: 'bg-danger text-on-danger' } },
    { variant: 'dot', color: 'danger', class: { badge: 'bg-danger text-on-danger' } },
    { variant: 'solid', color: 'error', class: { badge: 'bg-danger text-on-danger' } },
    { variant: 'standard', color: 'error', class: { badge: 'bg-danger text-on-danger' } },
    { variant: 'dot', color: 'error', class: { badge: 'bg-danger text-on-danger' } },
    { variant: 'solid', color: 'info', class: { badge: 'bg-info text-on-info' } },
    { variant: 'standard', color: 'info', class: { badge: 'bg-info text-on-info' } },
    { variant: 'dot', color: 'info', class: { badge: 'bg-info text-on-info' } },

    // soft + color
    { variant: 'soft', color: 'primary', class: { badge: 'bg-primary-subtle text-primary' } },
    { variant: 'soft', color: 'secondary', class: { badge: 'bg-secondary-subtle text-secondary' } },
    { variant: 'soft', color: 'neutral', class: { badge: 'bg-neutral-subtle text-neutral' } },
    { variant: 'soft', color: 'default', class: { badge: 'bg-neutral-subtle text-neutral' } },
    { variant: 'soft', color: 'success', class: { badge: 'bg-success-subtle text-success' } },
    { variant: 'soft', color: 'warning', class: { badge: 'bg-warning-subtle text-warning' } },
    { variant: 'soft', color: 'danger', class: { badge: 'bg-danger-subtle text-danger' } },
    { variant: 'soft', color: 'error', class: { badge: 'bg-danger-subtle text-danger' } },
    { variant: 'soft', color: 'info', class: { badge: 'bg-info-subtle text-info' } },

    // outline + color
    { variant: 'outline', color: 'primary', class: { badge: 'border-primary text-primary' } },
    { variant: 'outline', color: 'secondary', class: { badge: 'border-secondary text-secondary' } },
    { variant: 'outline', color: 'neutral', class: { badge: 'border-neutral text-neutral' } },
    { variant: 'outline', color: 'default', class: { badge: 'border-neutral text-neutral' } },
    { variant: 'outline', color: 'success', class: { badge: 'border-success text-success' } },
    { variant: 'outline', color: 'warning', class: { badge: 'border-warning text-warning' } },
    { variant: 'outline', color: 'danger', class: { badge: 'border-danger text-danger' } },
    { variant: 'outline', color: 'error', class: { badge: 'border-danger text-danger' } },
    { variant: 'outline', color: 'info', class: { badge: 'border-info text-info' } },

    // ghost + color
    { variant: 'ghost', color: 'primary', class: { badge: 'text-primary' } },
    { variant: 'ghost', color: 'secondary', class: { badge: 'text-secondary' } },
    { variant: 'ghost', color: 'neutral', class: { badge: 'text-neutral' } },
    { variant: 'ghost', color: 'default', class: { badge: 'text-neutral' } },
    { variant: 'ghost', color: 'success', class: { badge: 'text-success' } },
    { variant: 'ghost', color: 'warning', class: { badge: 'text-warning' } },
    { variant: 'ghost', color: 'danger', class: { badge: 'text-danger' } },
    { variant: 'ghost', color: 'error', class: { badge: 'text-danger' } },
    { variant: 'ghost', color: 'info', class: { badge: 'text-info' } },

    // dot sizes
    { isDot: true, size: 'sm', class: { badge: 'size-2 min-w-0' } },
    { isDot: true, size: 'md', class: { badge: 'size-2.5 min-w-0' } },
    { isDot: true, size: 'lg', class: { badge: 'size-3 min-w-0' } },
    { variant: 'dot', size: 'sm', class: { badge: 'size-2 min-w-0' } },
    { variant: 'dot', size: 'md', class: { badge: 'size-2.5 min-w-0' } },
    { variant: 'dot', size: 'lg', class: { badge: 'size-3 min-w-0' } },
  ],

  defaultVariants: {
    variant: 'solid',
    color: 'primary',
    size: 'md',
    placement: 'top-right',
    overlap: 'rectangular',
    isAnchored: false,
    bordered: false,
    isDot: false,
    isInvisible: false,
  },
});

export type BadgeVariants = VariantProps<typeof badge>;
export type BadgeVariantProps = VariantProps<typeof badge>;
export type BadgeSlots = keyof ReturnType<typeof badge>;
export type BadgeReturnType = ReturnType<typeof badge>;
