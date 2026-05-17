import { Button } from '@ideasui/react';

export function Variants() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="error">Danger</Button>
      <Button variant="error-muted">Danger Soft</Button>
    </div>
  );
}
