import { tv } from 'tailwind-variants';
import { colors, buttonSizes, radius } from './system';

// Generate color variants dynamically
const colorVariants = Object.keys(colors).reduce((acc, color) => {
  acc[color] = '';
  return acc;
}, {} as Record<string, string>);

// Generate compound variants dynamically
const compoundVariants = Object.entries(colors).flatMap(([colorKey, colorValue]) => [
  {
    variant: 'solid' as const,
    color: colorKey as keyof typeof colors,
    class: colorValue.solid,
  },
  {
    variant: 'outline' as const,
    color: colorKey as keyof typeof colors,
    class: colorValue.outline,
  },
  {
    variant: 'ghost' as const,
    color: colorKey as keyof typeof colors,
    class: colorValue.ghost,
  },
]);

/**
 * Button variants for IdeasUI components
 */
export const buttonVariants = tv({
  base: [
    'inline-flex items-center justify-center',
    'font-medium text-sm',
    'transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none',
  ],
  variants: {
    variant: {
      solid: '',
      outline: 'border-2 bg-transparent',
      ghost: 'bg-transparent',
    },
    color: colorVariants,
    size: buttonSizes,
    radius,
  },
  compoundVariants,
  defaultVariants: {
    variant: 'solid',
    color: 'default',
    size: 'md',
    radius: 'md',
  },
});