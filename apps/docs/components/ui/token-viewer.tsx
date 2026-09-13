'use client';

import { useState, useMemo } from 'react';
import { Search, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@ideasui/utils';

export type CategoryType =
  | 'All'
  | 'Colors'
  | 'Spacing'
  | 'Typography'
  | 'Radius & Borders'
  | 'Shadows & Layout'
  | 'Effects & Motion';

export type ColorSubCategory = 'All' | 'Semantic' | 'Surface' | 'Content' | 'Borders' | 'Neutral';

export interface TokenItem {
  name: string;
  value: string;
  previewValue?: string;
  tailwindClass: string;
  category: CategoryType;
  subCategory?: ColorSubCategory;
  previewType: 'color' | 'text' | 'spacing' | 'shadow' | 'radius' | 'border-width' | 'code';
}

const CATEGORIES: CategoryType[] = [
  'All',
  'Colors',
  'Spacing',
  'Typography',
  'Radius & Borders',
  'Shadows & Layout',
  'Effects & Motion',
];

const COLOR_SUBCATEGORIES: ColorSubCategory[] = [
  'All',
  'Semantic',
  'Surface',
  'Content',
  'Borders',
  'Neutral',
];

const getSpacingPx = (key: string): string => {
  if (key === 'px') return '1px';
  if (key === '0') return '0px';

  return `${Number.parseInt(key, 10) * 4}px`;
};

const getRadiusPx = (key: string): string => {
  if (key === 'none') return '0px';
  if (key === 'full') return '9999px';

  return '8px';
};

const getSemanticColorTokens = (): TokenItem[] => {
  const items: TokenItem[] = [];
  const intentColors = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'info'];
  const variants = ['', '-subtle', '-muted'];

  for (const intent of intentColors) {
    for (const variant of variants) {
      const colorKey = `${intent}${variant}`;
      const onColorKey = `on-${colorKey}`;

      items.push(
        {
          name: `--ideasui-color-${colorKey}`,
          value: `var(--ideasui-color-${colorKey})`,
          previewValue: `var(--ideasui-color-${colorKey})`,
          tailwindClass: `bg-${colorKey}`,
          category: 'Colors',
          subCategory: 'Semantic',
          previewType: 'color',
        },
        {
          name: `--ideasui-color-${onColorKey}`,
          value: `var(--ideasui-color-${onColorKey})`,
          previewValue: `var(--ideasui-color-${onColorKey})`,
          tailwindClass: `text-${onColorKey}`,
          category: 'Colors',
          subCategory: 'Semantic',
          previewType: 'color',
        },
      );
    }
  }

  return items;
};

const getNeutralColorTokens = (): TokenItem[] => {
  const neutralKeys = [
    'neutral',
    'on-neutral',
    'neutral-subtle',
    'on-neutral-subtle',
    'neutral-muted',
    'on-neutral-muted',
    'common-white',
    'common-black',
  ];

  return neutralKeys.map((key) => ({
    name: `--ideasui-color-${key}`,
    value: `var(--ideasui-color-${key})`,
    previewValue: `var(--ideasui-color-${key})`,
    tailwindClass: key.startsWith('on-') || key.startsWith('common-') ? `text-${key}` : `bg-${key}`,
    category: 'Colors',
    subCategory: 'Neutral',
    previewType: 'color',
  }));
};

const getSurfaceColorTokens = (): TokenItem[] => {
  const surfaceKeys = [
    'background',
    'on-background',
    'surface',
    'on-surface',
    'surface-subtle',
    'surface-muted',
    'surface-strong',
    'surface-inverse',
    'on-surface-inverse',
    'surface-overlay',
  ];

  return surfaceKeys.map((key) => ({
    name: `--ideasui-color-${key}`,
    value: `var(--ideasui-color-${key})`,
    previewValue: `var(--ideasui-color-${key})`,
    tailwindClass: key.startsWith('on-') ? `text-${key}` : `bg-${key}`,
    category: 'Colors',
    subCategory: 'Surface',
    previewType: 'color',
  }));
};

const getContentColorTokens = (): TokenItem[] => {
  const contentKeys = ['primary', 'secondary', 'tertiary', 'muted', 'disabled', 'inverse'];

  return contentKeys.map((key) => ({
    name: `--ideasui-color-content-${key}`,
    value: `var(--ideasui-color-content-${key})`,
    previewValue: `var(--ideasui-color-content-${key})`,
    tailwindClass: `text-content-${key}`,
    category: 'Colors',
    subCategory: 'Content',
    previewType: 'color',
  }));
};

const getBorderColorTokens = (): TokenItem[] => {
  const borderColors = [
    'border',
    'border-base',
    'border-subtle',
    'border-strong',
    'border-focus',
    'border-danger',
  ];

  return borderColors.map((key) => ({
    name: `--ideasui-color-${key}`,
    value: `var(--ideasui-color-${key})`,
    previewValue: `var(--ideasui-color-${key})`,
    tailwindClass: key === 'border' ? 'border-border' : `border-${key}`,
    category: 'Colors',
    subCategory: 'Borders',
    previewType: 'color',
  }));
};

const getSpacingTokens = (): TokenItem[] => {
  const spacingMap: Record<string, string> = {
    px: '1px',
    '0': '0px',
    '1': '0.25rem (4px)',
    '2': '0.5rem (8px)',
    '3': '0.75rem (12px)',
    '4': '1rem (16px)',
    '5': '1.25rem (20px)',
    '6': '1.5rem (24px)',
    '8': '2rem (32px)',
    '10': '2.5rem (40px)',
    '12': '3rem (48px)',
    '16': '4rem (64px)',
    '20': '5rem (80px)',
    '24': '6rem (96px)',
  };

  return Object.entries(spacingMap).map(([key, val]) => ({
    name: `--ideasui-spacing-${key}`,
    value: val,
    previewValue: getSpacingPx(key),
    tailwindClass: `p-${key} / m-${key} / gap-${key}`,
    category: 'Spacing',
    previewType: 'spacing',
  }));
};

const getTypographyTokens = (): TokenItem[] => {
  const fontSizeMap: Record<string, string> = {
    '3xs': '0.5rem (8px)',
    '2xs': '0.625rem (10px)',
    xs: '0.75rem (12px)',
    sm: '0.875rem (14px)',
    base: '1rem (16px)',
    lg: '1.125rem (18px)',
    xl: '1.25rem (20px)',
    '2xl': '1.5rem (24px)',
    '3xl': '1.875rem (30px)',
    '4xl': '2.25rem (36px)',
    '5xl': '3rem (48px)',
    '6xl': '3.75rem (60px)',
    '7xl': '4.5rem (72px)',
    '8xl': '6rem (96px)',
    '9xl': '8rem (128px)',
  };

  const fontFamilyMap: Record<string, string> = {
    sans: 'Inter, ui-sans-serif, system-ui...',
    serif: 'ui-serif, Georgia, Cambria...',
    mono: 'JetBrains Mono, ui-monospace...',
  };

  const trackingMap: Record<string, string> = {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  };

  const fontSizes: TokenItem[] = Object.entries(fontSizeMap).map(([key, val]) => ({
    name: `--ideasui-font-size-${key}`,
    value: val,
    previewValue: val.split(' ')[0],
    tailwindClass: `text-${key}`,
    category: 'Typography',
    previewType: 'text',
  }));

  const fontFamilies: TokenItem[] = Object.entries(fontFamilyMap).map(([key, val]) => ({
    name: `--ideasui-font-${key}`,
    value: val,
    tailwindClass: `font-${key}`,
    category: 'Typography',
    previewType: 'code',
  }));

  const tracking: TokenItem[] = Object.entries(trackingMap).map(([key, val]) => ({
    name: `--ideasui-tracking-${key}`,
    value: val,
    tailwindClass: `tracking-${key}`,
    category: 'Typography',
    previewType: 'text',
  }));

  return [...fontSizes, ...fontFamilies, ...tracking];
};

const getRadiusAndBorderTokens = (): TokenItem[] => {
  const radiusMap: Record<string, string> = {
    none: '0px',
    xs: 'calc(var(--ideasui-radius) * 0.25)',
    sm: 'calc(var(--ideasui-radius) * 0.5)',
    md: 'calc(var(--ideasui-radius) * 0.75)',
    DEFAULT: 'var(--ideasui-radius) (0.5rem)',
    lg: 'calc(var(--ideasui-radius) * 1.25)',
    xl: 'calc(var(--ideasui-radius) * 1.5)',
    '2xl': 'calc(var(--ideasui-radius) * 2)',
    '3xl': 'calc(var(--ideasui-radius) * 3)',
    '4xl': 'calc(var(--ideasui-radius) * 4)',
    full: '9999px',
    input: 'calc(var(--ideasui-radius) * 1.5)',
  };

  const borderWidthMap: Record<string, string> = {
    none: '0px',
    hairline: '0.5px',
    thin: '1px',
    medium: '2px',
    thick: '4px',
    heavy: '8px',
  };

  const radiusTokens: TokenItem[] = Object.entries(radiusMap).map(([key, val]) => ({
    name: key === 'DEFAULT' ? '--ideasui-radius' : `--ideasui-radius-${key}`,
    value: val,
    previewValue: getRadiusPx(key),
    tailwindClass: key === 'DEFAULT' ? 'rounded' : `rounded-${key}`,
    category: 'Radius & Borders',
    previewType: 'radius',
  }));

  const borderWidthTokens: TokenItem[] = Object.entries(borderWidthMap).map(([key, val]) => ({
    name: `--ideasui-border-${key}`,
    value: val,
    previewValue: val,
    tailwindClass: key === 'none' ? 'border-0' : `border-${key}`,
    category: 'Radius & Borders',
    previewType: 'border-width',
  }));

  return [...radiusTokens, ...borderWidthTokens];
};

const getShadowAndLayoutTokens = (): TokenItem[] => {
  const shadowMap: Record<string, string> = {
    none: 'none',
    xs: '0 1px 2px rgb(0 0 0 / 0.05)',
    sm: '0 2px 4px rgb(0 0 0 / 0.06)',
    md: '0 4px 8px rgb(0 0 0 / 0.08)',
    lg: '0 8px 16px rgb(0 0 0 / 0.1)',
    xl: '0 16px 24px rgb(0 0 0 / 0.12)',
    '2xl': '0 24px 48px rgb(0 0 0 / 0.16)',
    inner: 'inset 0 2px 4px rgb(0 0 0 / 0.06)',
  };

  const zIndexMap: Record<string, string> = {
    hide: '-1',
    base: '0',
    raised: '1',
    sticky: '100',
    fixed: '200',
    dropdown: '1000',
    overlay: '1100',
    modal: '1200',
    popover: '1300',
    toast: '1400',
    tooltip: '1500',
  };

  const shadowTokens: TokenItem[] = Object.entries(shadowMap).map(([key, val]) => ({
    name: key === 'none' ? '--ideasui-shadow-none' : `--ideasui-shadow-${key}`,
    value: val,
    previewValue: val,
    tailwindClass: key === 'none' ? 'shadow-none' : `shadow-${key}`,
    category: 'Shadows & Layout',
    previewType: 'shadow',
  }));

  const zIndexTokens: TokenItem[] = Object.entries(zIndexMap).map(([key, val]) => ({
    name: `--ideasui-z-index-${key}`,
    value: val,
    tailwindClass: `z-${key}`,
    category: 'Shadows & Layout',
    previewType: 'code',
  }));

  return [...shadowTokens, ...zIndexTokens];
};

const getEffectAndMotionTokens = (): TokenItem[] => {
  const opacityMap: Record<string, string> = {
    none: '0',
    subtle: '0.04',
    light: '0.08',
    medium: '0.16',
    strong: '0.38',
    heavy: '0.6',
    full: '1',
  };

  const blurMap: Record<string, string> = {
    none: '0px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
    '3xl': '40px',
  };

  const durationMap: Record<string, string> = {
    xs: '75ms',
    sm: '100ms',
    md: '150ms',
    lg: '200ms',
    xl: '300ms',
    '2xl': '500ms',
    '3xl': '700ms',
    '4xl': '1000ms',
  };

  const easeMap: Record<string, string> = {
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
    linear: 'linear',
    accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
    decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
    emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  };

  const opacityTokens: TokenItem[] = Object.entries(opacityMap).map(([key, val]) => ({
    name: `--ideasui-opacity-${key}`,
    value: val,
    tailwindClass: `opacity-${key}`,
    category: 'Effects & Motion',
    previewType: 'code',
  }));

  const blurTokens: TokenItem[] = Object.entries(blurMap).map(([key, val]) => ({
    name: `--ideasui-blur-${key}`,
    value: val,
    tailwindClass: key === 'none' ? 'blur-none' : `blur-${key}`,
    category: 'Effects & Motion',
    previewType: 'code',
  }));

  const durationTokens: TokenItem[] = Object.entries(durationMap).map(([key, val]) => ({
    name: `--ideasui-duration-${key}`,
    value: val,
    tailwindClass: `duration-${key}`,
    category: 'Effects & Motion',
    previewType: 'code',
  }));

  const easeTokens: TokenItem[] = Object.entries(easeMap).map(([key, val]) => ({
    name: `--ideasui-easing-${key}`,
    value: val,
    tailwindClass: `ease-${key}`,
    category: 'Effects & Motion',
    previewType: 'code',
  }));

  return [...opacityTokens, ...blurTokens, ...durationTokens, ...easeTokens];
};

const parseTokens = (): TokenItem[] => [
  ...getSemanticColorTokens(),
  ...getNeutralColorTokens(),
  ...getSurfaceColorTokens(),
  ...getContentColorTokens(),
  ...getBorderColorTokens(),
  ...getSpacingTokens(),
  ...getTypographyTokens(),
  ...getRadiusAndBorderTokens(),
  ...getShadowAndLayoutTokens(),
  ...getEffectAndMotionTokens(),
];

const REM_REGEX = /^([\d.]+)rem$/;
const PX_REGEX = /^([\d.]+)px$/;

const getScaledFontSize = (sizeStr?: string): string => {
  if (!sizeStr) return '14px';

  const trimmed = sizeStr.trim();
  const remMatch = REM_REGEX.exec(trimmed);

  if (remMatch) {
    const rem = Number.parseFloat(remMatch[1]);
    const scaledPx = Math.min(Math.max(12 + (rem - 0.75) * 3.5, 11), 38);

    return `${scaledPx}px`;
  }

  const pxMatch = PX_REGEX.exec(trimmed);

  if (pxMatch) {
    const px = Number.parseFloat(pxMatch[1]);
    const rem = px / 16;
    const scaledPx = Math.min(Math.max(12 + (rem - 0.75) * 3.5, 11), 38);

    return `${scaledPx}px`;
  }

  return '14px';
};

export function TokenViewer() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [selectedSubCategory, setSelectedSubCategory] = useState<ColorSubCategory>('All');
  const [copied, setCopied] = useState<string | null>(null);

  const allTokens = useMemo(() => parseTokens(), []);

  const filteredTokens = useMemo(() => {
    return allTokens.filter((token) => {
      const matchesSearch =
        token.name.toLowerCase().includes(search.toLowerCase()) ||
        token.tailwindClass.toLowerCase().includes(search.toLowerCase()) ||
        token.value.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || token.category === selectedCategory;
      const matchesSubCategory =
        selectedCategory !== 'Colors' ||
        selectedSubCategory === 'All' ||
        token.subCategory === selectedSubCategory;

      return matchesSearch && matchesCategory && matchesSubCategory;
    });
  }, [allTokens, search, selectedCategory, selectedSubCategory]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      setTimeout(() => setCopied(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="not-prose my-6 flex w-full flex-col gap-6 select-none">
      {/* Soft & Smooth Control Card */}
      <div className="bg-background flex flex-col gap-4 rounded-3xl p-4 backdrop-blur-md sm:p-5">
        {/* Search Bar */}
        <div className="group relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center justify-center">
            <Search className="text-content-tertiary group-focus-within:text-primary size-4.5 transition-colors duration-200" />
          </div>
          <input
            className="bg-surface-subtle text-content-primary placeholder:text-content-tertiary focus:bg-surface focus:ring-primary/20 h-11 w-full rounded-2xl pr-4 pl-11 text-sm font-medium transition-all duration-200 outline-none focus:ring-2"
            placeholder="Search tokens, variables or utilities (e.g. '--ideasui-color-primary', 'bg-surface', 'p-4')..."
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Category Controls */}
        <div className="flex flex-col gap-2.5">
          {/* Main Category Segmented Pill Bar */}
          <div className="bg-surface-muted/60 flex w-full max-w-fit [scrollbar-width:none] items-center gap-1 overflow-x-auto rounded-2xl p-1 [&::-webkit-scrollbar]:hidden">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;

              return (
                <button
                  key={category}
                  className={cn(
                    'relative shrink-0 cursor-pointer rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all duration-200',
                    isActive
                      ? 'text-content-primary font-semibold'
                      : 'text-content-tertiary hover:text-content-primary',
                  )}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(category);
                    if (category !== 'Colors') {
                      setSelectedSubCategory('All');
                    }
                  }}
                >
                  {isActive && (
                    <motion.div
                      className="bg-surface absolute inset-0 rounded-xl shadow-xs"
                      layoutId="activeTokenCategory"
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>

          {/* Sub-Category Filter for Colors */}
          <AnimatePresence>
            {selectedCategory === 'Colors' && (
              <motion.div
                animate={{ opacity: 1, height: 'auto', marginTop: 0 }}
                className="bg-surface-muted/60 flex w-fit max-w-full flex-wrap gap-1 rounded-xl p-1"
                exit={{ opacity: 0, height: 0, marginTop: -8 }}
                initial={{ opacity: 0, height: 0, marginTop: -8 }}
              >
                {COLOR_SUBCATEGORIES.map((sub) => {
                  const isActive = selectedSubCategory === sub;

                  return (
                    <button
                      key={sub}
                      className={cn(
                        'relative shrink-0 cursor-pointer rounded-lg px-3 py-1 text-[11px] font-medium transition-all duration-200',
                        isActive
                          ? 'text-content-primary font-semibold'
                          : 'text-content-tertiary hover:text-content-primary',
                      )}
                      type="button"
                      onClick={() => setSelectedSubCategory(sub)}
                    >
                      {isActive && (
                        <motion.div
                          className="bg-surface absolute inset-0 rounded-lg shadow-xs"
                          layoutId="activeTokenSubCategory"
                          transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                        />
                      )}
                      <span className="relative z-10">{sub}</span>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Token Cards Grid */}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filteredTokens.map((token) => (
            <motion.div
              key={`${token.category}-${token.name}-token`}
              layout
              animate={{ opacity: 1, scale: 1 }}
              className="group bg-surface-subtle/50 hover:bg-surface-subtle relative flex cursor-pointer flex-col gap-3 rounded-2xl p-4 transition-all duration-200 hover:scale-[1.01]"
              exit={{ opacity: 0, scale: 0.96 }}
              initial={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              onClick={() => copyToClipboard(token.tailwindClass.split(' / ')[0])}
            >
              {/* Token Preview Canvas */}
              <div
                className={cn(
                  'relative flex h-24 w-full items-center justify-center overflow-hidden rounded-xl',
                  token.previewType === 'color'
                    ? 'bg-[image:repeating-conic-gradient(#e5e7eb_0%_25%,#f9fafb_0%_50%)] [background-size:16px_16px] dark:bg-[image:repeating-conic-gradient(#1f2937_0%_25%,#111827_0%_50%)]'
                    : 'bg-surface-muted/50',
                )}
              >
                {token.previewType === 'color' && (
                  <div
                    className="absolute inset-0 opacity-25 blur-xl"
                    style={{
                      backgroundColor: token.value.startsWith('var(')
                        ? `oklch(${token.value})`
                        : token.value,
                    }}
                  />
                )}
                {token.previewType === 'color' && (
                  <div
                    className="ring-background z-10 size-10 rounded-full shadow-xs ring-1 transition-transform duration-200 group-hover:scale-105"
                    style={{
                      backgroundColor: token.value.startsWith('var(')
                        ? `oklch(${token.value})`
                        : token.value,
                    }}
                  />
                )}
                {token.previewType === 'spacing' && (
                  <div className="flex items-center justify-center">
                    <div
                      className="bg-primary/40 rounded-sm"
                      style={{
                        width: token.previewValue ?? token.value,
                        height: token.previewValue ?? token.value,
                      }}
                    />
                  </div>
                )}
                {token.previewType === 'radius' && (
                  <div
                    className="bg-primary/20 size-11"
                    style={{ borderRadius: token.previewValue ?? '8px' }}
                  />
                )}
                {token.previewType === 'border-width' && (
                  <div
                    className="border-primary size-12 rounded-lg"
                    style={{ borderWidth: token.previewValue ?? '1px' }}
                  />
                )}
                {token.previewType === 'shadow' && (
                  <div
                    className="bg-surface size-10 rounded-xl shadow-sm"
                    style={{ boxShadow: token.previewValue ?? token.value }}
                  />
                )}
                {token.previewType === 'text' && (
                  <div className="flex max-h-full max-w-full flex-col items-center justify-center gap-1 overflow-hidden p-2 text-center">
                    <span
                      className="text-content-primary max-w-full truncate leading-none font-medium tracking-tight"
                      style={{ fontSize: getScaledFontSize(token.previewValue ?? token.value) }}
                    >
                      Aa
                    </span>
                    <span className="text-content-tertiary max-w-full truncate font-mono text-[10px]">
                      {token.value}
                    </span>
                  </div>
                )}
                {token.previewType === 'code' && (
                  <div className="flex max-h-full max-w-full flex-col items-center justify-center gap-1 p-2 text-center">
                    <span className="text-content-primary max-w-full truncate font-mono text-xs font-semibold">
                      {token.value}
                    </span>
                  </div>
                )}
              </div>

              {/* Token Class & Details */}
              <div className="flex flex-col gap-1 px-0.5">
                <span className="bg-primary/10 text-primary w-fit max-w-full truncate rounded-md px-2 py-0.5 font-mono text-[11px] font-semibold">
                  {token.tailwindClass.split(' / ')[0]}
                </span>
                <span
                  className="text-content-tertiary max-w-full truncate font-mono text-[11px]"
                  title={token.name}
                >
                  {token.name}
                </span>
              </div>

              {/* Copy Indicator Icon */}
              <div className="absolute top-3.5 right-3.5 z-20">
                <AnimatePresence mode="wait">
                  {copied === token.tailwindClass.split(' / ')[0] ? (
                    <motion.div
                      key="copied"
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-success/15 text-success rounded-lg p-1.5"
                      exit={{ opacity: 0, scale: 0.8 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                    >
                      <Check className="size-3.5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      animate={{ opacity: 0 }}
                      className="bg-surface-muted/80 text-content-tertiary rounded-lg p-1.5 opacity-0 transition-all duration-150 group-hover:opacity-100"
                      initial={{ opacity: 0 }}
                    >
                      <Copy className="size-3.5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredTokens.length === 0 && (
          <div className="bg-surface-subtle/50 col-span-full flex flex-col items-center justify-center gap-3 rounded-3xl py-14 text-center">
            <Search className="text-content-tertiary size-7" />
            <div className="flex flex-col gap-1">
              <span className="text-content-primary text-base font-semibold">No tokens found</span>
              <span className="text-content-tertiary max-w-sm text-xs">
                No tokens match your search criteria. Try a different keyword like
                &quot;--ideasui-color-primary&quot; or &quot;bg-surface&quot;.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
