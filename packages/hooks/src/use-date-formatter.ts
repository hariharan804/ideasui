import {useMemo} from "react";

export interface UseDateFormatterOptions {
  locale?: string;
  timeZone?: string;
}

/**
 * Custom hook for date formatting with Intl.DateTimeFormat
 *
 * @param options - Formatting options
 * @returns Object with formatting functions
 *
 * @example
 * ```tsx
 * const {formatDate, formatTime, formatRelative} = useDateFormatter({locale: 'en-US'})
 * ```
 */
export function useDateFormatter(options: UseDateFormatterOptions = {}) {
  const {locale = "en-US", timeZone} = options;

  const formatters = useMemo(() => {
    const dateFormatter = new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone,
    });

    const timeFormatter = new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
      timeZone,
    });

    const shortDateFormatter = new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone,
    });

    const relativeFormatter = new Intl.RelativeTimeFormat(locale, {
      numeric: "auto",
    });

    return {
      dateFormatter,
      timeFormatter,
      shortDateFormatter,
      relativeFormatter,
    };
  }, [locale, timeZone]);

  const formatDate = (date: Date) => formatters.dateFormatter.format(date);
  const formatTime = (date: Date) => formatters.timeFormatter.format(date);
  const formatShortDate = (date: Date) => formatters.shortDateFormatter.format(date);

  const formatRelative = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);
    
    if (Math.abs(diffInSeconds) < 60) {
      return formatters.relativeFormatter.format(diffInSeconds, "second");
    } else if (Math.abs(diffInSeconds) < 3600) {
      return formatters.relativeFormatter.format(Math.floor(diffInSeconds / 60), "minute");
    } else if (Math.abs(diffInSeconds) < 86400) {
      return formatters.relativeFormatter.format(Math.floor(diffInSeconds / 3600), "hour");
    } else {
      return formatters.relativeFormatter.format(Math.floor(diffInSeconds / 86400), "day");
    }
  };

  return {
    formatDate,
    formatTime,
    formatShortDate,
    formatRelative,
  };
}