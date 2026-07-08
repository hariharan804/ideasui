'use client';

import { Button } from '@ideasui/react';

export default function ButtonGroupDividers() {
  return (
    <div className="flex flex-col gap-8">
      {/* Full Divider */}
      <div className="flex flex-col gap-2">
        <p className="text-content-tertiary text-sm font-medium">Full Divider (default)</p>
        <Button.Group color="primary" divider="full" variant="soft">
          <Button>Feed</Button>
          <Button>Messages</Button>
          <Button>Notifications</Button>
        </Button.Group>
      </div>

      {/* Middle Inset Divider */}
      <div className="flex flex-col gap-2">
        <p className="text-content-tertiary text-sm font-medium">Middle Inset Divider</p>
        <Button.Group color="secondary" divider="middle" variant="soft">
          <Button>Feed</Button>
          <Button>Messages</Button>
          <Button>Notifications</Button>
        </Button.Group>
      </div>

      {/* No Divider */}
      <div className="flex flex-col gap-2">
        <p className="text-content-tertiary text-sm font-medium">No Divider</p>
        <Button.Group color="tertiary" divider="none" variant="soft">
          <Button>Feed</Button>
          <Button>Messages</Button>
          <Button>Notifications</Button>
        </Button.Group>
      </div>
    </div>
  );
}
