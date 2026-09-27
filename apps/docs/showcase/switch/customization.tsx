'use client';

import { Moon, ShieldCheck, Zap } from 'lucide-react';
import { Switch } from '@ideasui/react';

export function Customization() {
  return (
    <div className="flex flex-col gap-6 p-4">
      {/* 1. Custom Icon & Size Switch */}
      <div className="flex items-center gap-4">
        <Switch
          defaultSelected
          color="primary"
          size="lg"
          // eslint-disable-next-line react/no-unstable-nested-components
          thumbIcon={({ isSelected }) => (
            <Moon
              className={`size-3.5 ${isSelected ? 'fill-primary text-primary' : 'text-content-muted'}`}
            />
          )}
        >
          Dark Mode Toggle
        </Switch>
      </div>

      {/* 2. Custom Card Toggle Box */}
      <div className="border-border bg-surface-subtle/50 flex w-full max-w-lg items-center justify-between rounded-xl border p-4 shadow-2xs">
        <div className="flex items-center gap-3 pr-3">
          <div className="bg-primary-subtle text-primary flex size-10 items-center justify-center rounded-lg">
            <ShieldCheck className="size-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-content-primary text-sm font-semibold">
              Two-Factor Authentication
            </span>
            <span className="text-content-secondary text-xs">Require 2FA code at login</span>
          </div>
        </div>
        <Switch defaultSelected color="success" size="md" />
      </div>

      {/* 3. Custom Badge Status Toggle */}
      <div className="border-border bg-surface flex w-full max-w-md items-center justify-between rounded-xl border p-4 shadow-2xs">
        <div className="flex items-center gap-2">
          <Zap className="text-warning size-4" />
          <span className="text-content-primary text-sm font-medium">Turbo Performance Mode</span>
        </div>
        <Switch defaultSelected color="warning" size="sm" />
      </div>
    </div>
  );
}
