import {
  Palette,
  Accessibility,
  Zap,
  Layers,
  ShieldCheck,
  Sparkles,
  Code2,
  Globe,
} from 'lucide-react';

/* ─── Marquee Data ───────────────────────────────────────────────────── */
const MARQUEE_ROW_1 = [
  { label: 'Tailwind CSS v4', icon: <Sparkles className="size-3.5" /> },
  { label: 'OKLCH Color Engine', icon: <Palette className="size-3.5" /> },
  { label: 'React Aria Primitives', icon: <Accessibility className="size-3.5" /> },
  { label: 'WCAG 2.1 AA Compliant', icon: <ShieldCheck className="size-3.5" /> },
  { label: 'TypeScript Native', icon: <Code2 className="size-3.5" /> },
  { label: 'Zero Runtime CSS', icon: <Zap className="size-3.5" /> },
];

const MARQUEE_ROW_2 = [
  { label: 'Tree Shakeable', icon: <Layers className="size-3.5" /> },
  { label: '100% Open Source', icon: <Globe className="size-3.5" /> },
  { label: 'CSS Variables', icon: <Palette className="size-3.5" /> },
  { label: 'Next.js 16 Ready', icon: <Sparkles className="size-3.5" /> },
  { label: 'Vite Compatible', icon: <Zap className="size-3.5" /> },
  { label: 'WAI-ARIA Pattern', icon: <ShieldCheck className="size-3.5" /> },
];

const MARQUEE_ITEMS_1 = ['a', 'b', 'c'].flatMap((set) =>
  MARQUEE_ROW_1.map((item) => ({ ...item, key: `${set}-${item.label}` })),
);

const MARQUEE_ITEMS_2 = ['a', 'b', 'c'].flatMap((set) =>
  MARQUEE_ROW_2.map((item) => ({ ...item, key: `${set}-${item.label}` })),
);

/** Infinite dual-row marquee strip using semantic design tokens. */
export function MarqueeStrip() {
  return (
    <section
      aria-label="Technology features"
      className="bg-surface-subtle/50 border-surface-muted relative overflow-hidden border-y py-6"
    >
      {/* Visually-hidden accessible list — read once by screen readers */}
      <ul className="sr-only">
        {[...MARQUEE_ROW_1, ...MARQUEE_ROW_2].map((item) => (
          <li key={item.label}>{item.label}</li>
        ))}
      </ul>

      {/* Edge Blur Fade Masks */}
      <div className="from-background xs:w-16 pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r to-transparent sm:w-28 lg:w-36" />
      <div className="from-background xs:w-16 pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l to-transparent sm:w-28 lg:w-36" />

      {/* aria-hidden — animated duplicates are decorative only */}
      <div aria-hidden="true" className="flex flex-col gap-3">
        {/* Row 1 — Left Scroll */}
        <div className="flex overflow-hidden">
          <div
            className="flex shrink-0 gap-3"
            style={{ animation: 'marquee-left 40s linear infinite' }}
          >
            {MARQUEE_ITEMS_1.map((item) => (
              <div
                key={item.key}
                className="text-content-tertiary border-surface-muted bg-surface-muted flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium"
              >
                <span className="text-primary">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — Right Scroll */}
        <div className="flex overflow-hidden">
          <div
            className="flex shrink-0 gap-3"
            style={{ animation: 'marquee-right 48s linear infinite' }}
          >
            {MARQUEE_ITEMS_2.map((item) => (
              <div
                key={item.key}
                className="text-content-tertiary border-surface-muted bg-surface-muted flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium"
              >
                <span className="text-secondary">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
