'use client';

import { useEffect, useState } from 'react';
import { trackEvent } from './google-analytics';
import { Github } from './icons';
import { cn } from '@ideasui/utils';

export type GitHubButtonVariant = 'badge' | 'button' | 'outline' | 'ghost';

interface GitHubButtonProperties {
  readonly repo?: string;
  readonly starCount?: number;
  readonly variant?: GitHubButtonVariant;
  readonly showText?: boolean;
  readonly className?: string;
}

function formatStars(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }

  return count.toString();
}

const VARIANT_STYLES: Record<GitHubButtonVariant, string> = {
  badge:
    'h-8 rounded-full px-2.5 sm:px-3.5 text-xs font-medium bg-surface-muted/70 hover:bg-surface-muted text-content-secondary hover:text-content-primary',
  button:
    'h-11 sm:h-12 rounded-xl px-5 sm:px-6 text-sm font-semibold bg-surface/90 hover:bg-surface border border-surface-strong shadow-xs hover:shadow-md text-content-primary',
  outline:
    'h-8 rounded-full px-2.5 sm:px-3.5 text-xs font-medium border border-border bg-transparent hover:bg-surface-muted text-content-secondary hover:text-content-primary',
  ghost:
    'h-8 rounded-full px-2.5 sm:px-3.5 text-xs font-medium bg-background text-content-tertiary hover:text-content-primary',
};

export function GitHubButton({
  repo = 'ideas2logic-lab/ideasui',
  starCount,
  variant = 'badge',
  showText = true,
  className,
}: GitHubButtonProperties) {
  const [stars, setStars] = useState<number | null>(starCount ?? null);

  useEffect(() => {
    if (starCount !== undefined) return;

    let isMounted = true;

    async function fetchStars(): Promise<void> {
      try {
        const response = await fetch(`https://api.github.com/repos/${repo}`);

        if (!response.ok) return;

        const data: unknown = await response.json();

        if (
          isMounted &&
          data &&
          typeof data === 'object' &&
          'stargazers_count' in data &&
          typeof data.stargazers_count === 'number'
        ) {
          setStars(data.stargazers_count);
        }
      } catch {
        // Silently handle fetch failures without showing fake counts
      }
    }

    void fetchStars();

    return () => {
      isMounted = false;
    };
  }, [repo, starCount]);

  const isButton = variant === 'button';

  return (
    <a
      aria-label="GitHub Repository"
      className={cn(
        'group inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap backdrop-blur-md transition-all active:scale-95',
        VARIANT_STYLES[variant],
        className,
      )}
      href={`https://github.com/${repo}`}
      rel="noopener noreferrer"
      target="_blank"
      onClick={() => {
        trackEvent('github_star_click', {
          repo,
          page: globalThis.window === undefined ? '' : globalThis.location.pathname,
        });
      }}
    >
      <Github
        className={cn(
          'shrink-0 transition-transform duration-200 group-hover:scale-110',
          isButton ? 'size-4.5' : 'size-4',
        )}
      />
      <span
        className={cn(
          'font-semibold tracking-tight whitespace-nowrap',
          showText ? 'inline' : 'hidden sm:inline',
        )}
      >
        Star on GitHub
      </span>
      <span
        className={cn(
          'text-content-secondary bg-surface-muted min-size-1 shrink-0 rounded-full font-bold whitespace-nowrap',
          isButton ? 'ml-1.5 px-2.5 py-0.5 text-xs' : 'ml-0.5 px-2 py-0.5 text-[11px] sm:ml-1',
        )}
      >
        {stars && stars > 0 ? formatStars(stars) : '0'}
      </span>
    </a>
  );
}
