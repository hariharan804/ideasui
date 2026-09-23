import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';

type ColorScheme = 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
const COLOR_SCHEMES: readonly ColorScheme[] = [
  'primary',
  'neutral',
  'success',
  'warning',
  'danger',
];

const solidMap: Record<ColorScheme, { indicator: string; icon: string }> = {
  primary: {
    indicator:
      'group-data-[selected=true]:border-transparent group-data-[selected=true]:bg-primary group-data-[indeterminate=true]:border-transparent group-data-[indeterminate=true]:bg-primary',
    icon: 'text-background',
  },
  neutral: {
    indicator:
      'group-data-[selected=true]:border-transparent group-data-[selected=true]:bg-neutral group-data-[indeterminate=true]:border-transparent group-data-[indeterminate=true]:bg-neutral',
    icon: 'text-background',
  },
  success: {
    indicator:
      'group-data-[selected=true]:border-transparent group-data-[selected=true]:bg-success group-data-[indeterminate=true]:border-transparent group-data-[indeterminate=true]:bg-success',
    icon: 'text-background',
  },
  warning: {
    indicator:
      'group-data-[selected=true]:border-transparent group-data-[selected=true]:bg-warning group-data-[indeterminate=true]:border-transparent group-data-[indeterminate=true]:bg-warning',
    icon: 'text-background',
  },
  danger: {
    indicator:
      'group-data-[selected=true]:border-transparent group-data-[selected=true]:bg-danger group-data-[indeterminate=true]:border-transparent group-data-[indeterminate=true]:bg-danger',
    icon: 'text-background',
  },
};

const outlineMap: Record<ColorScheme, { indicator: string; icon: string }> = {
  primary: {
    indicator:
      'group-data-[selected=true]:border-primary group-data-[indeterminate=true]:border-primary',
    icon: 'text-primary',
  },
  neutral: {
    indicator:
      'group-data-[selected=true]:border-neutral group-data-[indeterminate=true]:border-neutral',
    icon: 'text-neutral',
  },
  success: {
    indicator:
      'group-data-[selected=true]:border-success group-data-[indeterminate=true]:border-success',
    icon: 'text-success',
  },
  warning: {
    indicator:
      'group-data-[selected=true]:border-warning group-data-[indeterminate=true]:border-warning',
    icon: 'text-warning',
  },
  danger: {
    indicator:
      'group-data-[selected=true]:border-danger group-data-[indeterminate=true]:border-danger',
    icon: 'text-danger',
  },
};

const subtleMap: Record<ColorScheme, { indicator: string; icon: string }> = {
  primary: {
    indicator:
      'group-data-[selected=true]:bg-primary-subtle group-data-[selected=true]:border-primary-subtle group-data-[indeterminate=true]:bg-primary-subtle',
    icon: 'text-primary',
  },
  neutral: {
    indicator:
      'group-data-[selected=true]:bg-surface-muted group-data-[selected=true]:border-surface-muted group-data-[indeterminate=true]:bg-surface-muted',
    icon: 'text-content-primary',
  },
  success: {
    indicator:
      'group-data-[selected=true]:bg-success-subtle group-data-[selected=true]:border-success-subtle group-data-[indeterminate=true]:bg-success-subtle',
    icon: 'text-success',
  },
  warning: {
    indicator:
      'group-data-[selected=true]:bg-warning-subtle group-data-[selected=true]:border-warning-subtle group-data-[indeterminate=true]:bg-warning-subtle',
    icon: 'text-warning',
  },
  danger: {
    indicator:
      'group-data-[selected=true]:bg-danger-subtle group-data-[selected=true]:border-danger-subtle group-data-[indeterminate=true]:bg-danger-subtle',
    icon: 'text-danger',
  },
};

const solidCompoundVariants = COLOR_SCHEMES.map((colorScheme) => ({
  variant: 'solid' as const,
  colorScheme,
  class: solidMap[colorScheme],
}));

const outlineCompoundVariants = COLOR_SCHEMES.map((colorScheme) => ({
  variant: 'outline' as const,
  colorScheme,
  class: outlineMap[colorScheme],
}));

const subtleCompoundVariants = COLOR_SCHEMES.map((colorScheme) => ({
  variant: 'subtle' as const,
  colorScheme,
  class: subtleMap[colorScheme],
}));

export const checkbox = tv({
  slots: {
    root: 'group inline-flex items-center gap-2 cursor-pointer select-none',
    indicator: [
      'relative flex items-center justify-center shrink-0',
      'border transition-all duration-150 ease-in-out',
      'group-has-[:focus-visible]:ring-2 group-has-[:focus-visible]:ring-focus group-has-[:focus-visible]:ring-offset-2',
    ],
    icon: [
      'pointer-events-none transition-all duration-150 ease-in-out',
      'opacity-0 scale-50',
      'group-data-[selected=true]:opacity-100 group-data-[selected=true]:scale-100',
      'group-data-[indeterminate=true]:opacity-100 group-data-[indeterminate=true]:scale-100',
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

    colorScheme: {
      primary: {},
      neutral: {},
      success: {},
      warning: {},
      danger: {},
    },

    size: {
      sm: {
        root: 'gap-1.5',
        indicator: 'size-3.5 rounded-[3px]',
        icon: 'size-2.5',
        labelText: 'text-xs',
      },
      md: {
        root: 'gap-2',
        indicator: 'size-4 rounded-[4px]',
        icon: 'size-3',
        labelText: 'text-sm',
      },
      lg: {
        root: 'gap-2.5',
        indicator: 'size-5 rounded-md',
        icon: 'size-3.5',
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
        icon: 'text-danger',
      },
    },
  ],

  defaultVariants: {
    variant: 'solid',
    colorScheme: 'primary',
    size: 'md',
    isInvalid: false,
    isDisabled: false,
  },
});

export const checkboxGroup = tv({
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

export type CheckboxVariants = VariantProps<typeof checkbox>;
export type CheckboxGroupVariants = VariantProps<typeof checkboxGroup>;
export type CheckboxReturnType = ReturnType<typeof checkbox>;
export type CheckboxGroupReturnType = ReturnType<typeof checkboxGroup>;
