'use client';

import type { JSX } from 'react';
import type { BadgeAnchorOrigin } from '@ideasui/react';

import { useState } from 'react';
import { Badge } from '@ideasui/react';

function MailIcon(): JSX.Element {
  return (
    <svg
      aria-hidden="true"
      className="text-content-secondary size-6"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

function BellIcon(): JSX.Element {
  return (
    <svg
      aria-hidden="true"
      className="text-content-secondary size-6"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
    </svg>
  );
}

interface UserItem {
  readonly id: string;
  readonly name: string;
  readonly initials: string;
  readonly status: 'online' | 'offline';
}

const USERS: readonly UserItem[] = [
  { id: '1', name: 'Remy Sharp', initials: 'R', status: 'online' },
  { id: '2', name: 'Travis Howard', initials: 'T', status: 'offline' },
  { id: '3', name: 'Cindy Baker', initials: 'C', status: 'online' },
];

export default function BadgePreview(): JSX.Element {
  const [vertical, setVertical] = useState<'top' | 'bottom'>('top');
  const [horizontal, setHorizontal] = useState<'left' | 'right'>('right');
  const [showUnread, setShowUnread] = useState(true);
  const [count, setCount] = useState(5);

  const anchorOrigin: BadgeAnchorOrigin = { vertical, horizontal };

  return (
    <div className="space-y-12 p-8">
      <div>
        <h1 className="text-content-primary mb-2 text-3xl font-bold">Badge Component</h1>
        <p className="text-content-secondary">
          Accessible, theme-aware native badge component supporting anchored overlays, dot
          indicators, overlap curves, visibility transitions, and full WCAG 2.1 AA accessibility.
        </p>
      </div>

      {/* 1. Anchor Origin (Matching Screenshot 1) */}
      <div className="border-border bg-surface space-y-6 rounded-2xl border p-6 shadow-sm">
        <div>
          <h2 className="text-content-primary text-xl font-semibold">Anchor Origin</h2>
          <p className="text-content-secondary text-sm">
            Control the badge corner position using{' '}
            <code className="text-primary">anchorOrigin</code>.
          </p>
        </div>

        <div className="flex gap-16">
          <div className="space-y-2">
            <span className="text-primary text-sm font-semibold">Vertical</span>
            <div className="flex flex-col gap-2">
              <label className="text-content-primary flex cursor-pointer items-center gap-2 text-sm">
                <input
                  checked={vertical === 'top'}
                  className="accent-primary"
                  name="demo-vertical"
                  type="radio"
                  value="top"
                  onChange={() => setVertical('top')}
                />
                <span>Top</span>
              </label>
              <label className="text-content-primary flex cursor-pointer items-center gap-2 text-sm">
                <input
                  checked={vertical === 'bottom'}
                  className="accent-primary"
                  name="demo-vertical"
                  type="radio"
                  value="bottom"
                  onChange={() => setVertical('bottom')}
                />
                <span>Bottom</span>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-primary text-sm font-semibold">Horizontal</span>
            <div className="flex flex-col gap-2">
              <label className="text-content-primary flex cursor-pointer items-center gap-2 text-sm">
                <input
                  checked={horizontal === 'right'}
                  className="accent-primary"
                  name="demo-horizontal"
                  type="radio"
                  value="right"
                  onChange={() => setHorizontal('right')}
                />
                <span>Right</span>
              </label>
              <label className="text-content-primary flex cursor-pointer items-center gap-2 text-sm">
                <input
                  checked={horizontal === 'left'}
                  className="accent-primary"
                  name="demo-horizontal"
                  type="radio"
                  value="left"
                  onChange={() => setHorizontal('left')}
                />
                <span>Left</span>
              </label>
            </div>
          </div>
        </div>

        <div className="border-border bg-surface-subtle flex flex-wrap items-center gap-10 rounded-xl border p-6">
          <Badge anchorOrigin={anchorOrigin} color="secondary" variant="dot">
            <MailIcon />
          </Badge>
          <Badge anchorOrigin={anchorOrigin} badgeContent={1} color="secondary">
            <MailIcon />
          </Badge>
          <Badge anchorOrigin={anchorOrigin} badgeContent={12} color="secondary">
            <MailIcon />
          </Badge>
          <Badge anchorOrigin={anchorOrigin} badgeContent={99} color="secondary">
            <MailIcon />
          </Badge>
          <Badge anchorOrigin={anchorOrigin} badgeContent={1000} color="secondary" max={999}>
            <MailIcon />
          </Badge>
        </div>
      </div>

      {/* 2. Dot Badge (Matching Screenshot 2) */}
      <div className="border-border bg-surface space-y-4 rounded-2xl border p-6 shadow-sm">
        <div>
          <h2 className="text-content-primary text-xl font-semibold">Dot Badge</h2>
          <p className="text-content-secondary text-sm">
            Use <code className="text-primary">variant=&quot;dot&quot;</code> for a compact status
            indicator without a count.
          </p>
        </div>
        <div className="border-border bg-surface-subtle flex items-center gap-8 rounded-xl border p-6">
          <Badge color="secondary" variant="dot">
            <BellIcon />
          </Badge>
          <Badge color="primary" variant="dot">
            <MailIcon />
          </Badge>
          <Badge color="success" variant="dot">
            <BellIcon />
          </Badge>
        </div>
      </div>

      {/* 3. Visibility (Matching Screenshot 3) */}
      <div className="border-border bg-surface space-y-4 rounded-2xl border p-6 shadow-sm">
        <div>
          <h2 className="text-content-primary text-xl font-semibold">Visibility</h2>
          <p className="text-content-secondary text-sm">
            Control badge visibility with the <code className="text-primary">invisible</code> prop.
          </p>
        </div>
        <div className="border-border bg-surface-subtle flex items-center gap-10 rounded-xl border p-6">
          <Badge badgeContent={4} color="secondary" invisible={!showUnread}>
            <MailIcon />
          </Badge>

          <div className="text-content-primary inline-flex items-center gap-3 text-sm font-medium">
            <button
              aria-checked={showUnread}
              aria-label="Show unread count"
              className={`focus-visible:ring-primary relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ease-in-out focus-visible:ring-2 focus-visible:outline-none ${
                showUnread ? 'bg-primary' : 'bg-surface-muted'
              }`}
              role="switch"
              type="button"
              onClick={() => setShowUnread((previous) => !previous)}
            >
              <span
                className={`bg-surface mt-0.5 inline-block size-5 transform rounded-full shadow transition duration-200 ease-in-out ${
                  showUnread ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
            <span>Show unread count</span>
          </div>
        </div>
      </div>

      {/* 4. Badge Overlap (Matching Screenshot 4) */}
      <div className="border-border bg-surface space-y-4 rounded-2xl border p-6 shadow-sm">
        <div>
          <h2 className="text-content-primary text-xl font-semibold">Badge Overlap</h2>
          <p className="text-content-secondary text-sm">
            Use the <code className="text-primary">overlap=&quot;circular&quot;</code> prop when the
            wrapped element is circular.
          </p>
        </div>
        <div className="border-border bg-surface-subtle flex items-center gap-10 rounded-xl border p-6">
          <Badge badgeContent={1} color="secondary" overlap="rectangular">
            <div className="bg-primary size-10 rounded-sm" />
          </Badge>
          <Badge color="secondary" overlap="rectangular" variant="dot">
            <div className="bg-primary size-10 rounded-sm" />
          </Badge>
          <Badge badgeContent={1} color="secondary" overlap="circular">
            <div className="bg-primary size-10 rounded-full" />
          </Badge>
          <Badge color="secondary" overlap="circular" variant="dot">
            <div className="bg-primary size-10 rounded-full" />
          </Badge>
        </div>
      </div>

      {/* 5. Avatar Status Indicators (Matching Screenshot 5) */}
      <div className="border-border bg-surface space-y-4 rounded-2xl border p-6 shadow-sm">
        <div>
          <h2 className="text-content-primary text-xl font-semibold">Avatar Status Indicators</h2>
          <p className="text-content-secondary text-sm">
            Bordered circular dot indicators positioned at{' '}
            <code className="text-primary">bottom-right</code> on avatars.
          </p>
        </div>
        <div className="border-border bg-surface-subtle flex justify-start rounded-xl border p-6">
          <div className="border-border bg-surface divide-border flex w-full max-w-sm flex-col divide-y rounded-xl border p-2 shadow-sm">
            {USERS.map((user) => {
              const isOnline = user.status === 'online';

              return (
                <div key={user.id} className="flex items-center gap-4 p-3">
                  <Badge
                    bordered
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    color={isOnline ? 'success' : 'neutral'}
                    overlap="circular"
                    variant="dot"
                  >
                    <div
                      aria-label={user.name}
                      className="bg-surface-muted text-content-secondary flex size-11 items-center justify-center rounded-full text-base font-semibold"
                    >
                      {user.initials}
                    </div>
                  </Badge>

                  <div className="flex flex-col">
                    <span className="text-content-primary font-medium">{user.name}</span>
                    <span className="text-content-secondary text-xs capitalize">{user.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 6. Notification Counter Pattern */}
      <div className="border-border bg-surface space-y-4 rounded-2xl border p-6 shadow-sm">
        <div>
          <h2 className="text-content-primary text-xl font-semibold">Interactive Counter</h2>
          <p className="text-content-secondary text-sm">
            Shows automatic hide on zero via default{' '}
            <code className="text-primary">showZero=&#123;false&#125;</code>.
          </p>
        </div>
        <div className="border-border bg-surface-subtle flex items-center gap-6 rounded-xl border p-6">
          <Badge badgeContent={count} color="danger" max={99}>
            <MailIcon />
          </Badge>
          <span className="text-content-secondary text-sm">{count} unread notifications</span>
          <div className="flex gap-2">
            <button
              className="border-border hover:bg-surface text-content-primary rounded-md border px-3 py-1 text-sm font-medium transition-colors"
              type="button"
              onClick={() => setCount((c) => c + 1)}
            >
              Add
            </button>
            <button
              className="border-border hover:bg-surface text-danger rounded-md border px-3 py-1 text-sm font-medium transition-colors"
              type="button"
              onClick={() => setCount((c) => Math.max(0, c - 1))}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
