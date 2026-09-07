'use client';

import type { JSX } from 'react';

import { useState, useRef, useEffect } from 'react';
import {
  Palette,
  Type,
  Space,
  Circle,
  Layers,
  Zap,
  Eye,
  Layers2,
  Wind,
  Monitor,
  Copy,
  Check,
  ChevronRight,
} from 'lucide-react';

import { Button } from '@ideasui/button';

/* ───────────────────────────── constants ─────────────────────────── */

const COPY_TIMEOUT = 1500;

const SEMANTIC_ROLES = [
  'primary',
  'secondary',
  'tertiary',
  'success',
  'danger',
  'info',
  'warning',
] as const;
const SEMANTIC_VARIANTS = ['base', 'on-base', 'subtle', 'on-subtle'] as const;

const SURFACE_TOKENS = ['base', 'elevated', 'muted', 'strong', 'inverse'] as const;
const CONTENT_TOKENS = [
  'primary',
  'secondary',
  'tertiary',
  'muted',
  'disabled',
  'inverse',
] as const;
const BORDER_COLOR_TOKENS = ['base', 'subtle', 'strong', 'focus', 'danger'] as const;

const FONT_SIZES = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'] as const;
const FONT_WEIGHTS = [
  { name: 'Regular', class: 'font-normal', weight: '400' },
  { name: 'Medium', class: 'font-medium', weight: '500' },
  { name: 'Semibold', class: 'font-semibold', weight: '600' },
  { name: 'Bold', class: 'font-bold', weight: '700' },
] as const;

const LETTER_SPACINGS = [
  { name: 'Tighter', class: 'tracking-tighter' },
  { name: 'Tight', class: 'tracking-tight' },
  { name: 'Normal', class: 'tracking-normal' },
  { name: 'Wide', class: 'tracking-wide' },
  { name: 'Wider', class: 'tracking-wider' },
  { name: 'Widest', class: 'tracking-widest' },
] as const;

const SPACING_STEPS = [
  { key: '0', px: '0' },
  { key: '1', px: '4px' },
  { key: '2', px: '8px' },
  { key: '3', px: '12px' },
  { key: '4', px: '16px' },
  { key: '5', px: '20px' },
  { key: '6', px: '24px' },
  { key: '8', px: '32px' },
  { key: '10', px: '40px' },
  { key: '12', px: '48px' },
  { key: '16', px: '64px' },
  { key: '20', px: '80px' },
  { key: '24', px: '96px' },
] as const;

const BORDER_RADII = [
  { name: 'none', class: 'rounded-none' },
  { name: 'xs', class: 'rounded-xs' },
  { name: 'sm', class: 'rounded-sm' },
  { name: 'md', class: 'rounded-md' },
  { name: 'lg', class: 'rounded-lg' },
  { name: 'xl', class: 'rounded-xl' },
  { name: '2xl', class: 'rounded-2xl' },
  { name: '3xl', class: 'rounded-3xl' },
  { name: '4xl', class: 'rounded-4xl' },
  { name: 'full', class: 'rounded-full' },
] as const;

const SHADOWS = [
  { name: 'xs', class: 'shadow-xs' },
  { name: 'sm', class: 'shadow-sm' },
  { name: 'md', class: 'shadow-md' },
  { name: 'lg', class: 'shadow-lg' },
  { name: 'xl', class: 'shadow-xl' },
  { name: '2xl', class: 'shadow-2xl' },
  { name: 'inner', class: 'shadow-inner' },
  { name: 'none', class: 'shadow-none' },
] as const;

const ANIMATIONS = [
  { name: 'spin', class: 'animate-spin' },
  { name: 'ping', class: 'animate-ping' },
  { name: 'pulse', class: 'animate-pulse' },
  { name: 'bounce', class: 'animate-bounce' },
  {
    name: 'fade-in',
    class: 'animate-fade-in [animation-iteration-count:infinite] [animation-duration:3s]',
  },
  {
    name: 'slide-in',
    class: 'animate-slide-in [animation-iteration-count:infinite] [animation-duration:3s]',
  },
  {
    name: 'scale-in',
    class: 'animate-scale-in [animation-iteration-count:infinite] [animation-duration:3s]',
  },
] as const;

const DURATIONS = [
  { name: 'xs', class: 'duration-xs', ms: '75ms' },
  { name: 'sm', class: 'duration-sm', ms: '100ms' },
  { name: 'md', class: 'duration-md', ms: '150ms' },
  { name: 'lg', class: 'duration-lg', ms: '200ms' },
  { name: 'xl', class: 'duration-xl', ms: '300ms' },
  { name: '2xl', class: 'duration-2xl', ms: '500ms' },
  { name: '3xl', class: 'duration-3xl', ms: '700ms' },
  { name: '4xl', class: 'duration-4xl', ms: '1000ms' },
] as const;

const EASINGS = [
  { name: 'standard', class: 'ease-standard' },
  { name: 'accelerate', class: 'ease-accelerate' },
  { name: 'decelerate', class: 'ease-decelerate' },
  { name: 'emphasized', class: 'ease-emphasized' },
  { name: 'linear', class: 'ease-linear' },
  { name: 'spring', class: 'ease-spring' },
] as const;

const OPACITIES = [
  { name: 'none', class: 'opacity-none', value: '0' },
  { name: 'subtle', class: 'opacity-subtle', value: '0.04' },
  { name: 'light', class: 'opacity-light', value: '0.08' },
  { name: 'medium', class: 'opacity-medium', value: '0.16' },
  { name: 'strong', class: 'opacity-strong', value: '0.38' },
  { name: 'heavy', class: 'opacity-heavy', value: '0.6' },
  { name: 'full', class: 'opacity-full', value: '1' },
] as const;

const Z_INDICES = [
  { name: 'hide', class: 'z-hide', value: '-1' },
  { name: 'base', class: 'z-base', value: '0' },
  { name: 'raised', class: 'z-raised', value: '1' },
  { name: 'sticky', class: 'z-sticky', value: '100' },
  { name: 'fixed', class: 'z-fixed', value: '200' },
  { name: 'dropdown', class: 'z-dropdown', value: '1000' },
  { name: 'overlay', class: 'z-overlay', value: '1100' },
  { name: 'modal', class: 'z-modal', value: '1200' },
  { name: 'popover', class: 'z-popover', value: '1300' },
  { name: 'toast', class: 'z-toast', value: '1400' },
  { name: 'tooltip', class: 'z-tooltip', value: '1500' },
] as const;

const BLURS = [
  { name: 'none', class: 'blur-none' },
  { name: 'sm', class: 'blur-sm' },
  { name: 'md', class: 'blur-md' },
  { name: 'lg', class: 'blur-lg' },
  { name: 'xl', class: 'blur-xl' },
  { name: '2xl', class: 'blur-2xl' },
  { name: '3xl', class: 'blur-3xl' },
] as const;

const BREAKPOINTS = [
  // { name: 'xs', value: '320px', desc: 'Small phones' },
  { name: 'sm', value: '640px', desc: 'Large phones' },
  { name: 'md', value: '768px', desc: 'Tablets' },
  { name: 'lg', value: '1024px', desc: 'Laptops' },
  { name: 'xl', value: '1280px', desc: 'Desktops' },
  { name: '2xl', value: '1536px', desc: 'Large screens' },
] as const;

const BORDER_WIDTHS = [
  { name: 'none', value: '0' },
  { name: 'hairline', value: '0.5px' },
  { name: 'thin', value: '1px' },
  { name: 'medium', value: '2px' },
  { name: 'thick', value: '4px' },
  { name: 'heavy', value: '8px' },
] as const;

const Z_INDEX_HEIGHT_BASE = 40;
const Z_INDEX_HEIGHT_STEP = 20;
const Z_INDEX_LIGHTNESS_BASE = 95;
const Z_INDEX_LIGHTNESS_RANGE = 50;

function scrollTo(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ─────────────── navigation sections ─────────────── */

const NAV_SECTIONS = [
  { id: 'semantic', label: 'Semantic Colors', icon: Palette },
  { id: 'surfaces', label: 'Surfaces & Content', icon: Layers },
  { id: 'typography', label: 'Typography', icon: Type },
  { id: 'spacing', label: 'Spacing', icon: Space },
  { id: 'radius', label: 'Border Radius', icon: Circle },
  { id: 'borders', label: 'Borders', icon: Layers2 },
  { id: 'shadows', label: 'Shadows & Elevation', icon: Layers },
  { id: 'motion', label: 'Motion', icon: Zap },
  { id: 'opacity', label: 'Opacity', icon: Eye },
  { id: 'zindex', label: 'Z-Index', icon: Layers2 },
  { id: 'blur', label: 'Blur', icon: Wind },
  { id: 'breakpoints', label: 'Breakpoints', icon: Monitor },
] as const;

/* ─────────────── helpers ─────────────── */

function CodeChip({
  text,
  copied,
  onCopy,
}: {
  readonly text: string;
  readonly copied: boolean;
  readonly onCopy: () => void;
}): JSX.Element {
  return (
    <button
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[11px] font-semibold transition-all duration-200 ${
        copied
          ? 'border-success-subtle bg-success-subtle text-on-success-subtle scale-95'
          : 'border-border-subtle hover:bg-surface hover:border-border-strong bg-surface-muted text-content-secondary hover:text-content-primary hover:shadow-xs'
      }`}
      type="button"
      onClick={onCopy}
    >
      {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
      {copied ? 'Copied!' : text}
    </button>
  );
}

function SectionHeader({
  id,
  title,
  description,
}: {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}): JSX.Element {
  return (
    <div className="mb-6" id={id}>
      <h2 className="text-content-primary text-2xl font-bold">{title}</h2>
      <p className="text-content-tertiary mt-1 text-sm">{description}</p>
    </div>
  );
}

function SectionCard({
  children,
  className = '',
}: {
  readonly children: React.ReactNode;
  readonly className?: string;
}): JSX.Element {
  return (
    <div
      className={`bg-surface/80 rounded-3xl p-8 shadow-xs backdrop-blur-xl lg:p-10 ${className}`}
    >
      {children}
    </div>
  );
}

/* ──────────────────────────── COLOR SWATCH MAPS ──────────────────── */

const SEMANTIC_BG_MAP: Record<string, Record<string, string>> = {
  primary: {
    base: 'bg-primary',
    'on-base': 'bg-on-primary',
    subtle: 'bg-primary-subtle',
    'on-subtle': 'bg-on-primary-subtle',
  },
  success: {
    base: 'bg-success',
    'on-base': 'bg-on-success',
    subtle: 'bg-success-subtle',
    'on-subtle': 'bg-on-success-subtle',
  },
  error: {
    base: 'bg-error',
    'on-base': 'bg-on-error',
    subtle: 'bg-error-subtle',
    'on-subtle': 'bg-on-error-subtle',
  },
  info: {
    base: 'bg-info',
    'on-base': 'bg-on-info',
    subtle: 'bg-info-subtle',
    'on-subtle': 'bg-on-info-subtle',
  },
  warning: {
    base: 'bg-warning',
    'on-base': 'bg-on-warning',
    subtle: 'bg-warning-subtle',
    'on-subtle': 'bg-on-warning-subtle',
  },
  secondary: {
    base: 'bg-secondary',
    'on-base': 'bg-on-secondary',
    subtle: 'bg-secondary-subtle',
    'on-subtle': 'bg-on-secondary-subtle',
  },
  tertiary: {
    base: 'bg-tertiary',
    'on-base': 'bg-on-tertiary',
    subtle: 'bg-tertiary-subtle',
    'on-subtle': 'bg-on-tertiary-subtle',
  },
};

const SURFACE_BG_MAP: Record<string, string> = {
  base: 'bg-surface-base',
  elevated: 'bg-surface-elevated',
  muted: 'bg-surface-muted',
  strong: 'bg-surface-strong',
  inverse: 'bg-surface-inverse',
};

const CONTENT_TEXT_MAP: Record<string, string> = {
  primary: 'text-content-primary',
  secondary: 'text-content-secondary',
  tertiary: 'text-content-tertiary',
  muted: 'text-content-muted',
  disabled: 'text-content-disabled',
  inverse: 'text-content-inverse',
};

const BORDER_COLOR_MAP: Record<string, string> = {
  base: 'border-border-base',
  subtle: 'border-border-subtle',
  strong: 'border-border-strong',
  focus: 'border-border-focus',
  danger: 'border-border-danger',
};

/* ═════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═════════════════════════════════════════════════════════════════════ */

export default function DesignSystemPage(): JSX.Element {
  const [copiedClass, setCopiedClass] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('colors');
  const sectionReferences = useRef<Record<string, HTMLElement | null>>({});

  const copyToClipboard = async (text: string): Promise<void> => {
    await navigator.clipboard.writeText(text);
    setCopiedClass(text);
    setTimeout(() => setCopiedClass(null), COPY_TIMEOUT);
  };

  // Intersection observer for nav highlight
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-100px 0px -60% 0px', threshold: 0.1 },
    );

    for (const section of NAV_SECTIONS) {
      const element = document.getElementById(section.id);

      if (element) {
        sectionReferences.current[section.id] = element;
        observer.observe(element);
      }
    }

    return () => observer.disconnect();
  }, []);

  const chip = (text: string): JSX.Element => (
    <CodeChip
      copied={copiedClass === text}
      text={text}
      onCopy={() => {
        void copyToClipboard(text);
      }}
    />
  );

  /* ───────────────────────── render ───────────────────────── */

  return (
    <div className="bg-background text-content-primary relative min-h-screen transition-colors duration-500">
      {/* Background Ambience */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden outline-none">
        <div className="bg-primary/10 absolute -top-[10%] left-[20%] h-[600px] w-[600px] animate-pulse rounded-full opacity-50 blur-3xl" />
        <div className="bg-secondary/10 absolute top-[40%] right-[-10%] size-[500px] animate-pulse rounded-full opacity-40 blur-3xl" />
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 relative z-10 mx-auto flex max-w-[1440px] gap-8 px-4 py-8 duration-700 lg:px-8">
        {/* ── sticky sidebar nav ── */}
        <aside className="hidden w-56 shrink-0 lg:block">
          <nav className="sticky top-24 space-y-1">
            <h3 className="text-content-secondary mb-4 px-3 text-xs font-bold tracking-widest uppercase">
              Sections
            </h3>
            {NAV_SECTIONS.map((s) => {
              const Icon = s.icon;

              return (
                <button
                  key={s.id}
                  className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm transition-all duration-200 ${
                    activeSection === s.id
                      ? 'bg-primary-subtle text-primary font-bold shadow-2xs'
                      : 'text-content-secondary hover:bg-surface-muted hover:text-content-primary'
                  }`}
                  type="button"
                  onClick={() => scrollTo(s.id)}
                >
                  <Icon className="size-4.5 shrink-0" />
                  {s.label}
                  {activeSection === s.id && <ChevronRight className="ml-auto size-4" />}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* ── main content ── */}
        <main className="min-w-0 flex-1 space-y-12">
          {/* page header */}
          <div className="animate-slideIn mb-10 text-center lg:text-left">
            <h1 className="text-content-primary pb-2 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Design System Tokens
            </h1>
            <p className="text-content-secondary mt-3 max-w-2xl text-lg leading-relaxed">
              Complete token reference for{' '}
              <code className="bg-primary-subtle text-primary rounded-lg px-2.5 py-1 text-sm font-bold shadow-2xs">
                @ideasui/theme
              </code>{' '}
              — OKLCH color palettes, typography, spacing, surface variants, and elevation depth.
            </p>
          </div>

          {/* ═══════ 1 · COLOR PALETTES ═══════ */}
          {/* ═══════ 1 · SEMANTIC COLORS ═══════ */}

          {/* ═══════ 2 · SEMANTIC COLORS ═══════ */}
          <SectionCard>
            <SectionHeader
              description="Role-based aliases: base (500), subtle (100), content (50)."
              id="semantic"
              title="Semantic Colors"
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SEMANTIC_ROLES.map((role) => (
                <div key={role} className="space-y-2">
                  <h3 className="text-content-secondary text-sm font-semibold capitalize">
                    {role}
                  </h3>
                  {SEMANTIC_VARIANTS.map((variant) => {
                    const cls = `bg-${role}-${variant}`;
                    const bgClass = SEMANTIC_BG_MAP[role]?.[variant] ?? '';

                    return (
                      <button
                        key={variant}
                        className="group border-border-subtle flex w-full items-center gap-3 rounded-lg border p-3 transition-all hover:shadow-md"
                        type="button"
                        onClick={() => {
                          void copyToClipboard(cls);
                        }}
                      >
                        <div className={`${bgClass} size-10 shrink-0 rounded-md shadow-xs`} />
                        <div className="text-left">
                          <div className="text-content-secondary text-xs font-medium capitalize">
                            {variant}
                          </div>
                          <code className="text-content-muted text-[10px]">{cls}</code>
                        </div>
                        {copiedClass === cls && <Check className="text-success ml-auto h-3 w-3" />}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </SectionCard>

          {/* ═══════ 3 · SURFACES & CONTENT ═══════ */}
          <SectionCard>
            <SectionHeader
              description="Surface backgrounds, content text colors, and border colors."
              id="surfaces"
              title="Surfaces & Content"
            />

            {/* surfaces */}
            <h3 className="text-content-secondary mb-3 text-sm font-semibold">Surfaces</h3>
            <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SURFACE_TOKENS.map((token) => {
                const bgCls = `bg-surface-${token}`;
                const textCls = `text-surface-on-${token}`;

                return (
                  <div key={token} className="space-y-2">
                    <h3 className="text-content-secondary text-sm font-semibold capitalize">
                      {token}
                    </h3>

                    {/* Background */}
                    <button
                      className="group border-border-subtle flex w-full items-center gap-3 rounded-lg border p-3 transition-all hover:shadow-md"
                      type="button"
                      onClick={() => {
                        void copyToClipboard(bgCls);
                      }}
                    >
                      <div
                        className={`${SURFACE_BG_MAP[token]} border-border-subtle size-10 shrink-0 rounded-md border shadow-xs`}
                      />
                      <div className="text-left">
                        <div className="text-content-secondary text-xs font-medium capitalize">
                          Background
                        </div>
                        <code className="text-content-muted text-[10px]">{bgCls}</code>
                      </div>
                      {copiedClass === bgCls && <Check className="text-success ml-auto h-3 w-3" />}
                    </button>

                    {/* Foreground (On-Surface) */}
                    <button
                      className="group border-border-subtle flex w-full items-center gap-3 rounded-lg border p-3 transition-all hover:shadow-md"
                      type="button"
                      onClick={() => {
                        void copyToClipboard(textCls);
                      }}
                    >
                      <div
                        className={`${SURFACE_BG_MAP[token]} border-border-subtle flex size-10 shrink-0 items-center justify-center rounded-md border shadow-xs`}
                      >
                        <span className={`${textCls} text-sm font-bold`}>Aa</span>
                      </div>
                      <div className="text-left">
                        <div className="text-content-secondary text-xs font-medium capitalize">
                          Foreground
                        </div>
                        <code className="text-content-muted text-[10px]">{textCls}</code>
                      </div>
                      {copiedClass === textCls && (
                        <Check className="text-success ml-auto h-3 w-3" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* content text */}
            <h3 className="text-content-secondary mb-3 text-sm font-semibold">Content (Text)</h3>
            <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {CONTENT_TOKENS.map((token) => {
                const cls = `text-content-${token}`;

                return (
                  <div
                    key={token}
                    className={`border-border-subtle rounded-lg border p-4 ${token === 'inverse' ? 'bg-surface-inverse' : ''}`}
                  >
                    <p className={`${CONTENT_TEXT_MAP[token]} mb-2 text-lg font-semibold`}>
                      The quick brown fox
                    </p>
                    <div className="text-content-muted text-xs capitalize">{token}</div>
                    {chip(cls)}
                  </div>
                );
              })}
            </div>

            {/* border colors */}
            <h3 className="text-content-secondary mb-3 text-sm font-semibold">Border Colors</h3>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {BORDER_COLOR_TOKENS.map((token) => {
                const cls = `border-${token}`;

                return (
                  <div
                    key={token}
                    className={`${BORDER_COLOR_MAP[token]} rounded-lg border-2 p-4 text-center`}
                  >
                    <div className="text-content-secondary text-xs font-medium capitalize">
                      {token}
                    </div>
                    {chip(cls)}
                  </div>
                );
              })}
            </div>
          </SectionCard>

          {/* ═══════ 4 · TYPOGRAPHY ═══════ */}
          <SectionCard>
            <SectionHeader
              description="Font families, sizes, weights, and letter spacings."
              id="typography"
              title="Typography"
            />

            {/* font families */}
            <h3 className="text-content-secondary mb-3 text-sm font-semibold">Font Families</h3>
            <div className="mb-8 grid gap-4 sm:grid-cols-3">
              <div className="border-border-subtle rounded-lg border p-4">
                <p className="text-content-secondary font-sans text-lg">Inter — Sans Serif</p>
                <p className="text-content-tertiary mt-1 font-sans text-sm">
                  ABCDEFGHIJKLM 0123456789
                </p>
                {chip('font-sans')}
              </div>
              <div className="border-border-subtle rounded-lg border p-4">
                <p className="text-content-secondary font-serif text-lg">Georgia — Serif</p>
                <p className="text-content-tertiary mt-1 font-serif text-sm">
                  ABCDEFGHIJKLM 0123456789
                </p>
                {chip('font-serif')}
              </div>
              <div className="border-border-subtle rounded-lg border p-4">
                <p className="text-content-secondary font-mono text-lg">JetBrains Mono</p>
                <p className="text-content-tertiary mt-1 font-mono text-sm">
                  ABCDEFGHIJKLM 0123456789
                </p>
                {chip('font-mono')}
              </div>
            </div>

            {/* font sizes */}
            <h3 className="text-content-secondary mb-3 text-sm font-semibold">Font Sizes</h3>
            <div className="mb-8 space-y-3 overflow-x-auto">
              {FONT_SIZES.map((size) => (
                <div key={size} className="flex items-baseline gap-4">
                  <span className="text-content-muted w-12 shrink-0 text-right text-xs font-medium">
                    {size}
                  </span>
                  <span className={`text-${size} text-content-primary font-medium`}>
                    The quick brown fox
                  </span>
                  {chip(`text-${size}`)}
                </div>
              ))}
            </div>

            {/* font weights */}
            <h3 className="text-content-secondary mb-3 text-sm font-semibold">Font Weights</h3>
            <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {FONT_WEIGHTS.map((fw) => (
                <div key={fw.name} className="border-border-subtle rounded-lg border p-4">
                  <p className={`${fw.class} text-content-primary text-lg`}>
                    {fw.name} ({fw.weight})
                  </p>
                  {chip(fw.class)}
                </div>
              ))}
            </div>

            {/* letter spacing */}
            <h3 className="text-content-secondary mb-3 text-sm font-semibold">Letter Spacing</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {LETTER_SPACINGS.map((ls) => (
                <div key={ls.name} className="border-border-subtle rounded-lg border p-4">
                  <p
                    className={`${ls.class} text-content-secondary text-base font-medium uppercase`}
                  >
                    {ls.name}
                  </p>
                  {chip(ls.class)}
                </div>
              ))}
            </div>
          </SectionCard>

          {/* ═══════ 5 · SPACING ═══════ */}
          <SectionCard>
            <SectionHeader
              description="4px grid system. Use with padding, margin, gap, width, height, etc."
              id="spacing"
              title="Spacing Scale"
            />
            <div className="space-y-2">
              {SPACING_STEPS.map((step) => (
                <div
                  key={step.key}
                  className="border-border-subtle hover:bg-surface-muted flex items-center gap-4 rounded-lg border px-4 py-2 transition-colors"
                >
                  <span className="text-primary w-8 text-right font-mono text-sm font-bold">
                    {step.key}
                  </span>
                  <div className="flex-1">
                    <div
                      className="bg-primary/80 h-5 rounded"
                      style={{ width: step.px === '0' ? '2px' : step.px }}
                    />
                  </div>
                  <span className="text-content-tertiary w-12 text-right text-xs font-medium">
                    {step.px}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {chip(`m-${step.key}`)}
                    {chip(`p-${step.key}`)}
                    {chip(`gap-${step.key}`)}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* ═══════ 6 · BORDER RADIUS ═══════ */}
          <SectionCard>
            <SectionHeader
              description="From sharp corners to fully rounded."
              id="radius"
              title="Border Radius"
            />
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-10">
              {BORDER_RADII.map((r) => (
                <div key={r.name} className="flex flex-col items-center gap-2">
                  <div
                    className={`${r.class} border-border-strong bg-primary-subtle size-16 border-2`}
                  />
                  <span className="text-content-tertiary text-[10px] font-medium">{r.name}</span>
                  {chip(r.class)}
                </div>
              ))}
            </div>
          </SectionCard>

          {/* ═══════ 7 · BORDERS ═══════ */}
          <SectionCard>
            <SectionHeader
              description="Semantic border width tokens."
              id="borders"
              title="Border Widths"
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {BORDER_WIDTHS.map((b) => (
                <div
                  key={b.name}
                  className="border-border-subtle flex items-center gap-3 rounded-lg border p-4"
                >
                  <div
                    className="bg-primary-subtle h-12 w-12 rounded-md"
                    style={{ border: `${b.value} solid` }}
                  />
                  <div>
                    <div className="text-content-secondary text-sm font-medium capitalize">
                      {b.name}
                    </div>
                    <div className="text-content-muted text-xs">{b.value}</div>
                    {chip(`border-${b.name}`)}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* ═══════ 8 · SHADOWS ═══════ */}
          <SectionCard>
            <SectionHeader description="Box shadows from xs to 2xl." id="shadows" title="Shadows" />

            <h3 className="text-content-secondary mb-3 text-sm font-semibold">Box Shadows</h3>
            <div className="mb-8 rounded-xl p-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {SHADOWS.map((s) => (
                  <div key={s.name} className="text-center">
                    <div className={`${s.class} bg-surface-base mx-auto mb-3 size-20 rounded-xl`} />
                    <div className="text-content-secondary text-xs font-medium">{s.name}</div>
                    {chip(s.class)}
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          {/* ═══════ 9 · MOTION ═══════ */}
          <SectionCard>
            <SectionHeader
              description="Keyframe animations, durations, and easing functions."
              id="motion"
              title="Motion & Animation"
            />

            <h3 className="text-content-secondary mb-3 text-sm font-semibold">Animations</h3>
            <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
              {ANIMATIONS.map((a) => (
                <div
                  key={a.name}
                  className="border-border-subtle flex items-center gap-3 rounded-lg border p-4"
                >
                  <div className={`${a.class} bg-primary size-8 min-w-8 rounded-md`} />
                  <div>
                    <div className="text-content-secondary text-sm font-medium">{a.name}</div>
                    {chip(a.class)}
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-content-secondary mb-3 text-sm font-semibold">Durations</h3>
            <div className="mb-8 space-y-2">
              {DURATIONS.map((d) => (
                <div key={d.name} className="flex items-center gap-4">
                  <span className="text-content-muted w-10 text-right text-xs font-medium">
                    {d.name}
                  </span>
                  <div className="bg-surface-muted relative h-3 w-full max-w-xs overflow-hidden rounded-full">
                    <div
                      className="bg-primary absolute inset-y-0 left-0 rounded-full"
                      style={{ width: `${(Number.parseInt(d.ms) / 1000) * 100}%` }}
                    />
                  </div>
                  <span className="text-content-tertiary text-xs">{d.ms}</span>
                  {chip(d.class)}
                </div>
              ))}
            </div>

            <h3 className="text-content-secondary mb-3 text-sm font-semibold">Easing Functions</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {EASINGS.map((e) => (
                <div key={e.name} className="border-border-subtle rounded-lg border p-4">
                  <div className="text-content-secondary mb-2 text-sm font-medium capitalize">
                    {e.name}
                  </div>
                  {chip(e.class)}
                </div>
              ))}
            </div>
          </SectionCard>

          {/* ═══════ 10 · OPACITY ═══════ */}
          <SectionCard>
            <SectionHeader
              description="Semantic opacity scale from fully transparent to fully visible."
              id="opacity"
              title="Opacity"
            />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {OPACITIES.map((o) => (
                <div
                  key={o.name}
                  className="border-border-subtle flex items-center gap-3 rounded-lg border p-4"
                >
                  <div className="relative size-12 rounded-md bg-[conic-gradient(#e5e7eb_25%,#f9fafb_25%_50%,#e5e7eb_50%_75%,#f9fafb_75%)] bg-[length:8px_8px]">
                    <div className={`${o.class} bg-primary absolute inset-0 rounded-md`} />
                  </div>
                  <div>
                    <div className="text-content-secondary text-sm font-medium capitalize">
                      {o.name}
                    </div>
                    <div className="text-content-muted text-xs">{o.value}</div>
                    {chip(o.class)}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* ═══════ 11 · Z-INDEX ═══════ */}
          <SectionCard>
            <SectionHeader
              description="Ordered, predictable layering system from base to tooltip."
              id="zindex"
              title="Z-Index"
            />

            <div
              className="border-border-subtle bg-surface-muted/60 relative mb-12 flex h-[520px] w-full items-center justify-center overflow-hidden rounded-2xl border backdrop-blur-sm"
              style={{ perspective: '1000px' }}
            >
              <h3 className="text-content-muted absolute top-4 left-4 z-0 text-xs font-semibold">
                3D Layering Stack Demo
              </h3>

              <div
                className="relative mt-8 h-48 w-64"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'rotateX(52deg) rotateZ(-42deg)',
                }}
              >
                {/* Base layer */}
                <div
                  className="z-base border-border-strong bg-surface-base absolute inset-0 flex flex-col justify-between rounded-xl border-2 p-4 shadow-md transition-transform duration-300"
                  style={{ transform: 'translate3d(-40px, 40px, 0px)' }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-content-primary text-sm font-bold">
                      Base Card (z-base)
                    </span>
                    <span className="bg-surface-muted text-content-secondary rounded px-2 py-0.5 font-mono text-[10px] font-bold">
                      z: 0
                    </span>
                  </div>
                  <div className="border-border-subtle flex items-center justify-between border-t pt-2">
                    <span className="text-content-tertiary text-xs font-medium">
                      Default Canvas
                    </span>
                    <Layers className="text-content-secondary h-4 w-4" />
                  </div>
                </div>

                {/* Overlapping layer 1 */}
                <div
                  className="z-raised border-primary/40 bg-primary-subtle/90 absolute inset-0 flex flex-col justify-between rounded-xl border p-4 shadow-lg backdrop-blur-xs transition-transform duration-300"
                  style={{ transform: 'translate3d(-15px, 15px, 45px)' }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-primary text-sm font-bold">
                      Raised Element (z-raised)
                    </span>
                    <span className="bg-primary/20 text-primary rounded px-2 py-0.5 font-mono text-[10px] font-bold">
                      z: 1
                    </span>
                  </div>
                  <div className="border-primary/20 flex items-center justify-between border-t pt-2">
                    <span className="text-primary/80 text-xs font-medium">Floating Container</span>
                    <Layers2 className="text-primary h-4 w-4" />
                  </div>
                </div>

                {/* Overlapping layer 2 */}
                <div
                  className="z-dropdown border-info/40 bg-info-subtle/90 absolute inset-0 flex flex-col justify-between rounded-xl border p-4 shadow-xl backdrop-blur-xs transition-transform duration-300"
                  style={{ transform: 'translate3d(10px, -10px, 90px)' }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-info text-sm font-bold">Dropdown Menu (z-dropdown)</span>
                    <span className="bg-info/20 text-info rounded px-2 py-0.5 font-mono text-[10px] font-bold">
                      z: 1000
                    </span>
                  </div>
                  <div className="border-info/20 flex items-center justify-between border-t pt-2">
                    <span className="text-info/80 text-xs font-medium">Context Menus</span>
                    <Circle className="text-info h-4 w-4" />
                  </div>
                </div>

                {/* Topmost layer */}
                <div
                  className="border-border-strong z-tooltip bg-surface-inverse absolute inset-0 flex flex-col justify-between rounded-xl border-2 p-4 shadow-2xl transition-transform duration-300"
                  style={{ transform: 'translate3d(35px, -35px, 135px)' }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-content-inverse text-sm font-bold">
                      Tooltip (z-tooltip)
                    </span>
                    <span className="bg-surface/20 text-content-inverse rounded px-2 py-0.5 font-mono text-[10px] font-bold">
                      z: 1500
                    </span>
                  </div>
                  <div className="border-content-inverse/20 flex items-center justify-between border-t pt-2">
                    <span className="text-content-inverse/80 text-xs font-medium">
                      Topmost Overlays
                    </span>
                    <Eye className="text-content-inverse h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Visual stacked tower */}
            <div className="mb-8 overflow-x-auto py-4">
              <div className="flex min-w-max items-end justify-center gap-1">
                {Z_INDICES.filter((z) => Number(z.value) >= 0).map((z, index, array) => {
                  const height = Z_INDEX_HEIGHT_BASE + index * Z_INDEX_HEIGHT_STEP;
                  const lightness =
                    Z_INDEX_LIGHTNESS_BASE - (index / array.length) * Z_INDEX_LIGHTNESS_RANGE;

                  return (
                    <div key={z.name} className="group relative flex flex-col items-center">
                      <div
                        className="border-primary w-10 rounded-t-md border transition-all group-hover:-translate-y-2 group-hover:shadow-lg sm:w-14 md:w-20"
                        style={{
                          height: `${height}px`,
                          backgroundColor: `oklch(${lightness}% 0.05 277)`,
                        }}
                      />
                      <div className="mt-1 text-center">
                        <div className="text-primary text-[10px] font-bold">{z.value}</div>
                        <div className="text-content-tertiary text-[9px] capitalize">{z.name}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Full table */}
            <div className="border-border-subtle overflow-hidden rounded-xl border">
              <div className="bg-surface-muted text-content-tertiary hidden grid-cols-[60px_1fr_80px_auto] items-center gap-4 px-4 py-2 text-xs font-semibold sm:grid">
                <span>Value</span>
                <span>Name</span>
                <span>Use case</span>
                <span>Class</span>
              </div>
              {Z_INDICES.map((z) => {
                const useCases: Record<string, string> = {
                  hide: 'Hidden elements',
                  base: 'Default stacking',
                  raised: 'Slightly above base',
                  sticky: 'Sticky headers',
                  fixed: 'Fixed navbars',
                  dropdown: 'Dropdown menus',
                  overlay: 'Backdrop overlays',
                  modal: 'Modal dialogs',
                  popover: 'Popovers / tooltips',
                  toast: 'Toast notifications',
                  tooltip: 'Topmost tooltips',
                };

                return (
                  <div
                    key={z.name}
                    className="border-border-subtle hover:bg-primary-subtle/40 flex flex-wrap items-center gap-2 border-t px-4 py-3 transition-colors sm:grid sm:grid-cols-[60px_1fr_80px_auto] sm:gap-4"
                  >
                    <span className="text-primary font-mono text-sm font-bold">{z.value}</span>
                    <span className="text-content-primary text-sm font-medium capitalize">
                      {z.name}
                    </span>
                    <span className="text-content-muted hidden text-xs sm:block">
                      {useCases[z.name] ?? ''}
                    </span>
                    {chip(z.class)}
                  </div>
                );
              })}
            </div>
          </SectionCard>

          {/* ═══════ 12 · BLUR ═══════ */}
          <SectionCard>
            <SectionHeader
              description="Gaussian blur filters from none to 3xl."
              id="blur"
              title="Blur"
            />
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {BLURS.map((b) => (
                <div key={b.name} className="text-center">
                  <div className="from-primary to-info relative mx-auto mb-3 h-20 w-20 overflow-hidden rounded-xl bg-gradient-to-br">
                    <div
                      className={`${b.class} absolute inset-0 flex items-center justify-center text-2xl font-bold text-white`}
                    >
                      Ab
                    </div>
                  </div>
                  <div className="text-content-secondary text-xs font-medium">{b.name}</div>
                  {chip(b.class)}
                </div>
              ))}
            </div>
          </SectionCard>

          {/* ═══════ 13 · BREAKPOINTS ═══════ */}
          <SectionCard>
            <SectionHeader
              description="Mobile-first responsive breakpoints. Prefix utilities to apply at a given screen width and above."
              id="breakpoints"
              title="Breakpoints"
            />

            {/* Visual device-width comparison */}
            <div className="mb-8 space-y-3">
              {BREAKPOINTS.map((bp) => {
                const pxValue = Number.parseInt(bp.value);
                const maxPx = 1536;
                const barPct = Math.min((pxValue / maxPx) * 100, 100);
                const deviceIcons: Record<string, string> = {
                  xs: '📱',
                  sm: '📱',
                  md: '📲',
                  lg: '💻',
                  xl: '🖥️',
                  '2xl': '🖥️',
                };

                return (
                  <div key={bp.name} className="group">
                    <div className="mb-1 flex items-center gap-3">
                      <span className="text-xl">{deviceIcons[bp.name]}</span>
                      <span className="text-primary w-10 font-mono text-sm font-bold">
                        {bp.name}
                      </span>
                      <span className="text-content-secondary text-sm font-medium">{bp.desc}</span>
                      <span className="text-content-muted ml-auto text-xs font-medium">
                        ≥ {bp.value}
                      </span>
                    </div>
                    <div className="bg-surface-muted relative h-8 w-full overflow-hidden rounded-lg">
                      <div
                        className="from-primary-subtle to-primary group-hover:from-primary group-hover:to-primary absolute inset-y-0 left-0 flex items-center justify-end rounded-lg bg-gradient-to-r pr-3 transition-all"
                        style={{ width: `${barPct}%` }}
                      >
                        <span className="text-xs font-bold text-white drop-shadow">{bp.value}</span>
                      </div>
                    </div>
                    <div className="mt-1.5 flex items-center gap-2">
                      {chip(`${bp.name}:`)}
                      <span className="text-content-muted text-xs">
                        → e.g.{' '}
                        <code className="bg-surface-muted text-primary rounded px-1 py-0.5 text-[10px] font-medium">
                          {bp.name}:grid-cols-2
                        </code>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Live responsive demo */}
            <h3 className="text-content-secondary mb-3 text-sm font-semibold">
              Live Responsive Demo
            </h3>
            <div className="border-primary/30 bg-primary-subtle/30 rounded-xl border border-dashed p-4">
              <div className="xs:grid-cols-2 grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {Array.from({ length: 6 }, (_, index) => (
                  <div
                    key={index}
                    className="bg-primary-subtle text-on-primary-subtle flex h-14 items-center justify-center rounded-lg text-xs font-semibold"
                  >
                    Item {index + 1}
                  </div>
                ))}
              </div>
              <p className="text-content-tertiary mt-3 text-center text-xs">
                ↑ Resize your browser to see this grid adapt from 1 → 6 columns
              </p>
            </div>
          </SectionCard>

          {/* ═══════ USAGE EXAMPLES ═══════ */}
          <SectionCard className="border-primary/20 from-primary-subtle/50 to-info-subtle/30 bg-gradient-to-br">
            <SectionHeader
              description="Real-world patterns combining multiple tokens."
              id="examples"
              title="Usage Examples"
            />

            {/* buttons */}
            <h3 className="text-content-secondary mb-3 text-sm font-semibold">Buttons</h3>
            <div className="mb-4 flex flex-wrap gap-3">
              <span className="text-content-tertiary w-full text-xs font-medium">Variants</span>
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
              <Button color="primary" variant="elevated">
                Elevated
              </Button>
              <Button color="primary" variant="surface">
                Surface
              </Button>
              <Button color="primary" variant="text">
                Text
              </Button>
            </div>

            {/* badges */}
            <h3 className="text-content-secondary mb-3 text-sm font-semibold">Badges</h3>
            <div className="mb-8 flex flex-wrap gap-3">
              <span className="border-primary/30 bg-primary-subtle text-on-primary-subtle inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold shadow-xs">
                <span className="bg-primary h-1.5 w-1.5 rounded-full" />
                <span>New Feature</span>
              </span>
              <span className="border-success/30 bg-success-subtle text-on-success-subtle inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold shadow-xs">
                <span className="bg-success h-1.5 w-1.5 rounded-full" />
                <span>Completed</span>
              </span>
              <span className="border-warning/30 bg-warning-subtle text-on-warning-subtle inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold shadow-xs">
                <span className="bg-warning h-1.5 w-1.5 rounded-full" />
                <span>Pending</span>
              </span>
              <span className="border-error/30 bg-error-subtle text-on-error-subtle inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold shadow-xs">
                <span className="bg-dangerh-1.5 w-1.5 rounded-full" />
                <span>Failed</span>
              </span>
              <span className="border-info/30 bg-info-subtle text-on-info-subtle inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold shadow-xs">
                <span className="bg-info h-1.5 w-1.5 rounded-full" />
                <span>Info</span>
              </span>
            </div>

            {/* cards */}
            <h3 className="text-content-secondary mb-3 text-sm font-semibold">Cards</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="group border-primary/20 bg-primary-subtle/40 hover:border-primary/40 relative overflow-hidden rounded-2xl border p-6 shadow-sm transition-all hover:shadow-md">
                <div className="from-primary/10 absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative z-10">
                  <h4 className="text-on-primary-subtle mb-2 font-semibold tracking-tight">
                    Primary Card
                  </h4>
                  <p className="text-on-primary-subtle/80 text-sm">Refined glass effect</p>
                </div>
              </div>
              <div className="group border-success/20 bg-success-subtle/40 hover:border-success/40 relative overflow-hidden rounded-2xl border p-6 shadow-sm transition-all hover:shadow-md">
                <div className="from-success/10 absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative z-10">
                  <h4 className="text-on-success-subtle mb-2 font-semibold tracking-tight">
                    Success Card
                  </h4>
                  <p className="text-on-success-subtle/80 text-sm">Refined glass effect</p>
                </div>
              </div>
              <div className="group border-error/20 bg-error-subtle/40 hover:border-error/40 relative overflow-hidden rounded-2xl border p-6 shadow-sm transition-all hover:shadow-md">
                <div className="from-error/10 absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative z-10">
                  <h4 className="text-on-error-subtle mb-2 font-semibold tracking-tight">
                    Error Card
                  </h4>
                  <p className="text-on-error-subtle/80 text-sm">Refined glass effect</p>
                </div>
              </div>
            </div>
          </SectionCard>
        </main>
      </div>
    </div>
  );
}
