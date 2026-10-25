'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Home, Blocks, ArrowLeft, Search } from 'lucide-react';
import { useSearchContext } from 'fumadocs-ui/contexts/search';
import { ROUTES } from '@/config/routes';
import { cn } from '@ideasui/utils';

export interface NotFoundActionsProps {
  className?: string;
}

/**
 * Interactive actions toolbar for the 404 Not Found page.
 * Provides instant search dialog trigger with shortcut keys,
 * direct navigation back to Home, and browsing component docs.
 */
export function NotFoundActions({ className }: Readonly<NotFoundActionsProps>) {
  const router = useRouter();
  const { enabled, hotKey, setOpenSearch } = useSearchContext();

  return (
    <div
      className={cn(
        'flex w-full max-w-xl flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap',
        className,
      )}
    >
      {/* Primary: Return Home */}
      <Link
        className="group bg-primary text-on-primary shadow-primary/20 hover:bg-primary/95 hover:shadow-primary/35 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold whitespace-nowrap shadow-md transition-all duration-200 hover:-translate-y-0.5 active:scale-95 sm:h-12 sm:w-auto sm:px-6"
        href={ROUTES.home}
      >
        <Home className="size-4 transition-transform duration-200 group-hover:scale-110" />
        <span>Return to Home</span>
      </Link>

      {/* Secondary: Browse Components */}
      <Link
        className="group border-border-base/80 bg-surface text-content-primary hover:bg-surface-subtle shadow-surface/5 hover:border-border-strong inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border px-5 text-sm font-semibold whitespace-nowrap shadow-2xs backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 active:scale-95 sm:h-12 sm:w-auto sm:px-6"
        href={ROUTES.docs.components}
      >
        <Blocks className="text-primary size-4 transition-transform duration-200 group-hover:scale-110" />
        <span>Browse Components</span>
      </Link>

      {/* Search Documentation Trigger (opens global search dialog) */}
      {enabled !== false && (
        <button
          aria-label="Open documentation search"
          className="group border-border-base/80 bg-surface-subtle/80 text-content-secondary hover:text-content-primary hover:bg-surface shadow-surface/5 hover:border-border-strong inline-flex h-11 w-full items-center justify-center gap-2.5 rounded-xl border px-4 text-sm font-medium shadow-2xs backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 active:scale-95 sm:h-12 sm:w-auto sm:px-5"
          type="button"
          onClick={() => setOpenSearch(true)}
        >
          <Search className="text-content-tertiary group-hover:text-primary size-4 transition-transform duration-200 group-hover:scale-110" />
          <span>Search docs</span>
          <div className="ml-1 hidden items-center gap-1 sm:inline-flex">
            {hotKey?.length > 0 ? (
              hotKey.map((k, index) => (
                <kbd
                  key={typeof k.key === 'string' ? k.key : index}
                  className="border-border-subtle bg-surface text-content-tertiary inline-flex h-5 min-w-5 items-center justify-center rounded border px-1 font-mono text-[10px] font-semibold tracking-wider uppercase shadow-2xs"
                >
                  {k.display === 'Control' ? 'Ctrl' : k.display}
                </kbd>
              ))
            ) : (
              <kbd className="border-border-subtle bg-surface text-content-tertiary inline-flex h-5 min-w-5 items-center justify-center rounded border px-1.5 font-mono text-[10px] font-semibold tracking-wider uppercase shadow-2xs">
                ⌘K
              </kbd>
            )}
          </div>
        </button>
      )}

      {/* Go Back button (if historical navigation exists) */}
      <button
        aria-label="Go back to previous page"
        className="text-content-tertiary hover:text-content-primary inline-flex h-9 items-center justify-center gap-1.5 rounded-lg px-3 text-xs font-medium transition-colors hover:underline"
        type="button"
        onClick={() => router.back()}
      >
        <ArrowLeft className="size-3.5" />
        <span>Go back to previous page</span>
      </button>
    </div>
  );
}
