import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

import { BookOpen, LayoutGrid, Route } from 'lucide-react';
import { Github } from '@/components/docs-ui/icons';

import { Logo } from '@/components/ui/logo';
import { ExternalLink } from '@/components/ui/external-link';

/**
 * Shared layout configurations
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: <Logo size="lg" />,
    transparentMode: 'top',
  },
};

/**
 * Shared HomeLayout links configuration
 */
export const homeLayoutLinks = [
  {
    items: [
      {
        icon: <BookOpen className="size-4" />,
        text: 'Getting Started',
        url: '/react/docs/start',
      },
      {
        icon: <LayoutGrid className="size-4" />,
        text: 'Components',
        url: '/react/docs/components/button',
      },
    ],
    on: 'menu' as const,
    text: 'Documentation',
    type: 'menu' as const,
  },
  {
    items: [
      {
        external: true,
        icon: <Github className="size-4" />,
        text: 'GitHub',
        url: 'https://github.com/ideas2logic-lab/ideasui',
      },
      {
        external: true,
        icon: <Route className="size-4" />,
        text: 'Roadmap',
        url: '#',
      },
    ],
    on: 'menu' as const,
    text: 'Resources',
    type: 'menu' as const,
  },
  {
    active: 'none' as const,
    on: 'nav' as const,
    text: 'Docs',
    url: '/react/docs/getting-started',
  },
  {
    active: 'none' as const,
    on: 'nav' as const,
    text: 'Components',
    url: '/react/docs/components/button',
  },
  {
    children: <ExternalLink href="https://github.com/ideas2logic-lab/ideasui">GitHub</ExternalLink>,
    on: 'nav' as const,
    type: 'custom' as const,
  },
];
