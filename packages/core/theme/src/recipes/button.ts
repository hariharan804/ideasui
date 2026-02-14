import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';

import { colorVariants } from '../tokens/variants';
import { borderRadius } from '../tokens';

// BEM base class names
const BEM_BASE = 'btn';
const BEM_ICON = 'btn__icon';
const BEM_LABEL = 'btn__label';
const BEM_SOLID = 'btn--solid';
const BEM_OUTLINE = 'btn--outline';
const BEM_GHOST = 'btn--ghost';
const BEM_LINK = 'btn--link';

const TRANSPARENT = 'bg-transparent';
const HOVER_OPACITY = 'hover:bg-opacity-10';
const ROUNDED_MD = 'rounded-md';

const button = tv({
  slots: {
    base: [
      BEM_BASE, // BEM base class for debugging
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
      'relative overflow-hidden',
      'min-h-11 min-w-11',
      'transition-all duration-200 ease-in-out',
      'motion-reduce:transition-none',
      'active:scale-95 motion-reduce:active:scale-100',
    ],
    icon: [BEM_ICON, 'shrink-0'],
    label: [BEM_LABEL, 'truncate'],
  },
  variants: {
    variant: {
      solid: {
        base: [BEM_SOLID, 'text-white'],
      },
      outline: {
        base: [BEM_OUTLINE, 'border-2', TRANSPARENT, HOVER_OPACITY],
      },
      ghost: {
        base: [BEM_GHOST, TRANSPARENT, HOVER_OPACITY],
      },
      link: {
        base: [BEM_LINK, TRANSPARENT, 'underline-offset-4', 'hover:underline'],
      },
    },
    size: {
      xs: {
        base: ['btn--xs', 'h-8', 'px-2', 'text-xs', ROUNDED_MD],
        icon: 'h-3 w-3',
      },
      sm: {
        base: ['btn--sm', 'h-9', 'px-3', 'text-sm', ROUNDED_MD],
        icon: 'h-4 w-4',
      },
      md: {
        base: ['btn--md', 'h-10', 'px-4', 'py-2', 'text-sm', ROUNDED_MD],
        icon: 'h-4 w-4',
      },
      lg: {
        base: ['btn--lg', 'h-11', 'px-8', 'text-base', 'rounded-lg'],
        icon: 'h-5 w-5',
      },
      xl: {
        base: ['btn--xl', 'h-12', 'px-10', 'text-lg', 'rounded-lg'],
        icon: 'h-6 w-6',
      },
      icon: {
        base: ['btn--icon-only', 'h-10', 'w-10', ROUNDED_MD],
        icon: 'h-4 w-4',
      },
    },
    // color: {
    //   primary: {
    //     base: "text-primary-500",
    //   },
    //   secondary: {
    //     base: "text-secondary-500",
    //   },
    //   success: {
    //     base: "text-success-500",
    //   },
    //   warning: {
    //     base: "text-warning-500",
    //   },
    //   danger: {
    //     base: "text-danger-500",
    //   },
    //   info: {
    //     base: "text-info-500",
    //   },
    //   neutral: {
    //     base: "text-neutral-500",
    //   },
    //   gray: {
    //     base: "text-gray-500",
    //   },
    // },
    color: Object.fromEntries(Object.keys(colorVariants).map((color) => [color, {}])) as Record<
      keyof typeof colorVariants,
      {}
    >,
    radius: {
      none: { base: borderRadius.none },
      sm: { base: borderRadius.sm },
      md: { base: borderRadius.md },
      lg: { base: borderRadius.lg },
      xl: { base: borderRadius.xl },
      full: { base: borderRadius.full },
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
    fullWidth: {
      true: {
        base: 'w-full',
      },
    },
  },
  compoundVariants: [
    // Solid variants
    {
      variant: 'solid',
      color: 'primary',
      class: { base: 'bg-primary-500 hover:bg-primary-600 active:bg-primary-700' },
    },
    {
      variant: 'solid',
      color: 'secondary',
      class: { base: 'bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-700' },
    },
    {
      variant: 'solid',
      color: 'success',
      class: { base: 'bg-success-500 hover:bg-success-600 active:bg-success-700' },
    },
    {
      variant: 'solid',
      color: 'warning',
      class: { base: 'bg-warning-500 hover:bg-warning-600 active:bg-warning-700' },
    },
    {
      variant: 'solid',
      color: 'danger',
      class: { base: 'bg-danger-500 hover:bg-danger-600 active:bg-danger-700' },
    },
    {
      variant: 'solid',
      color: 'info',
      class: { base: 'bg-info-500 hover:bg-info-600 active:bg-info-700' },
    },
    {
      variant: 'solid',
      color: 'neutral',
      class: { base: 'bg-neutral-500 hover:bg-neutral-600 active:bg-neutral-700' },
    },
    {
      variant: 'solid',
      color: 'gray',
      class: { base: 'bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white' },
    },
    // Outline variants
    {
      variant: 'outline',
      color: 'primary',
      class: { base: 'border-primary-500 text-primary-500 hover:bg-primary-50' },
    },
    {
      variant: 'outline',
      color: 'secondary',
      class: { base: 'border-secondary-500 text-secondary-500 hover:bg-secondary-50' },
    },
    {
      variant: 'outline',
      color: 'success',
      class: { base: 'border-success-500 text-success-500 hover:bg-success-50' },
    },
    {
      variant: 'outline',
      color: 'warning',
      class: { base: 'border-warning-500 text-warning-500 hover:bg-warning-50' },
    },
    {
      variant: 'outline',
      color: 'danger',
      class: { base: 'border-danger-500 text-danger-500 hover:bg-danger-50' },
    },
    {
      variant: 'outline',
      color: 'info',
      class: { base: 'border-info-500 text-info-500 hover:bg-info-50' },
    },
    {
      variant: 'outline',
      color: 'neutral',
      class: { base: 'border-neutral-500 text-neutral-500 hover:bg-neutral-50' },
    },
    {
      variant: 'outline',
      color: 'gray',
      class: { base: 'border-gray-500 text-gray-500 hover:bg-gray-50' },
    },
    // Ghost variants
    {
      variant: 'ghost',
      color: 'primary',
      class: { base: 'text-primary-500 hover:bg-primary-50' },
    },
    {
      variant: 'ghost',
      color: 'secondary',
      class: { base: 'text-secondary-500 hover:bg-secondary-50' },
    },
    {
      variant: 'ghost',
      color: 'success',
      class: { base: 'text-success-500 hover:bg-success-50' },
    },
    {
      variant: 'ghost',
      color: 'warning',
      class: { base: 'text-warning-500 hover:bg-warning-50' },
    },
    {
      variant: 'ghost',
      color: 'danger',
      class: { base: 'text-danger-500 hover:bg-danger-50' },
    },
    {
      variant: 'ghost',
      color: 'info',
      class: { base: 'text-info-500 hover:bg-info-50' },
    },
    {
      variant: 'ghost',
      color: 'neutral',
      class: { base: 'text-neutral-500 hover:bg-neutral-50' },
    },
    {
      variant: 'ghost',
      color: 'gray',
      class: { base: 'text-gray-500 hover:bg-gray-50' },
    },
    // Link variants
    {
      variant: 'link',
      color: 'primary',
      class: { base: 'text-primary-500' },
    },
    {
      variant: 'link',
      color: 'secondary',
      class: { base: 'text-secondary-500' },
    },
    {
      variant: 'link',
      color: 'success',
      class: { base: 'text-success-500' },
    },
    {
      variant: 'link',
      color: 'warning',
      class: { base: 'text-warning-500' },
    },
    {
      variant: 'link',
      color: 'danger',
      class: { base: 'text-danger-500' },
    },
    {
      variant: 'link',
      color: 'info',
      class: { base: 'text-info-500' },
    },
    {
      variant: 'link',
      color: 'neutral',
      class: { base: 'text-neutral-500' },
    },
    {
      variant: 'link',
      color: 'gray',
      class: { base: 'text-gray-500' },
    },
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
