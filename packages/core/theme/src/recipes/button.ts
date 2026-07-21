import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';

import { compoundVariants } from './button.compound';

// BEM base class names
export const BEM_BASE = 'btn';
export const BEM_ICON = 'btn__icon';
export const BEM_LABEL = 'btn__label';
export const BEM_LOADER = 'btn__loader';
export const BEM_SOLID = 'btn--solid';
export const BEM_OUTLINE = 'btn--outline';
export const BEM_GHOST = 'btn--ghost';
export const BEM_LINK = 'btn--link';
export const BEM_SOFT = 'btn--soft';
export const BEM_TEXT = 'btn--text';
export const BEM_ELEVATED = 'btn--elevated';
export const BEM_SURFACE = 'btn--surface';

export const TRANSPARENT = 'bg-transparent';
export const ROUNDED_MD = 'rounded-md';
export const ROUNDED_NONE = 'rounded-none';

const button = tv({
  slots: {
    base: [
      BEM_BASE,
      'inline-flex',
      'items-center',
      'justify-center',
      'gap-2',
      'font-medium',
      'cursor-pointer',
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
    icon: [BEM_ICON, 'shrink-0', 'inline-flex', 'items-center', 'justify-center'],
    label: [BEM_LABEL, 'truncate', 'inline-flex', 'items-center'],
    loader: [BEM_LOADER, 'shrink-0', 'inline-flex', 'items-center', 'justify-center'],
    shortcut: ['ms-auto', 'text-sm', 'font-sans', 'tracking-widest', 'inline-flex', 'items-center'],
  },
  variants: {
    variant: {
      solid: {
        base: [BEM_SOLID, 'text-background'],
      },
      outline: {
        base: [BEM_OUTLINE, 'border', TRANSPARENT],
      },
      ghost: {
        base: [BEM_GHOST, TRANSPARENT],
      },
      soft: {
        base: BEM_SOFT,
      },
      link: {
        base: [BEM_LINK, TRANSPARENT, 'underline-offset-4', 'hover:underline', 'font-normal'],
      },
      text: {
        base: [BEM_TEXT, TRANSPARENT, 'font-normal'],
      },
      elevated: {
        base: [BEM_ELEVATED, 'bg-background', 'border', 'border-transparent'],
      },
      surface: {
        base: [BEM_SURFACE, 'bg-neutral-muted'],
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
      error: { base: 'btn--error' },
      info: { base: 'btn--info' },
      neutral: { base: 'btn--neutral' },
    },
    elevation: {
      none: '',
      xs: '',
      sm: '',
      md: '',
      lg: '',
      xl: '',
      '2xl': '',
    },
    radius: {
      none: { base: ROUNDED_NONE },
      sm: { base: 'rounded-sm' },
      md: { base: ROUNDED_MD },
      lg: { base: 'rounded-lg' },
      xl: { base: 'rounded-xl' },
      full: { base: 'rounded-full' },
    },
    isDisabled: {
      true: {
        base: 'pointer-events-none cursor-not-allowed opacity-50',
      },
    },
    isLoading: {
      true: {
        base: 'pointer-events-none cursor-wait opacity-80',
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
        base: 'aspect-square p-0',
      },
    },
    isAttached: {
      true: {
        base: '',
      },
    },
    isVertical: {
      true: {
        base: 'flex-col',
      },
    },
    divider: {
      none: {},
      full: {
        base: '[&:not(.btn--outline):not(:first-child)]:border-solid [&:not(.btn--outline):not(:first-child)]:border-current/20',
      },
      middle: {
        base: [
          '[&:not(:first-child)]:relative',
          '[&:not(:first-child)]:before:content-[""]',
          '[&:not(:first-child)]:before:absolute',
          '[&:not(:first-child)]:before:bg-current/20',
        ],
      },
    },
  },
  compoundVariants: compoundVariants as unknown as Parameters<typeof tv>[0]['compoundVariants'],
  defaultVariants: {
    variant: 'solid',
    size: 'md',
    color: 'primary',
    radius: 'md',
    elevation: 'sm',
    isDisabled: false,
    disableAnimation: false,
  },
});

export type ButtonVariantProps = VariantProps<typeof button>;
export type ButtonSlots = keyof ReturnType<typeof button>;
export type ButtonReturnType = ReturnType<typeof button>;

export { button };
