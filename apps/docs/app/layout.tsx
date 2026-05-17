import type { Metadata } from 'next';

import { Inter } from 'next/font/google';
import { RootProvider } from 'fumadocs-ui/provider/next';

import { ThemeBridge } from '@/components/ui/theme-bridge';

import './globals.css';
import { ThemeScript } from '@ideasui/theme';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'IdeasUI — Modern Component Library',
  description:
    'A production-ready, accessible component library for React. Powered by Tailwind CSS v4 and React Aria.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning className={inter.className} lang="en">
      <head>
        <ThemeScript defaultTheme="light" />
      </head>
      <body>
        <RootProvider>
          <ThemeBridge>{children}</ThemeBridge>
        </RootProvider>
      </body>
    </html>
  );
}
