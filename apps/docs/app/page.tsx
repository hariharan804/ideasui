'use client';

import type { MotionProps } from 'framer-motion';

import { motion } from 'framer-motion';
import {
  Github,
  Zap,
  Palette,
  Accessibility,
  ArrowRight,
  Terminal,
  Copy,
  Check,
  Code2,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

/* ─── Feature data ──────────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: <Zap className="size-5" />,
    title: 'High Performance',
    desc: 'Zero runtime CSS with Tailwind v4. Tree-shakeable React components with sub-millisecond renders.',
    iconClass: 'bg-info/12 text-info',
  },
  {
    icon: <Palette className="size-5" />,
    title: 'Deep Theming',
    desc: 'OKLCH-based token system with dark mode, custom palettes, and semantic color scales out of the box.',
    iconClass: 'bg-primary/12 text-primary',
  },
  {
    icon: <Accessibility className="size-5" />,
    title: 'Accessible by Default',
    desc: 'Built on React Aria — every component meets WCAG 2.1 AA with full keyboard and screen-reader support.',
    iconClass: 'bg-success/12 text-success',
  },
];

const STATS = [
  { label: 'Components', value: '30+' },
  { label: 'Accessibility', value: 'WCAG AA' },
  { label: 'Bundle Impact', value: '~0kb' },
  { label: 'TypeScript', value: '100%' },
];

/* ─── Install Snippet ───────────────────────────────────────────────── */
function InstallSnippet() {
  const [copied, setCopied] = useState(false);
  const cmd = 'npm install @ideasui/react @ideasui/theme';

  function copy() {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="install-snippet mx-auto mt-10 flex max-w-lg items-center justify-between gap-4 rounded-xl border px-5 py-3.5 backdrop-blur-sm">
      <div className="flex min-w-0 items-center gap-3">
        <Terminal className="text-content-secondary size-4 shrink-0" />
        <code className="text-content-primary truncate font-mono text-sm">{cmd}</code>
      </div>
      <button
        aria-label="Copy install command"
        className="text-content-secondary hover:text-content-primary shrink-0 rounded-md p-1.5 transition-colors"
        onClick={copy}
      >
        {copied ? <Check className="text-success size-4" /> : <Copy className="size-4" />}
      </button>
    </div>
  );
}

/* ─── Animation ─────────────────────────────────────────────────────── */
const fadeUp = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

/* ─── Page ──────────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <main className="bg-background text-content-primary flex min-h-screen flex-col overflow-x-hidden pb-20">
      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-36 pb-24 lg:pt-44 lg:pb-32">
        {/* Background decorations */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {/* Primary glow */}
          <div className="absolute -top-40 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,var(--color-primary)/0.35_0%,transparent_70%)] opacity-30" />
          {/* Info glow right */}
          <div className="absolute top-10 right-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,var(--color-info)/0.3_0%,transparent_70%)] opacity-25" />
          {/* Dot grid */}
          <svg
            className="absolute inset-0 h-full w-full opacity-[0.04]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                height="24"
                id="hero-dots"
                patternUnits="userSpaceOnUse"
                width="24"
                x="0"
                y="0"
              >
                <circle className="fill-content-primary" cx="2" cy="2" r="1.5" />
              </pattern>
            </defs>
            <rect fill="url(#hero-dots)" height="100%" width="100%" />
          </svg>
        </div>

        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          {/* Badge */}
          <motion.div {...fadeUp(0)} className="mb-7 inline-flex">
            <span className="border-primary/30 bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold">
              <span className="bg-primary size-1.5 animate-pulse rounded-full" />
              Now in canary — v1.0
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.06)}
            className="text-content-primary text-5xl leading-[1.08] font-extrabold tracking-tight md:text-6xl lg:text-7xl"
          >
            Build beautiful{' '}
            <span className="from-primary to-info bg-linear-to-br bg-clip-text text-transparent">
              apps fast
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            {...fadeUp(0.12)}
            className="text-content-secondary mx-auto mt-6 max-w-2xl text-base leading-relaxed md:text-lg"
          >
            A modern, accessible component library for React — powered by Tailwind CSS v4 and React
            Aria. Production-ready from day one.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.18)}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              className="from-primary to-info shadow-primary/35 inline-flex items-center gap-2 rounded-xl bg-linear-to-br px-7 py-3 text-sm font-semibold text-white shadow-[0_8px_32px] transition-all hover:scale-105 hover:brightness-110 active:scale-95"
              href="/react/docs/getting-started"
            >
              Get Started
              <ArrowRight className="size-4" />
            </Link>
            <Link
              className="border-subtle text-content-primary bg-surface-muted inline-flex items-center gap-2 rounded-xl border px-7 py-3 text-sm font-semibold backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
              href="https://github.com/ideas2logic-lab/ideasui"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Github className="size-4" />
              Star on GitHub
            </Link>
          </motion.div>

          {/* Install snippet */}
          <motion.div {...fadeUp(0.24)}>
            <InstallSnippet />
          </motion.div>
        </div>
      </section>

      {/* ── Stats strip ─────────────────────────────────────────────── */}
      <section className="border-subtle bg-surface-muted border-y">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                transition={{ delay: i * 0.06 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="text-content-primary text-2xl font-bold">{stat.value}</div>
                <div className="text-content-secondary mt-1 text-xs font-semibold tracking-widest uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────────── */}
      <section className="border-subtle border-b py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <motion.p
              className="text-primary mb-3 text-xs font-bold tracking-widest uppercase"
              initial={{ opacity: 0, y: 8 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              Why IdeasUI
            </motion.p>
            <motion.h2
              className="text-content-primary text-3xl font-bold tracking-tight md:text-4xl"
              initial={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.05 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              Everything you need
            </motion.h2>
            <motion.p
              className="text-content-secondary mx-auto mt-4 max-w-lg"
              initial={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              Batteries-included, but never in your way.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                className="feature-card group relative cursor-default overflow-hidden rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                {/* Icon */}
                <div
                  className={`mb-5 flex size-11 items-center justify-center rounded-xl shadow-sm ${f.iconClass}`}
                >
                  {f.icon}
                </div>
                <h3 className="text-content-primary mb-2 font-semibold">{f.title}</h3>
                <p className="text-content-secondary text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Platform CTA ────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="border-primary/25 bg-primary/5 relative overflow-hidden rounded-3xl border p-10 text-center md:p-14"
            initial={{ opacity: 0, scale: 0.97 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,var(--color-primary)/0.15,transparent_70%)]" />
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(var(--color-border)/0.5_1px,transparent_1px),linear-gradient(90deg,var(--color-border)/0.5_1px,transparent_1px)] bg-[length:40px_40px] opacity-[0.04]" />
            <div className="border-primary/25 bg-primary/10 text-primary mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl border">
              <Code2 className="size-7" />
            </div>
            <h2 className="text-content-primary mb-3 text-3xl font-bold">Start building today</h2>
            <p className="text-content-secondary mx-auto mb-8 max-w-md leading-relaxed">
              Drop IdeasUI into any React project and get a complete design system in minutes. Zero
              configuration. Full TypeScript support.
            </p>
            <Link
              className="from-primary to-info shadow-primary/35 inline-flex items-center gap-2 rounded-xl bg-linear-to-br px-8 py-3 text-sm font-semibold text-white shadow-[0_8px_32px] transition-all hover:scale-105 active:scale-95"
              href="/react/docs/getting-started"
            >
              View Documentation
              <ArrowRight className="size-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <footer className="site-footer border-subtle bg-background mt-auto border-t py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-5 md:flex-row">
            <div className="flex items-center gap-2.5">
              <div className="from-primary to-info flex size-7 items-center justify-center rounded-lg bg-linear-to-br text-sm font-black text-white">
                I
              </div>
              <span className="text-content-primary font-bold">IdeasUI</span>
            </div>
            <p className="text-content-secondary text-xs">© 2026 IdeasUI. MIT License.</p>
            <div className="flex items-center gap-5">
              <Link
                className="text-content-secondary text-xs transition-colors hover:opacity-80"
                href="/react/docs"
              >
                Docs
              </Link>
              <Link
                className="text-content-secondary text-xs transition-colors hover:opacity-80"
                href="https://github.com/ideas2logic-lab/ideasui"
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
