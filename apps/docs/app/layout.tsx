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
    template: `%s | IdeasUI — React Component Library`,
    default: `IdeasUI — Free React Component Library for Tailwind CSS v4`,
  },
  description: siteConfig.description,
  keywords: [
    'React component library',
    'Tailwind CSS v4 components',
    'accessible React UI',
    'React Aria components',
    'headless UI React',
    'open source React UI library',
    'free React component library',
    'TypeScript UI components',
    'OKLCH design tokens',
    'Next.js component library',
    'shadcn alternative',
    'IdeasUI',
    'design system',
    'WCAG 2.1 accessible components',
    'React 19 components',
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
    title: `IdeasUI — Free React Component Library for Tailwind CSS v4`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: 'website',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `IdeasUI — React Component Library for Tailwind CSS v4`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: `IdeasUI — Free React Component Library for Tailwind CSS v4`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { WebsiteJsonLd } from '@/components/seo';
import { CustomSearchDialogClient } from '@/components/docs-ui/search-dialog-wrapper';
import { GoogleAnalytics } from '@/components/docs-ui/google-analytics';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning className={inter.className} lang="en">
      <head>
        <link href="https://api.github.com" rel="preconnect" />
        <link href="https://api.github.com" rel="dns-prefetch" />
        <ThemeScript defaultTheme="light" />
        <WebsiteJsonLd />
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
