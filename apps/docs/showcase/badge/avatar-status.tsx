'use client';

import type { JSX } from 'react';
import { Badge } from '@ideasui/react';

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

export default function BadgeAvatarStatusDemo(): JSX.Element {
  return (
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
  );
}
