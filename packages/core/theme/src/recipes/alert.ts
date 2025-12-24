import { tv } from 'tailwind-variants';

export const alert = tv({
  base: 'relative w-full rounded-lg border p-4',
  variants: {
    variant: {
      default: 'bg-background text-foreground',
      success: 'border-success/50 text-success dark:border-success [&>svg]:text-success',
      warning: 'border-warning/50 text-warning dark:border-warning [&>svg]:text-warning',
      danger: 'border-danger/50 text-danger dark:border-danger [&>svg]:text-danger',
      info: 'border-info/50 text-info dark:border-info [&>svg]:text-info',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
  slots: {
    base: 'relative w-full rounded-lg border p-4',
    icon: 'h-4 w-4',
    title: 'mb-1 font-medium leading-none tracking-tight',
    description: 'text-sm [&_p]:leading-relaxed',
    close: 'absolute right-2 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  },
});