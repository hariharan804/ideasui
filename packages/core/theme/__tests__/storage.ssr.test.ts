/**
 * @jest-environment node
 */
import { storageAdapters } from '../src/system/providers/utils/storage';

const TEST_KEY = 'key';
const TEST_VALUE = 'value';

describe('Storage Adapters (SSR)', () => {
  const { local } = storageAdapters;

  describe('LocalStorageAdapter', () => {
    it('should be safe to call in SSR environment (window is undefined)', () => {
      expect(typeof window).toBe('undefined');

      expect(() => local.setItem(TEST_KEY, TEST_VALUE)).not.toThrow();
      expect(local.getItem(TEST_KEY)).toBeNull();
      expect(() => local.removeItem(TEST_KEY)).not.toThrow();
    });
  });
});
