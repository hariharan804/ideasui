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

import { Button } from './button';

/* ───────────────────────────── constants ─────────────────────────── */

const COPY_TIMEOUT = 1500;

const COLOR_PALETTES = [
  'primary',
  'secondary',
  'tertiary',
  'neutral',
  'success',
  'error',
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
  'error',
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
const BORDER_COLOR_TOKENS = ['default', 'subtle', 'strong', 'focus', 'error'] as const;

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
  { id: 'custom', label: 'Custom Tokens (cus)', icon: Palette },
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
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[11px] font-semibold transition-all duration-200 ${
        copied
          ? 'border-success-subtle bg-success-subtle text-success-800 scale-95'
          : 'border-default bg-surface-muted text-content-secondary hover:bg-surface-elevated hover:text-content-primary hover:border-strong hover:shadow-sm'
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
      <h2 className="text-content-primary text-2xl font-bold">{title}</h2>
      <p className="text-content-tertiary mt-1 text-sm">{description}</p>
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
    <div className={`bg-surface-base rounded-3xl p-8 shadow-sm lg:p-10 ${className}`}>
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
  error: {
    '50': 'bg-error-50',
    '100': 'bg-error-100',
    '200': 'bg-error-200',
    '300': 'bg-error-300',
    '400': 'bg-error-400',
    '500': 'bg-error-500',
    '600': 'bg-error-600',
    '700': 'bg-error-700',
    '800': 'bg-error-800',
    '900': 'bg-error-900',
    '950': 'bg-error-950',
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
  default: 'border-default',
  subtle: 'border-subtle',
  strong: 'border-strong',
  focus: 'border-focus',
  error: 'border-error',
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
    <div className="text-content-primary bg-surface-base relative min-h-screen transition-colors duration-500">
      {/* Background Ambience */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden outline-none">
        <div className="bg-primary-500/10 absolute -top-[10%] left-[20%] h-[600px] w-[600px] animate-pulse rounded-full opacity-50 mix-blend-normal blur-3xl transition-all duration-[4000ms] dark:mix-blend-screen" />
        <div className="absolute top-[40%] -right-[10%] h-[500px] w-[500px] animate-pulse rounded-full bg-purple-500/10 opacity-40 mix-blend-normal blur-3xl transition-all delay-700 duration-[4000ms] dark:mix-blend-screen" />
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
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm transition-all duration-200 ${
                    activeSection === s.id
                      ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400 font-bold'
                      : 'text-content-secondary hover:bg-surface-muted hover:text-content-primary'
                  }`}
                  type="button"
                  onClick={() => scrollTo(s.id)}
                >
                  <Icon className="h-4.5 w-4.5 shrink-0" />
                  {s.label}
                  {activeSection === s.id && <ChevronRight className="ml-auto h-4 w-4" />}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* ── main content ── */}
        <main className="min-w-0 flex-1 space-y-12">
          {/* page header */}
          <div className="animate-slideIn mb-10 text-center lg:text-left">
            <h1 className="from-primary-500 bg-gradient-to-r via-indigo-500 to-purple-500 bg-clip-text pb-2 text-5xl font-extrabold tracking-tight text-transparent lg:text-6xl">
              Design System
            </h1>
            <p className="text-content-secondary mt-4 max-w-2xl text-xl">
              Complete token reference for{' '}
              <code className="text-primary-600 bg-primary-500/10 border-primary-500/20 rounded-lg border px-2 py-1 text-sm font-bold shadow-sm">
                @ideasui/theme
              </code>{' '}
              — styled completely with semantic Tailwind utility classes.
            </p>
          </div>

          {/* ═══════ 1 · COLOR PALETTES ═══════ */}
          {/* ═══════ CUSTOM TOKENS (cus) ═══════ */}
          <SectionCard>
            <SectionHeader
              description="Custom design tokens defined in the project's Tailwind config."
              id="custom"
              title="Custom Tokens (cus)"
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Spacing & Layout */}
              <div className="space-y-4">
                <h3 className="text-content-secondary text-sm font-semibold">Layout & Spacing</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-subtle p-cus border-default inline-block border">
                      <div className="bg-primary-500 h-4 w-4" />
                    </div>
                    <span className="text-content-tertiary text-xs">Padding (3px)</span>
                    {chip('p-cus')}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-subtle border-default inline-block border">
                      <div className="bg-primary-500 m-cus h-4 w-4" />
                    </div>
                    <span className="text-content-tertiary text-xs">Margin (3px)</span>
                    {chip('m-cus')}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-cus bg-primary-500 h-10 w-10" />
                    <span className="text-content-tertiary text-xs">Radius (5px)</span>
                    {chip('rounded-cus')}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="border-cus bg-surface-muted h-10 w-10 border" />
                    <span className="text-content-tertiary text-xs">
                      Border Color/Width (1px red)
                    </span>
                    {chip('border-cus')}
                  </div>
                </div>
              </div>

              {/* Typography & Effects */}
              <div className="space-y-4">
                <h3 className="text-content-secondary text-sm font-semibold">
                  Typography & Effects
                </h3>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="font-cus text-cus font-cus tracking-cus leading-none">
                      Custom typography style
                    </p>
                    <div className="flex gap-2">
                      {chip('text-cus')}
                      {chip('font-cus')}
                      {chip('tracking-cus')}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-500 shadow-cus h-10 w-10 rounded-md" />
                    <span className="text-content-tertiary text-xs">Shadow (Red glow)</span>
                    {chip('shadow-cus')}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10">
                      <div className="bg-primary-500 absolute inset-0 rounded-md" />
                      <div className="blur-cus bg-primary-300 absolute inset-0 rounded-md opacity-50" />
                    </div>
                    <span className="text-content-tertiary text-xs">Blur (10px)</span>
                    {chip('blur-cus')}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="opacity-cus bg-primary-500 h-10 w-10 rounded-md" />
                    <div className="bg-primary-500 h-10 w-10 rounded-md" />
                    <span className="text-content-tertiary text-xs">Opacity (0.5)</span>
                    {chip('opacity-cus')}
                  </div>
                </div>
              </div>

              {/* Motion */}
              <div className="space-y-4">
                <h3 className="text-content-secondary text-sm font-semibold">Motion</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="animate-cus bg-primary-500 h-10 w-10 rounded-md">
                      <div className="bg-surface-base h-2 w-full" />
                    </div>
                    <span className="text-content-tertiary text-xs">Animation (Custom Spin)</span>
                    {chip('animate-cus')}
                  </div>
                  <div className="space-y-1">
                    <span className="text-content-tertiary block text-xs">
                      Duration (1s) & Easing (ease-in-out)
                    </span>
                    <div className="flex gap-2">
                      {chip('duration-cus')}
                      {chip('ease-cus')}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-surface-muted relative h-10 w-10 rounded-md border">
                      <div className="z-cus bg-primary-500 absolute -top-2 -left-2 h-6 w-6 rounded-full shadow-md" />
                      <div className="absolute inset-2 z-10 rounded-sm bg-neutral-400" />
                    </div>
                    <span className="text-content-tertiary text-xs">Z-Index (100)</span>
                    {chip('z-cus')}
                  </div>
                </div>
              </div>
            </div>

            {/* Semantic Overrides (Custom) — Showcase how overrides apply */}
            <div className="border-default mt-8 border-t border-dashed pt-8">
              <h3 className="text-content-secondary mb-4 text-sm font-semibold tracking-wider uppercase">
                Semantic Overrides (Custom)
              </h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Surface Override */}
                <div className="space-y-3">
                  <div className="bg-surface-cus text-surface-on-cus border-border-cus flex h-24 w-full flex-col items-center justify-center rounded-xl border-2 font-bold shadow-lg">
                    <span className="text-sm">bg-surface-cus</span>
                    <span className="text-[10px] underline opacity-80">text-surface-on-cus</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {chip('bg-surface-cus')}
                    {chip('text-surface-on-cus')}
                  </div>
                </div>

                {/* Content Override */}
                <div className="space-y-3">
                  <div className="bg-surface-base border-default flex h-24 w-full flex-col items-center justify-center rounded-xl border border-dashed">
                    <span className="text-content-cus text-lg font-black tracking-tight">
                      content-cus
                    </span>
                    <span className="text-content-on-cus text-[10px] font-medium italic">
                      (on-content-cus)
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {chip('text-content-cus')}
                    {chip('text-content-on-cus')}
                  </div>
                </div>

                {/* Border Override */}
                <div className="space-y-3">
                  <div className="bg-surface-muted border-border-cus flex h-24 w-full items-center justify-center rounded-xl border-4 border-double">
                    <span className="text-content-tertiary text-[10px] font-semibold uppercase">
                      border-border-cus
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">{chip('border-border-cus')}</div>
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard>
            <SectionHeader
              description="8 palettes × 11 shades. OKLCH-based, theme-aware."
              id="colors"
              title="Color Palettes"
            />
            <div className="space-y-8">
              <div className="p-3" />
              {COLOR_PALETTES.map((palette) => (
                <div key={palette}>
                  <h3 className="text-content-secondary mb-3 text-sm font-semibold capitalize">
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
                            className={`${bgClass} border-subtle aspect-square w-full rounded-lg border shadow-xs transition-all group-hover:scale-110 group-hover:shadow-md`}
                          />
                          <span className="text-content-tertiary text-[10px] font-medium">
                            {shade}
                          </span>
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
                  <h3 className="text-content-secondary text-sm font-semibold capitalize">
                    {role}
                  </h3>
                  {SEMANTIC_VARIANTS.map((variant) => {
                    const cls = `bg-${role}-${variant}`;
                    const bgClass = SEMANTIC_BG_MAP[role]?.[variant] ?? '';

                    return (
                      <button
                        key={variant}
                        className="group border-subtle flex w-full items-center gap-3 rounded-lg border p-3 transition-all hover:shadow-md"
                        type="button"
                        onClick={() => {
                          void copyToClipboard(cls);
                        }}
                      >
                        <div className={`${bgClass} h-10 w-10 shrink-0 rounded-md shadow-xs`} />
                        <div className="text-left">
                          <div className="text-content-secondary text-xs font-medium capitalize">
                            {variant}
                          </div>
                          <code className="text-content-muted text-[10px]">{cls}</code>
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
                      className="group border-subtle flex w-full items-center gap-3 rounded-lg border p-3 transition-all hover:shadow-md"
                      type="button"
                      onClick={() => {
                        void copyToClipboard(bgCls);
                      }}
                    >
                      <div
                        className={`${SURFACE_BG_MAP[token]} border-subtle h-10 w-10 shrink-0 rounded-md border shadow-xs`}
                      />
                      <div className="text-left">
                        <div className="text-content-secondary text-xs font-medium capitalize">
                          Background
                        </div>
                        <code className="text-content-muted text-[10px]">{bgCls}</code>
                      </div>
                      {copiedClass === bgCls && (
                        <Check className="text-success-500 ml-auto h-3 w-3" />
                      )}
                    </button>

                    {/* Foreground (On-Surface) */}
                    <button
                      className="group border-subtle flex w-full items-center gap-3 rounded-lg border p-3 transition-all hover:shadow-md"
                      type="button"
                      onClick={() => {
                        void copyToClipboard(textCls);
                      }}
                    >
                      <div
                        className={`${SURFACE_BG_MAP[token]} border-subtle flex h-10 w-10 shrink-0 items-center justify-center rounded-md border shadow-xs`}
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
                        <Check className="text-success-500 ml-auto h-3 w-3" />
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
                    className={`border-default rounded-lg border p-4 ${token === 'inverse' ? 'bg-surface-inverse' : ''}`}
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
              <div className="border-default rounded-lg border p-4">
                <p className="text-content-secondary font-sans text-lg">Inter — Sans Serif</p>
                <p className="text-content-tertiary mt-1 font-sans text-sm">
                  ABCDEFGHIJKLM 0123456789
                </p>
                {chip('font-sans')}
              </div>
              <div className="border-default rounded-lg border p-4">
                <p className="text-content-secondary font-serif text-lg">Georgia — Serif</p>
                <p className="text-content-tertiary mt-1 font-serif text-sm">
                  ABCDEFGHIJKLM 0123456789
                </p>
                {chip('font-serif')}
              </div>
              <div className="border-default rounded-lg border p-4">
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
                <div key={fw.name} className="border-default rounded-lg border p-4">
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
                <div key={ls.name} className="border-default rounded-lg border p-4">
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
                  className="border-subtle hover:bg-surface-muted flex items-center gap-4 rounded-lg border px-4 py-2 transition-colors"
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
                    className={`${r.class} border-primary-400 bg-primary-100 h-16 w-16 border-2`}
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
                  className="border-default flex items-center gap-3 rounded-lg border p-4"
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
                    <div
                      className={`${s.class} bg-surface-base mx-auto mb-3 h-20 w-20 rounded-xl`}
                    />
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
                  className="border-default flex items-center gap-3 rounded-lg border p-4"
                >
                  <div className={`${a.class} bg-primary-500 h-8 w-8 min-w-8 rounded-md`} />
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
                      className="bg-primary-400 absolute inset-y-0 left-0 rounded-full"
                      style={{ width: `${(parseInt(d.ms) / 1000) * 100}%` }}
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
                <div key={e.name} className="border-default rounded-lg border p-4">
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
                  className="border-default flex items-center gap-3 rounded-lg border p-4"
                >
                  <div className="relative h-12 w-12 rounded-md bg-[conic-gradient(#e5e7eb_25%,#f9fafb_25%_50%,#e5e7eb_50%_75%,#f9fafb_75%)] bg-[length:8px_8px]">
                    <div className={`${o.class} bg-primary-500 absolute inset-0 rounded-md`} />
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
              className="border-subtle bg-surface-muted relative mb-12 flex h-[500px] w-full items-center justify-center overflow-hidden rounded-xl border"
              style={{ perspective: '1000px' }}
            >
              <h3 className="text-content-muted absolute top-4 left-4 z-0 text-xs font-semibold">
                Static Z-Index Stack
              </h3>

              <div
                className="relative mt-24 h-48 w-64"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'rotateX(55deg) rotateZ(-45deg)',
                }}
              >
                {/* Base layer */}
                <div
                  className="z-base border-subtle bg-surface-base absolute inset-0 flex flex-col justify-between rounded-xl border p-4 shadow-sm"
                  style={{ transform: 'translateZ(0px)' }}
                >
                  <div className="text-content-secondary text-sm font-medium">
                    Base Card(z-base)
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-content-muted text-xs font-bold">z-base</span>
                    <Layers className="text-content-disabled h-4 w-4" />
                  </div>
                </div>

                {/* Overlapping layer 1 */}
                <div
                  className="z-raised bg-primary-50 border-primary-200 absolute inset-0 flex flex-col justify-between rounded-xl border p-4 shadow-md"
                  style={{ transform: 'translateZ(50px)' }}
                >
                  <div className="text-primary-700 text-sm font-medium">
                    Raised Element(z-raised)
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-primary-400 text-xs font-bold">z-raised</span>
                    <Layers2 className="text-primary-300 h-4 w-4" />
                  </div>
                </div>

                {/* Overlapping layer 2 */}
                <div
                  className="z-dropdown bg-info-50 border-info-200 absolute inset-0 flex flex-col justify-between rounded-xl border p-4 shadow-lg"
                  style={{ transform: 'translateZ(100px)' }}
                >
                  <div className="text-info-700 text-sm font-medium">Dropdown Menu(z-dropdown)</div>
                  <div className="flex items-center justify-between">
                    <span className="text-info-400 text-xs font-bold">z-dropdown</span>
                    <Circle className="text-info-300 h-4 w-4" />
                  </div>
                </div>

                {/* Topmost layer */}
                <div
                  className="z-tooltip bg-surface-inverse border-strong absolute inset-0 flex flex-col justify-between rounded-xl border p-4 shadow-xl"
                  style={{ transform: 'translateZ(150px)' }}
                >
                  <div className="text-content-inverse text-sm font-medium">Tooltip(z-tooltip)</div>
                  <div className="flex items-center justify-between">
                    <span className="text-content-muted text-xs font-bold">z-tooltip</span>
                    <Eye className="text-content-muted h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Visual stacked tower */}
            <div className="mb-8 overflow-x-auto py-4">
              <div className="flex min-w-max items-end justify-center gap-1">
                {Z_INDICES.filter((z) => Number(z.value) >= 0).map((z, i, arr) => {
                  const height = Z_INDEX_HEIGHT_BASE + i * Z_INDEX_HEIGHT_STEP;
                  const lightness =
                    Z_INDEX_LIGHTNESS_BASE - (i / arr.length) * Z_INDEX_LIGHTNESS_RANGE;

                  return (
                    <div key={z.name} className="group relative flex flex-col items-center">
                      <div
                        className="border-primary-200 w-10 rounded-t-md border transition-all group-hover:-translate-y-2 group-hover:shadow-lg sm:w-14 md:w-20"
                        style={{
                          height: `${height}px`,
                          backgroundColor: `oklch(${lightness}% 0.05 277)`,
                        }}
                      />
                      <div className="mt-1 text-center">
                        <div className="text-primary-700 text-[10px] font-bold">{z.value}</div>
                        <div className="text-content-tertiary text-[9px] capitalize">{z.name}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Full table */}
            <div className="border-subtle overflow-hidden rounded-xl border">
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
                    className="hover:bg-primary-50/40 border-subtle flex flex-wrap items-center gap-2 border-t px-4 py-3 transition-colors sm:grid sm:grid-cols-[60px_1fr_80px_auto] sm:gap-4"
                  >
                    <span className="text-primary-600 font-mono text-sm font-bold">{z.value}</span>
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
                  <div className="from-primary-400 to-info-400 relative mx-auto mb-3 h-20 w-20 overflow-hidden rounded-xl bg-gradient-to-br">
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
                      <span className="text-content-secondary text-sm font-medium">{bp.desc}</span>
                      <span className="text-content-muted ml-auto text-xs font-medium">
                        ≥ {bp.value}
                      </span>
                    </div>
                    <div className="bg-surface-muted relative h-8 w-full overflow-hidden rounded-lg">
                      <div
                        className="from-primary-300 to-primary-500 group-hover:from-primary-400 group-hover:to-primary-600 absolute inset-y-0 left-0 flex items-center justify-end rounded-lg bg-gradient-to-r pr-3 transition-all"
                        style={{ width: `${barPct}%` }}
                      >
                        <span className="text-xs font-bold text-white drop-shadow">{bp.value}</span>
                      </div>
                    </div>
                    <div className="mt-1.5 flex items-center gap-2">
                      {chip(`${bp.name}:`)}
                      <span className="text-content-muted text-xs">
                        → e.g.{' '}
                        <code className="text-primary-600 bg-surface-muted rounded px-1 py-0.5 text-[10px] font-medium">
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
              <p className="text-content-tertiary mt-3 text-center text-xs">
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
            <h3 className="text-content-secondary mb-3 text-sm font-semibold">Buttons</h3>
            <div className="mb-4 flex flex-wrap gap-3">
              <span className="text-content-tertiary w-full text-xs font-medium">Variants</span>
              <Button color="primary" variant="solid">
                Solid
              </Button>
              <Button color="primary" variant="faded">
                Faded
              </Button>
              <Button color="primary" variant="bordered">
                Bordered
              </Button>
              <Button color="primary" variant="light">
                Light
              </Button>
              <Button color="primary" variant="flat">
                Flat
              </Button>
              <Button color="primary" variant="ghost">
                Ghost
              </Button>
              <Button color="primary" variant="shadow">
                Shadow
              </Button>
            </div>

            {/* badges */}
            <h3 className="text-content-secondary mb-3 text-sm font-semibold">Badges</h3>
            <div className="mb-8 flex flex-wrap gap-3">
              <span className="bg-primary-subtle text-on-primary-subtle border-primary/30 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold shadow-xs">
                <span className="bg-primary h-1.5 w-1.5 rounded-full" />
                New Feature
              </span>
              <span className="bg-success-subtle text-on-success-subtle border-success/30 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold shadow-xs">
                <span className="bg-success h-1.5 w-1.5 rounded-full" />
                Completed
              </span>
              <span className="bg-warning-subtle text-on-warning-subtle border-warning/30 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold shadow-xs">
                <span className="bg-warning h-1.5 w-1.5 rounded-full" />
                Pending
              </span>
              <span className="bg-error-subtle text-on-error-subtle border-error/30 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold shadow-xs">
                <span className="bg-error h-1.5 w-1.5 rounded-full" />
                Failed
              </span>
              <span className="bg-info-subtle text-on-info-subtle border-info/30 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold shadow-xs">
                <span className="bg-info h-1.5 w-1.5 rounded-full" />
                Info
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
