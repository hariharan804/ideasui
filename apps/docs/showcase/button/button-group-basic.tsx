'use client';

import { Button } from '@ideasui/react';

export default function ButtonGroupBasic() {
  return (
    <Button.Group color="neutral" variant="outline">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </Button.Group>
  );
}
