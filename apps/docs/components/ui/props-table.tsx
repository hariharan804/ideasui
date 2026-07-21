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
      <div className="bg-error/20 text-error rounded-2xl p-4 text-sm font-medium">
        PropsTable mounted but data is empty or undefined!
      </div>
    );
  }

  if (!mounted) {
    return (
      <div className="not-prose bg-surface-subtle my-6 h-40 w-full animate-pulse rounded-2xl" />
    );
  }

  return (
    <div className="not-prose my-6 w-full">
      {isMobile ? (
        /* Mobile Card View: Borderless rounded cards */
        <div className="grid gap-3">
          {data.map((p) => (
            <div
              key={p.name}
              className="group bg-surface-subtle/85 relative overflow-hidden rounded-2xl p-5 backdrop-blur-sm transition-all duration-200"
            >
              {/* Top Row: Name & Default */}
              <div className="mb-2.5 flex items-start justify-between gap-4">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span
                    className={cn(
                      'font-mono text-sm font-semibold tracking-tight',
                      p.deprecated ? 'text-content-tertiary line-through' : 'text-primary',
                    )}
                  >
                    {p.name}
                  </span>
                  {p.required && (
                    <span className="text-error text-xs leading-none font-bold" title="Required">
                      *
                    </span>
                  )}
                  {p.deprecated && (
                    <span className="bg-warning/10 text-warning rounded-md px-1.5 py-0.5 text-[9px] font-bold tracking-wider uppercase">
                      Deprecated
                    </span>
                  )}
                </div>

                {p.default && (
                  <div className="shrink-0 text-right">
                    <span className="text-content-tertiary mb-1 block text-[9px] font-bold tracking-wider uppercase">
                      Default
                    </span>
                    <span className="bg-primary/10 text-primary inline-block rounded-md px-2 py-0.5 font-mono text-[10px] leading-tight">
                      {p.default}
                    </span>
                  </div>
                )}
              </div>

              {/* Middle Row: Type */}
              <div className="mb-3">
                <span className="text-content-tertiary mb-1 block text-[9px] font-bold tracking-wider uppercase">
                  Type
                </span>
                <span className="bg-surface-muted/80 text-content-secondary inline-block rounded-md px-2.5 py-1 font-mono text-[11px] leading-normal break-words whitespace-pre-wrap">
                  {p.type}
                </span>
              </div>

              {/* Bottom Row: Description */}
              <div>
                {p.deprecated && typeof p.deprecated === 'string' && (
                  <div className="text-warning mb-1.5 text-xs font-semibold">
                    ⚠️ Deprecated: {p.deprecated}
                  </div>
                )}
                <p className="text-content-secondary text-xs leading-relaxed sm:text-[13px]">
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Desktop View: Clean borderless card table */
        <div className="bg-surface-subtle/50 w-full overflow-hidden rounded-2xl">
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <colgroup>
                <col className="w-[170px]" />
                <col className="w-[200px]" />
                <col className="w-[140px]" />
                <col />
              </colgroup>
              <thead>
                <tr className="bg-surface-muted/60">
                  <th className="text-content-tertiary px-5 py-3.5 text-[10px] font-bold tracking-wider uppercase">
                    Prop
                  </th>
                  <th className="text-content-tertiary px-5 py-3.5 text-[10px] font-bold tracking-wider uppercase">
                    Type
                  </th>
                  <th className="text-content-tertiary px-5 py-3.5 text-[10px] font-bold tracking-wider uppercase">
                    Default
                  </th>
                  <th className="text-content-tertiary px-5 py-3.5 text-[10px] font-bold tracking-wider uppercase">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((p) => (
                  <tr
                    key={p.name}
                    className="hover:bg-surface-subtle/60 transition-colors duration-150"
                  >
                    <td className="px-5 py-4 align-top">
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
                          <span className="bg-warning/10 text-warning rounded-md px-1.5 py-0.5 text-[9px] font-bold tracking-wider uppercase">
                            Deprecated
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 align-top">
                      <span className="bg-surface-muted/80 text-content-secondary inline-block max-w-full rounded-md px-2.5 py-1 font-mono text-[11px] leading-[1.6] break-words whitespace-pre-wrap">
                        {p.type}
                      </span>
                    </td>
                    <td className="px-5 py-4 align-top">
                      {p.default ? (
                        <span className="bg-primary/10 text-primary inline-block max-w-full rounded-md px-2.5 py-1 font-mono text-[11px] leading-[1.6] break-words whitespace-pre-wrap">
                          {p.default}
                        </span>
                      ) : (
                        <span className="text-content-tertiary block pt-0.5 font-mono text-xs">
                          —
                        </span>
                      )}
                    </td>
                    <td className="text-content-secondary px-5 py-4 align-top text-[13px] leading-relaxed">
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
