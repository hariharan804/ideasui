'use client';

import type { ReactNode } from 'react';

import { ThemeProvider, useTheme as useIdeasTheme } from '@ideasui/theme';
import { useTheme as useNextTheme } from 'next-themes';
import { useEffect } from 'react';

function ThemeSync() {
  const { theme } = useNextTheme();
  const { setTheme } = useIdeasTheme();

  useEffect(() => {
    if (theme) {
      setTheme(theme);
    }
  }, [theme, setTheme]);

  return null;
}

export function ThemeBridge({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light">
      <ThemeSync />
      {children}
    </ThemeProvider>
  );
}
