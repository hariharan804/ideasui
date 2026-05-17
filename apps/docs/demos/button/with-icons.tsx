import { Mail as Envelope, Globe, Plus, Trash2 as TrashBin } from 'lucide-react';
import { Button } from '@ideasui/react';

export function WithIcons() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button>
        <Globe />
        Search
      </Button>
      <Button color="secondary">
        <Plus />
        Add Member
      </Button>
      <Button color="tertiary">
        <Envelope />
        Email
      </Button>
      <Button color="error">
        <TrashBin />
        Delete
      </Button>
    </div>
  );
}
