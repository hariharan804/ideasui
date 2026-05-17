/* eslint-disable import/consistent-type-specifier-style */
'use client';

import type { ReactNode } from 'react';

import { ThemeProvider } from '@ideasui/theme';

export function ThemeBridge({ children }: { children: ReactNode }) {
  return <ThemeProvider defaultTheme="light">{children}</ThemeProvider>;
}
