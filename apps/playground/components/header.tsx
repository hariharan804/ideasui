'use client';
import type { JSX } from 'react';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Moon, Sun, BookOpen, Layers, Package, Wrench, Sparkles } from 'lucide-react';
import { useTheme } from '@ideasui/theme';
import { Button } from '@ideasui/button';

function GithubIcon(properties: Readonly<React.SVGProps<SVGSVGElement>>): JSX.Element {
  return (
    <svg
      fill="none"
      height="18"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
      {...properties}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

interface HeaderProperties {
  readonly showBackButton?: boolean;
  readonly title?: string;
  readonly subtitle?: string;
}

const navLinks = [
  { href: '/playground', label: 'Playground', icon: Wrench },
  { href: '/design-system', label: 'Design System', icon: Layers },
  { href: '/installer', label: 'Installer', icon: Package },
  { href: '/docs', label: 'Docs', icon: BookOpen },
];

function Header({
  showBackButton = false,
  title,
  subtitle,
}: Readonly<HeaderProperties>): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  const onToggleTheme = (): void => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const goBack = (): void => {
    router.push('/playground');
  };

  return (
    <header className="bg-surface/80 sticky top-0 z-50 shadow-xs backdrop-blur-xl transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left branding & navigation */}
          <div className="flex items-center gap-4">
            {showBackButton ? (
              <Button
                aria-label="Back to Components"
                color="neutral"
                size="sm"
                variant="ghost"
                onPress={goBack}
              >
                <ArrowLeft className="size-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>
            ) : null}

            <Link className="group flex items-center gap-3" href="/">
              <div className="bg-primary-subtle text-primary flex size-9 items-center justify-center rounded-xl shadow-2xs transition-transform duration-200 group-hover:scale-105">
                <Sparkles className="size-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-content-primary text-base font-extrabold tracking-tight sm:text-lg">
                    {title || 'IdeasUI'}
                  </span>
                  <span className="bg-primary-subtle text-primary border-primary/20 rounded-md border px-1.5 py-0.5 font-mono text-[10px] font-bold">
                    v0.0.5
                  </span>
                </div>
                {subtitle ? (
                  <p className="text-content-secondary hidden text-xs sm:block">{subtitle}</p>
                ) : null}
              </div>
            </Link>

            {/* Nav Tabs */}
            <nav className="bg-surface-subtle/80 border-border/40 ml-4 hidden items-center rounded-xl border p-1 shadow-2xs md:flex">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);

                return (
                  <Link
                    key={link.href}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-surface text-primary shadow-xs'
                        : 'text-content-secondary hover:text-content-primary hover:bg-surface-muted/50'
                    }`}
                    href={link.href}
                  >
                    <Icon className="size-3.5" />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              aria-label="GitHub Repository"
              href="https://github.com/ideas2logic-lab/ideasui"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Button aria-label="GitHub Repository" color="neutral" size="sm" variant="ghost">
                <GithubIcon className="size-4" />
                <span className="hidden sm:inline">GitHub</span>
              </Button>
            </a>

            <Button
              isIconOnly
              aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
              color="neutral"
              size="sm"
              variant="soft"
              onPress={onToggleTheme}
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="text-warning size-4" />
              ) : (
                <Moon className="text-primary size-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
