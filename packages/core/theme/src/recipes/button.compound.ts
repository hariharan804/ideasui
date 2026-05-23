/**
 * Button Compound Variants
 *
 * This file contains the complex conditional styling logic for buttons,
 * including attached groups, semantic color mappings, and state overrides.
 */

export const compoundVariants = [
  // --- Attached Groups Overlap (1px) ---
  {
    isAttached: true,
    variant: ['solid', 'muted', 'ghost', 'elevated', 'text', 'link', 'outline', 'glaze'],
    isVertical: false,
    class: {
      base: ['[&:not(:first-child)]:-ml-px'],
    },
  },
  {
    isAttached: true,
    variant: ['solid', 'muted', 'ghost', 'elevated', 'text', 'link', 'outline', 'glaze'],
    isVertical: true,
    class: {
      base: ['[&:not(:first-child)]:-mt-px [&:not(:first-child)]:ml-0'],
    },
  },
  // --- Show Divider Logic ---
  {
    showDivider: true,
    variant: ['solid', 'muted', 'ghost', 'elevated', 'text', 'link', 'glaze'],
    isVertical: false,
    class: {
      base: ['[&:not(:first-child)]:border-l-1'],
    },
  },
  {
    showDivider: true,
    variant: ['solid', 'muted', 'ghost', 'elevated', 'text', 'link', 'glaze'],
    isVertical: true,
    class: {
      base: ['[&:not(:first-child)]:border-t-1'],
    },
  },
  // --- Attached Groups ---
  {
    isAttached: true,
    isVertical: false,
    class: {
      base: [
        'first:rounded-r-none last:rounded-l-none [:not(:first-child):not(:last-child)]:rounded-none',
      ],
    },
  },
  {
    isAttached: true,
    isVertical: true,
    class: {
      base: [
        'first:rounded-b-none last:rounded-t-none [:not(:first-child):not(:last-child)]:rounded-none',
      ],
    },
  },

  // --- Variant / Color Mappings ---

  // --- Solid Variants ---
  { variant: 'solid', color: 'primary', class: { base: 'bg-primary hover:brightness-110' } },
  {
    variant: 'solid',
    color: 'secondary',
    class: { base: 'bg-secondary hover:brightness-110' },
  },
  {
    variant: 'solid',
    color: 'tertiary',
    class: { base: 'bg-tertiary hover:brightness-110' },
  },
  {
    variant: 'solid',
    color: 'success',
    class: { base: 'bg-success hover:brightness-110' },
  },
  {
    variant: 'solid',
    color: 'warning',
    class: { base: 'bg-warning hover:brightness-110' },
  },
  {
    variant: 'solid',
    color: 'error',
    class: { base: 'bg-error hover:brightness-110' },
  },
  { variant: 'solid', color: 'info', class: { base: 'bg-info hover:brightness-110' } },
  {
    variant: 'solid',
    color: 'neutral',
    class: { base: 'bg-neutral hover:brightness-110' },
  },

  // --- Outline Variants ---
  {
    variant: 'outline',
    color: 'primary',
    class: { base: 'border-primary text-primary hover:bg-primary-subtle' },
  },
  {
    variant: 'outline',
    color: 'secondary',
    class: { base: 'border-secondary text-secondary hover:bg-secondary-subtle' },
  },
  {
    variant: 'outline',
    color: 'tertiary',
    class: { base: 'border-tertiary text-tertiary hover:bg-tertiary-subtle' },
  },
  {
    variant: 'outline',
    color: 'success',
    class: { base: 'border-success text-success hover:bg-success-subtle' },
  },
  {
    variant: 'outline',
    color: 'warning',
    class: { base: 'border-warning text-warning hover:bg-warning-subtle' },
  },
  {
    variant: 'outline',
    color: 'error',
    class: { base: 'border-error text-error hover:bg-error-subtle' },
  },
  {
    variant: 'outline',
    color: 'info',
    class: { base: 'border-info text-info hover:bg-info-subtle' },
  },
  {
    variant: 'outline',
    color: 'neutral',
    class: { base: 'border-neutral text-neutral hover:bg-neutral-subtle' },
  },

  // --- Soft Variants ---
  {
    variant: 'muted',
    color: 'primary',
    class: {
      base: 'bg-primary-muted text-on-primary-muted hover:brightness-95 active:brightness-105',
    },
  },
  {
    variant: 'muted',
    color: 'secondary',
    class: {
      base: 'bg-secondary-muted text-on-secondary-muted hover:brightness-95 active:brightness-105',
    },
  },
  {
    variant: 'muted',
    color: 'tertiary',
    class: {
      base: 'bg-tertiary-muted text-on-tertiary-muted hover:brightness-95 active:brightness-105',
    },
  },
  {
    variant: 'muted',
    color: 'success',
    class: {
      base: 'bg-success-muted text-on-success-muted hover:brightness-95 active:brightness-105',
    },
  },
  {
    variant: 'muted',
    color: 'warning',
    class: {
      base: 'bg-warning-muted text-on-warning-muted hover:brightness-95 active:brightness-105',
    },
  },
  {
    variant: 'muted',
    color: 'error',
    class: {
      base: 'bg-error-muted text-on-error-muted hover:brightness-95 active:brightness-105',
    },
  },
  {
    variant: 'muted',
    color: 'info',
    class: {
      base: 'bg-info-muted text-on-info-muted hover:brightness-95 active:brightness-105',
    },
  },
  {
    variant: 'muted',
    color: 'neutral',
    class: {
      base: 'bg-neutral-muted text-on-neutral-muted hover:brightness-95 active:brightness-105',
    },
  },
  {
    variant: 'muted',
    color: 'neutral',
    class: {
      base: 'bg-neutral-muted text-on-neutral-muted hover:brightness-95 active:brightness-105',
    },
  },

  // --- Ghost Variants ---
  {
    variant: 'ghost',
    color: 'primary',
    class: { base: 'text-primary hover:bg-primary-subtle' },
  },
  {
    variant: 'ghost',
    color: 'secondary',
    class: { base: 'text-secondary hover:bg-secondary-subtle' },
  },
  {
    variant: 'ghost',
    color: 'tertiary',
    class: { base: 'text-tertiary hover:bg-tertiary-subtle' },
  },
  {
    variant: 'ghost',
    color: 'success',
    class: { base: 'text-success hover:bg-success-subtle' },
  },
  {
    variant: 'ghost',
    color: 'warning',
    class: { base: 'text-warning hover:bg-warning-subtle' },
  },
  {
    variant: 'ghost',
    color: 'error',
    class: { base: 'text-error hover:bg-error-subtle' },
  },
  { variant: 'ghost', color: 'info', class: { base: 'text-info hover:bg-info-subtle' } },
  {
    variant: 'ghost',
    color: 'neutral',
    class: { base: 'text-neutral hover:bg-neutral-subtle' },
  },

  // --- Link Variants ---
  {
    variant: 'link',
    color: 'primary',
    class: { base: 'text-primary hover:text-on-primary-subtle' },
  },
  {
    variant: 'link',
    color: 'secondary',
    class: { base: 'text-secondary hover:text-on-secondary-subtle' },
  },
  {
    variant: 'link',
    color: 'tertiary',
    class: { base: 'text-tertiary hover:text-on-tertiary-subtle' },
  },
  {
    variant: 'link',
    color: 'success',
    class: { base: 'text-success hover:text-on-success-subtle' },
  },
  {
    variant: 'link',
    color: 'warning',
    class: { base: 'text-warning hover:text-on-warning-subtle' },
  },
  {
    variant: 'link',
    color: 'error',
    class: { base: 'text-error hover:text-on-error-subtle' },
  },
  {
    variant: 'link',
    color: 'info',
    class: { base: 'text-info hover:text-on-info-subtle' },
  },
  {
    variant: 'link',
    color: 'neutral',
    class: { base: 'text-neutral hover:text-on-neutral-subtle' },
  },

  // --- Text Variants ---
  // No hover background — only colored text. Differs from ghost which shows hover:bg-{color}-subtle.
  { variant: 'text', color: 'primary', class: { base: 'text-primary' } },
  { variant: 'text', color: 'secondary', class: { base: 'text-secondary' } },
  { variant: 'text', color: 'tertiary', class: { base: 'text-tertiary' } },
  { variant: 'text', color: 'success', class: { base: 'text-success' } },
  { variant: 'text', color: 'warning', class: { base: 'text-warning' } },
  { variant: 'text', color: 'error', class: { base: 'text-error' } },
  { variant: 'text', color: 'info', class: { base: 'text-info' } },
  { variant: 'text', color: 'neutral', class: { base: 'text-neutral' } },

  // --- Elevated Variants ---
  { variant: 'elevated', color: 'primary', class: { base: 'text-primary' } },
  { variant: 'elevated', color: 'secondary', class: { base: 'text-secondary' } },
  { variant: 'elevated', color: 'tertiary', class: { base: 'text-tertiary' } },
  { variant: 'elevated', color: 'success', class: { base: 'text-success' } },
  { variant: 'elevated', color: 'warning', class: { base: 'text-warning' } },
  { variant: 'elevated', color: 'error', class: { base: 'text-error' } },
  { variant: 'elevated', color: 'info', class: { base: 'text-info' } },
  { variant: 'elevated', color: 'neutral', class: { base: 'text-neutral' } },
  { variant: 'elevated', color: 'neutral', class: { base: 'text-neutral' } },

  // --- Glaze Variants ---
  // Glass effect: color-tinted bg/border using opacity, text from theme token.
  // Base handles: backdrop-blur, shadow, inset highlight, transition.
  {
    variant: 'glaze',
    color: 'primary',
    class: { base: 'bg-primary/10 border-primary/25 text-primary hover:bg-primary/20' },
  },
  {
    variant: 'glaze',
    color: 'secondary',
    class: { base: 'bg-secondary/10 border-secondary/25 text-secondary hover:bg-secondary/20' },
  },
  {
    variant: 'glaze',
    color: 'tertiary',
    class: { base: 'bg-tertiary/10 border-tertiary/25 text-tertiary hover:bg-tertiary/20' },
  },
  {
    variant: 'glaze',
    color: 'success',
    class: { base: 'bg-success/10 border-success/25 text-success hover:bg-success/20' },
  },
  {
    variant: 'glaze',
    color: 'warning',
    class: { base: 'bg-warning/10 border-warning/25 text-warning hover:bg-warning/20' },
  },
  {
    variant: 'glaze',
    color: 'error',
    class: { base: 'bg-error/10 border-error/25 text-error hover:bg-error/20' },
  },
  {
    variant: 'glaze',
    color: 'info',
    class: { base: 'bg-info/10 border-info/25 text-info hover:bg-info/20' },
  },
  {
    variant: 'glaze',
    color: 'neutral',
    class: { base: 'bg-neutral/10 border-neutral/25 text-neutral hover:bg-neutral/20' },
  },

  // --- Icon Only Size Overrides ---
  { isIconOnly: true, size: 'xs', class: { base: 'size-7' } },
  { isIconOnly: true, size: 'sm', class: { base: 'size-8' } },
  { isIconOnly: true, size: 'md', class: { base: 'size-10' } },
  { isIconOnly: true, size: 'lg', class: { base: 'size-12' } },
  { isIconOnly: true, size: 'xl', class: { base: 'size-14' } },
] as const;
