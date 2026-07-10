'use client';

import { Gift, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

const LOGS = [
  {
    version: 'v1.2.0',
    date: '2024-12-15',
    tag: 'Latest Release',
    tagColor: 'bg-primary/10 text-primary border-primary/20',
    changes: [
      {
        type: 'Added',
        desc: 'New Drawer component with edge-drag handlers and multi-placement options (left, right, top, bottom).',
        icon: <Sparkles className="text-primary size-4" />,
      },
      {
        type: 'Added',
        desc: 'Pagination components supporting responsive dot ranges and dynamic page limits.',
        icon: <Sparkles className="text-primary size-4" />,
      },
      {
        type: 'Fixed',
        desc: 'Modal layout focus trap issues on multi-layered overlay stack trees.',
        icon: <AlertCircle className="text-error size-4" />,
      },
      {
        type: 'Improved',
        desc: 'Button component loading configurations now prevent dynamic text layout shifts.',
        icon: <CheckCircle2 className="text-success size-4" />,
      },
    ],
  },
  {
    version: 'v1.1.0',
    date: '2024-11-20',
    tag: 'Minor Update',
    tagColor: 'bg-content-secondary/10 text-content-secondary border-subtle',
    changes: [
      {
        type: 'Added',
        desc: 'New Toast component with auto-dismiss triggers and sliding gesture controls.',
        icon: <Sparkles className="text-primary size-4" />,
      },
      {
        type: 'Added',
        desc: 'Skeleton components supporting variable animation cycles (pulse, shimmer).',
        icon: <Sparkles className="text-primary size-4" />,
      },
      {
        type: 'Fixed',
        desc: 'Resolved the initial theme flash where system colors briefly glitched on first load.',
        icon: <AlertCircle className="text-error size-4" />,
      },
    ],
  },
  {
    version: 'v1.0.0',
    date: '2024-10-01',
    tag: 'Initial Release',
    tagColor: 'bg-success/10 text-success border-success/20',
    changes: [
      {
        type: 'Added',
        desc: 'Released the core package containing 20+ responsive components backed by WAI-ARIA standards.',
        icon: <Gift className="text-success size-4" />,
      },
    ],
  },
];

export default function ChangelogPage() {
  return (
    <main className="bg-background text-content-primary min-h-screen py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="border-primary/30 bg-primary/10 text-primary inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold">
            Timeline
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Changelog
          </h1>
          <p className="text-content-secondary mt-4 text-base sm:text-lg">
            Track product updates, component releases, optimizations, and bug fixes across versions.
          </p>
        </div>

        {/* Timeline container */}
        <div className="border-subtle relative ml-2 space-y-12 border-l pl-6 sm:ml-6 sm:pl-8">
          {LOGS.map((log) => (
            <div key={log.version} className="relative">
              {/* Timeline Indicator Dot */}
              <span className="border-background bg-primary ring-primary/15 absolute top-1.5 -left-[31px] flex size-4 items-center justify-center rounded-full border-2 ring-4 sm:-left-[41px]" />

              {/* Version & Date Row */}
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <h2 className="text-content-primary font-mono text-xl font-bold tracking-tight sm:text-2xl">
                  {log.version}
                </h2>
                <span className="text-content-tertiary font-mono text-xs font-semibold">
                  — {log.date}
                </span>
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase ${log.tagColor}`}
                >
                  {log.tag}
                </span>
              </div>

              {/* Changes list */}
              <div className="border-subtle bg-surface-subtle/30 space-y-4 rounded-2xl border p-5 sm:p-6">
                {log.changes.map((change, index) => (
                  <div key={`${index + 'log'}`} className="flex items-start gap-3">
                    <div className="mt-0.5 flex shrink-0">{change.icon}</div>
                    <div className="text-sm leading-relaxed">
                      <span className="text-content-primary mr-1.5 font-semibold capitalize">
                        {change.type}:
                      </span>
                      <span className="text-content-secondary">{change.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
