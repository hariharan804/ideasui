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
        'not-prose border-base/10 bg-surface-container-low/40 my-2 max-w-xl rounded-2xl border p-6 backdrop-blur-sm',
        className,
      )}
      {...props}
    >
      <div className="text-content-secondary mb-4 text-xs font-bold tracking-wider uppercase">
        {title}
      </div>
      <div className="flex flex-col gap-3">
        {items.map((item, index) => {
          const numberStr = String(index + 1).padStart(2, '0');

          return (
            <a
              key={item.href}
              className="group hover:bg-surface-container-high -mx-2 flex items-start gap-3.5 rounded-xl p-2 transition-colors"
              href={item.href}
            >
              <span className="border-base/10 bg-surface-container text-primary group-hover:bg-primary group-hover:text-background mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-md border font-mono text-[10px] font-semibold transition transition-all group-hover:border-transparent">
                {numberStr}
              </span>
              <div className="flex-1 space-y-1">
                <div className="text-content-primary group-hover:text-primary text-[13px] leading-5 font-semibold transition-colors">
                  {item.title}
                </div>
                {item.description && (
                  <div className="text-content-secondary text-xs leading-normal">
                    {item.description}
                  </div>
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
