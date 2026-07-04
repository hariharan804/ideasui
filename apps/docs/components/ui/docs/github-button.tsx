'use client';

import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { Github } from './icons';
import { cn } from '@ideasui/utils';

interface GitHubButtonProperties {
  readonly repo: string;
  readonly className?: string;
}

export function GitHubButton({ repo, className }: GitHubButtonProperties) {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${repo}`)
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.stargazers_count === 'number') {
          setStars(data.stargazers_count);
        }

        return null;
      })
      .catch((error) => console.error('Failed to fetch GitHub stars', error));
  }, [repo]);

  return (
    <a
      className={cn(
        'group bg-surface-subtle text-content-secondary hover:text-content-primary inline-flex items-center gap-2 rounded-3xl px-2.5 py-1.5 text-sm backdrop-blur-md transition-all duration-300',
        className,
      )}
      href={`https://github.com/${repo}`}
      rel="noopener noreferrer"
      target="_blank"
    >
      <Github className="size-4" />
      <span className="max-sm:hidden">GitHub</span>
      {stars !== null && (
        <div className="border-base/30 ml-1 flex items-center gap-1 border-l pl-2">
          <Star className="fill-warning text-warning size-3" />
          <span className="font-mono text-xs font-semibold">
            {stars > 1000 ? `${(stars / 1000).toFixed(1)}k` : stars}
          </span>
        </div>
      )}
    </a>
  );
}
