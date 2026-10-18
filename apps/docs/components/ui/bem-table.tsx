'use client';

import { useSyncExternalStore, useState, useMemo } from 'react';
import { cn } from '@ideasui/utils';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { Copy, Check } from 'lucide-react';
import type { BEMClassDefinition, BEMClassType } from '@/lib/docs/components-bem';

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

function inferBEMType(className: string, explicitType?: BEMClassType): BEMClassType {
  if (explicitType) return explicitType;
  if (className.includes('--')) return 'modifier';
  if (className.includes('__')) return 'element';

  return 'block';
}

interface BEMTableProps {
  readonly data: BEMClassDefinition[];
}

export function BEMTable({ data }: Readonly<BEMTableProps>) {
  const isMobile = useSyncExternalStore(
    subscribeMobile,
    getMobileSnapshot,
    getServerMobileSnapshot,
  );
  const mounted = useIsMounted();
  const [copiedClass, setCopiedClass] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | BEMClassType>('all');

  const handleCopy = async (className: string) => {
    try {
      await navigator.clipboard.writeText(className);
      setCopiedClass(className);
      setTimeout(() => setCopiedClass(null), 2000);
    } catch {
      // Ignore clipboard write failure
    }
  };

  const enrichedData = useMemo(() => {
    return (data || []).map((item) => ({
      ...item,
      inferredType: inferBEMType(item.name, item.type),
    }));
  }, [data]);

  const counts = useMemo(() => {
    return {
      all: enrichedData.length,
      block: enrichedData.filter((i) => i.inferredType === 'block').length,
      element: enrichedData.filter((i) => i.inferredType === 'element').length,
      modifier: enrichedData.filter((i) => i.inferredType === 'modifier').length,
    };
  }, [enrichedData]);

  const filteredData = useMemo(() => {
    if (activeFilter === 'all') return enrichedData;

    return enrichedData.filter((item) => item.inferredType === activeFilter);
  }, [enrichedData, activeFilter]);

  if (!data?.length) {
    return (
      <div className="bg-error/20 text-error rounded-2xl p-4 text-sm font-medium">
        BEMTable mounted but data is empty or undefined.
      </div>
    );
  }

  if (!mounted) {
    return (
      <div className="not-prose bg-surface-subtle my-6 h-40 w-full animate-pulse rounded-2xl" />
    );
  }

  return (
    <div className="not-prose my-4 flex w-full flex-col gap-3">
      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center gap-1.5">
        <button
          className={cn(
            'flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all duration-150',
            activeFilter === 'all'
              ? 'bg-primary text-on-primary font-semibold shadow-xs'
              : 'bg-surface-subtle text-content-secondary hover:bg-surface-muted hover:text-content-primary',
          )}
          type="button"
          onClick={() => setActiveFilter('all')}
        >
          <span>All</span>
          <span className="font-mono text-[10px] opacity-75">({counts.all})</span>
        </button>

        {counts.block > 0 && (
          <button
            className={cn(
              'flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all duration-150',
              activeFilter === 'block'
                ? 'bg-primary text-on-primary font-semibold shadow-xs'
                : 'bg-surface-subtle text-content-secondary hover:bg-surface-muted hover:text-content-primary',
            )}
            type="button"
            onClick={() => setActiveFilter('block')}
          >
            <span>Blocks</span>
            <span className="font-mono text-[10px] opacity-75">({counts.block})</span>
          </button>
        )}

        {counts.element > 0 && (
          <button
            className={cn(
              'flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all duration-150',
              activeFilter === 'element'
                ? 'bg-primary text-on-primary font-semibold shadow-xs'
                : 'bg-surface-subtle text-content-secondary hover:bg-surface-muted hover:text-content-primary',
            )}
            type="button"
            onClick={() => setActiveFilter('element')}
          >
            <span>Elements</span>
            <span className="font-mono text-[10px] opacity-75">({counts.element})</span>
          </button>
        )}

        {counts.modifier > 0 && (
          <button
            className={cn(
              'flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all duration-150',
              activeFilter === 'modifier'
                ? 'bg-primary text-on-primary font-semibold shadow-xs'
                : 'bg-surface-subtle text-content-secondary hover:bg-surface-muted hover:text-content-primary',
            )}
            type="button"
            onClick={() => setActiveFilter('modifier')}
          >
            <span>Modifiers</span>
            <span className="font-mono text-[10px] opacity-75">({counts.modifier})</span>
          </button>
        )}
      </div>

      {isMobile ? (
        /* Mobile Card View */
        <div className="grid gap-3">
          {filteredData.map((item) => {
            const isCopied = copiedClass === item.name;

            return (
              <div
                key={item.name}
                className="group bg-surface-subtle/85 relative overflow-hidden rounded-2xl p-4 backdrop-blur-sm transition-all duration-200"
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="bg-primary/10 text-primary rounded-md px-2 py-0.5 font-mono text-xs font-semibold select-all">
                      {item.name}
                    </span>
                    <span
                      className={cn(
                        'rounded-md px-1.5 py-0.5 text-[9px] font-bold tracking-wider uppercase',
                        item.inferredType === 'block' && 'bg-primary/10 text-primary',
                        item.inferredType === 'element' && 'bg-info/10 text-info',
                        item.inferredType === 'modifier' &&
                          'bg-surface-muted text-content-secondary',
                      )}
                    >
                      {item.inferredType}
                    </span>
                  </div>

                  <button
                    aria-label={`Copy class name ${item.name}`}
                    className="text-content-tertiary hover:bg-surface-muted hover:text-content-primary cursor-pointer rounded-md p-1 transition-colors"
                    type="button"
                    onClick={() => handleCopy(item.name)}
                  >
                    {isCopied ? (
                      <Check className="text-success h-3.5 w-3.5" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>

                <div className="text-content-secondary mb-1 text-[11px] font-semibold">
                  Target: <span className="text-content-primary font-medium">{item.target}</span>
                </div>

                <p className="text-content-secondary text-xs leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      ) : (
        /* Desktop Table View */
        <div className="bg-surface-subtle/50 w-full overflow-hidden rounded-2xl">
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <colgroup>
                <col className="w-[300px]" />
                <col className="w-[180px]" />
                <col />
              </colgroup>
              <thead>
                <tr className="bg-surface-muted/60">
                  <th className="text-content-tertiary px-5 py-3.5 text-[10px] font-bold tracking-wider uppercase">
                    Class Name
                  </th>
                  <th className="text-content-tertiary px-5 py-3.5 text-[10px] font-bold tracking-wider uppercase">
                    Target Element
                  </th>
                  <th className="text-content-tertiary px-5 py-3.5 text-[10px] font-bold tracking-wider uppercase">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => {
                  const isCopied = copiedClass === item.name;

                  return (
                    <tr
                      key={item.name}
                      className="hover:bg-surface-subtle/60 group transition-colors duration-150"
                    >
                      <td className="px-5 py-3.5 align-top">
                        <div className="flex items-center gap-2">
                          <span className="bg-surface-muted/80 text-primary inline-block rounded-md px-2.5 py-1 font-mono text-[12px] leading-normal font-semibold break-words select-all">
                            {item.name}
                          </span>
                          <span
                            className={cn(
                              'rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wider uppercase',
                              item.inferredType === 'block' && 'bg-primary/10 text-primary',
                              item.inferredType === 'element' && 'bg-info/10 text-info',
                              item.inferredType === 'modifier' &&
                                'bg-surface-muted text-content-tertiary',
                            )}
                          >
                            {item.inferredType}
                          </span>
                          <button
                            aria-label={`Copy class name ${item.name}`}
                            className="text-content-tertiary hover:bg-surface-muted hover:text-content-primary cursor-pointer rounded-md p-1 opacity-0 transition-all group-hover:opacity-100"
                            title="Copy class name"
                            type="button"
                            onClick={() => handleCopy(item.name)}
                          >
                            {isCopied ? (
                              <Check className="text-success h-3.5 w-3.5" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 align-top">
                        <span className="bg-surface-muted/60 text-content-primary inline-block rounded-md px-2.5 py-1 text-xs font-medium">
                          {item.target}
                        </span>
                      </td>
                      <td className="text-content-secondary px-5 py-3.5 align-top text-[13px] leading-relaxed">
                        {item.description}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

BEMTable.displayName = 'IdeasUI.BEMTable';
