'use client';

import type { ComponentProps } from 'react';

import { useTheme } from 'next-themes';
import { tv } from 'tailwind-variants';
import { cn } from '@ideasui/utils';

import { useIsMounted } from '../../../hooks/use-is-mounted';

import { Airplay, Moon, Sun } from '@/components/ui/docs/icons';

const itemVariants = tv({
  base: 'text-content-secondary size-6.5 rounded-full p-1.5 transition-all duration-300',
  variants: {
    active: {
      false: 'text-content-secondary hover:text-content-primary',
      true: 'bg-primary/10 text-primary shadow-[0_0_8px] shadow-primary/10',
    },
  },
});

const full = [['light', Sun] as const, ['dark', Moon] as const, ['system', Airplay] as const];

export function ThemeToggle({
  className,
  mode = 'light-dark',
  ...props
}: ComponentProps<'div'> & {
  mode?: 'light-dark' | 'light-dark-system';
}) {
  const { resolvedTheme, setTheme, theme } = useTheme();
  const mounted = useIsMounted();

  const container = cn(
    'inline-flex cursor-(--cursor-interactive) items-center rounded-full bg-surface-muted/60 backdrop-blur-md p-1',
    className,
  );

  if (mode === 'light-dark') {
    const value = mounted ? resolvedTheme : null;

    return (
      <button
        aria-label="Toggle Theme"
        className={container}
        data-theme-toggle=""
        onClick={() => setTheme(value === 'light' ? 'dark' : 'light')}
      >
        {full.map(([key, Icon]) => {
          if (key === 'system') {
            return;
          }

          return (
            <Icon
              key={key}
              className={cn(itemVariants({ active: value === key }))}
              fill="currentColor"
            />
          );
        })}
      </button>
    );
  }

  const value = mounted ? theme : null;

  return (
    <div className={container} data-theme-toggle="" {...props}>
      {full.map(([key, Icon]) => (
        <button
          key={key}
          aria-label={key}
          className={cn(itemVariants({ active: value === key }))}
          onClick={() => setTheme(key)}
        >
          <Icon className="size-full" fill="currentColor" />
        </button>
      ))}
    </div>
  );
}
