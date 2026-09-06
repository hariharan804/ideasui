import type { HTMLAttributes } from 'react';
import { cn } from '@ideasui/utils';

interface WordmarkProperties extends HTMLAttributes<HTMLSpanElement> {
  readonly className?: string;
  readonly size?: 'sm' | 'md' | 'lg';
}

export function Wordmark({ className = '', size = 'md' }: Readonly<WordmarkProperties>) {
  const sizeClasses = {
    sm: 'text-base font-bold leading-none',
    md: 'text-xl font-bold leading-none',
    lg: 'text-2xl font-bold leading-none',
  };

  return (
    <span className={cn('inline-flex items-center tracking-tight', sizeClasses[size], className)}>
      <span className="text-content-primary">Ideas</span>
      <span className="from-primary via-secondary to-tertiary ml-0.5 bg-gradient-to-r bg-clip-text font-extrabold text-transparent">
        UI
      </span>
    </span>
  );
}
