import type { StorageAdapter } from '../types';

/** localStorage adapter with SSR safety and error handling */
class LocalStorageAdapter implements StorageAdapter {
  getItem(key: string): string | null {
    try {
      // SSR safety check
      return globalThis.window === undefined ? null : localStorage.getItem(key);
    } catch {
      // Handle quota exceeded, privacy mode, etc.
      return null;
    }
  }

  setItem(key: string, value: string): void {
    try {
      if (globalThis.window !== undefined) {
        localStorage.setItem(key, value);
      }
    } catch {
      // Silently fail if storage is unavailable
    }
  }

  removeItem(key: string): void {
    try {
      if (globalThis.window !== undefined) {
        localStorage.removeItem(key);
      }
    } catch {
      // Silently fail if storage is unavailable
    }
  }
}

/** Pre-configured storage adapters ready for use */
export const storageAdapters = {
  local: new LocalStorageAdapter(),
};
