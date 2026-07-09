/**
 * Button Compound Variants
 *
 * This file contains the complex conditional styling logic for buttons,
 * including attached groups, semantic color mappings, and state overrides.
 */

import { interactions, subtleInteractions } from '../tokens';

const attachedAndDividerVariants = [
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
] as const;

// Static string literals mapped by color so the Tailwind CSS compiler can scan and extract them
const colorClasses = {
  primary: {
    solid: 'bg-primary',
    outline: 'border-primary text-primary hover:bg-primary-subtle',
    soft: 'bg-primary-muted text-on-primary-muted',
    surface: 'text-primary',
    ghost: 'text-primary hover:bg-primary-subtle',
    link: 'text-primary hover:opacity-80',
    text: 'text-primary hover:bg-primary-subtle',
    elevated: 'text-primary border-primary/10 hover:bg-primary-subtle',
  },
  secondary: {
    solid: 'bg-secondary',
    outline: 'border-secondary text-secondary hover:bg-secondary-subtle',
    soft: 'bg-secondary-muted text-on-secondary-muted',
    surface: 'text-secondary',
    ghost: 'text-secondary hover:bg-secondary-subtle',
    link: 'text-secondary hover:opacity-80',
    text: 'text-secondary hover:bg-secondary-subtle',
    elevated: 'text-secondary border-secondary/10 hover:bg-secondary-subtle',
  },
  tertiary: {
    solid: 'bg-tertiary',
    outline: 'border-tertiary text-tertiary hover:bg-tertiary-subtle',
    soft: 'bg-tertiary-muted text-on-tertiary-muted',
    surface: 'text-tertiary',
    ghost: 'text-tertiary hover:bg-tertiary-subtle',
    link: 'text-tertiary hover:opacity-80',
    text: 'text-tertiary hover:bg-tertiary-subtle',
    elevated: 'text-tertiary border-tertiary/10 hover:bg-tertiary-subtle',
  },
  success: {
    solid: 'bg-success',
    outline: 'border-success text-success hover:bg-success-subtle',
    soft: 'bg-success-muted text-on-success-muted',
    surface: 'text-success',
    ghost: 'text-success hover:bg-success-subtle',
    link: 'text-success hover:opacity-80',
    text: 'text-success hover:bg-success-subtle',
    elevated: 'text-success border-success/10 hover:bg-success-subtle',
  },
  warning: {
    solid: 'bg-warning',
    outline: 'border-warning text-warning hover:bg-warning-subtle',
    soft: 'bg-warning-muted text-on-warning-muted',
    surface: 'text-warning',
    ghost: 'text-warning hover:bg-warning-subtle',
    link: 'text-warning hover:opacity-80',
    text: 'text-warning hover:bg-warning-subtle',
    elevated: 'text-warning border-warning/10 hover:bg-warning-subtle',
  },
  error: {
    solid: 'bg-error',
    outline: 'border-error text-error hover:bg-error-subtle',
    soft: 'bg-error-muted text-on-error-muted',
    surface: 'text-error',
    ghost: 'text-error hover:bg-error-subtle',
    link: 'text-error hover:opacity-80',
    text: 'text-error hover:bg-error-subtle',
    elevated: 'text-error border-error/10 hover:bg-error-subtle',
  },
  info: {
    solid: 'bg-info',
    outline: 'border-info text-info hover:bg-info-subtle',
    soft: 'bg-info-muted text-on-info-muted',
    surface: 'text-info',
    ghost: 'text-info hover:bg-info-subtle',
    link: 'text-info hover:opacity-80',
    text: 'text-info hover:bg-info-subtle',
    elevated: 'text-info border-info/10 hover:bg-info-subtle',
  },
  neutral: {
    solid: 'bg-neutral',
    outline: 'border-neutral text-neutral hover:bg-neutral-subtle',
    soft: 'bg-neutral-muted text-on-neutral-muted',
    surface: 'text-neutral',
    ghost: 'text-neutral hover:bg-neutral-subtle',
    link: 'text-neutral hover:opacity-80',
    text: 'text-neutral hover:bg-neutral-subtle',
    elevated: 'text-neutral border-neutral/10 hover:bg-neutral-subtle',
  },
} as const;

type ColorKey = keyof typeof colorClasses;
const colors = Object.keys(colorClasses) as ColorKey[];

const colorMappedVariants = colors.flatMap((color) => {
  const classes = colorClasses[color];

  return [
    {
      variant: 'solid',
      color,
      class: { base: `${classes.solid} ${interactions.hover} ${interactions.active}` },
    },
    {
      variant: 'outline',
      color,
      class: { base: classes.outline },
    },
    {
      variant: 'soft',
      color,
      class: {
        base: `${classes.soft} ${subtleInteractions.hover} ${subtleInteractions.active}`,
      },
    },
    {
      variant: 'surface',
      color,
      class: {
        base: `${classes.surface} ${subtleInteractions.hover} ${subtleInteractions.active}`,
      },
    },
    {
      variant: 'ghost',
      color,
      class: { base: classes.ghost },
    },
    {
      variant: 'link',
      color,
      class: { base: classes.link },
    },
    {
      variant: 'text',
      color,
      class: { base: classes.text },
    },
    {
      variant: 'elevated',
      color,
      class: { base: classes.elevated },
    },
  ];
});

const shadowAndSizeVariants = [
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

export const compoundVariants = [
  ...attachedAndDividerVariants,
  ...colorMappedVariants,
  ...shadowAndSizeVariants,
];
