'use client';

import type { ComponentProps } from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@ideasui/utils';
import { Logo } from '@/components/ui/logo';
import { GitHubButton } from '@/components/docs-ui/github-button';
import { ThemeToggle } from '@/components/docs-ui/theme-toggle';

const NAV_LINKS = [
  { label: 'Docs', href: '/react/docs/start' },
  { label: 'Components', href: '/react/docs/components' },
  { label: 'Changelog', href: '/react/docs/changelog' },
] as const;

/**
 * Shared pill container matching DocsNavbar layout.
 */
function NavbarPill({ children, className, ...properties }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'bg-surface-muted text-content-tertiary',
        'flex h-8 items-center justify-center rounded-full px-2.5 backdrop-blur-md transition-all active:scale-95',
        'hover:bg-surface-subtle hover:text-content-primary',
        className,
      )}
      {...properties}
    >
      {children}
    </div>
  );
}

/** Landing page header built with the exact LayoutHeader + DocsNavbar design system. */
export function LandingNavbar() {
  const pathname = usePathname();
  const [isTop, setIsTop] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsTop(window.scrollY < 20);
    }
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 right-0 left-0 z-50 flex w-full flex-col border-none bg-transparent pt-4 backdrop-blur-none transition-all duration-300"
      id="nd-subnav"
      style={{
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
      }}
    >
      <div
        className={cn(
          'relative z-50 mx-auto flex h-14 w-full max-w-[95%] min-w-10 items-center gap-6 border pr-2 pl-4 backdrop-blur-md transition-all duration-300 sm:py-2 md:pl-6',
          isTop
            ? 'rounded-none border-transparent bg-transparent'
            : 'border-surface-muted bg-surface/85 rounded-full',
        )}
        style={{
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        {/* Left Section: Logo & Links */}
        <div className="flex items-center gap-4">
          <Link
            className="flex items-center gap-2.5 font-bold transition-opacity hover:opacity-80"
            href="/"
          >
            <Logo size="lg" />
          </Link>

          {/* Vertical Separator */}
          <div className="bg-border mx-2 block h-4 w-px max-md:hidden" />

          {/* Navigation Links */}
          <nav className="flex items-center gap-4 max-md:hidden">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = pathname === href || pathname.startsWith(`${href}/`);

              return (
                <Link
                  key={href}
                  className={cn(
                    'text-sm font-medium transition-colors',
                    isActive
                      ? 'text-content-primary font-semibold'
                      : 'text-content-secondary hover:text-content-primary',
                  )}
                  href={href}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Center / Right Section: Search & Icons */}
        <div className="flex flex-1 items-center justify-end">
          <div className="ml-2 flex items-center gap-2 max-md:hidden">
            {/* GitHub Star Count Pill */}
            <GitHubButton repo="hariharan804/ideasui" />

            {/* Theme Mode Toggle Pill */}
            <NavbarPill className="px-1">
              <ThemeToggle mode="light-dark-system" />
            </NavbarPill>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-1.5 md:hidden">
            <GitHubButton repo="hariharan804/ideasui" />

            <NavbarPill className="px-1">
              <ThemeToggle mode="light-dark-system" />
            </NavbarPill>

            <button
              aria-label="Toggle mobile menu"
              className="text-content-primary border-surface-strong bg-surface-subtle rounded-full border p-1.5"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-surface-muted bg-surface/95 mx-auto mt-2 max-w-[92%] overflow-hidden rounded-2xl border p-4 shadow-xl backdrop-blur-2xl md:hidden">
          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                className="text-content-secondary hover:text-content-primary text-sm font-medium transition-colors"
                href={href}
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
