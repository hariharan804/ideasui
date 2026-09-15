'use client';

import { motion } from 'framer-motion';
import { Accessibility, Zap, Cpu, MousePointer2, Sparkles, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@ideasui/react';
import { cn } from '@ideasui/utils';

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-20px' },
  transition: { duration: 0.45, delay, ease: SMOOTH_EASE },
});

const cardFadeIn = (index = 0) => ({
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, delay: index * 0.08, ease: 'easeOut' as const },
});

type SwatchKey = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger';

const OKLCH_METRICS: Record<
  SwatchKey,
  { name: string; oklch: string; contrast: string; ratio: string }
> = {
  primary: { name: 'Primary', oklch: 'oklch(0.58 0.22 260)', contrast: '4.8:1 AA', ratio: 'Pass' },
  secondary: {
    name: 'Secondary',
    oklch: 'oklch(0.62 0.18 300)',
    contrast: '5.2:1 AA',
    ratio: 'Pass',
  },
  tertiary: {
    name: 'Tertiary',
    oklch: 'oklch(0.65 0.15 180)',
    contrast: '4.9:1 AA',
    ratio: 'Pass',
  },
  success: { name: 'Success', oklch: 'oklch(0.62 0.19 145)', contrast: '5.1:1 AA', ratio: 'Pass' },
  warning: { name: 'Warning', oklch: 'oklch(0.75 0.18 75)', contrast: '4.9:1 AA', ratio: 'Pass' },
  danger: { name: 'Danger', oklch: 'oklch(0.58 0.22 25)', contrast: '5.3:1 AA', ratio: 'Pass' },
};

type FocusKey = 'Tab' | 'Enter' | 'Space';

function getFocusKeyActionLabel(key: FocusKey): string {
  if (key === 'Tab') {
    return '(Focus)';
  }
  if (key === 'Enter') {
    return '(Trigger)';
  }

  return '(Press)';
}

function getFocusButtonLabel(key: FocusKey): string {
  if (key === 'Enter') {
    return 'Triggered!';
  }
  if (key === 'Space') {
    return 'Pressed!';
  }

  return 'Focused Target';
}

const DX_BADGES = ['Type-safe', 'Tree-shakeable', 'Server Component ready'] as const;

interface FeatureChecklistProps {
  readonly features: readonly string[];
  readonly className?: string;
  readonly itemClassName?: string;
}

function FeatureChecklist({ features, className, itemClassName }: Readonly<FeatureChecklistProps>) {
  return (
    <div className={className}>
      {features.map((feat) => (
        <div
          key={feat}
          className={cn(
            'text-content-secondary flex items-center gap-2 text-xs font-medium',
            itemClassName,
          )}
        >
          <Check className="text-success size-3.5 shrink-0" />
          <span>{feat}</span>
        </div>
      ))}
    </div>
  );
}

interface DxBadgesProps {
  readonly className?: string;
}

function DxBadges({ className }: Readonly<DxBadgesProps>) {
  return (
    <div className={className}>
      {DX_BADGES.map((badge) => (
        <span
          key={badge}
          className="bg-surface-muted/90 text-content-primary inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium shadow-2xs"
        >
          <Check className="text-success size-3 shrink-0" />
          {badge}
        </span>
      ))}
    </div>
  );
}

/** Bento grid showcasing technical foundation cleanly with restrained background accents. */
export function FeaturesSection() {
  /* Interactive Card States */
  const [activeKey, setActiveKey] = useState<FocusKey>('Tab');
  const [isFocused, setIsFocused] = useState(true);
  const [activeSwatch, setActiveSwatch] = useState<SwatchKey>('primary');
  const [activeFramework, setActiveFramework] = useState<string>('Next.js 16');
  const [activeDxTab, setActiveDxTab] = useState<'compound' | 'variants' | 'ref'>('compound');

  return (
    <section className="relative isolate overflow-hidden py-16 sm:py-24 lg:py-28">
      {/* Landing Page Dotted Hexagon */}

      {/* Restrained Ambient Glow */}
      <div className="from-secondary/5 via-primary/5 pointer-events-none absolute top-1/3 right-1/4 h-80 w-80 max-w-full rounded-full bg-gradient-to-br to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center sm:mb-16 lg:mb-20">
          <motion.div {...inView(0)} className="inline-flex">
            <span className="bg-secondary-subtle/80 text-secondary inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide shadow-2xs">
              <Sparkles className="size-3.5" /> Technical Excellence
            </span>
          </motion.div>

          <motion.h2
            className="text-content-primary xs:text-3xl mt-4 text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
            {...inView(0.05)}
          >
            Built for modern frontend standards
          </motion.h2>

          <motion.p
            className="text-content-secondary mx-auto mt-3.5 max-w-xl px-2 text-sm leading-relaxed sm:mt-4 sm:text-base"
            {...inView(0.1)}
          >
            Every component is engineered with WCAG 2.1 AA accessibility, OKLCH color spaces,
            zero-config SSR support, and strict TypeScript types.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {/* ── CARD 1: Accessibility First (Spans 2 cols) ────────────────────── */}
          <motion.div
            className="bg-surface-subtle/60 group shadow-surface/5 hover:bg-surface-subtle/90 relative overflow-hidden rounded-3xl p-6 shadow-lg backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-8 md:col-span-2 lg:col-span-2"
            {...cardFadeIn(0)}
          >
            <div className="from-primary via-secondary to-primary absolute top-0 right-0 left-0 h-1 bg-linear-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="bg-primary-subtle text-primary flex size-12 shrink-0 items-center justify-center rounded-2xl shadow-2xs transition-transform duration-300 group-hover:scale-110">
                  <Accessibility className="size-6" />
                </div>
                <div>
                  <h3 className="text-content-primary text-lg font-bold sm:text-xl">
                    Accessible by Default
                  </h3>
                  <p className="text-content-tertiary text-xs sm:text-sm">
                    React Aria Primitives &amp; Semantic HTML Base
                  </p>
                </div>
              </div>
              <span className="text-primary bg-primary-subtle/80 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-xs font-semibold shadow-2xs">
                <Check className="size-4" /> Built for WCAG 2.1 AA
              </span>
            </div>

            {/* Visual Feature Checklist */}
            <FeatureChecklist
              className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4"
              features={[
                'Keyboard navigation',
                'ARIA 1.2 support',
                'Focus management',
                'Screen reader support',
              ]}
              itemClassName="bg-surface-subtle/80 text-content-primary rounded-xl px-3 py-2 text-xs font-semibold shadow-2xs"
            />

            {/* Interactive Keyboard Accessibility Tester */}
            <div className="mt-6 flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {(['Tab', 'Enter', 'Space'] as const).map((k) => (
                  <button
                    key={k}
                    className={cn(
                      'flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-xs transition-all duration-150 active:scale-95',
                      activeKey === k
                        ? 'bg-primary text-on-primary font-semibold shadow-md'
                        : 'bg-surface/80 text-content-secondary hover:bg-surface hover:text-content-primary shadow-2xs',
                    )}
                    type="button"
                    onClick={() => {
                      setActiveKey(k);
                      setIsFocused(true);
                    }}
                  >
                    <kbd className="font-mono text-[11px] uppercase">{k}</kbd>
                    <span className="text-[11px] opacity-80">{getFocusKeyActionLabel(k)}</span>
                  </button>
                ))}
              </div>

              {/* Demo Component with Live ARIA Focus State */}
              <div className="bg-background/80 flex items-center justify-between gap-3 rounded-xl p-3.5 shadow-inner">
                <div className="flex items-center gap-3">
                  <Button
                    className={cn(
                      'transition-all duration-200',
                      isFocused &&
                        activeKey === 'Tab' &&
                        'ring-primary ring-offset-background ring-2 ring-offset-2',
                    )}
                    color="primary"
                    size="sm"
                    variant={activeKey === 'Space' ? 'soft' : 'solid'}
                  >
                    {getFocusButtonLabel(activeKey)}
                  </Button>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[11px]">
                  <span className="text-content-muted">aria-focused=</span>
                  <span className="text-success font-semibold">
                    &quot;{isFocused ? 'true' : 'false'}&quot;
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── CARD 2: Perceptual OKLCH Color Space ──────────────────────────── */}
          <motion.div
            className="bg-surface-subtle/60 group shadow-surface/5 hover:bg-surface-subtle/90 relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 shadow-lg backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-8 md:col-span-1 lg:col-span-1"
            {...cardFadeIn(1)}
          >
            <div className="from-secondary to-primary absolute top-0 right-0 left-0 h-1 bg-linear-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div>
              <div className="flex items-center justify-between">
                <div className="bg-secondary-subtle text-secondary flex size-11 items-center justify-center rounded-2xl shadow-2xs transition-transform duration-300 group-hover:scale-110">
                  <Cpu className="size-5" />
                </div>
                <span className="text-content-muted bg-surface-muted/80 rounded-full px-3 py-1 font-mono text-[10px] font-medium shadow-2xs">
                  OKLCH Engine
                </span>
              </div>

              <h3 className="text-content-primary mt-5 text-lg font-bold">
                Perceptual Color Engine
              </h3>

              <FeatureChecklist
                className="mt-4 flex flex-col gap-2"
                features={[
                  'Perceptually uniform lightness',
                  'Dark & light mode auto-mapping',
                  'Consistent contrast ratios',
                ]}
              />
            </div>

            {/* Interactive OKLCH Color Swatch Inspector */}
            <div className="mt-6">
              <div className="bg-surface-muted/60 flex items-center justify-between gap-1.5 rounded-2xl p-2">
                {(
                  ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'] as const
                ).map((swatch) => (
                  <button
                    key={swatch}
                    aria-label={`Inspect ${swatch} color token`}
                    className={cn(
                      'size-7.5 rounded-xl transition-all duration-200 active:scale-90',
                      swatch === 'primary' && 'bg-primary',
                      swatch === 'secondary' && 'bg-secondary',
                      swatch === 'tertiary' && 'bg-tertiary',
                      swatch === 'success' && 'bg-success',
                      swatch === 'warning' && 'bg-warning',
                      swatch === 'danger' && 'bg-danger',
                      activeSwatch === swatch
                        ? 'ring-primary scale-110 shadow-md ring-2 ring-offset-2'
                        : 'opacity-85 hover:opacity-100',
                    )}
                    type="button"
                    onClick={() => setActiveSwatch(swatch)}
                  />
                ))}
              </div>

              {/* Swatch Inspector Output */}
              <div className="bg-background/80 mt-3 flex items-center justify-between rounded-xl px-3 py-2 text-[11px] shadow-2xs">
                <span className="text-content-secondary font-semibold capitalize">
                  {OKLCH_METRICS[activeSwatch].name}
                </span>
                <span className="text-content-muted font-mono text-[10px]">
                  {OKLCH_METRICS[activeSwatch].oklch}
                </span>
                <span className="text-success font-semibold">
                  {OKLCH_METRICS[activeSwatch].contrast}
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── CARD 3: Zero Config SSR Frameworks ────────────────────────────── */}
          <motion.div
            className="bg-surface-subtle/60 group shadow-surface/5 hover:bg-surface-subtle/90 relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 shadow-lg backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-8 md:col-span-1 lg:col-span-1"
            {...cardFadeIn(2)}
          >
            <div className="from-success to-primary absolute top-0 right-0 left-0 h-1 bg-linear-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div>
              <div className="flex items-center justify-between">
                <div className="bg-success-subtle text-success flex size-11 items-center justify-center rounded-2xl shadow-2xs transition-transform duration-300 group-hover:scale-110">
                  <Zap className="size-5" />
                </div>
                <span className="text-content-muted bg-surface-muted/80 rounded-full px-3 py-1 font-mono text-[10px] font-medium shadow-2xs">
                  Zero Config
                </span>
              </div>

              <h3 className="text-content-primary mt-5 text-lg font-bold">Zero Configuration</h3>

              {/* SSR Feature Highlights Checklist */}
              <FeatureChecklist
                className="mt-4 flex flex-col gap-2.5"
                features={[
                  'Zero Context Provider wrapping',
                  'React Server Component (RSC) native',
                  'Pure CSS recipe compile target',
                ]}
              />
            </div>

            {/* Interactive Framework Switcher */}
            <div className="mt-6 flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-1.5">
                {['Next.js 16', 'React 19', 'Vite', 'Remix'].map((fw) => (
                  <button
                    key={fw}
                    className={cn(
                      'rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all duration-150 active:scale-95',
                      activeFramework === fw
                        ? 'bg-primary text-on-primary font-semibold shadow-2xs'
                        : 'bg-surface-muted/80 text-content-secondary hover:text-content-primary',
                    )}
                    type="button"
                    onClick={() => setActiveFramework(fw)}
                  >
                    {fw}
                  </button>
                ))}
              </div>

              <div className="bg-background/80 flex items-center gap-2 rounded-xl px-3 py-2 text-[11px] shadow-2xs">
                <Check className="text-success size-3.5 shrink-0" />
                <span className="text-content-secondary font-medium">
                  {activeFramework} Ready · Zero Hydration Mismatch
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── CARD 4: DX Driven Architecture (Spans 2 cols) ───────────────────── */}
          <motion.div
            className="bg-surface-subtle/60 group shadow-surface/5 hover:bg-surface-subtle/90 relative overflow-hidden rounded-3xl p-6 shadow-lg backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-8 md:col-span-2 lg:col-span-2"
            {...cardFadeIn(3)}
          >
            <div className="from-secondary via-on-primary-subtle to-primary absolute top-0 right-0 left-0 h-1 bg-linear-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="flex flex-wrap items-start justify-between gap-3 sm:items-center sm:gap-4">
              <div className="flex items-center gap-3.5">
                <div className="bg-warning-subtle text-warning flex size-12 shrink-0 items-center justify-center rounded-2xl shadow-2xs transition-transform duration-300 group-hover:scale-110">
                  <MousePointer2 className="size-6" />
                </div>
                <div>
                  <h3 className="text-content-primary text-lg font-bold sm:text-xl">
                    Developer Experience First
                  </h3>
                  <p className="text-primary mt-0.5 font-mono text-xs font-semibold">
                    Import → Compose → Ship
                  </p>
                </div>
              </div>

              <DxBadges className="flex items-center gap-2 max-sm:hidden" />
            </div>

            {/* Formatted IDE Code Inspector Block */}
            <div className="bg-surface/90 shadow-surface/10 mt-6 overflow-hidden rounded-2xl shadow-lg backdrop-blur-xl">
              {/* Window Header Chrome */}
              <div className="bg-surface-muted/70 flex items-center justify-between gap-2 px-4 py-3 sm:px-5">
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className="flex shrink-0 items-center gap-1.5">
                    <div className="bg-danger size-2.5 rounded-full" />
                    <div className="bg-warning size-2.5 rounded-full" />
                    <div className="bg-success size-2.5 rounded-full" />
                  </div>

                  {/* File Selector Tabs with Framer Motion Sliding Pill */}
                  <div className="bg-surface-subtle/80 relative ml-2 flex items-center gap-0.5 rounded-lg p-1">
                    {[
                      { id: 'compound', file: 'button-slotted.tsx' },
                      { id: 'variants', file: 'button-recipe.ts' },
                      { id: 'ref', file: 'forward-ref.tsx' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        className={cn(
                          'relative z-10 flex h-6.5 items-center rounded-md px-2.5 font-mono text-[11px] whitespace-nowrap transition-colors duration-150',
                          activeDxTab === tab.id
                            ? 'text-primary font-semibold'
                            : 'text-content-muted hover:text-content-primary',
                        )}
                        type="button"
                        onClick={() => setActiveDxTab(tab.id as typeof activeDxTab)}
                      >
                        {activeDxTab === tab.id && (
                          <motion.div
                            className="bg-background absolute inset-0 rounded-md shadow-2xs"
                            layoutId="dxTabIndicator"
                            transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                          />
                        )}
                        <span className="relative z-10">{tab.file}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-success flex items-center gap-1 font-mono text-[10px] font-semibold sm:text-[11px]">
                    <Check className="size-3.5" /> 100% Typed
                  </span>
                </div>
              </div>

              {/* Fixed Height Code Area */}
              <div className="bg-background/95 text-content-primary relative h-[210px] overflow-auto p-4 font-mono text-xs leading-relaxed sm:h-[220px] sm:p-5">
                {activeDxTab === 'compound' && (
                  <pre className="whitespace-pre">
                    <span className="text-secondary">import</span> &#123; Button &#125;{' '}
                    <span className="text-secondary">from</span>{' '}
                    <span className="text-success">&apos;@ideasui/react&apos;</span>;{'\n'}
                    <span className="text-secondary">import</span> &#123; Send &#125;{' '}
                    <span className="text-secondary">from</span>{' '}
                    <span className="text-success">&apos;lucide-react&apos;</span>;{'\n\n'}
                    <span className="text-secondary">export default function</span>{' '}
                    <span className="text-primary">App</span>() &#123;{'\n'}
                    {'  '}
                    <span className="text-secondary">return</span> ({'\n'}
                    {'    '}
                    <span className="text-primary">&lt;Button</span>{' '}
                    <span className="text-secondary">color=</span>
                    <span className="text-success">&quot;primary&quot;</span>{' '}
                    <span className="text-secondary">variant=</span>
                    <span className="text-success">&quot;soft&quot;</span>
                    <span className="text-primary">&gt;</span>
                    {'\n'}
                    {'      '}
                    <span className="text-primary">&lt;Button.Icon</span>{' '}
                    <span className="text-secondary">icon=</span>
                    <span className="text-success">&#123;Send&#125;</span>{' '}
                    <span className="text-primary">/&gt;</span>
                    {'\n'}
                    {'      '}
                    <span className="text-primary">&lt;Button.Label&gt;</span>
                    {'Submit Form'}
                    <span className="text-primary">&lt;/Button.Label&gt;</span>
                    {'\n'}
                    {'    '}
                    <span className="text-primary">&lt;/Button&gt;</span>
                    {'\n'}
                    {'  '});{'\n'}
                    &#125;
                  </pre>
                )}

                {activeDxTab === 'variants' && (
                  <pre className="whitespace-pre">
                    <span className="text-secondary">import</span> &#123; button &#125;{' '}
                    <span className="text-secondary">from</span>{' '}
                    <span className="text-success">&apos;@ideasui/theme/recipes&apos;</span>;
                    {'\n\n'}
                    <span className="text-secondary">const</span> styles = button(&#123;{'\n'}
                    {'  '}variant: <span className="text-success">&apos;soft&apos;</span>,{'\n'}
                    {'  '}color: <span className="text-success">&apos;primary&apos;</span>,{'\n'}
                    {'  '}size: <span className="text-success">&apos;md&apos;</span>,{'\n'}
                    &#125;);{'\n\n'}
                    <span className="text-content-tertiary">
                      {'// Pure recipe string output (Zero runtime overhead)'}
                    </span>
                  </pre>
                )}

                {activeDxTab === 'ref' && (
                  <pre className="whitespace-pre">
                    <span className="text-secondary">import</span> &#123; useRef &#125;{' '}
                    <span className="text-secondary">from</span>{' '}
                    <span className="text-success">&apos;react&apos;</span>;{'\n'}
                    <span className="text-secondary">import</span> &#123; Button &#125;{' '}
                    <span className="text-secondary">from</span>{' '}
                    <span className="text-success">&apos;@ideasui/react&apos;</span>;{'\n\n'}
                    <span className="text-secondary">export function</span>{' '}
                    <span className="text-primary">Component</span>() &#123;{'\n'}
                    {'  '}
                    <span className="text-secondary">const</span>
                    {' ref = useRef<'}
                    <span className="text-primary">HTMLButtonElement</span>
                    {'>('}
                    <span className="text-secondary">null</span>
                    {');\n\n'}
                    {'  '}
                    <span className="text-secondary">return</span>{' '}
                    <span className="text-primary">&lt;Button</span>{' '}
                    <span className="text-secondary">ref=</span>
                    <span className="text-success">&#123;ref&#125;</span>
                    <span className="text-primary">&gt;</span>
                    {'Ref Target'}
                    <span className="text-primary">&lt;/Button&gt;</span>
                    {';\n'}
                    &#125;
                  </pre>
                )}
              </div>
            </div>

            {/* Mobile Feature Badges */}
            <DxBadges className="mt-4 flex flex-wrap items-center gap-2 sm:hidden" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
