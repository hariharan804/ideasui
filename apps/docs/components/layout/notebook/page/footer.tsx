'use client';

import type { ComponentProps, ReactNode } from 'react';

import { useMemo, useSyncExternalStore } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { usePathname } from 'fumadocs-core/framework';
import Link from 'fumadocs-core/link';
import { useI18n } from 'fumadocs-ui/contexts/i18n';
import { useFooterItems } from 'fumadocs-ui/utils/use-footer-items';
import { cn } from '@ideasui/utils';

import { isActive } from '@/lib/docs/urls';

type Item = { name: ReactNode; description?: ReactNode; url: string };

export interface FooterProps extends ComponentProps<'div'> {
  items?: {
    previous?: Item;
    next?: Item;
  };
}

export function PageFooter({ items, ...props }: FooterProps) {
  const footerList = useFooterItems();
  const pathname = usePathname();

  const { next, previous } = useMemo(() => {
    if (items) return items;

    const idx = footerList.findIndex((item) => isActive(item.url, pathname, false));

    if (idx === -1) return {};

    return {
      next: footerList[idx + 1],
      previous: footerList[idx - 1],
    };
  }, [footerList, items, pathname]);

  if (!previous && !next) return null;

  const hasBoth = !!previous && !!next;

  return (
    <div {...props} className={cn('mt-16 w-full', props.className)}>
      {/* Section label */}
      <div className="mb-4 flex items-center gap-3">
        <span className="text-content-tertiary text-[10px] font-semibold tracking-widest uppercase">
          Continue reading
        </span>
        <div className="border-border-base/40 h-px flex-1 border-t" />
      </div>

      {/* Cards */}
      <div className={cn('grid gap-3', hasBoth ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1')}>
        {previous ? <FooterCard isPrev item={previous} /> : null}
        {next ? (
          <FooterCard
            className={!hasBoth ? 'sm:ml-auto sm:w-full sm:max-w-sm' : ''}
            isPrev={false}
            item={next}
          />
        ) : null}
      </div>
    </div>
  );
}

function FooterCard({
  isPrev,
  item,
  className,
}: {
  isPrev: boolean;
  item: Item;
  className?: string;
}) {
  const { text } = useI18n();
  const label = isPrev ? text.previousPage : text.nextPage;

  return (
    <Link
      className={cn(
        // Layout
        'group relative flex flex-col overflow-hidden rounded-2xl',
        isPrev ? 'items-start' : 'items-end',
        // Padding
        'px-5 py-5',
        // Transition — only safe CSS properties
        'transition-[border-color,box-shadow,transform] duration-200 ease-out',
        // Hover
        'hover:border-primary/40',
        // Active
        'active:translate-y-0',
        className,
      )}
      href={item.url}
    >
      {/*
        Glow: always rendered, opacity transitions — no layout change.
        Separate elements for left/right so no class switching happens.
      */}
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-0 rounded-2xl',
          'opacity-0 transition-opacity duration-300 group-hover:opacity-100',
          isPrev
            ? 'bg-[radial-gradient(180px_circle_at_0%_50%,theme(colors.primary.DEFAULT/10%),transparent)]'
            : 'bg-[radial-gradient(180px_circle_at_100%_50%,theme(colors.primary.DEFAULT/10%),transparent)]',
        )}
      />

      {/* Direction chip */}
      <span
        className={cn(
          'relative mb-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1',
          'border bg-transparent',
          // Stable border + text; only color transitions
          'border-border-base/40 text-content-secondary',
          'transition-[border-color,color,background-color] duration-200',
          'group-hover:border-primary/30 group-hover:bg-primary/8 group-hover:text-primary',
          'text-[10px] font-semibold tracking-widest uppercase',
          !isPrev && 'flex-row-reverse',
        )}
      >
        {isPrev ? (
          <ArrowLeft className="size-2.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
        ) : (
          <ArrowRight className="size-2.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        )}
        {label}
      </span>

      {/* Title */}
      <span
        className={cn(
          'relative line-clamp-2 text-[0.9rem] leading-snug font-semibold',
          'text-content-primary group-hover:text-primary transition-colors duration-200',
          !isPrev && 'text-right',
        )}
      >
        {item.name}
      </span>

      {/* Description */}
      {item.description !== undefined && (
        <span
          className={cn(
            'text-content-secondary relative mt-1.5 line-clamp-1 text-xs leading-relaxed',
            !isPrev && 'text-right',
          )}
        >
          {item.description}
        </span>
      )}

      {/*
        Bottom accent line:
        - Always present, width animates 0 → 75%
        - Separate left/right gradients rendered conditionally (no class toggle)
      */}
      {isPrev ? (
        <span
          aria-hidden
          className="from-primary/70 via-primary/30 absolute bottom-0 left-0 h-px w-0 rounded-full bg-gradient-to-r to-transparent transition-[width] duration-300 group-hover:w-3/4"
        />
      ) : (
        <span
          aria-hidden
          className="from-primary/70 via-primary/30 absolute right-0 bottom-0 h-px w-0 rounded-full bg-gradient-to-l to-transparent transition-[width] duration-300 group-hover:w-3/4"
        />
      )}
    </Link>
  );
}

const noop = () => {};
const emptySubscribe = () => noop;
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function PageLastUpdate({
  date: value,
  ...props
}: Omit<ComponentProps<'p'>, 'children'> & { date: Date }) {
  const { text } = useI18n();
  const isMounted = useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);

  return (
    <p
      {...props}
      className={cn('text-content-tertiary flex items-center gap-1.5 text-[11px]', props.className)}
    >
      <span aria-hidden className="bg-content-tertiary/40 inline-block size-1 rounded-full" />
      {text.lastUpdate}{' '}
      {isMounted ? (
        <span className="text-content-secondary font-medium">
          {value.toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </span>
      ) : null}
    </p>
  );
}

export { PageBreadcrumb } from './breadcrumb';
