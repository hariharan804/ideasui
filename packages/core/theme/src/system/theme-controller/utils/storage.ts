import type {StorageAdapter} from "../types";

/** localStorage adapter with SSR safety and error handling */
class LocalStorageAdapter implements StorageAdapter {
  getItem(key: string): string | null {
    try {
      // SSR safety check
      return typeof window !== "undefined" ? localStorage.getItem(key) : null;
    } catch {
      // Handle quota exceeded, privacy mode, etc.
      return null;
    }
  }

  setItem(key: string, value: string): void {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(key, value);
      }
    } catch {
      // Silently fail if storage is unavailable
    }
  }

  removeItem(key: string): void {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem(key);
      }
    } catch {
      // Silently fail if storage is unavailable
    }
  }
}

/** sessionStorage adapter with SSR safety and error handling */
class SessionStorageAdapter implements StorageAdapter {
  getItem(key: string): string | null {
    try {
      return typeof window !== "undefined" ? sessionStorage.getItem(key) : null;
    } catch {
      return null;
    }
  }

  setItem(key: string, value: string): void {
    try {
      if (typeof window !== "undefined") {
        sessionStorage.setItem(key, value);
      }
    } catch {}
  }

  removeItem(key: string): void {
    try {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem(key);
      }
    } catch {}
  }
}

/** In-memory storage adapter - useful for testing or when persistence is not needed */
class MemoryStorageAdapter implements StorageAdapter {
  private store = new Map<string, string>();

  getItem(key: string): string | null {
    return this.store.get(key) || null;
  }

  setItem(key: string, value: string): void {
    this.store.set(key, value);
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }
}

/** Pre-configured storage adapters ready for use */
export const storageAdapters = {
  local: new LocalStorageAdapter(),
  session: new SessionStorageAdapter(),
  memory: new MemoryStorageAdapter(),
};
