import type { VariantProps } from 'tailwind-variants';
import type { Color } from '../utils';

import { tv } from 'tailwind-variants';

import { createCompoundVariants, groupRecipeConfig } from '../utils';

const solidMap: Record<Color, { indicator: string; icon: string }> = {
  primary: {
    indicator:
      'group-data-[selected=true]/checkbox:border-transparent group-data-[selected=true]/checkbox:bg-primary group-data-[selected=true]/checkbox:group-hover/checkbox:bg-primary/90 group-data-[indeterminate=true]/checkbox:border-transparent group-data-[indeterminate=true]/checkbox:bg-primary group-data-[indeterminate=true]/checkbox:group-hover/checkbox:bg-primary/90',
    icon: 'text-background',
  },
  neutral: {
    indicator:
      'group-data-[selected=true]/checkbox:border-transparent group-data-[selected=true]/checkbox:bg-neutral group-data-[selected=true]/checkbox:group-hover/checkbox:bg-neutral/90 group-data-[indeterminate=true]/checkbox:border-transparent group-data-[indeterminate=true]/checkbox:bg-neutral group-data-[indeterminate=true]/checkbox:group-hover/checkbox:bg-neutral/90',
    icon: 'text-background',
  },
  success: {
    indicator:
      'group-data-[selected=true]/checkbox:border-transparent group-data-[selected=true]/checkbox:bg-success group-data-[selected=true]/checkbox:group-hover/checkbox:bg-success/90 group-data-[indeterminate=true]/checkbox:border-transparent group-data-[indeterminate=true]/checkbox:bg-success group-data-[indeterminate=true]/checkbox:group-hover/checkbox:bg-success/90',
    icon: 'text-background',
  },
  warning: {
    indicator:
      'group-data-[selected=true]/checkbox:border-transparent group-data-[selected=true]/checkbox:bg-warning group-data-[selected=true]/checkbox:group-hover/checkbox:bg-warning/90 group-data-[indeterminate=true]/checkbox:border-transparent group-data-[indeterminate=true]/checkbox:bg-warning group-data-[indeterminate=true]/checkbox:group-hover/checkbox:bg-warning/90',
    icon: 'text-background',
  },
  danger: {
    indicator:
      'group-data-[selected=true]/checkbox:border-transparent group-data-[selected=true]/checkbox:bg-danger group-data-[selected=true]/checkbox:group-hover/checkbox:bg-danger/90 group-data-[indeterminate=true]/checkbox:border-transparent group-data-[indeterminate=true]/checkbox:bg-danger group-data-[indeterminate=true]/checkbox:group-hover/checkbox:bg-danger/90',
    icon: 'text-background',
  },
};

const outlineMap: Record<Color, { indicator: string; icon: string }> = {
  primary: {
    indicator:
      'group-data-[selected=true]/checkbox:border-primary group-data-[selected=true]/checkbox:group-hover/checkbox:border-primary/80 group-data-[selected=true]/checkbox:group-hover/checkbox:bg-primary-subtle/30 group-data-[indeterminate=true]/checkbox:border-primary group-data-[indeterminate=true]/checkbox:group-hover/checkbox:border-primary/80 group-data-[indeterminate=true]/checkbox:group-hover/checkbox:bg-primary-subtle/30',
    icon: 'text-primary',
  },
  neutral: {
    indicator:
      'group-data-[selected=true]/checkbox:border-neutral group-data-[selected=true]/checkbox:group-hover/checkbox:border-neutral/80 group-data-[selected=true]/checkbox:group-hover/checkbox:bg-surface-muted/30 group-data-[indeterminate=true]/checkbox:border-neutral group-data-[indeterminate=true]/checkbox:group-hover/checkbox:border-neutral/80 group-data-[indeterminate=true]/checkbox:group-hover/checkbox:bg-surface-muted/30',
    icon: 'text-neutral',
  },
  success: {
    indicator:
      'group-data-[selected=true]/checkbox:border-success group-data-[selected=true]/checkbox:group-hover/checkbox:border-success/80 group-data-[selected=true]/checkbox:group-hover/checkbox:bg-success-subtle/30 group-data-[indeterminate=true]/checkbox:border-success group-data-[indeterminate=true]/checkbox:group-hover/checkbox:border-success/80 group-data-[indeterminate=true]/checkbox:group-hover/checkbox:bg-success-subtle/30',
    icon: 'text-success',
  },
  warning: {
    indicator:
      'group-data-[selected=true]/checkbox:border-warning group-data-[selected=true]/checkbox:group-hover/checkbox:border-warning/80 group-data-[selected=true]/checkbox:group-hover/checkbox:bg-warning-subtle/30 group-data-[indeterminate=true]/checkbox:border-warning group-data-[indeterminate=true]/checkbox:group-hover/checkbox:border-warning/80 group-data-[indeterminate=true]/checkbox:group-hover/checkbox:bg-warning-subtle/30',
    icon: 'text-warning',
  },
  danger: {
    indicator:
      'group-data-[selected=true]/checkbox:border-danger group-data-[selected=true]/checkbox:group-hover/checkbox:border-danger/80 group-data-[selected=true]/checkbox:group-hover/checkbox:bg-danger-subtle/30 group-data-[indeterminate=true]/checkbox:border-danger group-data-[indeterminate=true]/checkbox:group-hover/checkbox:border-danger/80 group-data-[indeterminate=true]/checkbox:group-hover/checkbox:bg-danger-subtle/30',
    icon: 'text-danger',
  },
};

const subtleMap: Record<Color, { indicator: string; icon: string }> = {
  primary: {
    indicator:
      'group-data-[selected=true]/checkbox:bg-primary-subtle group-data-[selected=true]/checkbox:border-primary-subtle group-data-[selected=true]/checkbox:group-hover/checkbox:bg-primary-subtle/80 group-data-[indeterminate=true]/checkbox:bg-primary-subtle group-data-[indeterminate=true]/checkbox:group-hover/checkbox:bg-primary-subtle/80',
    icon: 'text-primary',
  },
  neutral: {
    indicator:
      'group-data-[selected=true]/checkbox:bg-surface-muted group-data-[selected=true]/checkbox:border-surface-muted group-data-[selected=true]/checkbox:group-hover/checkbox:bg-surface-muted/80 group-data-[indeterminate=true]/checkbox:bg-surface-muted group-data-[indeterminate=true]/checkbox:group-hover/checkbox:bg-surface-muted/80',
    icon: 'text-content-primary',
  },
  success: {
    indicator:
      'group-data-[selected=true]/checkbox:bg-success-subtle group-data-[selected=true]/checkbox:border-success-subtle group-data-[selected=true]/checkbox:group-hover/checkbox:bg-success-subtle/80 group-data-[indeterminate=true]/checkbox:bg-success-subtle group-data-[indeterminate=true]/checkbox:group-hover/checkbox:bg-success-subtle/80',
    icon: 'text-success',
  },
  warning: {
    indicator:
      'group-data-[selected=true]/checkbox:bg-warning-subtle group-data-[selected=true]/checkbox:border-warning-subtle group-data-[selected=true]/checkbox:group-hover/checkbox:bg-warning-subtle/80 group-data-[indeterminate=true]/checkbox:bg-warning-subtle group-data-[indeterminate=true]/checkbox:group-hover/checkbox:bg-warning-subtle/80',
    icon: 'text-warning',
  },
  danger: {
    indicator:
      'group-data-[selected=true]/checkbox:bg-danger-subtle group-data-[selected=true]/checkbox:border-danger-subtle group-data-[selected=true]/checkbox:group-hover/checkbox:bg-danger-subtle/80 group-data-[indeterminate=true]/checkbox:bg-danger-subtle group-data-[indeterminate=true]/checkbox:group-hover/checkbox:bg-danger-subtle/80',
    icon: 'text-danger',
  },
};

const ghostMap: Record<Color, { indicator: string; icon: string }> = {
  primary: {
    indicator:
      'group-data-[selected=true]/checkbox:border-primary group-data-[selected=true]/checkbox:group-hover/checkbox:border-primary/80 group-data-[selected=true]/checkbox:group-hover/checkbox:bg-primary-subtle/20 group-data-[indeterminate=true]/checkbox:border-primary group-data-[indeterminate=true]/checkbox:group-hover/checkbox:border-primary/80 group-data-[indeterminate=true]/checkbox:group-hover/checkbox:bg-primary-subtle/20',
    icon: 'text-primary',
  },
  neutral: {
    indicator:
      'group-data-[selected=true]/checkbox:border-neutral group-data-[selected=true]/checkbox:group-hover/checkbox:border-neutral/80 group-data-[selected=true]/checkbox:group-hover/checkbox:bg-surface-muted/20 group-data-[indeterminate=true]/checkbox:border-neutral group-data-[indeterminate=true]/checkbox:group-hover/checkbox:border-neutral/80 group-data-[indeterminate=true]/checkbox:group-hover/checkbox:bg-surface-muted/20',
    icon: 'text-neutral',
  },
  success: {
    indicator:
      'group-data-[selected=true]/checkbox:border-success group-data-[selected=true]/checkbox:group-hover/checkbox:border-success/80 group-data-[selected=true]/checkbox:group-hover/checkbox:bg-success-subtle/20 group-data-[indeterminate=true]/checkbox:border-success group-data-[indeterminate=true]/checkbox:group-hover/checkbox:border-success/80 group-data-[indeterminate=true]/checkbox:group-hover/checkbox:bg-success-subtle/20',
    icon: 'text-success',
  },
  warning: {
    indicator:
      'group-data-[selected=true]/checkbox:border-warning group-data-[selected=true]/checkbox:group-hover/checkbox:border-warning/80 group-data-[selected=true]/checkbox:group-hover/checkbox:bg-warning-subtle/20 group-data-[indeterminate=true]/checkbox:border-warning group-data-[indeterminate=true]/checkbox:group-hover/checkbox:border-warning/80 group-data-[indeterminate=true]/checkbox:group-hover/checkbox:bg-warning-subtle/20',
    icon: 'text-warning',
  },
  danger: {
    indicator:
      'group-data-[selected=true]/checkbox:border-danger group-data-[selected=true]/checkbox:group-hover/checkbox:border-danger/80 group-data-[selected=true]/checkbox:group-hover/checkbox:bg-danger-subtle/20 group-data-[indeterminate=true]/checkbox:border-danger group-data-[indeterminate=true]/checkbox:group-hover/checkbox:border-danger/80 group-data-[indeterminate=true]/checkbox:group-hover/checkbox:bg-danger-subtle/20',
    icon: 'text-danger',
  },
};

const softMap: Record<Color, { indicator: string; icon: string }> = {
  primary: {
    indicator:
      'group-data-[selected=true]/checkbox:bg-primary-subtle group-data-[selected=true]/checkbox:border-primary/40 group-data-[selected=true]/checkbox:group-hover/checkbox:bg-primary-muted group-data-[indeterminate=true]/checkbox:bg-primary-subtle group-data-[indeterminate=true]/checkbox:border-primary/40 group-data-[indeterminate=true]/checkbox:group-hover/checkbox:bg-primary-muted',
    icon: 'text-primary',
  },
  neutral: {
    indicator:
      'group-data-[selected=true]/checkbox:bg-surface-muted group-data-[selected=true]/checkbox:border-border-strong group-data-[selected=true]/checkbox:group-hover/checkbox:bg-surface-subtle group-data-[indeterminate=true]/checkbox:bg-surface-muted group-data-[indeterminate=true]/checkbox:border-border-strong group-data-[indeterminate=true]/checkbox:group-hover/checkbox:bg-surface-subtle',
    icon: 'text-content-primary',
  },
  success: {
    indicator:
      'group-data-[selected=true]/checkbox:bg-success-subtle group-data-[selected=true]/checkbox:border-success/40 group-data-[selected=true]/checkbox:group-hover/checkbox:bg-success-muted group-data-[indeterminate=true]/checkbox:bg-success-subtle group-data-[indeterminate=true]/checkbox:border-success/40 group-data-[indeterminate=true]/checkbox:group-hover/checkbox:bg-success-muted',
    icon: 'text-success',
  },
  warning: {
    indicator:
      'group-data-[selected=true]/checkbox:bg-warning-subtle group-data-[selected=true]/checkbox:border-warning/40 group-data-[selected=true]/checkbox:group-hover/checkbox:bg-warning-muted group-data-[indeterminate=true]/checkbox:bg-warning-subtle group-data-[indeterminate=true]/checkbox:border-warning/40 group-data-[indeterminate=true]/checkbox:group-hover/checkbox:bg-warning-muted',
    icon: 'text-warning',
  },
  danger: {
    indicator:
      'group-data-[selected=true]/checkbox:bg-danger-subtle group-data-[selected=true]/checkbox:border-danger/40 group-data-[selected=true]/checkbox:group-hover/checkbox:bg-danger-muted group-data-[indeterminate=true]/checkbox:bg-danger-subtle group-data-[indeterminate=true]/checkbox:border-danger/40 group-data-[indeterminate=true]/checkbox:group-hover/checkbox:bg-danger-muted',
    icon: 'text-danger',
  },
};

const customIconMap: Record<Color, { indicator: string; icon: string }> = {
  primary: {
    indicator:
      'group-data-[selected=true]/checkbox:border-transparent group-data-[selected=true]/checkbox:bg-transparent group-data-[indeterminate=true]/checkbox:border-transparent group-data-[indeterminate=true]/checkbox:bg-transparent',
    icon: 'text-primary',
  },
  neutral: {
    indicator:
      'group-data-[selected=true]/checkbox:border-transparent group-data-[selected=true]/checkbox:bg-transparent group-data-[indeterminate=true]/checkbox:border-transparent group-data-[indeterminate=true]/checkbox:bg-transparent',
    icon: 'text-content-primary',
  },
  success: {
    indicator:
      'group-data-[selected=true]/checkbox:border-transparent group-data-[selected=true]/checkbox:bg-transparent group-data-[indeterminate=true]/checkbox:border-transparent group-data-[indeterminate=true]/checkbox:bg-transparent',
    icon: 'text-success',
  },
  warning: {
    indicator:
      'group-data-[selected=true]/checkbox:border-transparent group-data-[selected=true]/checkbox:bg-transparent group-data-[indeterminate=true]/checkbox:border-transparent group-data-[indeterminate=true]/checkbox:bg-transparent',
    icon: 'text-warning',
  },
  danger: {
    indicator:
      'group-data-[selected=true]/checkbox:border-transparent group-data-[selected=true]/checkbox:bg-transparent group-data-[indeterminate=true]/checkbox:border-transparent group-data-[indeterminate=true]/checkbox:bg-transparent',
    icon: 'text-danger',
  },
};

const solidCompoundVariants = createCompoundVariants('solid', solidMap);
const outlineCompoundVariants = createCompoundVariants('outline', outlineMap);
const subtleCompoundVariants = createCompoundVariants('subtle', subtleMap);
const ghostCompoundVariants = createCompoundVariants('ghost', ghostMap);
const softCompoundVariants = createCompoundVariants('soft', softMap);
const customIconCompoundVariants = createCompoundVariants('customIcon', customIconMap);

export const checkbox = tv({
  slots: {
    root: 'group/checkbox inline-flex items-center gap-2 cursor-pointer select-none w-fit',
    indicator: [
      'relative flex items-center justify-center shrink-0',
      'border transition-all duration-150 ease-in-out',
      'group-has-[:focus-visible]/checkbox:ring-2 group-has-[:focus-visible]/checkbox:ring-focus group-has-[:focus-visible]/checkbox:ring-offset-2',
      'group-hover/checkbox:scale-105',
    ],
    icon: [
      'pointer-events-none transition-all duration-150 ease-in-out',
      'opacity-0 scale-50',
      'group-data-[selected=true]/checkbox:opacity-100 group-data-[selected=true]/checkbox:scale-100 group-data-[selected=true]/checkbox:group-hover/checkbox:scale-110',
      'group-data-[indeterminate=true]/checkbox:opacity-100 group-data-[indeterminate=true]/checkbox:scale-100 group-data-[indeterminate=true]/checkbox:group-hover/checkbox:scale-110',
    ],
    labelText: [
      'text-content-primary/85 leading-none transition-all duration-150 ease-in-out',
      'group-hover/checkbox:text-content-primary group-hover/checkbox:opacity-100',
    ],
  },

  variants: {
    variant: {
      solid: {
        indicator:
          'border-border-strong bg-surface group-hover/checkbox:border-border-focus group-hover/checkbox:bg-surface-subtle',
      },
      outline: {
        indicator:
          'border-border-strong bg-transparent group-hover/checkbox:border-border-focus group-hover/checkbox:bg-surface-subtle/50',
      },
      subtle: {
        indicator:
          'border-transparent bg-surface-muted group-hover/checkbox:bg-surface-subtle group-hover/checkbox:border-border-subtle',
      },
      ghost: {
        indicator:
          'border-border/30 bg-transparent group-hover/checkbox:border-border-strong group-hover/checkbox:bg-surface-subtle/30',
      },
      soft: {
        indicator:
          'border-border-subtle bg-surface-subtle group-hover/checkbox:border-border-strong group-hover/checkbox:bg-surface-muted',
      },
      customIcon: {
        indicator:
          'border-transparent bg-transparent group-hover/checkbox:border-transparent group-hover/checkbox:bg-transparent',
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
    ...ghostCompoundVariants,
    ...softCompoundVariants,
    ...customIconCompoundVariants,

    // ── Invalid Overrides ───────────────────────────────────────────
    {
      isInvalid: true,
      variant: 'solid',
      class: {
        indicator:
          'group-data-[selected=true]/checkbox:bg-danger group-data-[selected=true]/checkbox:border-danger group-data-[selected=true]/checkbox:group-hover/checkbox:bg-danger/90',
      },
    },
    {
      isInvalid: true,
      variant: 'outline',
      class: {
        indicator:
          'border-danger group-data-[selected=true]/checkbox:border-danger group-hover/checkbox:border-danger/90',
        icon: 'text-danger',
      },
    },
  ],

  defaultVariants: {
    variant: 'solid',
    color: 'primary',
    size: 'md',
    isInvalid: false,
    isDisabled: false,
  },
});

export const checkboxGroup = tv(groupRecipeConfig);

export type CheckboxVariants = VariantProps<typeof checkbox>;
export type CheckboxGroupVariants = VariantProps<typeof checkboxGroup>;
export type CheckboxReturnType = ReturnType<typeof checkbox>;
export type CheckboxGroupReturnType = ReturnType<typeof checkboxGroup>;
