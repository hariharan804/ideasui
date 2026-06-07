import { Mail as Envelope, Globe, Plus, Trash2 as TrashBin } from 'lucide-react';
import { Button } from '@ideasui/react';

export function WithIcons() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button startIcon={<Globe />}>Search</Button>
      <Button color="secondary" startIcon={<Plus />}>
        Add Member
      </Button>
      <Button color="tertiary" startIcon={<Envelope />}>
        Email
      </Button>
      <Button color="error" startIcon={<TrashBin />}>
        Delete
      </Button>
    </div>
  );
}
