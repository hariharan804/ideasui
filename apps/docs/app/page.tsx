'use client';

import type { MotionProps } from 'framer-motion';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Rocket } from 'lucide-react';
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
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: SMOOTH_EASE },
});

/* ─── Main Landing Page ──────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <main className="bg-background text-content-primary flex min-h-screen flex-col overflow-x-hidden antialiased">
      <LandingNavbar />
      {/* ── 1. HERO SECTION ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-30 pb-16 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-28">
        {/* Crisp Subtle Grid Overlay */}
        <div
          className="pointer-events-none absolute inset-0 -z-20 opacity-40 dark:opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.12) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Smooth Floating Ambient Orbs */}
        <div className="pointer-events-none absolute inset-0 -z-10 max-w-full overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.75, 0.4] }}
            className="from-primary/15 via-secondary/10 absolute top-0 left-1/2 h-[350px] w-[90%] -translate-x-1/2 rounded-full bg-gradient-to-b to-transparent blur-[80px] sm:h-[550px] sm:w-[900px] sm:blur-[120px]"
            transition={{ duration: 8, ease: 'easeInOut', repeat: Infinity }}
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
            className="bg-secondary/10 absolute top-1/3 -right-32 size-[280px] rounded-full blur-[70px] sm:size-[420px] sm:blur-[100px]"
            transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity, delay: 2 }}
          />
        </div>

        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          {/* Hero Announcement Badge */}
          <motion.div {...fadeUp(0)} className="mb-4 inline-flex max-w-full sm:mb-6">
            <Link
              className="group bg-primary-subtle hover:bg-primary-subtle inline-flex max-w-full items-center gap-1.5 rounded-full py-1 pr-2.5 pl-1 text-[10px] font-medium transition-all duration-300 hover:shadow-sm sm:gap-2 sm:py-1.5 sm:pr-2.5 sm:text-xs"
              href="/react/docs/start"
            >
              <span className="from-primary to-primary-400 inline-flex shrink-0 items-center gap-1 rounded-full bg-gradient-to-r px-2 py-0.5 text-[9px] font-normal tracking-wider text-white uppercase sm:px-2.5 sm:text-[10px]">
                <Rocket className="size-2.5 sm:size-3" /> Beta
              </span>
              <span className="text-content-primary text-[10px] font-medium tracking-tight">
                React + Tailwind CSS v4 Component Library
              </span>
              <ArrowRight className="text-content-tertiary group-hover:text-content-primary size-3 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 sm:size-3.5" />
            </Link>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.06)}
            className="text-content-primary xs:text-4xl text-3xl leading-[1.1] font-extrabold tracking-tight sm:text-5xl sm:leading-[1.08] md:text-6xl lg:text-7xl"
          >
            Build Faster. Design Smarter.{' '}
            <span className="perceptual-gradient-text">With IdeasUI.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            {...fadeUp(0.12)}
            className="text-content-secondary mx-auto mt-4 max-w-2xl px-2 text-sm leading-relaxed sm:mt-6 sm:text-base md:text-lg"
          >
            Beautiful, accessible React components built with Tailwind CSS v4 and TypeScript.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            {...fadeUp(0.18)}
            className="mt-6 flex flex-row flex-wrap items-center justify-center gap-3.5 sm:mt-8 sm:gap-4.5"
          >
            <Link
              className="group bg-primary text-on-primary shadow-primary/25 hover:bg-primary/90 hover:shadow-primary/40 inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl px-5.5 py-3 text-sm font-semibold whitespace-nowrap shadow-lg transition-all duration-200 active:scale-[0.98] sm:min-h-[50px] sm:gap-2.5 sm:px-7.5 sm:py-3.5 sm:text-base"
              href="/react/docs/start"
            >
              Get Started Free
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1 sm:size-4.5" />
            </Link>

            <Link
              className="group border-primary-subtle bg-primary-subtle/50 text-primary hover:bg-primary-subtle inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border px-5.5 py-3 text-sm font-semibold whitespace-nowrap backdrop-blur-md transition-all duration-200 active:scale-[0.98] sm:min-h-[50px] sm:gap-2.5 sm:px-7.5 sm:py-3.5 sm:text-base"
              href="/react/docs/components"
            >
              Browse Components
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1 sm:size-4.5" />
            </Link>
          </motion.div>

          <motion.div {...fadeUp(0.18)} className="mt-6 sm:mt-8">
            <GitHubButton className="border-surface-muted bg-surface/80 hover:border-surface-strong hover:bg-surface inline-flex h-11 min-h-[46px] items-center justify-center rounded-xl border px-6 text-sm font-semibold whitespace-nowrap backdrop-blur-md transition-all duration-200 active:scale-[0.98] sm:h-12 sm:min-h-[50px] sm:px-7 sm:text-base" />
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            {...fadeUp(0.22)}
            className="text-content-tertiary mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2.5 px-2 text-xs font-semibold sm:mt-9 sm:gap-x-6"
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
