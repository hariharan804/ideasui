'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Moon, Sun, Github, ExternalLink } from 'lucide-react';
import { useTheme } from '@ideasui/theme';
import Link from 'next/link';

interface HeaderProps {
  showBackButton?: boolean;
  title?: string;
  subtitle?: string;
}

function Header({ showBackButton = false, title, subtitle }: HeaderProps) {
  const router = useRouter();
  const { resolvedTheme, setTheme, themes } = useTheme();

  const onToggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const goBack = () => {
    router.push('/playground');
  };

  const goToGithub = () => {
    window.open('https://github.com/your-username/ideasui', '_blank');
  };

  const goToDocs = () => {
    router.push('/docs');
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {showBackButton ? (
              <>
                <button
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                  onClick={goBack}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Components
                </button>
                <div className="h-6 w-px bg-gray-300" />
              </>
            ) : null}
            <div>
              <Link href={'/'}>
                <h1 className="text-2xl font-bold text-gray-900">
                  {title || 'IdeasUI Playground'}
                </h1>
              </Link>
              {subtitle ? <p className="mt-1 text-sm text-gray-600">{subtitle}</p> : null}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Documentation Link */}
            <button
              className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 sm:flex"
              onClick={goToDocs}
            >
              <ExternalLink className="h-4 w-4" />
              Docs
            </button>

            {/* GitHub Link */}
            <button
              className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 sm:flex"
              onClick={goToGithub}
            >
              <Github className="h-4 w-4" />
              GitHub
            </button>

            {/* Theme Toggle */}
            <button
              className="rounded-lg bg-gray-100 p-2 transition-colors hover:bg-gray-200"
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
