/**
 * Button Compound Variants
 *
 * This file contains the complex conditional styling logic for buttons,
 * including attached groups, semantic color mappings, and state overrides.
 */

import { interactions, subtleInteractions } from '../tokens';

export const compoundVariants = [
  // --- Attached Groups Overlap (1px) ---
  {
    isAttached: true,
    variant: ['solid', 'soft', 'ghost', 'elevated', 'text', 'link', 'outline', 'surface'],
    isVertical: false,
    class: {
      base: ['[&:not(:first-child)]:-ms-px'],
    },
  },
  {
    isAttached: true,
    variant: ['solid', 'soft', 'ghost', 'elevated', 'text', 'link', 'outline', 'surface'],
    isVertical: true,
    class: {
      base: ['[&:not(:first-child)]:-mt-px [&:not(:first-child)]:ms-0'],
    },
  },
  // --- Show Divider Logic ---
  {
    divider: 'full',
    variant: ['solid', 'soft', 'ghost', 'elevated', 'text', 'link', 'surface'],
    isVertical: false,
    class: {
      base: ['[&:not(:first-child)]:border-s-1'],
    },
  },
  {
    divider: 'full',
    variant: ['solid', 'soft', 'ghost', 'elevated', 'text', 'link', 'surface'],
    isVertical: true,
    class: {
      base: ['[&:not(:first-child)]:border-t-1'],
    },
  },
  {
    divider: 'middle',
    variant: ['solid', 'soft', 'ghost', 'elevated', 'text', 'link', 'surface', 'outline'],
    isVertical: false,
    class: {
      base: [
        '[&:not(:first-child)]:before:start-0',
        '[&:not(:first-child)]:before:top-[25%]',
        '[&:not(:first-child)]:before:bottom-[25%]',
        '[&:not(:first-child)]:before:w-px',
      ],
    },
  },
  {
    divider: 'middle',
    variant: ['solid', 'soft', 'ghost', 'elevated', 'text', 'link', 'surface', 'outline'],
    isVertical: true,
    class: {
      base: [
        '[&:not(:first-child)]:before:top-0',
        '[&:not(:first-child)]:before:start-[25%]',
        '[&:not(:first-child)]:before:end-[25%]',
        '[&:not(:first-child)]:before:h-px',
      ],
    },
  },
  // --- Clear inner borders for outline and elevated groups when divider is middle or none ---
  {
    isAttached: true,
    variant: ['outline', 'elevated'],
    divider: ['middle', 'none'],
    isVertical: false,
    class: {
      base: ['[&:not(:first-child)]:border-s-0', '[&:not(:last-child)]:border-e-0'],
    },
  },
  {
    isAttached: true,
    variant: ['outline', 'elevated'],
    divider: ['middle', 'none'],
    isVertical: true,
    class: {
      base: ['[&:not(:first-child)]:border-t-0', '[&:not(:last-child)]:border-b-0'],
    },
  },
  // --- Attached Groups ---
  {
    isAttached: true,
    isVertical: false,
    class: {
      base: [
        'first:rounded-e-none last:rounded-s-none [:not(:first-child):not(:last-child)]:rounded-none',
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
  {
    isAttached: true,
    class: {
      base: 'active:scale-100',
    },
  },

  // --- Variant / Color Mappings ---

  // --- Solid Variants ---
  {
    variant: 'solid',
    color: 'primary',
    class: { base: `bg-primary ${interactions.hover} ${interactions.active}` },
  },
  {
    variant: 'solid',
    color: 'secondary',
    class: { base: `bg-secondary ${interactions.hover} ${interactions.active}` },
  },
  {
    variant: 'solid',
    color: 'tertiary',
    class: { base: `bg-tertiary ${interactions.hover} ${interactions.active}` },
  },
  {
    variant: 'solid',
    color: 'success',
    class: { base: `bg-success ${interactions.hover} ${interactions.active}` },
  },
  {
    variant: 'solid',
    color: 'warning',
    class: { base: `bg-warning ${interactions.hover} ${interactions.active}` },
  },
  {
    variant: 'solid',
    color: 'error',
    class: { base: `bg-error ${interactions.hover} ${interactions.active}` },
  },
  {
    variant: 'solid',
    color: 'info',
    class: { base: `bg-info ${interactions.hover} ${interactions.active}` },
  },
  {
    variant: 'solid',
    color: 'neutral',
    class: { base: `bg-neutral ${interactions.hover} ${interactions.active}` },
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
    variant: 'soft',
    color: 'primary',
    class: {
      base: `bg-primary-muted text-on-primary-muted ${subtleInteractions.hover} ${subtleInteractions.active}`,
    },
  },
  {
    variant: 'soft',
    color: 'secondary',
    class: {
      base: `bg-secondary-muted text-on-secondary-muted ${subtleInteractions.hover} ${subtleInteractions.active}`,
    },
  },
  {
    variant: 'soft',
    color: 'tertiary',
    class: {
      base: `bg-tertiary-muted text-on-tertiary-muted ${subtleInteractions.hover} ${subtleInteractions.active}`,
    },
  },
  {
    variant: 'soft',
    color: 'success',
    class: {
      base: `bg-success-muted text-on-success-muted ${subtleInteractions.hover} ${subtleInteractions.active}`,
    },
  },
  {
    variant: 'soft',
    color: 'warning',
    class: {
      base: `bg-warning-muted text-on-warning-muted ${subtleInteractions.hover} ${subtleInteractions.active}`,
    },
  },
  {
    variant: 'soft',
    color: 'error',
    class: {
      base: `bg-error-muted text-on-error-muted ${subtleInteractions.hover} ${subtleInteractions.active}`,
    },
  },
  {
    variant: 'soft',
    color: 'info',
    class: {
      base: `bg-info-muted text-on-info-muted ${subtleInteractions.hover} ${subtleInteractions.active}`,
    },
  },
  {
    variant: 'soft',
    color: 'neutral',
    class: {
      base: `bg-neutral-muted text-on-neutral-muted ${subtleInteractions.hover} ${subtleInteractions.active}`,
    },
  },

  // --- Surface Variants ---
  {
    variant: 'surface',
    color: 'primary',
    class: { base: `text-primary ${subtleInteractions.hover} ${subtleInteractions.active}` },
  },
  {
    variant: 'surface',
    color: 'secondary',
    class: { base: `text-secondary ${subtleInteractions.hover} ${subtleInteractions.active}` },
  },
  {
    variant: 'surface',
    color: 'tertiary',
    class: { base: `text-tertiary ${subtleInteractions.hover} ${subtleInteractions.active}` },
  },
  {
    variant: 'surface',
    color: 'success',
    class: { base: `text-success ${subtleInteractions.hover} ${subtleInteractions.active}` },
  },
  {
    variant: 'surface',
    color: 'warning',
    class: { base: `text-warning ${subtleInteractions.hover} ${subtleInteractions.active}` },
  },
  {
    variant: 'surface',
    color: 'error',
    class: { base: `text-error ${subtleInteractions.hover} ${subtleInteractions.active}` },
  },
  {
    variant: 'surface',
    color: 'info',
    class: { base: `text-info ${subtleInteractions.hover} ${subtleInteractions.active}` },
  },
  {
    variant: 'surface',
    color: 'neutral',
    class: { base: `text-neutral ${subtleInteractions.hover} ${subtleInteractions.active}` },
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
    class: { base: 'text-primary hover:opacity-80' },
  },
  {
    variant: 'link',
    color: 'secondary',
    class: { base: 'text-secondary hover:opacity-80' },
  },
  {
    variant: 'link',
    color: 'tertiary',
    class: { base: 'text-tertiary hover:opacity-80' },
  },
  {
    variant: 'link',
    color: 'success',
    class: { base: 'text-success hover:opacity-80' },
  },
  {
    variant: 'link',
    color: 'warning',
    class: { base: 'text-warning hover:opacity-80' },
  },
  {
    variant: 'link',
    color: 'error',
    class: { base: 'text-error hover:opacity-80' },
  },
  {
    variant: 'link',
    color: 'info',
    class: { base: 'text-info hover:opacity-80' },
  },
  {
    variant: 'link',
    color: 'neutral',
    class: { base: 'text-neutral hover:opacity-80' },
  },

  // --- Text Variants ---
  // Soft hover background — only colored text on normal state.
  { variant: 'text', color: 'primary', class: { base: 'text-primary hover:bg-primary-subtle' } },
  {
    variant: 'text',
    color: 'secondary',
    class: { base: 'text-secondary hover:bg-secondary-subtle' },
  },
  { variant: 'text', color: 'tertiary', class: { base: 'text-tertiary hover:bg-tertiary-subtle' } },
  { variant: 'text', color: 'success', class: { base: 'text-success hover:bg-success-subtle' } },
  { variant: 'text', color: 'warning', class: { base: 'text-warning hover:bg-warning-subtle' } },
  { variant: 'text', color: 'error', class: { base: 'text-error hover:bg-error-subtle' } },
  { variant: 'text', color: 'info', class: { base: 'text-info hover:bg-info-subtle' } },
  { variant: 'text', color: 'neutral', class: { base: 'text-neutral hover:bg-neutral-subtle' } },

  // --- Elevated Variants ---
  {
    variant: 'elevated',
    color: 'primary',
    class: { base: 'text-primary border-primary/10 hover:bg-primary-subtle' },
  },
  {
    variant: 'elevated',
    color: 'secondary',
    class: { base: 'text-secondary border-secondary/10 hover:bg-secondary-subtle' },
  },
  {
    variant: 'elevated',
    color: 'tertiary',
    class: { base: 'text-tertiary border-tertiary/10 hover:bg-tertiary-subtle' },
  },
  {
    variant: 'elevated',
    color: 'success',
    class: { base: 'text-success border-success/10 hover:bg-success-subtle' },
  },
  {
    variant: 'elevated',
    color: 'warning',
    class: { base: 'text-warning border-warning/10 hover:bg-warning-subtle' },
  },
  {
    variant: 'elevated',
    color: 'error',
    class: { base: 'text-error border-error/10 hover:bg-error-subtle' },
  },
  {
    variant: 'elevated',
    color: 'info',
    class: { base: 'text-info border-info/10 hover:bg-info-subtle' },
  },
  {
    variant: 'elevated',
    color: 'neutral',
    class: { base: 'text-neutral border-neutral/10 hover:bg-neutral-subtle' },
  },

  // --- Elevated Variant Shadows ---
  { variant: 'elevated', elevation: 'none', class: { base: 'shadow-none' } },
  {
    variant: 'elevated',
    elevation: 'xs',
    class: { base: 'shadow-xs hover:shadow-sm active:shadow-xs' },
  },
  {
    variant: 'elevated',
    elevation: 'sm',
    class: { base: 'shadow-sm hover:shadow-md active:shadow-sm' },
  },
  {
    variant: 'elevated',
    elevation: 'md',
    class: { base: 'shadow-md hover:shadow-lg active:shadow-md' },
  },
  {
    variant: 'elevated',
    elevation: 'lg',
    class: { base: 'shadow-lg hover:shadow-xl active:shadow-lg' },
  },
  {
    variant: 'elevated',
    elevation: 'xl',
    class: { base: 'shadow-xl hover:shadow-2xl active:shadow-xl' },
  },
  {
    variant: 'elevated',
    elevation: '2xl',
    class: { base: 'shadow-2xl hover:shadow-inner active:shadow-2xl' },
  },

  // --- Icon Only Size Overrides ---
  { isIconOnly: true, size: 'xs', class: { base: 'size-7' } },
  { isIconOnly: true, size: 'sm', class: { base: 'size-8' } },
  { isIconOnly: true, size: 'md', class: { base: 'size-10' } },
  { isIconOnly: true, size: 'lg', class: { base: 'size-12' } },
  { isIconOnly: true, size: 'xl', class: { base: 'size-14' } },
] as const;
