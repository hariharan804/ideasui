'use client';

import Link from 'next/link';
import { Logo } from '@/components/ui/logo';

interface NavLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Docs', href: '/react/docs/start' },
  { label: 'Components', href: '/react/docs/components' },
  { label: 'Changelog', href: '/react/docs/changelog' },
  {
    label: 'GitHub',
    href: 'https://github.com/hariharan804/ideasui',
    isExternal: true,
  },
  {
    label: 'License',
    href: 'https://github.com/hariharan804/ideasui/blob/main/LICENSE',
    isExternal: true,
  },
];

/** Clean, minimal landing footer with powered-by credit using semantic tokens. */
export function LandingFooter() {
  return (
    <footer className="border-surface-muted bg-background/60 border-t py-8 text-xs backdrop-blur-md sm:py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-4 sm:flex-row sm:px-6">
        {/* Left: Brand Logo & Powered By Credit */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          <Logo showVersion={false} size="md" />
          <span className="text-content-muted">·</span>
          <span className="text-content-tertiary">
            Powered by{' '}
            <a
              className="text-primary font-semibold transition-colors hover:underline"
              href="https://ideas2logic.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              Ideas2Logic
            </a>
          </span>
        </div>

        {/* Right: Quick Links & Copyright */}
        <div className="text-content-muted flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {NAV_LINKS.map(({ label, href, isExternal }) =>
            isExternal ? (
              <a
                key={label}
                className="hover:text-content-primary transition-colors"
                href={href}
                rel="noopener noreferrer"
                target="_blank"
              >
                {label}
              </a>
            ) : (
              <Link
                key={label}
                className="hover:text-content-primary transition-colors"
                href={href}
              >
                {label}
              </Link>
            ),
          )}
          <span className="text-content-muted font-mono text-[11px]">
            © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}
