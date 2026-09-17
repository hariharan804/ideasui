'use client';

import type { ComponentProps, ReactNode } from 'react';

import { useMemo, useState, useCallback, useSyncExternalStore } from 'react';
import { ArrowLeft, ArrowRight, ThumbsUp, ThumbsDown, Sparkles, Check } from 'lucide-react';
import { usePathname } from 'fumadocs-core/framework';
import Link from 'fumadocs-core/link';
import { useFooterItems } from 'fumadocs-ui/utils/use-footer-items';
import { useTranslations } from '@fuma-translate/react';
import { cn } from '@ideasui/utils';

import { isActive } from '@/lib/docs/urls';
import { trackEvent } from '@/components/docs-ui/google-analytics';

type Item = { name: ReactNode; description?: ReactNode; url: string };

export interface FooterProperties extends ComponentProps<'div'> {
  items?: {
    previous?: Item;
    next?: Item;
  };
}

function getClientVote(pathname: string): 'yes' | 'no' | null {
  if (globalThis.window === undefined) return null;
  const saved = localStorage.getItem(`ideasui-feedback-${pathname}`);

  return saved === 'yes' || saved === 'no' ? saved : null;
}

export function DocsFeedbackWidget({ className }: Readonly<{ className?: string }>) {
  const pathname = usePathname();
  const savedVote = useSyncExternalStore(
    emptySubscribe,
    () => getClientVote(pathname),
    () => null,
  );
  const [overrideVote, setOverrideVote] = useState<'yes' | 'no' | null>(null);
  const [prevPath, setPrevPath] = useState(pathname);

  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOverrideVote(null);
  }

  const voted = overrideVote ?? savedVote;

  const handleVote = useCallback(
    (vote: 'yes' | 'no') => {
      setOverrideVote(vote);
      if (globalThis.window !== undefined) {
        localStorage.setItem(`ideasui-feedback-${pathname}`, vote);
      }
      trackEvent('docs_feedback', {
        page: pathname,
        vote,
      });
    },
    [pathname],
  );

  const handleResetVote = useCallback(() => {
    setOverrideVote(null);
    if (globalThis.window !== undefined) {
      localStorage.removeItem(`ideasui-feedback-${pathname}`);
    }
  }, [pathname]);

  return (
    <div
      className={cn(
        'bg-surface-muted/30 border-border-base/40 relative flex flex-col items-start justify-between gap-4 rounded-2xl border p-4.5 backdrop-blur-md transition-all duration-300 sm:flex-row sm:items-center',
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-xl shadow-2xs">
          <Sparkles className="size-4.5" />
        </div>
        <div>
          <h4 className="text-content-primary text-xs font-semibold sm:text-sm">
            Was this page helpful?
          </h4>
          <p className="text-content-tertiary text-[11px] leading-relaxed">
            Your feedback helps us improve IdeasUI components and documentation.
          </p>
        </div>
      </div>

      {voted === null ? (
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            aria-label="Mark page as helpful"
            className="bg-surface-muted/60 hover:bg-surface-muted hover:text-success text-content-secondary border-border-base/40 group inline-flex cursor-pointer items-center gap-1.5 rounded-xl border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 active:scale-95"
            type="button"
            onClick={() => handleVote('yes')}
          >
            <ThumbsUp className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
            <span>Yes</span>
          </button>

          <button
            aria-label="Mark page as unhelpful"
            className="bg-surface-muted/60 hover:bg-surface-muted hover:text-danger text-content-secondary border-border-base/40 group inline-flex cursor-pointer items-center gap-1.5 rounded-xl border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 active:scale-95"
            type="button"
            onClick={() => handleVote('no')}
          >
            <ThumbsDown className="size-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
            <span>No</span>
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          <span className="text-success bg-success/10 inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold">
            <Check className="size-3.5" />
            <span>Thank you for your feedback! ❤️</span>
          </span>
          <button
            aria-label="Change vote"
            className="text-content-tertiary hover:text-content-primary text-[11px] underline transition-colors"
            type="button"
            onClick={handleResetVote}
          >
            Undo
          </button>
        </div>
      )}
    </div>
  );
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

  return (
    <div {...properties} className={cn('mt-16 w-full space-y-6', properties.className)}>
      {/* Was this page helpful? Feedback Widget */}
      <DocsFeedbackWidget />

      {(previous || next) && (
        <>
          {/* Section label */}
          <div className="mb-4 flex items-center gap-3">
            <span className="text-content-tertiary text-[10px] font-semibold tracking-widest uppercase">
              Continue reading
            </span>
            <div className="border-border-base/40 h-px flex-1 border-t" />
          </div>

          {/* Cards */}
          <div
            className={cn(
              'grid gap-3',
              previous && next ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1',
            )}
          >
            {previous ? <FooterCard isPrev item={previous} /> : null}
            {next ? (
              <FooterCard
                className={previous && next ? '' : 'sm:ml-auto sm:w-full sm:max-w-sm'}
                isPrev={false}
                item={next}
              />
            ) : null}
          </div>
        </>
      )}
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
