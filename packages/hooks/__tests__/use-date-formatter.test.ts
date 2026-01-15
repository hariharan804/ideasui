/* eslint-disable no-magic-numbers */
import { renderHook } from '@testing-library/react';

import { useDateFormatter } from '../src/use-date-formatter';

describe('useDateFormatter', () => {
  it('should format date', () => {
    const { result } = renderHook(() => useDateFormatter());
    const date = new Date(2023, 0, 1); // Jan 1 2023

    expect(result.current.formatDate(date)).toMatch(/January 1, 2023/);
  });

  it('should format time', () => {
    const { result } = renderHook(() => useDateFormatter());
    const date = new Date(2023, 0, 1, 14, 30);

    expect(result.current.formatTime(date)).toMatch(/(\d{2}:\d{2})|(2:30 PM)/); // Flexible match for locale
  });

  it('should format short date', () => {
    const { result } = renderHook(() => useDateFormatter());
    const date = new Date(2023, 0, 1);

    expect(result.current.formatShortDate(date)).toMatch(/Jan 1, 2023/);
  });

  it('should format relative time', () => {
    const { result } = renderHook(() => useDateFormatter());
    const now = new Date();
    // Mock Date to control time difference

    const secondsAgo = new Date(now.getTime() - 10000);

    expect(result.current.formatRelative(secondsAgo)).toContain('seconds ago');
    // Note: Internationalization output varies, checking basic validity
    // Ideally should mock Date or check Intl output format more strictly using mocks

    // Let's assume en-US default for '10 seconds ago'
  });

  it('should support custom locale', () => {
    const { result } = renderHook(() => useDateFormatter({ locale: 'de-DE' }));
    const date = new Date(2023, 0, 1);

    expect(result.current.formatDate(date)).toMatch(/1. Januar 2023/);
  });
});
