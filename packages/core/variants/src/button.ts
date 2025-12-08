import { tv } from 'tailwind-variants'
import { colors, buttonSizes, radius } from './system'

// Get strictly-typed color keys
const colorKeys = Object.keys(colors) as Array<keyof typeof colors>

// Create a type-safe color variant map (values are unused, tv only needs the keys)
const colorVariants = colorKeys.reduce(
  (acc, key) => {
    acc[key] = ''
    return acc
  },
  {} as Record<keyof typeof colors, string>
)

// Build compound variants from your system tokens
const compoundVariants = colorKeys.flatMap((color) => [
  { variant: 'solid' as const, color, class: colors[color].solid },
  { variant: 'outline' as const, color, class: colors[color].outline },
  { variant: 'ghost' as const, color, class: colors[color].ghost },
])

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
    // a couple of useful states you’ll likely want
    'data-[state=loading]:cursor-wait',
    'select-none',
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
    // optional: square/icon buttons
    isIcon: {
      true: 'aspect-square p-0',
    },
    fullWidth: {
      true: 'w-full',
    },
  },
  compoundVariants,
  defaultVariants: {
    variant: 'solid',
    color: 'default',
    size: 'md',
    radius: 'md',
  },
})
