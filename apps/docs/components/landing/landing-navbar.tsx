'use client';

import type { ComponentProps } from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
      className="fixed top-0 right-0 left-0 z-50 flex w-full [transform:translateZ(0)] flex-col border-none bg-transparent pt-3 backdrop-blur-none transition-all duration-300 sm:pt-4"
      id="nd-subnav"
      style={{
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
      }}
    >
      <div
        className={cn(
          'relative z-50 mx-auto flex h-14 w-full max-w-[95%] items-center justify-between gap-3 border px-3 backdrop-blur-md transition-all duration-300 sm:max-w-[92%] sm:px-4 md:pr-4 md:pl-6 lg:max-w-[88%]',
          isTop
            ? 'rounded-none border-transparent bg-transparent'
            : 'border-surface-muted bg-surface/85 rounded-full shadow-lg',
        )}
        style={{
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        {/* Left Section: Logo */}
        <div className="flex shrink-0 items-center">
          <Link
            className="flex shrink-0 items-center gap-2.5 font-bold transition-opacity hover:opacity-80"
            href="/"
          >
            <Logo size="lg" />
          </Link>
        </div>

        {/* Center Section: Navigation Links */}
        <nav className="absolute left-1/2 flex -translate-x-1/2 items-center gap-6 max-md:hidden">
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

        {/* Right Section: Search & Controls */}
        <div className="flex shrink-0 items-center justify-end gap-2">
          {/* Desktop Controls */}
          <div className="ml-2 flex items-center gap-2 max-md:hidden">
            <GitHubButton repo="hariharan804/ideasui" />
            <NavbarPill className="px-1">
              <ThemeToggle mode="light-dark-system" />
            </NavbarPill>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-1.5 md:hidden">
            <div className="xs:block hidden">
              <GitHubButton repo="hariharan804/ideasui" />
            </div>

            <NavbarPill className="px-1">
              <ThemeToggle mode="light-dark-system" />
            </NavbarPill>

            <button
              aria-label="Toggle mobile menu"
              className="text-content-primary bg-surface-subtle hover:bg-surface-muted flex size-9 items-center justify-center rounded-full border transition-all active:scale-95"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay & Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="border-surface-muted bg-surface/95 mx-auto mt-2.5 w-[92%] max-w-lg overflow-hidden rounded-2xl border p-5 shadow-2xl backdrop-blur-2xl md:hidden dark:bg-[#0d1117]/95"
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <nav className="flex flex-col gap-1.5">
              {NAV_LINKS.map(({ label, href }) => {
                const isActive = pathname === href || pathname.startsWith(`${href}/`);

                return (
                  <Link
                    key={href}
                    className={cn(
                      'flex min-h-[44px] items-center rounded-xl px-3.5 text-sm font-semibold transition-colors',
                      isActive
                        ? 'bg-primary-subtle/60 text-primary'
                        : 'text-content-primary hover:bg-surface-muted',
                    )}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>

            <div className="border-surface-muted mt-4 flex flex-col gap-2.5 border-t pt-4">
              <Link
                className="bg-primary text-on-primary hover:bg-primary/90 flex min-h-[44px] items-center justify-center gap-2 rounded-xl text-xs font-semibold shadow-md transition-all active:scale-98"
                href="/react/docs/start"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Get Started</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
