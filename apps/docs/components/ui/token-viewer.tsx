'use client';

import { useState, useMemo } from 'react';
import { Search, Copy, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  spacing,
  borderRadius,
  fontSize,
  fontWeight,
  lightShadow,
  opacity,
  blur,
  semantic,
  surface,
  content,
} from '@ideasui/theme/tokens';
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

const parseTokens = (): TokenItem[] => {
  const items: TokenItem[] = [];

  // Colors (Semantic, Surface, Content)
  Object.entries(semantic).forEach(([key, value]) => {
    items.push({
      name: key,
      value: value as string,
      previewValue: value as string,
      tailwindClass: `bg-${key} / text-${key}`,
      category: 'Colors',
      subCategory: 'Semantic',
      previewType: 'color',
    });
  });
  Object.entries(surface).forEach(([key, value]) => {
    items.push({
      name: key,
      value: value as string,
      previewValue: value as string,
      tailwindClass: `bg-${key}`,
      category: 'Colors',
      subCategory: 'Surface',
      previewType: 'color',
    });
  });
  Object.entries(content).forEach(([key, value]) => {
    items.push({
      name: `content-${key}`,
      value: value as string,
      previewValue: value as string,
      tailwindClass: `text-content-${key}`,
      category: 'Colors',
      subCategory: 'Content',
      previewType: 'color',
    });
  });

  // Spacing
  Object.entries(spacing).forEach(([key, value]) => {
    items.push({
      name: key,
      value: value as string,
      previewValue: value as string,
      tailwindClass: `p-${key} / m-${key} / gap-${key}`,
      category: 'Spacing',
      previewType: 'spacing',
    });
  });

  // Typography
  Object.entries(fontSize).forEach(([key, value]) => {
    let displayValue = String(value);
    let previewSize = String(value);

    if (Array.isArray(value)) {
      previewSize = String(value[0]);
      if (typeof value[1] === 'object' && value[1] !== null && 'lineHeight' in value[1]) {
        displayValue = `${value[0]} / ${value[1].lineHeight}`;
      } else {
        displayValue = String(value[0]);
      }
    }

    items.push({
      name: key,
      value: displayValue,
      previewValue: previewSize,
      tailwindClass: `text-${key}`,
      category: 'Typography',
      previewType: 'text',
    });
  });
  Object.entries(fontWeight).forEach(([key, value]) => {
    items.push({
      name: key,
      value: String(value),
      previewValue: String(value),
      tailwindClass: `font-${key}`,
      category: 'Typography',
      previewType: 'text',
    });
  });

  // Radius
  Object.entries(borderRadius).forEach(([key, value]) => {
    items.push({
      name: key,
      value: value as string,
      previewValue: value as string,
      tailwindClass: key === 'DEFAULT' ? 'rounded' : `rounded-${key}`,
      category: 'Radius',
      previewType: 'radius',
    });
  });

  // Shadows
  Object.entries(lightShadow).forEach(([key, value]) => {
    items.push({
      name: key,
      value: value as string,
      previewValue: value as string,
      tailwindClass: key === 'DEFAULT' ? 'shadow' : `shadow-${key}`,
      category: 'Shadows',
      previewType: 'shadow',
    });
  });

  // Effects
  Object.entries(opacity).forEach(([key, value]) => {
    items.push({
      name: key,
      value: String(value),
      previewValue: String(value),
      tailwindClass: `opacity-${key}`,
      category: 'Effects',
      previewType: 'none',
    });
  });
  Object.entries(blur).forEach(([key, value]) => {
    items.push({
      name: key,
      value: value as string,
      previewValue: value as string,
      tailwindClass: key === 'DEFAULT' ? 'blur' : `blur-${key}`,
      category: 'Effects',
      previewType: 'none',
    });
  });

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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="mt-8 flex w-full flex-col gap-8">
      {/* Search & Filter Header */}
      <div className="bg-surface-muted/30 border-border/50 flex flex-col gap-6 rounded-3xl border p-6 shadow-sm backdrop-blur-xl">
        {/* Search */}
        <div className="group relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
            <Search className="text-content-muted group-focus-within:text-primary size-5 transition-colors" />
          </div>
          <input
            className="bg-surface focus:bg-surface focus:border-primary/30 focus:ring-primary/10 text-content-primary placeholder:text-content-muted h-14 w-full rounded-2xl border-2 border-transparent pr-4 pl-12 text-base shadow-sm transition-all outline-none focus:ring-4"
            placeholder="Search tokens or utilities (e.g., 'primary', 'p-4')..."
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-3">
          {/* Primary Category Segmented Control */}
          <div className="bg-surface-muted/50 border-border/50 flex w-fit flex-wrap gap-1 rounded-2xl border p-1">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;

              return (
                <button
                  key={category}
                  className={cn(
                    'focus-visible:ring-primary relative rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors outline-none focus-visible:ring-2',
                    isActive
                      ? 'text-primary'
                      : 'text-content-secondary hover:text-content-primary hover:bg-surface-muted/80',
                  )}
                  onClick={() => {
                    setSelectedCategory(category);
                    if (category !== 'Colors') {
                      setSelectedSubCategory('All');
                    }
                  }}
                >
                  {isActive && (
                    <motion.div
                      className="bg-surface border-border/40 absolute inset-0 rounded-xl border shadow-sm"
                      layoutId="activeCategory"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>

          {/* Sub-Category Segmented Control for Colors */}
          <AnimatePresence>
            {selectedCategory === 'Colors' && (
              <motion.div
                animate={{ opacity: 1, height: 'auto', marginTop: 0 }}
                className="bg-surface-muted/30 border-border/30 flex w-fit flex-wrap gap-1 rounded-2xl border p-1"
                exit={{ opacity: 0, height: 0, marginTop: -12 }}
                initial={{ opacity: 0, height: 0, marginTop: -12 }}
              >
                {['All', 'Semantic', 'Surface', 'Content'].map((sub) => {
                  const isActive = selectedSubCategory === sub;

                  return (
                    <button
                      key={sub}
                      className={cn(
                        'focus-visible:ring-primary relative rounded-xl px-4 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2',
                        isActive
                          ? 'text-primary'
                          : 'text-content-secondary hover:text-content-primary hover:bg-surface-muted/80',
                      )}
                      onClick={() =>
                        setSelectedSubCategory(sub as 'All' | 'Semantic' | 'Surface' | 'Content')
                      }
                    >
                      {isActive && (
                        <motion.div
                          className="bg-surface border-border/40 absolute inset-0 rounded-xl border shadow-sm"
                          layoutId="activeSubCategory"
                          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
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

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filteredTokens.map((token, idx) => (
            <motion.div
              key={`${token.category}-${token.name}`}
              layout
              animate={{ opacity: 1, scale: 1 }}
              className="group border-border/60 bg-surface hover:border-primary/40 relative flex cursor-pointer flex-col gap-4 overflow-hidden rounded-2xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg"
              exit={{ opacity: 0, scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={() => copyToClipboard(token.tailwindClass.split(' / ')[0])}
            >
              {/* Background Glow */}
              <div className="from-primary/0 via-primary/0 to-primary/5 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-100" />

              {/* Preview Area */}
              <div className="bg-surface-muted/40 border-border/40 relative flex h-20 w-full items-center justify-center overflow-hidden rounded-xl border">
                {token.previewType === 'color' && (
                  <div
                    className="absolute inset-0 opacity-20 blur-xl"
                    style={{
                      backgroundColor: token.value.startsWith('var(')
                        ? `oklch(${token.value})`
                        : token.value,
                    }}
                  />
                )}
                {token.previewType === 'color' && (
                  <div
                    className="border-border/20 z-10 size-12 rounded-full border shadow-md"
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
                      className="bg-primary/40 border-primary/60 rounded-sm border"
                      style={{
                        width: token.previewValue || token.value,
                        height: token.previewValue || token.value,
                      }}
                    />
                  </div>
                )}
                {token.previewType === 'radius' && (
                  <div
                    className="bg-primary/20 border-primary/40 size-12 border-2"
                    style={{ borderRadius: token.previewValue || token.value }}
                  />
                )}
                {token.previewType === 'shadow' && (
                  <div
                    className="bg-surface border-border/30 size-10 rounded-xl border"
                    style={{ boxShadow: token.previewValue || token.value }}
                  />
                )}
                {token.previewType === 'text' && token.tailwindClass.startsWith('text-') && (
                  <span
                    className="text-content-primary truncate px-4 font-medium tracking-tight"
                    style={{ fontSize: token.previewValue || token.value }}
                  >
                    Aa
                  </span>
                )}
                {token.previewType === 'text' && token.tailwindClass.startsWith('font-') && (
                  <span
                    className="text-content-primary text-2xl tracking-tight"
                    style={{ fontWeight: token.previewValue || token.value }}
                  >
                    Aa
                  </span>
                )}
                {token.previewType === 'none' && (
                  <span className="text-content-tertiary font-mono text-xs tracking-widest uppercase">
                    Effect
                  </span>
                )}
              </div>

              {/* Token Details */}
              <div className="z-10 flex flex-col gap-1">
                <span className="text-primary bg-primary/10 text-primary w-fit truncate rounded-md px-2 py-1 font-mono text-xs font-bold">
                  {token.tailwindClass.split(' / ')[0]}
                </span>
                <span className="text-content-tertiary mt-1 truncate font-mono text-xs">
                  {token.name}
                </span>
              </div>

              {/* Copy Indicator */}
              <div className="absolute top-4 right-4 z-20">
                <AnimatePresence mode="wait">
                  {copied === token.tailwindClass.split(' / ')[0] ? (
                    <motion.div
                      key="copied"
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-success text-on-success rounded-full p-1.5 shadow-sm"
                      exit={{ opacity: 0, scale: 0.5 }}
                      initial={{ opacity: 0, scale: 0.5 }}
                    >
                      <CheckCircle2 className="size-3.5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      animate={{ opacity: 0 }}
                      className="bg-surface-strong text-content-primary rounded-full p-1.5 opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
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
          <div className="border-border/60 bg-surface-muted/20 col-span-full flex flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed py-16 text-center">
            <Search className="text-content-muted size-8" />
            <div className="flex flex-col gap-1">
              <span className="text-content-primary text-lg font-semibold">No tokens found</span>
              <span className="text-content-tertiary max-w-sm text-sm">
                {
                  "We couldn't find any tokens matching your search criteria. Try using different keywords."
                }
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
