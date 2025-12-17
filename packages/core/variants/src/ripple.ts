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
 * Ripple variants for IdeasUI components
 */
export const rippleVariants = tv({
  base: [
    'inline-flex items-center justify-center',
    'font-medium transition-colors duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  variants: {
    variant: {
      solid: '',
      outline: 'border-2 bg-transparent',
      ghost: 'bg-transparent hover:bg-opacity-10',
    },
    color: colorVariants,
    size: buttonSizes,
    radius,
  },
  compoundVariants,
  defaultVariants: {
    variant: 'solid',
    color: 'primary',
    size: 'md',
    radius: 'md',
  },
});