import type { HTMLAttributes } from 'react';
import Image from 'next/image';
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
    sm: { width: 24, height: 24, className: 'h-6 w-auto object-contain' },
    md: { width: 26, height: 26, className: 'h-6.5 w-auto object-contain' },
    lg: { width: 36, height: 36, className: 'h-9 w-auto object-contain' },
  };

  const currentIcon = iconSizes[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
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
        <span className="border-primary/28 bg-primary/12 text-primary hidden items-center rounded border px-1.5 py-0.5 text-[10px] font-bold tracking-wide md:inline-flex">
          v1.0
        </span>
      )}
    </div>
  );
}
