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
    variant: ['solid', 'soft', 'ghost', 'elevated', 'text', 'link', 'outline', 'glaze'],
    isVertical: false,
    class: {
      base: ['[&:not(:first-child)]:-ml-px'],
    },
  },
  {
    isAttached: true,
    variant: ['solid', 'soft', 'ghost', 'elevated', 'text', 'link', 'outline', 'glaze'],
    isVertical: true,
    class: {
      base: ['[&:not(:first-child)]:-mt-px [&:not(:first-child)]:ml-0'],
    },
  },
  // --- Show Divider Logic ---
  {
    showDivider: true,
    variant: ['solid', 'soft', 'ghost', 'elevated', 'text', 'link', 'glaze'],
    isVertical: false,
    class: {
      base: ['[&:not(:first-child)]:border-l-1'],
    },
  },
  {
    showDivider: true,
    variant: ['solid', 'soft', 'ghost', 'elevated', 'text', 'link', 'glaze'],
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
  { variant: 'solid', color: 'primary', class: { base: 'bg-primary-solid hover:brightness-110' } },
  {
    variant: 'solid',
    color: 'secondary',
    class: { base: 'bg-secondary-solid hover:brightness-110' },
  },
  {
    variant: 'solid',
    color: 'tertiary',
    class: { base: 'bg-tertiary-solid hover:brightness-110' },
  },
  {
    variant: 'solid',
    color: 'success',
    class: { base: 'bg-success-solid hover:brightness-110' },
  },
  {
    variant: 'solid',
    color: 'warning',
    class: { base: 'bg-warning-solid hover:brightness-110' },
  },
  {
    variant: 'solid',
    color: 'danger',
    class: { base: 'bg-danger-solid hover:brightness-110' },
  },
  { variant: 'solid', color: 'info', class: { base: 'bg-info-solid hover:brightness-110' } },
  {
    variant: 'solid',
    color: 'neutral',
    class: { base: 'bg-neutral-solid hover:brightness-110' },
  },

  // --- Outline Variants ---
  {
    variant: 'outline',
    color: 'primary',
    class: { base: 'border-primary-solid text-primary-solid hover:bg-primary-subtle' },
  },
  {
    variant: 'outline',
    color: 'secondary',
    class: { base: 'border-secondary-solid text-secondary-solid hover:bg-secondary-subtle' },
  },
  {
    variant: 'outline',
    color: 'tertiary',
    class: { base: 'border-tertiary-solid text-tertiary-solid hover:bg-tertiary-subtle' },
  },
  {
    variant: 'outline',
    color: 'success',
    class: { base: 'border-success-solid text-success-solid hover:bg-success-subtle' },
  },
  {
    variant: 'outline',
    color: 'warning',
    class: { base: 'border-warning-solid text-warning-solid hover:bg-warning-subtle' },
  },
  {
    variant: 'outline',
    color: 'danger',
    class: { base: 'border-danger-solid text-danger-solid hover:bg-danger-subtle' },
  },
  {
    variant: 'outline',
    color: 'info',
    class: { base: 'border-info-solid text-info-solid hover:bg-info-subtle' },
  },
  {
    variant: 'outline',
    color: 'neutral',
    class: { base: 'border-neutral-solid text-neutral-solid hover:bg-neutral-subtle' },
  },

  // --- Soft Variants ---
  {
    variant: 'soft',
    color: 'primary',
    class: {
      base: 'bg-primary-soft text-primary-on-soft hover:brightness-95 active:brightness-105',
    },
  },
  {
    variant: 'soft',
    color: 'secondary',
    class: {
      base: 'bg-secondary-soft text-secondary-on-soft hover:brightness-95 active:brightness-105',
    },
  },
  {
    variant: 'soft',
    color: 'tertiary',
    class: {
      base: 'bg-tertiary-soft text-tertiary-on-soft hover:brightness-95 active:brightness-105',
    },
  },
  {
    variant: 'soft',
    color: 'success',
    class: {
      base: 'bg-success-soft text-success-on-soft hover:brightness-95 active:brightness-105',
    },
  },
  {
    variant: 'soft',
    color: 'warning',
    class: {
      base: 'bg-warning-soft text-warning-on-soft hover:brightness-95 active:brightness-105',
    },
  },
  {
    variant: 'soft',
    color: 'danger',
    class: {
      base: 'bg-danger-soft text-danger-on-soft hover:brightness-95 active:brightness-105',
    },
  },
  {
    variant: 'soft',
    color: 'info',
    class: {
      base: 'bg-info-soft text-info-on-soft hover:brightness-95 active:brightness-105',
    },
  },
  {
    variant: 'soft',
    color: 'neutral',
    class: {
      base: 'bg-neutral-soft text-neutral-on-soft hover:brightness-95 active:brightness-105',
    },
  },
  {
    variant: 'soft',
    color: 'neutral',
    class: {
      base: 'bg-neutral-soft text-neutral-on-soft hover:brightness-95 active:brightness-105',
    },
  },

  // --- Ghost Variants ---
  {
    variant: 'ghost',
    color: 'primary',
    class: { base: 'text-primary-solid hover:bg-primary-subtle' },
  },
  {
    variant: 'ghost',
    color: 'secondary',
    class: { base: 'text-secondary-solid hover:bg-secondary-subtle' },
  },
  {
    variant: 'ghost',
    color: 'tertiary',
    class: { base: 'text-tertiary-solid hover:bg-tertiary-subtle' },
  },
  {
    variant: 'ghost',
    color: 'success',
    class: { base: 'text-success-solid hover:bg-success-subtle' },
  },
  {
    variant: 'ghost',
    color: 'warning',
    class: { base: 'text-warning-solid hover:bg-warning-subtle' },
  },
  {
    variant: 'ghost',
    color: 'danger',
    class: { base: 'text-danger-solid hover:bg-danger-subtle' },
  },
  { variant: 'ghost', color: 'info', class: { base: 'text-info-solid hover:bg-info-subtle' } },
  {
    variant: 'ghost',
    color: 'neutral',
    class: { base: 'text-neutral-solid hover:bg-neutral-subtle' },
  },

  // --- Link Variants ---
  {
    variant: 'link',
    color: 'primary',
    class: { base: 'text-primary-solid hover:text-primary-on-subtle' },
  },
  {
    variant: 'link',
    color: 'secondary',
    class: { base: 'text-secondary-solid hover:text-secondary-on-subtle' },
  },
  {
    variant: 'link',
    color: 'tertiary',
    class: { base: 'text-tertiary-solid hover:text-tertiary-on-subtle' },
  },
  {
    variant: 'link',
    color: 'success',
    class: { base: 'text-success-solid hover:text-success-on-subtle' },
  },
  {
    variant: 'link',
    color: 'warning',
    class: { base: 'text-warning-solid hover:text-warning-on-subtle' },
  },
  {
    variant: 'link',
    color: 'danger',
    class: { base: 'text-danger-solid hover:text-danger-on-subtle' },
  },
  {
    variant: 'link',
    color: 'info',
    class: { base: 'text-info-solid hover:text-info-on-subtle' },
  },
  {
    variant: 'link',
    color: 'neutral',
    class: { base: 'text-neutral-solid hover:text-neutral-on-subtle' },
  },

  // --- Text Variants ---
  {
    variant: 'text',
    color: 'primary',
    class: { base: 'text-primary-solid hover:bg-primary-subtle' },
  },
  {
    variant: 'text',
    color: 'secondary',
    class: { base: 'text-secondary-solid hover:bg-secondary-subtle' },
  },
  {
    variant: 'text',
    color: 'tertiary',
    class: { base: 'text-tertiary-solid hover:bg-tertiary-subtle' },
  },
  {
    variant: 'text',
    color: 'success',
    class: { base: 'text-success-solid hover:bg-success-subtle' },
  },
  {
    variant: 'text',
    color: 'warning',
    class: { base: 'text-warning-solid hover:bg-warning-subtle' },
  },
  {
    variant: 'text',
    color: 'danger',
    class: { base: 'text-danger-solid hover:bg-danger-subtle' },
  },
  { variant: 'text', color: 'info', class: { base: 'text-info-solid hover:bg-info-subtle' } },
  {
    variant: 'text',
    color: 'neutral',
    class: { base: 'text-neutral-solid hover:bg-neutral-subtle' },
  },

  // --- Elevated Variants ---
  { variant: 'elevated', color: 'primary', class: { base: 'text-primary-solid' } },
  { variant: 'elevated', color: 'secondary', class: { base: 'text-secondary-solid' } },
  { variant: 'elevated', color: 'tertiary', class: { base: 'text-tertiary-solid' } },
  { variant: 'elevated', color: 'success', class: { base: 'text-success-solid' } },
  { variant: 'elevated', color: 'warning', class: { base: 'text-warning-solid' } },
  { variant: 'elevated', color: 'danger', class: { base: 'text-danger-solid' } },
  { variant: 'elevated', color: 'info', class: { base: 'text-info-solid' } },
  { variant: 'elevated', color: 'neutral', class: { base: 'text-neutral-solid' } },
  { variant: 'elevated', color: 'neutral', class: { base: 'text-neutral-solid' } },

  // --- Glaze Variants ---
  {
    variant: 'glaze',
    color: 'primary',
    class: {
      base: 'border-primary-solid/20 bg-primary-solid/10 hover:bg-primary-solid/20',
    },
  },
  {
    variant: 'glaze',
    color: 'secondary',
    class: {
      base: 'border-secondary-solid/20 bg-secondary-solid/10 hover:bg-secondary-solid/20',
    },
  },
  {
    variant: 'glaze',
    color: 'tertiary',
    class: {
      base: 'border-tertiary-solid/20 bg-tertiary-solid/10 hover:bg-tertiary-solid/20',
    },
  },
  {
    variant: 'glaze',
    color: 'success',
    class: {
      base: 'border-success-solid/20 bg-success-solid/10 hover:bg-success-solid/20',
    },
  },
  {
    variant: 'glaze',
    color: 'warning',
    class: {
      base: 'border-warning-solid/20 bg-warning-solid/10 hover:bg-warning-solid/20',
    },
  },
  {
    variant: 'glaze',
    color: 'danger',
    class: {
      base: 'border-danger-solid/20 bg-danger-solid/10 hover:bg-danger-solid/20',
    },
  },
  {
    variant: 'glaze',
    color: 'info',
    class: {
      base: 'border-info-solid/20 bg-info-solid/10 hover:bg-info-solid/20',
    },
  },
  {
    variant: 'glaze',
    color: 'neutral',
    class: {
      base: 'border-neutral-solid/20 bg-neutral-solid/10 hover:bg-neutral-solid/20',
    },
  },

  // --- Icon Only Size Overrides ---
  { isIconOnly: true, size: 'xs', class: { base: 'size-7' } },
  { isIconOnly: true, size: 'sm', class: { base: 'size-8' } },
  { isIconOnly: true, size: 'md', class: { base: 'size-10' } },
  { isIconOnly: true, size: 'lg', class: { base: 'size-12' } },
  { isIconOnly: true, size: 'xl', class: { base: 'size-14' } },
] as const;
