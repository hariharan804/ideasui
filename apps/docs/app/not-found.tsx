import type { Metadata } from 'next';
import Link from 'next/link';
import { Rocket, Blocks, Palette, Code2, ArrowRight } from 'lucide-react';

import { DottedHexagon, LandingFooter, LandingNavbar } from '@/components/landing';
import { NotFoundActions } from '@/components/docs-ui/not-found-actions';
import { ROUTES } from '@/config/routes';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  description:
    'The page or component document you requested could not be found. Explore IdeasUI components, getting started guides, or return home.',
  robots: {
    index: false,
    follow: false,
  },
};

const POPULAR_DESTINATIONS = [
  {
    title: 'Getting Started',
    description: 'Quick start guide, Tailwind CSS v4 setup, and library installation.',
    href: ROUTES.docs.start,
    icon: Rocket,
  },
  {
    title: 'Component Catalog',
    description: 'Explore over 20+ accessible, production-ready React components.',
    href: ROUTES.docs.components,
    icon: Blocks,
  },
  {
    title: 'Design Tokens',
    description: 'Learn how OKLCH color palettes, themes, and recipes are built.',
    href: ROUTES.docs.tokens,
    icon: Palette,
  },
  {
    title: 'GitHub & Source',
    description: 'Report a broken link, star the repository, or contribute code.',
    href: siteConfig.links.github,
    icon: Code2,
    isExternal: true,
  },
];

/**
 * 404 Not Found Page for IdeasUI Documentation.
 * Provides rich aesthetics, interactive search trigger, quick links, and responsive layout.
 */
export default function NotFound() {
  return (
    <div className="bg-background text-content-primary selection:bg-primary/20 selection:text-primary flex min-h-screen flex-col overflow-x-hidden antialiased">
      {/* ── Header Navbar ──────────────────────────────────────────────── */}
      <LandingNavbar />

      {/* ── Main Hero Section ─────────────────────────────────────────── */}
      <main className="relative isolate flex flex-1 flex-col items-center justify-center px-4 pt-40 pb-20 text-center sm:px-6 sm:py-24 lg:px-8">
        {/* Dotted Hexagon Background Texture */}
        <DottedHexagon patternOpacity={0.03} />

        {/* Ambient Perceptual Glow Spheres */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="bg-primary/10 perceptual-ambient-glow absolute -top-[15%] left-1/2 h-[420px] w-[600px] -translate-x-1/2 rounded-full blur-[140px]" />
          <div className="bg-secondary/10 perceptual-ambient-glow absolute top-[30%] -right-[10%] h-[320px] w-[320px] rounded-full blur-[120px]" />
          <div className="bg-primary-subtle/20 perceptual-ambient-glow absolute -bottom-[10%] -left-[10%] h-[280px] w-[280px] rounded-full blur-[100px]" />
        </div>

        {/* Status Pill Badge */}
        <div className="border-border-subtle/80 bg-surface/80 text-content-secondary shadow-surface/5 mb-5 inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-medium backdrop-blur-md">
          <span className="relative flex size-2">
            <span className="bg-danger absolute inline-flex size-full animate-ping rounded-full opacity-75" />
            <span className="bg-danger relative inline-flex size-2 rounded-full" />
          </span>
          <span className="text-danger font-mono text-[11px] font-semibold">404</span>
          <span className="text-content-muted">·</span>
          <span>Page Not Found</span>
        </div>

        {/* Giant 404 Heading */}
        <div className="relative mb-2 select-none">
          <div className="from-content-primary via-content-primary/75 to-content-muted/20 bg-gradient-to-b bg-clip-text font-mono text-8xl leading-none font-black tracking-tight text-transparent sm:text-9xl md:text-[11rem]">
            404
          </div>
        </div>

        {/* Heading & Context Message */}
        <h1 className="text-content-primary text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
          Lost in the Component Tree?
        </h1>
        <p className="text-content-secondary mx-auto mt-3 max-w-lg text-sm leading-relaxed sm:text-base">
          We couldn’t find the page or component documentation you were looking for. It might have
          been moved, renamed, or is currently under development.
        </p>

        {/* Primary Action Buttons & Search Trigger */}
        <NotFoundActions className="mt-8" />

        {/* Popular Destinations Quick-Nav Grid */}
        <div className="mt-14 w-full max-w-4xl text-left">
          <div className="mb-4 flex items-center justify-between px-1">
            <h2 className="text-content-tertiary font-mono text-xs font-semibold tracking-wider uppercase">
              Popular Destinations
            </h2>
            <span className="text-content-tertiary text-xs">Looking for something specific?</span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {POPULAR_DESTINATIONS.map((destination) => {
              const Icon = destination.icon;

              return (
                <Link
                  key={destination.title}
                  className="group border-border-subtle bg-surface hover:border-border-base hover:bg-surface shadow-surface/5 relative flex flex-col justify-between overflow-hidden rounded-xl border p-4 shadow-2xs backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs"
                  href={destination.href}
                  rel={destination.isExternal ? 'noopener noreferrer' : undefined}
                  target={destination.isExternal ? '_blank' : undefined}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="bg-surface-subtle/80 text-primary border-border-subtle/50 group-hover:bg-primary group-hover:text-on-primary flex size-9 items-center justify-center rounded-lg border transition-all duration-300">
                        <Icon className="size-4.5" />
                      </div>
                      <ArrowRight className="text-content-tertiary group-hover:text-content-primary size-4 transition-all duration-200 group-hover:translate-x-0.5" />
                    </div>
                    <h3 className="text-content-primary group-hover:text-primary mt-3 text-sm font-semibold transition-colors">
                      {destination.title}
                    </h3>
                    <p className="text-content-muted mt-1 text-xs leading-relaxed">
                      {destination.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <LandingFooter />
    </div>
  );
}
