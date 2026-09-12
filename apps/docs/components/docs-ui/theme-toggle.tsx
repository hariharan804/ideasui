'use client';

import type { ComponentProps } from 'react';

import { useTheme } from '@ideasui/theme';
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
                ? 'bg-surface text-content-primary shadow-xs'
                : 'text-content-tertiary hover:text-content-primary',
            )}
            type="button"
            onClick={() => setTheme(key)}
          >
            <Icon className="size-full" fill="currentColor" />
          </button>
        );
      })}
    </div>
  );
}
