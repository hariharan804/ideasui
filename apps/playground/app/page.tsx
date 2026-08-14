import type { JSX } from 'react';

import Link from 'next/link';
import { ArrowRight, Package, Wrench, Eye, Code2, Sparkles, Layers } from 'lucide-react';

const navigationItems = [
  {
    title: 'Installer',
    description: 'Dynamic package installer for all release tags',
    href: '/installer',
    icon: Package,
    gradient: 'from-violet-500 to-purple-500',
    shadowPath: 'shadow-violet-500/20',
  },
  {
    title: 'Playground',
    description: 'Interactive component playground & documentation',
    href: '/playground',
    icon: Wrench,
    gradient: 'from-emerald-500 to-teal-500',
    shadowPath: 'shadow-emerald-500/20',
  },
  {
    title: 'Design System',
    description: 'Guidelines, tokens, and core design principles',
    href: '/design-system',
    icon: Layers,
    gradient: 'from-amber-500 to-orange-500',
    shadowPath: 'shadow-amber-500/20',
  },
];

export default function Home(): JSX.Element {
  return (
    <div className="bg-background text-content-primary relative min-h-screen overflow-hidden transition-colors duration-500">
      {/* Dynamic Background Glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden outline-none">
        <div className="bg-primary-500/20 absolute -top-[20%] -left-[10%] h-[500px] w-[500px] animate-pulse rounded-full opacity-50 mix-blend-normal blur-3xl transition-all duration-[3000ms] dark:mix-blend-screen" />
        <div className="absolute top-[20%] right-[-10%] size-[600px] animate-pulse rounded-full bg-blue-500/20 opacity-40 mix-blend-normal blur-3xl transition-all delay-700 duration-[3000ms] dark:mix-blend-screen" />
        <div className="absolute bottom-[-20%] left-[20%] size-[700px] animate-pulse rounded-full bg-purple-500/20 opacity-30 mix-blend-normal blur-3xl transition-all delay-1000 duration-[3000ms] dark:mix-blend-screen" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="animate-slideIn mb-8 flex items-center justify-center">
              <div className="from-primary-500 shadow-primary-500/20 relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-br to-indigo-500 p-[2px] shadow-xl transition-transform duration-300 hover:scale-105">
                <div className="bg-surface rounded-[14px] p-4">
                  <Code2 className="text-primary-500 h-10 w-10" />
                </div>
              </div>
            </div>

            <h1 className="mb-6 text-5xl font-extrabold tracking-tight sm:text-7xl">
              <span className="text-content-primary">IdeasUI</span>
              <br />
              <span className="from-primary-500 bg-gradient-to-r via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                Playground
              </span>
            </h1>

            <p className="text-content-secondary mx-auto mt-6 max-w-2xl text-lg leading-8">
              A comprehensive environment to explore components, test variables, and experiment with
              the IdeasUI design system. Beautiful interfaces start here.
            </p>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                className="bg-primary-500 shadow-primary-500/30 hover:bg-primary-600 hover:shadow-primary-500/50 focus-visible:outline-primary-500 flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2"
                href="/playground"
              >
                Get Started
                <ArrowRight className="size-4" />
              </Link>
              <Link
                className="text-content-primary hover:text-primary-500 flex items-center gap-2 text-sm leading-6 font-semibold transition-colors"
                href="/design-system"
              >
                View Tokens <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Navigation Grid */}
        <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {navigationItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  className="group border-divider-subtle hover:border-divider-default bg-surface-subtle hover:bg-surface-muted relative flex flex-col justify-between overflow-hidden rounded-3xl border p-8 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  href={item.href}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Background Aura */}
                  <div
                    className={`absolute -top-12 -right-12 size-32 rounded-full bg-gradient-to-br ${item.gradient} opacity-10 blur-2xl transition-opacity duration-500 group-hover:opacity-30`}
                  />

                  {/* Icon & Arrow Header */}
                  <div className="relative mb-8 flex items-center justify-between">
                    <div
                      className={`flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg ${item.shadowPath} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                    >
                      <Icon className="size-6 text-white" />
                    </div>
                    <div className="border-divider-subtle bg-surface-subtle group-hover:bg-content-primary flex size-10 items-center justify-center rounded-full border transition-all duration-300 group-hover:border-transparent">
                      <ArrowRight className="text-content-muted group-hover:text-surface h-5 w-5 transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-content-primary group-hover:from-content-primary group-hover:to-content-secondary mb-3 text-2xl font-bold tracking-tight transition-all group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:text-transparent">
                      {item.title}
                    </h3>
                    <p className="text-content-secondary text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Line Accent */}
                  <div
                    className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${item.gradient} transition-all duration-500 group-hover:w-full`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Quick Stats / Highlights */}
          <div className="border-divider-subtle bg-surface-subtle mt-20 overflow-hidden rounded-3xl border p-8 backdrop-blur-sm lg:p-12">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="mb-1 flex items-center gap-2">
                  <Sparkles className="text-primary-500 h-4 w-4" />
                  <div className="text-content-primary text-3xl font-extrabold tracking-tight">
                    50+
                  </div>
                </div>
                <div className="text-content-secondary text-sm font-medium tracking-widest uppercase">
                  Components
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="mb-1 flex items-center gap-2">
                  <Package className="size-4 text-violet-500" />
                  <div className="text-content-primary text-3xl font-extrabold tracking-tight">
                    4
                  </div>
                </div>
                <div className="text-content-secondary text-sm font-medium tracking-widest uppercase">
                  Release Tags
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="mb-1 flex items-center gap-2">
                  <Code2 className="size-4 text-emerald-500" />
                  <div className="text-content-primary text-3xl font-extrabold tracking-tight">
                    100%
                  </div>
                </div>
                <div className="text-content-secondary text-sm font-medium tracking-widest uppercase">
                  TypeScript
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="mb-1 flex items-center gap-2">
                  <Eye className="size-4 text-rose-500" />
                  <div className="text-content-primary text-3xl font-extrabold tracking-tight">
                    A11Y
                  </div>
                </div>
                <div className="text-content-secondary text-sm font-medium tracking-widest uppercase">
                  Compliant
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
