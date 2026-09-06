import type { JSX } from 'react';

import Link from 'next/link';
import {
  ArrowRight,
  Package,
  Wrench,
  ShieldCheck,
  Code2,
  Sparkles,
  Layers,
  BookOpen,
} from 'lucide-react';
import { Button } from '@ideasui/button';

const navigationItems = [
  {
    title: 'Component Playground',
    description:
      'Test interactive React primitives with live prop inspectors, custom state triggers, and code generator.',
    href: '/playground',
    icon: Wrench,
    badge: 'Interactive',
    color: 'primary',
  },
  {
    title: 'Design System Tokens',
    description:
      'Explore OKLCH color palettes, elevation depth scales, typography tokens, and surface variants.',
    href: '/design-system',
    icon: Layers,
    badge: 'OKLCH Tokens',
    color: 'secondary',
  },
  {
    title: 'Package Installer',
    description:
      'Dynamic package manager terminal generator for npm, pnpm, yarn, and bun across release channels.',
    href: '/installer',
    icon: Package,
    badge: 'v0.0.5',
    color: 'tertiary',
  },
];

export default function Home(): JSX.Element {
  return (
    <div className="bg-background text-content-primary relative min-h-screen overflow-hidden pt-12 pb-24 transition-colors duration-500">
      {/* Ambience Backdrops */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden outline-none">
        <div className="bg-primary/15 absolute -top-[15%] left-[25%] size-[600px] animate-pulse rounded-full opacity-50 blur-3xl" />
        <div className="bg-secondary/15 absolute top-[30%] -right-[10%] size-[700px] animate-pulse rounded-full opacity-40 blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6">
        {/* Hero Section */}
        <section className="mx-auto max-w-4xl py-16 text-center sm:py-24">
          <div className="bg-primary-subtle text-primary mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold shadow-2xs">
            <Sparkles className="animate-spin-slow size-4" />
            <span>IdeasUI Component Library Sandbox</span>
          </div>

          <h1 className="text-content-primary text-5xl font-extrabold tracking-tight sm:text-7xl">
            Build Accessible Interfaces <br />
            <span className="text-primary">With Pure Speed</span>
          </h1>

          <p className="text-content-secondary mx-auto mt-6 max-w-2xl text-lg leading-relaxed">
            An executive development sandbox to inspect React Aria primitives, test OKLCH theme
            variables, and craft state-of-the-art Web applications.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/playground">
              <Button color="primary" size="lg">
                Explore Components
                <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Link href="/design-system">
              <Button color="neutral" size="lg" variant="soft">
                <Layers className="size-4" />
                View Design Tokens
              </Button>
            </Link>
            <Link href="/docs">
              <Button color="neutral" size="lg" variant="ghost">
                <BookOpen className="size-4" />
                Documentation
              </Button>
            </Link>
          </div>
        </section>

        {/* Feature Cards Grid (Borderless) */}
        <section className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                className="bg-surface/80 hover:bg-surface group relative flex flex-col justify-between overflow-hidden rounded-3xl p-8 shadow-xs backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                href={item.href}
              >
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <div className="bg-primary-subtle text-primary flex size-12 items-center justify-center rounded-2xl shadow-2xs transition-transform group-hover:scale-110">
                      <Icon className="size-6" />
                    </div>
                    <span className="bg-primary-subtle text-primary rounded-full px-3 py-1 font-mono text-xs font-bold">
                      {item.badge}
                    </span>
                  </div>

                  <h2 className="text-content-primary group-hover:text-primary mb-2 text-2xl font-extrabold transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-content-secondary text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="text-primary mt-8 flex items-center justify-between pt-4 text-xs font-semibold">
                  <span>Open Module</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </section>

        {/* Stats Metrics Section (Borderless) */}
        <section className="bg-surface-subtle/80 overflow-hidden rounded-3xl p-8 shadow-xs backdrop-blur-md lg:p-12">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="flex flex-col items-center justify-center space-y-1 text-center">
              <div className="mb-1 flex items-center gap-2">
                <Sparkles className="text-primary size-5" />
                <span className="text-content-primary text-3xl font-extrabold">WCAG AA</span>
              </div>
              <span className="text-content-secondary text-xs font-semibold tracking-wider uppercase">
                Accessibility Standard
              </span>
            </div>

            <div className="flex flex-col items-center justify-center space-y-1 text-center">
              <div className="mb-1 flex items-center gap-2">
                <ShieldCheck className="text-success size-5" />
                <span className="text-content-primary text-3xl font-extrabold">100%</span>
              </div>
              <span className="text-content-secondary text-xs font-semibold tracking-wider uppercase">
                Axe Test Coverage
              </span>
            </div>

            <div className="flex flex-col items-center justify-center space-y-1 text-center">
              <div className="mb-1 flex items-center gap-2">
                <Code2 className="text-info size-5" />
                <span className="text-content-primary text-3xl font-extrabold">OKLCH</span>
              </div>
              <span className="text-content-secondary text-xs font-semibold tracking-wider uppercase">
                Perceptual Color Space
              </span>
            </div>

            <div className="flex flex-col items-center justify-center space-y-1 text-center">
              <div className="mb-1 flex items-center gap-2">
                <Package className="text-tertiary size-5" />
                <span className="text-content-primary text-3xl font-extrabold">Tailwind v4</span>
              </div>
              <span className="text-content-secondary text-xs font-semibold tracking-wider uppercase">
                CSS Engine
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
