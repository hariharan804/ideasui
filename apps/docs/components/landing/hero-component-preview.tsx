'use client';

import { useState } from 'react';
import { Button, ButtonGroup } from '@ideasui/react';
import { ArrowRight, Check, Copy, Sparkles } from 'lucide-react';
import { cn } from '@ideasui/utils';

type VariantOption = 'solid' | 'outline' | 'soft' | 'ghost';
type ColorOption = 'primary' | 'secondary' | 'success' | 'danger';

export function HeroComponentPreview() {
  const [variant, setVariant] = useState<VariantOption>('solid');
  const [color, setColor] = useState<ColorOption>('primary');
  const [copied, setCopied] = useState(false);

  const codeSnippet = `<Button\n  variant="${variant}"\n  color="${color}"\n>\n  Primary Action\n</Button>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-surface border-border-subtle mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border p-4 text-left shadow-md backdrop-blur-2xl sm:mt-16 sm:p-6">
      {/* Top Bar / Dimension Controls */}
      <div className="border-border-subtle/60 flex flex-wrap items-center justify-between gap-2.5 border-b pb-3">
        <div className="flex items-center gap-2">
          <span className="bg-primary-subtle/80 text-primary flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wide sm:px-3 sm:py-1 sm:text-[11px]">
            <Sparkles className="size-3" /> Interactive Playground
          </span>
        </div>

        {/* Dimension Controls */}
        <div className="flex flex-wrap items-center gap-5">
          {/* VARIANT Dimension */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-content-secondary font-mono text-[9px] font-bold tracking-wider uppercase sm:text-[10px]">
              VARIANT
            </span>
            <div className="bg-surface-muted flex items-center gap-px rounded-lg p-0.5">
              {(['solid', 'outline', 'soft', 'ghost'] as const).map((v) => (
                <button
                  key={v}
                  className={cn(
                    'rounded px-2 py-0.5 text-[11px] font-medium capitalize transition-all duration-150 active:scale-95',
                    variant === v
                      ? 'bg-primary text-on-primary font-semibold shadow-xs'
                      : 'text-content-secondary hover:bg-surface-subtle hover:text-content-primary',
                  )}
                  type="button"
                  onClick={() => setVariant(v)}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* COLOR Dimension */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-content-secondary font-mono text-[9px] font-bold tracking-wider uppercase sm:text-[10px]">
              COLOR
            </span>
            <div className="bg-surface-muted flex items-center gap-px rounded-lg p-0.5">
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
                      'rounded px-2 py-0.5 text-[11px] font-medium capitalize transition-all duration-150 active:scale-95',
                      color === c
                        ? cn(colorClasses[c], 'font-semibold shadow-xs')
                        : 'text-content-secondary hover:bg-surface-subtle hover:text-content-primary',
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
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="mt-1">
        {/* Rendered Live Components Area */}
        <div className="bg-surface-subtle/60 border-border-subtle/50 flex min-h-[100px] flex-wrap items-center justify-center gap-3 rounded-xl border px-5 py-4 md:col-span-7">
          <Button color={color} size="md" variant={variant}>
            Primary Action
          </Button>

          <Button
            color={color}
            endIcon={<ArrowRight className="size-4" />}
            size="md"
            variant="outline"
          >
            Next Step
          </Button>

          <ButtonGroup>
            <Button color={color} size="sm" variant={variant}>
              Left
            </Button>
            <Button color={color} size="sm" variant={variant}>
              Right
            </Button>
          </ButtonGroup>
        </div>

        {/* Live Code Snippet Display */}
        <div className="border-border-subtle bg-background relative mt-3 flex flex-col overflow-hidden rounded-xl border font-mono text-xs md:col-span-5">
          <div className="text-content-tertiary border-border-subtle/40 flex items-center justify-between border-b px-4 py-2">
            <span className="text-content-secondary font-mono text-[9px] font-bold tracking-wider uppercase">
              JSX Output
            </span>
            <button
              aria-label="Copy code snippet"
              className="hover:text-content-primary flex items-center gap-1 transition-colors duration-150"
              type="button"
              onClick={handleCopyCode}
            >
              {copied ? (
                <>
                  <Check className="text-success size-3" />
                  <span className="text-success font-sans text-[10px] font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="size-3" />
                  <span className="font-sans text-[10px]">Copy</span>
                </>
              )}
            </button>
          </div>

          <pre className="text-content-primary flex-1 px-4 py-2.5 text-left font-mono text-[11px] leading-[1.7]">
            <div>
              <span className="text-primary/80">&lt;</span>
              <span className="text-primary">Button</span>
            </div>
            <div className="pl-4">
              <span className="text-secondary">variant</span>
              <span className="text-content-tertiary">=</span>
              <span className="text-success">&quot;{variant}&quot;</span>
            </div>
            <div className="pl-4">
              <span className="text-secondary">color</span>
              <span className="text-content-tertiary">=</span>
              <span className="text-success">&quot;{color}&quot;</span>
            </div>
            <div>
              <span className="text-primary/80">&gt;</span>
            </div>
            <div className="pl-4">Primary Action</div>
            <div>
              <span className="text-primary/80">&lt;/</span>
              <span className="text-primary">Button</span>
              <span className="text-primary/80">&gt;</span>
            </div>
          </pre>
        </div>
      </div>
    </div>
  );
}
