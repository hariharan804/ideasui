'use client';

import Script from 'next/script';

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
  }
}

export interface GoogleAnalyticsProps {
  /**
   * Google Analytics 4 Measurement ID (e.g., G-XXXXXXXXXX)
   * Defaults to process.env.NEXT_PUBLIC_GA_ID
   */
  readonly gaId?: string;
}

/**
 * Triggers a custom Google Analytics event.
 */
export function trackEvent(eventName: string, eventParams?: Record<string, unknown>): void {
  if (!globalThis.window?.gtag) {
    return;
  }

  globalThis.window.gtag('event', eventName, eventParams);
}

/**
 * Google Analytics 4 component for tracking page views and engagement.
 */
export function GoogleAnalytics({ gaId }: Readonly<GoogleAnalyticsProps>) {
  const id = gaId ?? process.env.NEXT_PUBLIC_GA_ID;

  if (!id) {
    return null;
  }

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="lazyOnload" />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
