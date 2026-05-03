'use client';
import type { ReactNode, JSX } from 'react';

import Header from '../../components/header';

export default function PlaygroundLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div className="bg-surface-sunken min-h-screen">
      <Header />
      {children}
    </div>
  );
}
