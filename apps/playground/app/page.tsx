'use client';
import { ArrowRight, Palette, Package, Wrench, Eye, Code2 } from 'lucide-react';

const navigationItems = [
  {
    title: 'Colors',
    description: 'Explore color palettes and copy Tailwind classes',
    href: '/colors',
    icon: Palette,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Installer',
    description: 'Dynamic package installer for all release tags',
    href: '/installer',
    icon: Package,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Components',
    description: 'Interactive component playground',
    href: '/components',
    icon: Wrench,
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Preview',
    description: 'Live component previews and demos',
    href: '/playground',
    icon: Eye,
    gradient: 'from-orange-500 to-red-500',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <div className="text-center">
            <div className="mb-8 flex items-center justify-center">
              <div className="rounded-2xl bg-white p-4 shadow-lg">
                <Code2 className="h-12 w-12 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              <span className="from-primary-600 to-secondary-600 bg-gradient-to-r bg-clip-text text-transparent">
                IdeasUI
              </span>{' '}
              Playground
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Explore components, test different versions, and experiment with our design system.
              Everything you need to build beautiful interfaces.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Grid */}
      <div className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
                />

                {/* Content */}
                <div className="relative">
                  <div className="mb-4 flex items-center justify-between">
                    <div className={`rounded-xl bg-gradient-to-r ${item.gradient} p-3`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-gray-600" />
                  </div>

                  <h3 className="mb-2 text-xl font-semibold text-gray-900">{item.title}</h3>

                  <p className="leading-relaxed text-gray-600">{item.description}</p>

                  {/* Hover Effect */}
                  <div
                    className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${item.gradient} transition-all duration-300 group-hover:w-full`}
                  />
                </div>
              </a>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">50+</div>
            <div className="text-sm text-gray-600">Components</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">4</div>
            <div className="text-sm text-gray-600">Release Tags</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">100%</div>
            <div className="text-sm text-gray-600">TypeScript</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">A11Y</div>
            <div className="text-sm text-gray-600">Compliant</div>
          </div>
        </div>
      </div>
    </div>
  );
}
