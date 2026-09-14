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
} from 'lucide-react';
import React, { useState } from 'react';
import { Button, ButtonGroup } from '@ideasui/react';
import { cn } from '@ideasui/utils';

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

type VariantType = 'solid' | 'outline' | 'soft' | 'ghost';
type ColorType = 'primary' | 'secondary' | 'success' | 'danger';
type IconMode = 'start' | 'end' | 'iconOnly';
type SizeType = 'sm' | 'md' | 'lg';
type RadiusType = 'none' | 'md' | 'full';

function getIconModeLabel(mode: IconMode): string {
  if (mode === 'start') return 'startIcon';
  if (mode === 'end') return 'endIcon';

  return 'isIconOnly';
}

interface GalleryCardProps {
  readonly index: number;
  readonly gradientFromTo?: string;
  readonly children: React.ReactNode;
  readonly description: string;
}

function GalleryCard({
  index,
  gradientFromTo = 'from-primary to-secondary',
  children,
  description,
}: Readonly<GalleryCardProps>) {
  return (
    <motion.div
      className="bg-surface-subtle/60 group shadow-surface/5 hover:bg-surface-subtle/90 relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 shadow-md backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
      {...cardFadeIn(index)}
    >
      <div
        className={cn(
          'absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r opacity-0 transition-opacity duration-200 group-hover:opacity-100',
          gradientFromTo,
        )}
      />
      <div>{children}</div>
      <p className="text-content-tertiary mt-4 text-xs leading-relaxed">{description}</p>
    </motion.div>
  );
}

interface CardHeaderProps {
  readonly icon: React.ReactNode;
  readonly iconBgClass: string;
  readonly title: string;
  readonly badgeText: string;
}

function CardHeader({ icon, iconBgClass, title, badgeText }: Readonly<CardHeaderProps>) {
  return (
    <div className="mb-4 flex items-center justify-between gap-2">
      <div className="flex min-w-0 items-center gap-2.5">
        <div
          className={cn('flex size-8 shrink-0 items-center justify-center rounded-lg', iconBgClass)}
        >
          {icon}
        </div>
        <h3 className="text-content-primary shrink-0 text-sm font-bold whitespace-nowrap">
          {title}
        </h3>
      </div>
      <span className="text-content-muted bg-surface-muted shrink-0 rounded-md px-2 py-0.5 font-mono text-[10px] whitespace-nowrap">
        {badgeText}
      </span>
    </div>
  );
}

interface PreviewBoxProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

function PreviewBox({ children, className }: Readonly<PreviewBoxProps>) {
  return (
    <div
      className={cn(
        'bg-background/80 border-border-subtle/50 mt-3 flex items-center justify-center rounded-xl border p-4 shadow-inner',
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Component gallery section with live interactive component cards. */
export function ComponentGallery() {
  /* Interactive Card States */
  const [activeVariant, setActiveVariant] = useState<VariantType>('solid');
  const [activeColor, setActiveColor] = useState<ColorType>('primary');
  const [activeIconMode, setActiveIconMode] = useState<IconMode>('start');
  const [activeGroupTab, setActiveGroupTab] = useState<'all' | 'unread' | 'archived'>('all');
  const [loadingState, setLoadingState] = useState(false);
  const [activeSize, setActiveSize] = useState<SizeType>('md');
  const [activeRadius, setActiveRadius] = useState<RadiusType>('md');

  return (
    <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24 lg:pt-18 lg:pb-28">
      {/* Background Subtle Accent Glow Halo */}
      <div className="from-primary/5 via-secondary/5 pointer-events-none absolute top-1/2 left-1/2 h-[350px] w-[500px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr to-transparent blur-3xl sm:h-[500px] sm:w-[800px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-6 text-center sm:mb-8 lg:mb-10">
          <motion.div {...inView(0)} className="inline-flex">
            <span className="bg-primary-subtle/80 text-primary inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide shadow-2xs">
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
            Click any feature control below to see how IdeasUI components behave in real time.
          </motion.p>
        </div>

        {/* 6-Card Showcase Grid */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 — Variant System */}
          <GalleryCard
            description="Click buttons to test contrast, soft highlights, and ghost hover states across light & dark themes."
            gradientFromTo="from-primary to-secondary"
            index={0}
          >
            <CardHeader
              badgeText={`variant="${activeVariant}"`}
              icon={<Layers className="size-4" />}
              iconBgClass="bg-primary-subtle text-primary"
              title="Variant System"
            />

            {/* Interactive Variant Tabs */}
            <div className="bg-surface-subtle flex flex-wrap items-center gap-1.5 rounded-xl p-2.5">
              {(['solid', 'outline', 'soft', 'ghost'] as const).map((v) => (
                <button
                  key={v}
                  className={cn(
                    'rounded-lg px-2.5 py-1 text-xs font-medium capitalize transition-all duration-150 active:scale-95',
                    activeVariant === v
                      ? 'bg-primary text-on-primary font-semibold shadow-2xs'
                      : 'text-content-secondary hover:bg-surface-muted hover:text-content-primary',
                  )}
                  type="button"
                  onClick={() => setActiveVariant(v)}
                >
                  {v}
                </button>
              ))}
            </div>

            <PreviewBox>
              <Button color="primary" variant={activeVariant}>
                {activeVariant.charAt(0).toUpperCase() + activeVariant.slice(1)} Variant
              </Button>
            </PreviewBox>
          </GalleryCard>

          {/* Card 2 — Intent Semantics */}
          <GalleryCard
            description="Perceptually uniform OKLCH intent scales ensuring WCAG AA contrast compliance and predictable color hierarchy."
            gradientFromTo="from-secondary to-primary"
            index={1}
          >
            <CardHeader
              badgeText={`color="${activeColor}"`}
              icon={<Palette className="size-4" />}
              iconBgClass="bg-secondary-subtle text-secondary"
              title="Intent Semantics"
            />

            {/* Interactive Color Selector */}
            <div className="bg-surface-subtle flex flex-wrap items-center gap-1.5 rounded-xl p-2.5">
              {(['primary', 'secondary', 'success', 'danger'] as const).map((c) => {
                const colorClasses = {
                  primary: 'bg-primary text-on-primary',
                  secondary: 'bg-secondary text-on-secondary',
                  success: 'bg-success text-on-success',
                  danger: 'bg-danger text-on-danger',
                };

                return (
                  <button
                    key={c}
                    className={cn(
                      'rounded-lg px-2.5 py-1 text-xs font-medium capitalize transition-all duration-150 active:scale-95',
                      activeColor === c
                        ? cn(colorClasses[c], 'font-semibold shadow-2xs')
                        : 'text-content-secondary hover:bg-surface-muted hover:text-content-primary',
                    )}
                    type="button"
                    onClick={() => setActiveColor(c)}
                  >
                    {c}
                  </button>
                );
              })}
            </div>

            <PreviewBox>
              <Button color={activeColor} variant="solid">
                {activeColor.charAt(0).toUpperCase() + activeColor.slice(1)} Action
              </Button>
            </PreviewBox>
          </GalleryCard>

          {/* Card 3 — Icons & Icon-Only */}
          <GalleryCard
            description="First-class icon slot positioning with automatic spacing alignment and aria-label enforced icon-only buttons."
            gradientFromTo="from-primary to-success"
            index={2}
          >
            <CardHeader
              badgeText={getIconModeLabel(activeIconMode)}
              icon={<Zap className="size-4" />}
              iconBgClass="bg-success-subtle text-success"
              title="Icon Integration"
            />

            {/* Mode Switcher */}
            <div className="bg-surface-subtle flex flex-wrap items-center gap-1.5 rounded-xl p-2.5">
              {[
                { mode: 'start', label: 'Start Icon' },
                { mode: 'end', label: 'End Icon' },
                { mode: 'iconOnly', label: 'Icon Only' },
              ].map(({ mode, label }) => (
                <button
                  key={mode}
                  className={cn(
                    'rounded-lg px-2 py-1 text-xs font-medium transition-all duration-150 active:scale-95',
                    activeIconMode === mode
                      ? 'bg-primary text-on-primary font-semibold shadow-2xs'
                      : 'text-content-secondary hover:bg-surface-muted hover:text-content-primary',
                  )}
                  type="button"
                  onClick={() => setActiveIconMode(mode as IconMode)}
                >
                  {label}
                </button>
              ))}
            </div>

            <PreviewBox>
              {activeIconMode === 'start' && (
                <Button color="primary" size="sm" startIcon={<Send className="size-3.5" />}>
                  Send Message
                </Button>
              )}
              {activeIconMode === 'end' && (
                <Button
                  color="primary"
                  endIcon={<ArrowRight className="size-3.5" />}
                  size="sm"
                  variant="outline"
                >
                  Continue
                </Button>
              )}
              {activeIconMode === 'iconOnly' && (
                <Button
                  isIconOnly
                  aria-label="Favorite item"
                  color="primary"
                  size="sm"
                  variant="soft"
                >
                  <Heart className="size-4" />
                </Button>
              )}
            </PreviewBox>
          </GalleryCard>

          {/* Card 4 — Button Groups & Tabs */}
          <GalleryCard
            description="Segmented control toolbars with automatic corner radius masking, border merging, and keyboard arrow navigation."
            gradientFromTo="from-secondary to-warning"
            index={3}
          >
            <CardHeader
              badgeText="<ButtonGroup />"
              icon={<SlidersHorizontal className="size-4" />}
              iconBgClass="bg-warning-subtle text-warning"
              title="Button Groups"
            />

            <PreviewBox className="flex-col p-4.5">
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
              <span className="text-content-tertiary mt-2 font-mono text-[10px]">
                activeTab: &quot;{activeGroupTab}&quot;
              </span>
            </PreviewBox>
          </GalleryCard>

          {/* Card 5 — Interactive Loading & Disabled States */}
          <GalleryCard
            description="Built-in spinner indicators with pointer interaction locking and zero layout shift during async loading transitions."
            gradientFromTo="from-primary to-secondary"
            index={4}
          >
            <CardHeader
              badgeText={loadingState ? 'isLoading={true}' : 'isLoading={false}'}
              icon={<Sparkles className="size-4" />}
              iconBgClass="bg-primary-subtle text-primary"
              title="Dynamic States"
            />

            <PreviewBox className="flex-wrap gap-2">
              <Button
                color="primary"
                isLoading={loadingState}
                size="sm"
                onClick={() => {
                  setLoadingState(true);
                  setTimeout(() => setLoadingState(false), 2000);
                }}
              >
                {loadingState ? 'Saving Changes...' : 'Click to Load'}
              </Button>
              <Button isDisabled color="secondary" size="sm" variant="soft">
                Disabled
              </Button>
            </PreviewBox>
          </GalleryCard>

          {/* Card 6 — Density & Radii */}
          <GalleryCard
            description="Comprehensive size density steps (`xs` to `xl`) and configurable corner radius system adapting to any design vision."
            gradientFromTo="from-secondary to-primary"
            index={5}
          >
            <CardHeader
              badgeText={`${activeSize} / ${activeRadius}`}
              icon={<ShieldCheck className="size-4" />}
              iconBgClass="bg-secondary-subtle text-secondary"
              title="Density & Radii"
            />

            {/* Size & Radius Controls */}
            <div className="bg-surface-subtle flex flex-col gap-2 rounded-xl p-2.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-content-tertiary font-medium">Size:</span>
                <div className="flex items-center gap-1">
                  {(['sm', 'md', 'lg'] as const).map((s) => (
                    <button
                      key={s}
                      className={cn(
                        'rounded-md px-2 py-0.5 font-mono text-[10px] uppercase transition-all active:scale-95',
                        activeSize === s
                          ? 'bg-primary text-on-primary font-semibold'
                          : 'text-content-secondary hover:text-content-primary',
                      )}
                      type="button"
                      onClick={() => setActiveSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px]">
                <span className="text-content-tertiary font-medium">Radius:</span>
                <div className="flex items-center gap-1">
                  {(['none', 'md', 'full'] as const).map((r) => (
                    <button
                      key={r}
                      className={cn(
                        'rounded-md px-2 py-0.5 font-mono text-[10px] capitalize transition-all active:scale-95',
                        activeRadius === r
                          ? 'bg-primary text-on-primary font-semibold'
                          : 'text-content-secondary hover:text-content-primary',
                      )}
                      type="button"
                      onClick={() => setActiveRadius(r)}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <PreviewBox>
              <Button color="primary" radius={activeRadius} size={activeSize}>
                Custom Button
              </Button>
            </PreviewBox>
          </GalleryCard>
        </div>
      </div>
    </section>
  );
}
