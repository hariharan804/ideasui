import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

import { BookOpen, LayoutGrid, Route } from 'lucide-react';
import { ROUTES } from '@/config/routes';
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
        url: ROUTES.docs.start,
      },
      {
        icon: <LayoutGrid className="size-4" />,
        text: 'Components',
        url: ROUTES.docs.components,
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
        url: ROUTES.external.github,
      },
      {
        external: true,
        icon: <Route className="size-4" />,
        text: 'Roadmap',
        url: ROUTES.external.roadmap,
      },
    ],
    on: 'menu' as const,
    text: 'Resources',
    type: 'menu' as const,
  },
  {
    active: 'nested-url' as const,
    on: 'nav' as const,
    text: 'Docs',
    url: ROUTES.docs.root,
  },
  {
    active: 'nested-url' as const,
    on: 'nav' as const,
    text: 'Components',
    url: ROUTES.docs.components,
  },
  {
    children: <ExternalLink href={ROUTES.external.github}>GitHub</ExternalLink>,
    on: 'nav' as const,
    type: 'custom' as const,
  },
];
