import type { HTMLAttributes } from 'react';

interface LogoProperties extends HTMLAttributes<HTMLDivElement> {
  readonly className?: string;
}

export function Logo({ className }: Readonly<LogoProperties>) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="from-primary to-info text-on-primary flex size-7 items-center justify-center rounded bg-linear-to-br text-sm font-black shadow-sm">
        I
      </div>
      <span className="text-content-primary text-base font-bold tracking-tight">IdeasUI</span>
      <span className="border-primary/28 bg-primary/12 text-primary hidden items-center rounded border px-1.5 py-0.5 text-[10px] font-bold tracking-wide md:inline-flex">
        v1.0
      </span>
    </div>
  );
}
