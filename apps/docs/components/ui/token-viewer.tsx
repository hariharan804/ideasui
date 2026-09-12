'use client';

import { useState, useMemo } from 'react';
import { Search, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const semantic = {
  primary: 'var(--ideasui-color-primary)',
  secondary: 'var(--ideasui-color-secondary)',
  success: 'var(--ideasui-color-success)',
  warning: 'var(--ideasui-color-warning)',
  danger: 'var(--ideasui-color-danger)',
  info: 'var(--ideasui-color-info)',
};
const surface = {
  surface: 'var(--ideasui-color-surface)',
  'surface-subtle': 'var(--ideasui-color-surface-subtle)',
  'surface-muted': 'var(--ideasui-color-surface-muted)',
  'surface-strong': 'var(--ideasui-color-surface-strong)',
  'surface-inverse': 'var(--ideasui-color-surface-inverse)',
};
const content = {
  primary: 'var(--ideasui-color-content-primary)',
  secondary: 'var(--ideasui-color-content-secondary)',
  tertiary: 'var(--ideasui-color-content-tertiary)',
  muted: 'var(--ideasui-color-content-muted)',
  disabled: 'var(--ideasui-color-content-disabled)',
  inverse: 'var(--ideasui-color-content-inverse)',
};
const spacing = {
  '0': '0',
  '1': '0.25rem',
  '2': '0.5rem',
  '3': '0.75rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '8': '2rem',
  '10': '2.5rem',
  '12': '3rem',
  '16': '4rem',
};
const fontSize = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
};
const fontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};
const borderRadius = {
  none: '0',
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  full: '9999px',
};
const lightShadow = {
  sm: '0 2px 4px rgb(0 0 0 / 0.06)',
  md: '0 4px 8px rgb(0 0 0 / 0.08)',
  lg: '0 8px 16px rgb(0 0 0 / 0.1)',
  xl: '0 16px 24px rgb(0 0 0 / 0.12)',
};
const opacity = {
  none: '0',
  subtle: '0.04',
  light: '0.08',
  medium: '0.16',
  strong: '0.38',
  heavy: '0.6',
  full: '1',
};
const blur = {
  none: '0',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
};

import { cn } from '@ideasui/utils';

type CategoryType = 'All' | 'Colors' | 'Spacing' | 'Typography' | 'Radius' | 'Shadows' | 'Effects';

interface TokenItem {
  name: string;
  value: string;
  previewValue?: string;
  tailwindClass: string;
  category: CategoryType;
  subCategory?: 'Semantic' | 'Surface' | 'Content';
  previewType: 'color' | 'text' | 'spacing' | 'shadow' | 'radius' | 'none';
}

const parseColors = (items: TokenItem[]): void => {
  for (const [key, value] of Object.entries(semantic)) {
    items.push({
      name: key,
      value: value as string,
      previewValue: value as string,
      tailwindClass: `bg-${key} / text-${key}`,
      category: 'Colors',
      subCategory: 'Semantic',
      previewType: 'color',
    });
  }
  for (const [key, value] of Object.entries(surface)) {
    items.push({
      name: key,
      value: value as string,
      previewValue: value as string,
      tailwindClass: `bg-${key}`,
      category: 'Colors',
      subCategory: 'Surface',
      previewType: 'color',
    });
  }
  for (const [key, value] of Object.entries(content)) {
    items.push({
      name: `content-${key}`,
      value: value as string,
      previewValue: value as string,
      tailwindClass: `text-content-${key}`,
      category: 'Colors',
      subCategory: 'Content',
      previewType: 'color',
    });
  }
};

const parseSpacing = (items: TokenItem[]): void => {
  for (const [key, value] of Object.entries(spacing)) {
    items.push({
      name: key,
      value: value as string,
      previewValue: value as string,
      tailwindClass: `p-${key} / m-${key} / gap-${key}`,
      category: 'Spacing',
      previewType: 'spacing',
    });
  }
};

const parseTypography = (items: TokenItem[]): void => {
  for (const [key, value] of Object.entries(fontSize)) {
    let displayValue = String(value);
    let previewSize = String(value);

    if (Array.isArray(value)) {
      previewSize = String(value[0]);
      displayValue =
        typeof value[1] === 'object' && value[1] !== null && 'lineHeight' in value[1]
          ? `${value[0]} / ${value[1].lineHeight}`
          : String(value[0]);
    }

    items.push({
      name: key,
      value: displayValue,
      previewValue: previewSize,
      tailwindClass: `text-${key}`,
      category: 'Typography',
      previewType: 'text',
    });
  }
  for (const [key, value] of Object.entries(fontWeight)) {
    items.push({
      name: key,
      value: String(value),
      previewValue: String(value),
      tailwindClass: `font-${key}`,
      category: 'Typography',
      previewType: 'text',
    });
  }
};

const parseRadiusAndShadows = (items: TokenItem[]): void => {
  for (const [key, value] of Object.entries(borderRadius)) {
    items.push({
      name: key,
      value: value as string,
      previewValue: value as string,
      tailwindClass: key === 'DEFAULT' ? 'rounded' : `rounded-${key}`,
      category: 'Radius',
      previewType: 'radius',
    });
  }
  for (const [key, value] of Object.entries(lightShadow)) {
    items.push({
      name: key,
      value: value as string,
      previewValue: value as string,
      tailwindClass: key === 'DEFAULT' ? 'shadow' : `shadow-${key}`,
      category: 'Shadows',
      previewType: 'shadow',
    });
  }
};

const parseEffects = (items: TokenItem[]): void => {
  for (const [key, value] of Object.entries(opacity)) {
    items.push({
      name: key,
      value: String(value),
      previewValue: String(value),
      tailwindClass: `opacity-${key}`,
      category: 'Effects',
      previewType: 'none',
    });
  }
  for (const [key, value] of Object.entries(blur)) {
    items.push({
      name: `blur-${key}`,
      value: value as string,
      previewValue: value as string,
      tailwindClass: key === 'DEFAULT' ? 'blur' : `blur-${key}`,
      category: 'Effects',
      previewType: 'none',
    });
  }
};

const parseTokens = (): TokenItem[] => {
  const items: TokenItem[] = [];

  parseColors(items);
  parseSpacing(items);
  parseTypography(items);
  parseRadiusAndShadows(items);
  parseEffects(items);

  return items;
};

const CATEGORIES: CategoryType[] = [
  'All',
  'Colors',
  'Spacing',
  'Typography',
  'Radius',
  'Shadows',
  'Effects',
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

  return '16px';
};

export function TokenViewer() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [selectedSubCategory, setSelectedSubCategory] = useState<
    'All' | 'Semantic' | 'Surface' | 'Content'
  >('All');
  const [copied, setCopied] = useState<string | null>(null);

  const allTokens = useMemo(() => parseTokens(), []);

  const filteredTokens = useMemo(() => {
    return allTokens.filter((token) => {
      const matchesSearch =
        token.name.toLowerCase().includes(search.toLowerCase()) ||
        token.tailwindClass.toLowerCase().includes(search.toLowerCase());
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
      <div className="bg-surface-subtle/50 flex flex-col gap-4 rounded-3xl p-4 backdrop-blur-md sm:p-5">
        {/* Search Bar */}
        <div className="group relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center justify-center">
            <Search className="text-content-tertiary group-focus-within:text-primary size-4.5 transition-colors duration-200" />
          </div>
          <input
            className="bg-surface/80 text-content-primary placeholder:text-content-tertiary focus:bg-surface focus:ring-primary/20 h-11 w-full rounded-2xl pr-4 pl-11 text-sm font-medium transition-all duration-200 outline-none focus:ring-2"
            placeholder="Search tokens or utilities (e.g. 'primary', 'p-4')..."
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
                className="bg-surface-muted/60 flex w-fit max-w-full gap-1 rounded-xl p-1"
                exit={{ opacity: 0, height: 0, marginTop: -8 }}
                initial={{ opacity: 0, height: 0, marginTop: -8 }}
              >
                {['All', 'Semantic', 'Surface', 'Content'].map((sub) => {
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
                      onClick={() =>
                        setSelectedSubCategory(sub as 'All' | 'Semantic' | 'Surface' | 'Content')
                      }
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
              key={`${token.category}-${token.tailwindClass}-token`}
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
                    style={{ borderRadius: token.previewValue ?? token.value }}
                  />
                )}
                {token.previewType === 'shadow' && (
                  <div
                    className="bg-surface size-10 rounded-xl shadow-sm"
                    style={{ boxShadow: token.previewValue ?? token.value }}
                  />
                )}
                {token.previewType === 'text' && token.tailwindClass.startsWith('text-') && (
                  <div className="flex max-h-full max-w-full flex-col items-center justify-center gap-1 overflow-hidden p-2 text-center">
                    <span
                      className="text-content-primary max-w-full truncate leading-none font-medium tracking-tight"
                      style={{ fontSize: getScaledFontSize(token.previewValue ?? token.value) }}
                    >
                      Aa
                    </span>
                    <span className="text-content-tertiary max-w-full truncate font-mono text-[10px]">
                      {token.previewValue ?? token.value}
                    </span>
                  </div>
                )}
                {token.previewType === 'text' && token.tailwindClass.startsWith('font-') && (
                  <div className="flex max-h-full max-w-full flex-col items-center justify-center gap-1 overflow-hidden p-2 text-center">
                    <span
                      className="text-content-primary max-w-full truncate text-xl leading-none tracking-tight"
                      style={{ fontWeight: token.previewValue ?? token.value }}
                    >
                      Aa
                    </span>
                    <span className="text-content-tertiary max-w-full truncate font-mono text-[10px]">
                      {token.previewValue ?? token.value}
                    </span>
                  </div>
                )}
                {token.previewType === 'none' && (
                  <span className="text-content-tertiary font-mono text-[10px] font-semibold tracking-wider uppercase">
                    Effect
                  </span>
                )}
              </div>

              {/* Token Class & Details */}
              <div className="flex flex-col gap-1 px-0.5">
                <span className="bg-primary/10 text-primary w-fit truncate rounded-md px-2 py-0.5 font-mono text-[11px] font-semibold">
                  {token.tailwindClass.split(' / ')[0]}
                </span>
                <span className="text-content-tertiary truncate font-mono text-xs">
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
                &quot;surface&quot; or &quot;primary&quot;.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
