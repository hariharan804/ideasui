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

/* ───────────────────────────── constants ─────────────────────────── */

const COPY_TIMEOUT = 1500;

const COLOR_PALETTES = [
  'primary',
  'secondary',
  'tertiary',
  'neutral',
  'success',
  'danger',
  'info',
  'warning',
] as const;
const SHADES = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  '950',
] as const;

const SEMANTIC_ROLES = [
  'primary',
  'secondary',
  'tertiary',
  'success',
  'danger',
  'info',
  'warning',
] as const;
const SEMANTIC_VARIANTS = ['base', 'subtle', 'content'] as const;

const SURFACE_TOKENS = ['base', 'elevated', 'muted', 'strong', 'inverse'] as const;
const CONTENT_TOKENS = [
  'primary',
  'secondary',
  'tertiary',
  'muted',
  'disabled',
  'inverse',
] as const;
const BORDER_COLOR_TOKENS = ['default', 'subtle', 'strong', 'focus', 'danger'] as const;

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

const ELEVATIONS = [
  { name: 'Base', desc: 'App background' },
  { name: 'Raised', desc: 'Cards' },
  { name: 'Floating', desc: 'Dropdowns' },
  { name: 'Overlay', desc: 'Overlays' },
  { name: 'Modal', desc: 'Modal dialogs' },
  { name: 'Toast', desc: 'Toast notifications' },
  { name: 'Sunken', desc: 'Inset areas' },
] as const;

const ANIMATIONS = [
  { name: 'spin', class: 'animate-spin' },
  { name: 'ping', class: 'animate-ping' },
  { name: 'pulse', class: 'animate-pulse' },
  { name: 'bounce', class: 'animate-bounce' },
  { name: 'fade-in', class: 'animate-fade-in' },
  { name: 'slide-in', class: 'animate-slide-in' },
  { name: 'scale-in', class: 'animate-scale-in' },
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
  { name: 'xs', value: '320px', desc: 'Small phones' },
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
  { name: 'heavy', value: '8px' },
] as const;

/* ─────────────── magic numbers ─────────────── */

const SHADOW_Y_MULTIPLIER = 4;
const SHADOW_BLUR_MULTIPLIER = 8;
const SHADOW_SPREAD_MULTIPLIER = 2;
const SHADOW_OPACITY_BASE = 0.05;
const SHADOW_OPACITY_STEP = 0.03;

const Z_INDEX_HEIGHT_BASE = 40;
const Z_INDEX_HEIGHT_STEP = 20;
const Z_INDEX_LIGHTNESS_BASE = 95;
const Z_INDEX_LIGHTNESS_RANGE = 50;

function scrollTo(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ─────────────── navigation sections ─────────────── */

const NAV_SECTIONS = [
  { id: 'colors', label: 'Color Palettes', icon: Palette },
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
  text: string;
  copied: boolean;
  onCopy: () => void;
}): JSX.Element {
  return (
    <button
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-xs transition-all ${
        copied
          ? 'border-success-300 bg-success-50 text-success-700'
          : 'border-neutral-200 bg-neutral-50 text-neutral-600 hover:bg-neutral-100'
      }`}
      type="button"
      onClick={onCopy}
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? 'Copied!' : text}
    </button>
  );
}

function SectionHeader({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}): JSX.Element {
  return (
    <div className="mb-6" id={id}>
      <h2 className="text-2xl font-bold text-neutral-900">{title}</h2>
      <p className="mt-1 text-sm text-neutral-500">{description}</p>
    </div>
  );
}

function SectionCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}): JSX.Element {
  return (
    <div
      className={`rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:p-8 ${className}`}
    >
      {children}
    </div>
  );
}

/* ──────────────────────────── COLOR SWATCH MAPS ──────────────────── */

const COLOR_BG_MAP: Record<string, Record<string, string>> = {
  primary: {
    '50': 'bg-primary-50',
    '100': 'bg-primary-100',
    '200': 'bg-primary-200',
    '300': 'bg-primary-300',
    '400': 'bg-primary-400',
    '500': 'bg-primary-500',
    '600': 'bg-primary-600',
    '700': 'bg-primary-700',
    '800': 'bg-primary-800',
    '900': 'bg-primary-900',
    '950': 'bg-primary-950',
  },
  neutral: {
    '50': 'bg-neutral-50',
    '100': 'bg-neutral-100',
    '200': 'bg-neutral-200',
    '300': 'bg-neutral-300',
    '400': 'bg-neutral-400',
    '500': 'bg-neutral-500',
    '600': 'bg-neutral-600',
    '700': 'bg-neutral-700',
    '800': 'bg-neutral-800',
    '900': 'bg-neutral-900',
    '950': 'bg-neutral-950',
  },
  success: {
    '50': 'bg-success-50',
    '100': 'bg-success-100',
    '200': 'bg-success-200',
    '300': 'bg-success-300',
    '400': 'bg-success-400',
    '500': 'bg-success-500',
    '600': 'bg-success-600',
    '700': 'bg-success-700',
    '800': 'bg-success-800',
    '900': 'bg-success-900',
    '950': 'bg-success-950',
  },
  danger: {
    '50': 'bg-danger-50',
    '100': 'bg-danger-100',
    '200': 'bg-danger-200',
    '300': 'bg-danger-300',
    '400': 'bg-danger-400',
    '500': 'bg-danger-500',
    '600': 'bg-danger-600',
    '700': 'bg-danger-700',
    '800': 'bg-danger-800',
    '900': 'bg-danger-900',
    '950': 'bg-danger-950',
  },
  info: {
    '50': 'bg-info-50',
    '100': 'bg-info-100',
    '200': 'bg-info-200',
    '300': 'bg-info-300',
    '400': 'bg-info-400',
    '500': 'bg-info-500',
    '600': 'bg-info-600',
    '700': 'bg-info-700',
    '800': 'bg-info-800',
    '900': 'bg-info-900',
    '950': 'bg-info-950',
  },
  warning: {
    '50': 'bg-warning-50',
    '100': 'bg-warning-100',
    '200': 'bg-warning-200',
    '300': 'bg-warning-300',
    '400': 'bg-warning-400',
    '500': 'bg-warning-500',
    '600': 'bg-warning-600',
    '700': 'bg-warning-700',
    '800': 'bg-warning-800',
    '900': 'bg-warning-900',
    '950': 'bg-warning-950',
  },
  secondary: {
    '50': 'bg-secondary-50',
    '100': 'bg-secondary-100',
    '200': 'bg-secondary-200',
    '300': 'bg-secondary-300',
    '400': 'bg-secondary-400',
    '500': 'bg-secondary-500',
    '600': 'bg-secondary-600',
    '700': 'bg-secondary-700',
    '800': 'bg-secondary-800',
    '900': 'bg-secondary-900',
    '950': 'bg-secondary-950',
  },
  tertiary: {
    '50': 'bg-tertiary-50',
    '100': 'bg-tertiary-100',
    '200': 'bg-tertiary-200',
    '300': 'bg-tertiary-300',
    '400': 'bg-tertiary-400',
    '500': 'bg-tertiary-500',
    '600': 'bg-tertiary-600',
    '700': 'bg-tertiary-700',
    '800': 'bg-tertiary-800',
    '900': 'bg-tertiary-900',
    '950': 'bg-tertiary-950',
  },
};

const SEMANTIC_BG_MAP: Record<string, Record<string, string>> = {
  primary: { base: 'bg-primary-base', subtle: 'bg-primary-subtle', content: 'bg-primary-content' },
  success: { base: 'bg-success-base', subtle: 'bg-success-subtle', content: 'bg-success-content' },
  danger: { base: 'bg-danger-base', subtle: 'bg-danger-subtle', content: 'bg-danger-content' },
  info: { base: 'bg-info-base', subtle: 'bg-info-subtle', content: 'bg-info-content' },
  warning: { base: 'bg-warning-base', subtle: 'bg-warning-subtle', content: 'bg-warning-content' },
  secondary: {
    base: 'bg-secondary-base',
    subtle: 'bg-secondary-subtle',
    content: 'bg-secondary-content',
  },
  tertiary: {
    base: 'bg-tertiary-base',
    subtle: 'bg-tertiary-subtle',
    content: 'bg-tertiary-content',
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
  default: 'border-border-default',
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
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

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
      const el = document.getElementById(section.id);

      if (el) {
        sectionRefs.current[section.id] = el;
        observer.observe(el);
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
    <div className="to-primary-50/30 min-h-screen bg-gradient-to-br from-neutral-50 via-white">
      <div className="mx-auto flex max-w-[1440px] gap-8 px-4 py-8 lg:px-8">
        {/* ── sticky sidebar nav ── */}
        <aside className="hidden w-56 shrink-0 lg:block">
          <nav className="sticky top-24 space-y-1">
            <h3 className="mb-4 px-3 text-xs font-semibold tracking-widest text-neutral-400 uppercase">
              Sections
            </h3>
            {NAV_SECTIONS.map((s) => {
              const Icon = s.icon;

              return (
                <button
                  key={s.id}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-all ${
                    activeSection === s.id
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800'
                  }`}
                  type="button"
                  onClick={() => scrollTo(s.id)}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {s.label}
                  {activeSection === s.id && <ChevronRight className="ml-auto h-3 w-3" />}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* ── main content ── */}
        <main className="min-w-0 flex-1 space-y-12">
          {/* page header */}
          <div className="text-center lg:text-left">
            <h1 className="from-primary-600 via-primary-500 to-info-500 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent lg:text-5xl">
              Design System
            </h1>
            <p className="mt-3 text-lg text-neutral-500">
              Complete token reference for{' '}
              <code className="text-primary-600 rounded bg-neutral-100 px-1.5 py-0.5 text-sm font-medium">
                @ideasui/theme
              </code>{' '}
              — all using Tailwind class names.
            </p>
          </div>

          {/* ═══════ 1 · COLOR PALETTES ═══════ */}
          <SectionCard>
            <SectionHeader
              description="8 palettes × 11 shades. OKLCH-based, theme-aware."
              id="colors"
              title="Color Palettes"
            />
            <div className="space-y-8">
              {COLOR_PALETTES.map((palette) => (
                <div key={palette}>
                  <h3 className="mb-3 text-sm font-semibold text-neutral-700 capitalize">
                    {palette}
                  </h3>
                  <div className="grid grid-cols-6 gap-2 sm:grid-cols-11">
                    {SHADES.map((shade) => {
                      const cls = `bg-${palette}-${shade}`;
                      const bgClass = COLOR_BG_MAP[palette]?.[shade] ?? '';

                      return (
                        <button
                          key={shade}
                          className="group flex flex-col items-center gap-1.5"
                          type="button"
                          onClick={() => {
                            void copyToClipboard(cls);
                          }}
                        >
                          <div
                            className={`${bgClass} aspect-square w-full rounded-lg border border-neutral-200/60 shadow-xs transition-all group-hover:scale-110 group-hover:shadow-md`}
                          />
                          <span className="text-[10px] font-medium text-neutral-500">{shade}</span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-2">{chip(`bg-${palette}-500`)}</div>
                </div>
              ))}
            </div>
          </SectionCard>

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
                  <h3 className="text-sm font-semibold text-neutral-700 capitalize">{role}</h3>
                  {SEMANTIC_VARIANTS.map((variant) => {
                    const cls = `bg-${role}-${variant}`;
                    const bgClass = SEMANTIC_BG_MAP[role]?.[variant] ?? '';

                    return (
                      <button
                        key={variant}
                        className="group flex w-full items-center gap-3 rounded-lg border border-neutral-200/60 p-3 transition-all hover:shadow-md"
                        type="button"
                        onClick={() => {
                          void copyToClipboard(cls);
                        }}
                      >
                        <div className={`${bgClass} h-10 w-10 shrink-0 rounded-md shadow-xs`} />
                        <div className="text-left">
                          <div className="text-xs font-medium text-neutral-700 capitalize">
                            {variant}
                          </div>
                          <code className="text-[10px] text-neutral-400">{cls}</code>
                        </div>
                        {copiedClass === cls && (
                          <Check className="text-success-500 ml-auto h-3 w-3" />
                        )}
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
            <h3 className="mb-3 text-sm font-semibold text-neutral-700">Surfaces</h3>
            <div className="mb-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {SURFACE_TOKENS.map((token) => {
                const cls = `bg-surface-${token}`;

                return (
                  <div key={token} className="rounded-xl border border-neutral-200 p-4 text-center">
                    <div
                      className={`${SURFACE_BG_MAP[token]} mx-auto mb-2 h-16 w-full rounded-lg border border-neutral-100 shadow-xs`}
                    />
                    <div className="text-xs font-medium text-neutral-700 capitalize">{token}</div>
                    {chip(cls)}
                  </div>
                );
              })}
            </div>

            {/* content text */}
            <h3 className="mb-3 text-sm font-semibold text-neutral-700">Content (Text)</h3>
            <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {CONTENT_TOKENS.map((token) => {
                const cls = `text-content-${token}`;

                return (
                  <div
                    key={token}
                    className={`rounded-lg border border-neutral-200 p-4 ${token === 'inverse' ? 'bg-neutral-900' : ''}`}
                  >
                    <p className={`${CONTENT_TEXT_MAP[token]} mb-2 text-lg font-semibold`}>
                      The quick brown fox
                    </p>
                    <div className="text-xs text-neutral-400 capitalize">{token}</div>
                    {chip(cls)}
                  </div>
                );
              })}
            </div>

            {/* border colors */}
            <h3 className="mb-3 text-sm font-semibold text-neutral-700">Border Colors</h3>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {BORDER_COLOR_TOKENS.map((token) => {
                const cls = `border-border-${token}`;

                return (
                  <div
                    key={token}
                    className={`${BORDER_COLOR_MAP[token]} rounded-lg border-2 p-4 text-center`}
                  >
                    <div className="text-xs font-medium text-neutral-700 capitalize">{token}</div>
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
            <h3 className="mb-3 text-sm font-semibold text-neutral-700">Font Families</h3>
            <div className="mb-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-neutral-200 p-4">
                <p className="font-sans text-lg">Inter — Sans Serif</p>
                <p className="mt-1 font-sans text-sm text-neutral-500">ABCDEFGHIJKLM 0123456789</p>
                {chip('font-sans')}
              </div>
              <div className="rounded-lg border border-neutral-200 p-4">
                <p className="font-serif text-lg">Georgia — Serif</p>
                <p className="mt-1 font-serif text-sm text-neutral-500">ABCDEFGHIJKLM 0123456789</p>
                {chip('font-serif')}
              </div>
              <div className="rounded-lg border border-neutral-200 p-4">
                <p className="font-mono text-lg">JetBrains Mono</p>
                <p className="mt-1 font-mono text-sm text-neutral-500">ABCDEFGHIJKLM 0123456789</p>
                {chip('font-mono')}
              </div>
            </div>

            {/* font sizes */}
            <h3 className="mb-3 text-sm font-semibold text-neutral-700">Font Sizes</h3>
            <div className="mb-8 space-y-3 overflow-x-auto">
              {FONT_SIZES.map((size) => (
                <div key={size} className="flex items-baseline gap-4">
                  <span className="w-12 shrink-0 text-right text-xs font-medium text-neutral-400">
                    {size}
                  </span>
                  <span className={`text-${size} font-medium text-neutral-800`}>
                    The quick brown fox
                  </span>
                  {chip(`text-${size}`)}
                </div>
              ))}
            </div>

            {/* font weights */}
            <h3 className="mb-3 text-sm font-semibold text-neutral-700">Font Weights</h3>
            <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {FONT_WEIGHTS.map((fw) => (
                <div key={fw.name} className="rounded-lg border border-neutral-200 p-4">
                  <p className={`${fw.class} text-lg text-neutral-800`}>
                    {fw.name} ({fw.weight})
                  </p>
                  {chip(fw.class)}
                </div>
              ))}
            </div>

            {/* letter spacing */}
            <h3 className="mb-3 text-sm font-semibold text-neutral-700">Letter Spacing</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {LETTER_SPACINGS.map((ls) => (
                <div key={ls.name} className="rounded-lg border border-neutral-200 p-4">
                  <p className={`${ls.class} text-base font-medium text-neutral-700 uppercase`}>
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
                  className="flex items-center gap-4 rounded-lg border border-neutral-100 px-4 py-2 transition-colors hover:bg-neutral-50"
                >
                  <span className="text-primary-600 w-8 text-right font-mono text-sm font-bold">
                    {step.key}
                  </span>
                  <div className="flex-1">
                    <div
                      className="bg-primary-400/80 h-5 rounded"
                      style={{ width: step.px === '0' ? '2px' : step.px }}
                    />
                  </div>
                  <span className="w-12 text-right text-xs font-medium text-neutral-500">
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
                    className={`${r.class} border-primary-400 bg-primary-100 h-16 w-16 border-2`}
                  />
                  <span className="text-[10px] font-medium text-neutral-500">{r.name}</span>
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
                  className="flex items-center gap-3 rounded-lg border border-neutral-200 p-4"
                >
                  <div
                    className="bg-primary-content h-12 w-12 rounded-md"
                    style={{ border: `${b.value} solid` }}
                  />
                  <div>
                    <div className="text-sm font-medium text-neutral-700 capitalize">{b.name}</div>
                    <div className="text-xs text-neutral-400">{b.value}</div>
                    {chip(`border-${b.name}`)}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* ═══════ 8 · SHADOWS & ELEVATION ═══════ */}
          <SectionCard>
            <SectionHeader
              description="Box shadows from xs to 2xl, plus semantic elevation levels."
              id="shadows"
              title="Shadows & Elevation"
            />

            <h3 className="mb-3 text-sm font-semibold text-neutral-700">Box Shadows</h3>
            <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {SHADOWS.map((s) => (
                <div key={s.name} className="text-center">
                  <div className={`${s.class} mx-auto mb-3 h-20 w-20 rounded-xl bg-white`} />
                  <div className="text-xs font-medium text-neutral-700">{s.name}</div>
                  {chip(s.class)}
                </div>
              ))}
            </div>

            <h3 className="mb-3 text-sm font-semibold text-neutral-700">Elevation Levels</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {ELEVATIONS.map((e, i) => (
                <div
                  key={e.name}
                  className="rounded-xl border border-neutral-100 bg-white p-4 text-center"
                  style={{
                    boxShadow:
                      i === 0
                        ? 'none'
                        : `0 ${i * SHADOW_Y_MULTIPLIER}px ${
                            i * SHADOW_BLUR_MULTIPLIER
                          }px -${i * SHADOW_SPREAD_MULTIPLIER}px rgb(0 0 0 / ${
                            SHADOW_OPACITY_BASE + i * SHADOW_OPACITY_STEP
                          })`,
                  }}
                >
                  <div className="text-sm font-semibold text-neutral-800">{e.name}</div>
                  <div className="text-xs text-neutral-400">{e.desc}</div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* ═══════ 9 · MOTION ═══════ */}
          <SectionCard>
            <SectionHeader
              description="Keyframe animations, durations, and easing functions."
              id="motion"
              title="Motion & Animation"
            />

            <h3 className="mb-3 text-sm font-semibold text-neutral-700">Animations</h3>
            <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {ANIMATIONS.map((a) => (
                <div
                  key={a.name}
                  className="flex items-center gap-3 rounded-lg border border-neutral-200 p-4"
                >
                  <div className={`${a.class} bg-primary-500 h-8 w-8 rounded-md`} />
                  <div>
                    <div className="text-sm font-medium text-neutral-700">{a.name}</div>
                    {chip(a.class)}
                  </div>
                </div>
              ))}
            </div>

            <h3 className="mb-3 text-sm font-semibold text-neutral-700">Durations</h3>
            <div className="mb-8 space-y-2">
              {DURATIONS.map((d) => (
                <div key={d.name} className="flex items-center gap-4">
                  <span className="w-10 text-right text-xs font-medium text-neutral-400">
                    {d.name}
                  </span>
                  <div className="relative h-3 w-full max-w-xs overflow-hidden rounded-full bg-neutral-100">
                    <div
                      className="bg-primary-400 absolute inset-y-0 left-0 rounded-full"
                      style={{ width: `${(parseInt(d.ms) / 1000) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-neutral-500">{d.ms}</span>
                  {chip(d.class)}
                </div>
              ))}
            </div>

            <h3 className="mb-3 text-sm font-semibold text-neutral-700">Easing Functions</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {EASINGS.map((e) => (
                <div key={e.name} className="rounded-lg border border-neutral-200 p-4">
                  <div className="mb-2 text-sm font-medium text-neutral-700 capitalize">
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
                  className="flex items-center gap-3 rounded-lg border border-neutral-200 p-4"
                >
                  <div className="relative h-12 w-12 rounded-md bg-[conic-gradient(#e5e7eb_25%,#f9fafb_25%_50%,#e5e7eb_50%_75%,#f9fafb_75%)] bg-[length:8px_8px]">
                    <div className={`${o.class} bg-primary-500 absolute inset-0 rounded-md`} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-neutral-700 capitalize">{o.name}</div>
                    <div className="text-xs text-neutral-400">{o.value}</div>
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

            {/* Visual stacked tower */}
            <div className="mb-8 flex items-end justify-center gap-1 py-4">
              {Z_INDICES.filter((z) => Number(z.value) >= 0).map((z, i, arr) => {
                const height = Z_INDEX_HEIGHT_BASE + i * Z_INDEX_HEIGHT_STEP;
                const lightness =
                  Z_INDEX_LIGHTNESS_BASE - (i / arr.length) * Z_INDEX_LIGHTNESS_RANGE;

                return (
                  <div key={z.name} className="group relative flex flex-col items-center">
                    <div
                      className="border-primary-200 w-14 rounded-t-md border transition-all group-hover:-translate-y-2 group-hover:shadow-lg sm:w-20"
                      style={{
                        height: `${height}px`,
                        backgroundColor: `oklch(${lightness}% 0.05 277)`,
                      }}
                    />
                    <div className="mt-1 text-center">
                      <div className="text-primary-700 text-[10px] font-bold">{z.value}</div>
                      <div className="text-[9px] text-neutral-500 capitalize">{z.name}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Full table */}
            <div className="overflow-hidden rounded-xl border border-neutral-200">
              <div className="grid grid-cols-[60px_1fr_80px_auto] items-center gap-4 bg-neutral-50 px-4 py-2 text-xs font-semibold text-neutral-500">
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
                    className="hover:bg-primary-50/40 grid grid-cols-[60px_1fr_80px_auto] items-center gap-4 border-t border-neutral-100 px-4 py-3 transition-colors"
                  >
                    <span className="text-primary-600 font-mono text-sm font-bold">{z.value}</span>
                    <span className="text-sm font-medium text-neutral-800 capitalize">
                      {z.name}
                    </span>
                    <span className="text-xs text-neutral-400">{useCases[z.name] ?? ''}</span>
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
                  <div className="from-primary-400 to-info-400 relative mx-auto mb-3 h-20 w-20 overflow-hidden rounded-xl bg-gradient-to-br">
                    <div
                      className={`${b.class} absolute inset-0 flex items-center justify-center text-2xl font-bold text-white`}
                    >
                      Ab
                    </div>
                  </div>
                  <div className="text-xs font-medium text-neutral-700">{b.name}</div>
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
                const pxVal = parseInt(bp.value);
                const maxPx = 1536;
                const barPct = Math.min((pxVal / maxPx) * 100, 100);
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
                      <span className="text-primary-600 w-10 font-mono text-sm font-bold">
                        {bp.name}
                      </span>
                      <span className="text-sm font-medium text-neutral-700">{bp.desc}</span>
                      <span className="ml-auto text-xs font-medium text-neutral-400">
                        ≥ {bp.value}
                      </span>
                    </div>
                    <div className="relative h-8 w-full overflow-hidden rounded-lg bg-neutral-100">
                      <div
                        className="from-primary-300 to-primary-500 group-hover:from-primary-400 group-hover:to-primary-600 absolute inset-y-0 left-0 flex items-center justify-end rounded-lg bg-gradient-to-r pr-3 transition-all"
                        style={{ width: `${barPct}%` }}
                      >
                        <span className="text-xs font-bold text-white drop-shadow">{bp.value}</span>
                      </div>
                    </div>
                    <div className="mt-1.5 flex items-center gap-2">
                      {chip(`${bp.name}:`)}
                      <span className="text-xs text-neutral-400">
                        → e.g.{' '}
                        <code className="text-primary-600 rounded bg-neutral-100 px-1 py-0.5 text-[10px] font-medium">
                          {bp.name}:grid-cols-2
                        </code>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Live responsive demo */}
            <h3 className="mb-3 text-sm font-semibold text-neutral-700">Live Responsive Demo</h3>
            <div className="border-primary-300 bg-primary-50/30 rounded-xl border border-dashed p-4">
              <div className="xs:grid-cols-2 grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {Array.from({ length: 6 }, (_, i) => (
                  <div
                    key={i}
                    className="bg-primary-200 text-primary-800 flex h-14 items-center justify-center rounded-lg text-xs font-semibold"
                  >
                    Item {i + 1}
                  </div>
                ))}
              </div>
              <p className="mt-3 text-center text-xs text-neutral-500">
                ↑ Resize your browser to see this grid adapt from 1 → 6 columns
              </p>
            </div>
          </SectionCard>

          {/* ═══════ USAGE EXAMPLES ═══════ */}
          <SectionCard className="border-primary-100 from-primary-50/50 to-info-50/30 bg-gradient-to-br">
            <SectionHeader
              description="Real-world patterns combining multiple tokens."
              id="examples"
              title="Usage Examples"
            />

            {/* buttons */}
            <h3 className="mb-3 text-sm font-semibold text-neutral-700">Buttons</h3>
            <div className="mb-8 flex flex-wrap gap-3">
              <button
                className="bg-primary-500 hover:bg-primary-600 active:bg-primary-700 rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm transition-all"
                type="button"
              >
                Primary
              </button>
              <button
                className="bg-success-500 hover:bg-success-600 rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm transition-all"
                type="button"
              >
                Success
              </button>
              <button
                className="bg-danger-500 hover:bg-danger-600 rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm transition-all"
                type="button"
              >
                Danger
              </button>
              <button
                className="border-primary-500 text-primary-600 hover:bg-primary-50 rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all"
                type="button"
              >
                Outline
              </button>
              <button
                className="text-primary-600 hover:bg-primary-50 rounded-lg px-4 py-2 text-sm font-medium transition-all"
                type="button"
              >
                Ghost
              </button>
            </div>

            {/* badges */}
            <h3 className="mb-3 text-sm font-semibold text-neutral-700">Badges</h3>
            <div className="mb-8 flex flex-wrap gap-3">
              <span className="bg-primary-100 text-primary-800 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
                New Feature
              </span>
              <span className="bg-success-100 text-success-800 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
                Completed
              </span>
              <span className="bg-warning-100 text-warning-800 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
                Pending
              </span>
              <span className="bg-danger-100 text-danger-800 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
                Failed
              </span>
              <span className="bg-info-100 text-info-800 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
                Info
              </span>
            </div>

            {/* cards */}
            <h3 className="mb-3 text-sm font-semibold text-neutral-700">Cards</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="border-primary-200 bg-primary-50 rounded-xl border p-5">
                <h4 className="text-primary-900 mb-1 font-semibold">Primary Card</h4>
                <p className="text-primary-700 text-sm">
                  Uses <code className="text-xs">bg-primary-50 border-primary-200</code>
                </p>
              </div>
              <div className="border-success-200 bg-success-50 rounded-xl border p-5">
                <h4 className="text-success-900 mb-1 font-semibold">Success Card</h4>
                <p className="text-success-700 text-sm">
                  Uses <code className="text-xs">bg-success-50 border-success-200</code>
                </p>
              </div>
              <div className="border-danger-200 bg-danger-50 rounded-xl border p-5">
                <h4 className="text-danger-900 mb-1 font-semibold">Danger Card</h4>
                <p className="text-danger-700 text-sm">
                  Uses <code className="text-xs">bg-danger-50 border-danger-200</code>
                </p>
              </div>
            </div>
          </SectionCard>
        </main>
      </div>
    </div>
  );
}
