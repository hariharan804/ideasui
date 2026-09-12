import { Palette, Zap, Layers, ShieldCheck, Sparkles, Code2, Globe } from 'lucide-react';

/* ─── 7 Strong Primary Claims ───────────────────────────────────────── */
const MARQUEE_ITEMS = [
  {
    label: 'Built for WCAG 2.1 AA',
    icon: <ShieldCheck className="text-content-tertiary size-3 shrink-0" />,
  },
  { label: 'Tree Shakeable', icon: <Zap className="text-content-tertiary size-3 shrink-0" /> },
  { label: '100% Open Source', icon: <Globe className="text-content-tertiary size-3 shrink-0" /> },
  {
    label: 'Tailwind CSS v4',
    icon: <Sparkles className="text-content-tertiary size-3 shrink-0" />,
  },
  { label: 'TypeScript Native', icon: <Code2 className="text-content-tertiary size-3 shrink-0" /> },
  {
    label: 'OKLCH Color Engine',
    icon: <Palette className="text-content-tertiary size-3 shrink-0" />,
  },
  { label: 'CSS Variables', icon: <Layers className="text-content-tertiary size-3 shrink-0" /> },
];

/* Duplicate 4 sets of the 7 items for a seamless translateX(-50%) infinite marquee loop on all screen sizes */
const LOOPING_ITEMS = ['a', 'b', 'c', 'd'].flatMap((set) =>
  MARQUEE_ITEMS.map((item) => ({ ...item, key: `${set}-${item.label}` })),
);

/** Quiet, refined marquee strip displaying key supporting technical claims. */
export function MarqueeStrip() {
  return (
    <section
      aria-label="Technology features"
      className="border-border-subtle/25 bg-surface-subtle/10 relative mt-6 overflow-hidden border-y py-2.5 opacity-80 transition-opacity duration-300 hover:opacity-100 sm:mt-16 sm:py-3.5"
    >
      {/* Visually-hidden accessible list — read once by screen readers */}
      <ul className="sr-only">
        {MARQUEE_ITEMS.map((item) => (
          <li key={item.label}>{item.label}</li>
        ))}
      </ul>

      {/* Edge Blur Fade Masks using CSS Mask */}
      <div
        aria-hidden="true"
        className="group [WebkitMaskImage:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)] flex overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)]"
      >
        <div
          className="flex shrink-0 gap-3 group-hover:[animation-play-state:paused]"
          style={{ animation: 'marquee-left 40s linear infinite' }}
        >
          {LOOPING_ITEMS.map((item) => (
            <div
              key={item.key}
              className="text-content-tertiary bg-surface-subtle/30 border-border-subtle/20 hover:border-border-subtle/50 hover:bg-surface-subtle/60 hover:text-content-secondary flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-medium tracking-wide transition-all duration-150 sm:px-3 sm:py-1 sm:text-[11px]"
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
