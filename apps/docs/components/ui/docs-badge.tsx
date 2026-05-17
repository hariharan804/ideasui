'use client';

import Link from 'next/link';
import { Code2, Paintbrush } from 'lucide-react';

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
}

const BADGE_CLASS =
  'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all border border-transparent hover:border-default hover:bg-surface-muted text-content-secondary hover:text-content-primary';

/** Renders a row of quick-link badges below the page description */
export function DocsBadges({ source, styles, extra = [] }: DocsBadgesProps) {
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

  if (badges.length === 0) {
    return null;
  }

  return (
    <div className="mt-1 mb-6 flex flex-wrap gap-2">
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
  );
}
