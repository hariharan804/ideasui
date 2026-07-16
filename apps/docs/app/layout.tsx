import type { Metadata } from 'next';

import { Inter } from 'next/font/google';
import { RootProvider } from 'fumadocs-ui/provider/next';

import { ThemeBridge } from '@/components/ui/theme-bridge';
import { Navbar } from '@/components/site-nav/navbar';

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
  openGraph: {
    title: `${siteConfig.name} — Modern Component Library`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — Modern Component Library`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning className={inter.className} lang="en">
      <head>
        <ThemeScript defaultTheme="light" />
      </head>
      <body>
        <RootProvider>
          <ThemeBridge>
            <Navbar />
            {children}
          </ThemeBridge>
        </RootProvider>
      </body>
    </html>
  );
}
