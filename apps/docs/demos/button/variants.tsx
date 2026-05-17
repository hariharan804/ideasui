import { Button } from '@ideasui/react';

export function Variants() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button>Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="tertiary">Tertiary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button color="error">Danger</Button>
      <Button color="error" variant="muted">
        Danger Soft
      </Button>
    </div>
  );
}
