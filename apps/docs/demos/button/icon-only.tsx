import { MoreHorizontal as Ellipsis, Settings as Gear, Trash2 as TrashBin } from 'lucide-react';
import { Button } from '@ideasui/react';

export function IconOnly() {
  return (
    <div className="flex gap-3">
      <Button isIconOnly color="tertiary">
        <Ellipsis />
      </Button>
      <Button isIconOnly color="secondary">
        <Gear />
      </Button>
      <Button isIconOnly color="error">
        <TrashBin />
      </Button>
    </div>
  );
}
