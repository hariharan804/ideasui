import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';

export const avatar = tv({
  slots: {
    root: [
      'ideasui-avatar',
      'relative inline-flex items-center justify-center shrink-0',
      'font-semibold uppercase select-none overflow-hidden',
      'transition-opacity duration-150',
    ],
    image: 'ideasui-avatar__image w-full h-full object-cover',
    fallback: 'ideasui-avatar__fallback absolute inset-0 flex items-center justify-center',
    icon: 'ideasui-avatar__icon flex items-center justify-center',
  },

  variants: {
    variant: {
      solid: {
        root: 'border-transparent',
      },
      soft: {
        root: 'border-transparent',
      },
      outline: {
        root: 'bg-transparent',
      },
      ghost: {
        root: 'bg-transparent border-transparent',
      },
    },

    color: {
      primary: {},
      neutral: {},
      success: {},
      warning: {},
      danger: {},
    },

    size: {
      xs: {
        root: 'size-6 text-[10px]',
        icon: 'size-3',
        fallback: 'text-[10px]',
      },
      sm: {
        root: 'size-8 text-xs',
        icon: 'size-3.5',
        fallback: 'text-xs',
      },
      md: {
        root: 'size-10 text-sm',
        icon: 'size-4',
        fallback: 'text-sm',
      },
      lg: {
        root: 'size-12 text-base',
        icon: 'size-5',
        fallback: 'text-base',
      },
      xl: {
        root: 'size-16 text-lg',
        icon: 'size-6',
        fallback: 'text-lg',
      },
    },

    shape: {
      circle: { root: 'rounded-full' },
      square: { root: 'rounded-lg' },
    },

    isBordered: {
      true: {
        root: 'ring-2 ring-offset-2 ring-offset-surface-default',
      },
    },

    isDisabled: {
      true: {
        root: 'opacity-50 pointer-events-none',
      },
    },
  },

  compoundVariants: [
    // solid + color
    { variant: 'solid', color: 'primary', class: { root: 'bg-primary text-white' } },
    { variant: 'solid', color: 'neutral', class: { root: 'bg-neutral text-white' } },
    { variant: 'solid', color: 'success', class: { root: 'bg-success text-white' } },
    { variant: 'solid', color: 'warning', class: { root: 'bg-warning text-white' } },
    { variant: 'solid', color: 'danger', class: { root: 'bg-danger text-white' } },

    // soft + color
    { variant: 'soft', color: 'primary', class: { root: 'bg-primary-subtle text-primary' } },
    { variant: 'soft', color: 'neutral', class: { root: 'bg-neutral-subtle text-neutral' } },
    { variant: 'soft', color: 'success', class: { root: 'bg-success-subtle text-success' } },
    { variant: 'soft', color: 'warning', class: { root: 'bg-warning-subtle text-warning' } },
    { variant: 'soft', color: 'danger', class: { root: 'bg-danger-subtle text-danger' } },

    // outline + color
    { variant: 'outline', color: 'primary', class: { root: 'border border-primary text-primary' } },
    { variant: 'outline', color: 'neutral', class: { root: 'border border-neutral text-neutral' } },
    { variant: 'outline', color: 'success', class: { root: 'border border-success text-success' } },
    { variant: 'outline', color: 'warning', class: { root: 'border border-warning text-warning' } },
    { variant: 'outline', color: 'danger', class: { root: 'border border-danger text-danger' } },

    // ghost + color
    { variant: 'ghost', color: 'primary', class: { root: 'text-primary' } },
    { variant: 'ghost', color: 'neutral', class: { root: 'text-neutral' } },
    { variant: 'ghost', color: 'success', class: { root: 'text-success' } },
    { variant: 'ghost', color: 'warning', class: { root: 'text-warning' } },
    { variant: 'ghost', color: 'danger', class: { root: 'text-danger' } },

    // bordered ring color per color scheme
    { isBordered: true, color: 'primary', class: { root: 'ring-primary' } },
    { isBordered: true, color: 'neutral', class: { root: 'ring-neutral' } },
    { isBordered: true, color: 'success', class: { root: 'ring-success' } },
    { isBordered: true, color: 'warning', class: { root: 'ring-warning' } },
    { isBordered: true, color: 'danger', class: { root: 'ring-danger' } },
  ],

  defaultVariants: {
    variant: 'soft',
    color: 'neutral',
    size: 'md',
    shape: 'circle',
    isBordered: false,
    isDisabled: false,
  },
});

export const avatarGroup = tv({
  slots: {
    root: 'ideasui-avatar-group flex flex-row items-center',
    overflow: [
      'ideasui-avatar-group__overflow',
      'relative inline-flex items-center justify-center shrink-0',
      'font-semibold uppercase select-none',
      'bg-surface-muted text-content-secondary',
      'ring-2 ring-surface-default',
    ],
  },
  variants: {
    size: {
      xs: { overflow: 'size-6 text-[10px] rounded-full' },
      sm: { overflow: 'size-8 text-xs rounded-full' },
      md: { overflow: 'size-10 text-sm rounded-full' },
      lg: { overflow: 'size-12 text-base rounded-full' },
      xl: { overflow: 'size-16 text-lg rounded-full' },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type AvatarVariants = VariantProps<typeof avatar>;
export type AvatarGroupVariants = VariantProps<typeof avatarGroup>;
export type AvatarReturnType = ReturnType<typeof avatar>;
export type AvatarGroupReturnType = ReturnType<typeof avatarGroup>;
export type AvatarSlots = keyof AvatarReturnType;
