import type { HTMLAttributes } from 'react';
import Image from 'next/image';
import { cn } from '@ideasui/utils';
import { Wordmark } from '@/components/ui/wordmark';

interface LogoProperties extends HTMLAttributes<HTMLDivElement> {
  readonly className?: string;
  readonly size?: 'sm' | 'md' | 'lg';
  readonly showVersion?: boolean;
}

export function Logo({
  className = '',
  size = 'md',
  showVersion = true,
}: Readonly<LogoProperties>) {
  const iconSizes = {
    sm: { width: 20, height: 20, className: 'h-5 w-5 shrink-0 object-contain' },
    md: { width: 24, height: 24, className: 'h-6 w-6 shrink-0 object-contain' },
    lg: { width: 30, height: 30, className: 'h-7.5 w-7.5 shrink-0 object-contain' },
  };

  const currentIcon = iconSizes[size];

  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      <Image
        priority
        alt="IdeasUI Icon"
        className={currentIcon.className}
        height={currentIcon.height}
        src="/IdeasUI.svg"
        width={currentIcon.width}
      />
      <Wordmark size={size} />
      {showVersion && (
        <span className="border-primary/20 bg-primary/10 text-primary hidden items-center rounded-md border px-1.5 py-0.5 text-[10px] font-bold tracking-wide md:inline-flex">
          v1.0
        </span>
      )}
    </div>
  );
}
