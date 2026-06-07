'use client';

import { Button } from '@ideasui/react';

export function CustomRenderFunction() {
  return (
    <Button>
      {({ isPressed }) => <span data-custom={isPressed ? 'pressed' : 'bar'}>Press me</span>}
    </Button>
  );
}
