'use client';
import type { JSX } from 'react';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Moon, Sun, ExternalLink } from 'lucide-react';
import { useTheme } from '@ideasui/theme';

function GithubIcon(props: React.SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

interface HeaderProps {
  showBackButton?: boolean;
  title?: string;
  subtitle?: string;
}

function Header({ showBackButton = false, title, subtitle }: HeaderProps): JSX.Element {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  const onToggleTheme = (): void => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const goBack = (): void => {
    router.push('/playground');
  };

  const goToDocs = (): void => {
    router.push('/docs');
  };

  return (
    <header className="border-default bg-surface sticky top-0 z-50 border-b backdrop-blur-md transition-colors duration-300">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {showBackButton ? (
              <>
                <button
                  className="text-content-secondary hover:bg-surface-subtle hover:text-content-primary flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                  onClick={goBack}
                >
                  <ArrowLeft className="size-4" />
                  Back to Components
                </button>
                <div className="bg-surface-muted h-6 w-px" />
              </>
            ) : null}
            <div>
              <Link href={'/'}>
                <h1 className="text-content-primary text-2xl font-bold">
                  {title || 'IdeasUI Playground'}
                </h1>
              </Link>
              {subtitle ? <p className="text-content-secondary mt-1 text-sm">{subtitle}</p> : null}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Documentation Link */}
            <button
              className="text-content-secondary hover:bg-surface-subtle hover:text-content-primary hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors sm:flex"
              onClick={goToDocs}
            >
              <ExternalLink className="size-4" />
              Docs
            </button>

            {/* GitHub Link */}
            <a
              className="text-content-secondary hover:bg-surface-subtle hover:text-content-primary hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors sm:flex"
              href="https://github.com/ideas2logic-lab/ideasui"
              rel="noopener noreferrer"
              target="_blank"
            >
              <GithubIcon className="size-4" />
              GitHub
            </a>

            {/* Theme Toggle */}
            <button
              className="bg-surface-subtle text-content-secondary hover:bg-surface-muted hover:text-content-primary rounded-lg p-2 transition-colors"
              title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
              onClick={onToggleTheme}
            >
              {resolvedTheme === 'dark' ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
