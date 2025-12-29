import { tv } from 'tailwind-variants';

export const badge = tv({
  base: 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  variants: {
    variant: {
      default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
      secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
      outline: 'text-foreground',
      success: 'border-transparent bg-success text-success-foreground hover:bg-success/80',
      warning: 'border-transparent bg-warning text-warning-foreground hover:bg-warning/80',
      danger: 'border-transparent bg-danger text-danger-foreground hover:bg-danger/80',
      info: 'border-transparent bg-info text-info-foreground hover:bg-info/80',
    },
    size: {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-0.5 text-xs',
      lg: 'px-3 py-1 text-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
  slots: {
    base: 'inline-flex items-center rounded-full border font-semibold transition-colors',
    icon: 'shrink-0',
    label: 'truncate',
    dot: 'w-2 h-2 rounded-full',
  },
});