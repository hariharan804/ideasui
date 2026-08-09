'use client';

import type { MotionProps } from 'framer-motion';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { GitHubButton } from '@/components/docs-ui/github-button';
import {
  HeroPlayground,
  InstallSnippet,
  MarqueeStrip,
  ComponentGallery,
  FeaturesSection,
  CtaSection,
  LandingFooter,
  LandingNavbar,
} from '@/components/landing';

/* ─── Smooth Animation Physics ────────────────────────────────────────── */
const SMOOTH_EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 18, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.6, delay, ease: SMOOTH_EASE },
});

/* ─── Main Landing Page ──────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <main className="bg-background text-content-primary flex min-h-screen flex-col overflow-x-hidden antialiased">
      <LandingNavbar />
      {/* ── 1. HERO SECTION ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-22 pb-20 lg:pt-36 lg:pb-28">
        {/* Crisp Subtle Grid Overlay */}
        <div
          className="pointer-events-none absolute inset-0 -z-20 opacity-40 dark:opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.12) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Smooth Floating Ambient Orbs */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.75, 0.4] }}
            className="from-primary/15 via-secondary/10 absolute top-0 left-1/2 h-[550px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b to-transparent blur-[120px]"
            transition={{ duration: 8, ease: 'easeInOut', repeat: Infinity }}
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
            className="bg-secondary/10 absolute top-1/3 -right-32 size-[420px] rounded-full blur-[100px]"
            transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity, delay: 2 }}
          />
        </div>

        <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
          {/* Hero Announcement Badge */}
          <motion.div {...fadeUp(0)} className="mb-6 inline-flex">
            <Link
              className="group bg-surface/80 hover:bg-surface border-surface-muted hover:border-surface-strong inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium shadow-2xs backdrop-blur-xl transition-all duration-300 hover:shadow-md"
              href="/react/docs/start"
            >
              <span className="from-primary to-secondary rounded-full bg-gradient-to-r px-2 py-0.5 text-[10px] font-bold tracking-wider text-white uppercase">
                ✨ Beta
              </span>
              <span className="text-content-primary font-medium">
                React + Tailwind CSS v4 Component Library
              </span>
              <ArrowRight className="text-content-tertiary group-hover:text-content-primary size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.06)}
            className="text-content-primary text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Build Faster. Design Smarter.{' '}
            <span className="perceptual-gradient-text">With IdeasUI.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            {...fadeUp(0.12)}
            className="text-content-secondary mx-auto mt-6 max-w-2xl text-base leading-relaxed sm:text-lg"
          >
            Beautiful, accessible React components built with Tailwind CSS v4 and TypeScript.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            {...fadeUp(0.18)}
            className="mt-8 flex flex-wrap items-center justify-center gap-3.5"
          >
            <Link
              className="group bg-primary text-on-primary shadow-primary/25 hover:bg-primary/90 hover:shadow-primary/40 inline-flex items-center gap-2.5 rounded-xl px-6 py-3.5 text-sm font-semibold shadow-lg transition-all duration-200 active:scale-[0.98]"
              href="/react/docs/start"
            >
              Get Started
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <Link
              className="group border-primary-subtle bg-primary-subtle/50 text-primary hover:bg-primary-subtle inline-flex items-center gap-2.5 rounded-xl border px-6 py-3.5 text-sm font-semibold backdrop-blur-md transition-all duration-200 active:scale-[0.98]"
              href="/react/docs/components"
            >
              Browse Components
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            {/* Real GitHub Stars Button */}
            <GitHubButton className="border-surface-muted bg-surface hover:border-surface hover:bg-surface-muted h-12 rounded-xl border px-5 text-sm backdrop-blur-md transition-all duration-200" />
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            {...fadeUp(0.22)}
            className="text-content-tertiary mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold"
          >
            {[
              'React 19',
              'Next.js 16',
              'Tailwind CSS v4',
              'TypeScript',
              'Accessible',
              'Tree-shakeable',
            ].map((label) => (
              <span key={label} className="inline-flex items-center gap-1.5">
                <Check className="text-success size-3.5" /> {label}
              </span>
            ))}
          </motion.div>

          {/* Install Command Snippet */}
          <motion.div {...fadeUp(0.26)}>
            <InstallSnippet />
          </motion.div>

          {/* Interactive Hero Workbench */}
          <motion.div {...fadeUp(0.3)}>
            <HeroPlayground />
          </motion.div>
        </div>
      </section>

      {/* ── 2. INFINITE MARQUEE STRIP ─────────────────────────────────── */}
      <MarqueeStrip />

      {/* ── 3. COMPONENT GALLERY SHOWCASE ─────────────────────────────── */}
      <ComponentGallery />

      {/* ── 4. BENTO FEATURE GRID ──────────────────────────────────────── */}
      <FeaturesSection />

      {/* ── 5. CALL TO ACTION ─────────────────────────────────────────── */}
      <CtaSection />

      {/* ── 6. FOOTER ─────────────────────────────────────────────────── */}
      <LandingFooter />
    </main>
  );
}
