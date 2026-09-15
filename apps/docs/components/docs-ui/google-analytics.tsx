import Script from 'next/script';

export interface GoogleAnalyticsProps {
  /**
   * Google Analytics 4 Measurement ID (e.g., G-XXXXXXXXXX)
   * Defaults to process.env.NEXT_PUBLIC_GA_ID
   */
  readonly gaId?: string;
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
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
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
