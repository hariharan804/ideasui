'use client';

import type { ComponentProps, ReactNode } from 'react';

import { useMemo, useSyncExternalStore } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { usePathname } from 'fumadocs-core/framework';
import Link from 'fumadocs-core/link';
import { useFooterItems } from 'fumadocs-ui/utils/use-footer-items';
import { useTranslations } from '@fuma-translate/react';
import { cn } from '@ideasui/utils';

import { isActive } from '@/lib/docs/urls';

type Item = { name: ReactNode; description?: ReactNode; url: string };

export interface FooterProperties extends ComponentProps<'div'> {
  items?: {
    previous?: Item;
    next?: Item;
  };
}

export function PageFooter({ items, ...properties }: Readonly<FooterProperties>) {
  const footerList = useFooterItems();
  const pathname = usePathname();

  const { next, previous } = useMemo(() => {
    if (items) return items;

    const index = footerList.findIndex((item) => isActive(item.url, pathname, false));

    if (index === -1) return {};

    return {
      next: footerList[index + 1],
      previous: footerList[index - 1],
    };
  }, [footerList, items, pathname]);

  if (!previous && !next) return null;

  const hasBoth = !!previous && !!next;

  return (
    <div {...properties} className={cn('mt-16 w-full', properties.className)}>
      {/* Section label */}
      <div className="mb-4 flex items-center gap-3">
        <span className="text-content-tertiary text-[10px] font-semibold tracking-widest uppercase">
          Continue reading
        </span>
        <div className="border-divider-base/40 h-px flex-1 border-t" />
      </div>

      {/* Cards */}
      <div className={cn('grid gap-3', hasBoth ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1')}>
        {previous ? <FooterCard isPrev item={previous} /> : null}
        {next ? (
          <FooterCard
            className={hasBoth ? '' : 'sm:ml-auto sm:w-full sm:max-w-sm'}
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
}: Readonly<{
  isPrev: boolean;
  item: Item;
  className?: string;
}>) {
  const t = useTranslations({ note: 'pagination' });
  const label = isPrev ? t('Previous Page') : t('Next Page');

  return (
    <Link
      className={cn(
        'group bg-surface-muted/40 hover:bg-surface-muted/80 relative flex items-center gap-3.5 rounded-2xl p-4 transition-all duration-200 active:scale-[0.99]',
        !isPrev && 'flex-row-reverse text-right',
        className,
      )}
      href={item.url}
    >
      {/* Soft Arrow Circle */}
      <div className="bg-surface-muted/80 text-content-tertiary group-hover:bg-primary/10 group-hover:text-primary flex size-9 shrink-0 items-center justify-center rounded-full transition-colors duration-200">
        {isPrev ? (
          <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
        ) : (
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        )}
      </div>

      {/* Content Column */}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-content-tertiary group-hover:text-primary text-[10px] font-medium tracking-wider uppercase transition-colors">
          {label}
        </span>
        <span className="text-content-primary group-hover:text-primary line-clamp-1 text-xs font-semibold transition-colors sm:text-sm">
          {item.name}
        </span>
        {item.description !== undefined && (
          <span className="text-content-tertiary line-clamp-1 text-[11px] leading-relaxed">
            {item.description}
          </span>
        )}
      </div>
    </Link>
  );
}

const noop = () => {};
const emptySubscribe = () => noop;
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function PageLastUpdate({
  date: value,
  ...properties
}: Omit<ComponentProps<'p'>, 'children'> & { date: Date }) {
  const t = useTranslations({ note: 'page footer' });
  const isMounted = useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);

  return (
    <p
      {...properties}
      className={cn(
        'text-content-tertiary flex items-center gap-1.5 text-[11px]',
        properties.className,
      )}
    >
      <span aria-hidden className="bg-content-tertiary/40 inline-block size-1 rounded-3xl" />
      {t('Last updated on')}{' '}
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
