import { storageAdapters } from '../src/providers/utils/storage';

const { local } = storageAdapters;

const TEST_KEY = 'test-key';
const TEST_VALUE = 'test-value';

// Mock storage implementation
const mockStorage = (storageType: 'localStorage' | 'sessionStorage'): void => {
  const store: Record<string, string> = {};
  const mock = {
    getItem: vi.fn((key: string): string | null => store[key] || null),
    setItem: vi.fn((key: string, value: string): void => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string): void => {
      delete store[key];
    }),
    clear: vi.fn((): void => {
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
    vi.clearAllMocks();
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
      vi.spyOn(localStorage, 'setItem').mockImplementation(() => {
        throw new Error('QuotaExceeded');
      });
      vi.spyOn(localStorage, 'getItem').mockImplementation(() => {
        throw new Error('SecurityError');
      });
      vi.spyOn(localStorage, 'removeItem').mockImplementation(() => {
        throw new Error('SecurityError');
      });

      expect(() => local.setItem(TEST_KEY, TEST_VALUE)).not.toThrow();
      expect(local.getItem(TEST_KEY)).toBeNull();
      expect(() => local.removeItem(TEST_KEY)).not.toThrow();
    });
  });
});
