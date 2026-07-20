'use client';

import { useState, useEffect } from 'react';

export type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun';

const STORAGE_KEY = 'ideasui_package_manager';
const CHANGE_EVENT = 'ideasui_pm_change';

function getInitialPackageManager(): PackageManager {
  if (globalThis.window === undefined) return 'pnpm';

  try {
    const stored = localStorage.getItem(STORAGE_KEY) as PackageManager | null;

    if (stored && ['pnpm', 'npm', 'yarn', 'bun'].includes(stored)) {
      return stored;
    }
  } catch {
    // Ignore storage errors
  }

  return 'pnpm';
}

/**
 * Hook to manage and sync the user's preferred package manager (pnpm, npm, yarn, bun)
 * across all InstallTabs instances and website pages.
 */
export function usePackageManager(): [PackageManager, (pm: PackageManager) => void] {
  const [pm, setPmState] = useState<PackageManager>(getInitialPackageManager);

  useEffect(() => {
    function handleCustomEvent(event: CustomEvent<PackageManager>) {
      if (event.detail && ['pnpm', 'npm', 'yarn', 'bun'].includes(event.detail)) {
        setPmState(event.detail);
      }
    }

    function handleStorageEvent(event: StorageEvent) {
      if (event.key === STORAGE_KEY && event.newValue) {
        const newPm = event.newValue as PackageManager;

        if (['pnpm', 'npm', 'yarn', 'bun'].includes(newPm)) {
          setPmState(newPm);
        }
      }
    }

    globalThis.addEventListener(CHANGE_EVENT, handleCustomEvent as EventListener);
    globalThis.addEventListener('storage', handleStorageEvent);

    return () => {
      globalThis.removeEventListener(CHANGE_EVENT, handleCustomEvent as EventListener);
      globalThis.removeEventListener('storage', handleStorageEvent);
    };
  }, []);

  const setPm = (newPm: PackageManager) => {
    setPmState(newPm);
    try {
      localStorage.setItem(STORAGE_KEY, newPm);
    } catch {
      // Ignore storage errors
    }
    globalThis.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: newPm }));
  };

  return [pm, setPm];
}
