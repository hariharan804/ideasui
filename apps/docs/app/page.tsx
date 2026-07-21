'use client';

import type { MotionProps } from 'framer-motion';

import { motion } from 'framer-motion';
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
  Star,
  GitFork,
  MousePointer2,
  Box,
  Cpu,
  Globe,
} from 'lucide-react';
import { Github } from '@/components/docs-ui/icons';
import Link from 'next/link';
import { useState } from 'react';
import { Button, ButtonGroup } from '@ideasui/react';

/* ─── Animation helpers ─────────────────────────────────────────────── */
const fadeUp = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

const fadeIn = (delay = 0): MotionProps => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, delay, ease: 'easeOut' },
});

/* ─── Feature data ──────────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: <Cpu className="size-5" />,
    title: 'Perceptual OKLCH Engine',
    desc: 'Color tokens built with OKLCH for perceptually uniform lightness across dark and light surfaces.',
    gradient: 'from-violet-500/20 to-blue-500/20',
    iconColor: 'text-violet-600 dark:text-violet-400',
    border: 'hover:border-violet-500/30',
  },
  {
    icon: <Accessibility className="size-5" />,
    title: 'WCAG 2.1 AA Built-in',
    desc: 'React Aria primitives power automatic ARIA states, keyboard navigation, and focus management.',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    border: 'hover:border-emerald-500/30',
  },
  {
    icon: <Layers className="size-5" />,
    title: 'Tree-Shakeable & Modular',
    desc: 'Use the full @ideasui/react package or individual components to keep bundles lean.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-600 dark:text-blue-400',
    border: 'hover:border-blue-500/30',
  },
  {
    icon: <MousePointer2 className="size-5" />,
    title: 'Copy & Paste Ready',
    desc: 'Drop components into any React, Next.js, or Vite app with zero extra configuration.',
    gradient: 'from-orange-500/20 to-amber-500/20',
    iconColor: 'text-orange-600 dark:text-orange-400',
    border: 'hover:border-orange-500/30',
  },
  {
    icon: <Palette className="size-5" />,
    title: 'CSS-Driven Dark Mode',
    desc: 'Theme switching via CSS custom properties — no runtime context providers required.',
    gradient: 'from-pink-500/20 to-rose-500/20',
    iconColor: 'text-pink-600 dark:text-pink-400',
    border: 'hover:border-pink-500/30',
  },
  {
    icon: <Zap className="size-5" />,
    title: 'Zero Runtime Overhead',
    desc: 'Styles compile to pure CSS classes and recipes. Maximum 60fps rendering with no penalty.',
    gradient: 'from-yellow-500/20 to-orange-500/20',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
    border: 'hover:border-yellow-500/30',
  },
];

const STATS = [
  { label: 'UI Components', value: '50+', icon: <Box className="size-4" /> },
  { label: 'Open Source', value: '100%', icon: <Globe className="size-4" /> },
  { label: 'Tailwind CSS', value: 'v4', icon: <Sparkles className="size-4" /> },
  { label: 'Accessibility', value: 'AA', icon: <ShieldCheck className="size-4" /> },
];

const SOCIAL_PROOF = [
  { value: '2.4k', label: 'GitHub Stars', icon: <Star className="size-3.5" /> },
  { value: '180+', label: 'Forks', icon: <GitFork className="size-3.5" /> },
  { value: 'MIT', label: 'License', icon: <ShieldCheck className="size-3.5" /> },
];

const CODE_LINES = [
  { text: "import { Button } from '@ideasui/react';", color: 'text-slate-400' },
  { text: '', color: '' },
  { text: 'export default function App() {', color: 'text-slate-300' },
  { text: '  return (', color: 'text-slate-400' },
  { text: '    <div className="flex gap-3">', color: 'text-slate-400' },
  { text: '      <Button color="primary">', color: 'text-blue-400' },
  { text: '        Get Started', color: 'text-emerald-400' },
  { text: '      </Button>', color: 'text-blue-400' },
  { text: '      <Button variant="outline">', color: 'text-purple-400' },
  { text: '        Learn More', color: 'text-emerald-400' },
  { text: '      </Button>', color: 'text-purple-400' },
  { text: '    </div>', color: 'text-slate-400' },
  { text: '  );', color: 'text-slate-400' },
  { text: '}', color: 'text-slate-300' },
];

/* ─── Install Snippet ───────────────────────────────────────────────── */
function InstallSnippet() {
  const [copied, setCopied] = useState(false);
  const cmd = 'pnpm add @ideasui/react @ideasui/theme';

  function copy() {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="group mx-auto mt-7 flex max-w-md items-center justify-between gap-3 rounded-xl border border-black/10 bg-black/5 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:border-black/20 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20">
      <div className="flex min-w-0 items-center gap-2.5">
        <Terminal className="text-content-tertiary size-4 shrink-0" />
        <code className="text-content-secondary truncate font-mono text-sm">{cmd}</code>
      </div>
      <button
        aria-label="Copy install command"
        className="text-content-muted hover:text-content-primary shrink-0 rounded-lg p-1.5 transition-all duration-200 hover:bg-black/10 dark:hover:bg-white/10"
        onClick={copy}
      >
        {copied ? (
          <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            <Check className="size-3.5" /> Copied!
          </span>
        ) : (
          <Copy className="size-3.5" />
        )}
      </button>
    </div>
  );
}

/* ─── Hero Code Preview ─────────────────────────────────────────────── */
function HeroCodePreview() {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

  return (
    <div className="relative mx-auto mt-16 max-w-3xl">
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/10 to-blue-500/20 blur-xl" />
      <div className="bg-surface relative overflow-hidden rounded-2xl border border-black/10 shadow-2xl shadow-black/10 dark:border-white/10 dark:bg-[#0d1117] dark:shadow-black/50">
        {/* Window chrome */}
        <div className="bg-surface-subtle flex items-center justify-between border-b border-black/8 px-5 py-3.5 dark:border-white/8 dark:bg-white/3">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-red-500/70" />
            <div className="size-3 rounded-full bg-yellow-500/70" />
            <div className="size-3 rounded-full bg-green-500/70" />
            <span className="text-content-muted ml-3 font-mono text-xs">App.tsx — IdeasUI</span>
          </div>
          <div className="flex items-center gap-0.5 rounded-lg bg-black/5 p-1 dark:bg-white/5">
            <button
              className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                activeTab === 'preview'
                  ? 'text-content-primary bg-white shadow-sm dark:bg-white/12 dark:text-white'
                  : 'text-content-muted hover:text-content-secondary'
              }`}
              onClick={() => setActiveTab('preview')}
            >
              Preview
            </button>
            <button
              className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                activeTab === 'code'
                  ? 'text-content-primary bg-white shadow-sm dark:bg-white/12 dark:text-white'
                  : 'text-content-muted hover:text-content-secondary'
              }`}
              onClick={() => setActiveTab('code')}
            >
              Code
            </button>
          </div>
        </div>

        {activeTab === 'preview' ? (
          <div className="flex min-h-52 flex-col items-center justify-center gap-6 p-10">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button color="primary" size="md">
                Primary
              </Button>
              <Button size="md" variant="outline">
                Outline
              </Button>
              <Button color="secondary" size="md">
                Secondary
              </Button>
              <Button color="error" size="md" variant="soft">
                Destructive
              </Button>
            </div>
            <ButtonGroup>
              <Button color="primary">Option A</Button>
              <Button variant="outline">Option B</Button>
              <Button variant="outline">Option C</Button>
            </ButtonGroup>
            <p className="text-content-muted text-xs">{'↑ Live components — click to interact'}</p>
          </div>
        ) : (
          <div className="min-h-52 bg-[#0d1117] p-5">
            <pre className="text-left font-mono text-sm leading-6">
              {CODE_LINES.map((line) => (
                <div key={`code-line-${CODE_LINES.indexOf(line)}-${line.color}`}>
                  <span className="mr-4 text-slate-700 select-none">
                    {String(CODE_LINES.indexOf(line) + 1).padStart(2, ' ')}
                  </span>
                  <span className={line.color}>{line.text}</span>
                </div>
              ))}
            </pre>
          </div>
        )}

        <div className="bg-surface-subtle flex items-center justify-between border-t border-black/6 px-5 py-2 dark:border-white/6 dark:bg-white/2">
          <span className="text-content-muted text-[10px]">
            {'TypeScript · React · Tailwind v4'}
          </span>
          <span className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-500">
            <span className="inline-block size-1.5 rounded-full bg-emerald-500" />
            {'Ready'}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Page Component ────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <main className="bg-background text-content-primary flex min-h-screen flex-col overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
        {/* Grid dot pattern */}
        <div
          className="pointer-events-none absolute inset-0 -z-20"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-600/10 via-violet-600/6 to-transparent blur-3xl dark:from-blue-600/12 dark:via-violet-600/8" />
          <div className="absolute top-1/4 right-0 size-80 rounded-full bg-violet-500/6 blur-3xl dark:bg-violet-500/8" />
          <div className="absolute top-1/3 left-0 size-80 rounded-full bg-blue-500/6 blur-3xl dark:bg-blue-500/8" />
        </div>

        <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
          {/* Social proof chips */}
          <motion.div
            {...fadeIn(0)}
            className="mb-8 flex flex-wrap items-center justify-center gap-2"
          >
            {SOCIAL_PROOF.map((s) => (
              <span
                key={s.label}
                className="text-content-secondary inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs font-medium backdrop-blur-sm dark:border-white/10 dark:bg-white/5"
              >
                <span className="text-content-muted">{s.icon}</span>
                <span className="text-content-primary font-semibold">{s.value}</span>
                {s.label}
              </span>
            ))}
          </motion.div>

          {/* Badge */}
          <motion.div {...fadeUp(0.04)} className="mb-6 inline-flex">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/8 px-4 py-1.5 text-xs font-semibold text-blue-600 backdrop-blur-md dark:text-blue-400">
              <span className="size-1.5 animate-pulse rounded-full bg-blue-500" />
              {'IdeasUI v1 · Tailwind CSS v4 · OKLCH Color Engine'}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.08)}
            className="text-content-primary text-5xl leading-[1.06] font-extrabold tracking-tight md:text-6xl lg:text-[72px]"
          >
            Build stunning UIs
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-violet-500 to-blue-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-violet-400 dark:to-blue-400">
              without the friction
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            {...fadeUp(0.13)}
            className="text-content-secondary mx-auto mt-5 max-w-2xl text-base leading-relaxed md:text-lg"
          >
            Open-source React component library powered by Tailwind CSS v4 and a perceptual OKLCH
            color engine. Accessible, customizable, ready to ship.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.18)}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              className="group inline-flex items-center gap-2.5 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-200 hover:bg-blue-500 hover:shadow-blue-500/40 active:scale-95"
              href="/react/docs/start"
            >
              Get Started
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link
              className="text-content-primary inline-flex items-center gap-2.5 rounded-xl border border-black/12 bg-black/5 px-6 py-3 text-sm font-semibold backdrop-blur-sm transition-all duration-200 hover:border-black/20 hover:bg-black/10 active:scale-95 dark:border-white/12 dark:bg-white/6 dark:hover:border-white/20 dark:hover:bg-white/10"
              href="https://github.com/ideas2logic-lab/ideasui"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Github className="size-4" />
              Star on GitHub
            </Link>
          </motion.div>

          <motion.div {...fadeUp(0.22)}>
            <InstallSnippet />
          </motion.div>

          <motion.div {...fadeUp(0.28)}>
            <HeroCodePreview />
          </motion.div>
        </div>
      </section>

      {/* ── Stats Strip ──────────────────────────────────────────────── */}
      <section className="bg-surface-subtle border-y border-black/8 py-10 dark:border-white/6 dark:bg-white/2">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-0 divide-x divide-black/8 md:grid-cols-4 dark:divide-white/6">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="flex flex-col items-center gap-1.5 px-6 py-2 text-center"
                initial={{ opacity: 0, y: 10 }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <span className="text-content-muted flex items-center gap-1.5">{stat.icon}</span>
                <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent md:text-3xl dark:from-white dark:to-slate-300">
                  {stat.value}
                </span>
                <span className="text-content-muted text-[11px] font-semibold tracking-widest uppercase">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature Grid ─────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <motion.p
              className="mb-3 text-xs font-bold tracking-widest text-blue-600 uppercase dark:text-blue-500"
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
              Everything you need to ship faster
            </motion.h2>
            <motion.p
              className="text-content-secondary mx-auto mt-4 max-w-md text-sm leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              Purpose-built primitives that respect the full design-engineering spectrum.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                className={`group bg-surface hover:bg-surface-subtle relative cursor-default overflow-hidden rounded-2xl border border-black/8 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-black/15 hover:shadow-lg dark:border-white/8 dark:bg-white/3 dark:hover:border-white/15 dark:hover:bg-white/5 ${f.border}`}
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.06 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div
                  className={`pointer-events-none absolute -top-8 -right-8 size-32 rounded-full bg-gradient-to-br ${f.gradient} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
                />
                <div
                  className={`bg-surface-subtle mb-5 flex size-10 items-center justify-center rounded-xl border border-black/10 transition-transform duration-300 group-hover:scale-110 dark:border-white/10 dark:bg-white/6 ${f.iconColor}`}
                >
                  {f.icon}
                </div>
                <h3 className="text-content-primary mb-2 text-sm font-semibold">{f.title}</h3>
                <p className="text-content-tertiary text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bento Highlight ──────────────────────────────────────────── */}
      <section className="border-t border-black/8 py-24 dark:border-white/6">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-5">
            <motion.div
              className="group bg-surface relative col-span-3 overflow-hidden rounded-2xl border border-black/8 p-10 shadow-sm dark:border-white/8 dark:bg-white/3"
              initial={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <div className="pointer-events-none absolute -top-20 -left-20 size-64 rounded-full bg-blue-600/8 blur-3xl dark:bg-blue-600/10" />
              <div className="relative">
                <div className="mb-2 text-xs font-bold tracking-widest text-blue-600 uppercase dark:text-blue-500">
                  Semantic design
                </div>
                <h3 className="text-content-primary mb-3 text-2xl font-bold">
                  Intent-first component API
                </h3>
                <p className="text-content-secondary max-w-md text-sm leading-relaxed">
                  Variants use semantic names like{' '}
                  <code className="rounded bg-blue-500/10 px-1.5 py-0.5 font-mono text-[11px] text-blue-700 dark:bg-white/8 dark:text-blue-300">
                    primary
                  </code>
                  ,{' '}
                  <code className="rounded bg-violet-500/10 px-1.5 py-0.5 font-mono text-[11px] text-violet-700 dark:bg-white/8 dark:text-violet-300">
                    secondary
                  </code>
                  ,{' '}
                  <code className="rounded bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[11px] text-emerald-700 dark:bg-white/8 dark:text-emerald-300">
                    outline
                  </code>{' '}
                  — not visual descriptions. Your code stays readable at scale.
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  <Button color="primary" size="sm">
                    Primary
                  </Button>
                  <Button color="secondary" size="sm">
                    Secondary
                  </Button>
                  <Button size="sm" variant="outline">
                    Outline
                  </Button>
                  <Button size="sm" variant="ghost">
                    Ghost
                  </Button>
                </div>
              </div>
            </motion.div>

            <div className="col-span-2 flex flex-col gap-4">
              <motion.div
                className="bg-surface relative overflow-hidden rounded-2xl border border-black/8 p-7 shadow-sm dark:border-white/8 dark:bg-white/3"
                initial={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <div className="pointer-events-none absolute -top-10 -right-10 size-40 rounded-full bg-emerald-500/8 blur-3xl dark:bg-emerald-500/10" />
                <ShieldCheck className="mb-4 size-7 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-content-primary mb-1.5 text-sm font-semibold">
                  Accessibility First
                </h3>
                <p className="text-content-tertiary text-sm leading-relaxed">
                  Every component ships with correct ARIA roles, keyboard patterns, and focus
                  indicators out of the box.
                </p>
              </motion.div>

              <motion.div
                className="bg-surface relative overflow-hidden rounded-2xl border border-black/8 p-7 shadow-sm dark:border-white/8 dark:bg-white/3"
                initial={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <div className="pointer-events-none absolute -top-10 -right-10 size-40 rounded-full bg-violet-500/8 blur-3xl dark:bg-violet-500/10" />
                <Zap className="mb-4 size-7 text-violet-600 dark:text-violet-400" />
                <h3 className="text-content-primary mb-1.5 text-sm font-semibold">
                  Zero Runtime Cost
                </h3>
                <p className="text-content-tertiary text-sm leading-relaxed">
                  Pure CSS recipe output. No JS theming overhead, no context re-renders, just fast
                  60fps UIs.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────── */}
      <section className="border-t border-black/8 py-24 dark:border-white/6">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div
            className="bg-surface-subtle relative overflow-hidden rounded-3xl border border-black/10 p-12 text-center shadow-sm md:p-20 dark:border-white/10 dark:bg-white/3"
            initial={{ opacity: 0, scale: 0.97 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-blue-600/8 via-violet-600/6 to-transparent dark:from-blue-600/15 dark:via-violet-600/10" />
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(99,102,241,0.1),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_50%_0%,rgba(99,102,241,0.2),transparent_70%)]" />
            <div
              className="pointer-events-none absolute inset-0 -z-20"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.03) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            <motion.div
              animate={{ y: [0, -4, 0] }}
              className="mb-5 inline-flex size-14 items-center justify-center rounded-2xl border border-black/10 bg-white shadow-md dark:border-white/15 dark:bg-white/8 dark:shadow-none"
              transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
            >
              <Sparkles className="size-7 text-blue-600 dark:text-blue-300" />
            </motion.div>

            <h2 className="text-content-primary mb-4 text-3xl font-extrabold tracking-tight md:text-4xl">
              Start building today
            </h2>
            <p className="text-content-secondary mx-auto mb-9 max-w-md text-sm leading-relaxed">
              Drop IdeasUI into any React project and ship polished, accessible interfaces in
              minutes, not weeks.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                className="group inline-flex items-center gap-2.5 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-200 hover:bg-blue-500 hover:shadow-blue-500/40 active:scale-95"
                href="/react/docs/start"
              >
                View Documentation
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <Link
                className="text-content-primary inline-flex items-center gap-2.5 rounded-xl border border-black/12 bg-white px-7 py-3.5 text-sm font-semibold shadow-sm transition-all duration-200 hover:border-black/20 hover:bg-black/5 active:scale-95 dark:border-white/15 dark:bg-white/6 dark:hover:border-white/25 dark:hover:bg-white/10"
                href="https://github.com/ideas2logic-lab/ideasui"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Github className="size-4" />
                GitHub
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="mt-auto border-t border-black/8 py-10 dark:border-white/6">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2.5">
              <div className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 text-sm font-black text-white shadow-sm">
                I
              </div>
              <span className="text-content-primary font-semibold">IdeasUI</span>
              <span className="text-content-muted text-xs">
                © {new Date().getFullYear()} · MIT License
              </span>
            </div>
            <div className="flex items-center gap-6">
              {[
                { label: 'Docs', href: '/react/docs/start' },
                { label: 'Components', href: '/react/docs/components/button' },
                { label: 'Changelog', href: '/react/docs/changelog' },
                { label: 'GitHub', href: 'https://github.com/ideas2logic-lab/ideasui' },
              ].map((l) => (
                <Link
                  key={l.label}
                  className="text-content-muted hover:text-content-primary text-xs font-medium transition-colors"
                  href={l.href}
                  rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
