'use client';

import type { Framework } from '@/hooks/use-current-framework';

import { Globe, Smartphone } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@ideasui/utils';

import { defaultRoutes, useCurrentFramework } from '@/hooks/use-current-framework';

export function FrameworkTabs({ className }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const isNavigatingRef = useRef(false);
  const previousPathnameRef = useRef(pathname);
  const currentFramework = useCurrentFramework();

  const [selectedKey, setSelectedKey] = useState<Framework>(() => {
    return currentFramework;
  });
  const [prevFramework, setPrevFramework] = useState<Framework>(currentFramework);

  if (currentFramework !== prevFramework) {
    setPrevFramework(currentFramework);
    setSelectedKey(currentFramework);
  }

  const handleTabChange = useCallback(
    (targetFramework: Framework) => {
      if (targetFramework === currentFramework) {
        return;
      }

      setSelectedKey(targetFramework);
      isNavigatingRef.current = true;

      setTimeout(() => {
        router.push(defaultRoutes[targetFramework]);
      }, 150);
    },
    [currentFramework, router],
  );

  useEffect(() => {
    if (previousPathnameRef.current !== pathname) {
      if (isNavigatingRef.current) {
        isNavigatingRef.current = false;
      }

      previousPathnameRef.current = pathname;
    }
  }, [pathname]);

  return (
    <div
      className={cn('bg-surface-muted ml-auto flex items-center gap-1 rounded-lg p-1', className)}
    >
      <button
        className={cn(
          'flex items-center rounded-md px-3 py-1 text-sm font-medium transition-all',
          selectedKey === 'web'
            ? 'bg-surface text-content-primary shadow-sm'
            : 'text-content-secondary hover:text-content-primary hover:bg-surface/30',
        )}
        onClick={() => handleTabChange('web')}
      >
        <Globe className={cn('mr-1.5 size-4', selectedKey === 'web' && 'text-sky-400')} />
        Web
      </button>
      <button
        className={cn(
          'flex items-center rounded-md px-3 py-1 text-sm font-medium transition-all',
          selectedKey === 'native'
            ? 'bg-surface text-content-primary shadow-sm'
            : 'text-content-secondary hover:text-content-primary hover:bg-surface/30',
        )}
        onClick={() => handleTabChange('native')}
      >
        <Smartphone
          className={cn('mr-1.5 size-4', selectedKey === 'native' && 'text-indigo-500')}
        />
        Native
      </button>
    </div>
  );
}
