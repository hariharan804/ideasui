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
 * {{pascalCase name}} variants for IdeasUI components
 */
export const {{camelCase name}}Variants = tv({
  base: [
    // Add base classes here
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