/* eslint-disable sonarjs/no-duplicate-string */
import { storageAdapters } from '../src/system/providers/utils/storage';

const { local, session, memory } = storageAdapters;

const TEST_KEY = 'test-key';
const TEST_VALUE = 'test-value';

// Mock storage implementation
const mockStorage = (storageType: 'localStorage' | 'sessionStorage'): void => {
  const store: Record<string, string> = {};
  const mock = {
    getItem: jest.fn((key: string): string | null => store[key] || null),
    setItem: jest.fn((key: string, value: string): void => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string): void => {
      delete store[key];
    }),
    clear: jest.fn((): void => {
      for (const key in store) {
        delete store[key];
      }
    }),
  };

  Object.defineProperty(window, storageType, {
    value: mock,
    writable: true,
  });
};

describe('Storage Adapters', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockStorage('localStorage');
    mockStorage('sessionStorage');
  });

  describe('LocalStorageAdapter', () => {
    it('should set and get items', () => {
      local.setItem(TEST_KEY, TEST_VALUE);
      expect(localStorage.setItem).toHaveBeenCalledWith(TEST_KEY, TEST_VALUE);
      expect(local.getItem(TEST_KEY)).toBe(TEST_VALUE);
      expect(localStorage.getItem).toHaveBeenCalledWith(TEST_KEY);
    });

    it('should remove items', () => {
      local.setItem(TEST_KEY, TEST_VALUE);
      local.removeItem(TEST_KEY);
      expect(localStorage.removeItem).toHaveBeenCalledWith(TEST_KEY);
      expect(local.getItem(TEST_KEY)).toBeNull();
    });

    it('should handle errors gracefully', () => {
      jest.spyOn(localStorage, 'setItem').mockImplementation(() => {
        throw new Error('QuotaExceeded');
      });
      jest.spyOn(localStorage, 'getItem').mockImplementation(() => {
        throw new Error('SecurityError');
      });
      jest.spyOn(localStorage, 'removeItem').mockImplementation(() => {
        throw new Error('SecurityError');
      });

      expect(() => local.setItem(TEST_KEY, TEST_VALUE)).not.toThrow();
      expect(local.getItem(TEST_KEY)).toBeNull();
      expect(() => local.removeItem(TEST_KEY)).not.toThrow();
    });
  });

  describe('SessionStorageAdapter', () => {
    it('should set and get items', () => {
      session.setItem(TEST_KEY, TEST_VALUE);
      expect(sessionStorage.setItem).toHaveBeenCalledWith(TEST_KEY, TEST_VALUE);
      expect(session.getItem(TEST_KEY)).toBe(TEST_VALUE);
      expect(sessionStorage.getItem).toHaveBeenCalledWith(TEST_KEY);
    });

    it('should remove items', () => {
      session.setItem(TEST_KEY, TEST_VALUE);
      session.removeItem(TEST_KEY);
      expect(sessionStorage.removeItem).toHaveBeenCalledWith(TEST_KEY);
      expect(session.getItem(TEST_KEY)).toBeNull();
    });

    it('should handle errors gracefully', () => {
      jest.spyOn(sessionStorage, 'setItem').mockImplementation(() => {
        throw new Error('QuotaExceeded');
      });
      jest.spyOn(sessionStorage, 'getItem').mockImplementation(() => {
        throw new Error('SecurityError');
      });
      jest.spyOn(sessionStorage, 'removeItem').mockImplementation(() => {
        throw new Error('SecurityError');
      });

      expect(() => session.setItem(TEST_KEY, TEST_VALUE)).not.toThrow();
      expect(session.getItem(TEST_KEY)).toBeNull();
      expect(() => session.removeItem(TEST_KEY)).not.toThrow();
    });
  });

  describe('MemoryStorageAdapter', () => {
    it('should set and get items', () => {
      memory.setItem(TEST_KEY, TEST_VALUE);
      expect(memory.getItem(TEST_KEY)).toBe(TEST_VALUE);
    });

    it('should remove items', () => {
      memory.setItem(TEST_KEY, TEST_VALUE);
      memory.removeItem(TEST_KEY);
      expect(memory.getItem(TEST_KEY)).toBeNull();
    });

    it('should return null for non-existent items', () => {
      expect(memory.getItem('non-existent')).toBeNull();
    });
  });
});
