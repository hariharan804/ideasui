import type { Metadata } from 'next';

import { Inter } from 'next/font/google';
import { RootProvider } from 'fumadocs-ui/provider/next';

import './globals.css';
import { ThemeProvider, ThemeScript } from '@ideasui/theme';
import { siteConfig } from '@/config/site';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: `%s | ${siteConfig.name}`,
    default: `${siteConfig.name} — Modern Component Library`,
  },
  description: siteConfig.description,
  keywords: [
    'IdeasUI',
    'React',
    'Tailwind CSS v4',
    'Component Library',
    'React Aria',
    'OKLCH',
    'TypeScript',
    'UI Kit',
    'Accessible Components',
    'Design System',
    'Next.js',
  ],
  authors: [{ name: 'IdeasUI Team', url: siteConfig.url }],
  creator: 'IdeasUI',
  publisher: 'IdeasUI',
  alternates: {
    canonical: './',
  },
  icons: {
    icon: [
      { url: '/IdeasUI-favicon-16.svg', sizes: '16x16', type: 'image/svg+xml' },
      { url: '/IdeasUI-favicon-32.svg', sizes: '32x32', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-icon-180.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: `${siteConfig.name} — Modern Component Library`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: 'website',
    images: [
      {
        url: '/IdeasUI-og-image.png',
        width: 1200,
        height: 630,
        alt: 'IdeasUI Component Library',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — Modern Component Library`,
    description: siteConfig.description,
    images: ['/IdeasUI-og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      publisher: {
        '@type': 'Organization',
        name: siteConfig.name,
      },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${siteConfig.url}/#software`,
      name: siteConfig.name,
      operatingSystem: 'Web',
      applicationCategory: 'DeveloperApplication',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
  ],
};

import { CustomSearchDialogClient } from '@/components/docs-ui/search-dialog-wrapper';
import { GoogleAnalytics } from '@/components/docs-ui/google-analytics';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning className={inter.className} lang="en">
      <head>
        <link href="https://api.github.com" rel="preconnect" />
        <link href="https://api.github.com" rel="dns-prefetch" />
        <ThemeScript defaultTheme="light" />
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          type="application/ld+json"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for (let registration of registrations) {
      registration.unregister();
    }
  });
}`,
          }}
        />
      </head>
      <body>
        <RootProvider
          search={{ SearchDialog: CustomSearchDialogClient }}
          theme={{ enabled: false }}
        >
          <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
        </RootProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
