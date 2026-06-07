'use client';

import { Button } from '@ideasui/react';
import { Ripple } from 'm3-ripple';

import 'm3-ripple/ripple.css';

export function RippleEffect() {
  return (
    <Button color="secondary">
      <Ripple />
      Click me
    </Button>
  );
}
