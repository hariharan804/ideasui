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
        'group inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium',
        'bg-surface-muted border-subtle/50 text-content-secondary',
        'hover:bg-surface-subtle hover:text-content-primary',
        'shadow-xs backdrop-blur-md transition-all active:scale-95',
        className,
      )}
      href={`https://github.com/${repo}`}
      rel="noopener noreferrer"
      target="_blank"
    >
      <Github className="size-3.5 shrink-0 transition-transform duration-200 group-hover:scale-110" />
      <span className="font-semibold tracking-tight">{formatStars(stars)}</span>
    </a>
  );
}
