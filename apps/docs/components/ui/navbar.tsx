/* eslint-disable no-restricted-syntax */
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, Menu } from 'lucide-react';

import { Logo } from './logo';

export function Navbar() {
  const pathname = usePathname();
  const isDocs = pathname.includes('/docs');

  if (isDocs) {
    return null;
  }

  return (
    <header className="border-surface-border bg-surface-primary/80 sticky top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link className="flex items-center gap-2" href="/">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            className="text-content-secondary hover:text-content-primary text-sm font-medium transition-colors"
            href="/react/docs/getting-started"
          >
            Documentation
          </Link>
          <Link
            className="text-content-secondary hover:text-content-primary text-sm font-medium transition-colors"
            href="/react/docs/components/button"
          >
            Components
          </Link>
          <a
            className="text-content-secondary hover:text-content-primary transition-colors"
            href="https://github.com/ideas2logic-lab/ideasui"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Github className="size-5" />
          </a>
        </nav>

        <button className="flex p-2 md:hidden">
          <Menu className="text-content-primary size-6" />
        </button>
      </div>
    </header>
  );
}
