'use client';
import type { JSX } from 'react';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Moon, Sun, Github, ExternalLink } from 'lucide-react';
import { useTheme } from '@ideasui/theme';

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
    <header className="border-default bg-surface-elevated/80 sticky top-0 z-50 border-b backdrop-blur-md transition-colors duration-300">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {showBackButton ? (
              <>
                <button
                  className="text-content-secondary hover:bg-surface-muted hover:text-content-primary flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                  onClick={goBack}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Components
                </button>
                <div className="bg-surface-strong h-6 w-px" />
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
              className="text-content-secondary hover:bg-surface-muted hover:text-content-primary hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors sm:flex"
              onClick={goToDocs}
            >
              <ExternalLink className="h-4 w-4" />
              Docs
            </button>

            {/* GitHub Link */}
            <button
              className="text-content-secondary hover:bg-surface-muted hover:text-content-primary hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors sm:flex"
              onClick={() => window.open('https://github.com/ideas2logic-lab/ideasui', '_blank')}
            >
              <Github className="h-4 w-4" />
              GitHub
            </button>

            {/* Theme Toggle */}
            <button
              className="bg-surface-muted text-content-secondary hover:bg-surface-strong hover:text-content-primary rounded-lg p-2 transition-colors"
              title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
              onClick={onToggleTheme}
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
