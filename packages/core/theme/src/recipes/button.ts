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
      'text-background',
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
    shortcut: ['ml-auto', 'text-sm', 'font-sans', 'tracking-widest', 'inline-flex', 'items-center'],
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
      muted: {
        base: 'btn--muted',
      },
      link: {
        base: [BEM_LINK, TRANSPARENT, 'underline-offset-4', 'hover:underline', 'font-normal'],
      },
      text: {
        base: [TRANSPARENT, 'font-normal'],
      },
      elevated: {
        base: 'btn--elevated bg-background !shadow-sm hover:!shadow-md active:!shadow-sm',
      },
      glaze: {
        base: 'btn--glaze backdrop-blur-lg border shadow-lg transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] hover:shadow-xl',
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
      none: { base: 'shadow-none' },
      xs: { base: '!shadow-xs' },
      sm: { base: '!shadow-sm' },
      md: { base: '!shadow-md' },
      lg: { base: '!shadow-lg' },
      xl: { base: '!shadow-xl' },
      '2xl': { base: '!shadow-2xl' },
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
        base: 'opacity-80 cursor-wait pointer-events-none',
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
        base: '',
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
  compoundVariants: compoundVariants as unknown as Parameters<typeof tv>[0]['compoundVariants'],
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
