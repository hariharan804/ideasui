/**
 * @vitest-environment node
 */
import { applyThemeToDOM } from '../src/providers/utils/dom';

describe('DOM Utilities (SSR)', () => {
  it('should be safe to call applyThemeToDOM in SSR environment (window is undefined)', () => {
    expect(typeof globalThis.window).toBe('undefined');
    expect(() => applyThemeToDOM('light', 'dark')).not.toThrow();
  });
});
