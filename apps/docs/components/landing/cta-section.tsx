'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ExternalLink, ShieldCheck, Zap, Layers } from 'lucide-react';
import Link from 'next/link';

const SMOOTH_EASE = [0.16, 1, 0.3, 1] as const;

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-20px' },
  transition: { duration: 0.5, delay, ease: SMOOTH_EASE },
});

/** Full-width call-to-action section using semantic design tokens. */
export function CtaSection() {
  return (
    <section className="border-surface-muted relative overflow-hidden border-t py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          className="bg-surface/80 border-surface-muted xs:p-8 relative overflow-hidden rounded-2xl border p-6 backdrop-blur-2xl sm:rounded-3xl sm:p-12 lg:p-16"
          {...inView(0)}
        >
          {/* Top Gradient Accent Line */}
          <div className="from-primary via-secondary to-primary absolute top-0 right-0 left-0 h-1 bg-gradient-to-r" />

          {/* Background Ambient Glow Halos */}
          <div className="from-primary/15 via-secondary/10 pointer-events-none absolute -top-32 left-1/2 h-80 w-[500px] max-w-full -translate-x-1/2 rounded-full bg-gradient-to-b to-transparent blur-3xl" />

          {/* Subtle Decorative Grid Pattern */}
          <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)] opacity-15 dark:opacity-10">
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
              <span className="border-primary-subtle bg-primary-subtle text-primary inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-xs font-semibold tracking-wide sm:px-4">
                <Sparkles className="size-3.5" /> Start Building Today
              </span>
            </div>

            <h2 className="text-content-primary xs:text-3xl text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Ready to elevate your React application?
            </h2>

            <p className="text-content-secondary mx-auto mt-3.5 max-w-lg text-sm leading-relaxed sm:mt-4 sm:text-base">
              Ship accessible, ultra-fast interfaces in minutes with 50+ production-ready
              components, complete TypeScript support, and modern design tokens.
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
                className="group bg-primary text-on-primary hover:bg-primary/90 shadow-primary/25 inline-flex w-auto items-center justify-center gap-2.5 rounded-xl px-7 py-3.5 text-sm font-semibold shadow-lg transition-all duration-200 active:scale-98 sm:w-auto"
                href="/react/docs/start"
              >
                Get Started Free
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                className="group border-surface-strong bg-surface-subtle/80 hover:bg-surface-muted text-content-primary inline-flex w-auto items-center justify-center gap-2 rounded-xl border px-6 py-3.5 text-sm font-semibold backdrop-blur-md transition-all duration-200 active:scale-98 sm:w-auto"
                href="/react/docs/components"
              >
                Browse Components
              </Link>
            </div>

            {/* NPM Package Pill */}
            <a
              aria-label="Explore IdeasUI packages on npm"
              className="group bg-error-subtle text-error border-error-subtle mt-6 inline-flex items-center gap-2.5 rounded-xl border px-3.5 py-1.5 text-xs font-semibold backdrop-blur-md transition-all duration-200 active:scale-98 sm:mt-8"
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
