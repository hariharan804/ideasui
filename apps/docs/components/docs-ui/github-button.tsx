'use client';

import { useEffect, useState } from 'react';
import { Github } from './icons';
import { cn } from '@ideasui/utils';

interface GitHubButtonProperties {
  readonly repo?: string;
  readonly starCount?: number;
  readonly className?: string;
}

function formatStars(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }

  return count.toString();
}

export function GitHubButton({
  repo = 'hariharan804/ideasui',
  starCount = 5200,
  className,
}: GitHubButtonProperties) {
  const [stars, setStars] = useState<number>(starCount);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${repo}`)
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.stargazers_count === 'number') {
          setStars(data.stargazers_count);
        }

        return null;
      })
      .catch(() => {
        // Fallback to initial starCount if fetch fails
      });
  }, [repo]);

  return (
    <a
      aria-label="GitHub Repository"
      className={cn(
        'group inline-flex h-8 items-center gap-1.5 rounded-full px-3.5 text-xs font-medium',
        'bg-surface-muted text-content-tertiary',
        'hover:bg-surface-subtle hover:text-content-primary',
        'shadow-xs backdrop-blur-md transition-all active:scale-95',
        className,
      )}
      href={`https://github.com/${repo}`}
      rel="noopener noreferrer"
      target="_blank"
    >
      <Github className="size-4 shrink-0 transition-transform duration-200 group-hover:scale-110" />
      <span className="font-semibold tracking-tight">Star on GitHub</span>
      <span className="text-content-secondary ml-1 rounded-full bg-black/8 px-2 py-0.5 text-[11px] font-bold dark:bg-white/10">
        {formatStars(stars)}
      </span>
    </a>
  );
}
