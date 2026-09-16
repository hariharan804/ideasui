import { ArrowRight, Check, Rocket } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  InstallSnippet,
  HeroComponentPreview,
  LandingFooter,
  LandingNavbar,
  DottedHexagon,
} from '@/components/landing';

const MarqueeStrip = dynamic(() => import('@/components/landing').then((mod) => mod.MarqueeStrip), {
  ssr: true,
});
const ComponentGallery = dynamic(
  () => import('@/components/landing').then((mod) => mod.ComponentGallery),
  { ssr: true },
);
const FeaturesSection = dynamic(
  () => import('@/components/landing').then((mod) => mod.FeaturesSection),
  { ssr: true },
);
const CtaSection = dynamic(() => import('@/components/landing').then((mod) => mod.CtaSection), {
  ssr: true,
});

/* ─── Main Landing Page ──────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <main className="bg-background text-content-primary flex min-h-screen flex-col overflow-x-hidden antialiased">
      <LandingNavbar />
      {/* ── 1. HERO SECTION ───────────────────────────────────────────── */}
      <section className="hero-section relative isolate overflow-hidden pt-26 pb-4 sm:pt-30 sm:pb-6 lg:pt-32 lg:pb-8">
        {/* Dotted Hexagon — Ultra-subtle Technical Texture */}
        <DottedHexagon patternOpacity={0.025} />

        {/* 1. Background Glow — Concentrated Centered Subtle Glow (Felt, Not Noticed) */}
        <div className="pointer-events-none absolute inset-0 -z-10 max-w-full overflow-hidden select-none">
          <div className="from-primary/8 via-secondary/3 absolute top-0 left-1/2 h-[280px] w-[460px] -translate-x-1/2 rounded-full bg-gradient-to-b to-transparent blur-[100px] sm:h-[320px] sm:w-[520px] sm:blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          {/* 2. Beta Badge — Compact & Subtle */}
          <div className="animate-badge-pop mb-5 inline-flex max-w-full sm:mb-6">
            <Link
              className="group bg-surface-subtle/80 hover:bg-surface-subtle border-border-subtle/60 shadow-surface/5 inline-flex max-w-full items-center gap-1.5 rounded-full border py-1 pr-3 pl-1 text-[11px] font-medium shadow-2xs backdrop-blur-md transition-all duration-200 hover:shadow-xs active:scale-95 sm:gap-2 sm:pr-3.5 sm:text-xs"
              href="/react/docs/start"
            >
              <span className="bg-primary text-on-primary inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold tracking-wider uppercase sm:px-2.5 sm:text-[10px]">
                <Rocket className="size-2.5 sm:size-3" /> Beta
              </span>
              <span className="text-content-primary text-[10px] font-semibold tracking-tight sm:text-xs">
                React + Tailwind CSS v4 Component Library
              </span>
              <ArrowRight className="text-content-tertiary group-hover:text-primary size-3 shrink-0 transition-transform duration-200 group-hover:translate-x-1 sm:size-3.5" />
            </Link>
          </div>

          {/* 3. Headline — 2 Deliberate Statements with Refined Typography Hierarchy */}
          <h1 className="text-content-primary mx-auto text-3xl leading-[1.03] font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-[3.25rem]">
            <span className="block lg:whitespace-nowrap">
              Build production-ready React interfaces.
            </span>
            <span className="perceptual-gradient-text mt-1 block font-extrabold sm:mt-1.5">
              Faster with IdeasUI.
            </span>
          </h1>

          {/* 4. Subtext — Exact Copy */}
          <p className="text-content-secondary mx-auto mt-5 max-w-xl px-2 text-sm leading-relaxed sm:mt-6 sm:text-base">
            IdeasUI is a TypeScript-first component library built for React and Tailwind CSS v4.
          </p>

          {/* 5. CTA Buttons — Tightened Gap (~4px reduced) */}
          <div className="mt-7 flex flex-row flex-wrap items-center justify-center gap-2.5 sm:mt-8 sm:gap-3">
            <Link
              className="group bg-primary text-on-primary shadow-primary/20 hover:bg-primary/95 hover:shadow-primary/35 inline-flex h-11 items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold whitespace-nowrap shadow-md transition-all duration-200 hover:-translate-y-0.5 active:scale-95 sm:h-12 sm:gap-2.5 sm:px-7 sm:text-base"
              href="/react/docs/start"
            >
              Get Started Free
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1 sm:size-4.5" />
            </Link>

            <Link
              className="group bg-surface text-content-primary hover:bg-surface-subtle border-border-base/80 shadow-surface/5 hover:border-border-strong inline-flex h-11 items-center justify-center gap-2 rounded-xl border px-6 text-sm font-semibold whitespace-nowrap shadow-2xs backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs active:scale-95 sm:h-12 sm:gap-2.5 sm:px-7 sm:text-base"
              href="/react/docs/components"
            >
              Browse Components
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1 sm:size-4.5" />
            </Link>
          </div>

          {/* 6. Feature Pills — Compact & Lighter Pill Treatment */}
          <div className="text-content-tertiary mt-7 flex flex-wrap items-center justify-center gap-1.5 px-2 text-[10px] font-medium sm:mt-8 sm:gap-2 sm:text-[11px]">
            {[
              'React 19',
              'Next.js 16',
              'Tailwind CSS v4',
              'TypeScript',
              'Accessible',
              'Tree-shakeable',
            ].map((label) => (
              <span
                key={label}
                className="bg-surface-subtle/40 border-border-subtle/30 text-content-secondary hover:bg-surface-subtle hover:text-content-primary inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] shadow-2xs transition-all duration-150 sm:px-2.5 sm:py-0.5 sm:text-[11px]"
              >
                <Check className="text-success size-3 shrink-0 sm:size-3.5" /> {label}
              </span>
            ))}
          </div>

          {/* 7. Install Command Snippet — Slightly Increased Gap */}
          <div className="mt-8 sm:mt-10">
            <InstallSnippet />
          </div>

          {/* 8. Live Component Hero Preview */}
          <HeroComponentPreview />
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
