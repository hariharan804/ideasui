export type Color = 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
export const RECIPE_COLORS: readonly Color[] = [
  'primary',
  'neutral',
  'success',
  'warning',
  'danger',
];

export function createCompoundVariants<V extends string, T>(
  variant: V,
  colorMap: Record<Color, T>,
): Array<{ variant: V; color: Color; class: T }> {
  return RECIPE_COLORS.map((color) => ({
    variant,
    color,
    class: colorMap[color],
  }));
}

export const groupRecipeConfig = {
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
    orientation: 'vertical' as const,
    isInvalid: false,
    isDisabled: false,
  },
};
