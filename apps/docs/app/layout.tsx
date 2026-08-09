import type { Metadata } from 'next';

import { Inter } from 'next/font/google';
import { RootProvider } from 'fumadocs-ui/provider/next';

import { ThemeBridge } from '@/components/ui/theme-bridge';

import './globals.css';
import { ThemeScript } from '@ideasui/theme';

const inter = Inter({ subsets: ['latin'] });

import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: `%s | ${siteConfig.name}`,
    default: `${siteConfig.name} — Modern Component Library`,
  },
  description: siteConfig.description,
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

import { CustomSearchDialog } from '@/components/docs-ui/custom-search-dialog';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning className={inter.className} lang="en">
      <head>
        <ThemeScript defaultTheme="light" />
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
        <RootProvider search={{ SearchDialog: CustomSearchDialog }}>
          <ThemeBridge>{children}</ThemeBridge>
        </RootProvider>
      </body>
    </html>
  );
}
