'use client';

import { useSyncExternalStore } from 'react';
import { cn } from '@ideasui/utils';
import { useIsMounted } from '@/hooks/use-is-mounted';

interface PropDef {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

function subscribeMobile(callback: () => void) {
  const mediaQuery = window.matchMedia('(max-width: 639px)');

  mediaQuery.addEventListener('change', callback);

  return () => mediaQuery.removeEventListener('change', callback);
}

function getMobileSnapshot() {
  return window.matchMedia('(max-width: 639px)').matches;
}

function getServerMobileSnapshot() {
  return false;
}

export function PropsTable({ data }: { data: PropDef[] }) {
  const isMobile = useSyncExternalStore(
    subscribeMobile,
    getMobileSnapshot,
    getServerMobileSnapshot,
  );
  const mounted = useIsMounted();

  if (!data?.length) {
    return (
      <div className="bg-error/20 text-error p-4">
        PropsTable mounted but data is empty or undefined!
      </div>
    );
  }

  // Prevent hydration mismatch by returning a skeleton or nothing until mounted
  if (!mounted) {
    return <div className="not-prose bg-surface-muted/10 my-6 h-40 w-full animate-pulse rounded" />;
  }

  return (
    <div className="not-prose w-full">
      {!isMobile ? (
        /* Desktop View: Borderless, clean typography, soft hovers */
        <div className="w-full overflow-hidden rounded">
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-surface-muted/30">
                  <th className="text-content-secondary px-6 py-4 text-[11px] font-bold tracking-wider uppercase">
                    Prop
                  </th>
                  <th className="text-content-secondary px-6 py-4 text-[11px] font-bold tracking-wider uppercase">
                    Type
                  </th>
                  <th className="text-content-secondary px-6 py-4 text-[11px] font-bold tracking-wider uppercase">
                    Default
                  </th>
                  <th className="text-content-secondary px-6 py-4 text-[11px] font-bold tracking-wider uppercase">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="before:block before:h-2 before:content-['']">
                {data.map((p) => (
                  <tr
                    key={p.name}
                    className="hover:bg-surface-muted/20 transition-colors duration-300"
                  >
                    <td className="px-6 py-4 align-top">
                      <div className="flex items-center gap-1.5">
                        <span className="text-primary font-mono text-[13px] font-semibold tracking-tight">
                          {p.name}
                        </span>
                        {p.required && (
                          <span
                            className="text-error mt-0.5 text-xs leading-none font-bold"
                            title="Required"
                          >
                            *
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="inline-flex">
                        <span className="bg-success-subtle/80 text-success rounded px-2.5 py-1 font-mono text-[11px] leading-none">
                          {p.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      {p.default ? (
                        <span className="bg-info-subtle/80 text-info rounded px-2.5 py-1 font-mono text-[11px] leading-none">
                          {p.default}
                        </span>
                      ) : (
                        <span className="text-content-tertiary px-2.5 font-mono text-xs">-</span>
                      )}
                    </td>
                    <td className="text-content-secondary px-6 py-4 align-top text-[13px] leading-relaxed">
                      {p.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Mobile Card View: Borderless soft cards */
        <div className="grid gap-3">
          {data.map((p) => (
            <div
              key={p.name}
              className={cn(
                'group relative overflow-hidden rounded',
                'bg-surface-muted/50',
                'p-5 backdrop-blur-sm',
                'hover:bg-surface-muted/40 transition-all duration-300',
              )}
            >
              {/* Top Row: Name & Default */}
              <div className="mb-2 flex items-start justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-primary font-mono text-[15px] font-semibold tracking-tight">
                    {p.name}
                  </span>
                  {p.required && (
                    <span className="text-error text-sm font-bold tracking-widest uppercase">
                      *
                    </span>
                  )}
                </div>

                {p.default && (
                  <div className="shrink-0 text-right">
                    <span className="text-content-tertiary mb-1.5 block text-[9px] font-bold tracking-wider uppercase">
                      Default
                    </span>
                    <span className="bg-info-subtle/80 text-info inline-block rounded px-2.5 py-1 font-mono text-[10px] leading-none">
                      {p.default}
                    </span>
                  </div>
                )}
              </div>

              {/* Middle Row: Type */}
              <div className="mb-4">
                <span className="text-content-tertiary mb-1 block text-[9px] font-bold tracking-wider uppercase">
                  Type
                </span>
                <span className="bg-success-subtle/80 text-success inline-block rounded px-3 font-mono text-[11px]">
                  {p.type}
                </span>
              </div>

              {/* Bottom Row: Description (No border line anymore) */}
              <div>
                <p className="text-content-secondary text-[13px] leading-relaxed">
                  {p.description}
                </p>
              </div>

              {/* Glow on hover */}
              <span
                aria-hidden
                className="bg-[radial-gradient(ellipse_at_top_right,theme(colors.primary.DEFAULT/6%),transparent_50%)] pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
