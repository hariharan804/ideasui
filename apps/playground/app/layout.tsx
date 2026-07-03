'use client';

import type { JSX } from 'react';

import { ThemeProvider, ThemeScript } from '@ideasui/theme';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

import './globals.css';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <ThemeScript defaultTheme="light" />
      </head>
      <body className="antialiased">
        <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
      </body>
    </html>
  );
}
