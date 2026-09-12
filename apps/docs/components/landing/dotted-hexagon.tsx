'use client';

import { useId } from 'react';
import { cn } from '@ideasui/utils';

export interface DottedHexagonProps {
  /** Optional additional CSS classes for container positioning */
  className?: string;
  /** Whether to enable top spotlight gradient glow. Default true. */
  showSpotlight?: boolean;
  /** Whether to enable ambient film grain overlay. Default true. */
  showGrain?: boolean;
  /** Opacity level for the dotted hexagon SVG pattern (0 to 1). Default 0.6. */
  patternOpacity?: number;
}

/**
 * Modern Dotted Hexagon landing page section background.
 * Combines SVG hexagonal dot-and-line geometry, radial spotlight glow, and film grain texture.
 */
export function DottedHexagon({
  className,
  showSpotlight = true,
  showGrain = true,
  patternOpacity = 0.04,
}: Readonly<DottedHexagonProps>) {
  const patternId = useId();

  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none',
        className,
      )}
    >
      {/* ── 1. SVG Hexagonal Dotted Grid Pattern ────────────────────────── */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full"
        height="100%"
        style={{ opacity: patternOpacity }}
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern height="97" id={patternId} patternUnits="userSpaceOnUse" width="56">
            {/* Hexagonal Vertex Dots */}
            <g className="text-content-tertiary/40" fill="currentColor">
              <circle cx="28" cy="0" r="1.5" />
              <circle cx="0" cy="16.16" r="1.5" />
              <circle cx="56" cy="16.16" r="1.5" />
              <circle cx="28" cy="32.33" r="1.5" />
              <circle cx="0" cy="48.5" r="1.5" />
              <circle cx="56" cy="48.5" r="1.5" />
              <circle cx="28" cy="64.66" r="1.5" />
              <circle cx="0" cy="80.83" r="1.5" />
              <circle cx="56" cy="80.83" r="1.5" />
              <circle cx="28" cy="97" r="1.5" />
            </g>

            {/* Subtle Hexagonal Wireframe Outline Strokes */}
            <polygon
              className="stroke-content-tertiary/15"
              fill="none"
              points="28,0 56,16.16 56,48.5 28,64.66 0,48.5 0,16.16"
              strokeDasharray="3 3"
              strokeWidth="0.75"
            />
            <polygon
              className="stroke-content-tertiary/10"
              fill="none"
              points="28,32.33 56,48.5 56,80.83 28,97 0,80.83 0,48.5"
              strokeDasharray="3 3"
              strokeWidth="0.75"
            />
          </pattern>
        </defs>
        <rect fill={`url(#${patternId})`} height="100%" width="100%" />
      </svg>

      {/* ── 2. Radial Spotlight Lighting Layer ──────────────────────────── */}
      {showSpotlight && <div className="bg-spotlight pointer-events-none absolute inset-0" />}

      {/* ── 3. Film Grain Noise Layer ───────────────────────────────────── */}
      {showGrain && (
        <div className="bg-grain pointer-events-none absolute inset-0 opacity-10 mix-blend-overlay" />
      )}
    </div>
  );
}
