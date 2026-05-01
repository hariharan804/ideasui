import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';

// BEM base class names
const BEM_BASE = 'btn';
const BEM_ICON = 'btn__icon';
const BEM_LABEL = 'btn__label';
const BEM_LOADER = 'btn__loader';
const BEM_SOLID = 'btn--solid';
const BEM_OUTLINE = 'btn--outline';
const BEM_GHOST = 'btn--ghost';
const BEM_LINK = 'btn--link';

const TRANSPARENT = 'bg-transparent';
const ROUNDED_MD = 'rounded-md';
const ROUNDED_NONE = 'rounded-none';

const button = tv({
  slots: {
    base: [
      BEM_BASE,
      'inline-flex',
      'items-center',
      'justify-center',
      'gap-2',
      'font-medium',
      'text-surface',
      'transition-all',
      'duration-200',
      'ease-in-out',
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-primary-500',
      'focus-visible:ring-offset-2',
      'disabled:opacity-50',
      'disabled:pointer-events-none',
      'relative overflow-hidden',
      'motion-reduce:transition-none',
      'active:scale-95 motion-reduce:active:scale-100',
    ],
    icon: [BEM_ICON, 'shrink-0'],
    label: [BEM_LABEL, 'truncate'],
    loader: [BEM_LOADER, 'shrink-0'],
  },
  variants: {
    variant: {
      solid: {
        base: [BEM_SOLID, 'text-surface'],
      },
      outline: {
        base: [BEM_OUTLINE, 'border-2', TRANSPARENT],
      },
      ghost: {
        base: [BEM_GHOST, TRANSPARENT],
      },
      soft: {
        base: 'btn--soft',
      },
      link: {
        base: [BEM_LINK, TRANSPARENT, 'underline-offset-4', 'hover:underline', 'font-normal'],
      },
      text: {
        base: [TRANSPARENT, 'font-normal'],
      },
      elevated: {
        base: 'btn--elevated bg-surface shadow-md hover:shadow-lg active:shadow-sm',
      },
    },
    size: {
      xs: {
        base: ['btn--xs', 'h-7', 'px-2', 'text-xs', 'rounded-sm'],
        icon: 'size-3.5',
      },
      sm: {
        base: ['btn--sm', 'h-8', 'px-3', 'text-sm', ROUNDED_MD],
        icon: 'size-4',
      },
      md: {
        base: ['btn--md', 'h-10', 'px-4', 'text-base', ROUNDED_MD],
        icon: 'size-5',
      },
      lg: {
        base: ['btn--lg', 'h-12', 'px-6', 'text-lg', 'rounded-lg'],
        icon: 'size-6',
      },
      xl: {
        base: ['btn--xl', 'h-14', 'px-8', 'text-xl', 'rounded-xl'],
        icon: 'size-7',
      },
    },
    color: {
      primary: { base: 'btn--primary' },
      secondary: { base: 'btn--secondary' },
      tertiary: { base: 'btn--tertiary' },
      success: { base: 'btn--success' },
      warning: { base: 'btn--warning' },
      danger: { base: 'btn--danger' },
      info: { base: 'btn--info' },
      neutral: { base: 'btn--neutral' },
    },
    radius: {
      none: { base: ROUNDED_NONE },
      sm: { base: 'rounded-sm' },
      md: { base: 'rounded-md' },
      lg: { base: 'rounded-lg' },
      xl: { base: 'rounded-xl' },
      '2xl': { base: 'rounded-2xl' },
      '3xl': { base: 'rounded-3xl' },
      full: { base: 'rounded-full' },
    },
    isDisabled: {
      true: {
        base: 'opacity-50 cursor-not-allowed pointer-events-none',
      },
    },
    isLoading: {
      true: {
        base: 'opacity-80 p-events-none cursor-wait pointer-events-none',
      },
    },
    disableAnimation: {
      true: {
        base: 'transition-none active:scale-100',
      },
      false: {
        base: 'transition-all duration-200 ease-in-out active:scale-95 motion-reduce:active:scale-100',
      },
    },
    fullWidth: {
      true: {
        base: 'w-full',
      },
    },
    isIconOnly: {
      true: {
        base: 'aspect-square p-0 rounded-full',
      },
    },
    isAttached: {
      true: {
        base: ROUNDED_NONE,
      },
    },
    isVertical: {
      true: {
        base: 'flex-col',
      },
    },
    showDivider: {
      true: {
        base: '[&:not(.btn--outline):not(:first-child)]:border-solid [&:not(.btn--outline):not(:first-child)]:border-current/20',
      },
    },
  },
  compoundVariants: [
    // --- Attached Groups Outline Overlap (2px) ---
    {
      isAttached: true,
      variant: 'outline',
      isVertical: false,
      class: { base: '[&:not(:first-child)]:-ml-[2px]' },
    },
    {
      isAttached: true,
      variant: 'outline',
      isVertical: true,
      class: { base: '[&:not(:first-child)]:-mt-[2px] [&:not(:first-child)]:ml-0' },
    },
    // --- Attached Groups Default Overlap (1px) ---
    {
      isAttached: true,
      variant: ['solid', 'soft', 'ghost', 'elevated', 'text', 'link'],
      isVertical: false,
      class: {
        base: ['[&:not(:first-child)]:-ml-px'],
      },
    },
    {
      isAttached: true,
      variant: ['solid', 'soft', 'ghost', 'elevated', 'text', 'link'],
      isVertical: true,
      class: {
        base: ['[&:not(:first-child)]:-mt-px [&:not(:first-child)]:ml-0'],
      },
    },
    // --- Show Divider Logic ---
    {
      showDivider: true,
      variant: ['solid', 'soft', 'ghost', 'elevated', 'text', 'link'],
      isVertical: false,
      class: {
        base: ['[&:not(:first-child)]:border-l-1'],
      },
    },
    {
      showDivider: true,
      variant: ['solid', 'soft', 'ghost', 'elevated', 'text', 'link'],
      isVertical: true,
      class: {
        base: ['[&:not(:first-child)]:border-t-1'],
      },
    },
    // --- Attached Groups ---
    {
      isAttached: true,
      isVertical: false,
      radius: 'none',
      class: { base: ROUNDED_NONE },
    },
    {
      isAttached: true,
      isVertical: false,
      radius: 'sm',
      class: { base: 'rounded-none first:rounded-l-sm last:rounded-r-sm' },
    },
    {
      isAttached: true,
      isVertical: false,
      radius: 'md',
      class: { base: 'rounded-none first:rounded-l-md last:rounded-r-md' },
    },
    {
      isAttached: true,
      isVertical: false,
      radius: 'lg',
      class: { base: 'rounded-none first:rounded-l-lg last:rounded-r-lg' },
    },
    {
      isAttached: true,
      isVertical: false,
      radius: 'xl',
      class: { base: 'rounded-none first:rounded-l-xl last:rounded-r-xl' },
    },
    {
      isAttached: true,
      isVertical: false,
      radius: 'full',
      class: { base: 'rounded-none first:rounded-l-full last:rounded-r-full' },
    },
    {
      isAttached: true,
      isVertical: true,
      radius: 'none',
      class: { base: ROUNDED_NONE },
    },
    {
      isAttached: true,
      isVertical: true,
      radius: 'sm',
      class: { base: 'rounded-none first:rounded-t-sm last:rounded-b-sm' },
    },
    {
      isAttached: true,
      isVertical: true,
      radius: 'md',
      class: { base: 'rounded-none first:rounded-t-md last:rounded-b-md' },
    },
    {
      isAttached: true,
      isVertical: true,
      radius: 'lg',
      class: { base: 'rounded-none first:rounded-t-lg last:rounded-b-lg' },
    },
    {
      isAttached: true,
      isVertical: true,
      radius: 'xl',
      class: { base: 'rounded-none first:rounded-t-xl last:rounded-b-xl' },
    },
    {
      isAttached: true,
      isVertical: true,
      radius: 'full',
      class: { base: 'rounded-none first:rounded-t-full last:rounded-b-full' },
    },
    // --- Solid Variants ---
    {
      variant: 'solid',
      color: 'primary',
      class: {
        base: 'bg-primary-base text-surface hover:brightness-110 active:brightness-90',
      },
    },
    {
      variant: 'solid',
      color: 'secondary',
      class: {
        base: 'bg-secondary-base text-surface hover:brightness-110 active:brightness-90',
      },
    },
    {
      variant: 'solid',
      color: 'tertiary',
      class: {
        base: 'bg-tertiary-base text-surface hover:brightness-110 active:brightness-90',
      },
    },
    {
      variant: 'solid',
      color: 'success',
      class: {
        base: 'bg-success-base text-surface hover:brightness-110 active:brightness-90',
      },
    },
    {
      variant: 'solid',
      color: 'warning',
      class: {
        base: 'bg-warning-base text-surface hover:brightness-110 active:brightness-90',
      },
    },
    {
      variant: 'solid',
      color: 'danger',
      class: {
        base: 'bg-danger-base text-surface hover:brightness-110 active:brightness-90',
      },
    },
    {
      variant: 'solid',
      color: 'info',
      class: { base: 'bg-info-base text-surface hover:brightness-110 active:brightness-90' },
    },
    {
      variant: 'solid',
      color: 'neutral',
      class: {
        base: 'bg-neutral-base text-surface hover:brightness-110 active:brightness-90',
      },
    },
    {
      variant: 'solid',
      color: 'neutral',
      class: { base: 'bg-neutral-base text-surface hover:brightness-110 active:brightness-90' },
    },

    // --- Outline Variants ---
    {
      variant: 'outline',
      color: 'primary',
      class: { base: 'border-primary-base text-primary-base hover:bg-primary-subtle' },
    },
    {
      variant: 'outline',
      color: 'secondary',
      class: { base: 'border-secondary-base text-secondary-base hover:bg-secondary-subtle' },
    },
    {
      variant: 'outline',
      color: 'tertiary',
      class: { base: 'border-tertiary-base text-tertiary-base hover:bg-tertiary-subtle' },
    },
    {
      variant: 'outline',
      color: 'success',
      class: { base: 'border-success-base text-success-base hover:bg-success-subtle' },
    },
    {
      variant: 'outline',
      color: 'warning',
      class: { base: 'border-warning-base text-warning-base hover:bg-warning-subtle' },
    },
    {
      variant: 'outline',
      color: 'danger',
      class: { base: 'border-danger-base text-danger-base hover:bg-danger-subtle' },
    },
    {
      variant: 'outline',
      color: 'info',
      class: { base: 'border-info-base text-info-base hover:bg-info-subtle' },
    },
    {
      variant: 'outline',
      color: 'neutral',
      class: { base: 'border-neutral-base text-neutral-base hover:bg-neutral-subtle' },
    },
    {
      variant: 'outline',
      color: 'neutral',
      class: { base: 'border-neutral-base text-neutral-base hover:bg-neutral-subtle' },
    },

    // --- Soft Variants ---
    {
      variant: 'soft',
      color: 'primary',
      class: {
        base: 'bg-primary-subtle text-primary-on-subtle hover:brightness-105 active:brightness-95',
      },
    },
    {
      variant: 'soft',
      color: 'secondary',
      class: {
        base: 'bg-secondary-subtle text-secondary-on-subtle hover:brightness-105 active:brightness-95',
      },
    },
    {
      variant: 'soft',
      color: 'tertiary',
      class: {
        base: 'bg-tertiary-subtle text-tertiary-on-subtle hover:brightness-105 active:brightness-95',
      },
    },
    {
      variant: 'soft',
      color: 'success',
      class: {
        base: 'bg-success-subtle text-success-on-subtle hover:brightness-105 active:brightness-95',
      },
    },
    {
      variant: 'soft',
      color: 'warning',
      class: {
        base: 'bg-warning-subtle text-warning-on-subtle hover:brightness-105 active:brightness-95',
      },
    },
    {
      variant: 'soft',
      color: 'danger',
      class: {
        base: 'bg-danger-subtle text-danger-on-subtle hover:brightness-105 active:brightness-95',
      },
    },
    {
      variant: 'soft',
      color: 'info',
      class: {
        base: 'bg-info-subtle text-info-on-subtle hover:brightness-105 active:brightness-95',
      },
    },
    {
      variant: 'soft',
      color: 'neutral',
      class: {
        base: 'bg-neutral-subtle text-neutral-on-subtle hover:brightness-105 active:brightness-95',
      },
    },
    {
      variant: 'soft',
      color: 'neutral',
      class: {
        base: 'bg-neutral-subtle text-neutral-on-subtle hover:brightness-105 active:brightness-95',
      },
    },

    // --- Ghost Variants ---
    {
      variant: 'ghost',
      color: 'primary',
      class: { base: 'text-primary-base hover:bg-primary-subtle' },
    },
    {
      variant: 'ghost',
      color: 'secondary',
      class: { base: 'text-secondary-base hover:bg-secondary-subtle' },
    },
    {
      variant: 'ghost',
      color: 'tertiary',
      class: { base: 'text-tertiary-base hover:bg-tertiary-subtle' },
    },
    {
      variant: 'ghost',
      color: 'success',
      class: { base: 'text-success-base hover:bg-success-subtle' },
    },
    {
      variant: 'ghost',
      color: 'warning',
      class: { base: 'text-warning-base hover:bg-warning-subtle' },
    },
    {
      variant: 'ghost',
      color: 'danger',
      class: { base: 'text-danger-base hover:bg-danger-subtle' },
    },
    { variant: 'ghost', color: 'info', class: { base: 'text-info-base hover:bg-info-subtle' } },
    {
      variant: 'ghost',
      color: 'neutral',
      class: { base: 'text-neutral-base hover:bg-neutral-subtle' },
    },
    {
      variant: 'ghost',
      color: 'neutral',
      class: { base: 'text-neutral-base hover:bg-neutral-subtle' },
    },

    // --- Link Variants ---
    {
      variant: 'link',
      color: 'primary',
      class: { base: 'text-primary-base hover:text-primary-on-subtle' },
    },
    {
      variant: 'link',
      color: 'secondary',
      class: { base: 'text-secondary-base hover:text-secondary-on-subtle' },
    },
    {
      variant: 'link',
      color: 'tertiary',
      class: { base: 'text-tertiary-base hover:text-tertiary-on-subtle' },
    },
    {
      variant: 'link',
      color: 'success',
      class: { base: 'text-success-base hover:text-success-on-subtle' },
    },
    {
      variant: 'link',
      color: 'warning',
      class: { base: 'text-warning-base hover:text-warning-on-subtle' },
    },
    {
      variant: 'link',
      color: 'danger',
      class: { base: 'text-danger-base hover:text-danger-on-subtle' },
    },
    { variant: 'link', color: 'info', class: { base: 'text-info-base hover:text-info-on-subtle' } },
    {
      variant: 'link',
      color: 'neutral',
      class: { base: 'text-neutral-base hover:text-neutral-on-subtle' },
    },
    {
      variant: 'link',
      color: 'neutral',
      class: { base: 'text-neutral-base hover:text-neutral-on-subtle' },
    },

    // --- Text Variants ---
    {
      variant: 'text',
      color: 'primary',
      class: { base: 'text-primary-base hover:bg-primary-subtle/50' },
    },
    {
      variant: 'text',
      color: 'secondary',
      class: { base: 'text-secondary-base hover:bg-secondary-subtle/50' },
    },
    {
      variant: 'text',
      color: 'tertiary',
      class: { base: 'text-tertiary-base hover:bg-tertiary-subtle/50' },
    },
    {
      variant: 'text',
      color: 'success',
      class: { base: 'text-success-base hover:bg-success-subtle/50' },
    },
    {
      variant: 'text',
      color: 'warning',
      class: { base: 'text-warning-base hover:bg-warning-subtle/50' },
    },
    {
      variant: 'text',
      color: 'danger',
      class: { base: 'text-danger-base hover:bg-danger-subtle/50' },
    },
    { variant: 'text', color: 'info', class: { base: 'text-info-base hover:bg-info-subtle/50' } },
    {
      variant: 'text',
      color: 'neutral',
      class: { base: 'text-neutral-base hover:bg-neutral-subtle/50' },
    },
    {
      variant: 'text',
      color: 'neutral',
      class: { base: 'text-neutral-base hover:bg-neutral-subtle/50' },
    },

    // --- Elevated Variants ---
    { variant: 'elevated', color: 'primary', class: { base: 'text-primary-base' } },
    { variant: 'elevated', color: 'secondary', class: { base: 'text-secondary-base' } },
    { variant: 'elevated', color: 'tertiary', class: { base: 'text-tertiary-base' } },
    { variant: 'elevated', color: 'success', class: { base: 'text-success-base' } },
    { variant: 'elevated', color: 'warning', class: { base: 'text-warning-base' } },
    { variant: 'elevated', color: 'danger', class: { base: 'text-danger-base' } },
    { variant: 'elevated', color: 'info', class: { base: 'text-info-base' } },
    { variant: 'elevated', color: 'neutral', class: { base: 'text-neutral-base' } },
    { variant: 'elevated', color: 'neutral', class: { base: 'text-neutral-base' } },

    // --- Icon Only Size Overrides ---
    { isIconOnly: true, size: 'xs', class: { base: 'size-7' } },
    { isIconOnly: true, size: 'sm', class: { base: 'size-8' } },
    { isIconOnly: true, size: 'md', class: { base: 'size-10' } },
    { isIconOnly: true, size: 'lg', class: { base: 'size-12' } },
    { isIconOnly: true, size: 'xl', class: { base: 'size-14' } },
  ],
  defaultVariants: {
    variant: 'solid',
    size: 'md',
    color: 'primary',
    radius: 'md',
    isDisabled: false,
    disableAnimation: false,
  },
});

export type ButtonVariantProps = VariantProps<typeof button>;
export type ButtonSlots = keyof ReturnType<typeof button>;
export type ButtonReturnType = ReturnType<typeof button>;

export { button };
