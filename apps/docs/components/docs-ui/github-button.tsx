/* eslint-disable sonarjs/no-unused-vars */
'use client';

import { useState } from 'react';
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
    'h-8 rounded-full px-2.5 sm:px-3.5 text-xs font-medium bg-pure text-content-tertiary hover:text-content-primary',
};

export function GitHubButton({
  repo = 'hariharan804/ideasui',
  starCount = 5200,
  variant = 'badge',
  showText = true,
  className,
}: GitHubButtonProperties) {
  const [stars] = useState<number>(starCount);

  // useEffect(() => {
  //   fetch(`https://api.github.com/repos/${repo}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (typeof data.stargazers_count === 'number') {
  //         setStars(data.stargazers_count);
  //       }

  //       return null;
  //     })
  //     .catch(() => {
  //       // Fallback to initial starCount if fetch fails
  //     });
  // }, [repo]);

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
          'text-content-secondary bg-surface-muted shrink-0 rounded-full font-bold whitespace-nowrap',
          isButton ? 'ml-1.5 px-2.5 py-0.5 text-xs' : 'ml-0.5 px-2 py-0.5 text-[11px] sm:ml-1',
        )}
      >
        {formatStars(stars)}
      </span>
    </a>
  );
}
