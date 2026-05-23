import { Button } from '@ideasui/react';

export function Variants() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="muted">Muted</Button>
      <Button variant="link">Link</Button>
      <Button variant="text">Text</Button>
      <Button variant="elevated">Elevated</Button>
      <Button variant="glaze">Glaze</Button>
    </div>
  );
}
