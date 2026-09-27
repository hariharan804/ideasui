import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';

export const switchRecipe = tv({
  slots: {
    root: 'group/switch inline-flex items-center gap-2 cursor-pointer select-none w-fit',
    track: [
      'relative inline-flex items-center shrink-0',
      'transition-all duration-200 ease-in-out',
      'group-has-[:focus-visible]/switch:ring-2 group-has-[:focus-visible]/switch:ring-border-focus group-has-[:focus-visible]/switch:ring-offset-2',
      'group-hover/switch:scale-105',
    ],
    thumb: [
      'absolute flex items-center justify-center z-10',
      'transition-all duration-200 ease-in-out',
      'pointer-events-none',
      'text-content-primary',
    ],
    thumbIcon:
      'size-full p-0.5 shrink-0 flex items-center justify-center text-current pointer-events-none transition-transform duration-200 [&>svg]:max-size-full [&>svg]:shrink-0',
    onLabel:
      'absolute font-bold uppercase tracking-wider text-content-inverse leading-none pointer-events-none select-none z-0',
    offLabel:
      'absolute font-bold uppercase tracking-wider text-content-muted leading-none pointer-events-none select-none z-0',
    labelText: 'text-content-primary leading-none transition-colors duration-150',
  },

  variants: {
    variant: {
      solid: {
        track: 'bg-surface-muted',
        thumb: 'bg-surface text-content-primary',
      },
      outline: {
        track: 'border-2 border-border bg-transparent',
        thumb: 'bg-content-muted text-content-inverse',
      },
      soft: {
        track: 'bg-surface-subtle',
        thumb: 'bg-content-muted text-content-inverse',
      },
      contrast: {
        track: 'bg-surface-muted',
        thumb: 'bg-surface text-content-primary shadow-sm',
      },
    },

    thumbVariant: {
      solid: {
        thumb: 'bg-surface text-content-primary shadow-sm',
      },
      flat: {
        thumb: 'bg-surface-subtle text-content-primary shadow-none border-0',
      },
      gradient: {
        thumb:
          'bg-gradient-to-br from-surface via-primary-subtle/30 to-surface-muted text-content-primary shadow-sm',
      },
      bordered: {
        thumb: 'border-2 border-content-primary/80 bg-surface text-content-primary shadow-2xs',
      },
      contrast: {
        thumb:
          'bg-surface text-content-primary group-data-[selected=true]/switch:bg-content-primary group-data-[selected=true]/switch:text-content-inverse shadow-sm',
      },
      dark: {
        thumb:
          'bg-content-primary text-content-inverse ring-1 ring-border/50 group-data-[selected=true]/switch:bg-content-primary group-data-[selected=true]/switch:text-content-inverse shadow-sm',
      },
    },

    thumbShape: {
      full: {
        track: 'rounded-full',
        thumb: 'rounded-full',
      },
      pill: {
        track: 'rounded-full',
        thumb: 'rounded-full',
      },
      square: {
        track: 'rounded-md',
        thumb: 'rounded-sm',
      },
      rectangle: {
        track: 'rounded-md',
        thumb: 'rounded-sm',
      },
    },

    thumbSize: {
      contained: {
        track: 'overflow-hidden',
      },
      extended: {
        track: 'overflow-visible',
        thumb: 'shadow-md',
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
      sm: {
        track: 'w-9.5 h-5',
        thumb: 'w-4 h-4 top-0.5 left-0.5 group-data-[selected=true]/switch:translate-x-4.5',
        onLabel: 'text-[8px] left-1.5',
        offLabel: 'text-[8px] right-1.5',
        labelText: 'text-xs',
      },
      md: {
        track: 'w-12 h-6',
        thumb: 'w-5 h-5 top-0.5 left-0.5 group-data-[selected=true]/switch:translate-x-6',
        onLabel: 'text-[9px] left-2',
        offLabel: 'text-[9px] right-2',
        labelText: 'text-sm',
      },
      lg: {
        track: 'w-14.5 h-7',
        thumb: 'w-6 h-6 top-0.5 left-0.5 group-data-[selected=true]/switch:translate-x-7.5',
        onLabel: 'text-[10px] left-2.5',
        offLabel: 'text-[10px] right-2.5',
        labelText: 'text-base',
      },
    },

    isInvalid: {
      true: {
        track: 'border-danger group-data-[selected=true]/switch:bg-danger',
        labelText: 'text-danger',
      },
    },

    isDisabled: {
      true: {
        root: 'cursor-not-allowed opacity-50 pointer-events-none',
      },
    },

    labelPlacement: {
      start: { root: 'flex-row-reverse' },
      end: { root: 'flex-row' },
    },
  },

  compoundVariants: [
    // Extended thumb size compounds (style with uniform 4px/3px overhang)
    {
      thumbSize: 'extended',
      size: 'sm',
      class: {
        track: 'w-9 h-4',
        thumb: 'size-5.5 -top-[3px] -left-[3px] group-data-[selected=true]/switch:translate-x-5',
      },
    },
    {
      thumbSize: 'extended',
      size: 'md',
      class: {
        track: 'w-11 h-5',
        thumb: 'size-7 -top-1 -left-1 group-data-[selected=true]/switch:translate-x-6',
      },
    },
    {
      thumbSize: 'extended',
      size: 'lg',
      class: {
        track: 'w-13 h-6',
        thumb: 'size-8 -top-1 -left-1 group-data-[selected=true]/switch:translate-x-7',
      },
    },

    // Outline variant contained thumb size compounds (fits inside 2px border)
    {
      variant: 'outline',
      size: 'sm',
      class: {
        thumb: 'w-3.5 h-3.5 top-[1px] left-[1px]',
      },
    },
    {
      variant: 'outline',
      size: 'md',
      class: {
        thumb: 'w-4 h-4 top-0.5 left-0.5',
      },
    },
    {
      variant: 'outline',
      size: 'lg',
      class: {
        thumb: 'w-5 h-5 top-0.5 left-0.5',
      },
    },

    // Wide Pill thumb shape (horizontal pill where width > height)
    {
      thumbShape: 'pill',
      size: 'sm',
      class: {
        thumb:
          'w-5.5 h-4 top-0.5 left-0.5 rounded-full group-data-[selected=true]/switch:translate-x-3',
      },
    },
    {
      thumbShape: 'pill',
      size: 'md',
      class: {
        thumb:
          'w-7 h-5 top-0.5 left-0.5 rounded-full group-data-[selected=true]/switch:translate-x-4',
      },
    },
    {
      thumbShape: 'pill',
      size: 'lg',
      class: {
        thumb:
          'w-8.5 h-6 top-0.5 left-0.5 rounded-full group-data-[selected=true]/switch:translate-x-5',
      },
    },

    // Wide Rectangle thumb shape (horizontal rounded rectangle where width > height)
    {
      thumbShape: 'rectangle',
      size: 'sm',
      class: {
        track: 'rounded-md',
        thumb:
          'w-5.5 h-4 top-0.5 left-0.5 rounded-sm group-data-[selected=true]/switch:translate-x-3',
      },
    },
    {
      thumbShape: 'rectangle',
      size: 'md',
      class: {
        track: 'rounded-md',
        thumb:
          'w-7 h-5 top-0.5 left-0.5 rounded-sm group-data-[selected=true]/switch:translate-x-4',
      },
    },
    {
      thumbShape: 'rectangle',
      size: 'lg',
      class: {
        track: 'rounded-lg',
        thumb:
          'w-8.5 h-6 top-0.5 left-0.5 rounded-md group-data-[selected=true]/switch:translate-x-5',
      },
    },

    // Square thumb shape (concentric track rounded corners per size)
    {
      thumbShape: 'square',
      size: 'sm',
      class: {
        track: 'rounded-md',
        thumb: 'rounded-sm',
      },
    },
    {
      thumbShape: 'square',
      size: 'md',
      class: {
        track: 'rounded-md',
        thumb: 'rounded-sm',
      },
    },
    {
      thumbShape: 'square',
      size: 'lg',
      class: {
        track: 'rounded-lg',
        thumb: 'rounded-md',
      },
    },

    // Solid variant selected states
    {
      variant: 'solid',
      color: 'primary',
      class: {
        track: 'group-data-[selected=true]/switch:bg-primary',
        thumb: 'group-data-[selected=true]/switch:bg-surface',
      },
    },
    {
      variant: 'solid',
      color: 'neutral',
      class: {
        track: 'group-data-[selected=true]/switch:bg-neutral',
        thumb: 'group-data-[selected=true]/switch:bg-surface',
      },
    },
    {
      variant: 'solid',
      color: 'success',
      class: {
        track: 'group-data-[selected=true]/switch:bg-success',
        thumb: 'group-data-[selected=true]/switch:bg-surface',
      },
    },
    {
      variant: 'solid',
      color: 'warning',
      class: {
        track: 'group-data-[selected=true]/switch:bg-warning',
        thumb: 'group-data-[selected=true]/switch:bg-surface',
      },
    },
    {
      variant: 'solid',
      color: 'danger',
      class: {
        track: 'group-data-[selected=true]/switch:bg-danger',
        thumb: 'group-data-[selected=true]/switch:bg-surface',
      },
    },

    // Outline variant selected states
    {
      variant: 'outline',
      color: 'primary',
      class: {
        track:
          'group-data-[selected=true]/switch:border-primary group-data-[selected=true]/switch:bg-transparent',
        thumb: 'group-data-[selected=true]/switch:bg-primary',
      },
    },
    {
      variant: 'outline',
      color: 'neutral',
      class: {
        track:
          'group-data-[selected=true]/switch:border-neutral group-data-[selected=true]/switch:bg-transparent',
        thumb: 'group-data-[selected=true]/switch:bg-neutral',
      },
    },
    {
      variant: 'outline',
      color: 'success',
      class: {
        track:
          'group-data-[selected=true]/switch:border-success group-data-[selected=true]/switch:bg-transparent',
        thumb: 'group-data-[selected=true]/switch:bg-success',
      },
    },
    {
      variant: 'outline',
      color: 'warning',
      class: {
        track:
          'group-data-[selected=true]/switch:border-warning group-data-[selected=true]/switch:bg-transparent',
        thumb: 'group-data-[selected=true]/switch:bg-warning',
      },
    },
    {
      variant: 'outline',
      color: 'danger',
      class: {
        track:
          'group-data-[selected=true]/switch:border-danger group-data-[selected=true]/switch:bg-transparent',
        thumb: 'group-data-[selected=true]/switch:bg-danger',
      },
    },

    // Soft variant selected states
    {
      variant: 'soft',
      color: 'primary',
      class: {
        track: 'group-data-[selected=true]/switch:bg-primary-subtle',
        thumb: 'group-data-[selected=true]/switch:bg-primary',
      },
    },
    {
      variant: 'soft',
      color: 'neutral',
      class: {
        track: 'group-data-[selected=true]/switch:bg-surface-muted',
        thumb: 'group-data-[selected=true]/switch:bg-neutral',
      },
    },
    {
      variant: 'soft',
      color: 'success',
      class: {
        track: 'group-data-[selected=true]/switch:bg-success-subtle',
        thumb: 'group-data-[selected=true]/switch:bg-success',
      },
    },
    {
      variant: 'soft',
      color: 'warning',
      class: {
        track: 'group-data-[selected=true]/switch:bg-warning-subtle',
        thumb: 'group-data-[selected=true]/switch:bg-warning',
      },
    },
    {
      variant: 'soft',
      color: 'danger',
      class: {
        track: 'group-data-[selected=true]/switch:bg-danger-subtle',
        thumb: 'group-data-[selected=true]/switch:bg-danger',
      },
    },

    // Contrast variant selected states (vibrant track with contrast dark thumb)
    {
      variant: 'contrast',
      color: 'primary',
      class: {
        track: 'group-data-[selected=true]/switch:bg-primary',
        thumb:
          'group-data-[selected=true]/switch:bg-content-primary group-data-[selected=true]/switch:text-content-inverse',
      },
    },
    {
      variant: 'contrast',
      color: 'neutral',
      class: {
        track: 'group-data-[selected=true]/switch:bg-neutral',
        thumb:
          'group-data-[selected=true]/switch:bg-content-primary group-data-[selected=true]/switch:text-content-inverse',
      },
    },
    {
      variant: 'contrast',
      color: 'success',
      class: {
        track: 'group-data-[selected=true]/switch:bg-success',
        thumb:
          'group-data-[selected=true]/switch:bg-content-primary group-data-[selected=true]/switch:text-content-inverse',
      },
    },
    {
      variant: 'contrast',
      color: 'warning',
      class: {
        track: 'group-data-[selected=true]/switch:bg-warning',
      },
    },
    {
      variant: 'contrast',
      color: 'danger',
      class: {
        track: 'group-data-[selected=true]/switch:bg-danger',
        thumb:
          'group-data-[selected=true]/switch:bg-content-primary group-data-[selected=true]/switch:text-content-inverse',
      },
    },
    // ThumbVariant overrides for selected states
    {
      thumbVariant: 'dark',
      class: {
        thumb:
          'bg-content-primary text-content-inverse ring-1 ring-border/50 group-data-[selected=true]/switch:bg-content-primary group-data-[selected=true]/switch:text-content-inverse',
      },
    },
    {
      thumbVariant: 'contrast',
      class: {
        thumb:
          'bg-surface text-content-primary group-data-[selected=true]/switch:bg-content-primary group-data-[selected=true]/switch:text-content-inverse',
      },
    },
    {
      thumbVariant: 'gradient',
      class: {
        thumb:
          'bg-gradient-to-br from-surface via-primary-subtle/30 to-surface-muted text-content-primary shadow-sm group-data-[selected=true]/switch:bg-gradient-to-br group-data-[selected=true]/switch:from-surface group-data-[selected=true]/switch:via-primary-subtle/40 group-data-[selected=true]/switch:to-surface-muted group-data-[selected=true]/switch:text-content-primary',
      },
    },
    {
      thumbVariant: 'bordered',
      class: {
        thumb:
          'border-2 border-content-primary/80 bg-surface text-content-primary shadow-2xs group-data-[selected=true]/switch:border-content-primary group-data-[selected=true]/switch:bg-surface group-data-[selected=true]/switch:text-content-primary',
      },
    },
    {
      thumbVariant: 'flat',
      class: {
        thumb:
          'bg-surface-subtle text-content-primary shadow-none border-0 group-data-[selected=true]/switch:bg-surface-subtle group-data-[selected=true]/switch:shadow-none',
      },
    },
  ],

  defaultVariants: {
    variant: 'solid',
    thumbVariant: 'solid',
    thumbShape: 'full',
    thumbSize: 'contained',
    color: 'primary',
    size: 'md',
    labelPlacement: 'end',
    isInvalid: false,
    isDisabled: false,
  },
});

export const switchGroup = tv({
  slots: {
    root: 'flex flex-col gap-2 w-full',
    groupLabel: 'text-content-primary text-sm font-medium',
    items: 'flex gap-2',
    description: 'text-content-secondary text-xs leading-normal',
    errorMessage: 'text-danger text-xs leading-normal',
  },
  variants: {
    orientation: {
      vertical: { items: 'flex-col' },
      horizontal: { items: 'flex-row flex-wrap' },
    },
    isInvalid: {
      true: { groupLabel: 'text-danger' },
    },
    isDisabled: {
      true: { root: 'opacity-50 pointer-events-none' },
    },
  },
  defaultVariants: {
    orientation: 'vertical',
    isInvalid: false,
    isDisabled: false,
  },
});

export type SwitchVariants = VariantProps<typeof switchRecipe>;
export type SwitchGroupVariants = VariantProps<typeof switchGroup>;
export type SwitchReturnType = ReturnType<typeof switchRecipe>;
export type SwitchGroupReturnType = ReturnType<typeof switchGroup>;
