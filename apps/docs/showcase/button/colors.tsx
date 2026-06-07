import { Button } from '@ideasui/react';

export function Colors() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="tertiary">Tertiary</Button>
      <Button color="success">Success</Button>
      <Button color="warning">Warning</Button>
      <Button color="error">Error</Button>
      <Button color="info">Info</Button>
      <Button color="neutral">Neutral</Button>
    </div>
  );
}
