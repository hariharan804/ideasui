/* eslint-disable unicorn/consistent-function-scoping */
'use client';

import type { ComponentProps, ReactNode } from 'react';

import { useMemo, useSyncExternalStore } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
    if (items) {
      return items;
    }
    const idx = footerList.findIndex((item) => isActive(item.url, pathname, false));

    if (idx === -1) {
      return {};
    }

    return {
      next: footerList[idx + 1],
      previous: footerList[idx - 1],
    };
  }, [footerList, items, pathname]);

  return (
    <div
      {...props}
      className={cn(
        '@container my-8 grid gap-4',
        previous && next ? 'grid-cols-2' : 'grid-cols-1',
        props.className,
      )}
    >
      {previous ? <FooterItem index={0} item={previous} /> : null}
      {next ? <FooterItem index={1} item={next} /> : null}
    </div>
  );
}

function FooterItem({ index, item }: { item: Item; index: 0 | 1 }) {
  const { text } = useI18n();
  const Icon = index === 0 ? ChevronLeft : ChevronRight;

  return (
    <Link
      className={cn(
        'hover:text-on-primary! hover:bg-primary-subtle flex flex-col gap-2 rounded-2xl p-4 text-sm transition-none @max-lg:col-span-full',
        index === 1 && 'text-end',
      )}
      href={item.url}
    >
      <div
        className={cn(
          'inline-flex items-center gap-1.5 font-medium',
          index === 1 && 'flex-row-reverse',
        )}
      >
        <Icon className="-mx-1 size-4 shrink-0 rtl:rotate-180" />
        <p>{item.name}</p>
      </div>
      <p className="text-content-secondary truncate">
        {item.description ?? (index === 0 ? text.previousPage : text.nextPage)}
      </p>
    </Link>
  );
}

const emptySubscribe = () => () => {};

export function PageLastUpdate({
  date: value,
  ...props
}: Omit<ComponentProps<'p'>, 'children'> & { date: Date }) {
  const { text } = useI18n();
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  return (
    <p {...props} className={cn('text-content-secondary text-sm', props.className)}>
      {text.lastUpdate} {isMounted ? value.toLocaleDateString() : null}
    </p>
  );
}

export { PageBreadcrumb } from './breadcrumb';
