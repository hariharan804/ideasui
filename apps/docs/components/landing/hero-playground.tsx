'use client';

import type { MotionProps } from 'framer-motion';
import { motion, AnimatePresence } from 'framer-motion';
import { Sliders, CheckCircle2, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@ideasui/utils';
import { Button } from '@ideasui/react';

const SMOOTH_EASE = [0.16, 1, 0.3, 1] as const;

const fadeIn = (delay = 0): MotionProps => ({
  initial: { opacity: 0, filter: 'blur(4px)' },
  animate: { opacity: 1, filter: 'blur(0px)' },
  transition: { duration: 0.5, delay, ease: 'easeOut' },
});

type ButtonColor = 'primary' | 'secondary' | 'error' | 'success';
type ButtonVariant = 'solid' | 'outline' | 'soft' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonRadius = 'sm' | 'md' | 'lg' | 'full';

/** Interactive component workbench shown in the hero section using semantic tokens. */
export function HeroPlayground() {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [color, setColor] = useState<ButtonColor>('primary');
  const [variant, setVariant] = useState<ButtonVariant>('solid');
  const [size, setSize] = useState<ButtonSize>('md');
  const [radius, setRadius] = useState<ButtonRadius>('md');
  const [copied, setCopied] = useState(false);

  const generatedCode = `import { Button } from '@ideasui/react';

export default function Example() {
  return (
    <Button color="${color}" variant="${variant}" size="${size}" radius="${radius}">
      Click Me
    </Button>
  );
}`;

  function handleCopyCode() {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative mx-auto mt-12 w-full max-w-3xl text-left sm:mt-20 md:mt-28">
      {/* Dynamic Ambient Glow Halo */}
      <motion.div
        animate={{ scale: [1, 1.03, 1], opacity: [0.4, 0.7, 0.4] }}
        className="perceptual-ambient-glow pointer-events-none absolute -inset-1 rounded-3xl blur-2xl"
        transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
      />

      <div className="bg-surface/90 border-surface-muted relative overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-xl dark:bg-[#0d1117]/90">
        {/* Window Chrome Header */}
        <div className="bg-surface-muted border-surface-muted flex flex-wrap items-center justify-between gap-2.5 border-b px-4 py-3 sm:px-5 sm:py-3.5">
          <div className="flex items-center gap-2">
            <div className="bg-error/80 size-2.5 rounded-full sm:size-3" />
            <div className="bg-warning/80 size-2.5 rounded-full sm:size-3" />
            <div className="bg-success/80 size-2.5 rounded-full sm:size-3" />
            <span className="text-content-muted xs:inline-block ml-2 hidden font-mono text-[11px] tracking-tight sm:text-xs">
              Interactive Component Workbench
            </span>
          </div>

          {/* Smooth Sliding Tab Control */}
          <div className="bg-surface-subtle relative flex items-center rounded-lg p-1">
            {(['preview', 'code'] as const).map((tab) => (
              <button
                key={tab}
                className={cn(
                  'relative z-10 rounded-md px-2.5 py-1 text-xs font-medium capitalize transition-colors duration-200 sm:px-3.5',
                  activeTab === tab
                    ? 'text-content-primary'
                    : 'text-content-muted hover:text-content-secondary',
                )}
                type="button"
                onClick={() => setActiveTab(tab)}
              >
                {activeTab === tab && (
                  <motion.div
                    className="bg-background absolute inset-0 rounded-md shadow-xs"
                    layoutId="activeTabIndicator"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10">
                  {tab === 'preview' ? 'Live Preview' : 'Generated Code'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Controls Toolbar — Touch Scrollable on Mobile */}
        <div className="bg-surface-subtle/40 border-surface-muted border-b px-4 py-2.5 text-xs sm:px-5 sm:py-3">
          <div className="flex scrollbar-none items-center gap-4 overflow-x-auto pb-1 sm:pb-0">
            <div className="flex shrink-0 items-center gap-1.5 pr-1">
              <Sliders className="text-primary size-3.5" />
              <span className="text-content-secondary font-semibold">Props:</span>
            </div>

            {/* Color Prop Selector */}
            <div className="flex shrink-0 items-center gap-1.5">
              <span className="text-content-muted text-[11px]">color:</span>
              <div className="bg-surface-muted relative flex rounded-lg p-0.5">
                {(['primary', 'secondary', 'error', 'success'] as const).map((c) => {
                  const activeColor = {
                    primary: 'text-primary',
                    secondary: 'text-secondary',
                    error: 'text-error',
                    success: 'text-success',
                  }[c];

                  return (
                    <button
                      key={c}
                      className={cn(
                        'rounded-md px-2 py-0.5 text-[11px] font-medium capitalize transition-all duration-150',
                        color === c
                          ? cn('bg-background font-semibold shadow-2xs', activeColor)
                          : 'text-content-muted hover:text-content-primary',
                      )}
                      type="button"
                      onClick={() => setColor(c)}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Variant Prop Selector */}
            <div className="flex shrink-0 items-center gap-1.5">
              <span className="text-content-muted text-[11px]">variant:</span>
              <div className="bg-surface-muted relative flex rounded-lg p-0.5">
                {(['solid', 'outline', 'soft', 'ghost'] as const).map((v) => (
                  <button
                    key={v}
                    className={cn(
                      'rounded-md px-2 py-0.5 text-[11px] font-medium capitalize transition-all duration-150',
                      variant === v
                        ? 'bg-background text-primary font-semibold shadow-2xs'
                        : 'text-content-muted hover:text-content-primary',
                    )}
                    type="button"
                    onClick={() => setVariant(v)}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Prop Selector */}
            <div className="flex shrink-0 items-center gap-1.5">
              <span className="text-content-muted text-[11px]">size:</span>
              <div className="bg-surface-muted relative flex rounded-lg p-0.5">
                {(['sm', 'md', 'lg'] as const).map((s) => (
                  <button
                    key={s}
                    className={cn(
                      'rounded-md px-2 py-0.5 text-[11px] font-medium uppercase transition-all duration-150',
                      size === s
                        ? 'bg-background text-primary font-semibold shadow-2xs'
                        : 'text-content-muted hover:text-content-primary',
                    )}
                    type="button"
                    onClick={() => setSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Radius Prop Selector */}
            <div className="flex shrink-0 items-center gap-1.5">
              <span className="text-content-muted text-[11px]">radius:</span>
              <div className="bg-surface-muted relative flex rounded-lg p-0.5">
                {(['sm', 'md', 'lg', 'full'] as const).map((r) => (
                  <button
                    key={r}
                    className={cn(
                      'rounded-md px-2 py-0.5 text-[11px] font-medium lowercase transition-all duration-150',
                      radius === r
                        ? 'bg-background text-primary font-semibold shadow-2xs'
                        : 'text-content-muted hover:text-content-primary',
                    )}
                    type="button"
                    onClick={() => setRadius(r)}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* View Switcher with Smooth AnimatePresence */}
        <div className="relative min-h-52 sm:min-h-64">
          <AnimatePresence mode="wait">
            {activeTab === 'preview' ? (
              <motion.div
                key="preview-view"
                animate={{ opacity: 1, scale: 1 }}
                className="flex min-h-52 flex-col items-center justify-center gap-5 p-5 sm:min-h-64 sm:p-8"
                exit={{ opacity: 0, scale: 0.98 }}
                initial={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <div className="flex items-center justify-center p-3 sm:p-4">
                  <Button color={color} radius={radius} size={size} variant={variant}>
                    Click Me
                  </Button>
                </div>
                <p className="text-content-muted text-center text-[11px] tracking-wide">
                  Active configuration rendered using live{' '}
                  <code className="text-primary font-mono">@ideasui/react</code> components
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="code-view"
                animate={{ opacity: 1, scale: 1 }}
                className="relative min-h-52 scrollbar-none overflow-x-auto bg-[#0d1117] p-4 font-mono text-xs leading-relaxed text-neutral-300 sm:min-h-64 sm:p-6 sm:text-sm"
                exit={{ opacity: 0, scale: 0.98 }}
                initial={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                {/* Copy Code Button */}
                <button
                  aria-label="Copy generated code"
                  className="bg-surface-subtle/20 hover:bg-surface-subtle/40 text-content-primary absolute top-3.5 right-3.5 flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs backdrop-blur-md transition-all duration-200 active:scale-95 sm:px-3 sm:py-1.5"
                  type="button"
                  onClick={handleCopyCode}
                >
                  {copied ? (
                    <>
                      <Check className="text-success size-3.5" />
                      <span className="text-success font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <pre>
                  <span className="text-secondary">import</span> {'{ Button }'}{' '}
                  <span className="text-secondary">from</span>{' '}
                  <span className="text-success">&apos;@ideasui/react&apos;</span>;{'\n\n'}
                  <span className="text-secondary">export default function</span>{' '}
                  <span className="text-primary">Example</span>() &#123;{'\n'}
                  {'  '}
                  <span className="text-secondary">return</span> ({'\n'}
                  {'    '}
                  <span className="text-primary">&lt;Button</span>{' '}
                  <span className="text-secondary">color=</span>
                  <span className="text-success">&quot;{color}&quot;</span>{' '}
                  <span className="text-secondary">variant=</span>
                  <span className="text-success">&quot;{variant}&quot;</span>{' '}
                  <span className="text-secondary">size=</span>
                  <span className="text-success">&quot;{size}&quot;</span>{' '}
                  <span className="text-secondary">radius=</span>
                  <span className="text-success">&quot;{radius}&quot;</span>
                  <span className="text-primary">&gt;</span>
                  {'\n'}
                  {'      '}Click Me{'\n'}
                  {'    '}
                  <span className="text-primary">&lt;/Button&gt;</span>
                  {'\n'}
                  {'  '});{'\n'}
                  &#125;
                </pre>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Status Bar */}
        <div className="bg-surface-muted border-surface-muted flex flex-col items-center justify-between gap-1 border-t px-4 py-2.5 text-center text-[10px] sm:flex-row sm:gap-0 sm:px-5 sm:text-left sm:text-[11px]">
          <span className="text-content-muted">Tailwind CSS v4 Pure Recipe Output</span>
          <span className="text-success flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="size-3.5" /> React Aria Standard Verified
          </span>
        </div>
      </div>
    </div>
  );
}
