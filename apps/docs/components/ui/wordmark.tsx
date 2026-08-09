import type { HTMLAttributes } from 'react';

interface WordmarkProperties extends HTMLAttributes<HTMLSpanElement> {
  readonly className?: string;
  readonly size?: 'sm' | 'md' | 'lg';
}

export function Wordmark({ className = '', size = 'md' }: Readonly<WordmarkProperties>) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl md:text-2xl',
  };

  return (
    <span
      className={`inline-flex items-center font-bold tracking-tight ${sizeClasses[size]} ${className}`}
    >
      <span className="text-content-primary">Ideas</span>
      <span className="from-primary-500 via-secondary-500 to-tertiary-500 ml-0.5 bg-gradient-to-r bg-clip-text font-extrabold text-transparent">
        UI
      </span>
    </span>
  );
}
