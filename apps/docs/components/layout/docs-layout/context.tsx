'use client';

import type { ReactNode } from 'react';

import { createContext, useMemo } from 'react';
import { useIsScrollTop } from 'fumadocs-ui/utils/use-is-scroll-top';

export interface LayoutInfo {
  tabMode: 'sidebar' | 'navbar';
  navMode: 'top' | 'auto';
}

export const LayoutContext = createContext<
  | (LayoutInfo & {
      isNavTransparent: boolean;
    })
  | null
>(null);

export function LayoutContextProvider({
  children,
  navMode,
  navTransparentMode = 'none',
  tabMode,
}: LayoutInfo & {
  navTransparentMode?: 'always' | 'top' | 'none';
  children: ReactNode;
}) {
  const isTop = useIsScrollTop({ enabled: navTransparentMode === 'top' }) ?? true;
  const isNavTransparent = navTransparentMode === 'top' ? isTop : navTransparentMode === 'always';

  return (
    <LayoutContext
      value={useMemo(
        () => ({
          isNavTransparent,
          navMode,
          tabMode,
        }),
        [isNavTransparent, navMode, tabMode],
      )}
    >
      {children}
    </LayoutContext>
  );
}
