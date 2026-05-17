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
    class: { base: 'bg-danger hover:brightness-110' },
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
    class: { base: 'border-danger text-danger hover:bg-danger-subtle' },
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
      base: 'bg-danger-muted text-on-danger-muted hover:brightness-95 active:brightness-105',
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
    class: { base: 'text-danger hover:bg-danger-subtle' },
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
    class: { base: 'text-danger hover:text-on-danger-subtle' },
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
  {
    variant: 'text',
    color: 'primary',
    class: { base: 'text-primary hover:bg-primary-subtle' },
  },
  {
    variant: 'text',
    color: 'secondary',
    class: { base: 'text-secondary hover:bg-secondary-subtle' },
  },
  {
    variant: 'text',
    color: 'tertiary',
    class: { base: 'text-tertiary hover:bg-tertiary-subtle' },
  },
  {
    variant: 'text',
    color: 'success',
    class: { base: 'text-success hover:bg-success-subtle' },
  },
  {
    variant: 'text',
    color: 'warning',
    class: { base: 'text-warning hover:bg-warning-subtle' },
  },
  {
    variant: 'text',
    color: 'error',
    class: { base: 'text-danger hover:bg-danger-subtle' },
  },
  { variant: 'text', color: 'info', class: { base: 'text-info hover:bg-info-subtle' } },
  {
    variant: 'text',
    color: 'neutral',
    class: { base: 'text-neutral hover:bg-neutral-subtle' },
  },

  // --- Elevated Variants ---
  { variant: 'elevated', color: 'primary', class: { base: 'text-primary' } },
  { variant: 'elevated', color: 'secondary', class: { base: 'text-secondary' } },
  { variant: 'elevated', color: 'tertiary', class: { base: 'text-tertiary' } },
  { variant: 'elevated', color: 'success', class: { base: 'text-success' } },
  { variant: 'elevated', color: 'warning', class: { base: 'text-warning' } },
  { variant: 'elevated', color: 'error', class: { base: 'text-danger' } },
  { variant: 'elevated', color: 'info', class: { base: 'text-info' } },
  { variant: 'elevated', color: 'neutral', class: { base: 'text-neutral' } },
  { variant: 'elevated', color: 'neutral', class: { base: 'text-neutral' } },

  // --- Glaze Variants ---
  {
    variant: 'glaze',
    color: 'primary',
    class: {
      base: 'border-primary/20 bg-primary/10 hover:bg-primary/20',
    },
  },
  {
    variant: 'glaze',
    color: 'secondary',
    class: {
      base: 'border-secondary/20 bg-secondary/10 hover:bg-secondary/20',
    },
  },
  {
    variant: 'glaze',
    color: 'tertiary',
    class: {
      base: 'border-tertiary/20 bg-tertiary/10 hover:bg-tertiary/20',
    },
  },
  {
    variant: 'glaze',
    color: 'success',
    class: {
      base: 'border-success/20 bg-success/10 hover:bg-success/20',
    },
  },
  {
    variant: 'glaze',
    color: 'warning',
    class: {
      base: 'border-warning/20 bg-warning/10 hover:bg-warning/20',
    },
  },
  {
    variant: 'glaze',
    color: 'error',
    class: {
      base: 'border-danger/20 bg-danger/10 hover:bg-danger/20',
    },
  },
  {
    variant: 'glaze',
    color: 'info',
    class: {
      base: 'border-info/20 bg-info/10 hover:bg-info/20',
    },
  },
  {
    variant: 'glaze',
    color: 'neutral',
    class: {
      base: 'border-neutral/20 bg-neutral/10 hover:bg-neutral/20',
    },
  },

  // --- Icon Only Size Overrides ---
  { isIconOnly: true, size: 'xs', class: { base: 'size-7' } },
  { isIconOnly: true, size: 'sm', class: { base: 'size-8' } },
  { isIconOnly: true, size: 'md', class: { base: 'size-10' } },
  { isIconOnly: true, size: 'lg', class: { base: 'size-12' } },
  { isIconOnly: true, size: 'xl', class: { base: 'size-14' } },
] as const;
