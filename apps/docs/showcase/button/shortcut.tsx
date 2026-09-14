import type { JSX } from 'react';

import { Search, Plus, Settings } from 'lucide-react';
import { Button } from '@ideasui/react';

export function Shortcut(): JSX.Element {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Button shortcut="⌘K" startIcon={<Search className="size-4" />}>
        Quick Search
      </Button>
      <Button
        color="secondary"
        shortcut="⌘N"
        startIcon={<Plus className="size-4" />}
        variant="outline"
      >
        New Document
      </Button>
      <Button shortcut="⌘," startIcon={<Settings className="size-4" />} variant="soft">
        Settings
      </Button>
    </div>
  );
}
