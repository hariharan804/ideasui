import { Ellipsis, Gear, TrashBin } from '@gravity-ui/icons';
import { Button } from '@ideasui/react';

export function IconOnly() {
  return (
    <div className="flex gap-3">
      <Button isIconOnly variant="tertiary">
        <Ellipsis />
      </Button>
      <Button isIconOnly variant="secondary">
        <Gear />
      </Button>
      <Button isIconOnly variant="error">
        <TrashBin />
      </Button>
    </div>
  );
}
