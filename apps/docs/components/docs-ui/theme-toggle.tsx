'use client';

import type { ComponentProps } from 'react';

import { useTheme } from 'next-themes';
import { cn } from '@ideasui/utils';

import { useIsMounted } from '@/hooks/use-is-mounted';

import { Airplay, Moon, Sun } from '@/components/docs-ui/icons';

const full = [['light', Sun] as const, ['dark', Moon] as const, ['system', Airplay] as const];

export function ThemeToggle({
  className,
  mode = 'light-dark',
  ...properties
}: ComponentProps<'div'> & {
  mode?: 'light-dark' | 'light-dark-system';
}) {
  const { resolvedTheme, setTheme, theme } = useTheme();
  const mounted = useIsMounted();
  const icons = mode === 'light-dark' ? full.filter(([key]) => key !== 'system') : full;
  const activeTheme = mode === 'light-dark' ? resolvedTheme : theme;
  const value = mounted ? activeTheme : null;

  return (
    <div
      className={cn('flex items-center gap-0.5', className)}
      data-theme-toggle=""
      {...properties}
    >
      {icons.map(([key, Icon]) => {
        const isActive = value === key;

        return (
          <button
            key={key}
            aria-label={`Switch to ${key} theme`}
            className={cn(
              'flex size-7 cursor-pointer items-center justify-center rounded-full p-1.5 transition-all duration-200',
              isActive
                ? 'bg-white/90 text-neutral-800 shadow-sm dark:bg-neutral-400 dark:text-white'
                : 'text-neutral-500 hover:bg-black/[0.06] hover:text-neutral-800 dark:text-neutral-400 dark:hover:bg-white/[0.08] dark:hover:text-white',
            )}
            onClick={() => setTheme(key)}
          >
            <Icon className="size-full" fill="currentColor" />
          </button>
        );
      })}
    </div>
  );
}
