'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ExternalLink, ShieldCheck, Zap, Layers } from 'lucide-react';
import Link from 'next/link';

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-20px' },
  transition: { duration: 0.5, delay, ease: SMOOTH_EASE },
});

/** Full-width call-to-action section using semantic design tokens. */
export function CtaSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          className="bg-surface-subtle/70 shadow-surface/10 xs:p-8 relative overflow-hidden rounded-2xl p-6 shadow-2xl backdrop-blur-2xl sm:rounded-3xl sm:p-12 lg:p-16"
          {...inView(0)}
        >
          {/* Top Gradient Accent Line */}
          <div className="from-primary via-secondary to-primary absolute top-0 right-0 left-0 h-1 bg-linear-to-r" />

          {/* Background Ambient Glow Halos */}
          <div className="from-primary/15 via-secondary/10 pointer-events-none absolute -top-32 left-1/2 h-80 w-[500px] max-w-full -translate-x-1/2 rounded-full bg-linear-to-b to-transparent blur-3xl" />

          {/* Subtle Decorative Grid Pattern */}
          <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)] opacity-15">
            <svg
              className="size-full"
              height="100%"
              width="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern height="24" id="cta-grid" patternUnits="userSpaceOnUse" width="24">
                  <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
              </defs>
              <rect fill="url(#cta-grid)" height="100%" width="100%" />
            </svg>
          </div>

          <div className="relative z-10">
            {/* Top Pill */}
            <div className="mb-5 inline-flex sm:mb-6">
              <span className="bg-primary-subtle/80 text-on-primary-subtle inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide shadow-2xs">
                <Sparkles className="size-3.5" /> Start Building Today
              </span>
            </div>

            <h2 className="text-content-primary xs:text-3xl text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Start building with IdeasUI.
            </h2>

            <p className="text-content-secondary mx-auto mt-3.5 max-w-lg text-sm leading-relaxed sm:mt-4 sm:text-base">
              Production-ready React components, TypeScript types, and Tailwind CSS v4 — ready when
              you are.
            </p>

            {/* Micro Feature Badges */}
            <div className="text-content-tertiary mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-medium sm:mt-8 sm:gap-x-6">
              <span className="inline-flex items-center gap-1.5">
                <Zap className="text-primary size-3.5" /> Zero Config SSR
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="text-success size-3.5" /> WCAG 2.1 AA
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Layers className="text-secondary size-3.5" /> Tree-shakeable ESM
              </span>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex w-full flex-col items-center justify-center gap-3.5 sm:mt-10 sm:w-auto sm:flex-row">
              <Link
                className="group bg-primary text-on-primary hover:bg-primary/95 shadow-primary/25 inline-flex w-auto items-center justify-center gap-2.5 rounded-xl px-7 py-3.5 text-sm font-semibold shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:scale-98 sm:w-auto"
                href="/react/docs/start"
              >
                Get Started Free
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                className="group bg-background text-content-primary inline-flex w-auto items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold shadow-sm backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-98 sm:w-auto"
                href="/react/docs/components"
              >
                Browse Components
              </Link>
            </div>

            <a
              aria-label="Explore IdeasUI packages on npm"
              className="group bg-surface-subtle/90 text-content-secondary hover:bg-surface-muted hover:text-content-primary shadow-surface/5 mt-6 inline-flex items-center gap-2.5 rounded-xl px-4 py-2 text-xs font-semibold shadow-2xs transition-all duration-200 hover:shadow-sm active:scale-98 sm:mt-8"
              href="https://www.npmjs.com/search?q=ideasui"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="text-xs font-medium">Explore NPM packages</span>
              <ExternalLink className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
