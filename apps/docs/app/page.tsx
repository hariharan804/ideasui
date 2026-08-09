'use client';

import type { MotionProps } from 'framer-motion';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Palette,
  Accessibility,
  ArrowRight,
  Terminal,
  Copy,
  Check,
  Layers,
  Zap,
  ShieldCheck,
  Sparkles,
  MousePointer2,
  Cpu,
  Globe,
  Code2,
  Sliders,
  CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button, ButtonGroup } from '@ideasui/react';
import { GitHubButton } from '@/components/docs-ui/github-button';
import { Logo } from '@/components/ui/logo';

/* ─── Smooth Animation Physics ────────────────────────────────────────── */
const SMOOTH_EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 18, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.6, delay, ease: SMOOTH_EASE },
});

const fadeIn = (delay = 0): MotionProps => ({
  initial: { opacity: 0, filter: 'blur(4px)' },
  animate: { opacity: 1, filter: 'blur(0px)' },
  transition: { duration: 0.5, delay, ease: 'easeOut' },
});

const inView = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 20, filter: 'blur(4px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.6, delay, ease: SMOOTH_EASE },
});

/* ─── Technology Marquee Data ────────────────────────────────────────── */
const MARQUEE_ROW_1 = [
  { label: 'Tailwind CSS v4', icon: <Sparkles className="size-3.5" /> },
  { label: 'OKLCH Color Engine', icon: <Palette className="size-3.5" /> },
  { label: 'React Aria Primitives', icon: <Accessibility className="size-3.5" /> },
  { label: 'WCAG 2.1 AA Compliant', icon: <ShieldCheck className="size-3.5" /> },
  { label: 'TypeScript Native', icon: <Code2 className="size-3.5" /> },
  { label: 'Zero Runtime CSS', icon: <Zap className="size-3.5" /> },
];

const MARQUEE_ROW_2 = [
  { label: 'Tree Shakeable', icon: <Layers className="size-3.5" /> },
  { label: '100% Open Source', icon: <Globe className="size-3.5" /> },
  { label: 'CSS Variables', icon: <Palette className="size-3.5" /> },
  { label: 'Next.js 16 Ready', icon: <Sparkles className="size-3.5" /> },
  { label: 'Vite Compatible', icon: <Zap className="size-3.5" /> },
  { label: 'WAI-ARIA Pattern', icon: <ShieldCheck className="size-3.5" /> },
];

const MARQUEE_ITEMS_1 = ['a', 'b', 'c'].flatMap((set) =>
  MARQUEE_ROW_1.map((item) => ({ ...item, key: `${set}-${item.label}` })),
);

const MARQUEE_ITEMS_2 = ['a', 'b', 'c'].flatMap((set) =>
  MARQUEE_ROW_2.map((item) => ({ ...item, key: `${set}-${item.label}` })),
);

/* ─── Features Data ─────────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: <Accessibility className="size-5" />,
    title: 'Accessible by Default',
    desc: 'Full keyboard navigation, WAI-ARIA patterns, and screen reader support — zero extra effort required from you.',
    badge: 'WCAG 2.1 AA',
  },
  {
    icon: <Zap className="size-5" />,
    title: 'Zero Configuration',
    desc: 'Drop into Next.js, Vite, or any React project. No providers, no setup. SSR and RSC ready out of the box.',
    badge: 'Works Everywhere',
  },
  {
    icon: <Palette className="size-5" />,
    title: 'Fully Themeable',
    desc: 'CSS variables, dark mode, and custom color palettes. Swap your entire design language in one line.',
    badge: 'Instant Theme',
  },
  {
    icon: <Layers className="size-5" />,
    title: 'Production Ready',
    desc: 'Tree-shaking, strict TypeScript types, and modern ESM output. Ship only what you use — nothing more.',
    badge: 'Tree Shakeable',
  },
  {
    icon: <Cpu className="size-5" />,
    title: 'Perceptual Color Engine',
    desc: 'OKLCH-based color tokens maintain consistent lightness and contrast across every palette and mode.',
    badge: 'Color System',
  },
  {
    icon: <MousePointer2 className="size-5" />,
    title: 'Excellent DX',
    desc: 'Full forwardRef support, clean composable APIs, and IntelliSense-friendly prop types from day one.',
    badge: 'DX Driven',
  },
];

/* ─── Ultra-Smooth Interactive Hero Playground ───────────────────────── */
function HeroPlayground() {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [color, setColor] = useState<'primary' | 'secondary' | 'error'>('primary');
  const [variant, setVariant] = useState<'solid' | 'outline' | 'soft' | 'ghost'>('solid');
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');

  return (
    <div className="relative mx-auto mt-14 w-full max-w-3xl text-left">
      {/* Dynamic Ambient Glow Halo */}
      <motion.div
        animate={{ scale: [1, 1.03, 1], opacity: [0.4, 0.7, 0.4] }}
        className="perceptual-ambient-glow pointer-events-none absolute -inset-1 rounded-3xl blur-2xl"
        transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
      />

      <div className="bg-surface/90 relative overflow-hidden rounded-2xl border border-black/10 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-[#0d1117]/90">
        {/* Window Chrome Header */}
        <div className="bg-surface-subtle/80 flex flex-wrap items-center justify-between gap-3 border-b border-black/8 px-5 py-3.5 dark:border-white/8 dark:bg-white/3">
          <div className="flex items-center gap-2">
            <div className="bg-error-400/80 size-3 rounded-full" />
            <div className="bg-warning-400/80 size-3 rounded-full" />
            <div className="bg-success-400/80 size-3 rounded-full" />
            <span className="text-content-muted ml-2 font-mono text-xs tracking-tight">
              Interactive Component Workbench
            </span>
          </div>

          {/* Smooth Sliding Tab Control */}
          <div className="relative flex items-center rounded-lg bg-black/5 p-1 dark:bg-white/5">
            {(['preview', 'code'] as const).map((tab) => (
              <button
                key={tab}
                className={`relative z-10 rounded-md px-3.5 py-1 text-xs font-medium capitalize transition-colors duration-200 ${
                  activeTab === tab
                    ? 'text-content-primary dark:text-white'
                    : 'text-content-muted hover:text-content-secondary'
                }`}
                type="button"
                onClick={() => setActiveTab(tab)}
              >
                {activeTab === tab && (
                  <motion.div
                    className="absolute inset-0 rounded-md bg-white shadow-xs dark:bg-white/14"
                    layoutId="activeTabIndicator"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10">
                  {tab === 'preview' ? 'Live Preview' : 'Generated Code'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Controls Toolbar */}
        <div className="bg-surface-subtle/40 flex flex-wrap items-center justify-between gap-4 border-b border-black/6 px-5 py-3 text-xs dark:border-white/6 dark:bg-white/2">
          <div className="flex items-center gap-2">
            <Sliders className="text-primary-600 dark:text-primary-400 size-3.5" />
            <span className="text-content-secondary font-semibold">Props:</span>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            {/* Color Prop Selector */}
            <div className="flex items-center gap-2">
              <span className="text-content-muted">color:</span>
              <div className="relative flex rounded-md bg-black/5 p-0.5 dark:bg-white/5">
                {(['primary', 'secondary', 'error'] as const).map((c) => (
                  <button
                    key={c}
                    className={`relative z-10 rounded px-2.5 py-0.5 text-[11px] font-medium capitalize transition-colors duration-200 ${
                      color === c
                        ? 'text-primary-600 dark:text-primary-300'
                        : 'text-content-muted hover:text-content-primary'
                    }`}
                    type="button"
                    onClick={() => setColor(c)}
                  >
                    {color === c && (
                      <motion.div
                        className="absolute inset-0 rounded bg-white shadow-2xs dark:bg-white/16"
                        layoutId="colorIndicator"
                        transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10">{c}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Variant Prop Selector */}
            <div className="flex items-center gap-2">
              <span className="text-content-muted">variant:</span>
              <div className="relative flex rounded-md bg-black/5 p-0.5 dark:bg-white/5">
                {(['solid', 'outline', 'soft', 'ghost'] as const).map((v) => (
                  <button
                    key={v}
                    className={`relative z-10 rounded px-2.5 py-0.5 text-[11px] font-medium capitalize transition-colors duration-200 ${
                      variant === v
                        ? 'text-primary-600 dark:text-primary-300'
                        : 'text-content-muted hover:text-content-primary'
                    }`}
                    type="button"
                    onClick={() => setVariant(v)}
                  >
                    {variant === v && (
                      <motion.div
                        className="absolute inset-0 rounded bg-white shadow-2xs dark:bg-white/16"
                        layoutId="variantIndicator"
                        transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10">{v}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Prop Selector */}
            <div className="flex items-center gap-2">
              <span className="text-content-muted">size:</span>
              <div className="relative flex rounded-md bg-black/5 p-0.5 dark:bg-white/5">
                {(['sm', 'md', 'lg'] as const).map((s) => (
                  <button
                    key={s}
                    className={`relative z-10 rounded px-2 py-0.5 text-[11px] font-medium uppercase transition-colors duration-200 ${
                      size === s
                        ? 'text-primary-600 dark:text-primary-300'
                        : 'text-content-muted hover:text-content-primary'
                    }`}
                    type="button"
                    onClick={() => setSize(s)}
                  >
                    {size === s && (
                      <motion.div
                        className="absolute inset-0 rounded bg-white shadow-2xs dark:bg-white/16"
                        layoutId="sizeIndicator"
                        transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10">{s}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* View Switcher with Smooth AnimatePresence */}
        <div className="relative min-h-64">
          <AnimatePresence mode="wait">
            {activeTab === 'preview' ? (
              <motion.div
                key="preview-view"
                animate={{ opacity: 1, scale: 1 }}
                className="flex min-h-64 flex-col items-center justify-center gap-6 p-8"
                exit={{ opacity: 0, scale: 0.98 }}
                initial={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <motion.div
                  layout
                  className="flex items-center justify-center p-4"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                >
                  <Button color={color} size={size} variant={variant}>
                    Click Me
                  </Button>
                </motion.div>
                <p className="text-content-muted text-[11px] tracking-wide">
                  Active configuration rendered using live{' '}
                  <code className="text-primary-600 dark:text-primary-400 font-mono">
                    @ideasui/react
                  </code>{' '}
                  components
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="code-view"
                animate={{ opacity: 1, scale: 1 }}
                className="min-h-64 overflow-x-auto bg-[#0d1117] p-6 font-mono text-sm leading-relaxed text-neutral-300"
                exit={{ opacity: 0, scale: 0.98 }}
                initial={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <pre>
                  <span className="text-secondary-400">import</span> {'{ Button }'}{' '}
                  <span className="text-secondary-400">from</span>{' '}
                  <span className="text-success-400">&apos;@ideasui/react&apos;</span>;{'\n\n'}
                  <span className="text-secondary-400">export default function</span>{' '}
                  <span className="text-primary-400">Example</span>() &#123;{'\n'}
                  {'  '}
                  <span className="text-secondary-400">return</span> ({'\n'}
                  {'    '}
                  <span className="text-primary-400">&lt;Button</span>{' '}
                  <span className="text-secondary-300">color=</span>
                  <span className="text-success-400">&quot;{color}&quot;</span>{' '}
                  <span className="text-secondary-300">variant=</span>
                  <span className="text-success-400">&quot;{variant}&quot;</span>{' '}
                  <span className="text-secondary-300">size=</span>
                  <span className="text-success-400">&quot;{size}&quot;</span>
                  <span className="text-primary-400">&gt;</span>
                  {'\n'}
                  {'      '}Click Me{'\n'}
                  {'    '}
                  <span className="text-primary-400">&lt;/Button&gt;</span>
                  {'\n'}
                  {'  '});{'\n'}
                  &#125;
                </pre>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Status Bar */}
        <div className="bg-surface-subtle/80 flex items-center justify-between border-t border-black/6 px-5 py-2.5 text-[11px] dark:border-white/6 dark:bg-white/2">
          <span className="text-content-muted">Tailwind CSS v4 Pure Recipe Output</span>
          <span className="text-success-600 dark:text-success-400 flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="size-3.5" /> React Aria Standard Verified
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Installation Snippet Component ───────────────────────────────── */
function InstallSnippet() {
  const [copied, setCopied] = useState(false);
  const [pkg, setPkg] = useState<'pnpm' | 'npm' | 'yarn' | 'bun'>('pnpm');

  const cmds = {
    pnpm: 'pnpm add @ideasui/react @ideasui/theme',
    npm: 'npm install @ideasui/react @ideasui/theme',
    yarn: 'yarn add @ideasui/react @ideasui/theme',
    bun: 'bun add @ideasui/react @ideasui/theme',
  };

  function copyCommand() {
    navigator.clipboard.writeText(cmds[pkg]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-md">
      {/* Package Tabs */}
      <div className="relative mx-auto mb-2.5 flex w-fit items-center justify-center gap-1 rounded-xl bg-black/5 p-1 dark:bg-white/5">
        {(['pnpm', 'npm', 'yarn', 'bun'] as const).map((p) => (
          <button
            key={p}
            className={`relative z-10 rounded-lg px-3 py-1 font-mono text-xs transition-colors duration-200 ${
              pkg === p
                ? 'text-primary-600 dark:text-primary-300 font-semibold'
                : 'text-content-muted hover:text-content-secondary'
            }`}
            type="button"
            onClick={() => setPkg(p)}
          >
            {pkg === p && (
              <motion.div
                className="absolute inset-0 rounded-lg bg-white shadow-2xs dark:bg-white/14"
                layoutId="pkgTabIndicator"
                transition={{ type: 'spring', stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10">{p}</span>
          </button>
        ))}
      </div>

      {/* Snippet Pill */}
      <div className="group flex items-center justify-between gap-3 rounded-2xl border border-black/10 bg-black/5 px-4 py-3 backdrop-blur-xl transition-all duration-300 hover:border-black/20 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20">
        <div className="flex min-w-0 items-center gap-2.5">
          <Terminal className="text-content-tertiary size-4 shrink-0" />
          <code className="text-content-primary truncate font-mono text-xs sm:text-sm">
            {cmds[pkg]}
          </code>
        </div>
        <button
          aria-label="Copy installation command"
          className="text-content-muted hover:text-content-primary shrink-0 rounded-lg p-1.5 transition-colors hover:bg-black/5 active:scale-95 dark:hover:bg-white/10"
          type="button"
          onClick={copyCommand}
        >
          {copied ? (
            <span className="text-success-600 dark:text-success-400 flex items-center gap-1 text-[11px] font-semibold">
              <Check className="size-3.5" /> Copied
            </span>
          ) : (
            <Copy className="size-3.5" />
          )}
        </button>
      </div>
    </div>
  );
}

/* ─── Smooth Infinite Marquee ────────────────────────────────────────── */
function MarqueeStrip() {
  return (
    <section className="bg-surface-subtle/30 relative overflow-hidden border-y border-black/8 py-6 backdrop-blur-md dark:border-white/8">
      {/* Edge Blur Fade Masks */}
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r to-transparent" />
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l to-transparent" />

      <div className="flex flex-col gap-3">
        {/* Row 1 — Left Scroll */}
        <div className="flex overflow-hidden">
          <div
            className="flex shrink-0 gap-3"
            style={{ animation: 'marquee-left 40s linear infinite' }}
          >
            {MARQUEE_ITEMS_1.map((item) => (
              <div
                key={item.key}
                className="text-content-tertiary flex items-center gap-2 rounded-full border border-black/8 bg-black/3 px-4 py-1.5 text-xs font-medium dark:border-white/8 dark:bg-white/3"
              >
                <span className="text-primary-600 dark:text-primary-400">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — Right Scroll */}
        <div className="flex overflow-hidden">
          <div
            className="flex shrink-0 gap-3"
            style={{ animation: 'marquee-right 48s linear infinite' }}
          >
            {MARQUEE_ITEMS_2.map((item) => (
              <div
                key={item.key}
                className="text-content-tertiary flex items-center gap-2 rounded-full border border-black/8 bg-black/3 px-4 py-1.5 text-xs font-medium dark:border-white/8 dark:bg-white/3"
              >
                <span className="text-secondary-600 dark:text-secondary-400">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Main Landing Page ──────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <main className="bg-background text-content-primary flex min-h-screen flex-col overflow-x-hidden antialiased">
      {/* ── 1. HERO SECTION ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28">
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
            className="from-primary-600/15 via-secondary-600/10 absolute top-0 left-1/2 h-[550px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b to-transparent blur-[120px]"
            transition={{ duration: 8, ease: 'easeInOut', repeat: Infinity }}
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
            className="bg-secondary-600/10 absolute top-1/3 -right-32 size-[420px] rounded-full blur-[100px]"
            transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity, delay: 2 }}
          />
        </div>

        <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
          {/* Hero Announcement Badge */}
          <motion.div {...fadeUp(0)} className="mb-6 inline-flex">
            <Link
              className="group bg-surface/80 hover:bg-surface inline-flex items-center gap-2 rounded-full border border-black/8 px-3.5 py-1.5 text-xs font-medium shadow-2xs backdrop-blur-xl transition-all duration-300 hover:border-black/16 hover:shadow-md dark:border-white/10 dark:hover:border-white/20"
              href="/react/docs/start"
            >
              <span className="from-primary-500 to-secondary-500 rounded-full bg-gradient-to-r px-2 py-0.5 text-[10px] font-bold tracking-wider text-white uppercase">
                ✨ v1.0
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
              className="group bg-primary-600 shadow-primary-600/25 hover:bg-primary-500 hover:shadow-primary-500/40 inline-flex items-center gap-2.5 rounded-xl px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 active:scale-98"
              href="/react/docs/start"
            >
              Get Started
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <Link
              className="group bg-surface/80 hover:bg-surface text-content-primary inline-flex items-center gap-2.5 rounded-xl border border-black/12 px-6 py-3.5 text-sm font-semibold backdrop-blur-md transition-all duration-200 hover:border-black/20 active:scale-98 dark:border-white/12 dark:hover:border-white/20"
              href="/react/docs/components"
            >
              Browse Components
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            {/* Real GitHub Stars Button */}
            <GitHubButton className="h-12 rounded-xl border border-black/10 bg-black/5 px-5 text-sm backdrop-blur-md transition-all duration-200 hover:border-black/20 hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:bg-white/10" />
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            {...fadeUp(0.22)}
            className="text-content-tertiary mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold"
          >
            <span className="inline-flex items-center gap-1.5">
              <Check className="text-success-500 size-3.5" /> React 19
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="text-success-500 size-3.5" /> Next.js 16
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="text-success-500 size-3.5" /> Tailwind CSS v4
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="text-success-500 size-3.5" /> TypeScript
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="text-success-500 size-3.5" /> Accessible
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="text-success-500 size-3.5" /> Tree-shakeable
            </span>
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
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <motion.p
              className="text-primary-600 dark:text-primary-400 text-xs font-bold tracking-widest uppercase"
              {...inView(0)}
            >
              Component Architecture
            </motion.p>
            <motion.h2
              className="text-content-primary mt-2.5 text-3xl font-bold tracking-tight sm:text-4xl"
              {...inView(0.05)}
            >
              Designed for flexibility and intent
            </motion.h2>
            <motion.p
              className="text-content-secondary mx-auto mt-3.5 max-w-lg text-sm leading-relaxed"
              {...inView(0.1)}
            >
              Explore the core component variants built with pure CSS recipes and React Aria
              accessibility defaults.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Gallery Card 1 */}
            <motion.div
              className="bg-surface/80 group rounded-2xl border border-black/8 p-6 shadow-xs backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-black/16 hover:shadow-lg dark:border-white/8 dark:hover:border-white/16"
              {...inView(0.12)}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-content-primary text-sm font-semibold">Button Variants</h3>
                <span className="text-content-muted font-mono text-[10px]">
                  variant=&quot;...&quot;
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5 rounded-xl bg-black/3 p-5 dark:bg-white/3">
                <Button color="primary" variant="solid">
                  Solid
                </Button>
                <Button color="primary" variant="outline">
                  Outline
                </Button>
                <Button color="primary" variant="soft">
                  Soft
                </Button>
                <Button color="primary" variant="ghost">
                  Ghost
                </Button>
              </div>
              <p className="text-content-tertiary mt-4 text-xs leading-relaxed">
                Four standardized variant styles that adapt seamlessly across light & dark
                background tokens.
              </p>
            </motion.div>

            {/* Gallery Card 2 */}
            <motion.div
              className="bg-surface/80 group rounded-2xl border border-black/8 p-6 shadow-xs backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-black/16 hover:shadow-lg dark:border-white/8 dark:hover:border-white/16"
              {...inView(0.18)}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-content-primary text-sm font-semibold">Intent Semantics</h3>
                <span className="text-content-muted font-mono text-[10px]">
                  color=&quot;...&quot;
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5 rounded-xl bg-black/3 p-5 dark:bg-white/3">
                <Button color="primary" size="sm">
                  Primary
                </Button>
                <Button color="secondary" size="sm">
                  Secondary
                </Button>
                <Button color="error" size="sm">
                  Error
                </Button>
              </div>
              <p className="text-content-tertiary mt-4 text-xs leading-relaxed">
                Semantic intent props ensure predictable color hierarchy throughout your application
                design system.
              </p>
            </motion.div>

            {/* Gallery Card 3 */}
            <motion.div
              className="bg-surface/80 group rounded-2xl border border-black/8 p-6 shadow-xs backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-black/16 hover:shadow-lg dark:border-white/8 dark:hover:border-white/16"
              {...inView(0.24)}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-content-primary text-sm font-semibold">Button Groups</h3>
                <span className="text-content-muted font-mono text-[10px]">
                  &lt;ButtonGroup /&gt;
                </span>
              </div>
              <div className="flex flex-col items-start gap-3 rounded-xl bg-black/3 p-5 dark:bg-white/3">
                <ButtonGroup>
                  <Button color="primary">Active</Button>
                  <Button variant="outline">Tab B</Button>
                  <Button variant="outline">Tab C</Button>
                </ButtonGroup>
              </div>
              <p className="text-content-tertiary mt-4 text-xs leading-relaxed">
                Segmented control and toolbars with automatic rounded corner masking and keyboard
                focus management.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 4. BENTO FEATURE GRID ──────────────────────────────────────── */}
      <section className="border-t border-black/8 py-24 dark:border-white/8">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <motion.p
              className="text-primary-600 dark:text-primary-400 text-xs font-bold tracking-widest uppercase"
              {...inView(0)}
            >
              Technical Core
            </motion.p>
            <motion.h2
              className="text-content-primary mt-2.5 text-3xl font-bold tracking-tight sm:text-4xl"
              {...inView(0.05)}
            >
              Built for modern frontend standards
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, idx) => (
              <motion.div
                key={f.title}
                className="bg-surface/80 group relative overflow-hidden rounded-2xl border border-black/8 p-7 shadow-2xs backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-md dark:border-white/8 dark:hover:border-white/20"
                {...inView(idx * 0.05)}
              >
                <div className="flex items-center justify-between">
                  <div className="bg-primary-500/10 text-primary-600 dark:bg-primary-400/15 dark:text-primary-300 flex size-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110">
                    {f.icon}
                  </div>
                  <span className="text-content-muted rounded-full border border-black/8 bg-black/3 px-2.5 py-0.5 font-mono text-[10px] font-medium dark:border-white/8 dark:bg-white/5">
                    {f.badge}
                  </span>
                </div>

                <h3 className="text-content-primary mt-5 text-base font-semibold">{f.title}</h3>
                <p className="text-content-tertiary mt-2 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CALL TO ACTION ─────────────────────────────────────────── */}
      <section className="border-t border-black/8 py-24 dark:border-white/8">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div
            className="bg-surface-subtle/60 relative overflow-hidden rounded-3xl border border-black/10 p-10 backdrop-blur-xl sm:p-16 dark:border-white/10 dark:bg-white/3"
            {...inView(0)}
          >
            <div className="bg-primary-600/12 dark:bg-primary-600/18 pointer-events-none absolute -top-28 left-1/2 h-72 w-96 -translate-x-1/2 rounded-full blur-3xl" />

            <h2 className="text-content-primary text-3xl font-extrabold tracking-tight sm:text-4xl">
              Ready to build with IdeasUI?
            </h2>
            <p className="text-content-secondary mx-auto mt-4 max-w-md text-sm leading-relaxed">
              Start building in minutes. Browse 50+ components with live previews, full TypeScript
              support, and first-class accessibility.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                className="group bg-primary-600 shadow-primary-600/25 hover:bg-primary-500 hover:shadow-primary-500/40 inline-flex items-center gap-2.5 rounded-xl px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 active:scale-98"
                href="/react/docs/start"
              >
                Get Started Free
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                className="group text-content-secondary hover:text-content-primary inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200"
                href="/react/docs/components"
              >
                View Components
                <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 6. FOOTER ─────────────────────────────────────────────────── */}
      <footer className="mt-auto border-t border-black/8 py-8 text-xs dark:border-white/8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <Logo showVersion={false} size="md" />
            <span className="text-content-muted ml-2">
              © {new Date().getFullYear()} · MIT License
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link
              className="text-content-muted hover:text-content-primary transition-colors"
              href="/react/docs/start"
            >
              Docs
            </Link>
            <Link
              className="text-content-muted hover:text-content-primary transition-colors"
              href="/react/docs/components"
            >
              Components
            </Link>
            <Link
              className="text-content-muted hover:text-content-primary transition-colors"
              href="/react/docs/changelog"
            >
              Changelog
            </Link>
            <Link
              className="text-content-muted hover:text-content-primary transition-colors"
              href="/react/docs/roadmap"
            >
              Roadmap
            </Link>
            <a
              className="text-content-muted hover:text-content-primary transition-colors"
              href="https://github.com/hariharan804/ideasui/blob/main/LICENSE"
              rel="noopener noreferrer"
              target="_blank"
            >
              MIT License
            </a>
            <a
              className="text-content-muted hover:text-content-primary transition-colors"
              href="https://github.com/hariharan804/ideasui"
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
