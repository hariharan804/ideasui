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

  describe('relative time', () => {
    beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date(2023, 0, 1, 12, 0, 0)); // Set specific time
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('should format seconds ago', () => {
      const { result } = renderHook(() => useDateFormatter());
      const now = new Date();
      const secondsAgo = new Date(now.getTime() - 10000); // 10 seconds ago

      expect(result.current.formatRelative(secondsAgo)).toMatch(/10 seconds ago/);
    });

    it('should format minutes ago', () => {
      const { result } = renderHook(() => useDateFormatter());
      const now = new Date();
      const minutesAgo = new Date(now.getTime() - 5 * 60 * 1000); // 5 minutes ago

      expect(result.current.formatRelative(minutesAgo)).toMatch(/5 minutes ago/);
    });

    it('should format hours ago', () => {
      const { result } = renderHook(() => useDateFormatter());
      const now = new Date();
      const hoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000); // 2 hours ago

      expect(result.current.formatRelative(hoursAgo)).toMatch(/2 hours ago/);
    });

    it('should format days ago', () => {
      const { result } = renderHook(() => useDateFormatter());
      const now = new Date();
      const daysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000); // 3 days ago

      expect(result.current.formatRelative(daysAgo)).toMatch(/3 days ago/);
    });

    it('should format future dates', () => {
      const { result } = renderHook(() => useDateFormatter());
      const now = new Date();
      const future = new Date(now.getTime() + 5 * 60 * 1000); // in 5 minutes

      expect(result.current.formatRelative(future)).toMatch(/in 5 minutes/);
    });
  });

  it('should support custom timeZone', () => {
    const { result } = renderHook(() => useDateFormatter({ timeZone: 'America/New_York' }));
    // Date: 2023-01-01 12:00:00 UTC
    // NY: 2023-01-01 07:00:00 EST
    const date = new Date('2023-01-01T12:00:00Z');

    // Basic check ensuring timezone affected the output.
    // Format varies by locale but 7:00 AM matches expected time for NY.
    expect(result.current.formatTime(date)).toMatch(/7:00/);
  });

  it('should support custom locale', () => {
    const { result } = renderHook(() => useDateFormatter({ locale: 'de-DE' }));
    const date = new Date(2023, 0, 1);

    expect(result.current.formatDate(date)).toMatch(/1. Januar 2023/);
  });
});
