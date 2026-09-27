'use client';

import { Bell, Check, Mic, MicOff, Moon, Sun, X } from 'lucide-react';
import { Switch } from '@ideasui/react';

export function CustomIcons() {
  return (
    <div className="flex flex-wrap items-center gap-6 p-4">
      <Switch
        defaultSelected
        color="success"
        size="lg"
        thumbIcon={<Check className="size-4.5 stroke-[2.5]" />}
        uncheckedThumbIcon={<X className="size-4.5 stroke-[2.5]" />}
      >
        Checked Icon
      </Switch>

      <Switch
        defaultSelected
        checkedThumbIcon={<Moon className="size-4.5" />}
        color="neutral"
        size="lg"
        uncheckedThumbIcon={<Sun className="size-4.5" />}
      >
        Dark Mode Toggle
      </Switch>

      <Switch
        defaultSelected
        checkedThumbIcon={<Mic className="text-warning size-4.5 stroke-[2.5]" />}
        color="warning"
        size="lg"
        uncheckedThumbIcon={<MicOff className="size-4.5" />}
      >
        Microphone
      </Switch>

      <Switch defaultSelected color="primary" size="lg" thumbIcon={<Bell className="size-4.5" />}>
        Notifications
      </Switch>
    </div>
  );
}
