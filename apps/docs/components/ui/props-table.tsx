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
  deprecated?: boolean | string;
}

function subscribeMobile(callback: () => void) {
  const mediaQuery = globalThis.matchMedia('(max-width: 639px)');

  mediaQuery.addEventListener('change', callback);

  return () => mediaQuery.removeEventListener('change', callback);
}

function getMobileSnapshot() {
  return globalThis.matchMedia('(max-width: 639px)').matches;
}

function getServerMobileSnapshot() {
  return false;
}

export function PropsTable({ data }: Readonly<{ readonly data: PropDef[] }>) {
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

  if (!mounted) {
    return <div className="not-prose bg-surface-subtle my-6 h-40 w-full animate-pulse rounded" />;
  }

  return (
    <div className="not-prose w-full">
      {isMobile ? (
        /* Mobile Card View: Borderless soft cards */
        <div className="grid gap-3">
          {data.map((p) => (
            <div
              key={p.name}
              className={cn(
                'group relative overflow-hidden rounded',
                'bg-surface-subtle',
                'p-5 backdrop-blur-sm',
                'hover:bg-surface-subtle transition-all duration-300',
              )}
            >
              {/* Top Row: Name & Default */}
              <div className="mb-2 flex items-start justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'font-mono text-[15px] font-semibold tracking-tight',
                      p.deprecated ? 'text-content-tertiary line-through' : 'text-primary',
                    )}
                  >
                    {p.name}
                  </span>
                  {p.required && (
                    <span className="text-error text-sm font-bold tracking-widest uppercase">
                      *
                    </span>
                  )}
                  {p.deprecated && (
                    <span className="border-warning/20 bg-warning-subtle/80 text-warning scale-90 rounded border px-1.5 py-0.5 text-[9px] font-bold tracking-wider uppercase">
                      Deprecated
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
                {p.deprecated && typeof p.deprecated === 'string' && (
                  <div className="text-warning mb-1.5 text-xs font-semibold">
                    ⚠️ Deprecated: {p.deprecated}
                  </div>
                )}
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
      ) : (
        /* Desktop View: Clean bordered table with consistent rhythm */
        <div className="border-base/10 w-full overflow-hidden rounded-2xl border">
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <colgroup>
                <col className="w-[170px]" />
                <col className="w-[200px]" />
                <col className="w-[140px]" />
                <col />
              </colgroup>
              <thead>
                <tr className="bg-surface-subtle">
                  <th className="border-base/10 text-content-secondary border-b px-5 py-3 text-[11px] font-bold tracking-wider uppercase">
                    Prop
                  </th>
                  <th className="border-base/10 text-content-secondary border-b px-5 py-3 text-[11px] font-bold tracking-wider uppercase">
                    Type
                  </th>
                  <th className="border-base/10 text-content-secondary border-b px-5 py-3 text-[11px] font-bold tracking-wider uppercase">
                    Default
                  </th>
                  <th className="border-base/10 text-content-secondary border-b px-5 py-3 text-[11px] font-bold tracking-wider uppercase">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-base/[0.07] divide-y">
                {data.map((p) => (
                  <tr
                    key={p.name}
                    className="hover:bg-surface-subtle transition-colors duration-200"
                  >
                    <td className="px-5 py-3.5 align-top">
                      <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                        <span
                          className={cn(
                            'font-mono text-[13px] font-semibold tracking-tight',
                            p.deprecated ? 'text-content-tertiary line-through' : 'text-primary',
                          )}
                        >
                          {p.name}
                        </span>
                        {p.required && (
                          <span
                            className="text-error text-xs leading-none font-bold"
                            title="Required"
                          >
                            *
                          </span>
                        )}
                        {p.deprecated && (
                          <span className="border-warning/20 bg-warning-subtle/80 text-warning rounded border px-1.5 py-0.5 text-[9px] font-bold tracking-wider uppercase">
                            Deprecated
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 align-top">
                      <span className="bg-success-subtle/80 text-success inline-block max-w-full rounded px-2.5 py-1 font-mono text-[11px] leading-[1.6] break-words whitespace-pre-wrap">
                        {p.type}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 align-top">
                      {p.default ? (
                        <span className="bg-info-subtle/80 text-info inline-block max-w-full rounded px-2.5 py-1 font-mono text-[11px] leading-[1.6] break-words whitespace-pre-wrap">
                          {p.default}
                        </span>
                      ) : (
                        <span className="text-content-tertiary block pt-0.5 font-mono text-xs">
                          —
                        </span>
                      )}
                    </td>
                    <td className="text-content-secondary px-5 py-3.5 align-top text-[13px] leading-relaxed">
                      {p.deprecated && typeof p.deprecated === 'string' && (
                        <div className="text-warning mb-1.5 text-xs font-semibold">
                          ⚠️ Deprecated: {p.deprecated}
                        </div>
                      )}
                      {p.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
