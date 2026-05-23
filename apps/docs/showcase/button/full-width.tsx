import { Plus } from 'lucide-react';
import { Button } from '@ideasui/react';

export function FullWidth() {
  return (
    <div className="w-[400px] space-y-3">
      <Button fullWidth>Primary Button</Button>
      <Button fullWidth startIcon={<Plus />}>
        With Icon
      </Button>
    </div>
  );
}
