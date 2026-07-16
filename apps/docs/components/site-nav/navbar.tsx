'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Github } from '@/components/docs-ui/icons';
import { Logo } from '@/components/ui/logo';
import { useEffect, useState } from 'react';

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const isDocs = pathname.includes('/docs');

  // Do not render on documentation page since Fumadocs has its own built-in docs layout & navbar
  if (isDocs) {
    return null;
  }

  const links = [
    { label: 'Docs', href: '/react/docs/getting-started' },
    { label: 'Components', href: '/react/docs/components/button' },
    { label: 'Changelog', href: '/changelog' },
  ];

  return (
    <header className="border-subtle bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link className="flex items-center gap-2" href="/">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="flex items-center gap-6 max-md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              className={`hover:text-content-primary text-sm font-medium transition-colors ${
                pathname === link.href ? 'text-content-primary' : 'text-content-secondary'
              }`}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}

          <span className="bg-subtle h-4 w-[1px]" />

          {/* Theme Toggle */}
          {mounted && (
            <button
              aria-label="Toggle Theme"
              className="text-content-secondary hover:text-content-primary rounded-md p-2 transition-colors"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="size-4.5" /> : <Moon className="size-4.5" />}
            </button>
          )}

          {/* GitHub Icon */}
          <a
            aria-label="GitHub Repository"
            className="text-content-secondary hover:text-content-primary transition-colors"
            href="https://github.com/ideas2logic-lab/ideasui"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Github className="size-5" />
          </a>
        </nav>

        {/* Mobile Nav Button */}
        <div className="flex items-center gap-3 md:hidden">
          {mounted && (
            <button
              aria-label="Toggle Theme"
              className="text-content-secondary hover:text-content-primary rounded-md p-2 transition-colors"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </button>
          )}
          <button
            aria-label="Toggle mobile menu"
            className="text-content-primary p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="border-subtle bg-background border-b md:hidden">
          <nav className="flex flex-col gap-4 p-4">
            {links.map((link) => (
              <Link
                key={link.href}
                className={`hover:text-content-primary text-sm font-medium transition-colors ${
                  pathname === link.href ? 'text-content-primary' : 'text-content-secondary'
                }`}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              className="text-content-secondary hover:text-content-primary flex items-center gap-2 text-sm font-medium transition-colors"
              href="https://github.com/ideas2logic-lab/ideasui"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Github className="size-5" />
              GitHub
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
