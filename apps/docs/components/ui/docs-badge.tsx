'use client';

import Link from 'next/link';
import { Code2, Paintbrush } from 'lucide-react';
import { CopyDropdown } from '@/components/ui/copy-dropdown';

interface DocsBadge {
  label: string;
  href: string;
  icon: React.ReactNode;
  external?: boolean;
}

interface DocsBadgesProps {
  /** GitHub source URL */
  source?: string;
  /** Styles source URL */
  styles?: string;
  /** Additional badges */
  extra?: DocsBadge[];
  /** Raw page markdown content */
  rawMarkdown?: string;
  /** Page title */
  pageTitle?: string;
}

const BADGE_CLASS =
  'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-3xl text-[11px] font-medium transition-all duration-300 bg-surface-muted/40 text-content-secondary hover:text-content-primary hover:bg-surface-muted/80 hover:scale-[1.03] hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] active:scale-[0.98]';

/** Renders a row of quick-link badges below the page description */
export function DocsBadges({
  source,
  styles,
  extra = [],
  rawMarkdown,
  pageTitle,
}: DocsBadgesProps) {
  const badges: DocsBadge[] = [
    ...(source
      ? [{ label: 'Source', href: source, icon: <Code2 className="size-3.5" />, external: true }]
      : []),
    ...(styles
      ? [
          {
            label: 'Styles source',
            href: styles,
            icon: <Paintbrush className="size-3.5" />,
            external: true,
          },
        ]
      : []),
    ...extra,
  ];

  if (badges.length === 0 && !rawMarkdown) {
    return null;
  }

  return (
    <div className="mt-1 mb-6 flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        {badges.map((badge) => (
          <Link
            key={badge.label}
            className={BADGE_CLASS}
            href={badge.href}
            rel={badge.external ? 'noopener noreferrer' : undefined}
            target={badge.external ? '_blank' : undefined}
          >
            {badge.icon}
            {badge.label}
          </Link>
        ))}
      </div>
      {rawMarkdown && <CopyDropdown pageTitle={pageTitle || ''} rawMarkdown={rawMarkdown} />}
    </div>
  );
}
