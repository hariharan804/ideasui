import type { HTMLAttributes } from 'react';
import { cn } from '@ideasui/utils';

interface QuickNavItem {
  title: string;
  description: string;
  href: string;
}

interface QuickNavProperties extends HTMLAttributes<HTMLDivElement> {
  readonly title?: string;
  readonly items: QuickNavItem[];
}

export function QuickNav({
  items,
  title = 'In This Section',
  className,
  ...properties
}: Readonly<QuickNavProperties>) {
  if (!items || items.length === 0) return null;

  return (
    <div
      className={cn(
        'not-prose bg-surface-muted/50 my-6 w-full max-w-xl rounded-2xl p-4 sm:p-5',
        className,
      )}
      {...properties}
    >
      <div className="text-content-tertiary mb-3 text-[10px] font-bold tracking-wider uppercase">
        {title}
      </div>
      <div className="flex flex-col gap-1">
        {items.map((item, index) => {
          const numberString = String(index + 1).padStart(2, '0');

          return (
            <a
              key={item.href}
              className="group hover:bg-surface-subtle/60 flex items-start gap-3 rounded-xl p-2 transition-all duration-150 active:scale-[0.99] sm:items-center"
              href={item.href}
            >
              <span className="bg-primary/10 text-primary mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-semibold sm:mt-0">
                {numberString}
              </span>
              <div className="flex min-w-0 flex-1 flex-col sm:flex-row sm:items-baseline sm:gap-2">
                <span className="text-content-primary group-hover:text-primary text-xs leading-snug font-semibold transition-colors sm:text-[13px]">
                  {item.title}
                </span>
                {item.description && (
                  <span className="text-content-tertiary truncate text-[11px] leading-relaxed">
                    {item.description}
                  </span>
                )}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

QuickNav.displayName = 'IdeasUI.QuickNav';
