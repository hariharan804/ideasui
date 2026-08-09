'use client';

import { motion } from 'framer-motion';
import {
  Accessibility,
  Zap,
  Cpu,
  MousePointer2,
  CheckCircle2,
  Sparkles,
  Check,
} from 'lucide-react';

const SMOOTH_EASE = [0.16, 1, 0.3, 1] as const;

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 24, filter: 'blur(6px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.6, delay, ease: SMOOTH_EASE },
});

/** Bento grid showcasing the library's core technical features using semantic tokens. */
export function FeaturesSection() {
  return (
    <section className="border-surface-muted relative overflow-hidden border-t py-28">
      {/* Background Glow */}
      <div className="from-secondary/5 via-primary/5 pointer-events-none absolute top-1/3 right-1/4 h-96 w-96 rounded-full bg-gradient-to-br to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <motion.div {...inView(0)} className="inline-flex">
            <span className="border-secondary-subtle bg-secondary-subtle text-secondary inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-xs font-semibold tracking-wide">
              <Sparkles className="size-3.5" /> Technical Excellence
            </span>
          </motion.div>

          <motion.h2
            className="text-content-primary mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
            {...inView(0.05)}
          >
            Built for modern frontend standards
          </motion.h2>

          <motion.p
            className="text-content-secondary mx-auto mt-4 max-w-xl text-base leading-relaxed"
            {...inView(0.1)}
          >
            Every component is engineered with WCAG 2.1 AA accessibility, OKLCH color spaces,
            zero-config SSR support, and strict TypeScript types.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {/* Bento Item 1 (Spans 2 columns on lg): Accessibility First */}
          <motion.div
            className="bg-surface/80 group border-surface-muted hover:border-surface-strong relative overflow-hidden rounded-2xl border p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md lg:col-span-2"
            {...inView(0.12)}
          >
            <div className="from-primary to-secondary absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary-subtle text-primary flex size-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110">
                  <Accessibility className="size-5" />
                </div>
                <div>
                  <h3 className="text-content-primary text-lg font-bold">Accessible by Default</h3>
                  <p className="text-content-tertiary text-xs">
                    React Aria Primitives &amp; WCAG 2.1 AA Compliant
                  </p>
                </div>
              </div>
              <span className="text-primary border-primary-subtle bg-primary-subtle inline-flex items-center gap-1 rounded-full border px-3 py-1 font-mono text-xs font-semibold">
                <CheckCircle2 className="size-3.5" /> 100% Axe Verified
              </span>
            </div>

            <p className="text-content-secondary mt-5 text-sm leading-relaxed">
              Full keyboard navigation, WAI-ARIA 1.2 patterns, focus ring indicators, and screen
              reader announcements built right in — zero additional code required.
            </p>

            {/* Visual Shortcut Bar */}
            <div className="bg-surface-muted border-surface-muted mt-6 flex flex-wrap items-center gap-3 rounded-xl border p-3.5 text-xs">
              <span className="text-content-muted font-medium">Keyboard Controls:</span>
              <div className="flex items-center gap-1.5">
                <kbd className="bg-background text-content-primary border-surface-strong rounded-md border px-2 py-1 font-mono text-[11px] shadow-2xs">
                  Tab
                </kbd>
                <span className="text-content-muted">Focus</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd className="bg-background text-content-primary border-surface-strong rounded-md border px-2 py-1 font-mono text-[11px] shadow-2xs">
                  Enter
                </kbd>
                <span className="text-content-muted">Trigger</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd className="bg-background text-content-primary border-surface-strong rounded-md border px-2 py-1 font-mono text-[11px] shadow-2xs">
                  Space
                </kbd>
                <span className="text-content-muted">Press</span>
              </div>
            </div>
          </motion.div>

          {/* Bento Item 2: Perceptual OKLCH Engine */}
          <motion.div
            className="bg-surface/80 group border-surface-muted hover:border-surface-strong relative overflow-hidden rounded-2xl border p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md"
            {...inView(0.16)}
          >
            <div className="from-secondary to-primary absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="flex items-center justify-between">
              <div className="bg-secondary-subtle text-secondary flex size-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110">
                <Cpu className="size-5" />
              </div>
              <span className="text-content-muted border-surface-muted bg-surface-muted rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-medium">
                OKLCH Color Space
              </span>
            </div>

            <h3 className="text-content-primary mt-5 text-base font-bold">
              Perceptual Color Engine
            </h3>
            <p className="text-content-tertiary mt-2 text-sm leading-relaxed">
              Calculated lightness curves maintain even contrast steps across light &amp; dark modes
              without color shifting.
            </p>

            {/* OKLCH Color Swatch Strip */}
            <div className="bg-surface-muted mt-5 flex items-center justify-between gap-1.5 rounded-xl p-2">
              <div className="bg-primary size-6 rounded-lg shadow-2xs" />
              <div className="bg-secondary size-6 rounded-lg shadow-2xs" />
              <div className="bg-tertiary size-6 rounded-lg shadow-2xs" />
              <div className="bg-success size-6 rounded-lg shadow-2xs" />
              <div className="bg-warning size-6 rounded-lg shadow-2xs" />
              <div className="bg-error size-6 rounded-lg shadow-2xs" />
            </div>
          </motion.div>

          {/* Bento Item 3: Zero Config SSR */}
          <motion.div
            className="bg-surface/80 group border-surface-muted hover:border-surface-strong relative overflow-hidden rounded-2xl border p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md"
            {...inView(0.2)}
          >
            <div className="from-success to-primary absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="flex items-center justify-between">
              <div className="bg-success-subtle text-success flex size-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110">
                <Zap className="size-5" />
              </div>
              <span className="text-content-muted border-surface-muted bg-surface-muted rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-medium">
                Next.js 16 + RSC
              </span>
            </div>

            <h3 className="text-content-primary mt-5 text-base font-bold">Zero Configuration</h3>
            <p className="text-content-tertiary mt-2 text-sm leading-relaxed">
              Drop into Next.js, Vite, or any React project. No context providers required for
              styling or layout.
            </p>

            {/* Framework Badges */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {['React 19', 'Next.js 16', 'Vite', 'Tailwind v4'].map((fw) => (
                <span
                  key={fw}
                  className="bg-background text-content-primary border-surface-strong rounded-md border px-2.5 py-1 text-[11px] font-medium"
                >
                  {fw}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Bento Item 4 (Spans 2 columns on lg): DX Driven Architecture */}
          <motion.div
            className="bg-surface/80 group border-surface-muted hover:border-surface-strong relative overflow-hidden rounded-2xl border p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md lg:col-span-2"
            {...inView(0.24)}
          >
            <div className="from-secondary to-warning absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-warning-subtle text-warning flex size-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110">
                  <MousePointer2 className="size-5" />
                </div>
                <div>
                  <h3 className="text-content-primary text-lg font-bold">
                    Developer Experience First
                  </h3>
                  <p className="text-content-tertiary text-xs">
                    Composable APIs &amp; IntelliSense Auto-complete
                  </p>
                </div>
              </div>
              <span className="text-content-muted border-surface-muted bg-surface-muted rounded-full border px-3 py-1 font-mono text-xs font-medium">
                Strict TypeScript
              </span>
            </div>

            <p className="text-content-secondary mt-5 text-sm leading-relaxed">
              Full `React.forwardRef` support, slotted compound components (`Button.Icon`,
              `Button.Label`), and exact type definitions for seamless IDE autocomplete.
            </p>

            {/* Code Snippet Pill */}
            <div className="border-surface-strong mt-6 flex items-center justify-between rounded-xl border bg-[#0d1117] p-3.5 font-mono text-xs text-neutral-300">
              <code>
                <span className="text-secondary">&lt;Button</span>{' '}
                <span className="text-primary">variant=</span>
                <span className="text-success">&quot;soft&quot;</span>{' '}
                <span className="text-primary">color=</span>
                <span className="text-success">&quot;primary&quot;</span>
                <span className="text-secondary">&gt;</span>
              </code>
              <span className="text-success flex items-center gap-1 font-sans text-[11px]">
                <Check className="size-3.5" /> 100% Typed
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
