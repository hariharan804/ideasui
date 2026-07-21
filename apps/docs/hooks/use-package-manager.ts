'use client';

import { useSyncExternalStore } from 'react';

export type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun';

const STORAGE_KEY = 'ideasui_package_manager';
const CHANGE_EVENT = 'ideasui_pm_change';
const VALID_PMS: Set<PackageManager> = new Set(['pnpm', 'npm', 'yarn', 'bun']);

function subscribe(callback: () => void) {
  if (globalThis.window === undefined) return () => {};

  globalThis.addEventListener(CHANGE_EVENT, callback);
  globalThis.addEventListener('storage', callback);

  return () => {
    globalThis.removeEventListener(CHANGE_EVENT, callback);
    globalThis.removeEventListener('storage', callback);
  };
}

function getSnapshot(): PackageManager {
  if (globalThis.window === undefined) return 'pnpm';

  try {
    const stored = localStorage.getItem(STORAGE_KEY) as PackageManager | null;

    if (stored && VALID_PMS.has(stored)) {
      return stored;
    }
  } catch {
    // Ignore storage errors
  }

  return 'pnpm';
}

function getServerSnapshot(): PackageManager {
  return 'pnpm';
}

/**
 * Hook to manage and sync the user's preferred package manager (pnpm, npm, yarn, bun)
 * across all InstallTabs instances and website pages.
 */
export function usePackageManager(): [PackageManager, (pm: PackageManager) => void] {
  const pm = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setPm = (newPm: PackageManager) => {
    try {
      localStorage.setItem(STORAGE_KEY, newPm);
    } catch {
      // Ignore storage errors
    }
    globalThis.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: newPm }));
  };

  return [pm, setPm];
}
