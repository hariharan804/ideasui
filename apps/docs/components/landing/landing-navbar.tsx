'use client';

import { Logo } from '@/components/ui/logo';
import { DocsNavbar } from '@/components/layout/docs-layout/navbar';
import { ROUTES } from '@/config/routes';

const LANDING_NAV_LINKS = [
  { type: 'main' as const, text: 'Components', url: ROUTES.docs.components },
  { type: 'main' as const, text: 'Docs', url: ROUTES.docs.start },
  { type: 'main' as const, text: 'Theme', url: ROUTES.docs.tokens },
  { type: 'main' as const, text: 'Changelog', url: ROUTES.docs.changelog },
];

/** Landing page header sharing the exact unified DocsNavbar header component. */
export function LandingNavbar() {
  return (
    <DocsNavbar
      isLanding
      links={LANDING_NAV_LINKS}
      nav={{
        title: <Logo size="lg" />,
        url: '/',
      }}
      sidebar={{ collapsible: false }}
      tabs={[]}
    />
  );
}
