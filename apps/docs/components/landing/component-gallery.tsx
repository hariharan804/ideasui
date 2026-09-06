'use client';

import { motion } from 'framer-motion';
import {
  Layers,
  Palette,
  Zap,
  SlidersHorizontal,
  Sparkles,
  ShieldCheck,
  Send,
  ArrowRight,
  Heart,
  Plus,
} from 'lucide-react';
import { useState } from 'react';
import { Button, ButtonGroup } from '@ideasui/react';

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-20px' },
  transition: { duration: 0.45, delay, ease: SMOOTH_EASE },
});

const cardFadeIn = (index = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.35, delay: index * 0.05, ease: 'easeOut' as const },
});

/** Component gallery section using semantic design tokens. */
export function ComponentGallery() {
  const [loadingState, setLoadingState] = useState(false);
  const [activeGroupTab, setActiveGroupTab] = useState<'all' | 'unread' | 'archived'>('all');

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-28">
      {/* Background Subtle Accent Glow Halo */}
      <div className="from-primary/5 via-secondary/5 pointer-events-none absolute top-1/2 left-1/2 h-[350px] w-[500px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr to-transparent blur-3xl sm:h-[500px] sm:w-[800px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center sm:mb-16 lg:mb-20">
          <motion.div {...inView(0)} className="inline-flex">
            <span className="border-primary-subtle bg-primary-subtle text-primary inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-xs font-semibold tracking-wide">
              <Sparkles className="size-3.5" /> Component Architecture
            </span>
          </motion.div>

          <motion.h2
            className="text-content-primary xs:text-3xl mt-4 text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
            {...inView(0.05)}
          >
            Engineered for precision &amp; total control
          </motion.h2>

          <motion.p
            className="text-content-secondary mx-auto mt-3.5 max-w-xl px-2 text-sm leading-relaxed sm:mt-4 sm:text-base"
            {...inView(0.1)}
          >
            Explore real-time interactive previews of core component variants, semantic intents,
            icon integrations, and layout groups.
          </motion.p>
        </div>

        {/* 6-Card Showcase Grid */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 — Variant System */}
          <motion.div
            className="bg-surface/80 group border-surface-muted hover:border-primary/30 hover:shadow-primary/5 relative overflow-hidden rounded-2xl border p-6 backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            {...cardFadeIn(0)}
          >
            <div className="from-primary to-secondary absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

            <div className="mb-5 flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="bg-primary-subtle text-primary flex size-8 shrink-0 items-center justify-center rounded-lg">
                  <Layers className="size-4" />
                </div>
                <h3 className="text-content-primary shrink-0 text-sm font-bold whitespace-nowrap">
                  Variant System
                </h3>
              </div>
              <span className="text-content-muted bg-surface-muted shrink-0 rounded-md px-2 py-0.5 font-mono text-[10px] whitespace-nowrap">
                variant=&quot;...&quot;
              </span>
            </div>

            <div className="bg-surface-subtle flex flex-wrap items-center gap-2 rounded-xl p-4">
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
              Standardized variant recipes for high contrast, soft emphasis, and clean ghost actions
              across light &amp; dark modes.
            </p>
          </motion.div>

          {/* Card 2 — Intent Semantics */}
          <motion.div
            className="bg-surface/80 group border-surface-muted hover:border-primary/30 hover:shadow-primary/5 relative overflow-hidden rounded-2xl border p-6 backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            {...cardFadeIn(1)}
          >
            <div className="from-secondary to-primary absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

            <div className="mb-5 flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="bg-secondary-subtle text-secondary flex size-8 shrink-0 items-center justify-center rounded-lg">
                  <Palette className="size-4" />
                </div>
                <h3 className="text-content-primary shrink-0 text-sm font-bold whitespace-nowrap">
                  Intent Semantics
                </h3>
              </div>
              <span className="text-content-muted bg-surface-muted shrink-0 rounded-md px-2 py-0.5 font-mono text-[10px] whitespace-nowrap">
                color=&quot;...&quot;
              </span>
            </div>

            <div className="bg-surface-subtle flex flex-wrap items-center gap-1.5 rounded-xl p-4 sm:gap-2">
              <Button color="primary" size="sm">
                Primary
              </Button>
              <Button color="secondary" size="sm">
                Secondary
              </Button>
              <Button color="success" size="sm">
                Success
              </Button>
              <Button color="danger" size="sm">
                Danger
              </Button>
            </div>

            <p className="text-content-tertiary mt-4 text-xs leading-relaxed">
              Perceptually uniform OKLCH intent scales ensuring WCAG AA contrast compliance and
              predictable color hierarchy.
            </p>
          </motion.div>

          {/* Card 3 — Icons & Icon-Only */}
          <motion.div
            className="bg-surface/80 group border-surface-muted hover:border-primary/30 hover:shadow-primary/5 relative overflow-hidden rounded-2xl border p-6 backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            {...cardFadeIn(2)}
          >
            <div className="from-primary to-success absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

            <div className="mb-5 flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="bg-success-subtle text-success flex size-8 shrink-0 items-center justify-center rounded-lg">
                  <Zap className="size-4" />
                </div>
                <h3 className="text-content-primary shrink-0 text-sm font-bold whitespace-nowrap">
                  Icon Integration
                </h3>
              </div>
              <span className="text-content-muted bg-surface-muted shrink-0 rounded-md px-2 py-0.5 font-mono text-[10px] whitespace-nowrap">
                startIcon
              </span>
            </div>

            <div className="bg-surface-subtle flex flex-wrap items-center gap-1.5 rounded-xl p-3.5 sm:gap-2 sm:p-4">
              <Button color="primary" size="sm" startIcon={<Send className="size-3.5" />}>
                Send
              </Button>
              <Button
                color="secondary"
                endIcon={<ArrowRight className="size-3.5" />}
                size="sm"
                variant="outline"
              >
                Next
              </Button>
              <Button isIconOnly aria-label="Add item" color="primary" size="sm" variant="soft">
                <Plus className="size-3.5" />
              </Button>
              <Button
                isIconOnly
                aria-label="Bookmark item"
                color="secondary"
                size="sm"
                variant="ghost"
              >
                <Heart className="size-3.5" />
              </Button>
            </div>

            <p className="text-content-tertiary mt-4 text-xs leading-relaxed">
              First-class icon slot positioning with automatic spacing alignment and aria-label
              enforced icon-only buttons.
            </p>
          </motion.div>

          {/* Card 4 — Button Groups & Tabs */}
          <motion.div
            className="bg-surface/80 group border-surface-muted hover:border-primary/30 hover:shadow-primary/5 relative overflow-hidden rounded-2xl border p-6 backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            {...cardFadeIn(3)}
          >
            <div className="from-secondary to-warning absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

            <div className="mb-5 flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="bg-warning-subtle text-warning flex size-8 shrink-0 items-center justify-center rounded-lg">
                  <SlidersHorizontal className="size-4" />
                </div>
                <h3 className="text-content-primary shrink-0 text-sm font-bold whitespace-nowrap">
                  Button Groups
                </h3>
              </div>
              <span className="text-content-muted bg-surface-muted shrink-0 rounded-md px-2 py-0.5 font-mono text-[10px] whitespace-nowrap">
                &lt;ButtonGroup /&gt;
              </span>
            </div>

            <div className="bg-surface-subtle flex flex-col items-start gap-3 rounded-xl p-4">
              <ButtonGroup>
                {(['all', 'unread', 'archived'] as const).map((tab) => (
                  <Button
                    key={tab}
                    color={activeGroupTab === tab ? 'primary' : 'neutral'}
                    size="sm"
                    variant={activeGroupTab === tab ? 'solid' : 'outline'}
                    onClick={() => setActiveGroupTab(tab)}
                  >
                    <span className="capitalize">{tab}</span>
                  </Button>
                ))}
              </ButtonGroup>
            </div>

            <p className="text-content-tertiary mt-4 text-xs leading-relaxed">
              Segmented control toolbars with automatic corner radius masking, border merging, and
              keyboard arrow navigation.
            </p>
          </motion.div>

          {/* Card 5 — Interactive Loading States */}
          <motion.div
            className="bg-surface/80 group border-surface-muted hover:border-primary/30 hover:shadow-primary/5 relative overflow-hidden rounded-2xl border p-6 backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            {...cardFadeIn(4)}
          >
            <div className="from-primary to-secondary absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="mb-5 flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="bg-primary-subtle text-primary flex size-8 shrink-0 items-center justify-center rounded-lg">
                  <Sparkles className="size-4" />
                </div>
                <h3 className="text-content-primary shrink-0 text-sm font-bold whitespace-nowrap">
                  Dynamic States
                </h3>
              </div>
              <span className="text-content-muted bg-surface-muted shrink-0 rounded-md px-2 py-0.5 font-mono text-[10px] whitespace-nowrap">
                isLoading
              </span>
            </div>

            <div className="bg-surface-subtle flex flex-wrap items-center gap-2 rounded-xl p-4">
              <Button
                color="primary"
                isLoading={loadingState}
                size="sm"
                onClick={() => {
                  setLoadingState(true);
                  setTimeout(() => setLoadingState(false), 2000);
                }}
              >
                {loadingState ? 'Saving...' : 'Click to Load'}
              </Button>
              <Button isDisabled color="secondary" size="sm" variant="soft">
                Disabled
              </Button>
            </div>

            <p className="text-content-tertiary mt-4 text-xs leading-relaxed">
              Built-in spinner indicators with pointer interaction locking and zero layout shift
              during async loading transitions.
            </p>
          </motion.div>

          {/* Card 6 — Density & Radii */}
          <motion.div
            className="bg-surface/80 group border-surface-muted hover:border-primary/30 hover:shadow-primary/5 relative overflow-hidden rounded-2xl border p-6 backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            {...cardFadeIn(5)}
          >
            <div className="from-secondary to-primary absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="mb-5 flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="bg-secondary-subtle text-secondary flex size-8 shrink-0 items-center justify-center rounded-lg">
                  <ShieldCheck className="size-4" />
                </div>
                <h3 className="text-content-primary shrink-0 text-sm font-bold whitespace-nowrap">
                  Density &amp; Radii
                </h3>
              </div>
              <span className="text-content-muted bg-surface-muted shrink-0 rounded-md px-2 py-0.5 font-mono text-[10px] whitespace-nowrap">
                size / radius
              </span>
            </div>

            <div className="bg-surface-subtle flex flex-wrap items-center gap-2 rounded-xl p-4">
              <Button color="primary" radius="full" size="sm">
                Pill
              </Button>
              <Button color="secondary" radius="md" size="md" variant="outline">
                Medium
              </Button>
              <Button color="primary" radius="lg" size="lg" variant="soft">
                Large
              </Button>
            </div>

            <p className="text-content-tertiary mt-4 text-xs leading-relaxed">
              Comprehensive size density steps (`xs` to `xl`) and configurable corner radius system
              adapting to any design vision.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
