'use client';

import { Button } from '@ideasui/react';

export function CustomRenderFunction() {
  return (
    <Button
      render={(props, { isPressed }) => (
        <button {...props} data-custom={isPressed ? 'pressed' : 'bar'} />
      )}
    >
      Press me
    </Button>
  );
}
