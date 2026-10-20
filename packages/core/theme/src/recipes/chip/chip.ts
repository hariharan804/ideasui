import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';

/**
 * Chip recipe — handles styling for IdeasUI Chip compound component.
 * Uses Tailwind Variants with OKLCH semantic tokens.
 */
export const chip = tv({
  slots: {
    root: [
      'ideasui-chip',
      'inline-flex items-center gap-1 max-w-full',
      'font-medium leading-none whitespace-nowrap',
      'transition-colors duration-150',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-1',
    ],
    label: 'ideasui-chip__label truncate',
    startContent: 'ideasui-chip__start-content flex items-center shrink-0',
    endContent: 'ideasui-chip__end-content flex items-center shrink-0',
    avatar: [
      'ideasui-chip__avatar',
      'inline-flex items-center justify-center shrink-0',
      'rounded-full overflow-hidden bg-surface-muted',
      'text-content-secondary font-semibold uppercase',
    ],
    avatarImage: 'ideasui-chip__avatar-image w-full h-full object-cover',
    icon: 'ideasui-chip__icon flex items-center shrink-0 text-current',
    dismiss: [
      'ideasui-chip__dismiss',
      'inline-flex items-center justify-center shrink-0',
      'rounded-full cursor-pointer',
      'text-current opacity-60',
      'hover:opacity-100 hover:bg-black/10',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current',
      'transition-opacity duration-100',
    ],
  },

  variants: {
    variant: {
      solid: {
        root: 'ideasui-chip--solid bg-primary text-white border border-transparent',
      },
      soft: {
        root: 'ideasui-chip--soft bg-primary-subtle text-primary border border-transparent',
      },
      outline: {
        root: 'ideasui-chip--outline bg-transparent text-primary border border-primary',
      },
      ghost: {
        root: 'ideasui-chip--ghost bg-transparent text-primary border border-transparent hover:bg-primary-subtle',
      },
    },

    color: {
      primary: {
        root: 'ideasui-chip--primary',
      },
      neutral: {
        root: 'ideasui-chip--neutral',
      },
      success: {
        root: 'ideasui-chip--success',
      },
      warning: {
        root: 'ideasui-chip--warning',
      },
      danger: {
        root: 'ideasui-chip--danger',
      },
    },

    size: {
      sm: {
        root: 'ideasui-chip--sm h-5 px-2 text-xs rounded-full gap-0.5',
        avatar: 'ideasui-chip__avatar--sm size-3.5 text-[8px]',
        icon: 'ideasui-chip__icon--sm size-3',
        dismiss: 'ideasui-chip__dismiss--sm size-3 -mr-0.5',
      },
      md: {
        root: 'ideasui-chip--md h-6 px-2.5 text-xs rounded-full gap-1',
        avatar: 'ideasui-chip__avatar--md size-4 text-[9px]',
        icon: 'ideasui-chip__icon--md size-3.5',
        dismiss: 'ideasui-chip__dismiss--md size-3.5 -mr-0.5',
      },
      lg: {
        root: 'ideasui-chip--lg h-8 px-3 text-sm rounded-full gap-1.5',
        avatar: 'ideasui-chip__avatar--lg size-5 text-[10px]',
        icon: 'ideasui-chip__icon--lg size-4',
        dismiss: 'ideasui-chip__dismiss--lg size-4 -mr-1',
      },
    },

    mode: {
      static: { root: 'ideasui-chip--static cursor-default' },
      selectable: { root: 'ideasui-chip--selectable cursor-pointer select-none' },
      dismissible: { root: 'ideasui-chip--dismissible cursor-default' },
    },

    isSelected: {
      true: { root: 'ideasui-chip--selected' },
    },

    isDisabled: {
      true: {
        root: 'ideasui-chip--disabled opacity-50 cursor-not-allowed pointer-events-none',
        dismiss: 'pointer-events-none',
      },
    },
  },

  compoundVariants: [
    // solid + color
    { variant: 'solid', color: 'primary', class: { root: 'bg-primary text-white' } },
    { variant: 'solid', color: 'neutral', class: { root: 'bg-neutral text-white' } },
    { variant: 'solid', color: 'success', class: { root: 'bg-success text-white' } },
    { variant: 'solid', color: 'warning', class: { root: 'bg-warning text-white' } },
    { variant: 'solid', color: 'danger', class: { root: 'bg-danger text-white' } },

    // soft + color
    { variant: 'soft', color: 'primary', class: { root: 'bg-primary-subtle text-primary' } },
    { variant: 'soft', color: 'neutral', class: { root: 'bg-neutral-subtle text-neutral' } },
    { variant: 'soft', color: 'success', class: { root: 'bg-success-subtle text-success' } },
    { variant: 'soft', color: 'warning', class: { root: 'bg-warning-subtle text-warning' } },
    { variant: 'soft', color: 'danger', class: { root: 'bg-danger-subtle text-danger' } },

    // outline + color
    { variant: 'outline', color: 'primary', class: { root: 'border-primary text-primary' } },
    { variant: 'outline', color: 'neutral', class: { root: 'border-neutral text-neutral' } },
    { variant: 'outline', color: 'success', class: { root: 'border-success text-success' } },
    { variant: 'outline', color: 'warning', class: { root: 'border-warning text-warning' } },
    { variant: 'outline', color: 'danger', class: { root: 'border-danger text-danger' } },

    // ghost + color
    { variant: 'ghost', color: 'primary', class: { root: 'text-primary hover:bg-primary-subtle' } },
    { variant: 'ghost', color: 'neutral', class: { root: 'text-neutral hover:bg-neutral-subtle' } },
    { variant: 'ghost', color: 'success', class: { root: 'text-success hover:bg-success-subtle' } },
    { variant: 'ghost', color: 'warning', class: { root: 'text-warning hover:bg-warning-subtle' } },
    { variant: 'ghost', color: 'danger', class: { root: 'text-danger hover:bg-danger-subtle' } },

    // selectable — selected state ring
    {
      mode: 'selectable',
      isSelected: true,
      class: { root: 'ring-2 ring-current ring-offset-1' },
    },
  ],

  defaultVariants: {
    variant: 'soft',
    color: 'neutral',
    size: 'md',
    mode: 'static',
    isSelected: false,
    isDisabled: false,
  },
});

export const chipGroup = tv({
  slots: {
    root: 'ideasui-chip-group flex flex-wrap gap-2',
  },
  variants: {
    isDisabled: {
      true: { root: 'ideasui-chip-group--disabled opacity-50 pointer-events-none' },
    },
  },
  defaultVariants: {
    isDisabled: false,
  },
});

export type ChipVariants = VariantProps<typeof chip>;
export type ChipVariantProps = VariantProps<typeof chip>;
export type ChipGroupVariants = VariantProps<typeof chipGroup>;
export type ChipGroupVariantProps = VariantProps<typeof chipGroup>;
export type ChipSlots = keyof ReturnType<typeof chip>;
export type ChipReturnType = ReturnType<typeof chip>;
export type ChipGroupReturnType = ReturnType<typeof chipGroup>;
