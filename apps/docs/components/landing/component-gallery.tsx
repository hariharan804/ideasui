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

const SMOOTH_EASE = [0.16, 1, 0.3, 1] as const;

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 24, filter: 'blur(6px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.6, delay, ease: SMOOTH_EASE },
});

/** Component gallery section using semantic design tokens. */
export function ComponentGallery() {
  const [loadingState, setLoadingState] = useState(false);
  const [activeGroupTab, setActiveGroupTab] = useState<'all' | 'unread' | 'archived'>('all');

  return (
    <section className="relative overflow-hidden py-28">
      {/* Background Subtle Accent Glow Halo */}
      <div className="from-primary/5 via-secondary/5 pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <motion.div {...inView(0)} className="inline-flex">
            <span className="border-primary-subtle bg-primary-subtle text-primary inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-xs font-semibold tracking-wide">
              <Sparkles className="size-3.5" /> Component Architecture
            </span>
          </motion.div>

          <motion.h2
            className="text-content-primary mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
            {...inView(0.05)}
          >
            Engineered for precision &amp; total control
          </motion.h2>

          <motion.p
            className="text-content-secondary mx-auto mt-4 max-w-xl text-base leading-relaxed"
            {...inView(0.1)}
          >
            Explore real-time interactive previews of core component variants, semantic intents,
            icon integrations, and layout groups.
          </motion.p>
        </div>

        {/* 6-Card Showcase Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 — Variant System */}
          <motion.div
            className="bg-surface/80 group border-surface-muted hover:border-surface-strong relative overflow-hidden rounded-2xl border p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            {...inView(0.12)}
          >
            <div className="from-primary to-secondary absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="bg-primary-subtle text-primary flex size-8 items-center justify-center rounded-lg">
                  <Layers className="size-4" />
                </div>
                <h3 className="text-content-primary text-sm font-bold">Variant System</h3>
              </div>
              <span className="text-content-muted bg-surface-muted rounded-md px-2 py-0.5 font-mono text-[10px]">
                variant=&quot;...&quot;
              </span>
            </div>

            <div className="bg-surface-subtle flex flex-wrap gap-2.5 rounded-xl p-4.5">
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
            className="bg-surface/80 group border-surface-muted hover:border-surface-strong relative overflow-hidden rounded-2xl border p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            {...inView(0.16)}
          >
            <div className="from-secondary to-primary absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="bg-secondary-subtle text-secondary flex size-8 items-center justify-center rounded-lg">
                  <Palette className="size-4" />
                </div>
                <h3 className="text-content-primary text-sm font-bold">Intent Semantics</h3>
              </div>
              <span className="text-content-muted bg-surface-muted rounded-md px-2 py-0.5 font-mono text-[10px]">
                color=&quot;...&quot;
              </span>
            </div>

            <div className="bg-surface-subtle flex flex-wrap gap-2 rounded-xl p-4.5">
              <Button color="primary" size="sm">
                Primary
              </Button>
              <Button color="secondary" size="sm">
                Secondary
              </Button>
              <Button color="success" size="sm">
                Success
              </Button>
              <Button color="error" size="sm">
                Error
              </Button>
            </div>

            <p className="text-content-tertiary mt-4 text-xs leading-relaxed">
              Perceptually uniform OKLCH intent scales ensuring WCAG AA contrast compliance and
              predictable color hierarchy.
            </p>
          </motion.div>

          {/* Card 3 — Icons & Icon-Only */}
          <motion.div
            className="bg-surface/80 group border-surface-muted hover:border-surface-strong relative overflow-hidden rounded-2xl border p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            {...inView(0.2)}
          >
            <div className="from-primary to-success absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="bg-success-subtle text-success flex size-8 items-center justify-center rounded-lg">
                  <Zap className="size-4" />
                </div>
                <h3 className="text-content-primary text-sm font-bold">Icon Integration</h3>
              </div>
              <span className="text-content-muted bg-surface-muted rounded-md px-2 py-0.5 font-mono text-[10px]">
                startIcon / isIconOnly
              </span>
            </div>

            <div className="bg-surface-subtle flex flex-wrap items-center gap-2.5 rounded-xl p-4.5">
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
                <Plus className="size-4" />
              </Button>
              <Button
                isIconOnly
                aria-label="Bookmark item"
                color="secondary"
                size="sm"
                variant="ghost"
              >
                <Heart className="size-4" />
              </Button>
            </div>

            <p className="text-content-tertiary mt-4 text-xs leading-relaxed">
              First-class icon slot positioning with automatic spacing alignment and aria-label
              enforced icon-only buttons.
            </p>
          </motion.div>

          {/* Card 4 — Button Groups & Tabs */}
          <motion.div
            className="bg-surface/80 group border-surface-muted hover:border-surface-strong relative overflow-hidden rounded-2xl border p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            {...inView(0.24)}
          >
            <div className="from-secondary to-warning absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="bg-warning-subtle text-warning flex size-8 items-center justify-center rounded-lg">
                  <SlidersHorizontal className="size-4" />
                </div>
                <h3 className="text-content-primary text-sm font-bold">Button Groups</h3>
              </div>
              <span className="text-content-muted bg-surface-muted rounded-md px-2 py-0.5 font-mono text-[10px]">
                &lt;ButtonGroup /&gt;
              </span>
            </div>

            <div className="bg-surface-subtle flex flex-col items-start gap-3 rounded-xl p-4.5">
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
            className="bg-surface/80 group border-surface-muted hover:border-surface-strong relative overflow-hidden rounded-2xl border p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            {...inView(0.28)}
          >
            <div className="from-primary to-secondary absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="bg-primary-subtle text-primary flex size-8 items-center justify-center rounded-lg">
                  <Sparkles className="size-4" />
                </div>
                <h3 className="text-content-primary text-sm font-bold">Dynamic States</h3>
              </div>
              <span className="text-content-muted bg-surface-muted rounded-md px-2 py-0.5 font-mono text-[10px]">
                isLoading / isDisabled
              </span>
            </div>

            <div className="bg-surface-subtle flex flex-wrap items-center gap-2.5 rounded-xl p-4.5">
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
            className="bg-surface/80 group border-surface-muted hover:border-surface-strong relative overflow-hidden rounded-2xl border p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            {...inView(0.32)}
          >
            <div className="from-secondary to-primary absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="bg-secondary-subtle text-secondary flex size-8 items-center justify-center rounded-lg">
                  <ShieldCheck className="size-4" />
                </div>
                <h3 className="text-content-primary text-sm font-bold">Density &amp; Radii</h3>
              </div>
              <span className="text-content-muted bg-surface-muted rounded-md px-2 py-0.5 font-mono text-[10px]">
                size / radius
              </span>
            </div>

            <div className="bg-surface-subtle flex flex-wrap items-center gap-2.5 rounded-xl p-4.5">
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
