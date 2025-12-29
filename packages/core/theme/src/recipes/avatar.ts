import { tv } from 'tailwind-variants';

export const avatar = tv({
  base: 'relative flex shrink-0 overflow-hidden rounded-full',
  variants: {
    size: {
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12',
      xl: 'h-16 w-16',
    },
  },
  defaultVariants: {
    size: 'md',
  },
  slots: {
    base: 'relative flex shrink-0 overflow-hidden rounded-full',
    image: 'aspect-square h-full w-full object-cover',
    fallback: 'flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground',
    indicator: 'absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-background',
  },
});