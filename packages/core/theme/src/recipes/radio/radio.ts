import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';

type Color = 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
const COLORS: readonly Color[] = ['primary', 'neutral', 'success', 'warning', 'danger'];

const solidMap: Record<Color, { indicator: string; dot: string }> = {
  primary: {
    indicator:
      'group-data-[selected=true]/radio:border-primary group-data-[selected=true]/radio:bg-primary group-data-[selected=true]/radio:group-hover/radio:bg-primary/90 group-data-[selected=true]/radio:group-hover/radio:border-primary/90',
    dot: 'bg-background',
  },
  neutral: {
    indicator:
      'group-data-[selected=true]/radio:border-neutral group-data-[selected=true]/radio:bg-neutral group-data-[selected=true]/radio:group-hover/radio:bg-neutral/90 group-data-[selected=true]/radio:group-hover/radio:border-neutral/90',
    dot: 'bg-background',
  },
  success: {
    indicator:
      'group-data-[selected=true]/radio:border-success group-data-[selected=true]/radio:bg-success group-data-[selected=true]/radio:group-hover/radio:bg-success/90 group-data-[selected=true]/radio:group-hover/radio:border-success/90',
    dot: 'bg-background',
  },
  warning: {
    indicator:
      'group-data-[selected=true]/radio:border-warning group-data-[selected=true]/radio:bg-warning group-data-[selected=true]/radio:group-hover/radio:bg-warning/90 group-data-[selected=true]/radio:group-hover/radio:border-warning/90',
    dot: 'bg-background',
  },
  danger: {
    indicator:
      'group-data-[selected=true]/radio:border-danger group-data-[selected=true]/radio:bg-danger group-data-[selected=true]/radio:group-hover/radio:bg-danger/90 group-data-[selected=true]/radio:group-hover/radio:border-danger/90',
    dot: 'bg-background',
  },
};

const outlineMap: Record<Color, { indicator: string; dot: string }> = {
  primary: {
    indicator:
      'group-data-[selected=true]/radio:border-primary group-data-[selected=true]/radio:group-hover/radio:border-primary/80 group-data-[selected=true]/radio:group-hover/radio:bg-primary-subtle/20',
    dot: 'bg-primary',
  },
  neutral: {
    indicator:
      'group-data-[selected=true]/radio:border-neutral group-data-[selected=true]/radio:group-hover/radio:border-neutral/80 group-data-[selected=true]/radio:group-hover/radio:bg-surface-muted/20',
    dot: 'bg-neutral',
  },
  success: {
    indicator:
      'group-data-[selected=true]/radio:border-success group-data-[selected=true]/radio:group-hover/radio:border-success/80 group-data-[selected=true]/radio:group-hover/radio:bg-success-subtle/20',
    dot: 'bg-success',
  },
  warning: {
    indicator:
      'group-data-[selected=true]/radio:border-warning group-data-[selected=true]/radio:group-hover/radio:border-warning/80 group-data-[selected=true]/radio:group-hover/radio:bg-warning-subtle/20',
    dot: 'bg-warning',
  },
  danger: {
    indicator:
      'group-data-[selected=true]/radio:border-danger group-data-[selected=true]/radio:group-hover/radio:border-danger/80 group-data-[selected=true]/radio:group-hover/radio:bg-danger-subtle/20',
    dot: 'bg-danger',
  },
};

const subtleMap: Record<Color, { indicator: string; dot: string }> = {
  primary: {
    indicator:
      'group-data-[selected=true]/radio:bg-primary-subtle group-data-[selected=true]/radio:border-primary-subtle group-data-[selected=true]/radio:group-hover/radio:bg-primary-subtle/80',
    dot: 'bg-primary',
  },
  neutral: {
    indicator:
      'group-data-[selected=true]/radio:bg-surface-muted group-data-[selected=true]/radio:border-surface-muted group-data-[selected=true]/radio:group-hover/radio:bg-surface-muted/80',
    dot: 'bg-content-primary',
  },
  success: {
    indicator:
      'group-data-[selected=true]/radio:bg-success-subtle group-data-[selected=true]/radio:border-success-subtle group-data-[selected=true]/radio:group-hover/radio:bg-success-subtle/80',
    dot: 'bg-success',
  },
  warning: {
    indicator:
      'group-data-[selected=true]/radio:bg-warning-subtle group-data-[selected=true]/radio:border-warning-subtle group-data-[selected=true]/radio:group-hover/radio:bg-warning-subtle/80',
    dot: 'bg-warning',
  },
  danger: {
    indicator:
      'group-data-[selected=true]/radio:bg-danger-subtle group-data-[selected=true]/radio:border-danger-subtle group-data-[selected=true]/radio:group-hover/radio:bg-danger-subtle/80',
    dot: 'bg-danger',
  },
};

const ghostMap: Record<Color, { indicator: string; dot: string }> = {
  primary: {
    indicator:
      'group-data-[selected=true]/radio:border-primary group-data-[selected=true]/radio:group-hover/radio:border-primary/80 group-data-[selected=true]/radio:group-hover/radio:bg-primary-subtle/20',
    dot: 'bg-primary',
  },
  neutral: {
    indicator:
      'group-data-[selected=true]/radio:border-neutral group-data-[selected=true]/radio:group-hover/radio:border-neutral/80 group-data-[selected=true]/radio:group-hover/radio:bg-surface-muted/20',
    dot: 'bg-neutral',
  },
  success: {
    indicator:
      'group-data-[selected=true]/radio:border-success group-data-[selected=true]/radio:group-hover/radio:border-success/80 group-data-[selected=true]/radio:group-hover/radio:bg-success-subtle/20',
    dot: 'bg-success',
  },
  warning: {
    indicator:
      'group-data-[selected=true]/radio:border-warning group-data-[selected=true]/radio:group-hover/radio:border-warning/80 group-data-[selected=true]/radio:group-hover/radio:bg-warning-subtle/20',
    dot: 'bg-warning',
  },
  danger: {
    indicator:
      'group-data-[selected=true]/radio:border-danger group-data-[selected=true]/radio:group-hover/radio:border-danger/80 group-data-[selected=true]/radio:group-hover/radio:bg-danger-subtle/20',
    dot: 'bg-danger',
  },
};

const softMap: Record<Color, { indicator: string; dot: string }> = {
  primary: {
    indicator:
      'group-data-[selected=true]/radio:bg-primary-subtle group-data-[selected=true]/radio:border-primary/40 group-data-[selected=true]/radio:group-hover/radio:bg-primary-muted',
    dot: 'bg-primary',
  },
  neutral: {
    indicator:
      'group-data-[selected=true]/radio:bg-surface-muted group-data-[selected=true]/radio:border-border-strong group-data-[selected=true]/radio:group-hover/radio:bg-surface-subtle',
    dot: 'bg-content-primary',
  },
  success: {
    indicator:
      'group-data-[selected=true]/radio:bg-success-subtle group-data-[selected=true]/radio:border-success/40 group-data-[selected=true]/radio:group-hover/radio:bg-success-muted',
    dot: 'bg-success',
  },
  warning: {
    indicator:
      'group-data-[selected=true]/radio:bg-warning-subtle group-data-[selected=true]/radio:border-warning/40 group-data-[selected=true]/radio:group-hover/radio:bg-warning-muted',
    dot: 'bg-warning',
  },
  danger: {
    indicator:
      'group-data-[selected=true]/radio:bg-danger-subtle group-data-[selected=true]/radio:border-danger/40 group-data-[selected=true]/radio:group-hover/radio:bg-danger-muted',
    dot: 'bg-danger',
  },
};

const solidCompoundVariants = COLORS.map((color) => ({
  variant: 'solid' as const,
  color,
  class: solidMap[color],
}));

const outlineCompoundVariants = COLORS.map((color) => ({
  variant: 'outline' as const,
  color,
  class: outlineMap[color],
}));

const subtleCompoundVariants = COLORS.map((color) => ({
  variant: 'subtle' as const,
  color,
  class: subtleMap[color],
}));

const ghostCompoundVariants = COLORS.map((color) => ({
  variant: 'ghost' as const,
  color,
  class: ghostMap[color],
}));

const softCompoundVariants = COLORS.map((color) => ({
  variant: 'soft' as const,
  color,
  class: softMap[color],
}));

export const radio = tv({
  slots: {
    root: 'group/radio inline-flex items-center gap-2 cursor-pointer select-none w-fit',
    indicator: [
      'relative flex items-center justify-center shrink-0',
      'border transition-all duration-150 ease-in-out',
      'group-has-[:focus-visible]/radio:ring-2 group-has-[:focus-visible]/radio:ring-focus group-has-[:focus-visible]/radio:ring-offset-2',
      'group-hover/radio:scale-105',
    ],
    dot: [
      'pointer-events-none rounded-full transition-all duration-150 ease-in-out',
      'opacity-0 scale-0',
      'group-data-[selected=true]/radio:opacity-100 group-data-[selected=true]/radio:scale-100 group-data-[selected=true]/radio:group-hover/radio:scale-110',
    ],
    labelText: [
      'text-content-primary/85 leading-none transition-all duration-150 ease-in-out',
      'group-hover/radio:text-content-primary group-hover/radio:opacity-100',
    ],
  },

  variants: {
    variant: {
      solid: {
        indicator:
          'border-border-strong bg-surface group-hover/radio:border-border-focus group-hover/radio:bg-surface-subtle',
      },
      outline: {
        indicator:
          'border-border-strong bg-transparent group-hover/radio:border-border-focus group-hover/radio:bg-surface-subtle/50',
      },
      subtle: {
        indicator:
          'border-transparent bg-surface-muted group-hover/radio:bg-surface-subtle group-hover/radio:border-border-subtle',
      },
      ghost: {
        indicator:
          'border-border/30 bg-transparent group-hover/radio:border-border-strong group-hover/radio:bg-surface-subtle/30',
      },
      soft: {
        indicator:
          'border-border-subtle bg-surface-subtle group-hover/radio:border-border-strong group-hover/radio:bg-surface-muted',
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
        root: 'gap-1.5',
        indicator: 'size-3.5',
        dot: 'size-1.5',
        labelText: 'text-xs',
      },
      md: {
        root: 'gap-2',
        indicator: 'size-4',
        dot: 'size-2',
        labelText: 'text-sm',
      },
      lg: {
        root: 'gap-2.5',
        indicator: 'size-5',
        dot: 'size-2.5',
        labelText: 'text-base',
      },
    },

    radius: {
      none: { indicator: 'rounded-none' },
      sm: { indicator: 'rounded-[3px]' },
      md: { indicator: 'rounded-[4px]' },
      lg: { indicator: 'rounded-md' },
      full: { indicator: 'rounded-full' },
    },

    isInvalid: {
      true: {
        indicator: 'border-danger',
        labelText: 'text-danger',
      },
    },

    isDisabled: {
      true: {
        root: 'cursor-not-allowed opacity-50 pointer-events-none',
        labelText: 'text-content-muted',
      },
    },
  },

  compoundVariants: [
    ...solidCompoundVariants,
    ...outlineCompoundVariants,
    ...subtleCompoundVariants,
    ...ghostCompoundVariants,
    ...softCompoundVariants,

    // ── Invalid Overrides ───────────────────────────────────────────
    {
      isInvalid: true,
      variant: 'solid',
      class: {
        indicator:
          'group-data-[selected=true]/radio:bg-danger group-data-[selected=true]/radio:border-danger group-data-[selected=true]/radio:group-hover/radio:bg-danger/90',
      },
    },
    {
      isInvalid: true,
      variant: 'outline',
      class: {
        indicator:
          'border-danger group-data-[selected=true]/radio:border-danger group-hover/radio:border-danger/90',
        dot: 'bg-danger',
      },
    },
  ],

  defaultVariants: {
    variant: 'outline',
    color: 'primary',
    size: 'md',
    radius: 'full',
    isInvalid: false,
    isDisabled: false,
  },
});

export const radioGroup = tv({
  slots: {
    root: 'm-0 p-0 border-0 min-w-0 flex flex-col gap-2 w-full',
    groupLabel: 'text-content-primary text-sm font-medium',
    items: 'flex gap-2 items-start',
    description: 'text-content-secondary text-xs leading-normal',
    errorMessage: 'text-danger text-xs leading-normal',
  },
  variants: {
    orientation: {
      vertical: { items: 'flex-col items-start' },
      horizontal: { items: 'flex-row flex-wrap items-center' },
    },
    isInvalid: {
      true: {
        groupLabel: 'text-danger',
      },
    },
    isDisabled: {
      true: {
        root: 'opacity-50 pointer-events-none',
      },
    },
  },
  defaultVariants: {
    orientation: 'vertical',
    isInvalid: false,
    isDisabled: false,
  },
});

export type RadioVariants = VariantProps<typeof radio>;
export type RadioGroupVariants = VariantProps<typeof radioGroup>;
export type RadioReturnType = ReturnType<typeof radio>;
export type RadioGroupReturnType = ReturnType<typeof radioGroup>;
