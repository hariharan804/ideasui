import { Envelope, Globe, Plus, TrashBin } from '@gravity-ui/icons';
import { Button } from '@ideasui/react';

export function WithIcons() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button>
        <Globe />
        Search
      </Button>
      <Button variant="secondary">
        <Plus />
        Add Member
      </Button>
      <Button variant="tertiary">
        <Envelope />
        Email
      </Button>
      <Button variant="error">
        <TrashBin />
        Delete
      </Button>
    </div>
  );
}
