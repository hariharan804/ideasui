import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Sun, Moon, Airplay, RotateCcw, Palette, Sliders, Pipette } from 'lucide-react';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '@ideasui/theme';
import { cn } from '@ideasui/utils';

const noop = () => {};
const emptySubscribe = () => noop;

function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export interface ColorPreset {
  readonly id: string;
  readonly name: string;
  readonly oklch: string;
}

export const COLOR_PRESETS: readonly ColorPreset[] = [
  { id: 'indigo', name: 'IdeasUI Indigo', oklch: '0.52 0.24 275' },
  { id: 'linear', name: 'Linear Indigo', oklch: '0.567 0.159 275' },
  { id: 'supabase', name: 'Supabase Green', oklch: '0.762 0.154 159' },
  { id: 'stripe', name: 'Stripe Blurple', oklch: '0.578 0.235 278' },
  { id: 'raycast', name: 'Raycast Coral', oklch: '0.700 0.191 23' },
  { id: 'tailwind', name: 'Tailwind Sky', oklch: '0.754 0.139 233' },
  { id: 'spotify', name: 'Spotify Green', oklch: '0.689 0.187 149' },
  { id: 'whatsapp', name: 'WhatsApp Green', oklch: '0.761 0.201 150' },
  { id: 'instagram', name: 'Instagram Pink', oklch: '0.619 0.200 15' },
  { id: 'facebook', name: 'Facebook Blue', oklch: '0.589 0.203 258' },
  { id: 'figma', name: 'Figma Red', oklch: '0.648 0.208 36' },
  { id: 'openai', name: 'OpenAI Green', oklch: '0.637 0.124 170' },
  { id: 'discord', name: 'Discord Blurple', oklch: '0.577 0.209 274' },
  { id: 'vercel', name: 'Vercel Black', oklch: '0 0 0' },
  { id: 'github', name: 'GitHub Green', oklch: '0.70 0.19 145' },
] as const;

export interface RadiusPreset {
  readonly id: string;
  readonly name: string;
  readonly value: string;
}

export const RADIUS_PRESETS: readonly RadiusPreset[] = [
  { id: 'none', name: 'None', value: '0px' },
  { id: 'xs', name: 'Compact', value: '0.25rem' },
  { id: 'md', name: 'Default', value: '0.5rem' },
  { id: 'lg', name: 'Rounded', value: '0.75rem' },
  { id: 'full', name: 'Pill', value: '1rem' },
] as const;

export interface ThemeCustomizerModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

const STORAGE_KEYS = {
  COLOR: 'ideasui-custom-color-id',
  COLOR_OKLCH: 'ideasui-custom-color-oklch',
  CUSTOM_HEX: 'ideasui-custom-color-hex',
  RADIUS: 'ideasui-custom-radius-id',
  RADIUS_VAL: 'ideasui-custom-radius-val',
} as const;

function sanitizeOklch(val: string): string {
  return val.replace(/^oklch\((.*)\)$/, '$1');
}

/**
 * Converts user picked hex (#rrggbb) into OKLCH space.
 */
function hexToOklch(hex: string): { l: number; c: number; h: number } {
  let cHex = hex.replace('#', '');

  if (cHex.length === 3) {
    cHex = [...cHex].map((char) => char + char).join('');
  }

  const r8 = Number.parseInt(cHex.slice(0, 2), 16) || 0;
  const g8 = Number.parseInt(cHex.slice(2, 4), 16) || 0;
  const b8 = Number.parseInt(cHex.slice(4, 6), 16) || 0;

  const toLinear = (val: number) => {
    const v = val / 255;

    return v > 0.040_45 ? Math.pow((v + 0.055) / 1.055, 2.4) : v / 12.92;
  };

  const lr = toLinear(r8);
  const lg = toLinear(g8);
  const lb = toLinear(b8);

  const l_ = Math.cbrt(0.412_221_470_8 * lr + 0.536_232_536_3 * lg + 0.051_445_992_9 * lb);
  const m_ = Math.cbrt(0.211_903_498_2 * lr + 0.680_699_545_1 * lg + 0.107_396_956_6 * lb);
  const s_ = Math.cbrt(0.088_302_461_9 * lr + 0.281_718_837_6 * lg + 0.629_978_700_5 * lb);

  const L = 0.210_454_255_3 * l_ + 0.793_617_785 * m_ - 0.004_072_046_8 * s_;
  const a = 1.977_998_495_1 * l_ - 2.428_592_205 * m_ + 0.450_593_709_9 * s_;
  const b = 0.025_904_037_1 * l_ + 0.782_771_766_2 * m_ - 0.808_675_797_1 * s_;

  const C = Math.hypot(a, b);
  let H = (Math.atan2(b, a) * 180) / Math.PI;

  if (H < 0) H += 360;

  return { l: L, c: C, h: H };
}

/**
 * Converts user picked hex (#rrggbb) into exact OKLCH space without any validation or clamping.
 */
function getCustomOklch(hex: string): string {
  const { l, c, h } = hexToOklch(hex);

  return `${l.toFixed(2)} ${c.toFixed(2)} ${Math.round(h)}`;
}

interface ColorTileItemProps {
  readonly backgroundColor: string;
  readonly children?: React.ReactNode;
  readonly icon?: React.ReactNode;
  readonly isSelected: boolean;
  readonly label: string;
  readonly onClick?: () => void;
}

function ColorTileItem({
  backgroundColor,
  children,
  icon,
  isSelected,
  label,
  onClick,
}: Readonly<ColorTileItemProps>) {
  return (
    <button
      className={cn(
        'group border-border-subtle/50 relative flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border p-2 text-left transition-all duration-200 active:scale-95 sm:p-2.5',
        isSelected
          ? 'ring-primary border-primary bg-primary-subtle/30 ring-2'
          : 'bg-surface-subtle/40 hover:bg-surface hover:border-border-subtle',
      )}
      type="button"
      onClick={onClick}
    >
      {children}
      <div className="relative flex size-7 items-center justify-center rounded-full shadow-xs sm:size-8">
        <span
          className="absolute inset-0 rounded-full transition-transform duration-200 group-hover:scale-105"
          style={{ backgroundColor }}
        />
        {isSelected ? <Check className="relative z-10 size-4 text-white drop-shadow-xs" /> : icon}
      </div>
      <span className="text-content-primary w-full truncate text-center font-mono text-[10px] font-medium sm:text-[11px]">
        {label}
      </span>
    </button>
  );
}

interface SegmentPillButtonProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly isSelected: boolean;
  readonly onClick: () => void;
}

function SegmentPillButton({
  children,
  className,
  isSelected,
  onClick,
}: Readonly<SegmentPillButtonProps>) {
  return (
    <button
      className={cn(
        'flex cursor-pointer items-center justify-center gap-1.5 rounded-xl transition-all duration-200 active:scale-95',
        isSelected
          ? 'bg-primary text-on-primary shadow-sm'
          : 'bg-surface-subtle/80 text-content-secondary hover:bg-surface hover:text-content-primary',
        className,
      )}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

const MODE_OPTIONS = [
  { id: 'light', label: 'Light', icon: Sun },
  { id: 'dark', label: 'Dark', icon: Moon },
  { id: 'system', label: 'System', icon: Airplay },
] as const;

const ALL_DYNAMIC_COLOR_VARS = [
  // Primary
  '--ideasui-color-primary',
  '--ideasui-color-on-primary',
  '--ideasui-color-primary-subtle',
  '--ideasui-color-on-primary-subtle',
  '--ideasui-color-primary-muted',
  '--ideasui-color-on-primary-muted',
  // Secondary
  '--ideasui-color-secondary',
  '--ideasui-color-on-secondary',
  '--ideasui-color-secondary-subtle',
  '--ideasui-color-on-secondary-subtle',
  '--ideasui-color-secondary-muted',
  '--ideasui-color-on-secondary-muted',
  // Tertiary
  '--ideasui-color-tertiary',
  '--ideasui-color-on-tertiary',
  '--ideasui-color-tertiary-subtle',
  '--ideasui-color-on-tertiary-subtle',
  '--ideasui-color-tertiary-muted',
  '--ideasui-color-on-tertiary-muted',
  // Neutral
  '--ideasui-color-neutral',
  '--ideasui-color-on-neutral',
  '--ideasui-color-neutral-subtle',
  '--ideasui-color-on-neutral-subtle',
  '--ideasui-color-neutral-muted',
  '--ideasui-color-on-neutral-muted',
  // Border Focus
  '--ideasui-color-border-focus',
] as const;

function calculateThemeColorTokens(
  l: number,
  c: number,
  h: number,
  isDark: boolean,
): Record<string, string> {
  const hPrimary = h;
  const hSecondary = (h + 38) % 360;
  const hTertiary = (h + 280) % 360;
  const hNeutral = c > 0.01 ? h : 260;

  if (isDark) {
    const pL = Math.max(l, 0.62);
    const sC = Math.min(c, 0.21);

    return {
      '--ideasui-color-primary': `${pL} ${c} ${hPrimary}`,
      '--ideasui-color-on-primary': `0.14 0.04 ${hPrimary}`,
      '--ideasui-color-primary-subtle': `0.18 0.05 ${hPrimary}`,
      '--ideasui-color-on-primary-subtle': `0.88 0.06 ${hPrimary}`,
      '--ideasui-color-primary-muted': `0.26 0.08 ${hPrimary}`,
      '--ideasui-color-on-primary-muted': `0.84 0.07 ${hPrimary}`,

      '--ideasui-color-secondary': `${pL} ${sC} ${hSecondary}`,
      '--ideasui-color-on-secondary': `0.14 0.04 ${hSecondary}`,
      '--ideasui-color-secondary-subtle': `0.18 0.05 ${hSecondary}`,
      '--ideasui-color-on-secondary-subtle': `0.88 0.06 ${hSecondary}`,
      '--ideasui-color-secondary-muted': `0.26 0.08 ${hSecondary}`,
      '--ideasui-color-on-secondary-muted': `0.84 0.07 ${hSecondary}`,

      '--ideasui-color-tertiary': `0.65 0.14 ${hTertiary}`,
      '--ideasui-color-on-tertiary': `0.14 0.04 ${hTertiary}`,
      '--ideasui-color-tertiary-subtle': `0.18 0.05 ${hTertiary}`,
      '--ideasui-color-on-tertiary-subtle': `0.88 0.06 ${hTertiary}`,
      '--ideasui-color-tertiary-muted': `0.26 0.08 ${hTertiary}`,
      '--ideasui-color-on-tertiary-muted': `0.84 0.07 ${hTertiary}`,

      '--ideasui-color-neutral': `0.65 0.015 ${hNeutral}`,
      '--ideasui-color-on-neutral': `0.145 0.006 ${hNeutral}`,
      '--ideasui-color-neutral-subtle': `0.22 0.012 ${hNeutral}`,
      '--ideasui-color-on-neutral-subtle': `0.88 0.008 ${hNeutral}`,
      '--ideasui-color-neutral-muted': `0.30 0.015 ${hNeutral}`,
      '--ideasui-color-on-neutral-muted': `0.82 0.012 ${hNeutral}`,

      '--ideasui-color-border-focus': `${pL} ${c} ${hPrimary}`,
    };
  }

  const sC = Math.min(c, 0.21);

  return {
    '--ideasui-color-primary': `${l} ${c} ${hPrimary}`,
    '--ideasui-color-on-primary': '1 0 0',
    '--ideasui-color-primary-subtle': `0.96 0.028 ${hPrimary}`,
    '--ideasui-color-on-primary-subtle': `0.38 0.18 ${hPrimary}`,
    '--ideasui-color-primary-muted': `0.92 0.05 ${hPrimary}`,
    '--ideasui-color-on-primary-muted': `0.42 0.20 ${hPrimary}`,

    '--ideasui-color-secondary': `0.46 ${sC} ${hSecondary}`,
    '--ideasui-color-on-secondary': '1 0 0',
    '--ideasui-color-secondary-subtle': `0.96 0.028 ${hSecondary}`,
    '--ideasui-color-on-secondary-subtle': `0.36 0.16 ${hSecondary}`,
    '--ideasui-color-secondary-muted': `0.92 0.05 ${hSecondary}`,
    '--ideasui-color-on-secondary-muted': `0.40 0.18 ${hSecondary}`,

    '--ideasui-color-tertiary': `0.48 0.13 ${hTertiary}`,
    '--ideasui-color-on-tertiary': '1 0 0',
    '--ideasui-color-tertiary-subtle': `0.96 0.025 ${hTertiary}`,
    '--ideasui-color-on-tertiary-subtle': `0.32 0.11 ${hTertiary}`,
    '--ideasui-color-tertiary-muted': `0.92 0.04 ${hTertiary}`,
    '--ideasui-color-on-tertiary-muted': `0.36 0.12 ${hTertiary}`,

    '--ideasui-color-neutral': `0.551 0.015 ${hNeutral}`,
    '--ideasui-color-on-neutral': `0.985 0.002 ${hNeutral}`,
    '--ideasui-color-neutral-subtle': `0.94 0.008 ${hNeutral}`,
    '--ideasui-color-on-neutral-subtle': `0.269 0.009 ${hNeutral}`,
    '--ideasui-color-neutral-muted': `0.88 0.012 ${hNeutral}`,
    '--ideasui-color-on-neutral-muted': `0.22 0.015 ${hNeutral}`,

    '--ideasui-color-border-focus': `${l} ${c} ${hPrimary}`,
  };
}

export function applyPrimaryColorTokens(oklchStr: string) {
  if (globalThis.window === undefined) return;

  const clean = sanitizeOklch(oklchStr);
  const parts = clean.trim().split(/\s+/);

  if (parts.length < 3) return;

  const l = Number.parseFloat(parts[0]);
  const c = Number.parseFloat(parts[1]);
  const h = Number.parseFloat(parts[2]);

  if (Number.isNaN(l) || Number.isNaN(c) || Number.isNaN(h)) return;

  const isDark = document.documentElement.classList.contains('dark');
  const tokens = calculateThemeColorTokens(l, c, h, isDark);

  for (const [varName, varVal] of Object.entries(tokens)) {
    document.documentElement.style.setProperty(varName, varVal);
  }
}

export function resetPrimaryColorTokens() {
  if (globalThis.window === undefined) return;

  for (const varName of ALL_DYNAMIC_COLOR_VARS) {
    document.documentElement.style.removeProperty(varName);
  }
}

export function useInitThemeCustomizer() {
  useEffect(() => {
    if (globalThis.window === undefined) return;

    const savedOklch = localStorage.getItem(STORAGE_KEYS.COLOR_OKLCH);

    if (savedOklch) {
      applyPrimaryColorTokens(savedOklch);
    }

    const savedRadiusVal = localStorage.getItem(STORAGE_KEYS.RADIUS_VAL);

    if (savedRadiusVal) {
      document.documentElement.style.setProperty('--ideasui-radius', savedRadiusVal);
    }

    const observer = new MutationObserver(() => {
      const currentOklch = localStorage.getItem(STORAGE_KEYS.COLOR_OKLCH);

      if (currentOklch) {
        applyPrimaryColorTokens(currentOklch);
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);
}

export function ThemeCustomizerModal({ isOpen, onClose }: Readonly<ThemeCustomizerModalProps>) {
  const { theme, setTheme } = useTheme();
  const mounted = useIsMounted();

  const [customHex, setCustomHex] = useState<string>(() => {
    if (globalThis.window === undefined) return '#6366f1';

    return localStorage.getItem(STORAGE_KEYS.CUSTOM_HEX) ?? '#6366f1';
  });

  const [customOklch, setCustomOklch] = useState<string>(() => {
    if (globalThis.window === undefined) return '';

    return localStorage.getItem(STORAGE_KEYS.COLOR_OKLCH) ?? '';
  });

  const [selectedColor, setSelectedColor] = useState<string>(() => {
    if (globalThis.window === undefined) return 'indigo';
    const stored = localStorage.getItem(STORAGE_KEYS.COLOR);

    if (stored) {
      if (stored === 'custom') {
        const savedOklch = localStorage.getItem(STORAGE_KEYS.COLOR_OKLCH);

        if (savedOklch) {
          applyPrimaryColorTokens(savedOklch);
        }

        return 'custom';
      }

      const found = COLOR_PRESETS.find((p) => p.id === stored);

      if (found) {
        applyPrimaryColorTokens(found.oklch);
      }

      return stored;
    }

    return 'indigo';
  });

  const [selectedRadius, setSelectedRadius] = useState<string>(() => {
    if (globalThis.window === undefined) return 'md';
    const stored = localStorage.getItem(STORAGE_KEYS.RADIUS);

    if (stored) {
      const found = RADIUS_PRESETS.find((r) => r.id === stored);

      if (found) {
        document.documentElement.style.setProperty('--ideasui-radius', found.value);
      }

      return stored;
    }

    return 'md';
  });

  useEffect(() => {
    if (!mounted || !isOpen) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mounted, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    globalThis.addEventListener('keydown', handleKeyDown);

    return () => globalThis.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleApplyColor = (preset: ColorPreset) => {
    const cleanValue = sanitizeOklch(preset.oklch);

    setSelectedColor(preset.id);
    applyPrimaryColorTokens(cleanValue);
    localStorage.setItem(STORAGE_KEYS.COLOR, preset.id);
    localStorage.setItem(STORAGE_KEYS.COLOR_OKLCH, cleanValue);
  };

  const handleApplyCustomColor = (hex: string) => {
    const rawOklch = getCustomOklch(hex);

    setCustomHex(hex);
    setCustomOklch(rawOklch);
    setSelectedColor('custom');
    applyPrimaryColorTokens(rawOklch);
    localStorage.setItem(STORAGE_KEYS.COLOR, 'custom');
    localStorage.setItem(STORAGE_KEYS.CUSTOM_HEX, hex);
    localStorage.setItem(STORAGE_KEYS.COLOR_OKLCH, rawOklch);
  };

  const handleApplyRadius = (preset: RadiusPreset) => {
    setSelectedRadius(preset.id);
    document.documentElement.style.setProperty('--ideasui-radius', preset.value);
    localStorage.setItem(STORAGE_KEYS.RADIUS, preset.id);
    localStorage.setItem(STORAGE_KEYS.RADIUS_VAL, preset.value);
  };

  const handleReset = () => {
    setSelectedColor('indigo');
    setSelectedRadius('md');
    setCustomHex('#6366f1');
    setCustomOklch('');
    resetPrimaryColorTokens();
    document.documentElement.style.removeProperty('--ideasui-radius');
    for (const key of [
      STORAGE_KEYS.COLOR,
      STORAGE_KEYS.COLOR_OKLCH,
      STORAGE_KEYS.CUSTOM_HEX,
      STORAGE_KEYS.RADIUS,
      STORAGE_KEYS.RADIUS_VAL,
    ])
      localStorage.removeItem(key);
    setTheme('system');
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center overflow-y-auto p-3 py-6 sm:p-4 sm:py-10">
          <motion.div
            animate={{ opacity: 1 }}
            className="bg-background/60 fixed inset-0"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            aria-label="Theme Customizer"
            aria-modal="true"
            className="bg-surface/95 border-border-subtle/60 relative z-10 my-auto flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl border shadow-2xl backdrop-blur-2xl"
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            role="dialog"
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          >
            <div className="border-border-subtle/50 flex shrink-0 items-center justify-between border-b px-4.5 py-3.5 sm:px-6 sm:py-4.5">
              <div className="flex items-center gap-2.5">
                <div className="bg-primary-subtle text-primary flex size-8.5 items-center justify-center rounded-xl shadow-2xs sm:size-9">
                  <Palette className="size-4.5 sm:size-5" />
                </div>
                <div>
                  <h3 className="text-content-primary text-sm font-bold sm:text-base">
                    Theme Customizer
                  </h3>
                  <p className="text-content-muted text-[11px] font-medium sm:text-xs">
                    Customize mode, primary accent color, and corner radius
                  </p>
                </div>
              </div>

              <button
                aria-label="Close customizer"
                className="text-content-secondary hover:bg-surface-subtle hover:text-content-primary flex size-8 cursor-pointer items-center justify-center rounded-full transition-colors active:scale-95"
                type="button"
                onClick={onClose}
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="custom-scrollbar flex-1 space-y-5 overflow-y-auto p-4.5 sm:space-y-6 sm:p-6">
              <div>
                <div className="text-content-primary mb-2 flex items-center gap-2 text-xs font-bold tracking-wider uppercase sm:mb-2.5">
                  <Sun className="text-primary size-4" />
                  <span>Color Mode</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {MODE_OPTIONS.map(({ id, label, icon: Icon }) => (
                    <SegmentPillButton
                      key={id}
                      className="py-2 text-xs font-semibold sm:py-2.5 sm:text-sm"
                      isSelected={theme === id}
                      onClick={() => setTheme(id)}
                    >
                      <Icon className="size-4" />
                      <span>{label}</span>
                    </SegmentPillButton>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-content-primary mb-2 flex items-center gap-2 text-xs font-bold tracking-wider uppercase sm:mb-2.5">
                  <Palette className="text-primary size-4" />
                  <span>Brand Accent Colors</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {COLOR_PRESETS.map((preset) => (
                    <ColorTileItem
                      key={preset.id}
                      backgroundColor={`oklch(${preset.oklch})`}
                      isSelected={selectedColor === preset.id}
                      label={preset.name.split(' ')[0]}
                      onClick={() => handleApplyColor(preset)}
                    />
                  ))}

                  {/* Custom User Color Tile */}
                  <ColorTileItem
                    backgroundColor={
                      selectedColor === 'custom' && customOklch
                        ? `oklch(${customOklch})`
                        : customHex
                    }
                    icon={<Pipette className="relative z-10 size-3.5 text-white drop-shadow-xs" />}
                    isSelected={selectedColor === 'custom'}
                    label="Custom"
                  >
                    <input
                      aria-label="Pick custom color"
                      className="absolute inset-0 z-20 size-full cursor-pointer opacity-0"
                      type="color"
                      value={customHex}
                      onChange={(e) => handleApplyCustomColor(e.target.value)}
                    />
                  </ColorTileItem>
                </div>
              </div>

              <div>
                <div className="text-content-primary mb-2 flex items-center gap-2 text-xs font-bold tracking-wider uppercase sm:mb-2.5">
                  <Sliders className="text-primary size-4" />
                  <span>Corner Radius Density</span>
                </div>
                <div className="grid grid-cols-5 gap-1 sm:gap-2">
                  {RADIUS_PRESETS.map((preset) => (
                    <SegmentPillButton
                      key={preset.id}
                      className="py-1.5 text-[11px] font-semibold sm:py-2 sm:text-xs"
                      isSelected={selectedRadius === preset.id}
                      onClick={() => handleApplyRadius(preset)}
                    >
                      <span>{preset.name}</span>
                    </SegmentPillButton>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-border-subtle/50 bg-surface-subtle/40 flex shrink-0 items-center justify-between border-t px-4.5 py-3 sm:px-6 sm:py-4">
              <button
                className="text-content-tertiary hover:text-danger flex cursor-pointer items-center gap-1.5 font-mono text-xs font-medium transition-colors"
                type="button"
                onClick={handleReset}
              >
                <RotateCcw className="size-3.5" />
                <span>Reset Defaults</span>
              </button>

              <button
                className="bg-primary text-on-primary inline-flex cursor-pointer items-center justify-center rounded-xl px-4 py-1.5 text-xs font-semibold shadow-xs transition-all duration-150 hover:opacity-90 active:scale-95 sm:px-5 sm:py-2"
                type="button"
                onClick={onClose}
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
