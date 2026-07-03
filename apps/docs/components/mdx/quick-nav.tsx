import type { HTMLAttributes } from 'react';
import { cn } from '@ideasui/utils';

interface QuickNavItem {
  title: string;
  description: string;
  href: string;
}

interface QuickNavProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  items: QuickNavItem[];
}

export function QuickNav({ items, title = 'In This Section', className, ...props }: QuickNavProps) {
  if (!items || items.length === 0) return null;

  return (
    <div
      className={cn(
        'not-prose border-base/10 bg-surface-container-low/40 my-4 max-w-xl rounded-2xl border p-5 backdrop-blur-sm',
        className,
      )}
      {...props}
    >
      <div className="text-content-secondary mb-3.5 text-[10px] font-bold tracking-widest uppercase">
        {title}
      </div>
      <div className="flex flex-col gap-1">
        {items.map((item, index) => {
          const numberStr = String(index + 1).padStart(2, '0');

          return (
            <a
              key={item.href}
              className="group hover:bg-surface-container-high -mx-1.5 flex items-center gap-3 rounded-xl px-2 py-1.5 transition-colors"
              href={item.href}
            >
              <span className="border-base/10 bg-surface-container text-primary group-hover:bg-primary group-hover:text-background flex size-5 shrink-0 items-center justify-center rounded-md border font-mono text-[10px] font-semibold transition-all group-hover:border-transparent">
                {numberStr}
              </span>
              <div className="flex min-w-0 flex-1 items-baseline gap-2">
                <span className="text-content-primary group-hover:text-primary text-[13px] leading-5 font-semibold transition-colors">
                  {item.title}
                </span>
                {item.description && (
                  <span className="text-content-secondary truncate text-[11px] leading-5">
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
