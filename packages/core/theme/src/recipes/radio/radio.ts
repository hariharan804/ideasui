import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';

type Color = 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
const COLORS: readonly Color[] = ['primary', 'neutral', 'success', 'warning', 'danger'];

const solidMap: Record<Color, { indicator: string; dot: string }> = {
  primary: {
    indicator: 'group-data-[selected=true]:border-primary group-data-[selected=true]:bg-primary',
    dot: 'bg-background',
  },
  neutral: {
    indicator: 'group-data-[selected=true]:border-neutral group-data-[selected=true]:bg-neutral',
    dot: 'bg-background',
  },
  success: {
    indicator: 'group-data-[selected=true]:border-success group-data-[selected=true]:bg-success',
    dot: 'bg-background',
  },
  warning: {
    indicator: 'group-data-[selected=true]:border-warning group-data-[selected=true]:bg-warning',
    dot: 'bg-background',
  },
  danger: {
    indicator: 'group-data-[selected=true]:border-danger group-data-[selected=true]:bg-danger',
    dot: 'bg-background',
  },
};

const outlineMap: Record<Color, { indicator: string; dot: string }> = {
  primary: {
    indicator: 'group-data-[selected=true]:border-primary',
    dot: 'bg-primary',
  },
  neutral: {
    indicator: 'group-data-[selected=true]:border-neutral',
    dot: 'bg-neutral',
  },
  success: {
    indicator: 'group-data-[selected=true]:border-success',
    dot: 'bg-success',
  },
  warning: {
    indicator: 'group-data-[selected=true]:border-warning',
    dot: 'bg-warning',
  },
  danger: {
    indicator: 'group-data-[selected=true]:border-danger',
    dot: 'bg-danger',
  },
};

const subtleMap: Record<Color, { indicator: string; dot: string }> = {
  primary: {
    indicator:
      'group-data-[selected=true]:bg-primary-subtle group-data-[selected=true]:border-primary-subtle',
    dot: 'bg-primary',
  },
  neutral: {
    indicator:
      'group-data-[selected=true]:bg-surface-muted group-data-[selected=true]:border-surface-muted',
    dot: 'bg-content-primary',
  },
  success: {
    indicator:
      'group-data-[selected=true]:bg-success-subtle group-data-[selected=true]:border-success-subtle',
    dot: 'bg-success',
  },
  warning: {
    indicator:
      'group-data-[selected=true]:bg-warning-subtle group-data-[selected=true]:border-warning-subtle',
    dot: 'bg-warning',
  },
  danger: {
    indicator:
      'group-data-[selected=true]:bg-danger-subtle group-data-[selected=true]:border-danger-subtle',
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

export const radio = tv({
  slots: {
    root: 'group inline-flex items-center gap-2 cursor-pointer select-none',
    indicator: [
      'relative flex items-center justify-center shrink-0',
      'border transition-all duration-150 ease-in-out',
      'group-has-[:focus-visible]:ring-2 group-has-[:focus-visible]:ring-focus group-has-[:focus-visible]:ring-offset-2',
    ],
    dot: [
      'pointer-events-none rounded-full transition-all duration-150 ease-in-out',
      'opacity-0 scale-0',
      'group-data-[selected=true]:opacity-100 group-data-[selected=true]:scale-100',
    ],
    labelText: 'text-content-primary leading-none transition-colors duration-150 ease-in-out',
  },

  variants: {
    variant: {
      solid: {
        indicator: 'border-border-strong bg-surface',
      },
      outline: {
        indicator: 'border-border-strong bg-transparent',
      },
      subtle: {
        indicator: 'border-transparent bg-surface-muted',
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

    // ── Invalid Overrides ───────────────────────────────────────────
    {
      isInvalid: true,
      variant: 'solid',
      class: {
        indicator: 'group-data-[selected=true]:bg-danger group-data-[selected=true]:border-danger',
      },
    },
    {
      isInvalid: true,
      variant: 'outline',
      class: {
        indicator: 'border-danger group-data-[selected=true]:border-danger',
        dot: 'bg-danger',
      },
    },
  ],

  defaultVariants: {
    variant: 'solid',
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
