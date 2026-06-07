import { MoreHorizontal as Ellipsis, Settings as Gear, Trash2 as TrashBin } from 'lucide-react';
import { Button } from '@ideasui/react';

export function IconOnly() {
  return (
    <div className="flex gap-3">
      <Button isIconOnly aria-label="More options" color="tertiary">
        <Ellipsis />
      </Button>
      <Button isIconOnly aria-label="Settings" color="secondary">
        <Gear />
      </Button>
      <Button isIconOnly aria-label="Delete" color="error">
        <TrashBin />
      </Button>
    </div>
  );
}
